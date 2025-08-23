import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import factoryVideo from "@assets/Alashore-Marine-Factory_1755929476699.mp4";
import shrimpImage from "@assets/ChatGPT Image Jun 18, 2025, 04_26_01 PM_1755932209807.png";
import fishImage from "@assets/ChatGPT Image Jun 18, 2025, 04_27_29 PM_1755932209808.png";
import tunaImage from "@assets/ChatGPT Image Jun 18, 2025, 04_34_39 PM_1755932236429.png";

export default function Hero() {
  const [currentText, setCurrentText] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const seafoodTypes = ["Seafood", "Vannamei", "Pomfret", "Sheer Fish"];
  
  // Seafood images in the exact order specified
  const seafoodImages = [
    { src: shrimpImage, alt: "Premium Vannamei Shrimp", title: "Vannamei Shrimp" },
    { src: fishImage, alt: "Fresh Pomfret Fish", title: "Pomfret Fish" },
    { src: tunaImage, alt: "Premium Tuna Fish", title: "Tuna Fish" }
  ];

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % seafoodTypes.length);
    }, 2500); // Change every 2.5 seconds

    return () => clearInterval(textInterval);
  }, [seafoodTypes.length]);

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % seafoodImages.length);
    }, 4000); // Change every 4 seconds for longer viewing

    return () => clearInterval(imageInterval);
  }, [seafoodImages.length]);
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
          <source src={factoryVideo} type="video/mp4" />
        </video>
        {/* Video overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-blue/90 via-marine-teal/85 to-deep-navy/90"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Two Column Layout */}
      <div className="relative z-10 container mx-auto px-4 pt-20 md:pt-16 grid grid-cols-1 lg:grid-cols-5 gap-8 items-center min-h-screen">
        
        {/* Left Column - Text and Buttons */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white space-y-6 lg:col-span-3"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight text-white">
            Premium{" "}
            <motion.span
              key={currentText}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-golden-orange inline-block"
            >
              {seafoodTypes[currentText]}
            </motion.span>
            <br />
            Exporter From
            <br />
            India
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

        {/* Right Column - Seafood Image Slider */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative h-96 lg:h-full flex items-center justify-center lg:col-span-2 overflow-hidden"
        >
          {/* Slider Container */}
          <div className="relative w-full h-full max-w-md max-h-96 rounded-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage}
                initial={{ 
                  x: currentImage % 2 === 0 ? 300 : -300,
                  opacity: 0,
                  scale: 0.8,
                  rotateY: currentImage % 2 === 0 ? 25 : -25
                }}
                animate={{ 
                  x: 0,
                  opacity: 1,
                  scale: 1,
                  rotateY: 0
                }}
                exit={{ 
                  x: currentImage % 2 === 0 ? -300 : 300,
                  opacity: 0,
                  scale: 0.8,
                  rotateY: currentImage % 2 === 0 ? -25 : 25
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeInOut",
                  scale: { duration: 1.4 },
                  rotateY: { duration: 1.6 }
                }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Ken Burns Effect Container */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1.05],
                    x: [0, -10, 5],
                    y: [0, -5, 0]
                  }}
                  transition={{
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="w-full h-full"
                >
                  <img
                    src={seafoodImages[currentImage].src}
                    alt={seafoodImages[currentImage].alt}
                    className="w-full h-full object-contain drop-shadow-2xl filter brightness-110 contrast-105"
                  />
                </motion.div>

                {/* Image Title Overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="absolute bottom-4 left-4 right-4 text-center"
                >
                  <div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
                    <h3 className="text-white font-semibold text-lg">
                      {seafoodImages[currentImage].title}
                    </h3>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Slider Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {seafoodImages.map((_, index) => (
                <motion.div
                  key={index}
                  initial={false}
                  animate={{
                    scale: currentImage === index ? 1.2 : 1,
                    opacity: currentImage === index ? 1 : 0.5
                  }}
                  transition={{ duration: 0.3 }}
                  className={`w-2 h-2 rounded-full ${
                    currentImage === index ? 'bg-golden-orange' : 'bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Floating particles for ambiance */}
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
