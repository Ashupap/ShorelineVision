// Bundle size analysis utilities
export function analyzeBundleSize() {
  if (typeof window !== 'undefined' && 'performance' in window) {
    // Check for large resources
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    const largeResources = resources.filter(resource => resource.transferSize > 500000); // > 500KB
    
    if (largeResources.length > 0) {
      console.group('📦 Large Bundle Resources (>500KB)');
      largeResources.forEach(resource => {
        console.log(`${resource.name}: ${Math.round(resource.transferSize / 1024)}KB`);
      });
      console.groupEnd();
    }
    
    // Suggest optimizations
    const totalTransferSize = resources.reduce((sum, r) => sum + (r.transferSize || 0), 0);
    if (totalTransferSize > 2000000) { // > 2MB
      console.warn('💡 Consider code splitting or lazy loading for better performance');
    }
  }
}

// Check for unused CSS classes (development only)
export function analyzeUnusedCSS() {
  if (import.meta.env.DEV && typeof document !== 'undefined') {
    const allElements = document.querySelectorAll('*');
    const usedClasses = new Set<string>();
    
    allElements.forEach(el => {
      if (el.className && typeof el.className === 'string') {
        el.className.split(' ').forEach(cls => {
          if (cls.trim()) usedClasses.add(cls.trim());
        });
      }
    });
    
    console.log(`📊 CSS Classes in use: ${usedClasses.size}`);
  }
}