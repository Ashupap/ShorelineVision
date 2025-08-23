import { motion } from "framer-motion";
import { Leaf, Droplets, Recycle, Shield, Factory, Truck } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export default function Sustainability() {
  const sustainabilityFeatures = [
    {
      icon: Factory,
      title: "Infrastructure",
      description: "State-of-the-art processing facilities designed with environmental sustainability in mind, featuring energy-efficient equipment and waste reduction systems.",
      details: [
        "Solar-powered processing units",
        "Water recycling systems", 
        "Energy-efficient cold storage",
        "Automated waste sorting"
      ]
    },
    {
      icon: Leaf,
      title: "Processing",
      description: "Environmentally conscious processing methods that minimize waste, reduce energy consumption, and maintain the highest quality standards.",
      details: [
        "Zero-waste processing",
        "Organic waste composting",
        "Minimal water usage",
        "Chemical-free cleaning"
      ]
    },
    {
      icon: Droplets,
      title: "Aquaculture",
      description: "Sustainable aquaculture practices that protect marine ecosystems while ensuring optimal growth conditions for premium seafood.",
      details: [
        "Responsible farming practices",
        "Disease prevention protocols",
        "Natural feed systems",
        "Ecosystem preservation"
      ]
    },
    {
      icon: Truck,
      title: "Transportation",
      description: "Eco-friendly transportation solutions with advanced insulation and temperature control to maintain freshness while reducing carbon footprint.",
      details: [
        "Fuel-efficient delivery fleet",
        "Optimized route planning",
        "Temperature-controlled transport",
        "Carbon footprint tracking"
      ]
    }
  ];

  const certifications = [
    {
      name: "EIA Approved Laboratory",
      description: "Environmental Impact Assessment approved quality laboratory ensures all products meet environmental standards.",
      icon: Shield
    },
    {
      name: "Sustainable Aquaculture",
      description: "Recognized by top organizations for sustainable and responsible aquaculture practices.",
      icon: Leaf
    },
    {
      name: "Waste Management",
      description: "Comprehensive waste management system with 90% waste reduction and recycling programs.",
      icon: Recycle
    },
    {
      name: "Water Conservation",
      description: "Advanced water treatment and recycling systems reducing water consumption by 60%.",
      icon: Droplets
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-marine-teal to-ocean-blue text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                Sustainable Practices
              </h1>
              <p className="text-xl md:text-2xl text-light-marine max-w-3xl mx-auto">
                Our commitment to sustainability drives every aspect of our operations, from aquaculture to processing, 
                ensuring we protect our oceans while delivering premium seafood.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Sustainability Features */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
                Our Sustainable Approach
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                From farm to table, every step of our process is designed with sustainability in mind.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              {sustainabilityFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-light-marine to-white p-8 rounded-xl shadow-lg"
                >
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-ocean-blue rounded-xl flex items-center justify-center mr-6">
                      <feature.icon className="text-white" size={32} />
                    </div>
                    <h3 className="text-2xl font-heading font-semibold text-gray-900">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-6 text-lg">
                    {feature.description}
                  </p>
                  <ul className="space-y-3">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-gray-700">
                        <div className="w-2 h-2 bg-marine-teal rounded-full mr-3"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
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
                Our Environmental Certifications
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Recognized by leading environmental organizations for our commitment to sustainable practices.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 rounded-xl shadow-lg text-center"
                >
                  <div className="w-16 h-16 bg-marine-teal rounded-full flex items-center justify-center mx-auto mb-6">
                    <cert.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">
                    {cert.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {cert.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Numbers */}
        <section className="py-20 bg-ocean-blue text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Our Environmental Impact
              </h2>
              <p className="text-xl text-light-marine max-w-3xl mx-auto">
                Measurable results from our sustainable practices and environmental initiatives.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-coral-accent mb-2">90%</div>
                <p className="text-light-marine">Waste Reduction</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-coral-accent mb-2">60%</div>
                <p className="text-light-marine">Water Conservation</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-coral-accent mb-2">40%</div>
                <p className="text-light-marine">Energy Reduction</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-coral-accent mb-2">100%</div>
                <p className="text-light-marine">Sustainable Sourcing</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Future Goals */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
                  Our Future Sustainability Goals
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  We're committed to continuous improvement in our environmental practices, 
                  setting ambitious goals for the next decade to further reduce our environmental impact.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-marine-teal rounded-full mr-4"></div>
                    <span className="text-gray-700">Carbon neutral operations by 2030</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-marine-teal rounded-full mr-4"></div>
                    <span className="text-gray-700">100% renewable energy by 2028</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-marine-teal rounded-full mr-4"></div>
                    <span className="text-gray-700">Zero plastic packaging by 2026</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-marine-teal rounded-full mr-4"></div>
                    <span className="text-gray-700">Ecosystem restoration programs</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                    alt="Sustainable aquaculture practices"
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-marine-teal to-ocean-blue text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Partner with Sustainable Seafood Leaders
              </h2>
              <p className="text-xl text-light-marine mb-8 max-w-3xl mx-auto">
                Join us in our mission to provide premium seafood while protecting our oceans for future generations.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-coral-accent hover:bg-golden-orange text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
                data-testid="button-partner-with-us"
              >
                Partner with Us
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}