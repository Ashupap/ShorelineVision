import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";

export default function Products() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["/api/products?published=true"],
  });

  // Default products data if API returns empty
  const defaultProducts = [
    {
      id: 1,
      name: "Frozen Peeled & Deveined Tail On IQF",
      description: "Premium quality individually quick frozen shrimp, peeled and deveined with tail on for optimal presentation.",
      featuredImage: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      category: "IQF Shrimp"
    },
    {
      id: 2,
      name: "Frozen Peeled & Deveined Tail-off IQF",
      description: "Expertly processed shrimp with tails removed, perfect for quick cooking and preparation in various dishes.",
      featuredImage: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      category: "IQF Shrimp"
    },
    {
      id: 3,
      name: "Raw Frozen Headless EZ Peel IQF",
      description: "Easy-to-peel headless shrimp, flash frozen to maintain freshness and quality for extended shelf life.",
      featuredImage: "https://pixabay.com/get/ge6101e05d916ad16ff53ee5c4ccaf2a11417049b9d90037ad187786d5ccbce0df11f3c823f6a54d998a07b397989a8f9997c3c6dc3644e660dab061f1e73f324_1280.jpg",
      category: "Raw Frozen"
    },
    {
      id: 4,
      name: "Frozen Headless Shell-On",
      description: "Traditional shell-on shrimp, headless and frozen to preserve natural flavors and textures.",
      featuredImage: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      category: "Shell-On"
    },
    {
      id: 5,
      name: "Raw Frozen Peeled & Un-Deveined IQF",
      description: "Peeled but un-deveined shrimp for customers who prefer to prepare their seafood with maximum control.",
      featuredImage: "https://pixabay.com/get/g5d2aaa5fc362d29f751e53e8bbfeb2a274c7219423c08ed89ec685a50d349395e4006e1818183d253be2da4ad8d4cb8071d2b62b2560df308b959bd324250d81_1280.jpg",
      category: "Raw Frozen"
    },
    {
      id: 6,
      name: "Frozen Headless",
      description: "Whole headless shrimp, perfect for traditional cooking methods and authentic seafood preparations.",
      featuredImage: "https://pixabay.com/get/gfac91fb21705eec985853c2f4492bb19800929a7885976bb69ac7d558e3437e50558ff0cddad3c17400dc95f8137baa527ac9c30a406fbd5514e37ed94e230de_1280.jpg",
      category: "Whole Shrimp"
    }
  ];

  const displayProducts = products && products.length > 0 ? products : defaultProducts;

  return (
    <section id="products" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
            Quality Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience top-quality seafood with Alashore Marine. Our carefully sourced and processed products 
            set new standards, offering delicious and sustainable choices in the seafood industry.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-20 bg-gray-200 rounded mb-4"></div>
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
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-ocean-blue text-white px-2 py-1 rounded text-xs">
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
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="text-ocean-blue font-semibold hover:text-deep-navy transition-colors flex items-center"
                    data-testid={`button-product-${product.id}`}
                  >
                    Learn More <ArrowRight size={16} className="ml-1" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-ocean-blue text-white px-8 py-3 rounded-lg hover:bg-deep-navy transition-colors duration-300"
            data-testid="button-view-all-products"
          >
            View All Products
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
