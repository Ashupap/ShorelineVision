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
      <div className="container mx-auto px-4">
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
              {/* Rainbow Glow Effect - Circular with Particles */}
              <motion.div
                className="absolute rounded-full"
                animate={{
                  background: [
                    "radial-gradient(circle, #ff6b6b 0%, #4ecdc4 12.5%, #45b7d1 25%, #96ceb4 37.5%, #feca57 50%, #ff9ff3 62.5%, #54a0ff 75%, #5f27cd 87.5%, #ff6b6b 100%)",
                    "radial-gradient(circle, #4ecdc4 0%, #45b7d1 12.5%, #96ceb4 25%, #feca57 37.5%, #ff9ff3 50%, #54a0ff 62.5%, #5f27cd 75%, #ff6b6b 87.5%, #4ecdc4 100%)",
                    "radial-gradient(circle, #45b7d1 0%, #96ceb4 12.5%, #feca57 25%, #ff9ff3 37.5%, #54a0ff 50%, #5f27cd 62.5%, #ff6b6b 75%, #4ecdc4 87.5%, #45b7d1 100%)",
                    "radial-gradient(circle, #96ceb4 0%, #feca57 12.5%, #ff9ff3 25%, #54a0ff 37.5%, #5f27cd 50%, #ff6b6b 62.5%, #4ecdc4 75%, #45b7d1 87.5%, #96ceb4 100%)",
                  ]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '120px',
                  height: '120px',
                  filter: 'blur(12px)',
                  opacity: 0.4,
                  zIndex: -1
                }}
              />

              {/* Animated Particles */}
              <motion.div
                className="absolute w-2 h-2 bg-gradient-to-r from-coral-accent to-golden-orange rounded-full"
                animate={{
                  x: [0, 15, -10, 20, 0],
                  y: [0, -15, 10, -20, 0],
                  opacity: [0, 0.8, 0.5, 0.9, 0],
                  scale: [0.5, 1, 0.8, 1.2, 0.5]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0
                }}
                style={{
                  left: '20%',
                  top: '30%',
                  filter: 'blur(1px)',
                  zIndex: -1
                }}
              />
              <motion.div
                className="absolute w-1.5 h-1.5 bg-gradient-to-r from-marine-teal to-ocean-blue rounded-full"
                animate={{
                  x: [0, -20, 15, -25, 0],
                  y: [0, 10, -20, 15, 0],
                  opacity: [0, 0.6, 0.9, 0.4, 0],
                  scale: [0.3, 0.8, 1.1, 0.6, 0.3]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5
                }}
                style={{
                  right: '25%',
                  top: '20%',
                  filter: 'blur(0.5px)',
                  zIndex: -1
                }}
              />
              <motion.div
                className="absolute w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                animate={{
                  x: [0, 25, -15, 30, 0],
                  y: [0, 20, -10, 25, 0],
                  opacity: [0, 0.5, 0.8, 0.3, 0],
                  scale: [0.2, 1.3, 0.7, 1.5, 0.2]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 3
                }}
                style={{
                  left: '70%',
                  bottom: '10%',
                  filter: 'blur(2px)',
                  zIndex: -1
                }}
              />
              <motion.div
                className="absolute w-1 h-1 bg-white rounded-full"
                animate={{
                  x: [0, -10, 25, -15, 0],
                  y: [0, -25, 5, -30, 0],
                  opacity: [0, 0.9, 0.4, 1, 0],
                  scale: [0.1, 0.6, 1, 0.8, 0.1]
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
                style={{
                  right: '15%',
                  bottom: '25%',
                  zIndex: -1
                }}
              />
              <motion.div
                className="absolute w-2.5 h-2.5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                animate={{
                  x: [0, -30, 10, -35, 0],
                  y: [0, 15, -25, 20, 0],
                  opacity: [0, 0.7, 0.5, 0.8, 0],
                  scale: [0.4, 1.1, 0.9, 1.4, 0.4]
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 4
                }}
                style={{
                  left: '10%',
                  bottom: '30%',
                  filter: 'blur(1.5px)',
                  zIndex: -1
                }}
              />

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
            <button
              onClick={() => scrollToSection("/#contact")}
              className="bg-ocean-blue text-white px-3 py-1.5 sm:px-6 sm:py-2 text-sm rounded-lg hover:bg-deep-navy transition-colors duration-300"
              data-testid="button-enquiry"
            >
              Enquiry
            </button>
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
