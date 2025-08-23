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
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.p 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-heading font-bold text-ocean-blue mb-6"
              >
                90+ Customers Globally
              </motion.p>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="w-24 h-1 bg-gradient-to-r from-coral-accent to-golden-orange mx-auto rounded-full"
              />
            </motion.div>
            {/* Main Container with 3D perspective */}
            <div className="relative perspective-1000 h-96">
              {/* Background animated elements */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute inset-0 bg-gradient-to-r from-coral-accent/5 to-golden-orange/5 rounded-3xl"
              />
              
              {/* Multi-layer slider container */}
              <div className="relative h-full flex items-center justify-center overflow-hidden rounded-3xl bg-white/20 backdrop-blur-xl border border-white/40 shadow-2xl">
                {/* Floating particles effect */}
                <motion.div
                  animate={{
                    y: [-20, 20, -20],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-4 left-4 w-2 h-2 bg-coral-accent rounded-full"
                />
                <motion.div
                  animate={{
                    y: [20, -20, 20],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 2
                  }}
                  className="absolute bottom-4 right-4 w-3 h-3 bg-golden-orange rounded-full"
                />
                
                {/* Primary slider - Forward direction */}
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="absolute flex space-x-8 items-center"
                >
                  {[
                    { name: "AZURE", img: "@assets/AZURE_1755944927383.png" },
                    { name: "COSTAR", img: "@assets/Costar_1755944927383.png" },
                    { name: "GEISHA", img: "@assets/GEISHA_1755944927383.png" },
                    { name: "GENSEA", img: "@assets/GENSEA_1755944927383.png" },
                    { name: "GOLDEN BAY", img: "@assets/Golden-bay_1755944927383.png" },
                    { name: "SEASTAR", img: "@assets/Seastar_1755944927383.png" },
                    { name: "SELECT", img: "@assets/SELECT_1755944927384.png" }
                  ].concat([
                    { name: "AZURE", img: "@assets/AZURE_1755944927383.png" },
                    { name: "COSTAR", img: "@assets/Costar_1755944927383.png" },
                    { name: "GEISHA", img: "@assets/GEISHA_1755944927383.png" }
                  ]).map((logo, index) => (
                    <motion.div
                      key={`primary-${index}`}
                      initial={{ rotateY: 0, z: 0 }}
                      whileHover={{ 
                        rotateY: 15,
                        z: 50,
                        scale: 1.15,
                        transition: { duration: 0.4, type: "spring", stiffness: 300 }
                      }}
                      className="flex-shrink-0 preserve-3d group cursor-pointer"
                    >
                      <motion.div
                        className="relative w-32 h-20 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 flex items-center justify-center transform-gpu"
                        whileHover={{
                          boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
                          y: -10
                        }}
                      >
                        {/* Shine effect */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-2xl"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "100%" }}
                          transition={{ duration: 0.6 }}
                        />
                        <img
                          src={logo.img}
                          alt={logo.name}
                          className="max-w-full max-h-full object-contain filter drop-shadow-sm group-hover:filter-none transition-all duration-300"
                        />
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Secondary slider - Reverse direction with offset */}
                <motion.div
                  animate={{ x: ["100%", "-100%"] }}
                  transition={{ duration: 35, repeat: Infinity, ease: "linear", delay: 5 }}
                  className="absolute flex space-x-8 items-center top-24"
                >
                  {[
                    { name: "SEASTAR", img: "@assets/Seastar_1755944927383.png" },
                    { name: "SELECT", img: "@assets/SELECT_1755944927384.png" },
                    { name: "AZURE", img: "@assets/AZURE_1755944927383.png" },
                    { name: "GENSEA", img: "@assets/GENSEA_1755944927383.png" },
                    { name: "GOLDEN BAY", img: "@assets/Golden-bay_1755944927383.png" }
                  ].concat([
                    { name: "COSTAR", img: "@assets/Costar_1755944927383.png" },
                    { name: "GEISHA", img: "@assets/GEISHA_1755944927383.png" }
                  ]).map((logo, index) => (
                    <motion.div
                      key={`secondary-${index}`}
                      initial={{ rotateY: 0, scale: 0.8, opacity: 0.7 }}
                      whileHover={{ 
                        rotateY: -15,
                        scale: 1.05,
                        opacity: 1,
                        transition: { duration: 0.4, type: "spring", stiffness: 300 }
                      }}
                      className="flex-shrink-0 preserve-3d group cursor-pointer"
                    >
                      <motion.div
                        className="relative w-28 h-16 bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-white/40 flex items-center justify-center transform-gpu"
                        whileHover={{
                          boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                          y: -8
                        }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-l from-transparent via-white/20 to-transparent rounded-xl"
                          initial={{ x: "100%" }}
                          whileHover={{ x: "-100%" }}
                          transition={{ duration: 0.8 }}
                        />
                        <img
                          src={logo.img}
                          alt={logo.name}
                          className="max-w-full max-h-full object-contain filter drop-shadow-sm group-hover:filter-none transition-all duration-300"
                        />
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Floating center showcase */}
                <motion.div
                  animate={{
                    y: [-10, 10, -10],
                    rotateY: [0, 5, 0, -5, 0],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute z-20 transform-gpu preserve-3d"
                >
                  <motion.div
                    className="relative w-40 h-24 bg-white backdrop-blur-md rounded-3xl shadow-2xl border border-white/60 flex items-center justify-center"
                    whileHover={{
                      scale: 1.2,
                      rotateY: 10,
                      z: 100,
                      boxShadow: "0 30px 60px rgba(0,0,0,0.3)"
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-coral-accent/20 to-golden-orange/20 rounded-3xl"
                      animate={{
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <img
                      src="@assets/Golden-bay_1755944927383.png"
                      alt="Featured Customer"
                      className="max-w-full max-h-full object-contain relative z-10"
                    />
                  </motion.div>
                </motion.div>
                
                {/* Corner accents */}
                <motion.div
                  animate={{ rotate: [0, 90, 180, 270, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-coral-accent/50 rounded-tl-lg"
                />
                <motion.div
                  animate={{ rotate: [360, 270, 180, 90, 0] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-golden-orange/50 rounded-br-lg"
                />
              </div>
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
