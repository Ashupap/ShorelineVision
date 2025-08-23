import { Suspense, lazy, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

const defaultFallback = (
  <div className="flex items-center justify-center py-20">
    <div className="flex items-center space-x-3">
      <div className="w-6 h-6 border-3 border-ocean-blue border-t-transparent rounded-full animate-spin"></div>
      <span className="text-gray-600 font-medium">Loading section...</span>
    </div>
  </div>
);

export function LazySection({ 
  children, 
  fallback = defaultFallback,
  className = "" 
}: LazySectionProps) {
  return (
    <div className={className}>
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </div>
  );
}

// Create lazy components for heavy sections
export const LazyAbout = lazy(() => import('@/components/sections/about'));
export const LazyProducts = lazy(() => import('@/components/sections/products'));
export const LazyStats = lazy(() => import('@/components/sections/stats'));
export const LazyTestimonials = lazy(() => import('@/components/sections/testimonials'));
export const LazyContact = lazy(() => import('@/components/sections/contact'));

// Lightweight skeleton components for better perceived performance
export const AboutSkeleton = () => (
  <div className="py-24 space-y-8">
    <div className="text-center space-y-4">
      <div className="h-12 bg-gray-200 rounded-lg w-64 mx-auto animate-pulse"></div>
      <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
    </div>
    <div className="grid md:grid-cols-2 gap-12">
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
    </div>
  </div>
);

export const ProductsSkeleton = () => (
  <div className="py-24 space-y-8">
    <div className="text-center space-y-4">
      <div className="h-12 bg-gray-200 rounded-lg w-64 mx-auto animate-pulse"></div>
      <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
    </div>
    <div className="grid md:grid-cols-3 gap-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-4">
          <div className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      ))}
    </div>
  </div>
);