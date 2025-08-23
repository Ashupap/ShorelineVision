import { useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';

interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
}

export function useOptimizedAnimation(config: AnimationConfig = {}) {
  const shouldReduceMotion = useReducedMotion();
  
  return useMemo(() => {
    if (shouldReduceMotion) {
      return {
        duration: 0,
        delay: 0,
        ease: 'linear'
      };
    }
    
    return {
      duration: config.duration ?? 0.6,
      delay: config.delay ?? 0,
      ease: config.ease ?? 'easeOut'
    };
  }, [shouldReduceMotion, config.duration, config.delay, config.ease]);
}

// Common optimized animation presets
export const optimizedAnimations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: 'easeOut' }
  },
  
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4, ease: 'easeOut' }
  },
  
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};