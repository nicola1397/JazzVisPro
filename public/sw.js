// JazzViz Pro service worker: the app keeps working without a connection.
//
// - pages: from the network when there is one (so a new version arrives), otherwise the
//   copy kept from the last visit
// - built files (/assets/…, names that change with every version): from the cache once fetched
// - everything else from this site (audio library, chord fingerings, icons) and the web fonts:
//   the cached copy at once, refreshed in the background
// Bump VERSION to drop every cache of the previous one.
const VERSION = 'v1'
const CACHE = `jazzviz-${VERSION}`
const CORE = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './libs/Tone.js']

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('jazzviz-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

const FONT_HOSTS = ['fonts.googleapis.com', 'fonts.gstatic.com']

self.addEventListener('fetch', event => {
  const req = event.request
  if (req.method !== 'GET') return
  const url = new URL(req.url)
  const sameOrigin = url.origin === self.location.origin
  if (!sameOrigin && !FONT_HOSTS.includes(url.hostname)) return

  if (req.mode === 'navigate') {
    event.respondWith(networkFirst(req, './index.html'))
  } else if (sameOrigin && url.pathname.includes('/assets/')) {
    event.respondWith(cacheFirst(req))
  } else {
    event.respondWith(staleWhileRevalidate(req))
  }
})

async function networkFirst(req, fallback) {
  const cache = await caches.open(CACHE)
  try {
    const res = await fetch(req)
    if (res.ok) cache.put(fallback, res.clone())
    return res
  } catch {
    return (await cache.match(fallback)) || (await cache.match('./')) || Response.error()
  }
}

async function cacheFirst(req) {
  const cache = await caches.open(CACHE)
  const hit = await cache.match(req)
  if (hit) return hit
  const res = await fetch(req)
  if (res.ok) cache.put(req, res.clone())
  return res
}

async function staleWhileRevalidate(req) {
  const cache = await caches.open(CACHE)
  const hit = await cache.match(req)
  const update = fetch(req).then(res => {
    if (res.ok || res.type === 'opaque') cache.put(req, res.clone())
    return res
  }).catch(() => hit)
  return hit || update
}
