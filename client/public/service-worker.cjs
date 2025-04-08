// client/public/service-worker.js

// Import the Workbox library
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js'); // Use a suitable version

// Ensure new SW activates quickly
workbox.core.skipWaiting();
workbox.core.clientsClaim();

// **THE CRUCIAL PLACEHOLDER**
// Workbox will inject the precache manifest here.
// This line replaces your manual `cache.addAll(assetsToCache)` for build assets.
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

// Optional: You can still add custom logic if needed.
// For example, a simple network-first or cache-first strategy for runtime requests.
// Or your fallback to index.html logic:
self.addEventListener('fetch', (event) => {
  // Let Workbox handle precached assets first
  // You might not need this custom fetch handler if Workbox precaching covers everything,
  // or you might want more specific runtime caching rules using workbox.routing.registerRoute
  if (event.request.mode === 'navigate') {
     event.respondWith(
       fetch(event.request).catch(() => caches.match('/index.html')) // Assuming index.html is precached by Workbox or cached separately
     );
   }
   // For other assets, you might rely on Workbox's precaching or define specific runtime strategies.
});


// Optional: Clean up old Workbox caches (Workbox handles this automatically for precaches,
// but you might need it if you define custom cache names with workbox.routing)
// self.addEventListener('activate', (event) => { ... }); // Usually not needed for basic Workbox precaching

console.log("Workbox Service Worker Loaded");