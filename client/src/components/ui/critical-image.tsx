import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface CriticalImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

export function CriticalImage({
  src,
  alt,
  className = "",
  priority = true,
  onLoad,
  onError,
}: CriticalImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority && src) {
      // Preload critical images immediately
      const img = new Image();
      img.src = src;
      img.onload = () => {
        setIsLoaded(true);
        onLoad?.();
      };
      img.onerror = () => {
        setHasError(true);
        onError?.();
      };
    }
  }, [src, priority, onLoad, onError]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return (
      <div className={`bg-gray-100 flex items-center justify-center text-gray-400 ${className}`}>
        Failed to load image
      </div>
    );
  }

  return (
    <motion.img
      ref={imgRef}
      src={src}
      alt={alt}
      className={className}
      style={{ 
        willChange: isLoaded ? 'auto' : 'opacity',
        transform: 'translateZ(0)',
        imageRendering: 'auto',
        backfaceVisibility: 'hidden'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.2 }}
      onLoad={handleLoad}
      onError={handleError}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}