/* Skylroom service worker — makes the app installable and available offline.
   Strategy: network-first for same-origin requests (so your edits always show),
   falling back to the cache only when offline. Cross-origin requests
   (Supabase, Google Fonts, AdSense) are never intercepted. */

const CACHE = "skylroom-v1";
const CORE = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./config.js",
  "./assets/favicon.svg",
  "./assets/icon-192.png",
  "./assets/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  // Only handle same-origin GETs; let everything else go straight to the network.
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;

  e.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(req).then((hit) => hit || caches.match("./index.html")))
  );
});
