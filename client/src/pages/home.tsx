import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Products from "@/components/sections/products";
import Stats from "@/components/sections/stats";
import Testimonials from "@/components/sections/testimonials";
import Contact from "@/components/sections/contact";

export default function Home() {
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
            <div className="overflow-hidden rounded-2xl bg-white/50 backdrop-blur-md border border-white/30 p-8">
              <motion.div 
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="flex space-x-16 items-center justify-center"
              >
                {["SEASTAR", "COSTAR", "GEISHA", "SELECT", "GOLDEN BAY", "AZURE", "GENSEA", "SEASTAR", "COSTAR", "GEISHA"].map((logo, index) => (
                  <motion.div 
                    key={index} 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 h-20 w-40 bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-lg flex items-center justify-center border border-gray-200/50"
                  >
                    <span className="text-ocean-blue font-bold text-lg">{logo}</span>
                  </motion.div>
                ))}
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
}
