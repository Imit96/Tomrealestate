// Service Worker for PWA functionality
const CACHE_NAME = 'casa-de-casablanca-v1.0.0';
const STATIC_CACHE_NAME = 'casa-static-v1.0.0';
const DYNAMIC_CACHE_NAME = 'casa-dynamic-v1.0.0';

// Assets to cache immediately
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/main.js',
    '/assets/logo.svg',
    '/assets/logo-white.svg',
    '/manifest.json',
    // Add critical images
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    // Add fallback offline page
    '/offline.html'
];

// Network-first strategy for these URLs
const NETWORK_FIRST_URLS = [
    '/api/',
    '/contact',
    '/calculator'
];

// Cache-first strategy for these file types
const CACHE_FIRST_PATTERNS = [
    /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
    /\.(?:css|js)$/,
    /\.(?:woff|woff2|ttf|otf)$/
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        Promise.all([
            caches.open(STATIC_CACHE_NAME).then((cache) => {
                console.log('Service Worker: Caching static assets');
                return cache.addAll(STATIC_ASSETS);
            }),
            // Skip waiting to activate immediately
            self.skipWaiting()
        ])
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        Promise.all([
            // Clean up old caches
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((cacheName) => {
                            return cacheName !== STATIC_CACHE_NAME && 
                                   cacheName !== DYNAMIC_CACHE_NAME;
                        })
                        .map((cacheName) => {
                            console.log('Service Worker: Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        })
                );
            }),
            // Take control of all clients
            self.clients.claim()
        ])
    );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip chrome-extension and other protocols
    if (!url.protocol.startsWith('http')) {
        return;
    }
    
    event.respondWith(handleFetch(request));
});

async function handleFetch(request) {
    const url = new URL(request.url);
    
    try {
        // Network-first strategy for API calls and dynamic content
        if (NETWORK_FIRST_URLS.some(pattern => url.pathname.startsWith(pattern))) {
            return await networkFirst(request);
        }
        
        // Cache-first strategy for static assets
        if (CACHE_FIRST_PATTERNS.some(pattern => pattern.test(url.pathname))) {
            return await cacheFirst(request);
        }
        
        // Stale-while-revalidate for HTML pages
        if (request.headers.get('accept')?.includes('text/html')) {
            return await staleWhileRevalidate(request);
        }
        
        // Default: Network-first with cache fallback
        return await networkFirst(request);
        
    } catch (error) {
        console.error('Service Worker: Fetch failed:', error);
        return await handleFetchError(request);
    }
}

// Network-first strategy
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            // Cache successful responses
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        // Fallback to cache
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        throw error;
    }
}

// Cache-first strategy
async function cacheFirst(request) {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
        return cachedResponse;
    }
    
    // If not in cache, fetch and cache
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('Service Worker: Cache-first failed:', error);
        throw error;
    }
}

// Stale-while-revalidate strategy
async function staleWhileRevalidate(request) {
    const cachedResponse = await caches.match(request);
    
    // Start network request in background
    const networkResponsePromise = fetch(request).then(async (response) => {
        if (response.ok) {
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, response.clone());
        }
        return response;
    }).catch(() => {
        // Ignore network errors in background
    });
    
    // Return cached version immediately if available
    if (cachedResponse) {
        return cachedResponse;
    }
    
    // If no cache, wait for network
    return await networkResponsePromise;
}

// Handle fetch errors with fallbacks
async function handleFetchError(request) {
    const url = new URL(request.url);
    
    // Fallback for HTML pages
    if (request.headers.get('accept')?.includes('text/html')) {
        const offlinePage = await caches.match('/offline.html');
        if (offlinePage) {
            return offlinePage;
        }
    }
    
    // Fallback for images
    if (request.destination === 'image') {
        const fallbackImage = await caches.match('/assets/fallback-image.svg');
        if (fallbackImage) {
            return fallbackImage;
        }
    }
    
    // Return generic error response
    return new Response('Network error', {
        status: 408,
        headers: { 'Content-Type': 'text/plain' }
    });
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
    if (event.tag === 'contact-form') {
        event.waitUntil(processContactForms());
    }
    
    if (event.tag === 'investment-inquiry') {
        event.waitUntil(processInvestmentInquiries());
    }
});

async function processContactForms() {
    try {
        // Get pending contact forms from IndexedDB
        const pendingForms = await getPendingContactForms();
        
        for (const form of pendingForms) {
            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(form.data)
                });
                
                if (response.ok) {
                    await removePendingContactForm(form.id);
                    console.log('Contact form synced successfully');
                }
            } catch (error) {
                console.error('Failed to sync contact form:', error);
            }
        }
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

async function processInvestmentInquiries() {
    // Similar implementation for investment inquiries
    console.log('Processing investment inquiries...');
}

// Push notification handling
self.addEventListener('push', (event) => {
    if (!event.data) return;
    
    const data = event.data.json();
    const options = {
        body: data.body,
        icon: '/assets/icon-192x192.png',
        badge: '/assets/badge-72x72.png',
        data: data.data,
        actions: [
            {
                action: 'view',
                title: 'View Details',
                icon: '/assets/view-icon.png'
            },
            {
                action: 'dismiss',
                title: 'Dismiss',
                icon: '/assets/dismiss-icon.png'
            }
        ],
        vibrate: [200, 100, 200],
        requireInteraction: true
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title, options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    
    if (event.action === 'view') {
        const url = event.notification.data?.url || '/';
        event.waitUntil(
            clients.openWindow(url)
        );
    }
});

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage({
            type: 'VERSION',
            version: CACHE_NAME
        });
    }
});

// Helper functions for IndexedDB operations
async function getPendingContactForms() {
    // Implementation would use IndexedDB to store offline form submissions
    return [];
}

async function removePendingContactForm(id) {
    // Implementation would remove synced form from IndexedDB
    console.log('Removing synced form:', id);
}

// Periodic background sync for critical updates
self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'property-updates') {
        event.waitUntil(updatePropertyData());
    }
});

async function updatePropertyData() {
    try {
        const response = await fetch('/api/properties/updates');
        if (response.ok) {
            const data = await response.json();
            // Cache updated property data
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put('/api/properties', new Response(JSON.stringify(data)));
        }
    } catch (error) {
        console.error('Failed to update property data:', error);
    }
}
