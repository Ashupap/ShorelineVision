import { motion } from "framer-motion";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section with Gradient Header */}
        <section className="py-20 bg-gradient-to-br from-ocean-blue to-marine-teal text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
                About Us
              </h1>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Dedicated to Quality Product - Leading the way in premium seafood exports with sustainable practices and unmatched quality standards
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 bg-gradient-to-br from-light-marine to-white">
          <div className="container mx-auto px-4">

            {/* Who We Are Section */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-ocean-blue text-xl font-semibold mb-4">Who We Are</h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  <strong>Alashore Marine Exports Pvt. Ltd.</strong> is well-known in the seafood industry and renowned as a leading shrimp export company, praised for its strong dedication to doing things exceptionally well and in an environmentally friendly way. As a top shrimp exporter in Odisha, India, we provide the best-quality shrimp products worldwide and set new standards in the industry.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We know how diverse tastes can be, so we offer a wide variety of shrimp products. Our commitment to reliability and quality has resulted in long-term partnerships with customers. Our customers come from different places like food companies, stores, restaurants, clubs, and distributors in developed markets such as the USA, UK, and various European countries.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-xl overflow-hidden shadow-2xl"
                >
                  <img
                    src="https://images.unsplash.com/photo-1565615833231-e8c91a38a012?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                    alt="Modern seafood processing facility"
                    className="w-full h-auto"
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Mission and Vision Section */}
            <div className="grid md:grid-cols-2 gap-12 mb-20">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative overflow-hidden bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 group"
              >
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                    alt="Our Mission - Innovation in Seafood"
                    className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-ocean-blue/5 to-marine-teal/10"></div>
                </div>
                <div className="relative p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-ocean-blue to-marine-teal rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-2xl font-bold">🎯</span>
                  </div>
                  <h3 className="text-ocean-blue text-2xl font-bold mb-6">Our Mission</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    We're on a mission to introduce a 'New Taste for Life' by creating innovative breaded products. We believe in continuous improvement through technological advancements in our processes. Additionally, we're committed to supporting farmers for a more sustainable future. Our goal is not only to offer delicious and innovative food but also to use technology responsibly and promote sustainability, ensuring a better future for everyone involved.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative overflow-hidden bg-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 group"
              >
                <div className="absolute inset-0">
                  <img
                    src="https://images.unsplash.com/photo-1544943910-4c1dc44aab44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                    alt="Our Vision - Global Leadership"
                    className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-marine-teal/5 to-coral-accent/10"></div>
                </div>
                <div className="relative p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-marine-teal to-coral-accent rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white text-2xl font-bold">🌟</span>
                  </div>
                  <h3 className="text-marine-teal text-2xl font-bold mb-6">Our Vision</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Alashore Marine's vision is to be a leading global brand in the frozen food industry and to become a top global brand and a leading frozen seafood exporter. We strive for this by investing in top-notch infrastructure, adopting industry best practices, adhering to global quality standards, and implementing strict safety policies. We aim to establish ourselves as the world's largest supplier of frozen food products, providing protein from farms to fork with the best taste.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Leadership Team Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
                Meet Our Leadership Team
              </h3>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                Get to know the visionary leaders driving our success. Meet the dedicated individuals guiding our company towards new heights in the seafood export industry
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              {[
                { name: "Gyana Ranjan Dash", position: "Managing Director", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" },
                { name: "Madhusudan Dash", position: "Director", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" },
                { name: "Bishnupriya Dash", position: "Shareholder", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" },
                { name: "Monalina Panda", position: "Director", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" },
                { name: "Rashmikanta Panda", position: "Director", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" },
                { name: "Debasish Dash", position: "Director", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400" }
              ].map((leader, index) => (
                <motion.div
                  key={leader.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative">
                    <img
                      src={leader.avatar}
                      alt={leader.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-all duration-300"></div>
                  </div>
                  <div className="p-6 text-center">
                    <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-ocean-blue transition-colors duration-300">{leader.name}</h4>
                    <p className="text-sm text-ocean-blue font-semibold uppercase tracking-wide mb-3">{leader.position}</p>
                    <div className="w-12 h-1 bg-gradient-to-r from-ocean-blue to-marine-teal mx-auto rounded-full"></div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Business Evolution Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
                Our Business Evolution
              </h3>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
                Embark on a journey through our business evolution, tracing our growth, milestones, and commitment to excellence in the seafood export industry
              </p>
            </motion.div>

            {/* Global Presence - Original Style Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[
                { 
                  region: "USA", 
                  cities: ["Houston", "New York", "New Jersey", "LA", "Miami", "Chicago", "Seattle"],
                  flag: "🇺🇸",
                  color: "from-blue-500 to-red-500"
                },
                { 
                  region: "Canada", 
                  cities: ["Toronto", "Vancouver"],
                  flag: "🇨🇦",
                  color: "from-red-500 to-white"
                },
                { 
                  region: "Europe", 
                  cities: ["Antwerp (BEL)", "Amsterdam (NEH)", "Rotterdam (NEH)"],
                  flag: "🇪🇺",
                  color: "from-blue-600 to-yellow-400"
                },
                { 
                  region: "Asia", 
                  cities: ["Tokyo", "Osaka", "Zhanjiang", "Xiamen", "Port Penang"],
                  flag: "🌏",
                  color: "from-green-500 to-yellow-500"
                }
              ].map((location, index) => (
                <motion.div
                  key={location.region}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="group relative bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${location.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  <div className="relative p-6">
                    <div className="text-center mb-4">
                      <span className="text-4xl mb-2 block">{location.flag}</span>
                      <h4 className="text-ocean-blue text-2xl font-bold mb-1">{location.region}</h4>
                      <div className="w-8 h-1 bg-gradient-to-r from-ocean-blue to-marine-teal mx-auto rounded-full"></div>
                    </div>
                    <div className="space-y-2">
                      {location.cities.map((city, cityIndex) => (
                        <motion.div
                          key={city}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.15 + cityIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-center text-gray-600 hover:text-ocean-blue transition-colors duration-200"
                        >
                          <div className="w-2 h-2 bg-coral-accent rounded-full mr-3 flex-shrink-0"></div>
                          <span className="text-sm font-medium">{city}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center bg-gradient-to-r from-ocean-blue to-marine-teal text-white p-12 rounded-xl"
            >
              <h3 className="text-3xl font-bold mb-4">
                Discover Fresh Flavors - Order Your Premium Seafood Today!
              </h3>
              <p className="text-xl mb-8 opacity-90">
                Explore our exquisite selection of freshly caught seafood, sourced from the world's finest waters. 
                Order now to experience the taste of quality and sustainability!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-ocean-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
                data-testid="button-about-get-in-touch"
              >
                GET IN TOUCH
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}