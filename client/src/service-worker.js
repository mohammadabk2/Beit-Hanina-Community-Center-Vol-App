import { precacheAndRoute } from 'workbox-precaching';

// Precache and route assets
precacheAndRoute(window.self.__WB_MANIFEST);

// Additional service worker code (e.g., caching strategies) can go here