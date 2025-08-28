// Service Worker for performance optimization
const CACHE_NAME = 'alashore-marine-v1';
const CRITICAL_ASSETS = [
  '/',
  '/client/src/main.tsx',
  '/attached_assets/Alashore-Marine-Factory_1755929476699.mp4',
  '/attached_assets/ChatGPT Image Jun 18, 2025, 04_26_01 PM_1755932209807.png',
  '/attached_assets/Pomfret_1755943114147.png',
  '/attached_assets/Sheer Fish_1755943118147.png',
  // Add more critical assets as needed
];

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching critical assets');
        return cache.addAll(CRITICAL_ASSETS);
      })
      .catch((error) => {
        console.error('[SW] Cache install failed:', error);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache when possible
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip API requests - let them go to network
  if (event.request.url.includes('/api/')) return;
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version if available
        if (response) {
          return response;
        }
        
        // Otherwise fetch from network and cache for static assets
        return fetch(event.request).then((response) => {
          // Only cache successful responses for static assets
          if (response.status === 200 && isStaticAsset(event.request.url)) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        });
      })
      .catch(() => {
        // Return a basic offline page for navigation requests
        if (event.request.mode === 'navigate') {
          return new Response(
            '<!DOCTYPE html><html><head><title>Offline</title></head><body><h1>You are offline</h1><p>Please check your internet connection.</p></body></html>',
            { headers: { 'Content-Type': 'text/html' } }
          );
        }
      })
  );
});

// Helper function to determine if URL is a static asset
function isStaticAsset(url) {
  const staticExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.mp4', '.webm'];
  return staticExtensions.some(ext => url.includes(ext)) || url.includes('attached_assets');
}