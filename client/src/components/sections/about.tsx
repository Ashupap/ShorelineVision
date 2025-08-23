import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-light-marine to-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
            About Us
          </h2>
          <p className="text-xl text-ocean-blue font-semibold">Dedicated to Quality Product</p>
        </motion.div>

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
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-ocean-blue text-xl font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              We're on a mission to introduce a 'New Taste for Life' by creating innovative breaded products. We believe in continuous improvement through technological advancements in our processes. Additionally, we're committed to supporting farmers for a more sustainable future. Our goal is not only to offer delicious and innovative food but also to use technology responsibly and promote sustainability, ensuring a better future for everyone involved.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-ocean-blue text-xl font-semibold mb-4">Our Vision</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Alashore Marine's vision is to be a leading global brand in the frozen food industry and to become a top global brand and a leading frozen seafood exporter. We strive for this by investing in top-notch infrastructure, adopting industry best practices, adhering to global quality standards, and implementing strict safety policies. We aim to establish ourselves as the world's largest supplier of frozen food products, providing protein from farms to fork with the best taste.
            </p>
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

        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
          {[
            { name: "Gyana Ranjan Dash", position: "Managing Director" },
            { name: "Madhusudan Dash", position: "Director" },
            { name: "Bishnupriya Dash", position: "Shareholder" },
            { name: "Monalina Panda", position: "Director" },
            { name: "Rashmikanta Panda", position: "Director" },
            { name: "Debasish Dash", position: "Director" }
          ].map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-ocean-blue to-marine-teal rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  {leader.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{leader.name}</h4>
              <p className="text-sm text-ocean-blue uppercase">{leader.position}</p>
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

        {/* Global Presence Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            { region: "USA", cities: ["Houston", "New York", "New Jersey", "LA", "Miami", "Chicago", "Seattle"] },
            { region: "Canada", cities: ["Toronto", "Vancouver"] },
            { region: "Europe", cities: ["Antwerp (BEL)", "Amsterdam (NEH)", "Rotterdam (NEH)"] },
            { region: "Asia", cities: ["Tokyo", "Osaka", "Zhanjiang", "Xiamen", "Port Penang"] }
          ].map((location, index) => (
            <motion.div
              key={location.region}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <h4 className="text-ocean-blue text-xl font-semibold mb-4">{location.region}</h4>
              <ul className="text-gray-600 space-y-1">
                {location.cities.map((city) => (
                  <li key={city} className="text-sm">{city}</li>
                ))}
              </ul>
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
  );
}
