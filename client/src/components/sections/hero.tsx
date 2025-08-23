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
      {/* Ocean waves background with parallax effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-ocean-blue via-marine-teal to-deep-navy"></div>
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1505142468610-359e7d316be0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      ></div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight">
            Welcome to<br />
            <span className="text-gradient bg-gradient-to-r from-white to-light-marine bg-clip-text text-transparent">
              ALASHORE MARINE
            </span>
            <br />
            <span className="text-2xl md:text-3xl font-normal">EXPORTS Pvt. Ltd.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-light-marine max-w-3xl mx-auto">
            Your quest for quality seafood ends here
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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

        {/* Floating animation elements */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 w-4 h-4 bg-white/30 rounded-full"
        />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 right-16 w-6 h-6 bg-marine-teal/40 rounded-full"
        />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-coral-accent/50 rounded-full"
        />
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
