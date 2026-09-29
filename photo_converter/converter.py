import argparse
import os
import struct
from io import BytesIO
from PIL import Image, ImageEnhance, ImageOps

# HEIC opzionale: pip install pillow-heif
try:
    from pillow_heif import register_heif_opener
    register_heif_opener()
except ImportError:
    pass

# CONFIGURAZIONE
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__)) if '__file__' in globals() else os.getcwd()
OUTPUT_DIR = os.path.join(CURRENT_DIR, "Converted")

TARGET_WIDTH = 6144
TARGET_HEIGHT = 3456                # Formato orizzontale 16:9
PREFIX = "PHO"                      # Prefisso PHO
DIGITS = 5                          # 5 cifre -> PHO00001 (8 caratteri)
EXTENSION = ".JPG"                  # La fotocamera scrive PHO00005.JPG (maiuscolo)
TARGET_MAX_KB = 500                 # Limite sul file COMPLETO (foto + miniatura + trailer)
BACKGROUND_COLOR = (255, 255, 255)  # Sfondo bianco per carta termica

# --- Parametri ricavati dal file originale della fotocamera (PHO00005.JPG) ---
RESTART_MCU_MAIN = 192              # DRI foto principale (mezza riga di MCU 16x16)
THUMB_WIDTH = 672
THUMB_HEIGHT = 384
RESTART_MCU_THUMB = 42              # DRI miniatura (una riga di MCU)
THUMB_PAD = 512                     # La miniatura è paddata a multipli di 512 byte (dimensione LIBERA: 6 KB su foto nera, 20 KB su foto reale)
THUMB_SCALE = 1.0                   # 1.0 = tabelle della fotocamera (equivalenti a JPEG q50); <1 = miniatura più nitida
JRX_TRAILER_SIZE = 12               # FFE9 000A "JRX" + 5 byte di offset

# Tabelle di quantizzazione della fotocamera (ordine naturale, non zigzag)
QTABLES_MAIN = [
    [33, 22, 50, 46, 53, 85, 110, 131, 31, 58, 52, 43, 58, 125, 108, 121,
     47, 27, 52, 52, 87, 122, 150, 122, 33, 43, 50, 65, 110, 185, 172, 135,
     46, 53, 81, 121, 166, 233, 221, 166, 56, 77, 118, 137, 175, 222, 241, 206,
     106, 137, 166, 187, 221, 255, 255, 222, 153, 196, 203, 210, 243, 218, 243, 231],
    [42, 45, 60, 117, 247, 255, 247, 247, 45, 52, 65, 165, 247, 247, 255, 247,
     60, 65, 140, 247, 247, 255, 247, 255, 117, 165, 247, 247, 255, 247, 255, 255,
     247, 247, 255, 247, 255, 255, 255, 255, 247, 255, 247, 255, 255, 255, 255, 255,
     247, 247, 255, 255, 255, 247, 255, 255, 247, 255, 247, 247, 255, 255, 255, 255],
]
QTABLES_THUMB = [
    [16, 11, 15, 23, 28, 24, 22, 25, 13, 16, 22, 21, 25, 21, 26, 41,
     28, 25, 24, 26, 27, 51, 37, 39, 31, 42, 60, 53, 63, 52, 59, 53,
     58, 57, 66, 74, 94, 80, 66, 80, 89, 72, 58, 59, 83, 112, 84, 90,
     98, 101, 106, 107, 106, 65, 80, 116, 123, 117, 105, 123, 99, 107, 117, 111],
    [17, 18, 18, 24, 21, 24, 47, 26, 26, 47, 99, 66, 56, 66, 99, 111,
     99, 99, 99, 99, 99, 99, 111, 115, 99, 99, 99, 99, 99, 111, 115, 120,
     99, 99, 99, 99, 111, 115, 121, 122, 99, 99, 99, 111, 115, 120, 123, 123,
     99, 99, 111, 115, 121, 123, 124, 124, 99, 111, 115, 120, 122, 123, 124, 125],
]

# Header JFIF identico alla fotocamera: versione 1.02, 72 dpi, nessuna miniatura JFIF
CAMERA_APP0 = b"\xff\xe0\x00\x10JFIF\x00\x01\x02\x01\x00\x48\x00\x48\x00\x00"


# Preset di bilanciamento tonale. Parametri:
#   cutoff    % di pixel scartati agli estremi da autocontrast (più alto = più clipping)
#   gamma     >1 schiarisce i mezzitoni, <1 li scurisce (carta termica: stampa tende a scurire)
#   contrast  contrasto lineare attorno al grigio medio (>1.2 tende a bruciare luci/ombre)
#   curve     0..1 curva a S morbida: contrasto senza clipping, luci e ombre restano dettagliate
#   sharpness nitidezza
BALANCE_PRESETS = {
    "soft":     dict(cutoff=0.2, gamma=1.05, contrast=1.00, curve=0.25, sharpness=1.15),
    "medium":   dict(cutoff=0.5, gamma=1.10, contrast=1.05, curve=0.45, sharpness=1.30),
    "strong":   dict(cutoff=1.0, gamma=1.00, contrast=1.20, curve=0.60, sharpness=1.45),
    "original": dict(cutoff=1.0, gamma=1.00, contrast=1.35, curve=0.00, sharpness=1.50),  # vecchio -b
}
DEFAULT_PRESET = "medium"


def build_tone_lut(gamma, curve):
    """LUT a 256 valori: gamma sui mezzitoni + curva a S morbida (smoothstep) miscelata."""
    lut = []
    for i in range(256):
        x = (i / 255.0) ** (1.0 / gamma)
        x = x + curve * ((x * x * (3 - 2 * x)) - x)
        lut.append(max(0, min(255, round(x * 255))))
    return lut


def optimize_tonal_balance(img, cutoff, gamma, contrast, curve, sharpness):
    """Regola livelli, mezzitoni, contrasto e nitidezza per la carta termica."""
    if cutoff > 0:
        img = ImageOps.autocontrast(img, cutoff=cutoff)
    if gamma != 1.0 or curve > 0:
        img = img.point(build_tone_lut(gamma, curve) * 3)     # stessa LUT su R, G, B
    if contrast != 1.0:
        img = ImageEnhance.Contrast(img).enhance(contrast)
    if sharpness != 1.0:
        img = ImageEnhance.Sharpness(img).enhance(sharpness)
    return img


def scale_tables(tables, factor):
    """Scala le tabelle di quantizzazione (factor > 1 = file più piccolo)."""
    return [[max(1, min(255, round(v * factor))) for v in t] for t in tables]


def normalize_header(data):
    """
    Riscrive l'header JPEG con lo stesso layout della fotocamera:
    SOI, APP0 (JFIF 1.02), DQT unico, SOF0, DRI, DHT unico, SOS.
    libjpeg emette invece un DQT/DHT per tabella e un ordine diverso: un chip
    con parser minimale potrebbe non gradirlo.
    """
    pos = 2
    dqt, dht, sof, dri = {}, {}, None, None
    while True:
        marker = data[pos + 1]
        length = struct.unpack(">H", data[pos + 2:pos + 4])[0]
        seg = data[pos + 4:pos + 2 + length]
        if marker == 0xDB:
            p = 0
            while p < len(seg):
                assert seg[p] >> 4 == 0, "Solo tabelle DQT a 8 bit"
                dqt[seg[p]] = seg[p:p + 65]
                p += 65
        elif marker == 0xC4:
            p = 0
            while p < len(seg):
                n = sum(seg[p + 1:p + 17])
                dht[seg[p]] = seg[p:p + 17 + n]
                p += 17 + n
        elif marker == 0xC0:
            sof = seg
        elif marker == 0xDD:
            dri = seg
        elif marker == 0xDA:
            scan = data[pos:]          # SOS + dati entropici + EOI
            break
        pos += 2 + length

    def segment(marker, body):
        return b"\xff" + bytes([marker]) + struct.pack(">H", len(body) + 2) + body

    out = b"\xff\xd8" + CAMERA_APP0
    out += segment(0xDB, b"".join(dqt[k] for k in sorted(dqt)))
    out += segment(0xC0, sof)
    if dri is not None:
        out += segment(0xDD, dri)
    out += segment(0xC4, b"".join(dht[k] for k in sorted(dht)))
    return out + scan


def encode_jpeg(img, tables, restart_mcu):
    """JPEG baseline, 4:2:0, Huffman standard, restart marker, header normalizzato."""
    buf = BytesIO()
    img.save(
        buf, "JPEG",
        qtables=tables,
        subsampling="4:2:0",
        progressive=False,
        optimize=False,
        restart_marker_blocks=restart_mcu,
    )
    return normalize_header(buf.getvalue())


def encode_main(canvas, max_bytes):
    """Parte dalle tabelle originali della fotocamera e le scala solo se serve."""
    data = encode_jpeg(canvas, scale_tables(QTABLES_MAIN, 1.0), RESTART_MCU_MAIN)
    if len(data) <= max_bytes:
        return data, 1.0, True

    lo, hi, best = 1.0, 12.0, None
    for _ in range(8):                       # ricerca binaria (geometrica) sul fattore
        mid = (lo * hi) ** 0.5
        data = encode_jpeg(canvas, scale_tables(QTABLES_MAIN, mid), RESTART_MCU_MAIN)
        if len(data) <= max_bytes:
            best, hi = (data, mid), mid
        else:
            lo = mid
    if best:
        return best[0], best[1], True
    data = encode_jpeg(canvas, scale_tables(QTABLES_MAIN, 12.0), RESTART_MCU_MAIN)
    return data, 12.0, False


def build_thumbnail(thumb_img, scale=THUMB_SCALE):
    """
    Miniatura 672x384 con le tabelle della fotocamera, paddata a multipli di 512 byte.
    ATTENZIONE: la dimensione NON è fissa. Sulla foto nera di test era 6144 byte
    solo perché l'immagine era vuota; su una foto reale la fotocamera scrive ~20 KB.
    """
    data = encode_jpeg(thumb_img, scale_tables(QTABLES_THUMB, scale), RESTART_MCU_THUMB)
    return data.ljust(-(-len(data) // THUMB_PAD) * THUMB_PAD, b"\x00")


def build_trailer(main_size):
    """Trailer APP9 'JRX': contiene la lunghezza della foto principale (= offset miniatura)."""
    return b"\xff\xe9\x00\x0aJRX" + main_size.to_bytes(5, "big")


FIT_MODES = {
    "fit":     "Mantieni proporzioni (barre bianche, nessun ritaglio)",
    "fill":    "Riempi il 16:9 (ritaglia al centro)",
    "stretch": "Stira a 16:9 (deforma)",
    "free":    "Formato libero (larghezza piena, altezza variabile)",
}

MAX_FREE_HEIGHT = 16384             # limite di sicurezza sull'altezza in modalità libera
FREE_RATIO_PRESETS = ["Originale", "3:4", "4:3", "1:1", "9:16", "16:9", "21:9", "32:9"]


def parse_ratio(text):
    """'21:9', '21/9', '2.33' -> float larghezza/altezza. Vuoto/'Originale' -> None (usa la foto)."""
    text = (text or "").strip().lower().replace(",", ".")
    if text in ("", "originale", "nativo", "auto"):
        return None
    for sep in (":", "/", "x"):
        if sep in text:
            a, b = text.split(sep, 1)
            value = float(a) / float(b)
            break
    else:
        value = float(text)
    if value <= 0:
        raise ValueError(f"Rapporto non valido: {text}")
    return value


def output_size(img_w, img_h, mode="fit", ratio=None, width=None):
    """
    Dimensioni (larghezza, altezza) della tela principale.
    Modalità libera: larghezza piena, altezza dal rapporto scelto (o quello della foto),
    arrotondata a multipli di 16 (MCU 4:2:0) e limitata a MAX_FREE_HEIGHT.
    """
    width = width or TARGET_WIDTH
    if mode != "free":
        return width, TARGET_HEIGHT
    r = ratio or (img_w / img_h)
    height = round(width / r / 16) * 16
    return width, max(16, min(MAX_FREE_HEIGHT, height))


def thumb_size(canvas_w, canvas_h):
    """Miniatura: larghezza fissa 672, altezza proporzionale (multiplo di 16; 384 per il 16:9)."""
    return THUMB_WIDTH, max(16, round(canvas_h * THUMB_WIDTH / canvas_w / 16) * 16)


def fit_on_canvas(img, width, height, mode="fit", ratio=None):
    """
    Porta l'immagine su una tela width x height.
      fit     mantiene le proporzioni, sfondo bianco ai lati (nessun ritaglio)
      fill    riempie tutta la tela mantenendo le proporzioni, ritagliando l'eccesso al centro
      stretch adatta ai bordi deformando l'immagine
      free    la tela ha già il rapporto giusto (vedi output_size): riempie ritagliando
              solo l'eventuale eccesso rispetto al rapporto scelto
    """
    if mode in ("fill", "free"):
        return ImageOps.fit(img, (width, height), Image.Resampling.LANCZOS, centering=(0.5, 0.5))
    if mode == "stretch":
        return img.resize((width, height), Image.Resampling.LANCZOS)
    scale = min(width / img.width, height / img.height)
    nw, nh = max(1, int(img.width * scale)), max(1, int(img.height * scale))
    canvas = Image.new("RGB", (width, height), BACKGROUND_COLOR)
    canvas.paste(img.resize((nw, nh), Image.Resampling.LANCZOS), ((width - nw) // 2, (height - nh) // 2))
    return canvas


def process_image(file_path, output_path, balance=None, with_thumb=True, max_kb=TARGET_MAX_KB,
                  thumb_scale=THUMB_SCALE, fit="fit", rotate=True, ratio=None):
    with Image.open(file_path) as img:
        # 1. Corregge l'orientamento EXIF originale
        img = ImageOps.exif_transpose(img)
        img = img.convert("RGB")     # elimina anche alpha/palette; nessun EXIF/ICC in uscita

        # 2. Se la foto è verticale (e rotate=True), la ruota di 90° in orizzontale
        #    (in formato libero non serve: la tela si adatta alla foto)
        if rotate and fit != "free" and img.height > img.width:
            img = img.transpose(Image.Transpose.ROTATE_270)
            print("  └─ Foto verticale rilevata: ruotata in orizzontale")

        # 3. Ottimizzazione tonale per carta termica (se richiesta)
        if balance:
            img = optimize_tonal_balance(img, **balance)
            print("  └─ Applicato bilanciamento tonale")

        # 4-5. Tela principale 6144x3456 e miniatura 672x384, entrambe dall'originale
        #      (la miniatura NON viene ricavata dalla tela gigante: più nitida e più veloce)
        out_w, out_h = output_size(img.width, img.height, fit, ratio)
        th_w, th_h = thumb_size(out_w, out_h)
        canvas = fit_on_canvas(img, out_w, out_h, fit)
        thumb_img = fit_on_canvas(img, th_w, th_h, fit) if with_thumb else None

    # 6. Miniatura (dimensione reale) e foto principale nel budget rimanente
    thumb = build_thumbnail(thumb_img, thumb_scale) if with_thumb else b""
    extra = (len(thumb) + JRX_TRAILER_SIZE) if with_thumb else 0
    main, factor, fits = encode_main(canvas, max_kb * 1024 - extra)
    payload = main + (thumb + build_trailer(len(main)) if with_thumb else b"")

    with open(output_path, "wb") as f:
        f.write(payload)

    note = "" if fits else "  ⚠ NON rientra nel limite, compressione massima raggiunta"
    print(f"✓ Convertita: {os.path.basename(output_path)} ({out_w}x{out_h}, "
          f"{len(payload)/1024:.1f} KB, quantizzazione x{factor:.2f}"
          f"{', miniatura %.1f KB' % (len(thumb)/1024) if with_thumb else ''}){note}")


def make_compare_sheet(src_path, out_path):
    """Foglio di confronto (non è un file per la fotocamera): originale + tutti i preset, con etichette."""
    from PIL import ImageDraw
    with Image.open(src_path) as im:
        im = ImageOps.exif_transpose(im).convert("RGB")
        if im.height > im.width:
            im = im.transpose(Image.Transpose.ROTATE_270)
    base = fit_on_canvas(im, THUMB_WIDTH, THUMB_HEIGHT)
    variants = [("originale", base)] + [(n, optimize_tonal_balance(base, **p)) for n, p in BALANCE_PRESETS.items()]
    cols = 2
    rows = -(-len(variants) // cols)
    sheet = Image.new("RGB", (cols * THUMB_WIDTH, rows * THUMB_HEIGHT), (128, 128, 128))
    for i, (name, v) in enumerate(variants):
        x, y = (i % cols) * THUMB_WIDTH, (i // cols) * THUMB_HEIGHT
        sheet.paste(v, (x, y))
        d = ImageDraw.Draw(sheet)
        d.rectangle([x, y, x + 130, y + 16], fill=(0, 0, 0))
        d.text((x + 4, y + 2), name, fill=(255, 255, 255))
    sheet.save(out_path, "JPEG", quality=90)
    print(f"Foglio di confronto salvato: {out_path}")


def main():
    parser = argparse.ArgumentParser(description="Convertitore foto compatibile per Instant Camera (Vision / Action).")
    parser.add_argument("-b", "--balance", nargs="?", const=DEFAULT_PRESET, choices=list(BALANCE_PRESETS), metavar="PRESET",
                        help=f"Bilanciamento tonale per carta termica. Preset: {', '.join(BALANCE_PRESETS)} "
                             f"(senza valore = {DEFAULT_PRESET}; 'original' = vecchio -b, molto marcato).")
    parser.add_argument("--cutoff", type=float, help="Override: %% di pixel tagliati da autocontrast (0 = disattivo).")
    parser.add_argument("--gamma", type=float, help="Override: gamma dei mezzitoni (>1 schiarisce).")
    parser.add_argument("--contrast", type=float, help="Override: contrasto lineare (1.0 = invariato).")
    parser.add_argument("--curve", type=float, help="Override: intensità curva a S morbida 0..1.")
    parser.add_argument("--sharpness", type=float, help="Override: nitidezza (1.0 = invariata).")
    parser.add_argument("--compare", action="store_true", help="Crea Converted/compare.jpg con tutti i preset sulla prima immagine, per sceglierli a colpo d'occhio.")
    parser.add_argument("--fit", choices=list(FIT_MODES), default="fit",
                        help="Adattamento al 16:9: fit = mantieni proporzioni con barre bianche (default), fill = riempi ritagliando, stretch = stira, "
                             "free = formato libero: larghezza piena, altezza adattata alla foto (o a --ratio).")
    parser.add_argument("--ratio", default=None, metavar="W:H",
                        help="Solo con --fit free: rapporto di stampa, es. 3:4, 21:9, 32:9, 2.5 (default: quello della foto, senza ritagli).")
    parser.add_argument("--no-rotate", action="store_true", help="Non ruotare le foto verticali (restano verticali, con barre bianche ai lati).")
    parser.add_argument("--no-thumb", action="store_true", help="Non aggiungere miniatura + trailer JRX (utile per test A/B sulla fotocamera).")
    parser.add_argument("--start", type=int, default=1, help="Numero da cui iniziare (default 1). Usa un valore alto per non sovrascrivere le foto già presenti sulla scheda.")
    parser.add_argument("--max-kb", type=int, default=TARGET_MAX_KB, help=f"Dimensione massima del file finale in KB (default {TARGET_MAX_KB}).")
    parser.add_argument("--thumb-scale", type=float, default=THUMB_SCALE, help="Fattore sulle tabelle della miniatura (1.0 = come la fotocamera, 0.5 = più nitida e più pesante).")
    args = parser.parse_args()

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    try:
        ratio = parse_ratio(args.ratio)
    except ValueError as e:
        parser.error(f"--ratio non valido: {e}")
    if ratio and args.fit != "free":
        args.fit = "free"                              # --ratio implica il formato libero

    overrides = {k: getattr(args, k) for k in ("cutoff", "gamma", "contrast", "curve", "sharpness")
                 if getattr(args, k) is not None}
    balance = None
    if args.balance or overrides:                      # un override attiva il bilanciamento
        balance = dict(BALANCE_PRESETS[args.balance or DEFAULT_PRESET])
        balance.update(overrides)

    valid_extensions = ('.jpg', '.jpeg', '.png', '.webp', '.bmp', '.heic')
    files = sorted(
        f for f in os.listdir(CURRENT_DIR)
        if os.path.isfile(os.path.join(CURRENT_DIR, f)) and f.lower().endswith(valid_extensions)
    )

    if not files:
        print(f"Nessuna immagine trovata nella cartella: {CURRENT_DIR}")
        return

    print(f"Trovate {len(files)} immagini.")
    if balance:
        desc = ", ".join(f"{k}={v}" for k, v in balance.items())
        print(f"⚡ Bilanciamento ATTIVO ({args.balance or 'personalizzato'}): {desc}\n")

    if args.compare:
        make_compare_sheet(os.path.join(CURRENT_DIR, files[0]), os.path.join(OUTPUT_DIR, "compare.jpg"))
        return

    for idx, filename in enumerate(files, start=args.start):
        input_path = os.path.join(CURRENT_DIR, filename)
        output_path = os.path.join(OUTPUT_DIR, f"{PREFIX}{idx:0{DIGITS}d}{EXTENSION}")
        try:
            print(f"Elaborazione: {filename}")
            process_image(input_path, output_path, balance=balance,
                          with_thumb=not args.no_thumb, max_kb=args.max_kb, thumb_scale=args.thumb_scale,
                          fit=args.fit, rotate=not args.no_rotate, ratio=ratio)
        except Exception as e:
            print(f"❌ Errore durante la conversione di {filename}: {e}\n")

    print(f"\nOperazione completata! Copia le foto dalla cartella '{OUTPUT_DIR}' alla scheda Micro-SD (cartella DCIM/100MEDIA).")


if __name__ == "__main__":
    main()
