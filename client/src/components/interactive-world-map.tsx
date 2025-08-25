import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import mapImage from "@assets/daae0035-cb27-4e73-bc2e-dd558b71a9d3_1756123214469.png";

interface Destination {
  name: string;
  country: string;
  x: number;
  y: number;
  region: string;
  products: string[];
}

// Global Network Data merged from Our Global Network section
const globalNetwork = {
  regions: [
    {
      name: "USA",
      cities: ["Houston", "New York", "New Jersey", "LA", "Miami", "Chicago", "Seattle"],
      color: "blue",
      size: "large"
    },
    {
      name: "Canada", 
      cities: ["Toronto", "Vancouver"],
      color: "red",
      size: "medium"
    },
    {
      name: "Europe",
      cities: ["Antwerp", "Amsterdam", "Rotterdam"], 
      color: "green",
      size: "large"
    },
    {
      name: "Japan",
      cities: ["Tokyo", "Osaka"],
      color: "purple", 
      size: "medium"
    },
    {
      name: "China",
      cities: ["Zhanjiang", "Xiamen"],
      color: "orange",
      size: "medium"
    },
    {
      name: "Southeast Asia",
      cities: ["Port Penang", "Catlai"],
      color: "teal",
      size: "medium"
    },
    {
      name: "UAE",
      cities: ["Sharjah"],
      color: "yellow",
      size: "small"
    },
    {
      name: "Mauritius", 
      cities: ["Port Louis"],
      color: "pink",
      size: "small"
    }
  ]
};

const destinations: Destination[] = [
  // USA
  { name: "Houston", country: "USA", x: 28, y: 48, region: "North America", products: ["Shrimp", "Fish"] },
  { name: "New York", country: "USA", x: 32, y: 42, region: "North America", products: ["Premium Seafood"] },
  { name: "New Jersey", country: "USA", x: 32.5, y: 43, region: "North America", products: ["Frozen Fish"] },
  { name: "LA", country: "USA", x: 22, y: 45, region: "North America", products: ["Crab", "Lobster"] },
  { name: "Miami", country: "USA", x: 30, y: 52, region: "North America", products: ["Tropical Fish"] },
  { name: "Chicago", country: "USA", x: 28, y: 40, region: "North America", products: ["Seafood Mix"] },
  { name: "Seattle", country: "USA", x: 20, y: 35, region: "North America", products: ["Salmon"] },
  
  // Canada
  { name: "Toronto", country: "Canada", x: 30, y: 38, region: "North America", products: ["Atlantic Fish"] },
  { name: "Vancouver", country: "Canada", x: 20, y: 33, region: "North America", products: ["Pacific Seafood"] },
  
  // Europe
  { name: "Antwerp", country: "Belgium", x: 52, y: 32, region: "Europe", products: ["European Mix"] },
  { name: "Amsterdam", country: "Netherlands", x: 52.5, y: 31, region: "Europe", products: ["Premium Selection"] },
  { name: "Rotterdam", country: "Netherlands", x: 52, y: 32.5, region: "Europe", products: ["Bulk Seafood"] },
  
  // Asia
  { name: "Tokyo", country: "Japan", x: 85, y: 42, region: "Asia", products: ["Sushi Grade"] },
  { name: "Osaka", country: "Japan", x: 84, y: 44, region: "Asia", products: ["Premium Fish"] },
  { name: "Zhanjiang", country: "China", x: 78, y: 48, region: "Asia", products: ["Bulk Export"] },
  { name: "Xiamen", country: "China", x: 80, y: 50, region: "Asia", products: ["Frozen Seafood"] },
  { name: "Port Penang", country: "Malaysia", x: 74, y: 58, region: "Asia", products: ["Tropical Catch"] },
  { name: "Catlai", country: "Vietnam", x: 76, y: 56, region: "Asia", products: ["River & Sea"] },
  
  // Middle East & Others
  { name: "Sharjah", country: "UAE", x: 60, y: 52, region: "Middle East", products: ["Desert Port Mix"] },
  { name: "Port Louis", country: "Mauritius", x: 62, y: 72, region: "Africa", products: ["Island Seafood"] },
];

// India (origin point) - Odisha location
const indiaLocation = { x: 65, y: 55, name: "Alashore Marine - Odisha, India" };

export default function InteractiveWorldMap() {
  const [hoveredDestination, setHoveredDestination] = useState<Destination | null>(null);
  const [activeShipping, setActiveShipping] = useState<string[]>([]);

  useEffect(() => {
    // Start shipping animations with staggered delays
    const startShipping = () => {
      destinations.forEach((dest, index) => {
        setTimeout(() => {
          setActiveShipping(prev => [...prev, dest.name]);
        }, index * 500);
      });
    };

    const timer = setTimeout(startShipping, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl">
      {/* HD Network World Map Background */}
      <div className="absolute inset-0">
        <img 
          src={mapImage} 
          alt="Global Network Map" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Shipping Routes Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100">
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.9"/>
            <stop offset="50%" stopColor="#00f5ff" stopOpacity="0.7"/>
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.9"/>
          </linearGradient>
          <filter id="routeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {destinations.map((destination, index) => (
          <motion.path
            key={`route-${destination.name}`}
            d={`M${indiaLocation.x} ${indiaLocation.y} Q${(indiaLocation.x + destination.x) / 2} ${Math.min(indiaLocation.y, destination.y) - 10} ${destination.x} ${destination.y}`}
            stroke="url(#routeGradient)"
            strokeWidth="0.4"
            fill="none"
            strokeDasharray="3,1"
            filter="url(#routeGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: activeShipping.includes(destination.name) ? 1 : 0, 
              opacity: activeShipping.includes(destination.name) ? 0.8 : 0,
              strokeDashoffset: [0, -6]
            }}
            transition={{ 
              pathLength: { duration: 2.5, ease: "easeInOut" },
              opacity: { duration: 1.5 },
              strokeDashoffset: { duration: 3, repeat: Infinity, ease: "linear" }
            }}
          />
        ))}
      </svg>

      {/* Origin Point - India */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        style={{
          position: 'absolute',
          left: `${indiaLocation.x}%`,
          top: `${indiaLocation.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
        className="z-30"
      >
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            boxShadow: [
              "0 0 30px rgba(255, 107, 53, 0.6)",
              "0 0 50px rgba(255, 107, 53, 0.9)",
              "0 0 30px rgba(255, 107, 53, 0.6)"
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full border-4 border-white shadow-2xl flex items-center justify-center relative cursor-pointer"
          onMouseEnter={() => setHoveredDestination({ 
            name: indiaLocation.name, 
            country: "India", 
            x: indiaLocation.x, 
            y: indiaLocation.y, 
            region: "Asia", 
            products: ["Export Hub"] 
          })}
          onMouseLeave={() => setHoveredDestination(null)}
        >
          <span className="text-white text-xl font-bold">🏭</span>
          <motion.div 
            animate={{
              scale: [1, 2.5, 1],
              opacity: [0.6, 0, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut"
            }}
            className="absolute inset-0 bg-orange-500 rounded-full"
          />
        </motion.div>
      </motion.div>

      {/* Enhanced Shipping Animations */}
      <AnimatePresence>
        {destinations.map((destination, index) => {
          if (!activeShipping.includes(destination.name)) return null;
          
          const startX = indiaLocation.x;
          const startY = indiaLocation.y;
          const endX = destination.x;
          const endY = destination.y;
          
          // Calculate curved path
          const controlX = (startX + endX) / 2 + (Math.random() - 0.5) * 15;
          const controlY = Math.min(startY, endY) - 8 - Math.random() * 10;
          
          return (
            <motion.div
              key={`ship-${destination.name}`}
              initial={{ 
                opacity: 0,
                scale: 0.5
              }}
              animate={{ 
                opacity: [0, 1, 1, 0.7, 0],
                scale: [0.5, 1.2, 1, 1, 0.8]
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                repeatDelay: 4 + Math.random() * 6,
                ease: "easeInOut",
                delay: index * 0.4
              }}
              className="absolute z-20 pointer-events-none"
              style={{ 
                left: `${startX}%`,
                top: `${startY}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {/* Ship with curved path animation */}
              <motion.div
                animate={{
                  x: [`0%`, `${(controlX - startX) * 4}px`, `${(endX - startX) * 4}px`],
                  y: [`0%`, `${(controlY - startY) * 4}px`, `${(endY - startY) * 4}px`],
                  rotate: [0, 15, -10, 5, 0],
                  scale: [1, 1.1, 0.9, 1]
                }}
                transition={{
                  duration: 5 + Math.random() * 3,
                  repeat: Infinity,
                  repeatDelay: 4 + Math.random() * 6,
                  ease: "easeInOut",
                  times: [0, 0.5, 1]
                }}
                className="relative"
              >
                <div className="text-3xl filter drop-shadow-2xl">🚢</div>
                
                {/* Ship wake effect */}
                <motion.div
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 0.6, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-white/40 rounded-full"
                />
                
                {/* Cargo containers */}
                <motion.div
                  animate={{
                    y: [-3, 3, -3],
                    rotate: [0, 2, -2, 0]
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 text-sm"
                >
                  📦
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Enhanced Destination Markers */}
      {destinations.map((destination, index) => (
        <motion.div
          key={`${destination.name}-${destination.country}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: index * 0.1 + 2.5,
            type: "spring",
            stiffness: 150
          }}
          style={{
            position: 'absolute',
            left: `${destination.x}%`,
            top: `${destination.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          className="group cursor-pointer z-20"
          onMouseEnter={() => setHoveredDestination(destination)}
          onMouseLeave={() => setHoveredDestination(null)}
        >
          {/* Animated pulse rings */}
          <motion.div
            animate={{
              scale: [1, 3, 1],
              opacity: [0.9, 0, 0.9]
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeOut",
              delay: index * 0.3
            }}
            className="absolute inset-0 w-8 h-8 bg-cyan-400 rounded-full"
          />
          
          {/* Secondary pulse ring */}
          <motion.div
            animate={{
              scale: [1, 2, 1],
              opacity: [0.6, 0, 0.6]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeOut",
              delay: (index * 0.3) + 1
            }}
            className="absolute inset-0 w-6 h-6 bg-blue-300 rounded-full"
          />
          
          {/* Port activity indicator */}
          <motion.div
            animate={{
              scale: [1, 1.8, 1],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: (index * 0.5) + 2,
              ease: "easeInOut"
            }}
            className="absolute inset-0 w-10 h-10 bg-green-400/20 rounded-full"
          />
          
          {/* Main marker with glow */}
          <motion.div
            whileHover={{ scale: 1.6 }}
            animate={{
              boxShadow: [
                "0 0 15px rgba(59, 130, 246, 0.6)",
                "0 0 25px rgba(59, 130, 246, 0.8)",
                "0 0 15px rgba(59, 130, 246, 0.6)"
              ]
            }}
            transition={{
              boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="relative w-5 h-5 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full border-3 border-white shadow-2xl z-10 flex items-center justify-center group-hover:from-orange-400 group-hover:to-orange-600 transition-all duration-300"
          >
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-2 h-2 bg-white rounded-full opacity-95"
            />
          </motion.div>
          
          {/* Port crane activity */}
          <motion.div
            animate={{
              rotate: [0, 30, -30, 0],
              scale: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: (index * 0.4) + 1,
              ease: "easeInOut"
            }}
            className="absolute -top-6 -right-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            🏗️
          </motion.div>

          {/* Advanced Network Tooltip */}
          <AnimatePresence>
            {hoveredDestination?.name === destination.name && (
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.5, rotateX: -90 }}
                animate={{ opacity: 1, y: -20, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, y: 30, scale: 0.5, rotateX: -90 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 25,
                  opacity: { duration: 0.2 }
                }}
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 z-40"
              >
                <motion.div 
                  initial={{ backdropFilter: "blur(0px)" }}
                  animate={{ backdropFilter: "blur(20px)" }}
                  className="bg-gradient-to-br from-white/95 to-blue-50/95 border border-blue-200/50 shadow-2xl px-5 py-4 rounded-2xl min-w-[280px] backdrop-blur-xl"
                  style={{
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.2)"
                  }}
                >
                  {/* Header with advanced animations */}
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                    >
                      <span className="text-white text-sm">🌍</span>
                    </motion.div>
                    <div>
                      <div className="text-lg font-bold text-gray-800">{destination.name}</div>
                      <div className="text-sm text-gray-600">{destination.country} • {destination.region}</div>
                    </div>
                  </div>
                  
                  {/* Global Network Integration */}
                  {(() => {
                    const networkRegion = globalNetwork.regions.find(r => 
                      r.cities.includes(destination.name) || 
                      r.name === destination.country ||
                      (r.name === "Southeast Asia" && ["Malaysia", "Vietnam"].includes(destination.country)) ||
                      (r.name === "Europe" && ["Belgium", "Netherlands"].includes(destination.country))
                    );
                    
                    if (networkRegion) {
                      const colorClasses: Record<string, string> = {
                        blue: "from-blue-500 to-blue-600",
                        red: "from-red-500 to-red-600", 
                        green: "from-green-500 to-green-600",
                        purple: "from-purple-500 to-purple-600",
                        orange: "from-orange-500 to-orange-600",
                        teal: "from-teal-500 to-teal-600",
                        yellow: "from-yellow-500 to-yellow-600",
                        pink: "from-pink-500 to-pink-600"
                      };
                      
                      return (
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="mb-3"
                        >
                          <div className={`bg-gradient-to-r ${colorClasses[networkRegion.color]} text-white px-3 py-2 rounded-lg text-sm font-semibold`}>
                            <motion.div
                              animate={{ scale: [1, 1.05, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="flex items-center gap-2"
                            >
                              <span>🌐</span>
                              <span>{networkRegion.name} Network Hub</span>
                            </motion.div>
                          </div>
                          <div className="text-xs text-gray-600 mt-2">
                            Network Coverage: {networkRegion.cities.length} cities
                          </div>
                        </motion.div>
                      );
                    }
                    return null;
                  })()}
                  
                  {/* Products with advanced animations */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="border-t border-gray-200/50 pt-3"
                  >
                    <div className="text-sm text-gray-700 mb-2 font-semibold">Export Products:</div>
                    <div className="flex flex-wrap gap-2">
                      {destination.products.map((product, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            delay: 0.4 + (i * 0.1),
                            type: "spring",
                            stiffness: 500
                          }}
                          whileHover={{ 
                            scale: 1.1,
                            backgroundColor: "rgba(59, 130, 246, 0.1)"
                          }}
                          className="text-xs bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 px-3 py-1.5 rounded-full border border-blue-200/50 shadow-sm cursor-pointer"
                        >
                          {product}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                  
                  {/* Animated Arrow */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-full left-1/2 transform -translate-x-1/2"
                  >
                    <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white/95"></div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* Global Network Summary with Advanced Animations */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        transition={{ 
          duration: 1.2, 
          delay: 4,
          type: "spring",
          stiffness: 100
        }}
        className="absolute top-6 right-6 z-30"
      >
        <motion.div 
          whileHover={{ scale: 1.05, rotateY: 5 }}
          className="bg-gradient-to-br from-white/90 to-blue-50/90 backdrop-blur-xl rounded-2xl p-5 border border-blue-200/50 shadow-2xl min-w-[200px]"
          style={{
            boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.3)"
          }}
        >
          <motion.div
            animate={{ 
              background: [
                "linear-gradient(45deg, #3b82f6, #8b5cf6)",
                "linear-gradient(45deg, #8b5cf6, #06b6d4)", 
                "linear-gradient(45deg, #06b6d4, #3b82f6)"
              ]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="text-transparent bg-clip-text text-lg font-bold mb-4 flex items-center gap-3"
          >
            <motion.span
              animate={{ 
                rotate: 360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="text-2xl"
            >
              🌐
            </motion.span>
            Global Network
          </motion.div>
          
          {/* Network Stats with Staggered Animations */}
          <div className="space-y-3">
            {[
              { label: "Network Regions", value: globalNetwork.regions.length, color: "blue", icon: "🌍" },
              { label: "Total Cities", value: globalNetwork.regions.reduce((sum, r) => sum + r.cities.length, 0), color: "green", icon: "🏙️" },
              { label: "Active Routes", value: destinations.length, color: "purple", icon: "🚢" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 4.5 + (index * 0.2) }}
                whileHover={{ x: 5, scale: 1.02 }}
                className="flex items-center justify-between p-2 rounded-lg bg-white/50 hover:bg-white/70 transition-all duration-300"
              >
                <div className="flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                    className="text-sm"
                  >
                    {stat.icon}
                  </motion.span>
                  <span className="text-sm text-gray-700">{stat.label}:</span>
                </div>
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  className={`font-bold text-${stat.color}-600 text-sm`}
                >
                  {stat.value}
                </motion.span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}