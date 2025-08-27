import { useState, useEffect, useCallback, useMemo } from 'react';
import { preloadImage, setupLazyLoading } from '@/utils/imageOptimization';

export interface UseImageOptimizationOptions {
  preloadCritical?: boolean;
  enableLazyLoading?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export function useImageOptimization(options: UseImageOptimizationOptions = {}) {
  const { preloadCritical = true, enableLazyLoading = true, onLoad, onError } = options;
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());

  // Initialize lazy loading observer
  useEffect(() => {
    if (enableLazyLoading && typeof window !== 'undefined') {
      const imageObserver = setupLazyLoading();
      setObserver(imageObserver);

      return () => {
        imageObserver.disconnect();
      };
    }
  }, [enableLazyLoading]);

  // Preload critical images
  const preload = useCallback(async (src: string | string[]) => {
    const images = Array.isArray(src) ? src : [src];
    
    for (const imageSrc of images) {
      if (!preloadedImages.has(imageSrc)) {
        try {
          await preloadImage(imageSrc);
          setPreloadedImages(prev => new Set(prev).add(imageSrc));
          onLoad?.();
        } catch (error) {
          console.error(`Failed to preload image: ${imageSrc}`, error);
          onError?.();
        }
      }
    }
  }, [preloadedImages, onLoad, onError]);

  // Setup lazy loading for an element
  const setupLazyLoad = useCallback((element: HTMLElement) => {
    if (observer && element) {
      observer.observe(element);
    }
  }, [observer]);

  // Cleanup lazy loading for an element
  const cleanupLazyLoad = useCallback((element: HTMLElement) => {
    if (observer && element) {
      observer.unobserve(element);
    }
  }, [observer]);

  return {
    preload,
    setupLazyLoad,
    cleanupLazyLoad,
    isPreloaded: (src: string) => preloadedImages.has(src),
  };
}

// Hook for optimizing image URLs
export function useOptimizedImage(src: string, options?: {
  width?: number;
  height?: number;
  quality?: number;
}) {
  const { width = 800, height = 600, quality = 85 } = options || {};
  
  const optimizedSrc = useMemo(() => {
    if (!src || !src.includes('unsplash.com')) return src;
    
    const url = new URL(src);
    url.searchParams.set('w', width.toString());
    url.searchParams.set('h', height.toString());
    url.searchParams.set('q', quality.toString());
    url.searchParams.set('auto', 'format');
    url.searchParams.set('fit', 'crop');
    
    return url.toString();
  }, [src, width, height, quality]);

  return optimizedSrc;
}