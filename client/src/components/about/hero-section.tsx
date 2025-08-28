import { motion } from "framer-motion";
import { PerformanceImage } from "@/components/ui/performance-image";
import processingFacilityBg from "@assets/generated_images/Seafood_processing_facility_background_fd3ca7c1.png";

export default function AboutHeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <PerformanceImage
          src={processingFacilityBg}
          alt="Alashore Marine processing facility"
          className="w-full h-full object-cover"
          priority={true}
          width={1920}
          height={1080}
          aspectRatio="16/9"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ocean-blue/80 via-marine-teal/70 to-deep-navy/80"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 text-center text-white max-w-4xl mx-auto px-4"
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="text-4xl md:text-6xl font-heading font-bold mb-6"
        >
          Our <span className="text-coral-accent">Story</span> & 
          <br />Legacy of <span className="text-golden-orange">Excellence</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xl md:text-2xl text-light-marine mb-8 leading-relaxed"
        >
          From humble beginnings to global leadership in premium seafood exports
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
            <span className="font-semibold">Est. 1997</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
            <span className="font-semibold">25+ Years Experience</span>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20">
            <span className="font-semibold">90+ Global Customers</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}