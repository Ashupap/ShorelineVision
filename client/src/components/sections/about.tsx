import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { PerformanceImage } from "@/components/ui/performance-image";

export default function About() {
  const [, navigate] = useLocation();

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-light-marine to-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-ocean-blue text-lg font-semibold mb-2">About Alashore</h3>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
              What We Do
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Welcome to Alashore Marine, where we redefine seafood excellence with a commitment to quality, 
              sustainability, and exquisite taste. As a leading seafood exporter, we bring the finest ocean 
              treasures straight to your table through meticulously sourced and processed premium exports.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Our sustainable aquaculture practices, recognized by top organizations, reflect a dedication 
              to responsible farming and a positive environmental impact. With a customer-centric approach, 
              we prioritize your satisfaction, ensuring a seamless experience for restaurants, retail partners, 
              and individuals seeking the best in seafood.
            </p>
            <Link href="/about-us">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-ocean-blue text-white px-8 py-3 rounded-lg hover:bg-deep-navy transition-colors duration-300"
                data-testid="button-about-learn-more"
              >
                Learn More
              </motion.button>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* High-quality seafood processing facility image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="rounded-xl overflow-hidden shadow-2xl"
            >
              <PerformanceImage
                src="https://images.unsplash.com/photo-1565615833231-e8c91a38a012?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=900&q=80"
                alt="Modern seafood processing facility"
                className="w-full h-auto object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={false}
              />
            </motion.div>
            
            {/* Floating quality badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-6 bg-coral-accent text-white p-6 rounded-xl shadow-lg"
            >
              <h4 className="text-2xl font-bold">15+</h4>
              <p className="text-sm">Years Experience</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
