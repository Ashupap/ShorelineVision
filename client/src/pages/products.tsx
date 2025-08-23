import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function Products() {
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-ocean-blue to-marine-teal text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                Premium Seafood Products
              </h1>
              <p className="text-xl md:text-2xl text-light-marine max-w-3xl mx-auto">
                Experience top-quality seafood with Alashore Marine. Our carefully sourced and processed products 
                set new standards, offering delicious and sustainable choices in the seafood industry.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
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
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
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
              </div>
            )}
          </div>
        </section>

        {/* Quality Assurance Section */}
        <section className="py-20 bg-gradient-to-br from-light-marine to-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
                Quality Assurance
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Every product meets international quality standards with rigorous testing and certification.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-ocean-blue rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">HACCP</span>
                </div>
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-4">
                  HACCP Certified
                </h3>
                <p className="text-gray-600">
                  Hazard Analysis Critical Control Points system ensures food safety at every stage of production.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-marine-teal rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">EU</span>
                </div>
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-4">
                  EU Standards
                </h3>
                <p className="text-gray-600">
                  All products meet European Union quality and safety standards for international export.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-xl shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-coral-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-2xl font-bold">BRC</span>
                </div>
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-4">
                  BRC Certified
                </h3>
                <p className="text-gray-600">
                  British Retail Consortium certification guarantees the highest food safety and quality standards.
                </p>
              </motion.div>
            </div>
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