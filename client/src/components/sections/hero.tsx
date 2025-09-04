import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { useState, useEffect, useRef, memo, useMemo } from "react";
import { Link } from "wouter";
import { PerformanceImage } from "@/components/ui/performance-image";
import factoryVideo from "@assets/Alashore-Marine-Factory_1755929476699.mp4";
import shrimpImage from "@assets/shrimp-optimized.webp";
import pomfretImage from "@assets/Pomfret_1755943114147.png";

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
  const seafoodTypes = ["Seafood", "Vannamei", "Pomfret"];

  // Seafood images in the exact order specified
  const seafoodImages = [
    {
      src: shrimpImage,
      alt: "Premium Vannamei Shrimp",
      title: "Vannamei Shrimp",
    },
    { src: pomfretImage, alt: "Fresh Pomfret Fish", title: "Pomfret Fish" },
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


  return (
    <section 
      ref={containerRef} 
      className="relative h-screen lg:h-screen flex items-center justify-center overflow-visible py-4 sm:py-8 lg:py-0"
      style={{ height: '100vh' }} // Exact viewport height for desktop
    >
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
          preload="auto"
          width="1920"
          height="1080"
          className="w-full h-full object-cover"
          style={{ 
            willChange: 'transform',
            aspectRatio: '16/9'
          }}
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
        <div className="absolute inset-0 bg-black/35"></div>
      </motion.div>

      {/* Simplified floating elements to reduce layout shifts */}
      <div className="absolute top-20 right-4 sm:right-20 w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 bg-coral-accent/20 rounded-full backdrop-blur-sm border border-white/20 z-5 opacity-60" />
      <div className="absolute bottom-20 sm:bottom-32 left-4 sm:left-16 w-12 sm:w-16 lg:w-24 h-12 sm:h-16 lg:h-24 bg-marine-teal/30 rounded-full backdrop-blur-sm border border-white/30 z-5 opacity-60" />
      <div className="absolute top-1/2 left-2 sm:left-10 w-8 sm:w-12 lg:w-16 h-8 sm:h-12 lg:h-16 bg-white/20 rounded-full backdrop-blur-sm z-5 opacity-40" />
      
      {/* Static bubble effects to prevent layout shifts */}
      <div className="absolute top-1/3 right-1/4 sm:right-1/3 w-10 sm:w-16 lg:w-20 h-10 sm:h-16 lg:h-20 bg-marine-teal/25 rounded-full backdrop-blur-sm border border-white/25 z-5 opacity-40" />
      <div className="absolute bottom-1/3 sm:bottom-1/4 right-1/5 sm:right-1/4 w-14 sm:w-20 lg:w-28 h-14 sm:h-20 lg:h-28 bg-coral-accent/15 rounded-full backdrop-blur-sm border border-white/15 z-5 opacity-30" />
      <div className="absolute top-2/3 sm:top-3/4 left-1/4 sm:left-1/3 w-8 sm:w-10 lg:w-14 h-8 sm:h-10 lg:h-14 bg-white/25 rounded-full backdrop-blur-sm z-5 opacity-35" />
      
      {/* Swimming Sea Creatures - Mobile Responsive */}
      <motion.div
        animate={{ 
          x: [-50, 1920 + 50],
          y: [0, -20, 0, 20, 0],
          rotate: [0, 5, 0, -5, 0]
        }}
        transition={{ 
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          delay: 0
        }}
        className="absolute top-1/4 -left-20 w-6 sm:w-8 h-3 sm:h-4 bg-gradient-to-r from-marine-teal/60 to-coral-accent/60 rounded-full z-5"
        style={{ clipPath: 'polygon(0% 50%, 60% 0%, 100% 50%, 60% 100%)' }}
      />
      <motion.div
        animate={{ 
          x: [1920 + 50, -100],
          y: [0, 15, 0, -15, 0],
          rotate: [180, 185, 180, 175, 180]
        }}
        transition={{ 
          duration: 30,
          repeat: Infinity,
          ease: "linear",
          delay: 8
        }}
        className="absolute bottom-1/3 -right-20 w-4 sm:w-6 h-2 sm:h-3 bg-gradient-to-l from-white/50 to-marine-teal/50 rounded-full z-5"
        style={{ clipPath: 'polygon(0% 50%, 60% 0%, 100% 50%, 60% 100%)' }}
      />
      <motion.div
        animate={{ 
          x: [-40, 1920 + 40],
          y: [0, -10, 0, 10, 0],
          rotate: [0, 3, 0, -3, 0]
        }}
        transition={{ 
          duration: 35,
          repeat: Infinity,
          ease: "linear",
          delay: 15
        }}
        className="absolute top-2/3 -left-16 w-3 sm:w-5 h-1 sm:h-2 bg-gradient-to-r from-coral-accent/40 to-golden-orange/40 rounded-full z-5"
        style={{ clipPath: 'polygon(0% 50%, 70% 0%, 100% 50%, 70% 100%)' }}
      />

      {/* Enhanced Responsive Layout */}
      <motion.div 
        style={{ y }}
        className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-16 lg:pt-20 xl:pt-24 flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-0 items-center h-full max-w-full"
      >
        {/* Enhanced Text and Buttons */}
        <motion.div
          initial={{ opacity: 0, x: -80, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-white space-y-4 sm:space-y-6 lg:space-y-8 lg:col-span-1 order-2 lg:order-1 text-center lg:text-left"
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
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight text-white"
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
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-light-marine max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            Your quest for quality seafood ends here
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start"
          >
            <Link href="/contact#contact-form">
              <motion.button
                whileHover={{ 
                  scale: 1.08,
                  boxShadow: "0 25px 50px rgba(255, 107, 107, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="relative bg-gradient-to-r from-coral-accent to-golden-orange hover:from-golden-orange hover:to-coral-accent text-white px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-bold transition-all duration-500 shadow-2xl overflow-hidden group w-full sm:w-auto"
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
            </Link>
            <Link href="/products#products">
              <motion.button
                whileHover={{ 
                  scale: 1.08,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderColor: "rgba(255, 107, 107, 1)"
                }}
                whileTap={{ scale: 0.95 }}
                className="relative border-2 border-white/70 text-white backdrop-blur-md px-6 sm:px-8 lg:px-10 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl font-bold transition-all duration-500 hover:text-coral-accent group overflow-hidden w-full sm:w-auto"
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
            </Link>
          </motion.div>
        </motion.div>

        {/* Responsive Seafood Image Slider */}
        <motion.div
          initial={{ opacity: 0, x: 80, rotateY: -30 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
          className="relative lg:col-span-1 order-1 lg:order-2 w-full"
          style={{ zIndex: 20 }}
        >
          {/* Responsive Container with Aspect Ratio */}
          <div className="relative w-full aspect-square max-w-[200px] sm:max-w-[240px] md:max-w-[300px] lg:max-w-lg xl:max-w-xl mx-auto hero-image-container overflow-hidden">
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
                className="relative w-full h-full"
                style={{ 
                  zIndex: 25
                }}
              >
                {/* Ken Burns Effect Container */}
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1.02],
                    x: [0, -4, 2],
                    y: [0, -2, 0],
                  }}
                  transition={{
                    duration: 4,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="w-full h-full flex items-center justify-center p-2 sm:p-3 md:p-4 lg:p-5 xl:p-6"
                >
                  <PerformanceImage
                    src={seafoodImages[currentImage].src}
                    alt={seafoodImages[currentImage].alt}
                    className={`max-w-full max-h-full object-contain filter brightness-110 contrast-105 ${
                      currentImage === 1 ? "mix-blend-multiply" : ""
                    }`}
                    sizes="(max-width: 384px) 200px, (max-width: 640px) 240px, (max-width: 768px) 300px, (max-width: 1024px) 448px, 512px"
                    width={512}
                    height={512}
                    priority={true}
                    placeholder="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMxYzJhM2E7c3RvcC1vcGFjaXR5OjAuMSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMxNDRlNGE7c3RvcC1vcGFjaXR5OjAuMSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNncmFkKSIvPjwvc3ZnPg=="
                    style={{
                      imageRendering: 'auto',
                      transform: 'translateZ(0)',
                      backfaceVisibility: 'hidden',
                      maxWidth: 'none',
                      maxHeight: 'none'
                    }}
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Custom Floating Shadow Component */}
            <motion.div
              key={`shadow-${currentImage}`}
              animate={{
                scale: [0.7, 0.9, 0.8],
                opacity: [0.3, 0.6, 0.4],
              }}
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 h-4 bg-black/30 rounded-full blur-lg"
              style={{ zIndex: 15 }}
            />
          </div>

          {/* Enhanced Bubble Particles */}
          <motion.div
            animate={{ y: [0, -100], x: [0, 10], opacity: [0.4, 0.8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-1/4 w-3 h-3 bg-white/40 rounded-full"
          />
          <motion.div
            animate={{ y: [0, -120], x: [0, -5], opacity: [0.3, 0.7, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              delay: 1,
            }}
            className="absolute bottom-0 right-1/3 w-2 h-2 bg-white/30 rounded-full"
          />
          <motion.div
            animate={{ y: [0, -80], x: [0, 8], opacity: [0.2, 0.6, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "linear",
              delay: 2,
            }}
            className="absolute bottom-0 left-1/2 w-4 h-4 bg-white/20 rounded-full"
          />
          <motion.div
            animate={{ y: [0, -110], x: [0, -8], opacity: [0.5, 0.9, 0] }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "linear",
              delay: 0.5,
            }}
            className="absolute bottom-0 left-1/3 w-2 h-2 bg-marine-teal/50 rounded-full"
          />
          <motion.div
            animate={{ y: [0, -90], x: [0, 12], opacity: [0.3, 0.8, 0] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "linear",
              delay: 1.5,
            }}
            className="absolute bottom-0 right-1/4 w-3 h-3 bg-coral-accent/40 rounded-full"
          />
          <motion.div
            animate={{ y: [0, -95], x: [0, -6], opacity: [0.4, 0.7, 0] }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "linear",
              delay: 2.5,
            }}
            className="absolute bottom-0 right-1/2 w-1 h-1 bg-white/60 rounded-full"
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
