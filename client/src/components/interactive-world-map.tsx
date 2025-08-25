import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface Destination {
  name: string;
  country: string;
  x: number;
  y: number;
  region: string;
  products: string[];
}

const destinations: Destination[] = [
  // North America
  { name: "Houston", country: "USA", x: 292, y: 185, region: "North America", products: ["Shrimp", "Fish"] },
  { name: "New York", country: "USA", x: 315, y: 165, region: "North America", products: ["Premium Seafood"] },
  { name: "New Jersey", country: "USA", x: 318, y: 167, region: "North America", products: ["Frozen Fish"] },
  { name: "Los Angeles", country: "USA", x: 245, y: 180, region: "North America", products: ["Crab", "Lobster"] },
  { name: "Miami", country: "USA", x: 305, y: 205, region: "North America", products: ["Tropical Fish"] },
  { name: "Chicago", country: "USA", x: 295, y: 160, region: "North America", products: ["Seafood Mix"] },
  { name: "Seattle", country: "USA", x: 260, y: 145, region: "North America", products: ["Salmon"] },
  { name: "Toronto", country: "Canada", x: 310, y: 150, region: "North America", products: ["Atlantic Fish"] },
  { name: "Vancouver", country: "Canada", x: 260, y: 135, region: "North America", products: ["Pacific Seafood"] },
  
  // Europe
  { name: "Antwerp", country: "Belgium", x: 484, y: 125, region: "Europe", products: ["European Mix"] },
  { name: "Amsterdam", country: "Netherlands", x: 485, y: 120, region: "Europe", products: ["Premium Selection"] },
  { name: "Rotterdam", country: "Netherlands", x: 482, y: 122, region: "Europe", products: ["Bulk Seafood"] },
  
  // Asia
  { name: "Tokyo", country: "Japan", x: 735, y: 170, region: "Asia", products: ["Sushi Grade"] },
  { name: "Osaka", country: "Japan", x: 732, y: 175, region: "Asia", products: ["Premium Fish"] },
  { name: "Zhanjiang", country: "China", x: 680, y: 190, region: "Asia", products: ["Bulk Export"] },
  { name: "Xiamen", country: "China", x: 690, y: 200, region: "Asia", products: ["Frozen Seafood"] },
  { name: "Port Penang", country: "Malaysia", x: 640, y: 240, region: "Asia", products: ["Tropical Catch"] },
  { name: "Catlai", country: "Vietnam", x: 665, y: 235, region: "Asia", products: ["River & Sea"] },
  
  // Middle East & Others
  { name: "Sharjah", country: "UAE", x: 570, y: 205, region: "Middle East", products: ["Desert Port Mix"] },
  { name: "Port Louis", country: "Mauritius", x: 580, y: 285, region: "Africa", products: ["Island Seafood"] },
];

// India (origin point) - Odisha location
const indiaLocation = { x: 605, y: 215, name: "Alashore Marine - Odisha, India" };

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
    <div className="relative w-full h-[600px] bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
      {/* World Map SVG */}
      <div className="absolute inset-0">
        <svg 
          viewBox="0 0 900 450" 
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
        >
          <defs>
            <linearGradient id="landGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8"/>
              <stop offset="50%" stopColor="#16a34a" stopOpacity="0.9"/>
              <stop offset="100%" stopColor="#15803d" stopOpacity="0.8"/>
            </linearGradient>
            <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3"/>
              <stop offset="50%" stopColor="#0284c7" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#0369a1" stopOpacity="0.3"/>
            </linearGradient>
            <filter id="landShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="1" dy="1" stdDeviation="2" floodColor="#000000" floodOpacity="0.2"/>
            </filter>
          </defs>

          {/* Ocean Background */}
          <rect width="900" height="450" fill="url(#oceanGradient)" />

          {/* Continents - Detailed outlines */}
          
          {/* North America */}
          <path 
            d="M150 80 L180 75 L220 85 L250 90 L280 95 L320 100 L350 110 L360 130 L355 150 L340 170 L320 185 L300 200 L280 210 L260 215 L240 210 L220 200 L200 185 L180 170 L160 150 L150 130 L145 110 Z" 
            fill="url(#landGradient)" 
            filter="url(#landShadow)"
            stroke="#16a34a" 
            strokeWidth="1"
            className="hover:fill-green-500 transition-colors duration-300"
          />
          
          {/* South America */}
          <path 
            d="M280 220 L320 210 L340 220 L350 240 L355 270 L350 300 L340 330 L320 350 L300 360 L280 355 L260 340 L250 320 L245 300 L250 280 L260 260 L270 240 Z" 
            fill="url(#landGradient)" 
            filter="url(#landShadow)"
            stroke="#16a34a" 
            strokeWidth="1"
            className="hover:fill-green-500 transition-colors duration-300"
          />
          
          {/* Europe */}
          <path 
            d="M450 90 L490 85 L520 90 L540 100 L550 115 L545 130 L530 140 L510 145 L490 140 L470 135 L455 125 L450 110 Z" 
            fill="url(#landGradient)" 
            filter="url(#landShadow)"
            stroke="#16a34a" 
            strokeWidth="1"
            className="hover:fill-green-500 transition-colors duration-300"
          />
          
          {/* Africa */}
          <path 
            d="M460 150 L500 145 L530 150 L550 160 L565 180 L570 210 L575 240 L570 270 L560 295 L545 315 L525 330 L500 335 L475 330 L455 315 L445 295 L450 270 L455 240 L460 210 L465 180 Z" 
            fill="url(#landGradient)" 
            filter="url(#landShadow)"
            stroke="#16a34a" 
            strokeWidth="1"
            className="hover:fill-green-500 transition-colors duration-300"
          />
          
          {/* Asia */}
          <path 
            d="M540 80 L620 75 L680 80 L720 85 L750 90 L780 100 L800 115 L810 135 L805 155 L790 175 L770 190 L740 200 L710 205 L680 200 L650 195 L620 185 L590 170 L570 150 L560 130 L550 110 L545 95 Z" 
            fill="url(#landGradient)" 
            filter="url(#landShadow)"
            stroke="#16a34a" 
            strokeWidth="1"
            className="hover:fill-green-500 transition-colors duration-300"
          />
          
          {/* Australia */}
          <path 
            d="M720 280 L780 275 L820 280 L840 290 L845 305 L840 320 L820 330 L780 335 L740 330 L720 320 L715 305 L720 290 Z" 
            fill="url(#landGradient)" 
            filter="url(#landShadow)"
            stroke="#16a34a" 
            strokeWidth="1"
            className="hover:fill-green-500 transition-colors duration-300"
          />

          {/* Antarctica */}
          <path 
            d="M200 380 L700 380 L750 390 L800 400 L850 410 L850 450 L50 450 L50 410 L100 400 L150 390 Z" 
            fill="url(#landGradient)" 
            filter="url(#landShadow)"
            stroke="#16a34a" 
            strokeWidth="1"
            className="hover:fill-green-500 transition-colors duration-300"
          />

          {/* Shipping Routes */}
          {destinations.map((destination, index) => (
            <motion.path
              key={`route-${destination.name}`}
              d={`M${indiaLocation.x} ${indiaLocation.y} Q${(indiaLocation.x + destination.x) / 2} ${Math.min(indiaLocation.y, destination.y) - 50} ${destination.x} ${destination.y}`}
              stroke="#f59e0b"
              strokeWidth="2"
              fill="none"
              strokeDasharray="5,3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: activeShipping.includes(destination.name) ? 1 : 0, 
                opacity: activeShipping.includes(destination.name) ? 0.7 : 0,
                strokeDashoffset: [0, -8]
              }}
              transition={{ 
                pathLength: { duration: 2, ease: "easeInOut" },
                opacity: { duration: 1 },
                strokeDashoffset: { duration: 2, repeat: Infinity, ease: "linear" }
              }}
            />
          ))}
        </svg>
      </div>

      {/* Origin Point - India */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        style={{
          position: 'absolute',
          left: `${(indiaLocation.x / 900) * 100}%`,
          top: `${(indiaLocation.y / 450) * 100}%`,
          transform: 'translate(-50%, -50%)'
        }}
        className="z-30"
      >
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            boxShadow: [
              "0 0 20px rgba(239, 68, 68, 0.5)",
              "0 0 40px rgba(239, 68, 68, 0.8)",
              "0 0 20px rgba(239, 68, 68, 0.5)"
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-full border-4 border-white shadow-2xl flex items-center justify-center relative cursor-pointer"
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
          <span className="text-white text-lg font-bold">🏭</span>
          <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-40"></div>
        </motion.div>
      </motion.div>

      {/* Shipping Animations */}
      <AnimatePresence>
        {destinations.map((destination, index) => {
          if (!activeShipping.includes(destination.name)) return null;
          
          const startX = (indiaLocation.x / 900) * 100;
          const startY = (indiaLocation.y / 450) * 100;
          const endX = (destination.x / 900) * 100;
          const endY = (destination.y / 450) * 100;
          
          return (
            <motion.div
              key={`ship-${destination.name}`}
              initial={{ 
                left: `${startX}%`, 
                top: `${startY}%`,
                opacity: 0,
                scale: 0.5
              }}
              animate={{ 
                left: `${endX}%`, 
                top: `${endY}%`,
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1, 1, 0.8]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                repeatDelay: 3 + Math.random() * 4,
                ease: "easeInOut",
                delay: index * 0.3
              }}
              className="absolute z-20 pointer-events-none"
              style={{ transform: 'translate(-50%, -50%)' }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="text-2xl filter drop-shadow-lg"
              >
                🚢
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Destination Markers */}
      {destinations.map((destination, index) => (
        <motion.div
          key={`${destination.name}-${destination.country}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.1 + 2,
            type: "spring",
            stiffness: 200
          }}
          style={{
            position: 'absolute',
            left: `${(destination.x / 900) * 100}%`,
            top: `${(destination.y / 450) * 100}%`,
            transform: 'translate(-50%, -50%)'
          }}
          className="group cursor-pointer z-20"
          onMouseEnter={() => setHoveredDestination(destination)}
          onMouseLeave={() => setHoveredDestination(null)}
        >
          {/* Pulse rings */}
          <motion.div
            animate={{
              scale: [1, 2.5, 1],
              opacity: [0.8, 0, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut",
              delay: index * 0.2
            }}
            className="absolute inset-0 w-6 h-6 bg-blue-400 rounded-full"
          />
          
          {/* Main marker */}
          <motion.div
            whileHover={{ scale: 1.5 }}
            className="relative w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full border-2 border-white shadow-xl z-10 flex items-center justify-center group-hover:from-orange-400 group-hover:to-orange-600 transition-colors duration-300"
          >
            <div className="w-2 h-2 bg-white rounded-full opacity-90"></div>
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