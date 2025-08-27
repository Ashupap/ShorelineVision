// Image optimization utilities for better performance

export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'jpeg' | 'png' | 'avif';
  fit?: 'crop' | 'fill' | 'scale';
}

/**
 * Optimize Unsplash image URLs with proper parameters
 */
export function optimizeUnsplashImage(
  url: string, 
  options: ImageOptimizationOptions = {}
): string {
  if (!url.includes('unsplash.com')) return url;
  
  const { width = 800, height = 600, quality = 85, format = 'webp', fit = 'crop' } = options;
  
  // Parse existing URL
  const urlObj = new URL(url);
  
  // Set optimization parameters
  urlObj.searchParams.set('w', width.toString());
  urlObj.searchParams.set('h', height.toString());
  urlObj.searchParams.set('q', quality.toString());
  urlObj.searchParams.set('fit', fit);
  urlObj.searchParams.set('fm', format);
  urlObj.searchParams.set('auto', 'format');
  
  return urlObj.toString();
}

/**
 * Generate responsive image srcset for different screen sizes
 */
export function generateSrcSet(baseUrl: string, sizes: number[] = [480, 768, 1024, 1280, 1920]): string {
  if (!baseUrl.includes('unsplash.com')) return '';
  
  return sizes
    .map(size => `${optimizeUnsplashImage(baseUrl, { width: size })} ${size}w`)
    .join(', ');
}

/**
 * Create optimized image placeholder using base64 encoding
 */
export function createPlaceholder(width: number = 400, height: number = 300, color: string = '#f3f4f6'): string {
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="${color}"/>
    <text x="50%" y="50%" font-family="Arial" font-size="14" fill="#9ca3af" text-anchor="middle" dy=".3em">Loading...</text>
  </svg>`;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Preload critical images for better Core Web Vitals
 */
export function preloadImage(src: string, as: 'image' = 'image'): Promise<void> {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = as;
    link.href = src;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to preload ${src}`));
    document.head.appendChild(link);
  });
}

/**
 * Lazy load images with intersection observer
 */
export function setupLazyLoading(): IntersectionObserver {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        if (src) {
          img.src = src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });

  return imageObserver;
}