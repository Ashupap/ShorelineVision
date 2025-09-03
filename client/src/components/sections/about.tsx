import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { PerformanceImage } from "@/components/ui/performance-image";
import factoryImage from "@assets/4-1 (1)_1756901765521.png";
import processingImage from "@assets/2-1_1756901827544.png";

export default function About() {
  const [, navigate] = useLocation();
  const [currentImage, setCurrentImage] = useState(0);
  
  const images = [
    {
      src: factoryImage,
      alt: "Alashore Marine aerial view of modern seafood processing facility",
      title: "State-of-the-Art Facility"
    },
    {
      src: processingImage,
      alt: "Professional seafood processing team in hygienic environment",
      title: "Quality Processing"
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000); // Change every 4 seconds
    
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-light-marine to-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-ocean-blue text-lg font-semibold mb-2">About Alashore</h3>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
              What We Do
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Welcome to Alashore Marine, where we redefine seafood excellence with a commitment to quality, 
              sustainability, and exquisite taste. As a leading seafood exporter, we bring the finest ocean 
              treasures straight to your table through meticulously sourced and processed premium exports.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Our sustainable aquaculture practices, recognized by top organizations, reflect a dedication 
              to responsible farming and a positive environmental impact. With a customer-centric approach, 
              we prioritize your satisfaction, ensuring a seamless experience for restaurants, retail partners, 
              and individuals seeking the best in seafood.
            </p>
            <Link href="/about-us">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-ocean-blue text-white px-8 py-3 rounded-lg hover:bg-deep-navy transition-colors duration-300"
                data-testid="button-about-learn-more"
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Image Carousel */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="relative"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <PerformanceImage
                      src={images[currentImage].src}
                      alt={images[currentImage].alt}
                      className="w-full h-[400px] object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                      priority={currentImage === 0}
                      loading={currentImage === 0 ? "eager" : "lazy"}
                      placeholder="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmMGY5ZmY7c3RvcC1vcGFjaXR5OjAuNCIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNlMGY3ZmE7c3RvcC1vcGFjaXR5OjAuNCIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0idXJsKCNncmFkKSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSIjNjM3M0IzIiBvcGFjaXR5PSIwLjciPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+"
                      style={{
                        imageRendering: 'crisp-edges',
                        transform: 'translateZ(0)',
                        backfaceVisibility: 'hidden'
                      }}
                    />
                    {/* Image title overlay */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 backdrop-blur-sm text-white px-6 py-3 rounded-lg">
                      <p className="font-semibold text-lg text-center">{images[currentImage].title}</p>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
              
              {/* Preload next image for smoother transitions */}
              <div className="hidden">
                <PerformanceImage
                  src={images[(currentImage + 1) % images.length].src}
                  alt="Preloaded image"
                  loading="lazy"
                  className="opacity-0"
                />
              </div>
              
              {/* Carousel indicators */}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImage(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      index === currentImage ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
                    }`}
                    data-testid={`carousel-indicator-${index}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Floating quality badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-6 bg-coral-accent text-white p-6 rounded-xl shadow-lg z-10"
            >
              <h4 className="text-2xl font-bold">15+</h4>
              <p className="text-sm">Years Experience</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
