import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { measureWebVitals, preloadCriticalResources } from "./utils/performance";

// Register service worker for caching
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('[SW] Service Worker registered');
      })
      .catch((error) => {
        console.log('[SW] Service Worker registration failed');
      });
  });
}

// Preload critical resources early
preloadCriticalResources();

createRoot(document.getElementById("root")!).render(<App />);

// Start performance monitoring
measureWebVitals();
