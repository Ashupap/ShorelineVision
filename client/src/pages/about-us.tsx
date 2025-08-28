import { lazy, Suspense } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AboutHeroSection from "@/components/about/hero-section";
import BeautifulLoader from "@/components/ui/beautiful-loader";

// Lazy load heavy sections for optimal performance
const LeadershipSection = lazy(() => import("@/components/about/leadership-section"));
const TimelineSection = lazy(() => import("@/components/about/timeline-section"));
const ValuesSection = lazy(() => import("@/components/about/values-section"));
const BlueWorldMap = lazy(() => import("@/components/blue-world-map"));

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section - Critical path, loaded immediately */}
        <AboutHeroSection />
        
        {/* Values Section - High priority */}
        <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
          <ValuesSection />
        </Suspense>
        
        {/* Timeline Section - Medium priority */}
        <Suspense fallback={<div className="h-screen bg-white animate-pulse" />}>
          <TimelineSection />
        </Suspense>
        
        {/* Leadership Section - Medium priority */}
        <Suspense fallback={<div className="h-96 bg-gray-50 animate-pulse" />}>
          <LeadershipSection />
        </Suspense>
        
        {/* Global Presence Section - Lower priority */}
        <Suspense fallback={<div className="h-96 bg-white animate-pulse" />}>
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
                  Global <span className="text-ocean-blue">Presence</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Serving premium seafood to customers across the world
                </p>
              </div>
              <div className="max-w-4xl mx-auto">
                <BlueWorldMap />
              </div>
            </div>
          </section>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}