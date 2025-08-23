import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Menu, X, Anchor, Shield } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

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
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 cursor-pointer"
              data-testid="link-logo"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-ocean-blue to-marine-teal rounded-lg flex items-center justify-center">
                <Anchor className="text-white" size={20} />
              </div>
              <span className="text-xl font-heading font-bold text-ocean-blue">
                Alashore Marine
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.href.startsWith("/#") ? (
                  <button
                    onClick={() => handleNavigation(item.href)}
                    className="text-gray-700 hover:text-ocean-blue transition-colors duration-300"
                    data-testid={`button-nav-${item.name.toLowerCase()}`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="text-gray-700 hover:text-ocean-blue transition-colors duration-300"
                    data-testid={`link-nav-${item.name.toLowerCase()}`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              href="/admin"
              className="hidden md:flex items-center text-sm text-gray-600 hover:text-ocean-blue transition-colors"
              data-testid="link-admin"
            >
              <Shield size={16} className="mr-1" />
              Admin
            </Link>
            <button
              onClick={() => scrollToSection("/#contact")}
              className="bg-ocean-blue text-white px-6 py-2 rounded-lg hover:bg-deep-navy transition-colors duration-300"
              data-testid="button-enquiry"
            >
              Enquiry
            </button>
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.href.startsWith("/#") ? (
                    <button
                      onClick={() => handleNavigation(item.href)}
                      className="block text-gray-700 hover:text-ocean-blue transition-colors"
                      data-testid={`button-mobile-nav-${item.name.toLowerCase()}`}
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="block text-gray-700 hover:text-ocean-blue transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                      data-testid={`link-mobile-nav-${item.name.toLowerCase()}`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                href="/admin"
                className="block text-gray-700 hover:text-ocean-blue transition-colors"
                onClick={() => setIsMenuOpen(false)}
                data-testid="link-mobile-admin"
              >
                Admin Login
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
