import { motion } from "framer-motion";
import { Anchor, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const groupCompanies = [
    "Balasore Marine Exports Pvt. Ltd.",
    { name: "Natnov Bioscience Pvt. Ltd.", url: "http://www.natnovbioscience.com/" },
    "Alashore Aqua Pvt. Ltd.",
    "Meghasani Pulp and Paper Pvt. Ltd.",
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/#about" },
    { name: "Products", href: "/#products" },
    { name: "Sustainability", href: "/#sustainability" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/#contact" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/AlashoreMarine/", name: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/alashoremarine/", name: "Instagram" },
    { icon: Twitter, href: "https://twitter.com/AlashoreL", name: "Twitter" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/alashore-marine-private-limited/", name: "LinkedIn" },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith("/#")) {
      const element = document.querySelector(href.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-deep-navy text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-ocean-blue to-marine-teal rounded-lg flex items-center justify-center">
                <Anchor className="text-white" size={20} />
              </div>
              <span className="text-xl font-heading font-bold">Alashore Marine</span>
            </div>
            <p className="text-light-marine mb-6">
              At Alashore Marine - we care about our People, our Products & the Farmers. 
              These are the core values we demonstrate in our actions.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-light-marine">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith("/#") ? (
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="hover:text-white transition-colors text-left"
                      data-testid={`button-footer-${link.name.toLowerCase().replace(" ", "-")}`}
                    >
                      {link.name}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      className="hover:text-white transition-colors"
                      data-testid={`link-footer-${link.name.toLowerCase().replace(" ", "-")}`}
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Group Companies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6">Group Companies</h4>
            <ul className="space-y-3 text-light-marine">
              {groupCompanies.map((company, index) => (
                <li key={index}>
                  {typeof company === "object" ? (
                    <a
                      href={company.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                      data-testid="link-natnov-bioscience"
                    >
                      {company.name}
                    </a>
                  ) : (
                    <span>{company}</span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4 text-light-marine">
              <p className="text-sm">
                Plot No- D1/18(P), D1/19, D1/20 & D1/37, D1/38, D1/39(P)<br />
                Somnathpur Industrial Estate, Balasore, Odisha, India, Pin- 755019
              </p>
              <p>
                <a 
                  href="mailto:alashoremarine@gmail.com" 
                  className="hover:text-white transition-colors"
                  data-testid="link-email"
                >
                  alashoremarine@gmail.com
                </a>
              </p>
              <p>
                <a 
                  href="tel:+917381050536" 
                  className="hover:text-white transition-colors"
                  data-testid="link-phone"
                >
                  +91 7381050536
                </a>
              </p>
            </div>

            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-ocean-blue rounded-lg flex items-center justify-center text-white hover:bg-marine-teal transition-colors"
                  data-testid={`link-social-${social.name.toLowerCase()}`}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center text-light-marine">
          <p>
            Copyright 2024 Alashore Marine Exports Pvt. Ltd. | Developed by{" "}
            <a
              href="https://movedigitals.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-marine-teal transition-colors"
              data-testid="link-developer"
            >
              MoveDigitals
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
