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

          {/* Enhanced Tooltip */}
          <AnimatePresence>
            {hoveredDestination?.name === destination.name && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: -15, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 z-40"
              >
                <div className="bg-white border border-gray-200 shadow-2xl px-4 py-3 rounded-xl min-w-[220px] backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-sm font-bold text-gray-800">{destination.name}</div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="text-xs"
                    >
                      🚢
                    </motion.div>
                  </div>
                  <div className="text-xs text-gray-600 mb-2">{destination.country} • {destination.region}</div>
                  
                  {/* Shipping Status */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-2 mb-2">
                    <div className="flex items-center gap-2 text-xs text-green-700">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-2 h-2 bg-green-500 rounded-full"
                      />
                      <span>Active Shipping Route</span>
                    </div>
                    <div className="text-xs text-green-600 mt-1">
                      Transit Time: {8 + Math.floor(Math.random() * 4)} days
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-2">
                    <div className="text-xs text-gray-600 mb-1">Products:</div>
                    <div className="flex flex-wrap gap-1">
                      {destination.products.map((product, i) => (
                        <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full border border-blue-200">
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* Stats overlay */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 4 }}
        className="absolute top-4 right-4 z-30"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-lg">
          <div className="text-gray-800 text-sm font-bold mb-3 flex items-center gap-2">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              🌍
            </motion.span>
            Global Network
          </div>
          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex items-center justify-between">
              <span>Destinations:</span>
              <span className="font-semibold text-blue-600">{destinations.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Active Routes:</span>
              <span className="font-semibold text-green-600">{activeShipping.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Countries:</span>
              <span className="font-semibold text-purple-600">
                {new Set(destinations.map(d => d.country)).size}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Live shipping indicator */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 4.5 }}
        className="absolute top-4 left-4 z-30"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-gray-200 shadow-lg">
          <div className="text-gray-800 text-xs font-bold mb-2 flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 bg-green-500 rounded-full"
            />
            Live Shipping
          </div>
          <div className="text-xs text-gray-600">
            {activeShipping.length} vessels in transit
          </div>
        </div>
      </motion.div>
    </div>
  );
}