"""Lists the selectors of src/assets/style.css whose classes or ids appear nowhere in the app's
code (templates, scripts, index.html); with --write it removes them.
Usage: python3 scripts/find-unused-css.py [--write]"""
import re, sys, glob, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
css_path = f'{ROOT}/src/assets/style.css'
css = open(css_path).read()
corpus = ''
for f in glob.glob(f'{ROOT}/src/**/*', recursive=True):
    if os.path.isfile(f) and not f.endswith('style.css') and not f.endswith('vendor-bootstrap-subset.css'):
        try: corpus += open(f).read() + '\n'
        except Exception: pass
corpus += open(f'{ROOT}/index.html').read()

def used(tok):
    # Vue <Transition name="x"> classes: x-enter-active, x-leave-to…
    t = re.match(r'^(.+)-(enter|leave)(-active|-from|-to)?$', tok)
    if t and re.search(r'name=["\']' + re.escape(t.group(1)) + r'["\']', corpus): return True
    if re.search(r'(?<![\w-])' + re.escape(tok) + r'(?![\w-])', corpus): return True
    # dynamic names: `fret-${i}`, 's' + n, `ls-step--${type}`, cls + '-x'
    m = re.match(r'^(.*?[-_]{1,2})([a-z0-9]+)$', tok) or re.match(r'^([a-z]+)(\d+)$', tok)
    if m:
        pre = m.group(1)
        if re.search(re.escape(pre) + r'\$\{', corpus) or re.search(r"['\"`]" + re.escape(pre) + r"['\"`]\s*\+", corpus): return True
    return False

def selector_dead(sel):
    toks = re.findall(r'[.#]([A-Za-z_][\w-]*)', re.sub(r'\[[^\]]*\]|:not\([^)]*\)', '', sel))
    return any(not used(t) for t in toks)

# walk the stylesheet keeping @media blocks; rewrite rules dropping dead selector parts
out, i, n, dropped, kept = [], 0, len(css), [], 0
def process(text):
    global kept
    res, i = [], 0
    while i < len(text):
        j = text.find('{', i)
        if j < 0: res.append(text[i:]); break
        # comments/whitespace before the prelude stay as they are
        pre = text[i:j]
        k, depth = j + 1, 1
        while depth:
            if text[k] == '{': depth += 1
            elif text[k] == '}': depth -= 1
            k += 1
        body = text[j + 1:k - 1]
        lead = re.match(r'^((?:\s|/\*.*?\*/)*)', pre, re.S).group(1)
        prelude = pre[len(lead):]
        p = prelude.strip()
        if p.startswith('@media') or p.startswith('@supports'):
            inner = process(body)
            if inner.strip(): res.append(f'{lead}{prelude}{{{inner}}}')
            else: dropped.append(p)
        elif p.startswith('@'):
            res.append(f'{lead}{prelude}{{{body}}}')
        else:
            parts = [x.strip() for x in p.split(',')]
            live = [x for x in parts if not selector_dead(x)]
            for x in parts:
                if x not in live: dropped.append(x)
            if live:
                kept += 1
                sep = ',\n' if '\n' in p else ', '
                trail = prelude[len(prelude.rstrip()):]
                res.append(f'{lead}{sep.join(live)}{trail}{{{body}}}')
            else:
                res.append(lead.rstrip(' ') if lead.strip() else '')
        i = k
    return ''.join(res)
new = process(css)
print('dropped selectors:', len(dropped))
for d in dropped: print('  ', d[:110].replace('\n', ' '))
if '--write' in sys.argv:
    new = re.sub(r'\n{3,}', '\n\n', new)
    open(css_path, 'w').write(new)
    print('written', len(css.splitlines()), '→', len(new.splitlines()), 'lines')
