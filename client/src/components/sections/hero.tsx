import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { useState, useEffect, useRef, memo, useMemo } from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import factoryVideo from "@assets/Alashore-Marine-Factory_1755929476699.mp4";
import shrimpImage from "@assets/ChatGPT Image Jun 18, 2025, 04_26_01 PM_1755932209807.png";
import fishImage from "@assets/ChatGPT Image Jun 18, 2025, 04_27_29 PM_1755934453469.png";
import tunaImage from "@assets/ChatGPT Image Jun 18, 2025, 04_34_39 PM_1755932236429.png";

const Hero = memo(function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleEffect = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(parallaxY, springConfig);
  
  const [currentText, setCurrentText] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);
  const seafoodTypes = ["Seafood", "Vannamei", "Pomfret", "Sheer Fish"];

  // Seafood images in the exact order specified
  const seafoodImages = [
    {
      src: shrimpImage,
      alt: "Premium Vannamei Shrimp",
      title: "Vannamei Shrimp",
    },
    { src: fishImage, alt: "Fresh Pomfret Fish", title: "Pomfret Fish" },
    { src: tunaImage, alt: "Premium Tuna Fish", title: "Tuna Fish" },
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
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video with Parallax */}
      <motion.div 
        style={{ scale: scaleEffect, opacity: parallaxOpacity }}
        className="absolute inset-0 z-0"
      >
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          style={{ willChange: 'transform' }}
        >
          <source src={factoryVideo} type="video/mp4" />
        </video>
        {/* Enhanced Video overlay with gradient animation */}
        <motion.div 
          animate={{ 
            background: [
              "linear-gradient(45deg, rgba(20, 78, 117, 0.9), rgba(29, 155, 155, 0.85), rgba(15, 23, 42, 0.9))",
              "linear-gradient(45deg, rgba(29, 155, 155, 0.9), rgba(15, 23, 42, 0.85), rgba(20, 78, 117, 0.9))",
              "linear-gradient(45deg, rgba(20, 78, 117, 0.9), rgba(29, 155, 155, 0.85), rgba(15, 23, 42, 0.9))"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-20 w-32 h-32 bg-coral-accent/20 rounded-full backdrop-blur-sm border border-white/20 z-5"
      />
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -10, 0],
          scale: [1, 0.9, 1]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-32 left-16 w-24 h-24 bg-marine-teal/30 rounded-full backdrop-blur-sm border border-white/30 z-5"
      />
      <motion.div
        animate={{ 
          x: [0, 40, 0],
          y: [0, -20, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
        className="absolute top-1/2 left-10 w-16 h-16 bg-white/20 rounded-full backdrop-blur-sm z-5"
      />

      {/* Enhanced Responsive Layout */}
      <motion.div 
        style={{ y }}
        className="relative z-10 container mx-auto px-4 pt-20 md:pt-16 flex flex-col lg:grid lg:grid-cols-5 gap-8 items-center min-h-screen"
      >
        {/* Enhanced Text and Buttons */}
        <motion.div
          initial={{ opacity: 0, x: -80, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-white space-y-8 lg:col-span-3 order-1 lg:order-1"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="inline-flex items-center bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20"
          >
            <Sparkles className="text-coral-accent mr-2" size={20} />
            <span className="text-white/90 font-medium">Premium Quality Since 2012</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-tight text-white"
          >
            Premium{" "}
            <motion.span
              key={currentText}
              initial={{ opacity: 0, y: 30, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -30, rotateX: 90 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-coral-accent inline-block relative"
            >
              {seafoodTypes[currentText]}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-coral-accent to-golden-orange origin-left"
              />
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Exporter From
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="text-marine-teal"
            >
              India
            </motion.span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-xl md:text-2xl lg:text-3xl text-light-marine max-w-xl leading-relaxed"
          >
            Your quest for quality seafood ends here
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-6"
          >
            <motion.button
              whileHover={{ 
                scale: 1.08,
                boxShadow: "0 25px 50px rgba(255, 107, 107, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="relative bg-gradient-to-r from-coral-accent to-golden-orange hover:from-golden-orange hover:to-coral-accent text-white px-10 py-5 rounded-2xl text-xl font-bold transition-all duration-500 shadow-2xl overflow-hidden group"
              data-testid="button-hero-get-in-touch"
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">GET IN TOUCH</span>
            </motion.button>
            <motion.button
              whileHover={{ 
                scale: 1.08,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "rgba(255, 107, 107, 1)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="relative border-2 border-white/70 text-white backdrop-blur-md px-10 py-5 rounded-2xl text-xl font-bold transition-all duration-500 hover:text-coral-accent group overflow-hidden"
              data-testid="button-hero-view-products"
            >
              <motion.div
                className="absolute inset-0 bg-white"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.4 }}
                style={{ originX: 0.5, originY: 0.5 }}
              />
              <span className="relative z-10 group-hover:text-ocean-blue transition-colors duration-300">
                View Products
              </span>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Enhanced Seafood Image Slider */}
        <motion.div
          initial={{ opacity: 0, x: 80, rotateY: -30 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
          className="relative h-96 lg:h-full flex items-center justify-center lg:col-span-2 overflow-hidden order-2 lg:order-2 w-full"
        >
          {/* Slider Container */}
          <div className="relative w-full h-full max-w-md max-h-96 rounded-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage}
                initial={{
                  x: 300,
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  x: -300,
                  opacity: 0,
                  scale: 0.8,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Ken Burns Effect Container */}
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1.05],
                    x: [0, -10, 5],
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="w-full h-full"
                >
                  <OptimizedImage
                    src={seafoodImages[currentImage].src}
                    alt={seafoodImages[currentImage].alt}
                    className={`w-full h-full object-contain drop-shadow-2xl filter brightness-110 contrast-105 ${
                      currentImage === 1 ? "mix-blend-multiply" : ""
                    }`}
                    priority
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Visible Shadow Under Image */}
            <motion.div
              animate={{
                scale: [0.8, 1, 0.9],
                opacity: [0.4, 0.7, 0.5],
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-8 bg-black/30 rounded-full blur-lg"
            />
          </div>

          {/* Floating particles for ambiance */}
          <motion.div
            animate={{ y: [0, -100] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-1/4 w-3 h-3 bg-white/40 rounded-full"
          />
          <motion.div
            animate={{ y: [0, -120] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              delay: 1,
            }}
            className="absolute bottom-0 right-1/3 w-2 h-2 bg-white/30 rounded-full"
          />
          <motion.div
            animate={{ y: [0, -80] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "linear",
              delay: 2,
            }}
            className="absolute bottom-0 left-1/2 w-4 h-4 bg-white/20 rounded-full"
          />
        </motion.div>
      </motion.div>

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
});

export default Hero;
