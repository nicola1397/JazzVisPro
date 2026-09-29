"""
GUI per il convertitore foto della fotocamera a stampa termica (Vision / Action).

Richiede converter.py nella stessa cartella. Usa solo Tkinter (incluso in Python) + Pillow.
Ogni foto ha le sue regolazioni; l'anteprima si aggiorna mentre muovi i cursori.
"""
import contextlib
import io
import os
import queue
import sys
import threading
import tkinter as tk
from tkinter import filedialog, messagebox, ttk

from PIL import Image, ImageOps, ImageTk

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import converter as cv  # noqa: E402

PREVIEW_MAX = 1600                       # lato lungo del proxy usato per l'anteprima
VALID_EXT = ('.jpg', '.jpeg', '.png', '.webp', '.bmp', '.heic')
KEYS = ("cutoff", "gamma", "contrast", "curve", "sharpness")
CUSTOM = "personalizzato"

# (chiave, etichetta, min, max, passo)
SLIDERS = [
    ("cutoff",    "Taglio livelli (%)",            0.0, 5.0, 0.1),
    ("gamma",     "Mezzitoni (gamma, >1 schiarisce)", 0.5, 2.0, 0.01),
    ("contrast",  "Contrasto lineare",             0.5, 2.0, 0.01),
    ("curve",     "Curva a S (contrasto morbido)", 0.0, 1.0, 0.01),
    ("sharpness", "Nitidezza",                     0.5, 3.0, 0.05),
]


def default_params():
    p = dict(cv.BALANCE_PRESETS[cv.DEFAULT_PRESET])
    p.update(enabled=True, preset=cv.DEFAULT_PRESET, fit="fit", rotate=True, ratio="Originale")
    return p


def load_proxy(path):
    """Carica la foto (orientamento EXIF applicato, non ruotata), ridotta per l'anteprima."""
    with Image.open(path) as im:
        try:
            im.draft("RGB", (PREVIEW_MAX, PREVIEW_MAX))     # decodifica JPEG veloce
        except Exception:
            pass
        im = ImageOps.exif_transpose(im).convert("RGB")
        im.thumbnail((PREVIEW_MAX, PREVIEW_MAX), Image.Resampling.LANCZOS)
        return im.copy()


class App(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Convertitore foto termica – Vision / Action")
        self.geometry("1280x860")
        self.minsize(1080, 720)

        self.files = []                  # percorsi in ordine di numerazione
        self.params = {}                 # percorso -> parametri
        self.proxies = {}                # percorso -> immagine proxy
        self._loading = False
        self._job = None
        self._photos = []
        self._queue = queue.Queue()
        self._exporting = False

        self.view_mode = tk.StringVar(value="proc")
        self.enabled_var = tk.BooleanVar(value=True)
        self.fit_var = tk.StringVar(value=cv.FIT_MODES["fit"])
        self.rotate_var = tk.BooleanVar(value=True)
        self.ratio_var = tk.StringVar(value="Originale")
        self.preset_var = tk.StringVar(value=cv.DEFAULT_PRESET)
        self.out_var = tk.StringVar(value=cv.OUTPUT_DIR)
        self.start_var = tk.StringVar(value="1")
        self.maxkb_var = tk.StringVar(value=str(cv.TARGET_MAX_KB))
        self.thumb_var = tk.BooleanVar(value=True)
        self.thumbscale_var = tk.StringVar(value=str(cv.THUMB_SCALE))
        self.status_var = tk.StringVar(value="Aggiungi delle foto per iniziare.")
        self.scales = {}

        self._build_ui()
        self.start_var.trace_add("write", lambda *_: self._refresh_list())
        self.after(100, self._poll_queue)

    # ------------------------------------------------------------------ UI
    def _build_ui(self):
        left = ttk.Frame(self, padding=8)
        left.pack(side="left", fill="y")
        right = ttk.Frame(self, padding=(0, 8, 8, 8))
        right.pack(side="left", fill="both", expand=True)

        # --- elenco foto
        ttk.Label(left, text="Foto (l'ordine = numerazione)").pack(anchor="w")
        lf = ttk.Frame(left)
        lf.pack(fill="both", expand=True, pady=4)
        self.listbox = tk.Listbox(lf, width=38, exportselection=False, activestyle="none")
        sb = ttk.Scrollbar(lf, orient="vertical", command=self.listbox.yview)
        self.listbox.configure(yscrollcommand=sb.set)
        self.listbox.pack(side="left", fill="both", expand=True)
        sb.pack(side="left", fill="y")
        self.listbox.bind("<<ListboxSelect>>", lambda e: self.on_select())

        row = ttk.Frame(left); row.pack(fill="x")
        ttk.Button(row, text="Aggiungi foto…", command=self.add_files).pack(side="left", expand=True, fill="x")
        ttk.Button(row, text="Cartella…", command=self.add_folder).pack(side="left", expand=True, fill="x")
        row = ttk.Frame(left); row.pack(fill="x", pady=(4, 0))
        ttk.Button(row, text="▲", width=4, command=lambda: self.move(-1)).pack(side="left")
        ttk.Button(row, text="▼", width=4, command=lambda: self.move(1)).pack(side="left")
        ttk.Button(row, text="Rimuovi", command=self.remove).pack(side="left", expand=True, fill="x")

        # --- anteprima
        top = ttk.Frame(right); top.pack(fill="x")
        ttk.Label(top, text="Anteprima:").pack(side="left")
        for txt, val in (("Elaborata", "proc"), ("Originale", "orig"), ("Affiancate", "split")):
            ttk.Radiobutton(top, text=txt, value=val, variable=self.view_mode,
                            command=self.schedule_render).pack(side="left", padx=6)
        ttk.Label(top, text="(riquadro come lo vede la fotocamera)", foreground="#777").pack(side="left", padx=10)

        self.canvas = tk.Canvas(right, bg="#3a3a3a", highlightthickness=0)
        self.canvas.pack(fill="both", expand=True, pady=6)
        self.canvas.bind("<Configure>", lambda e: self.schedule_render())

        bottom = ttk.Frame(right); bottom.pack(fill="x")

        # --- regolazioni
        adj = ttk.LabelFrame(bottom, text="Regolazioni (solo per la foto selezionata)", padding=8)
        adj.pack(side="left", fill="both", expand=True)
        f = ttk.Frame(adj); f.pack(fill="x", pady=(0, 6))
        ttk.Label(f, text="Formato:").pack(side="left")
        self.fit_box = ttk.Combobox(f, textvariable=self.fit_var, state="readonly", width=44,
                                    values=list(cv.FIT_MODES.values()))
        self.fit_box.pack(side="left", padx=(4, 10))
        self.fit_box.bind("<<ComboboxSelected>>", lambda e: self.on_fit())
        ttk.Checkbutton(f, text="Ruota foto verticali", variable=self.rotate_var,
                        command=self.on_fit).pack(side="left")
        f2 = ttk.Frame(adj); f2.pack(fill="x", pady=(0, 6))
        ttk.Label(f2, text="Rapporto (formato libero):").pack(side="left")
        self.ratio_box = ttk.Combobox(f2, textvariable=self.ratio_var, width=12,
                                      values=cv.FREE_RATIO_PRESETS)
        self.ratio_box.pack(side="left", padx=(4, 8))
        self.ratio_box.bind("<<ComboboxSelected>>", lambda e: self.on_fit())
        self.ratio_box.bind("<Return>", lambda e: self.on_fit())
        self.ratio_box.bind("<FocusOut>", lambda e: self.on_fit())
        ttk.Label(f2, text="es. 3:4, 21:9, 32:9, 2.5 – «Originale» = rapporto della foto",
                  foreground="#777").pack(side="left")
        r = ttk.Frame(adj); r.pack(fill="x")
        ttk.Checkbutton(r, text="Bilanciamento attivo", variable=self.enabled_var,
                        command=self.on_enabled).pack(side="left")
        ttk.Label(r, text="   Preset:").pack(side="left")
        self.preset_box = ttk.Combobox(r, textvariable=self.preset_var, state="readonly", width=14,
                                       values=list(cv.BALANCE_PRESETS) + [CUSTOM])
        self.preset_box.pack(side="left")
        self.preset_box.bind("<<ComboboxSelected>>", lambda e: self.on_preset())
        ttk.Button(r, text="Applica a tutte", command=self.apply_to_all).pack(side="right")
        for key, label, lo, hi, step in SLIDERS:
            s = tk.Scale(adj, from_=lo, to=hi, resolution=step, orient="horizontal", label=label,
                         length=360, showvalue=True, command=lambda _v: self.on_slider())
            s.pack(fill="x")
            self.scales[key] = s
        ttk.Label(adj, text="Nota: la nitidezza in anteprima è approssimata (la conversione la applica sull'originale).",
                  foreground="#777", wraplength=380).pack(anchor="w", pady=(4, 0))

        # --- esportazione
        exp = ttk.LabelFrame(bottom, text="Esportazione", padding=8)
        exp.pack(side="left", fill="both", padx=(8, 0))
        ttk.Label(exp, text="Cartella di uscita").grid(row=0, column=0, sticky="w")
        ttk.Entry(exp, textvariable=self.out_var, width=34).grid(row=1, column=0, columnspan=2, sticky="we")
        ttk.Button(exp, text="…", width=3, command=self.pick_out).grid(row=1, column=2, padx=(4, 0))
        ttk.Label(exp, text="Numero iniziale").grid(row=2, column=0, sticky="w", pady=(6, 0))
        ttk.Spinbox(exp, from_=1, to=99999, textvariable=self.start_var, width=8).grid(row=2, column=1, sticky="w", pady=(6, 0))
        ttk.Label(exp, text="Limite file (KB)").grid(row=3, column=0, sticky="w")
        ttk.Spinbox(exp, from_=100, to=4000, increment=50, textvariable=self.maxkb_var, width=8).grid(row=3, column=1, sticky="w")
        ttk.Checkbutton(exp, text="Miniatura + trailer JRX", variable=self.thumb_var).grid(row=4, column=0, columnspan=2, sticky="w")
        ttk.Label(exp, text="Scala miniatura").grid(row=5, column=0, sticky="w")
        ttk.Spinbox(exp, from_=0.2, to=3.0, increment=0.1, textvariable=self.thumbscale_var, width=8).grid(row=5, column=1, sticky="w")
        self.export_btn = ttk.Button(exp, text="Converti tutte", command=self.export)
        self.export_btn.grid(row=6, column=0, columnspan=3, sticky="we", pady=(8, 0))
        self.progress = ttk.Progressbar(exp, mode="determinate")
        self.progress.grid(row=7, column=0, columnspan=3, sticky="we", pady=(6, 0))
        self.log = tk.Text(exp, height=5, width=44, state="disabled", wrap="word")
        self.log.grid(row=8, column=0, columnspan=3, sticky="we", pady=(6, 0))

        ttk.Label(right, textvariable=self.status_var, foreground="#555").pack(anchor="w", pady=(6, 0))

    # ------------------------------------------------------------- elenco
    def current(self):
        sel = self.listbox.curselection()
        return self.files[sel[0]] if sel else None

    def _refresh_list(self, keep=None):
        sel = self.listbox.curselection()
        idx = keep if keep is not None else (sel[0] if sel else None)
        try:
            start = int(self.start_var.get())
        except ValueError:
            start = 1
        self.listbox.delete(0, "end")
        for i, p in enumerate(self.files):
            self.listbox.insert("end", f"{cv.PREFIX}{start + i:0{cv.DIGITS}d}  ←  {os.path.basename(p)}")
        if idx is not None and self.files:
            idx = max(0, min(idx, len(self.files) - 1))
            self.listbox.selection_set(idx)
            self.listbox.see(idx)

    def _add(self, paths):
        added = 0
        for p in paths:
            p = os.path.abspath(p)
            if p not in self.files and p.lower().endswith(VALID_EXT):
                self.files.append(p)
                self.params[p] = default_params()
                added += 1
        if added:
            first_new = len(self.files) - added
            self._refresh_list(keep=first_new)
            self.on_select()
        self.status_var.set(f"{len(self.files)} foto in elenco.")

    def add_files(self):
        paths = filedialog.askopenfilenames(
            title="Scegli le foto",
            filetypes=[("Immagini", "*.jpg *.jpeg *.png *.webp *.bmp *.heic"), ("Tutti i file", "*.*")])
        self._add(paths)

    def add_folder(self):
        d = filedialog.askdirectory(title="Scegli una cartella")
        if d:
            self._add(sorted(os.path.join(d, f) for f in os.listdir(d)
                             if os.path.isfile(os.path.join(d, f))))

    def remove(self):
        sel = self.listbox.curselection()
        if not sel:
            return
        p = self.files.pop(sel[0])
        self.params.pop(p, None)
        self.proxies.pop(p, None)
        self._refresh_list(keep=sel[0])
        self.on_select()
        self.status_var.set(f"{len(self.files)} foto in elenco.")

    def move(self, delta):
        sel = self.listbox.curselection()
        if not sel:
            return
        i, j = sel[0], sel[0] + delta
        if 0 <= j < len(self.files):
            self.files[i], self.files[j] = self.files[j], self.files[i]
            self._refresh_list(keep=j)

    # ------------------------------------------------- parametri <-> UI
    def on_select(self):
        p = self.current()
        if p:
            self._load_ui(self.params[p])
        self.schedule_render()

    def _load_ui(self, prm):
        self._loading = True
        try:
            for k in KEYS:
                self.scales[k].set(prm[k])
            self.enabled_var.set(prm["enabled"])
            self.preset_var.set(prm["preset"])
            self.fit_var.set(cv.FIT_MODES[prm["fit"]])
            self.rotate_var.set(prm["rotate"])
            self.ratio_var.set(prm["ratio"])
            self._update_ratio_state()
        finally:
            self._loading = False

    def on_slider(self):
        if self._loading:
            return
        p = self.current()
        if not p:
            return
        prm = self.params[p]
        values = {k: float(self.scales[k].get()) for k in KEYS}
        # Tk può richiamare il comando dello Scale in ritardo anche per set() da codice:
        # se i valori coincidono con quelli salvati non è stato l'utente a muovere il cursore.
        if all(abs(values[k] - prm[k]) < 1e-3 for k in KEYS):
            return
        prm.update(values)
        prm["preset"] = CUSTOM
        self.preset_var.set(CUSTOM)
        self.schedule_render()

    def on_fit(self):
        p = self.current()
        if not p:
            return
        label_to_key = {v: k for k, v in cv.FIT_MODES.items()}
        self.params[p]["fit"] = label_to_key.get(self.fit_var.get(), "fit")
        self.params[p]["rotate"] = bool(self.rotate_var.get())
        self.params[p]["ratio"] = self.ratio_var.get().strip() or "Originale"
        self._update_ratio_state()
        self.schedule_render()

    def _update_ratio_state(self):
        self.ratio_box.configure(state="normal" if self.fit_var.get() == cv.FIT_MODES["free"] else "disabled")

    def _ratio_of(self, prm, base):
        """Rapporto (larghezza/altezza) del riquadro di uscita per l'anteprima."""
        if prm["fit"] != "free":
            return 16 / 9
        try:
            return cv.parse_ratio(prm["ratio"]) or base.width / base.height
        except ValueError:
            return base.width / base.height

    def on_enabled(self):
        p = self.current()
        if p:
            self.params[p]["enabled"] = bool(self.enabled_var.get())
            self.schedule_render()

    def on_preset(self):
        p = self.current()
        name = self.preset_var.get()
        if not p or name not in cv.BALANCE_PRESETS:
            return
        prm = self.params[p]
        prm.update(cv.BALANCE_PRESETS[name])
        prm.update(enabled=True, preset=name)
        self._load_ui(prm)
        self.schedule_render()

    def apply_to_all(self):
        p = self.current()
        if not p:
            return
        src = self.params[p]
        for q in self.files:
            self.params[q] = dict(src)
        self.status_var.set(f"Regolazioni applicate a tutte le {len(self.files)} foto.")

    # ----------------------------------------------------------- anteprima
    def schedule_render(self):
        if self._job is not None:
            self.after_cancel(self._job)
        self._job = self.after(30, self.render)          # debounce

    def get_proxy(self, path):
        if path not in self.proxies:
            self.proxies[path] = load_proxy(path)
        return self.proxies[path]

    def render(self):
        self._job = None
        c = self.canvas
        cw, ch = max(c.winfo_width(), 2), max(c.winfo_height(), 2)
        c.delete("all")
        path = self.current()
        if not path:
            c.create_text(cw // 2, ch // 2, text="Aggiungi una o più foto per iniziare", fill="#aaaaaa")
            return
        try:
            base = self.get_proxy(path)
        except Exception as e:
            c.create_text(cw // 2, ch // 2, text=f"Impossibile aprire la foto:\n{e}", fill="#ff8888")
            return
        prm = self.params[path]
        if prm["rotate"] and prm["fit"] != "free" and base.height > base.width:
            base = base.transpose(Image.Transpose.ROTATE_270)
        proc = cv.optimize_tonal_balance(base, **{k: prm[k] for k in KEYS}) if prm["enabled"] else base

        mode = self.view_mode.get()
        panels = {"proc": [("Elaborata", proc)], "orig": [("Originale", base)],
                  "split": [("Originale", base), ("Elaborata", proc)]}[mode]
        n = len(panels)
        aspect = self._ratio_of(prm, base)
        w = max(16, min(cw // n, int(ch * aspect)))
        h = max(16, int(w / aspect))
        x0, y0 = (cw - w * n) // 2, (ch - h) // 2
        self._photos = []
        for i, (label, img) in enumerate(panels):
            tile = cv.fit_on_canvas(img, w, h, prm["fit"])
            ph = ImageTk.PhotoImage(tile)
            self._photos.append(ph)
            c.create_image(x0 + i * w, y0, anchor="nw", image=ph)
            c.create_rectangle(x0 + i * w, y0, x0 + i * w + 84, y0 + 20, fill="#000000", outline="")
            c.create_text(x0 + i * w + 6, y0 + 4, anchor="nw", text=label, fill="#ffffff")

    # ----------------------------------------------------------- esporta
    def pick_out(self):
        d = filedialog.askdirectory(title="Cartella di uscita", initialdir=self.out_var.get() or None)
        if d:
            self.out_var.set(d)

    def _log(self, text):
        self.log.configure(state="normal")
        self.log.insert("end", text.rstrip() + "\n")
        self.log.see("end")
        self.log.configure(state="disabled")

    def export(self):
        if self._exporting:
            return
        if not self.files:
            messagebox.showinfo("Nessuna foto", "Aggiungi prima delle foto.")
            return
        try:
            start = int(self.start_var.get())
            max_kb = int(self.maxkb_var.get())
            thumb_scale = float(self.thumbscale_var.get().replace(",", "."))
        except ValueError:
            messagebox.showerror("Valori non validi", "Controlla numero iniziale, limite KB e scala miniatura.")
            return
        out_dir = self.out_var.get().strip()
        if not out_dir:
            messagebox.showerror("Cartella mancante", "Scegli la cartella di uscita.")
            return
        jobs = []
        for i, src in enumerate(self.files):
            dst = os.path.join(out_dir, f"{cv.PREFIX}{start + i:0{cv.DIGITS}d}{cv.EXTENSION}")
            prm = self.params[src]
            balance = {k: prm[k] for k in KEYS} if prm["enabled"] else None
            try:
                ratio = cv.parse_ratio(prm["ratio"]) if prm["fit"] == "free" else None
            except ValueError:
                messagebox.showerror("Rapporto non valido",
                                     f"«{prm['ratio']}» ({os.path.basename(src)}): usa ad es. 3:4, 21:9 o 2.5.")
                return
            jobs.append((src, dst, balance, prm["fit"], prm["rotate"], ratio))
        existing = [j[1] for j in jobs if os.path.exists(j[1])]
        if existing and not messagebox.askyesno(
                "Sovrascrivere?", f"{len(existing)} file esistono già nella cartella di uscita.\nSovrascriverli?"):
            return
        os.makedirs(out_dir, exist_ok=True)

        self._exporting = True
        self.export_btn.configure(state="disabled")
        self.progress.configure(maximum=len(jobs), value=0)
        self.log.configure(state="normal"); self.log.delete("1.0", "end"); self.log.configure(state="disabled")
        threading.Thread(target=self._worker, args=(jobs, max_kb, self.thumb_var.get(), thumb_scale),
                         daemon=True).start()

    def _worker(self, jobs, max_kb, with_thumb, thumb_scale):
        errors = 0
        for i, (src, dst, balance, fit, rotate, ratio) in enumerate(jobs, start=1):
            buf = io.StringIO()
            try:
                with contextlib.redirect_stdout(buf):
                    cv.process_image(src, dst, balance=balance, with_thumb=with_thumb,
                                     max_kb=max_kb, thumb_scale=thumb_scale,
                                     fit=fit, rotate=rotate, ratio=ratio)
                self._queue.put(("log", buf.getvalue()))
            except Exception as e:
                errors += 1
                self._queue.put(("log", f"❌ {os.path.basename(src)}: {e}"))
            self._queue.put(("progress", i))
        self._queue.put(("done", errors))

    def _poll_queue(self):
        try:
            while True:
                kind, val = self._queue.get_nowait()
                if kind == "log":
                    self._log(val)
                elif kind == "progress":
                    self.progress.configure(value=val)
                    self.status_var.set(f"Conversione… {val}/{len(self.files)}")
                elif kind == "done":
                    self._exporting = False
                    self.export_btn.configure(state="normal")
                    self.status_var.set("Conversione completata." if val == 0 else f"Completata con {val} errori.")
                    self._log("Fatto! Copia i file nella cartella DCIM/100MEDIA della Micro-SD.")
        except queue.Empty:
            pass
        self.after(100, self._poll_queue)


def main():
    try:                                   # testo nitido su schermi HiDPI (Windows)
        import ctypes
        ctypes.windll.shcore.SetProcessDpiAwareness(1)
    except Exception:
        pass
    App().mainloop()


if __name__ == "__main__":
    main()
