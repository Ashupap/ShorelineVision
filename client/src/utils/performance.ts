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

// Web vitals monitoring
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
    
    // Measure Cumulative Layout Shift
    let cumulativeLayoutShiftScore = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          cumulativeLayoutShiftScore += (entry as any).value;
        }
      }
      console.log('CLS:', cumulativeLayoutShiftScore);
    });
    
    clsObserver.observe({ entryTypes: ['layout-shift'] });
  }
}