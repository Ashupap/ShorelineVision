import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, memo, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import ContactFormModal from "@/components/contact-form-modal";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Products from "@/components/sections/products";
import Stats from "@/components/sections/stats";
import Testimonials from "@/components/sections/testimonials";

// Customer Logo Imports
import azureLogo from "@assets/AZURE_1755944927383.png";
import costarLogo from "@assets/Costar_1755944927383.png";
import geishaLogo from "@assets/GEISHA_1755944927383.png";
import genseaLogo from "@assets/GENSEA_1755944927383.png";
import goldenBayLogo from "@assets/Golden-bay_1755944927383.png";
import seastarLogo from "@assets/Seastar_1755944927383.png";
import selectLogo from "@assets/SELECT_1755944927384.png";

const Home = memo(function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(parallaxY, springConfig);

  return (
    <div ref={containerRef} className="min-h-screen bg-background relative overflow-x-hidden">
      <Header onEnquiryClick={() => setIsContactModalOpen(true)} />
      <main>
        <Hero />
        <motion.section 
          style={{ y }}
          className="py-20 bg-gradient-to-br from-white via-light-marine/10 to-white relative overflow-hidden"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-10 right-10 w-40 h-40 bg-marine-teal/10 rounded-full backdrop-blur-sm"
          />
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-ocean-blue text-lg font-semibold mb-2">Our Network</h3>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
                90+ Customers <span className="text-coral-accent">Globally</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Trusted by leading seafood companies across the globe, we deliver premium quality 
                and sustainable practices that set industry standards. Our extensive network spans 
                multiple continents, serving diverse markets with excellence.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                From premium restaurants to major retail chains, our customers rely on our 
                commitment to quality, consistency, and reliability in every shipment.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative flex items-center justify-center"
            >
              {/* Enhanced Orbital Animation Container */}
              <div className="relative h-[500px] w-full overflow-hidden rounded-xl flex items-center justify-center">
                {/* Gradient Background */}
                <motion.div
                  animate={{
                    background: [
                      "radial-gradient(circle, rgba(255,107,107,0.1) 0%, rgba(255,165,0,0.05) 50%, transparent 100%)",
                      "radial-gradient(circle, rgba(255,165,0,0.1) 0%, rgba(255,107,107,0.05) 50%, transparent 100%)",
                      "radial-gradient(circle, rgba(255,107,107,0.1) 0%, rgba(255,165,0,0.05) 50%, transparent 100%)"
                    ]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0"
                />
                
                {/* Central Hub - Enhanced */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <motion.div
                    className="relative w-28 h-28 bg-gradient-to-br from-white via-coral-accent/20 to-golden-orange/20 rounded-full shadow-2xl border-3 border-white/60 backdrop-blur-xl flex items-center justify-center"
                    whileHover={{
                      scale: 1.4,
                      boxShadow: "0 0 60px rgba(255, 107, 107, 0.6)",
                      transition: { type: "spring", stiffness: 300 }
                    }}
                  >
                    <motion.div
                      animate={{ rotate: [0, -360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="text-ocean-blue font-bold text-xs text-center leading-tight"
                    >
                      GLOBAL<br/>TRUST
                    </motion.div>
                    {/* Pulsing ring */}
                    <motion.div
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.8, 0, 0.8]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                      className="absolute inset-0 border-2 border-coral-accent rounded-full"
                    />
                  </motion.div>
                </motion.div>

                {/* Enhanced Orbital Rings with Dynamic Effects */}
                {[
                  { radius: 100, logos: [{ name: "AZURE", img: azureLogo }, { name: "COSTAR", img: costarLogo }, { name: "GEISHA", img: geishaLogo }], duration: 12, size: 16 },
                  { radius: 150, logos: [{ name: "GENSEA", img: genseaLogo }, { name: "GOLDEN BAY", img: goldenBayLogo }], duration: 18, size: 18 },
                  { radius: 200, logos: [{ name: "SEASTAR", img: seastarLogo }, { name: "SELECT", img: selectLogo }], duration: 25, size: 20 }
                ].map((ring, ringIndex) => (
                  <motion.div
                    key={ringIndex}
                    animate={{ rotate: ringIndex % 2 === 0 ? [0, 360] : [360, 0] }}
                    transition={{
                      duration: ring.duration,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      width: ring.radius * 2,
                      height: ring.radius * 2
                    }}
                  >
                    {/* Orbital path visualization */}
                    <motion.div
                      animate={{ opacity: [0.1, 0.3, 0.1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 border border-dashed border-coral-accent/20 rounded-full"
                    />
                    
                    {ring.logos.map((logo, logoIndex) => {
                      const angle = (360 / ring.logos.length) * logoIndex;
                      const radian = (angle * Math.PI) / 180;
                      const x = Math.cos(radian) * ring.radius;
                      const y = Math.sin(radian) * ring.radius;
                      
                      return (
                        <motion.div
                          key={`${ringIndex}-${logoIndex}`}
                          className="absolute transform -translate-x-1/2 -translate-y-1/2"
                          style={{
                            left: `50%`,
                            top: `50%`,
                            x: x,
                            y: y
                          }}
                          animate={{
                            y: [0, -4, 0],
                            scale: [1, 1.05, 1]
                          }}
                          transition={{
                            duration: 4 + Math.random() * 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 3
                          }}
                          whileHover={{
                            scale: 1.6,
                            zIndex: 50,
                            transition: { type: "spring", stiffness: 500, damping: 15 }
                          }}
                        >
                          <motion.div
                            animate={{ rotate: ringIndex % 2 === 0 ? [0, -360] : [360, 0] }}
                            transition={{
                              duration: ring.duration * 1.5,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                            className="relative group cursor-pointer"
                          >
                            <motion.div
                              className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-white/70 flex items-center justify-center transform-gpu relative overflow-hidden"
                              style={{ width: `${ring.size * 4}px`, height: `${ring.size * 4}px` }}
                              whileHover={{
                                boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
                                y: -8,
                                rotateY: 10
                              }}
                            >
                              {/* Enhanced ripple effect - optimized for mobile */}
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-coral-accent/30 to-golden-orange/30 rounded-2xl opacity-0 group-hover:opacity-100 hidden md:block"
                                initial={{ scale: 0, rotate: 0 }}
                                whileHover={{
                                  scale: [0, 2, 1],
                                  rotate: [0, 180],
                                  transition: { duration: 0.8 }
                                }}
                              />
                              {/* Glow effect - disabled on mobile */}
                              <motion.div
                                className="absolute inset-0 bg-white/20 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 hidden md:block"
                                animate={{
                                  scale: [1, 1.2, 1],
                                  opacity: [0, 0.6, 0]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              />
                              <img
                                src={logo.img}
                                alt={logo.name}
                                className="max-w-full max-h-full object-contain relative z-10 filter drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300"
                              />
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                ))}

                {/* Enhanced Floating Particles - reduced on mobile */}
                {Array.from({ length: 6 }).map((_, index) => {
                  const randomLeft = 20 + Math.random() * 60;
                  const randomTop = 20 + Math.random() * 60;
                  const randomSize = 2 + Math.random() * 4;
                  const randomOpacity = 0.3 + Math.random() * 0.4;
                  
                  return (
                    <motion.div
                      key={`particle-${index}`}
                      className="absolute rounded-full"
                      style={{
                        width: `${randomSize}px`,
                        height: `${randomSize}px`,
                        background: `linear-gradient(45deg, rgba(255,107,107,${randomOpacity}), rgba(255,165,0,${randomOpacity}))`,
                        left: `${randomLeft}%`,
                        top: `${randomTop}%`
                      }}
                      animate={{
                        x: [0, Math.random() * 300 - 150, Math.random() * 200 - 100, 0],
                        y: [0, Math.random() * 250 - 125, Math.random() * 150 - 75, 0],
                        opacity: [0.2, 0.6, 0.4, 0.2],
                        scale: [0.5, 1.2, 1, 0.5]
                      }}
                      transition={{
                        duration: 12 + Math.random() * 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 8
                      }}
                    />
                  );
                })}

                {/* Enhanced Connecting Lines */}
                <motion.div
                  animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                  transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-coral-accent/15 rounded-full"
                />
                <motion.div
                  animate={{ rotate: [360, 0], scale: [1, 0.9, 1] }}
                  transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 border border-golden-orange/15 rounded-full"
                />
              </div>
              
              {/* Quality badge - matching About section style */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -left-6 bg-coral-accent text-white p-6 rounded-xl shadow-lg z-30"
              >
                <h4 className="text-2xl font-bold">90+</h4>
                <p className="text-sm">Global Partners</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
        </motion.section>
        <About />
        <Stats />
        <Products />
        
        {/* Get In Touch Call-to-Action Section */}
        <motion.section 
          style={{ y: useTransform(scrollYProgress, [0.7, 1], [0, -50]) }}
          className="py-32 bg-gradient-to-br from-ocean-blue via-marine-teal to-deep-navy text-white relative overflow-hidden"
        >
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.3, 1]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full backdrop-blur-sm"
          />
          <motion.div
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0]
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-0 left-0 w-64 h-64 bg-coral-accent/10 rounded-full backdrop-blur-sm"
          />
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-heading font-bold mb-8 leading-tight"
              >
                Discover Fresh Flavors<br />
                <motion.span
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="text-coral-accent"
                >
                  Order Premium Seafood Today!
                </motion.span>
              </motion.h2>
              <motion.p 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                viewport={{ once: true }}
                className="text-xl md:text-2xl text-light-marine mb-12 max-w-4xl mx-auto leading-relaxed"
              >
                Explore our exquisite selection of freshly caught seafood, sourced from the world's finest waters. 
                Order now to experience the taste of quality and sustainability!
              </motion.p>
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 25px 50px rgba(255, 107, 107, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsContactModalOpen(true)}
                className="relative bg-gradient-to-r from-coral-accent to-golden-orange hover:from-golden-orange hover:to-coral-accent text-white px-12 py-6 rounded-2xl text-xl font-bold transition-all duration-500 shadow-2xl overflow-hidden group"
                data-testid="button-get-in-touch"
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">GET IN TOUCH</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.section>
        
        <Testimonials />
      </main>
      <Footer />
      
      {/* Contact Form Modal */}
      <ContactFormModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
});

export default Home;
