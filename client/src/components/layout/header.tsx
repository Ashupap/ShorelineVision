import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Menu, X, Shield, Mail, Phone, Building2, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { PerformanceImage } from "@/components/ui/performance-image";
import logoImage from "@assets/Asset 3_1756100807050.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about-us" },
    { name: "Products", href: "/products" },
    { name: "Sustainability", href: "/sustainability" },
    { name: "Media", href: "/media" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith("/#")) {
      const element = document.querySelector(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  const handleNavigation = (href: string) => {
    if (href.startsWith("/#")) {
      // If we're not on the home page, navigate to home first
      if (location !== "/") {
        window.location.href = "/" + href;
      } else {
        scrollToSection(href);
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[100]">
      {/* Animated Information Bar - Hidden on mobile and tablet */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ 
          y: isScrolled ? -50 : 0, 
          opacity: isScrolled ? 0 : 1,
          height: isScrolled ? 0 : 'auto'
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative overflow-hidden hidden xl:block"
      >
        {/* Animated Background */}
        <motion.div
          animate={{
            background: [
              "linear-gradient(90deg, #3B82F6, #14B8A6, #F59E0B, #EF4444, #8B5CF6)",
              "linear-gradient(90deg, #14B8A6, #F59E0B, #EF4444, #8B5CF6, #3B82F6)",
              "linear-gradient(90deg, #F59E0B, #EF4444, #8B5CF6, #3B82F6, #14B8A6)",
              "linear-gradient(90deg, #EF4444, #8B5CF6, #3B82F6, #14B8A6, #F59E0B)",
              "linear-gradient(90deg, #8B5CF6, #3B82F6, #14B8A6, #F59E0B, #EF4444)",
              "linear-gradient(90deg, #3B82F6, #14B8A6, #F59E0B, #EF4444, #8B5CF6)",
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute inset-0"
        />
        
        <div className="container mx-auto px-4 relative">
          <div className="flex items-center justify-between h-10 text-white text-sm font-bold">
            {/* Contact Information */}
            <motion.div 
              className="flex items-center space-x-6"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a 
                href="mailto:alashoremarine@gmail.com"
                className="flex items-center space-x-1 hover:text-yellow-200 transition-colors"
                data-testid="link-email"
              >
                <Mail size={14} />
                <span>alashoremarine@gmail.com</span>
              </a>
              <a 
                href="tel:+917381050536"
                className="flex items-center space-x-1 hover:text-yellow-200 transition-colors"
                data-testid="link-phone"
              >
                <Phone size={14} />
                <span>+91 7381050536</span>
              </a>
              <div className="hidden lg:flex items-center space-x-1">
                <Building2 size={14} />
                <span>CIN: U05000OR2012PTC016366</span>
              </div>
            </motion.div>

            {/* Social Media Links */}
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <span className="hidden sm:inline">Follow Us:</span>
              <div className="flex space-x-2">
                <motion.a
                  href="https://www.facebook.com/AlashoreMarine/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="hover:bg-white/20 p-1 rounded transition-colors"
                  data-testid="link-facebook"
                >
                  <Facebook size={16} />
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/alashoremarine/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="hover:bg-white/20 p-1 rounded transition-colors"
                  data-testid="link-instagram"
                >
                  <Instagram size={16} />
                </motion.a>
                <motion.a
                  href="https://twitter.com/AlashoreL"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="hover:bg-white/20 p-1 rounded transition-colors"
                  data-testid="link-twitter"
                >
                  <Twitter size={16} />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/company/alashore-marine-private-limited/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="hover:bg-white/20 p-1 rounded transition-colors"
                  data-testid="link-linkedin"
                >
                  <Linkedin size={16} />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Main Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className={`transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
      <div className="container mx-auto px-4 relative">
        {/* Sea Creatures Swimming Across Entire Navbar */}
        {/* Swimming Shrimp */}
        <motion.div
          className="absolute text-lg pointer-events-none"
          animate={{
            x: [-60, window.innerWidth + 60],
            y: [0, -3, 2, -1, 0],
            rotate: [0, 2, -1, 1, 0]
          }}
          transition={{
            x: { duration: 15, repeat: Infinity, ease: "linear" },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{
            left: '-60px',
            top: '20%',
            zIndex: 1,
            filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.4))',
            opacity: 0.6
          }}
        >
          🦐
        </motion.div>

        {/* Swimming Fish */}
        <motion.div
          className="absolute text-base pointer-events-none"
          animate={{
            x: [window.innerWidth + 60, -60],
            y: [0, 4, -2, 3, 0],
            rotate: [180, 182, 178, 181, 180],
            scale: [1, 1.1, 0.9, 1.05, 1]
          }}
          transition={{
            x: { duration: 18, repeat: Infinity, ease: "linear" },
            y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{
            right: '-60px',
            top: '60%',
            zIndex: 1,
            filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.4))',
            opacity: 0.6
          }}
        >
          🐟
        </motion.div>

        {/* Swimming Crab */}
        <motion.div
          className="absolute text-sm pointer-events-none"
          animate={{
            x: [-50, window.innerWidth + 50, -50],
            y: [0, -2, 1, -3, 0],
            rotate: [0, -5, 5, -3, 0]
          }}
          transition={{
            x: { duration: 22, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
          }}
          style={{
            left: '-50px',
            bottom: '20%',
            zIndex: 1,
            filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.4))',
            opacity: 0.5
          }}
        >
          🦀
        </motion.div>

        {/* Small Tropical Fish */}
        <motion.div
          className="absolute text-xs pointer-events-none"
          animate={{
            x: [-40, window.innerWidth + 40],
            y: [0, -5, 3, -2, 0],
            rotate: [0, 3, -2, 1, 0]
          }}
          transition={{
            x: { duration: 12, repeat: Infinity, ease: "linear", delay: 5 },
            y: { duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 5 },
            rotate: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 5 }
          }}
          style={{
            left: '-40px',
            top: '70%',
            zIndex: 1,
            filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.4))',
            opacity: 0.7
          }}
        >
          🐠
        </motion.div>

        {/* Seahorse */}
        <motion.div
          className="absolute text-sm pointer-events-none"
          animate={{
            x: [window.innerWidth + 50, -50],
            y: [0, -4, 2, -3, 0],
            rotate: [180, 185, 175, 182, 180]
          }}
          transition={{
            x: { duration: 20, repeat: Infinity, ease: "linear", delay: 8 },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 8 },
            rotate: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 8 }
          }}
          style={{
            right: '-50px',
            top: '40%',
            zIndex: 1,
            filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.4))',
            opacity: 0.5
          }}
        >
          🐙
        </motion.div>

        {/* Pearl Grey Foam/Vapor Effect - Behind Logo in Navbar */}
        <motion.div
          className="absolute rounded-xl"
          animate={{
            background: [
              "radial-gradient(ellipse 180px 50px at 180px center, rgba(240,240,240,0.8) 0%, rgba(220,220,220,0.6) 30%, rgba(200,200,200,0.4) 60%, transparent 100%)",
              "radial-gradient(ellipse 190px 55px at 180px center, rgba(235,235,235,0.9) 0%, rgba(215,215,215,0.7) 30%, rgba(195,195,195,0.5) 60%, transparent 100%)",
              "radial-gradient(ellipse 185px 52px at 180px center, rgba(245,245,245,0.85) 0%, rgba(225,225,225,0.65) 30%, rgba(205,205,205,0.45) 60%, transparent 100%)",
              "radial-gradient(ellipse 175px 48px at 180px center, rgba(238,238,238,0.75) 0%, rgba(218,218,218,0.55) 30%, rgba(198,198,198,0.35) 60%, transparent 100%)",
            ],
            scale: [1, 1.08, 0.96, 1.04, 1],
            opacity: [0.4, 0.6, 0.5, 0.7, 0.4]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: 'absolute',
            left: '40px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '280px',
            height: '50px',
            filter: 'blur(12px)',
            zIndex: 1
          }}
        />

        {/* Navbar Bubbles Behind Logo */}
        <motion.div
          className="absolute w-2 h-2 bg-white/60 rounded-full"
          animate={{
            x: [0, 8, -5, 10, 0],
            y: [0, -6, 3, -8, 0],
            opacity: [0, 0.8, 0.4, 0.9, 0],
            scale: [0.3, 1, 0.7, 1.1, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0
          }}
          style={{
            left: '80px',
            top: '35%',
            filter: 'blur(0.5px)',
            zIndex: 1
          }}
        />
        <motion.div
          className="absolute w-1.5 h-1.5 bg-white/50 rounded-full"
          animate={{
            x: [0, -6, 4, -8, 0],
            y: [0, 4, -6, 3, 0],
            opacity: [0, 0.6, 0.9, 0.3, 0],
            scale: [0.2, 0.9, 1, 0.5, 0.2]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
          style={{
            left: '200px',
            top: '25%',
            zIndex: 1
          }}
        />
        <motion.div
          className="absolute w-3 h-3 bg-white/40 rounded-full"
          animate={{
            x: [0, 12, -6, 14, 0],
            y: [0, 8, -4, 10, 0],
            opacity: [0, 0.5, 0.8, 0.2, 0],
            scale: [0.1, 1.1, 0.8, 1.2, 0.1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          style={{
            left: '240px',
            bottom: '20%',
            filter: 'blur(1px)',
            zIndex: 1
          }}
        />
        <motion.div
          className="absolute w-1 h-1 bg-white/70 rounded-full"
          animate={{
            x: [0, -4, 8, -6, 0],
            y: [0, -10, 2, -12, 0],
            opacity: [0, 0.9, 0.3, 1, 0],
            scale: [0.1, 0.8, 1.2, 0.6, 0.1]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          style={{
            left: '160px',
            bottom: '30%',
            zIndex: 1
          }}
        />
        <motion.div
          className="absolute w-2.5 h-2.5 bg-white/45 rounded-full"
          animate={{
            x: [0, -10, 4, -12, 0],
            y: [0, 6, -8, 7, 0],
            opacity: [0, 0.7, 0.4, 0.8, 0],
            scale: [0.2, 1, 0.9, 1.1, 0.2]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          style={{
            left: '120px',
            bottom: '35%',
            filter: 'blur(0.8px)',
            zIndex: 1
          }}
        />

        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href="/">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 cursor-pointer relative"
              data-testid="link-logo"
            >

              {/* Logo Container */}
              <motion.div
                className={`relative z-10 h-10 sm:h-12 lg:h-14 w-auto transition-all duration-500 ${
                  isScrolled 
                    ? 'filter brightness-110 contrast-125 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]' 
                    : 'filter brightness-125 contrast-150 saturate-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                }`}
                animate={{
                  filter: isScrolled 
                    ? ["brightness(1.1) contrast(1.25)", "brightness(1.15) contrast(1.3)", "brightness(1.1) contrast(1.25)"]
                    : ["brightness(1.25) contrast(1.5) saturate(1.1)", "brightness(1.3) contrast(1.55) saturate(1.15)", "brightness(1.25) contrast(1.5) saturate(1.1)"]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <PerformanceImage
                  src={logoImage}
                  alt="Alashore Marine Exports"
                  className="h-10 sm:h-12 lg:h-14 w-auto object-contain"
                  priority={true}
                  loading="eager"
                />
              </motion.div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.href.startsWith("/#") ? (
                  <button
                    onClick={() => handleNavigation(item.href)}
                    className={`${isScrolled ? 'text-gray-700' : 'text-white font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'} hover:text-coral-accent transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,107,107,0.4)]`}
                    data-testid={`button-nav-${item.name.toLowerCase()}`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`${isScrolled ? 'text-gray-700' : 'text-white font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'} hover:text-coral-accent transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,107,107,0.4)]`}
                    data-testid={`link-nav-${item.name.toLowerCase()}`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link
              href="/meadmin"
              className={`hidden xl:flex items-center text-sm ${isScrolled ? 'text-gray-600' : 'text-white/90 font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'} hover:text-coral-accent transition-all duration-300`}
              data-testid="link-admin"
            >
              <Shield size={16} className="mr-1" />
              Admin
            </Link>
            <motion.button
              onClick={() => scrollToSection("/#contact")}
              className="relative bg-ocean-blue text-white px-3 py-1.5 sm:px-6 sm:py-2 text-sm rounded-lg hover:bg-deep-navy transition-all duration-300 overflow-hidden"
              data-testid="button-enquiry"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Glowing Effect */}
              <motion.div
                className="absolute inset-0 rounded-lg"
                animate={{
                  boxShadow: [
                    "0 0 10px rgba(59,130,246,0.3), 0 0 20px rgba(59,130,246,0.2), inset 0 0 10px rgba(255,255,255,0.1)",
                    "0 0 20px rgba(59,130,246,0.5), 0 0 40px rgba(59,130,246,0.3), inset 0 0 15px rgba(255,255,255,0.2)",
                    "0 0 10px rgba(59,130,246,0.3), 0 0 20px rgba(59,130,246,0.2), inset 0 0 10px rgba(255,255,255,0.1)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span className="relative z-10">Enquiry</span>
            </motion.button>
            <button
              className={`lg:hidden ${isScrolled ? 'text-gray-700' : 'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'} hover:text-coral-accent transition-colors duration-300`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.href.startsWith("/#") ? (
                    <button
                      onClick={() => handleNavigation(item.href)}
                      className="block text-gray-700 hover:text-coral-accent transition-colors"
                      data-testid={`button-mobile-nav-${item.name.toLowerCase()}`}
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="block text-gray-700 hover:text-coral-accent transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                      data-testid={`link-mobile-nav-${item.name.toLowerCase()}`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
      </motion.header>
    </div>
  );
}
