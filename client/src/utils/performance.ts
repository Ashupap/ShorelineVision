import { lazy } from 'react';

// Performance utilities

// Lazy load components with timeout fallback
export function createLazyComponent<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>
) {
  const LazyComponent = lazy(() => {
    return Promise.race([
      factory(),
      new Promise<{ default: T }>((_, reject) =>
        setTimeout(() => reject(new Error('Component load timeout')), 10000)
      )
    ]);
  });

  return LazyComponent;
}

// Preload critical images
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

// Preload critical assets
export function preloadAssets(assets: string[]): Promise<void[]> {
  return Promise.all(assets.map(preloadImage));
}

// Check if user prefers reduced motion
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Throttle scroll events
export function throttleScroll(callback: () => void, delay: number = 16) {
  let isThrottled = false;
  
  return () => {
    if (!isThrottled) {
      isThrottled = true;
      requestAnimationFrame(() => {
        callback();
        isThrottled = false;
      });
    }
  };
}

// Critical resource preloader
export function preloadCriticalResources() {
  if (typeof window !== 'undefined') {
    // Preload hero video
    const videoLink = document.createElement('link');
    videoLink.rel = 'preload';
    videoLink.as = 'video';
    videoLink.href = '/attached_assets/Alashore-Marine-Factory_1755929476699.mp4';
    document.head.appendChild(videoLink);
    
    // Preload critical images
    const criticalImages = [
      '/attached_assets/ChatGPT Image Jun 18, 2025, 04_26_01 PM_1755932209807.png',
      '/attached_assets/Pomfret_1755943114147.png',
      '/attached_assets/Sheer Fish_1755943118147.png'
    ];
    
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }
}

// Optimized web vitals monitoring with reduced logging
let clsTimeout: NodeJS.Timeout;
export function measureWebVitals() {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Measure First Contentful Paint
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          console.log('FCP:', entry.startTime);
        }
        if (entry.name === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
      }
    });
    
    observer.observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
    
    // Debounced CLS measurement to reduce console spam
    let cumulativeLayoutShiftScore = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          cumulativeLayoutShiftScore += (entry as any).value;
        }
      }
      
      // Debounce CLS logging to reduce spam
      clearTimeout(clsTimeout);
      clsTimeout = setTimeout(() => {
        if (cumulativeLayoutShiftScore > 0.1) {
          console.warn('High CLS detected:', cumulativeLayoutShiftScore);
        }
      }, 1000);
    });
    
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  }
}