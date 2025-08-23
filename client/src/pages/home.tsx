import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, memo } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Products from "@/components/sections/products";
import Stats from "@/components/sections/stats";
import Testimonials from "@/components/sections/testimonials";
import Contact from "@/components/sections/contact";

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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(parallaxY, springConfig);

  return (
    <div ref={containerRef} className="min-h-screen bg-background relative">
      <Header />
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
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Text Column */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center lg:text-left"
              >
                <motion.p 
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-ocean-blue mb-6 leading-tight"
                >
                  90+ Customers
                  <br />
                  <span className="text-coral-accent">Globally</span>
                </motion.p>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="w-24 h-1 bg-gradient-to-r from-coral-accent to-golden-orange mx-auto lg:mx-0 rounded-full mb-6"
                />
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                  viewport={{ once: true }}
                  className="text-lg md:text-xl text-ocean-blue/70 max-w-lg mx-auto lg:mx-0 leading-relaxed"
                >
                  Trusted by leading seafood companies across the globe, delivering premium quality and sustainable practices that set industry standards.
                </motion.p>
              </motion.div>
              
              {/* Animation Column */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex justify-center lg:justify-end"
              >
                {/* Orbital Animation Container */}
            <div className="relative h-[500px] w-full max-w-4xl mx-auto">
              {/* Central Hub */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
              >
                <motion.div
                  className="relative w-24 h-24 bg-gradient-to-br from-white via-coral-accent/10 to-golden-orange/10 rounded-full shadow-2xl border-2 border-white/50 backdrop-blur-xl flex items-center justify-center"
                  whileHover={{
                    scale: 1.3,
                    boxShadow: "0 0 50px rgba(255, 107, 107, 0.5)"
                  }}
                >
                  <motion.div
                    animate={{ rotate: [0, -360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="text-ocean-blue font-bold text-sm"
                  >
                    TRUSTED
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Orbital Rings */}
              {[
                { radius: 120, logos: [{ name: "AZURE", img: azureLogo }, { name: "COSTAR", img: costarLogo }, { name: "GEISHA", img: geishaLogo }], duration: 15 },
                { radius: 180, logos: [{ name: "GENSEA", img: genseaLogo }, { name: "GOLDEN BAY", img: goldenBayLogo }], duration: 25 },
                { radius: 240, logos: [{ name: "SEASTAR", img: seastarLogo }, { name: "SELECT", img: selectLogo }], duration: 35 }
              ].map((ring, ringIndex) => (
                <motion.div
                  key={ringIndex}
                  animate={{ rotate: [0, 360] }}
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
                        whileHover={{
                          scale: 1.4,
                          zIndex: 50,
                          transition: { type: "spring", stiffness: 400, damping: 10 }
                        }}
                      >
                        <motion.div
                          animate={{ rotate: [0, -360] }}
                          transition={{
                            duration: ring.duration,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          className="relative group cursor-pointer"
                        >
                          <motion.div
                            className="w-20 h-20 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/60 flex items-center justify-center transform-gpu relative overflow-hidden"
                            whileHover={{
                              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                              y: -5
                            }}
                          >
                            {/* Magnetic ripple effect */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-br from-coral-accent/20 to-golden-orange/20 rounded-2xl opacity-0 group-hover:opacity-100"
                              initial={{ scale: 0 }}
                              whileHover={{
                                scale: [0, 1.5, 1],
                                transition: { duration: 0.6 }
                              }}
                            />
                            <img
                              src={logo.img}
                              alt={logo.name}
                              className="max-w-full max-h-full object-contain relative z-10 filter drop-shadow-md"
                            />
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ))}

              {/* Floating Particles */}
              {Array.from({ length: 8 }).map((_, index) => (
                <motion.div
                  key={`particle-${index}`}
                  className="absolute w-2 h-2 bg-coral-accent/40 rounded-full"
                  animate={{
                    x: [0, Math.random() * 400 - 200, 0],
                    y: [0, Math.random() * 300 - 150, 0],
                    opacity: [0.3, 0.8, 0.3],
                    scale: [0.5, 1.2, 0.5]
                  }}
                  transition={{
                    duration: 8 + Math.random() * 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 2
                  }}
                  style={{
                    left: `50%`,
                    top: `50%`
                  }}
                />
              ))}

              {/* Connecting Lines */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-coral-accent/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: [360, 0] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 border border-golden-orange/20 rounded-full"
              />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
        <About />
        <Stats />
        <Products />
        <Testimonials />
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
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
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
        <Contact />
      </main>
      <Footer />
    </div>
  );
});

export default Home;
