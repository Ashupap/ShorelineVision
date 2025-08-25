import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Star, Award, Globe, Users, Leaf, Target } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import AnimatedEarthMap from "@/components/animated-earth-map";

export default function AboutUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(parallaxY, springConfig);

  return (
    <div ref={containerRef} className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Enhanced Hero Section with Parallax */}
        <section className="relative py-32 bg-gradient-to-br from-ocean-blue via-marine-teal to-deep-navy text-white overflow-hidden">
          <motion.div 
            style={{ y, opacity: parallaxOpacity }}
            className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"
          />
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full backdrop-blur-sm"
          />
          <motion.div
            animate={{ 
              y: [0, -30, 0],
              x: [0, 20, 0]
            }}
            transition={{ 
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 5
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
                <Star className="text-coral-accent mr-2" size={20} />
                <span className="text-white/90 font-medium">Excellence Since 2012</span>
              </motion.div>
              <motion.h1 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.2 }}
                className="text-6xl md:text-8xl font-heading font-bold mb-8"
              >
                About <span className="text-coral-accent">Us</span>
              </motion.h1>
              <motion.p 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-xl md:text-2xl text-light-marine max-w-4xl mx-auto leading-relaxed"
              >
                Dedicated to Quality Product - Leading the way in premium seafood exports 
                with sustainable practices and unmatched quality standards
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
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

            {/* Message From Our Managing Director */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
                  Message From Our Managing Director
                </h3>
                <div className="w-24 h-1 bg-gradient-to-r from-ocean-blue to-marine-teal mx-auto rounded-full"></div>
              </div>
              
              <div className="bg-gradient-to-br from-white to-light-marine/30 rounded-3xl shadow-2xl overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="p-12 md:p-16">
                    <blockquote className="text-gray-700 text-lg leading-relaxed italic mb-8">
                      "At Alashore Marine, we believe that quality is not just a standard but a commitment to excellence that defines every aspect of our operations. Our journey from a small seafood processing unit to becoming a leading exporter has been guided by our unwavering dedication to sustainable practices, innovation, and customer satisfaction.
                      <br /><br />
                      We are not just exporting seafood; we are sharing the rich maritime heritage of our region with the world. Each product that leaves our facility carries with it our promise of freshness, quality, and environmental responsibility."
                    </blockquote>
                    <div className="flex items-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-ocean-blue to-marine-teal rounded-full flex items-center justify-center mr-4">
                        <span className="text-white text-xl font-bold">GRD</span>
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 text-lg">Gyana Ranjan Dash</p>
                        <p className="text-ocean-blue font-semibold">Managing Director</p>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800"
                      alt="Managing Director - Gyana Ranjan Dash"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ocean-blue/20 to-transparent"></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Mission and Vision Section */}
            <div className="grid md:grid-cols-2 gap-12 mb-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Background Image with Parallax Effect */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                    alt="Our Mission - Innovation in Seafood"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-600/95 via-red-600/90 to-purple-600/95"></div>
                </div>
                
                {/* Content */}
                <div className="relative p-10 h-full flex flex-col justify-between min-h-[500px]">
                  <div>
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <span className="text-white text-3xl">🎯</span>
                    </div>
                    <h3 className="text-white text-3xl font-bold mb-6 group-hover:text-yellow-200 transition-colors duration-300">Our Mission</h3>
                  </div>
                  <div>
                    <p className="text-white/90 text-lg leading-relaxed mb-6">
                      We're on a mission to introduce a 'New Taste for Life' by creating innovative breaded products. We believe in continuous improvement through technological advancements in our processes. Additionally, we're committed to supporting farmers for a more sustainable future.
                    </p>
                    <div className="w-full h-1 bg-gradient-to-r from-white/30 to-yellow-200/50 rounded-full group-hover:from-yellow-200 group-hover:to-white transition-all duration-500"></div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="group relative"
              >
                {/* Background Image with Parallax Effect */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1544943910-4c1dc44aab44?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                    alt="Our Vision - Global Leadership"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/95 via-green-600/90 to-purple-600/95"></div>
                </div>
                
                {/* Content */}
                <div className="relative p-10 h-full flex flex-col justify-between min-h-[500px]">
                  <div>
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      <span className="text-white text-3xl">🌟</span>
                    </div>
                    <h3 className="text-white text-3xl font-bold mb-6 group-hover:text-yellow-200 transition-colors duration-300">Our Vision</h3>
                  </div>
                  <div>
                    <p className="text-white/90 text-lg leading-relaxed mb-6">
                      Alashore Marine's vision is to be a leading global brand in the frozen food industry and to become a top global brand and a leading frozen seafood exporter. We strive for this by investing in top-notch infrastructure, adopting industry best practices, adhering to global quality standards.
                    </p>
                    <div className="w-full h-1 bg-gradient-to-r from-white/30 to-yellow-200/50 rounded-full group-hover:from-yellow-200 group-hover:to-white transition-all duration-500"></div>
                  </div>
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
                { 
                  name: "Gyana Ranjan Dash", 
                  position: "Managing Director", 
                  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
                  description: "Visionary leader driving innovation in seafood export industry",
                  experience: "15+ Years"
                },
                { 
                  name: "Madhusudan Dash", 
                  position: "Director", 
                  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
                  description: "Expert in international trade and business development",
                  experience: "12+ Years"
                },
                { 
                  name: "Bishnupriya Dash", 
                  position: "Shareholder", 
                  avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
                  description: "Strategic investor committed to sustainable growth",
                  experience: "10+ Years"
                },
                { 
                  name: "Monalina Panda", 
                  position: "Director", 
                  avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
                  description: "Operations specialist ensuring quality excellence",
                  experience: "14+ Years"
                },
                { 
                  name: "Rashmikanta Panda", 
                  position: "Director", 
                  avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
                  description: "Technology and innovation leader",
                  experience: "11+ Years"
                },
                { 
                  name: "Debasish Dash", 
                  position: "Director", 
                  avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
                  description: "Financial and strategic planning expert",
                  experience: "13+ Years"
                }
              ].map((leader, index) => (
                <motion.div
                  key={leader.name}
                  initial={{ opacity: 0, y: 60, rotateY: 45 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 perspective-1000"
                >
                  <div className="relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-ocean-blue/5 to-marine-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Image Container */}
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={leader.avatar}
                        alt={leader.name}
                        className="w-full h-72 object-cover transition-transform duration-700"
                        whileHover={{ scale: 1.1 }}
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                      
                      {/* Experience Badge */}
                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                        className="absolute top-4 right-4 bg-coral-accent text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                      >
                        {leader.experience}
                      </motion.div>
                      
                      {/* Floating Elements */}
                      <motion.div
                        animate={{ 
                          y: [0, -10, 0],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.5
                        }}
                        className="absolute bottom-4 left-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      />
                    </div>
                  </div>
                  
                  <div className="p-6 relative">
                    {/* Name and Position */}
                    <div className="text-center mb-4">
                      <motion.h4 
                        className="text-xl font-bold text-gray-900 mb-2 group-hover:text-ocean-blue transition-colors duration-300"
                        whileHover={{ scale: 1.05 }}
                      >
                        {leader.name}
                      </motion.h4>
                      <p className="text-sm text-coral-accent font-semibold uppercase tracking-wide mb-3 group-hover:text-marine-teal transition-colors duration-300">
                        {leader.position}
                      </p>
                      
                      {/* Animated Divider */}
                      <motion.div 
                        className="w-12 h-1 bg-gradient-to-r from-ocean-blue to-marine-teal mx-auto rounded-full group-hover:w-24 transition-all duration-500"
                        whileHover={{ 
                          background: "linear-gradient(90deg, #F59E0B, #EF4444, #8B5CF6)",
                          scale: 1.1
                        }}
                      />
                    </div>
                    
                    {/* Description */}
                    <motion.p 
                      initial={{ opacity: 0, height: 0 }}
                      whileInView={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                      className="text-sm text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
                    >
                      {leader.description}
                    </motion.p>
                    
                    {/* Social/Contact Icons (Placeholder) */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                      className="flex justify-center space-x-3 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    >
                      <div className="w-8 h-8 bg-ocean-blue/10 rounded-full flex items-center justify-center hover:bg-ocean-blue hover:text-white transition-all duration-300 cursor-pointer">
                        <span className="text-xs">✉</span>
                      </div>
                      <div className="w-8 h-8 bg-marine-teal/10 rounded-full flex items-center justify-center hover:bg-marine-teal hover:text-white transition-all duration-300 cursor-pointer">
                        <span className="text-xs">in</span>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Decorative Corner */}
                  <div className="absolute top-0 left-0 w-0 h-0 border-t-[20px] border-l-[20px] border-t-ocean-blue/20 border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.div>
              ))}
            </div>

            {/* Journey Section - Winery Timeline Style */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-20 relative"
            >
              {/* Background with vintage wine texture */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-red-900/10 to-purple-900/20 rounded-3xl"></div>
              
              <div className="relative z-10 text-center mb-16 py-12">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1 }}
                  className="inline-block"
                >
                  <h3 className="text-5xl md:text-6xl font-heading font-bold text-white mb-6 drop-shadow-2xl">
                    Our <span className="text-amber-400">Journey</span>
                  </h3>
                  <div className="w-32 h-2 bg-gradient-to-r from-amber-400 via-red-500 to-purple-600 mx-auto rounded-full mb-6"></div>
                  <p className="text-white/90 text-xl max-w-3xl mx-auto drop-shadow-lg">
                    A story of excellence, crafted through decades of dedication
                  </p>
                </motion.div>
              </div>
              
              {/* Winery Timeline */}
              <div className="relative max-w-6xl mx-auto">
                {/* Wine Bottle Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full">
                  <div className="w-2 h-full bg-gradient-to-b from-amber-600 via-red-700 to-purple-800 rounded-full shadow-xl"></div>
                  {/* Cork tops */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-amber-200 rounded-full border-4 border-amber-600 shadow-lg"></div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-purple-200 rounded-full border-4 border-purple-600 shadow-lg"></div>
                </div>
                
                <div className="space-y-20 py-16">
                  {[
                    {
                      year: "2009",
                      title: "Balasore Marine Exports",
                      subtitle: "The Foundation Vintage",
                      description: "Like a carefully selected grape harvest, we began our journey in the Asian markets with China, Vietnam, and UAE. This was our foundation year, where we established our commitment to quality.",
                      destinations: ["China", "Vietnam", "UAE"],
                      color: "from-amber-500 to-orange-600",
                      side: "left",
                      icon: "🍇"
                    },
                    {
                      year: "2012",
                      title: "Alashore Marine Exports",
                      subtitle: "The Global Reserve",
                      description: "Our finest vintage year - expanding our reach globally like a premium wine finding its way to the most prestigious tables worldwide. We conquered new territories with unwavering quality.",
                      destinations: ["USA", "EU", "Canada", "Malaysia", "Japan", "Mauritius"],
                      color: "from-red-500 to-purple-600",
                      side: "right",
                      icon: "🌍"
                    }
                  ].map((milestone, index) => (
                    <motion.div
                      key={milestone.year}
                      initial={{ 
                        opacity: 0, 
                        x: milestone.side === 'left' ? -100 : 100,
                        scale: 0.8
                      }}
                      whileInView={{ 
                        opacity: 1, 
                        x: 0,
                        scale: 1
                      }}
                      transition={{ 
                        duration: 1.2, 
                        delay: index * 0.5,
                        type: "spring",
                        stiffness: 100
                      }}
                      viewport={{ once: true }}
                      className={`flex items-center ${milestone.side === 'left' ? 'justify-start' : 'justify-end'}`}
                    >
                      {/* Wine Bottle Card */}
                      <div className={`w-5/12 ${milestone.side === 'left' ? 'pr-12' : 'pl-12'}`}>
                        <motion.div
                          whileHover={{ 
                            scale: 1.05,
                            rotateY: milestone.side === 'left' ? 5 : -5
                          }}
                          className="group relative bg-gradient-to-br from-black/80 to-gray-900/90 backdrop-blur-lg rounded-2xl overflow-hidden shadow-2xl border border-amber-500/30"
                        >
                          {/* Wine Label Background */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${milestone.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
                          
                          {/* Decorative Wine Elements */}
                          <div className="absolute top-4 right-4 text-4xl opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                            {milestone.icon}
                          </div>
                          
                          <div className="relative p-8">
                            {/* Year Badge - Wine Vintage Style */}
                            <div className={`inline-block bg-gradient-to-r ${milestone.color} text-white px-6 py-2 rounded-full font-bold text-lg mb-4 shadow-lg`}>
                              {milestone.year}
                            </div>
                            
                            {/* Wine Label Content */}
                            <div className="text-center mb-6">
                              <h4 className="text-white text-2xl font-bold mb-2 group-hover:text-amber-200 transition-colors duration-300">
                                {milestone.title}
                              </h4>
                              <p className="text-amber-400 font-semibold text-sm uppercase tracking-wider">
                                {milestone.subtitle}
                              </p>
                              <div className="w-16 h-0.5 bg-gradient-to-r from-amber-400 to-red-500 mx-auto mt-3"></div>
                            </div>
                            
                            <p className="text-white/90 leading-relaxed mb-6 text-center italic">
                              {milestone.description}
                            </p>
                            
                            {/* Destinations - Wine Tasting Notes Style */}
                            <div className="text-center">
                              <p className="text-amber-300 text-sm font-semibold mb-2">Market Destinations</p>
                              <div className="flex flex-wrap justify-center gap-2">
                                {milestone.destinations.map((destination, i) => (
                                  <motion.span
                                    key={destination}
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: i * 0.1 }}
                                    className="bg-amber-900/50 text-amber-200 px-3 py-1 rounded-full text-xs border border-amber-500/30 hover:bg-amber-800/70 transition-colors duration-300"
                                  >
                                    {destination}
                                  </motion.span>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          {/* Wine Cork */}
                          <div className={`absolute ${milestone.side === 'left' ? '-right-2' : '-left-2'} top-1/2 transform -translate-y-1/2 w-4 h-12 bg-gradient-to-b from-amber-200 to-amber-600 rounded-full border-2 border-amber-700 shadow-lg`}></div>
                        </motion.div>
                      </div>
                      
                      {/* Central Wine Glass */}
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.5 + 0.3 }}
                        className="relative z-20"
                      >
                        <div className={`w-16 h-16 bg-gradient-to-br ${milestone.color} rounded-full border-4 border-white shadow-2xl flex items-center justify-center`}>
                          <span className="text-white text-2xl font-bold">{milestone.icon}</span>
                        </div>
                        {/* Wine Pour Effect */}
                        <motion.div
                          animate={{
                            scaleY: [0, 1, 0.8, 1],
                            opacity: [0, 0.6, 0.3, 0.6]
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 2
                          }}
                          className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gradient-to-b ${milestone.color} rounded-full opacity-30`}
                        />
                      </motion.div>
                      
                      <div className="w-5/12"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Business Evolution Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
                Our Global Presence
              </h3>
              <p className="text-white/90 text-lg max-w-3xl mx-auto mb-12">
                Connecting oceans worldwide - Discover how our premium seafood reaches tables across continents through our extensive global network
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
              <AnimatedEarthMap />
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