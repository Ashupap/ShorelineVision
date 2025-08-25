import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import { Star, Award, Globe, Users, Leaf, Target } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import BlueWorldMap from "@/components/blue-world-map";

export default function AboutUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(parallaxY, springConfig);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const initTimeline = () => {
      if (!timelineRef.current) return;
      
      const container = timelineRef.current;
      const cardsContainer = container.querySelector('.timeline-cards');
      const cards = container.querySelectorAll('.timeline-card');
      const progressCircle = container.querySelector('.timeline-progress-circle');
      const currentIcon = container.querySelector('.timeline-current-icon');
      const currentYear = container.querySelector('.timeline-current-year');
      
      if (!cardsContainer || cards.length === 0) return;
      
      const milestones = [
        { year: "1997", icon: "🏗️", color: "from-blue-500 to-cyan-500" },
        { year: "2000", icon: "📈", color: "from-green-500 to-teal-500" },
        { year: "2009", icon: "🌏", color: "from-purple-500 to-pink-500" },
        { year: "2012", icon: "🚀", color: "from-orange-500 to-red-500" },
        { year: "2015", icon: "🏆", color: "from-yellow-500 to-orange-500" },
        { year: "2021", icon: "🌟", color: "from-indigo-500 to-purple-500" }
      ];
      
      // Horizontal scroll timeline
      gsap.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          snap: 1 / (cards.length - 1),
          end: () => "+=" + (cardsContainer.scrollWidth || window.innerWidth * cards.length),
          onUpdate: self => {
            const progress = self.progress;
            const currentIndex = Math.round(progress * (cards.length - 1));
            
            // Update circular progress
            if (progressCircle) {
              const circumference = 283; // 2 * π * 45
              const offset = circumference - (progress * circumference);
              progressCircle.style.strokeDashoffset = offset.toString();
            }
            
            // Update current milestone icon and year
            if (currentIcon && currentYear && milestones[currentIndex]) {
              currentIcon.textContent = milestones[currentIndex].icon;
              currentYear.textContent = milestones[currentIndex].year;
              
              // Pulse animation when milestone changes
              if (progress % (1/cards.length) < 0.1) {
                gsap.fromTo(currentIcon, 
                  { scale: 1 },
                  { scale: 1.2, duration: 0.3, yoyo: true, repeat: 1, ease: "power2.inOut" }
                );
              }
            }
          }
        }
      });
      
      // Floating progress indicator entrance animation
      gsap.fromTo(container.querySelector('.fixed'), 
        { opacity: 0, x: 100 },
        { opacity: 1, x: 0, duration: 1, delay: 0.5, ease: "back.out(1.7)" }
      );
    };

    // Delay initialization to ensure DOM is ready
    const timeoutId = setTimeout(initTimeline, 100);

    return () => {
      clearTimeout(timeoutId);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

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

            {/* Horizontal Journey Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-20"
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
                  Journey of Alashore Marine Group
                </h3>
                <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                  From 1997, in the past 24 years, we have come so far and the journey has been amazing
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-ocean-blue to-marine-teal mx-auto rounded-full mt-6"></div>
              </div>
              

              {/* Horizontal Timeline with Floating Progress */}
              <div ref={timelineRef} className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
                {/* Floating Circular Progress Indicator */}
                <div className="fixed top-1/2 right-8 transform -translate-y-1/2 z-50">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24">
                    {/* Background Circle */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="rgb(229, 231, 235)"
                        strokeWidth="8"
                        fill="none"
                        className="opacity-30"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        stroke="url(#progressGradient)"
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray="283"
                        strokeDashoffset="283"
                        className="timeline-progress-circle transition-all duration-500 ease-out"
                      />
                      <defs>
                        <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="rgb(59, 130, 246)" />
                          <stop offset="50%" stopColor="rgb(6, 182, 212)" />
                          <stop offset="100%" stopColor="rgb(239, 68, 68)" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Current Milestone Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="timeline-current-icon w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-lg sm:text-xl transition-all duration-300 border-2 border-gray-200">
                        🏗️
                      </div>
                    </div>
                    
                    {/* Current Year */}
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs sm:text-sm font-bold text-gray-700 bg-white px-2 py-1 rounded-full shadow-md timeline-current-year">
                      1997
                    </div>
                  </div>
                </div>

                {/* Horizontal Scrolling Cards */}
                <div className="timeline-cards absolute top-0 left-0 w-max h-full flex">
                  {[
                    {
                      year: "1997",
                      title: "Foundation Year",
                      description: "Started our journey in the seafood industry with a vision to become a leading exporter",
                      icon: "🏗️",
                      color: "from-blue-500 to-cyan-500",
                      achievements: ["Established Company", "First Processing Unit", "Local Market Entry"]
                    },
                    {
                      year: "2000-2005",
                      title: "Growth Phase",
                      description: "Expanded operations and improved processing capabilities to meet international standards",
                      icon: "📈",
                      color: "from-green-500 to-teal-500", 
                      achievements: ["Quality Certifications", "Process Upgrades", "Team Expansion"]
                    },
                    {
                      year: "2009",
                      title: "Balasore Marine Exports Pvt. Ltd.",
                      description: "Established operations with focus on Asian markets including China, Vietnam, and UAE",
                      icon: "🌏",
                      color: "from-purple-500 to-pink-500",
                      achievements: ["Asian Market Entry", "Export License", "International Standards"]
                    },
                    {
                      year: "2012",
                      title: "Alashore Marine Exports Pvt. Ltd.",
                      description: "Expanded globally to USA, EU, Canada, Malaysia, Japan, and Mauritius with premium quality standards",
                      icon: "🚀",
                      color: "from-orange-500 to-red-500",
                      achievements: ["Global Expansion", "Premium Quality", "Multiple Certifications"]
                    },
                    {
                      year: "2015-2020",
                      title: "Excellence Era",
                      description: "Achieved industry recognition and expanded product portfolio with sustainable practices",
                      icon: "🏆",
                      color: "from-yellow-500 to-orange-500",
                      achievements: ["Industry Awards", "Sustainable Practices", "Product Innovation"]
                    },
                    {
                      year: "2021-Present",
                      title: "Future Forward",
                      description: "Leading with innovation, technology, and commitment to quality in the global seafood market",
                      icon: "🌟",
                      color: "from-indigo-500 to-purple-500",
                      achievements: ["Technology Integration", "Market Leadership", "Innovation Hub"]
                    }
                  ].map((milestone, index) => (
                    <div
                      key={milestone.year}
                      className="timeline-card flex-shrink-0 w-screen h-full flex items-center justify-center px-8 sm:px-12 lg:px-16"
                    >
                      <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        {/* Content Side */}
                        <div className="space-y-4 lg:space-y-6">
                          <div className={`inline-block bg-gradient-to-r ${milestone.color} text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-lg lg:text-xl font-bold shadow-lg`}>
                            {milestone.year}
                          </div>
                          
                          <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-heading font-bold text-gray-900 leading-tight">
                            {milestone.title}
                          </h3>
                          
                          <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
                            {milestone.description}
                          </p>
                          
                          {/* Achievements */}
                          <div className="space-y-3 lg:space-y-4">
                            <h4 className="text-ocean-blue text-sm sm:text-base lg:text-lg font-semibold uppercase tracking-wider">
                              Key Achievements
                            </h4>
                            <div className="grid gap-2 lg:gap-3">
                              {milestone.achievements.map((achievement, i) => (
                                <div 
                                  key={achievement}
                                  className="flex items-center space-x-3 bg-white/70 backdrop-blur-sm rounded-lg lg:rounded-xl p-3 lg:p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                                >
                                  <div className={`w-3 h-3 lg:w-4 lg:h-4 bg-gradient-to-r ${milestone.color} rounded-full flex-shrink-0`}></div>
                                  <span className="text-gray-700 font-medium text-sm sm:text-base lg:text-lg">{achievement}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Visual Side */}
                        <div className="flex items-center justify-center p-4">
                          <div className={`relative w-48 h-48 sm:w-64 sm:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 bg-gradient-to-br ${milestone.color} rounded-full flex items-center justify-center shadow-2xl group overflow-hidden`}>
                            <div className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl transition-transform duration-300 group-hover:scale-110">
                              {milestone.icon}
                            </div>
                            
                            {/* Floating elements */}
                            <div className="absolute inset-0 rounded-full">
                              {[...Array(6)].map((_, i) => (
                                <div
                                  key={i}
                                  className="absolute w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 bg-white/30 rounded-full animate-float"
                                  style={{
                                    top: `${25 + Math.sin(i * 60 * Math.PI / 180) * 25}%`,
                                    left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 30}%`,
                                    animationDelay: `${i * 0.3}s`
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Scroll Hint */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="flex items-center space-x-2 text-gray-600 text-sm bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                    <span>Scroll horizontally to explore timeline</span>
                    <div className="w-2 h-2 bg-ocean-blue rounded-full animate-pulse"></div>
                  </div>
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
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4">
                Our Global Presence
              </h3>
              <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-12">
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
              <BlueWorldMap />
            </motion.div>

            {/* Alternative Animation Designs - Floating Destination Bubbles */}
            <div className="relative mb-16 min-h-[400px] overflow-hidden">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl"></div>
              
              {/* Floating destination elements */}
              <div className="relative p-8">
                <div className="text-center mb-8">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Our Global Network</h4>
                  <p className="text-gray-600">Serving premium seafood to destinations worldwide</p>
                </div>
                
                {/* Floating bubbles container */}
                <div className="relative h-80">
                  {[
                    // North America cluster
                    { region: "USA", cities: ["Houston", "New York", "New Jersey", "LA", "Miami", "Chicago", "Seattle"], x: 20, y: 20, size: "large", color: "blue" },
                    { region: "Canada", cities: ["Toronto", "Vancouver"], x: 15, y: 10, size: "medium", color: "red" },
                    
                    // Europe cluster  
                    { region: "Europe", cities: ["Antwerp", "Amsterdam", "Rotterdam"], x: 50, y: 15, size: "large", color: "green" },
                    
                    // Asia cluster
                    { region: "Japan", cities: ["Tokyo", "Osaka"], x: 80, y: 25, size: "medium", color: "purple" },
                    { region: "China", cities: ["Zhanjiang", "Xiamen"], x: 75, y: 40, size: "medium", color: "orange" },
                    { region: "Southeast Asia", cities: ["Port Penang", "Catlai"], x: 70, y: 60, size: "medium", color: "teal" },
                    
                    // Middle East & Others
                    { region: "UAE", cities: ["Sharjah"], x: 60, y: 50, size: "small", color: "yellow" },
                    { region: "Mauritius", cities: ["Port Louis"], x: 65, y: 75, size: "small", color: "pink" }
                  ].map((destination, index) => {
                    const sizeClasses: Record<string, string> = {
                      small: "w-20 h-20 text-xs",
                      medium: "w-32 h-32 text-sm", 
                      large: "w-40 h-40 text-base"
                    };
                    
                    const colorClasses: Record<string, string> = {
                      blue: "from-blue-400 to-blue-600 border-blue-300",
                      red: "from-red-400 to-red-600 border-red-300",
                      green: "from-green-400 to-green-600 border-green-300",
                      purple: "from-purple-400 to-purple-600 border-purple-300", 
                      orange: "from-orange-400 to-orange-600 border-orange-300",
                      teal: "from-teal-400 to-teal-600 border-teal-300",
                      yellow: "from-yellow-400 to-yellow-600 border-yellow-300",
                      pink: "from-pink-400 to-pink-600 border-pink-300"
                    };
                    
                    return (
                      <motion.div
                        key={destination.region}
                        initial={{ 
                          opacity: 0, 
                          scale: 0,
                          x: Math.random() * 100 - 50,
                          y: Math.random() * 100 - 50
                        }}
                        animate={{ 
                          opacity: 1, 
                          scale: 1,
                          x: 0,
                          y: 0
                        }}
                        transition={{ 
                          duration: 1.5, 
                          delay: index * 0.2,
                          type: "spring",
                          stiffness: 100
                        }}
                        style={{
                          position: 'absolute',
                          left: `${destination.x}%`,
                          top: `${destination.y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        className="group cursor-pointer"
                      >
                        {/* Floating bubble with continuous motion */}
                        <motion.div
                          animate={{
                            y: [0, -20, 0],
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.05, 1]
                          }}
                          transition={{
                            duration: 4 + index * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className={`${sizeClasses[destination.size]} bg-gradient-to-br ${colorClasses[destination.color]} rounded-full border-4 backdrop-blur-sm shadow-2xl flex flex-col items-center justify-center relative overflow-hidden group-hover:scale-110 transition-all duration-300`}
                        >
                          {/* Shimmer effect */}
                          <motion.div
                            animate={{
                              x: [-100, 100],
                              opacity: [0, 1, 0]
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              repeatDelay: 3
                            }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                          />
                          
                          {/* Content */}
                          <div className="text-white text-center z-10">
                            <div className="font-bold mb-1 text-shadow">{destination.region}</div>
                            <div className={`${destination.size === 'small' ? 'text-xs' : 'text-xs'} opacity-90`}>
                              {destination.cities.length} {destination.cities.length === 1 ? 'city' : 'cities'}
                            </div>
                          </div>
                          
                          {/* Pulse rings */}
                          <motion.div
                            animate={{
                              scale: [1, 2.5, 1],
                              opacity: [0.8, 0, 0.8]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              delay: index * 0.5
                            }}
                            className={`absolute inset-0 rounded-full border-2 ${colorClasses[destination.color].split(' ')[2]}`}
                          />
                        </motion.div>
                        
                        {/* Tooltip on hover */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileHover={{ opacity: 1, y: -5 }}
                          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-xl p-3 min-w-[200px] z-20 border"
                        >
                          <div className="text-gray-900 font-semibold text-sm mb-2">{destination.region}</div>
                          <div className="space-y-1">
                            {destination.cities.map((city, cityIndex) => (
                              <motion.div
                                key={city}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: cityIndex * 0.05 }}
                                className="flex items-center text-gray-600 text-xs"
                              >
                                <div className={`w-1.5 h-1.5 bg-gradient-to-r ${colorClasses[destination.color]} rounded-full mr-2`}></div>
                                {city}
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                  
                  {/* Connecting lines animation */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                    {/* Animated connection paths */}
                    <motion.path
                      d="M20 20 Q40 10 50 15"
                      stroke="#60a5fa"
                      strokeWidth="0.5"
                      fill="none"
                      strokeDasharray="2,3"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ duration: 2, delay: 2 }}
                    />
                    <motion.path
                      d="M50 15 Q65 20 80 25"
                      stroke="#34d399"
                      strokeWidth="0.5"
                      fill="none"
                      strokeDasharray="2,3"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ duration: 2, delay: 2.5 }}
                    />
                    <motion.path
                      d="M75 40 Q70 50 65 75"
                      stroke="#f59e0b"
                      strokeWidth="0.5"
                      fill="none"
                      strokeDasharray="2,3"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.6 }}
                      transition={{ duration: 2, delay: 3 }}
                    />
                  </svg>
                  
                  {/* Floating particles */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        y: [100, -20],
                        x: [Math.random() * 20 - 10, Math.random() * 40 - 20]
                      }}
                      transition={{
                        duration: Math.random() * 8 + 5,
                        repeat: Infinity,
                        delay: Math.random() * 5
                      }}
                      className="absolute w-1 h-1 bg-blue-400 rounded-full"
                      style={{
                        left: `${Math.random() * 100}%`,
                        bottom: '0%'
                      }}
                    />
                  ))}
                </div>
              </div>
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