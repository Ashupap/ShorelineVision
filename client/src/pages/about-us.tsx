import { motion } from "framer-motion";
import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import InteractiveWorldMap from "@/components/interactive-world-map";

export default function AboutUs() {
  const [activeStep, setActiveStep] = useState(0);

  const timelineData = [
    {
      year: "2020",
      title: "The Beginning",
      description: "Alashore Marine Exports was founded with a vision to bring the finest seafood from Indian waters to global markets.",
      icon: "🌊",
      color: "from-blue-500 to-teal-500"
    },
    {
      year: "2021",
      title: "First International Export",
      description: "Successfully exported our first shipment to the USA, marking our entry into international markets.",
      icon: "🚢",
      color: "from-teal-500 to-green-500"
    },
    {
      year: "2022",
      title: "Expansion to Europe",
      description: "Extended our reach to European markets, establishing strong partnerships in Netherlands and Belgium.",
      icon: "🌍",
      color: "from-green-500 to-emerald-500"
    },
    {
      year: "2023",
      title: "Quality Certifications",
      description: "Achieved international quality certifications and sustainable fishing practices recognition.",
      icon: "⭐",
      color: "from-emerald-500 to-blue-500"
    },
    {
      year: "2024",
      title: "Global Network",
      description: "Now serving 19+ destinations across North America, Europe, Asia, and Middle East with premium seafood.",
      icon: "🌐",
      color: "from-blue-500 to-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-ocean-blue via-marine-teal to-seafoam-green text-white overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                About Alashore Marine
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 opacity-90">
                From the pristine waters of India to tables around the world - 
                discover our journey of bringing premium seafood to global markets
              </p>
            </motion.div>
          </div>
          
          {/* Animated waves */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
              <path
                d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                opacity=".25"
                className="fill-white"
              ></path>
              <path
                d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                opacity=".5"
                className="fill-white"
              ></path>
              <path
                d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                className="fill-white"
              ></path>
            </svg>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Founded with a passion for ocean-to-table excellence, Alashore Marine Exports has grown 
                from a local seafood supplier to a trusted global partner, connecting the rich marine 
                heritage of India with discerning customers worldwide.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-600 mb-6">
                  To deliver the finest quality seafood from India's coastal waters to global markets, 
                  while maintaining sustainable fishing practices and supporting local fishing communities. 
                  We believe in transparency, quality, and building lasting relationships with our partners worldwide.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-ocean-blue">19+</div>
                    <div className="text-sm text-gray-600">Global Destinations</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-marine-teal">100%</div>
                    <div className="text-sm text-gray-600">Quality Assured</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square bg-gradient-to-br from-ocean-blue to-marine-teal rounded-2xl p-8 text-white">
                  <div className="h-full flex flex-col justify-center items-center text-center">
                    <div className="text-6xl mb-4">🌊</div>
                    <h4 className="text-2xl font-bold mb-2">From Ocean to Table</h4>
                    <p className="opacity-90">
                      Bringing the freshest catch from Indian waters directly to your customers with 
                      uncompromising quality and sustainable practices.
                    </p>
                  </div>
                </div>
                {/* Floating elements */}
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 bg-white p-4 rounded-full shadow-lg"
                >
                  <span className="text-2xl">🐟</span>
                </motion.div>
                <motion.div
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-4 -left-4 bg-white p-4 rounded-full shadow-lg"
                >
                  <span className="text-2xl">🦐</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6">
                Our Journey
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From humble beginnings to global reach - trace our evolution in the seafood export industry
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-ocean-blue to-marine-teal"></div>
              
              {timelineData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                  onMouseEnter={() => setActiveStep(index)}
                >
                  {/* Timeline dot */}
                  <motion.div
                    animate={{
                      scale: activeStep === index ? 1.2 : 1,
                      boxShadow: activeStep === index 
                        ? "0 0 20px rgba(59, 130, 246, 0.5)" 
                        : "0 0 0px rgba(59, 130, 246, 0)"
                    }}
                    className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-ocean-blue rounded-full z-10"
                  ></motion.div>
                  
                  {/* Content card */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className={`w-5/12 ${index % 2 === 0 ? 'mr-auto pr-8' : 'ml-auto pl-8'}`}
                  >
                    <div className={`bg-gradient-to-br ${item.color} text-white p-6 rounded-xl shadow-lg`}>
                      <div className="flex items-center mb-3">
                        <span className="text-3xl mr-3">{item.icon}</span>
                        <span className="text-lg font-bold">{item.year}</span>
                      </div>
                      <h3 className="text-xl font-heading font-bold mb-2">{item.title}</h3>
                      <p className="opacity-90">{item.description}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Global Presence Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            {/* Business Evolution Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
                Our Global Presence
              </h3>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
                Connecting oceans worldwide - Discover how our premium seafood
                reaches tables across continents through our extensive global
                network
              </p>
            </motion.div>

            {/* Animated Earth Map */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <InteractiveWorldMap />
            </motion.div>

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
                Explore our exquisite selection of freshly caught seafood,
                sourced from the world's finest waters. Order now to experience
                the taste of quality and sustainability!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
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