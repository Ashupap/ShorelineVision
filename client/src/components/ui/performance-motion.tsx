import { motion, MotionProps } from "framer-motion";
import { memo, ReactNode } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface PerformanceMotionProps extends MotionProps {
  children: ReactNode;
  className?: string;
  triggerOnce?: boolean;
  threshold?: number;
  enableGPU?: boolean;
}

// Optimized motion component that only animates when in view
export const PerformanceMotion = memo(function PerformanceMotion({
  children,
  className = "",
  triggerOnce = true,
  threshold = 0.1,
  enableGPU = true,
  initial,
  animate,
  whileInView,
  viewport,
  ...motionProps
}: PerformanceMotionProps) {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold,
    triggerOnce,
  });

  // Use GPU acceleration when needed
  const style = enableGPU 
    ? { 
        willChange: hasIntersected ? 'auto' : 'transform',
        transform: 'translateZ(0)' // Force hardware acceleration
      }
    : undefined;

  return (
    <motion.div
      ref={elementRef}
      className={className}
      style={style}
      initial={initial}
      animate={hasIntersected ? animate : initial}
      whileInView={whileInView}
      viewport={{ once: triggerOnce, ...viewport }}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
});

// Lightweight animation presets for common use cases
export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export const fadeInLeft = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export const fadeInRight = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: "easeOut" }
};

export const slideIn = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" }
};