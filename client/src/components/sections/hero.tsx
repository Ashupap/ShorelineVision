import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const scrollToAbout = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
        >
          <source src="/attached_assets/Alashore-Marine-Factory_1755929476699.mp4" type="video/mp4" />
        </video>
        {/* Video overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-blue/80 via-marine-teal/70 to-deep-navy/80"></div>
      </div>

      {/* Two Column Layout */}
      <div className="relative z-10 container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-screen">
        
        {/* Left Column - Text and Buttons */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white space-y-6"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight">
            Welcome to<br />
            <span className="text-gradient bg-gradient-to-r from-white to-light-marine bg-clip-text text-transparent">
              ALASHORE MARINE
            </span>
            <br />
            <span className="text-xl md:text-2xl lg:text-3xl font-normal">EXPORTS Pvt. Ltd.</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-light-marine max-w-xl">
            Your quest for quality seafood ends here
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="bg-coral-accent hover:bg-golden-orange text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
              data-testid="button-hero-get-in-touch"
            >
              GET IN TOUCH
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-2 border-white text-white hover:bg-white hover:text-ocean-blue px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
              data-testid="button-hero-view-products"
            >
              View Products
            </motion.button>
          </div>
        </motion.div>

        {/* Right Column - Animated Seafood */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative h-96 lg:h-full flex items-center justify-center"
        >
          {/* Vannamei Shrimp */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-16 left-8 text-6xl md:text-8xl filter drop-shadow-lg"
          >
            🦐
          </motion.div>

          {/* Pomfret Fish */}
          <motion.div
            animate={{
              y: [0, -15, 0],
              x: [0, 10, 0],
              rotate: [0, -3, 3, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute top-32 right-12 text-5xl md:text-7xl filter drop-shadow-lg"
          >
            🐟
          </motion.div>

          {/* Sheer Fish */}
          <motion.div
            animate={{
              y: [0, -25, 0],
              x: [0, -15, 0],
              rotate: [0, 8, -8, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-24 left-16 text-5xl md:text-7xl filter drop-shadow-lg"
          >
            🐠
          </motion.div>

          {/* Additional animated elements for depth */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-marine-teal/20 to-coral-accent/20 rounded-full blur-xl"
          />

          {/* Floating bubbles for ocean effect */}
          <motion.div
            animate={{ y: [0, -100] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-1/4 w-3 h-3 bg-white/40 rounded-full"
          />
          <motion.div
            animate={{ y: [0, -120] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1 }}
            className="absolute bottom-0 right-1/3 w-2 h-2 bg-white/30 rounded-full"
          />
          <motion.div
            animate={{ y: [0, -80] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 2 }}
            className="absolute bottom-0 left-1/2 w-4 h-4 bg-white/20 rounded-full"
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white cursor-pointer"
        onClick={scrollToAbout}
        data-testid="button-scroll-indicator"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}
