import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function AboutUsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -200]);
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
              (progressCircle as HTMLElement).style.strokeDashoffset = offset.toString();
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
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-ocean-blue via-marine-teal to-coral-accent overflow-hidden">
          {/* Animated Background Elements */}
          <motion.div
            style={{ y, opacity: parallaxOpacity }}
            className="absolute inset-0 z-0"
          >
            {/* Floating seafood elements */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-4xl opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                {['🐟', '🦐', '🦀', '🐙', '🦞'][Math.floor(Math.random() * 5)]}
              </motion.div>
            ))}
          </motion.div>

          <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-tight"
            >
              Our Story of
              <br />
              <span className="text-coral-accent">Excellence</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-xl md:text-2xl lg:text-3xl mb-8 max-w-4xl mx-auto opacity-90"
            >
              From humble beginnings to global leadership - Discover how Alashore Marine Exports has been revolutionizing the seafood industry since 1997
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="space-y-4 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center"
            >
              <button
                onClick={() => document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto bg-white text-ocean-blue px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 mb-4 sm:mb-0"
                data-testid="button-explore-journey"
              >
                EXPLORE OUR JOURNEY
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-ocean-blue transition-colors duration-300"
                data-testid="button-get-in-touch"
              >
                GET IN TOUCH
              </button>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-white rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Our Journey Timeline Section */}
        <section id="journey" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-gray-900 mb-8">
                Our Journey Through Time
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Experience the evolution of Alashore Marine Exports through the decades - from our founding vision to becoming a trusted name in global seafood excellence
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-ocean-blue to-marine-teal mx-auto rounded-full mt-6"></div>
            </motion.div>

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
                    description: "Alashore Marine Exports was established with a vision to bring the finest seafood from Indian waters to global markets",
                    icon: "🏗️",
                    color: "from-blue-500 to-cyan-500",
                    achievements: ["Company Establishment", "Initial Market Entry", "Quality Standards Set"]
                  },
                  {
                    year: "2000-2008",
                    title: "Growth & Expansion",
                    description: "Rapid expansion of operations with increased production capacity and market reach across multiple continents",
                    icon: "📈",
                    color: "from-green-500 to-teal-500",
                    achievements: ["Production Scaling", "International Markets", "Infrastructure Development"]
                  },
                  {
                    year: "2009-2011",
                    title: "Global Reach",
                    description: "Establishing presence in key international markets including USA, Europe, and Asia with premium seafood offerings",
                    icon: "🌏",
                    color: "from-purple-500 to-pink-500",
                    achievements: ["Global Market Entry", "Premium Product Lines", "International Partnerships"]
                  },
                  {
                    year: "2012-2014",
                    title: "Innovation Era",
                    description: "Introducing cutting-edge processing technology and sustainable practices to enhance product quality and environmental responsibility",
                    icon: "🚀",
                    color: "from-orange-500 to-red-500",
                    achievements: ["Technology Adoption", "Sustainable Practices", "Quality Enhancement"]
                  },
                  {
                    year: "2015-2020",
                    title: "Excellence Recognition",
                    description: "Receiving industry awards and certifications while expanding our product portfolio and market presence",
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
                        
                        <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-heading font-bold text-gray-900 leading-tight">
                          {milestone.title}
                        </h3>
                        
                        <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                          {milestone.description}
                        </p>
                        
                        {/* Achievements */}
                        <div className="space-y-3 lg:space-y-4">
                          <h4 className="text-ocean-blue text-xs sm:text-sm lg:text-base font-semibold uppercase tracking-wider">
                            Key Achievements
                          </h4>
                          <div className="grid gap-2 lg:gap-3">
                            {milestone.achievements.map((achievement, i) => (
                              <div 
                                key={achievement}
                                className="flex items-center space-x-3 bg-white/70 backdrop-blur-sm rounded-lg lg:rounded-xl p-3 lg:p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                              >
                                <div className={`w-3 h-3 lg:w-4 lg:h-4 bg-gradient-to-r ${milestone.color} rounded-full flex-shrink-0`}></div>
                                <span className="text-gray-700 font-medium text-xs sm:text-sm lg:text-base">{achievement}</span>
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

          {/* Interactive World Map with Shipping Routes */}
          <div className="relative mb-16">
            <div className="text-center mb-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-2">Our Global Shipping Network</h4>
              <p className="text-gray-600">Live shipping routes from India to worldwide destinations</p>
            </div>
            
            {/* World Map Container */}
            <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-3xl overflow-hidden shadow-2xl min-h-[500px]">
              {/* Map Background */}
              <svg
                viewBox="0 0 1000 500"
                className="w-full h-full"
                style={{ background: 'linear-gradient(to bottom, #1e3a8a, #1e40af, #2563eb)' }}
              >
                {/* Simplified world map continents */}
                <g fill="#059669" stroke="#047857" strokeWidth="1" opacity="0.8">
                  {/* North America */}
                  <path d="M 50 80 Q 100 60 180 80 L 200 120 Q 180 140 160 160 L 120 180 Q 80 160 60 120 Z" />
                  {/* South America */}
                  <path d="M 150 200 Q 180 180 200 220 L 220 280 Q 200 320 180 340 L 160 320 Q 140 280 140 240 Z" />
                  {/* Europe */}
                  <path d="M 400 60 Q 450 50 500 70 L 520 100 Q 500 120 480 130 L 450 120 Q 420 100 400 80 Z" />
                  {/* Africa */}
                  <path d="M 420 140 Q 480 120 520 160 L 540 240 Q 520 320 480 340 L 440 320 Q 400 280 400 220 Z" />
                  {/* Asia */}
                  <path d="M 520 60 Q 620 40 750 80 L 800 140 Q 780 180 740 200 L 680 180 Q 600 160 540 120 Z" />
                  {/* Australia */}
                  <path d="M 700 300 Q 750 280 800 300 L 820 340 Q 800 360 770 370 L 740 360 Q 710 340 700 320 Z" />
                  {/* India (highlighted) */}
                  <path d="M 580 180 Q 620 160 640 190 L 650 220 Q 630 240 610 250 L 590 240 Q 570 220 570 200 Z" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
                </g>
                
                {/* Destination markers */}
                {[
                  // USA
                  { name: "USA", cities: ["Houston", "New York", "LA", "Miami"], x: 120, y: 120, color: "#3b82f6" },
                  // Canada  
                  { name: "Canada", cities: ["Toronto", "Vancouver"], x: 100, y: 80, color: "#ef4444" },
                  // Europe
                  { name: "Europe", cities: ["Antwerp", "Amsterdam", "Rotterdam"], x: 460, y: 90, color: "#10b981" },
                  // Japan
                  { name: "Japan", cities: ["Tokyo", "Osaka"], x: 780, y: 140, color: "#8b5cf6" },
                  // China
                  { name: "China", cities: ["Zhanjiang", "Xiamen"], x: 720, y: 160, color: "#f59e0b" },
                  // Southeast Asia
                  { name: "Southeast Asia", cities: ["Port Penang", "Catlai"], x: 680, y: 220, color: "#06b6d4" },
                  // UAE
                  { name: "UAE", cities: ["Sharjah"], x: 540, y: 200, color: "#eab308" },
                  // Mauritius
                  { name: "Mauritius", cities: ["Port Louis"], x: 580, y: 300, color: "#ec4899" }
                ].map((destination, index) => (
                  <g key={destination.name}>
                    {/* Destination marker */}
                    <motion.circle
                      initial={{ r: 0, opacity: 0 }}
                      whileInView={{ r: 8, opacity: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      viewport={{ once: true }}
                      cx={destination.x}
                      cy={destination.y}
                      fill={destination.color}
                      stroke="white"
                      strokeWidth="2"
                      className="cursor-pointer"
                    >
                      <animate
                        attributeName="r"
                        values="8;12;8"
                        dur="2s"
                        repeatCount="indefinite"
                        begin={`${index * 0.3}s`}
                      />
                    </motion.circle>
                    
                    {/* Shipping route from India */}
                    <motion.path
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 0.7 }}
                      transition={{ duration: 2, delay: index * 0.3 }}
                      viewport={{ once: true }}
                      d={`M 610 220 Q ${(610 + destination.x) / 2} ${Math.min(220, destination.y) - 50} ${destination.x} ${destination.y}`}
                      stroke={destination.color}
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                      className="shipping-route"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        values="0;-10"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </motion.path>
                    
                    {/* Animated shipping vessel */}
                    <motion.g
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1, delay: index * 0.5 }}
                      viewport={{ once: true }}
                    >
                      <animateMotion
                        dur={`${6 + index}s`}
                        repeatCount="indefinite"
                        rotate="auto"
                      >
                        <mpath href={`#route-${index}`} />
                      </animateMotion>
                      <circle cx="0" cy="0" r="3" fill="#ffffff" stroke={destination.color} strokeWidth="1" />
                      <text x="0" y="-8" textAnchor="middle" fontSize="8" fill="white">🚢</text>
                    </motion.g>
                    
                    {/* Hidden path for animation */}
                    <path
                      id={`route-${index}`}
                      d={`M 610 220 Q ${(610 + destination.x) / 2} ${Math.min(220, destination.y) - 50} ${destination.x} ${destination.y}`}
                      stroke="none"
                      fill="none"
                    />
                  </g>
                ))}
                
                {/* India marker (origin) */}
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <circle
                    cx="610"
                    cy="220"
                    r="12"
                    fill="#f59e0b"
                    stroke="white"
                    strokeWidth="3"
                  >
                    <animate
                      attributeName="r"
                      values="12;16;12"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <text x="610" y="225" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">🇮🇳</text>
                  <text x="610" y="240" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">INDIA</text>
                </motion.g>
              </svg>
              
              {/* Floating destination info cards */}
              <div className="absolute inset-0 pointer-events-none">
                {[
                  { name: "USA", cities: ["Houston", "New York", "LA", "Miami"], x: "12%", y: "24%" },
                  { name: "Canada", cities: ["Toronto", "Vancouver"], x: "10%", y: "16%" },
                  { name: "Europe", cities: ["Antwerp", "Amsterdam", "Rotterdam"], x: "46%", y: "18%" },
                  { name: "Japan", cities: ["Tokyo", "Osaka"], x: "78%", y: "28%" },
                  { name: "China", cities: ["Zhanjiang", "Xiamen"], x: "72%", y: "32%" },
                  { name: "Southeast Asia", cities: ["Port Penang", "Catlai"], x: "68%", y: "44%" },
                  { name: "UAE", cities: ["Sharjah"], x: "54%", y: "40%" },
                  { name: "Mauritius", cities: ["Port Louis"], x: "58%", y: "60%" }
                ].map((destination, index) => (
                  <motion.div
                    key={destination.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true }}
                    className="absolute pointer-events-auto cursor-pointer"
                    style={{ left: destination.x, top: destination.y }}
                  >
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-white/50 min-w-[120px] hover:bg-white/95 transition-all duration-300">
                      <div className="font-bold text-gray-900 text-sm mb-1">{destination.name}</div>
                      <div className="text-xs text-gray-600">
                        {destination.cities.slice(0, 2).join(", ")}
                        {destination.cities.length > 2 && "..."}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Ocean waves animation */}
              <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
                <motion.div
                  animate={{
                    x: [0, -100, 0]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-r from-blue-400/30 via-cyan-400/30 to-blue-400/30"
                  style={{
                    borderRadius: "100% 100% 0 0",
                    transform: "scaleX(3)"
                  }}
                />
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