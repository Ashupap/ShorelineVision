// WebP Image Optimization Utilities

export interface ImageFormat {
  webp: string;
  fallback: string;
  alt: string;
  width?: number;
  height?: number;
}

// Convert image URLs to optimized WebP format with fallbacks
export function createOptimizedImageSrc(originalSrc: string): ImageFormat {
  // For Unsplash images, add WebP format parameter
  if (originalSrc.includes('unsplash.com')) {
    const webpSrc = `${originalSrc}&fm=webp&q=85`;
    return {
      webp: webpSrc,
      fallback: `${originalSrc}&q=85&fm=jpg`,
      alt: ''
    };
  }
  
  // For local assets, create WebP versions
  if (originalSrc.includes('attached_assets') || originalSrc.includes('generated_images')) {
    const webpSrc = originalSrc.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    return {
      webp: webpSrc,
      fallback: originalSrc,
      alt: ''
    };
  }
  
  return {
    webp: originalSrc,
    fallback: originalSrc,
    alt: ''
  };
}

// Preload critical images in WebP format with fallbacks
export function preloadOptimizedImages(imageSources: string[]) {
  if (typeof window === 'undefined') return;
  
  imageSources.forEach(src => {
    const optimized = createOptimizedImageSrc(src);
    
    // Try to preload WebP first
    const webpLink = document.createElement('link');
    webpLink.rel = 'preload';
    webpLink.as = 'image';
    webpLink.href = optimized.webp;
    webpLink.type = 'image/webp';
    
    // Fallback to original format
    webpLink.onerror = () => {
      const fallbackLink = document.createElement('link');
      fallbackLink.rel = 'preload';
      fallbackLink.as = 'image';
      fallbackLink.href = optimized.fallback;
      document.head.appendChild(fallbackLink);
    };
    
    document.head.appendChild(webpLink);
  });
}

// Check WebP support
export function supportsWebP(): Promise<boolean> {
  return new Promise((resolve) => {
    const webP = new Image();
    webP.onload = webP.onerror = () => {
      resolve(webP.height === 2);
    };
    webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  });
}