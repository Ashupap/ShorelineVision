import { memo, useState } from "react";
import { motion } from "framer-motion";
import { createOptimizedImageSrc } from "@/utils/webpOptimization";

interface OptimizedPictureProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  aspectRatio?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedPicture = memo(function OptimizedPicture({
  src,
  alt,
  className = "",
  priority = false,
  width,
  height,
  aspectRatio,
  onLoad,
  onError,
}: OptimizedPictureProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const optimizedSrc = createOptimizedImageSrc(src);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const containerStyle = {
    aspectRatio: aspectRatio || (width && height ? `${width}/${height}` : undefined),
    width: width || undefined,
    height: height || undefined,
  };

  return (
    <div className={`relative overflow-hidden ${className}`} style={containerStyle}>
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 animate-pulse" />
      )}
      
      {/* Optimized picture element with WebP support */}
      <picture>
        <source srcSet={optimizedSrc.webp} type="image/webp" />
        <motion.img
          src={optimizedSrc.fallback}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-cover"
          style={{
            willChange: isLoaded ? 'auto' : 'opacity',
            transform: 'translateZ(0)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      </picture>
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <span className="text-gray-400 text-sm">Image unavailable</span>
        </div>
      )}
    </div>
  );
});