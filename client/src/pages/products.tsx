import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Package, Star, Award, Sparkles, Filter } from "lucide-react";
import { useRef, useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function Products() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(parallaxY, springConfig);

  const { data: products, isLoading } = useQuery({
    queryKey: ["/api/products?published=true"],
  });

  // Default products data based on original website
  const defaultProducts = [
    {
      id: 1,
      name: "Frozen Peeled & Deveined Tail On IQF",
      description: "Premium quality individually quick frozen shrimp, peeled and deveined with tail on for optimal presentation. Perfect for restaurants and high-end culinary applications.",
      featuredImage: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      category: "IQF Shrimp",
      specifications: "Sizes: 16/20, 21/25, 26/30, 31/40, 41/50 per lb\nPackaging: 2kg blocks, 6 blocks per carton\nShelf life: 24 months at -18°C"
    },
    {
      id: 2,
      name: "Frozen Peeled & Deveined Tail-off IQF",
      description: "Expertly processed shrimp with tails removed, perfect for quick cooking and preparation in various dishes. Ideal for ready-to-cook applications.",
      featuredImage: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      category: "IQF Shrimp",
      specifications: "Sizes: 16/20, 21/25, 26/30, 31/40, 41/50 per lb\nPackaging: 2kg blocks, 6 blocks per carton\nShelf life: 24 months at -18°C"
    },
    {
      id: 3,
      name: "Raw Frozen Headless EZ Peel IQF",
      description: "Easy-to-peel headless shrimp, flash frozen to maintain freshness and quality for extended shelf life. Convenient for food service industry.",
      featuredImage: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      category: "Raw Frozen",
      specifications: "Sizes: 16/20, 21/25, 26/30, 31/40, 41/50 per lb\nPackaging: 2kg blocks, 6 blocks per carton\nShelf life: 24 months at -18°C"
    },
    {
      id: 4,
      name: "Frozen Headless Shell-On",
      description: "Traditional shell-on shrimp, headless and frozen to preserve natural flavors and textures. Maintains authentic taste and appearance.",
      featuredImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      category: "Shell-On",
      specifications: "Sizes: 16/20, 21/25, 26/30, 31/40, 41/50 per lb\nPackaging: 2kg blocks, 6 blocks per carton\nShelf life: 24 months at -18°C"
    },
    {
      id: 5,
      name: "Raw Frozen Peeled & Un-Deveined IQF",
      description: "Peeled but un-deveined shrimp for customers who prefer to prepare their seafood with maximum control over final preparation.",
      featuredImage: "https://images.unsplash.com/photo-1585032226651-4e875fb40b24?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      category: "Raw Frozen",
      specifications: "Sizes: 16/20, 21/25, 26/30, 31/40, 41/50 per lb\nPackaging: 2kg blocks, 6 blocks per carton\nShelf life: 24 months at -18°C"
    },
    {
      id: 6,
      name: "Frozen Headless",
      description: "Whole headless shrimp, perfect for traditional cooking methods and authentic seafood preparations. Maintains full natural flavor profile.",
      featuredImage: "https://images.unsplash.com/photo-1563379091-20937a7886d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      category: "Whole Shrimp",
      specifications: "Sizes: 16/20, 21/25, 26/30, 31/40, 41/50 per lb\nPackaging: 2kg blocks, 6 blocks per carton\nShelf life: 24 months at -18°C"
    }
  ];

  const displayProducts = products && Array.isArray(products) && products.length > 0 ? products : defaultProducts;

  const categories = ["All", "IQF Shrimp", "Raw Frozen", "Shell-On", "Whole Shrimp"];
  const filteredProducts = selectedCategory === "All" 
    ? displayProducts 
    : displayProducts.filter(product => product.category === selectedCategory);

  return (
    <div ref={containerRef} className="min-h-screen bg-background relative">
      <Header />
      <main>
        {/* Enhanced Hero Section */}
        <section className="relative py-32 bg-gradient-to-br from-ocean-blue via-marine-teal to-deep-navy text-white overflow-hidden">
          <motion.div 
            style={{ y, opacity: parallaxOpacity }}
            className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"
          />
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.3, 1]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-10 right-10 w-48 h-48 bg-white/10 rounded-full backdrop-blur-sm"
          />
          <motion.div
            animate={{ 
              y: [0, -40, 0],
              x: [0, 30, 0]
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
            className="absolute bottom-20 left-10 w-32 h-32 bg-coral-accent/20 rounded-full backdrop-blur-sm"
          />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="inline-flex items-center bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 mb-8"
              >
                <Package className="text-coral-accent mr-2" size={20} />
                <span className="text-white/90 font-medium">Premium Quality Products</span>
              </motion.div>
              <motion.h1 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.2 }}
                className="text-6xl md:text-8xl font-heading font-bold mb-8"
              >
                Premium <span className="text-coral-accent">Seafood</span>
                <br />Products
              </motion.h1>
              <motion.p 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-xl md:text-2xl text-light-marine max-w-4xl mx-auto leading-relaxed"
              >
                Experience top-quality seafood with Alashore Marine. Our carefully sourced and processed products 
                set new standards, offering delicious and sustainable choices in the seafood industry.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <motion.section 
          style={{ y: useTransform(scrollYProgress, [0.1, 0.3], [50, 0]) }}
          className="py-16 bg-gradient-to-br from-light-marine/20 to-white relative overflow-hidden"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <motion.h2
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6"
              >
                Browse Our Collection
              </motion.h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="w-24 h-1 bg-gradient-to-r from-coral-accent to-golden-orange mx-auto rounded-full mb-8"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 backdrop-blur-md border ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-coral-accent to-golden-orange text-white border-transparent shadow-lg"
                      : "bg-white/70 text-gray-700 border-gray-200 hover:bg-white/90 hover:border-coral-accent"
                  }`}
                >
                  <Filter className="inline mr-2" size={16} />
                  {category}
                </motion.button>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Enhanced Products Grid */}
        <section className="py-24 bg-white relative overflow-hidden">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ 
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 right-20 w-64 h-64 bg-marine-teal/10 rounded-full backdrop-blur-sm"
          />
          <div className="container mx-auto px-4 relative z-10">
            {isLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                    <div className="w-full h-64 bg-gray-200"></div>
                    <div className="p-6">
                      <div className="h-6 bg-gray-200 rounded mb-3"></div>
                      <div className="h-20 bg-gray-200 rounded mb-4"></div>
                      <div className="h-16 bg-gray-200 rounded mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      y: -15, 
                      scale: 1.02,
                      boxShadow: "0 25px 60px rgba(0, 0, 0, 0.15)"
                    }}
                    className="group bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl border border-gray-100/50 backdrop-blur-md"
                  >
                    <div className="relative overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                        src={product.featuredImage}
                        alt={product.name}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-ocean-blue text-white px-3 py-1 rounded-full text-sm">
                        {product.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {product.description}
                      </p>
                      {product.specifications && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 mb-2">Specifications:</h4>
                          <p className="text-sm text-gray-600 whitespace-pre-line">
                            {product.specifications}
                          </p>
                        </div>
                      )}
                      <motion.button
                        whileHover={{ x: 5 }}
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="text-ocean-blue font-semibold hover:text-deep-navy transition-colors flex items-center"
                        data-testid={`button-inquire-${product.id}`}
                      >
                        Inquire Now <ArrowRight size={16} className="ml-1" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Quality Assurance Section */}
        <section className="py-20 bg-gradient-to-br from-light-marine to-white relative overflow-hidden">
          {/* Background Animation Elements */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-10 right-10 w-80 h-80 bg-ocean-blue/10 rounded-full backdrop-blur-sm"
          />
          <motion.div
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.03, 0.08, 0.03]
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-20 left-20 w-60 h-60 bg-marine-teal/10 rounded-full backdrop-blur-sm"
          />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-flex items-center bg-white/80 backdrop-blur-md px-6 py-3 rounded-full border border-ocean-blue/20 mb-8"
              >
                <Award className="text-ocean-blue mr-2" size={20} />
                <span className="text-ocean-blue font-medium">Internationally Certified</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
                Quality Assurance
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every product meets international quality standards with rigorous testing and certification from world-renowned authorities.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {/* FSSAI Certification */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/50 text-center group cursor-pointer"
              >
                <motion.div 
                  className="w-24 h-24 mx-auto mb-6 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <img 
                    src="@assets/FSSAI_1756201576810.png" 
                    alt="FSSAI Certification" 
                    className="w-full h-full object-contain filter drop-shadow-md group-hover:drop-shadow-lg transition-all duration-300"
                  />
                </motion.div>
                <h3 className="text-lg font-heading font-semibold text-gray-900 mb-3">
                  FSSAI Certified
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Food Safety and Standards Authority of India certification ensuring highest food safety standards.
                </p>
              </motion.div>

              {/* BAP Certification */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/50 text-center group cursor-pointer"
              >
                <motion.div 
                  className="w-24 h-24 mx-auto mb-6 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <img 
                    src="@assets/BAP-Logo-2_1756201576811.png" 
                    alt="BAP Best Aquaculture Practices Certification" 
                    className="w-full h-full object-contain filter drop-shadow-md group-hover:drop-shadow-lg transition-all duration-300"
                  />
                </motion.div>
                <h3 className="text-lg font-heading font-semibold text-gray-900 mb-3">
                  BAP Certified
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Best Aquaculture Practices certification for sustainable and responsible seafood production.
                </p>
              </motion.div>

              {/* HACCP Certification */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/50 text-center group cursor-pointer"
              >
                <motion.div 
                  className="w-24 h-24 mx-auto mb-6 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <img 
                    src="@assets/steptodown.com594892_1756201576811.jpg" 
                    alt="HACCP Food Safety Certification" 
                    className="w-full h-full object-contain filter drop-shadow-md group-hover:drop-shadow-lg transition-all duration-300"
                  />
                </motion.div>
                <h3 className="text-lg font-heading font-semibold text-gray-900 mb-3">
                  HACCP Certified
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Hazard Analysis Critical Control Points system ensuring food safety at every production stage.
                </p>
              </motion.div>

              {/* FDA Approval */}
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ 
                  y: -10, 
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/50 text-center group cursor-pointer"
              >
                <motion.div 
                  className="w-24 h-24 mx-auto mb-6 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8 }}
                >
                  <img 
                    src="@assets/unnamed_1756201576811.png" 
                    alt="FDA Approved" 
                    className="w-full h-full object-contain filter drop-shadow-md group-hover:drop-shadow-lg transition-all duration-300"
                  />
                </motion.div>
                <h3 className="text-lg font-heading font-semibold text-gray-900 mb-3">
                  FDA Approved
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  US Food and Drug Administration approval for safe export to American markets.
                </p>
              </motion.div>
            </div>

            {/* Trust Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-ocean-blue/10 to-marine-teal/10 backdrop-blur-md rounded-2xl p-8 border border-white/30 max-w-4xl mx-auto"
              >
                <div className="flex items-center justify-center mb-4">
                  <Shield className="text-ocean-blue mr-2" size={24} />
                  <h3 className="text-2xl font-heading font-bold text-gray-900">
                    Zero Quality Rejections
                  </h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our comprehensive quality control system and multiple certifications ensure that every shipment meets the highest international standards. We maintain a perfect track record with zero quality rejections from our global partners.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-ocean-blue to-deep-navy text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Ready to Order Premium Seafood?
              </h2>
              <p className="text-xl text-light-marine mb-8 max-w-3xl mx-auto">
                Contact our sales team today to discuss your requirements and get a customized quote for our premium seafood products.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-coral-accent hover:bg-golden-orange text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
                data-testid="button-contact-sales"
              >
                Contact Sales Team
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}