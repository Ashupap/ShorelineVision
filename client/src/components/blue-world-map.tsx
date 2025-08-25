import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface Location {
  name: string;
  country: string;
  x: number;
  y: number;
  region: string;
  products: string[];
}

const locations: Location[] = [
  // USA
  { name: "Houston", country: "USA", x: 22, y: 45, region: "North America", products: ["Shrimp", "Fish"] },
  { name: "New York", country: "USA", x: 26, y: 38, region: "North America", products: ["Premium Seafood"] },
  { name: "New Jersey", country: "USA", x: 26, y: 39, region: "North America", products: ["Frozen Fish"] },
  { name: "LA", country: "USA", x: 15, y: 44, region: "North America", products: ["Crab", "Lobster"] },
  { name: "Miami", country: "USA", x: 24, y: 52, region: "North America", products: ["Tropical Fish"] },
  { name: "Chicago", country: "USA", x: 22, y: 40, region: "North America", products: ["Seafood Mix"] },
  { name: "Seattle", country: "USA", x: 17, y: 35, region: "North America", products: ["Salmon"] },
  
  // Canada
  { name: "Toronto", country: "Canada", x: 25, y: 32, region: "North America", products: ["Atlantic Fish"] },
  { name: "Vancouver", country: "Canada", x: 17, y: 30, region: "North America", products: ["Pacific Seafood"] },
  
  // Europe
  { name: "Antwerp", country: "Belgium", x: 50, y: 30, region: "Europe", products: ["European Mix"] },
  { name: "Amsterdam", country: "Netherlands", x: 50, y: 28, region: "Europe", products: ["Premium Selection"] },
  { name: "Rotterdam", country: "Netherlands", x: 50, y: 29, region: "Europe", products: ["Bulk Seafood"] },
  
  // Asia
  { name: "Tokyo", country: "Japan", x: 85, y: 42, region: "Asia", products: ["Sushi Grade"] },
  { name: "Osaka", country: "Japan", x: 84, y: 44, region: "Asia", products: ["Premium Fish"] },
  { name: "Zhanjiang", country: "China", x: 78, y: 48, region: "Asia", products: ["Bulk Export"] },
  { name: "Xiamen", country: "China", x: 80, y: 50, region: "Asia", products: ["Frozen Seafood"] },
  { name: "Port Penang", country: "Malaysia", x: 74, y: 58, region: "Asia", products: ["Tropical Catch"] },
  { name: "Catlai", country: "Vietnam", x: 76, y: 56, region: "Asia", products: ["River & Sea"] },
  
  // Middle East
  { name: "Sharjah", country: "UAE", x: 60, y: 52, region: "Middle East", products: ["Desert Port Mix"] },
  
  // Africa
  { name: "Port Louis", country: "Mauritius", x: 62, y: 72, region: "Africa", products: ["Island Seafood"] },
];

// India (origin point)
const indiaLocation = { x: 65, y: 55 };

// Ship types for different routes
const shipTypes = ["🚢", "🛳️", "⛴️", "🚤", "🛥️"];

// Generate shipping routes with different cargo ships
const generateShippingRoutes = () => {
  return locations.map((location, index) => ({
    id: `route-${index}`,
    destination: location,
    shipType: shipTypes[index % shipTypes.length],
    duration: 8 + Math.random() * 4, // 8-12 seconds
    delay: index * 0.8,
    active: true
  }));
};

export default function BlueWorldMap() {
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);
  const [activeShipping, setActiveShipping] = useState<string | null>(null);
  const [shippingRoutes] = useState(generateShippingRoutes());
  const [currentShips, setCurrentShips] = useState<{id: string, progress: number}[]>([]);

  useEffect(() => {
    // Initialize animated ships
    const ships = shippingRoutes.map(route => ({
      id: route.id,
      progress: 0
    }));
    setCurrentShips(ships);
  }, []);

  return (
    <div className="relative w-full min-h-[600px] bg-gradient-to-br from-slate-900 via-blue-900 to-black rounded-3xl overflow-hidden shadow-2xl">
      {/* Blue Glowing World Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
      >
        {/* World Map SVG with Blue Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 to-cyan-900/50">
          <svg viewBox="0 0 100 60" className="w-full h-full opacity-80">
            {/* Ocean/Water areas with glow */}
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <linearGradient id="continentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.8"/>
                <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#0891b2" stopOpacity="0.9"/>
              </linearGradient>
            </defs>
            
            {/* Simplified continent shapes with glow */}
            {/* North America */}
            <path d="M8 15 L25 12 L28 18 L35 20 L32 35 L25 40 L20 45 L15 42 L10 38 L8 25 Z" 
                  fill="url(#continentGradient)" filter="url(#glow)" stroke="#00f5ff" strokeWidth="0.2"/>
            
            {/* South America */}
            <path d="M20 45 L28 42 L32 48 L30 58 L25 60 L22 58 L18 52 Z" 
                  fill="url(#continentGradient)" filter="url(#glow)" stroke="#00f5ff" strokeWidth="0.2"/>
            
            {/* Europe */}
            <path d="M45 15 L55 12 L58 18 L56 25 L52 28 L48 25 L45 20 Z" 
                  fill="url(#continentGradient)" filter="url(#glow)" stroke="#00f5ff" strokeWidth="0.2"/>
            
            {/* Africa */}
            <path d="M48 28 L58 25 L62 35 L60 48 L56 55 L52 58 L48 52 L46 40 Z" 
                  fill="url(#continentGradient)" filter="url(#glow)" stroke="#00f5ff" strokeWidth="0.2"/>
            
            {/* Asia */}
            <path d="M58 12 L85 15 L88 25 L85 35 L80 40 L75 42 L70 38 L65 35 L62 28 L58 18 Z" 
                  fill="url(#continentGradient)" filter="url(#glow)" stroke="#00f5ff" strokeWidth="0.2"/>
            
            {/* Australia */}
            <path d="M75 50 L85 48 L88 52 L85 58 L78 60 L75 56 Z" 
                  fill="url(#continentGradient)" filter="url(#glow)" stroke="#00f5ff" strokeWidth="0.2"/>
          </svg>
        </div>

        {/* Animated Grid Overlay */}
        <motion.div className="absolute inset-0">
          <svg viewBox="0 0 100 60" className="w-full h-full opacity-20">
            {/* Vertical lines */}
            {[...Array(20)].map((_, i) => (
              <motion.line
                key={`v-${i}`}
                x1={i * 5}
                y1="0"
                x2={i * 5}
                y2="60"
                stroke="#00f5ff"
                strokeWidth="0.1"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
            {/* Horizontal lines */}
            {[...Array(12)].map((_, i) => (
              <motion.line
                key={`h-${i}`}
                x1="0"
                y1={i * 5}
                x2="100"
                y2={i * 5}
                stroke="#00f5ff"
                strokeWidth="0.1"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.1 + 2 }}
              />
            ))}
          </svg>
        </motion.div>
      </motion.div>

      {/* India Origin Point */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
        style={{
          position: 'absolute',
          left: `${indiaLocation.x}%`,
          top: `${indiaLocation.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
        className="z-20"
      >
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-full border-4 border-white shadow-2xl flex items-center justify-center relative"
        >
          <span className="text-white text-sm font-bold">🏭</span>
          {/* Origin glow */}
          <div className="absolute inset-0 bg-orange-500 rounded-full animate-ping opacity-30"></div>
        </motion.div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-orange-900/90 text-orange-100 px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap backdrop-blur-sm border border-orange-500/30">
          Alashore Marine - India
        </div>
      </motion.div>

      {/* Shipping Routes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 60">
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.8"/>
            <stop offset="50%" stopColor="#00f5ff" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.8"/>
          </linearGradient>
        </defs>
        
        {locations.map((location, index) => (
          <motion.path
            key={`route-${location.name}`}
            d={`M${indiaLocation.x} ${indiaLocation.y} Q${(indiaLocation.x + location.x) / 2} ${Math.min(indiaLocation.y, location.y) - 15} ${location.x} ${location.y}`}
            stroke="url(#routeGradient)"
            strokeWidth="0.3"
            fill="none"
            strokeDasharray="2,1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: 1, 
              opacity: 0.6,
              strokeDashoffset: [0, -4]
            }}
            transition={{ 
              pathLength: { duration: 2, delay: index * 0.1 + 2 },
              opacity: { duration: 1, delay: index * 0.1 + 2 },
              strokeDashoffset: { duration: 3, repeat: Infinity, ease: "linear" }
            }}
          />
        ))}
      </svg>

      {/* Enhanced Shipping Animation with Different Vessel Types */}
      <AnimatePresence>
        {shippingRoutes.map((route, index) => {
          const location = route.destination;
          const startX = indiaLocation.x;
          const startY = indiaLocation.y;
          const endX = location.x;
          const endY = location.y;
          
          // Calculate curved path points
          const controlX = (startX + endX) / 2 + (Math.random() - 0.5) * 20;
          const controlY = Math.min(startY, endY) - 10 - Math.random() * 10;
          
          return (
            <motion.div
              key={`ship-${route.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: route.delay }}
              className="pointer-events-none z-15 absolute"
            >
              {/* Cargo Ship Animation */}
              <motion.div
                initial={{
                  x: startX * 8,
                  y: startY * 8,
                  rotate: 0,
                  scale: 0.8
                }}
                animate={{
                  x: [startX * 8, controlX * 8, endX * 8],
                  y: [startY * 8, controlY * 8, endY * 8],
                  rotate: [0, 15, -10, 0],
                  scale: [0.8, 1.2, 0.9, 1]
                }}
                transition={{
                  duration: route.duration,
                  repeat: Infinity,
                  repeatDelay: 3 + Math.random() * 4,
                  ease: "easeInOut",
                  times: [0, 0.5, 1]
                }}
                className="text-2xl filter drop-shadow-xl relative"
              >
                {route.shipType}
                
                {/* Ship Wake Effect */}
                <motion.div
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 0.6, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                  className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-white/30 rounded-full"
                />
                
                {/* Cargo Indicator */}
                <motion.div
                  animate={{
                    y: [-2, 2, -2],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 text-xs"
                >
                  📦
                </motion.div>
              </motion.div>
              
              {/* Shipping Route Progress Line */}
              <motion.div
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: route.duration,
                  repeat: Infinity,
                  repeatDelay: 3 + Math.random() * 4,
                  ease: "easeInOut"
                }}
                className="absolute inset-0"
              >
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 480">
                  <motion.path
                    d={`M${startX * 8} ${startY * 8} Q${controlX * 8} ${controlY * 8} ${endX * 8} ${endY * 8}`}
                    stroke="rgba(34, 197, 94, 0.6)"
                    strokeWidth="2"
                    fill="none"
                    strokeDasharray="4,2"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.8 }}
                    transition={{
                      duration: route.duration,
                      repeat: Infinity,
                      repeatDelay: 3 + Math.random() * 4
                    }}
                  />
                </svg>
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Destination Markers */}
      {locations.map((location, index) => (
        <motion.div
          key={`${location.name}-${location.country}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.1 + 3,
            type: "spring",
            stiffness: 200
          }}
          style={{
            position: 'absolute',
            left: `${location.x}%`,
            top: `${location.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          className="group cursor-pointer z-20"
          onMouseEnter={() => setHoveredLocation(location)}
          onMouseLeave={() => setHoveredLocation(null)}
        >
          {/* Animated pulse rings */}
          <motion.div
            animate={{
              scale: [1, 3, 1],
              opacity: [0.8, 0, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut",
              delay: index * 0.2
            }}
            className="absolute inset-0 w-6 h-6 bg-cyan-400 rounded-full"
          />
          
          {/* Port Activity Indicator */}
          <motion.div
            animate={{
              scale: [1, 2, 1],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: (index * 0.8) + 2,
              ease: "easeInOut"
            }}
            className="absolute inset-0 w-8 h-8 bg-green-400/30 rounded-full"
          />
          
          {/* Main marker */}
          <motion.div
            whileHover={{ scale: 1.5 }}
            className="relative w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full border-2 border-white shadow-xl z-10 flex items-center justify-center group-hover:from-yellow-400 group-hover:to-orange-500 transition-colors duration-300"
          >
            <div className="w-2 h-2 bg-white rounded-full opacity-90"></div>
          </motion.div>
          
          {/* Port Crane Animation */}
          <motion.div
            animate={{
              rotate: [0, 45, -45, 0],
              scale: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              delay: (index * 0.5) + 1,
              ease: "easeInOut"
            }}
            className="absolute -top-6 -right-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            🏗️
          </motion.div>
          
          {/* Cargo Containers */}
          <motion.div
            animate={{
              y: [0, -3, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: (index * 0.3) + 0.5,
              ease: "easeInOut"
            }}
            className="absolute -bottom-4 -left-3 text-xs"
          >
            📦
          </motion.div>

          {/* Enhanced Tooltip with Shipping Info */}
          <AnimatePresence>
            {hoveredLocation?.name === location.name && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: -15, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 z-30"
              >
                <div className="bg-gradient-to-br from-slate-900 to-blue-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-cyan-400/50 backdrop-blur-sm min-w-[220px]">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="text-sm font-bold text-cyan-400">{location.name}</div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="text-xs"
                    >
                      🚢
                    </motion.div>
                  </div>
                  <div className="text-xs text-blue-200 mb-2">{location.country} • {location.region}</div>
                  
                  {/* Shipping Status */}
                  <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-2 mb-2">
                    <div className="flex items-center gap-2 text-xs text-green-400">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-2 h-2 bg-green-400 rounded-full"
                      />
                      <span>Active Shipping Route</span>
                    </div>
                    <div className="text-xs text-green-300 mt-1">
                      Transit Time: {8 + Math.floor(Math.random() * 4)} days
                    </div>
                  </div>
                  
                  <div className="border-t border-blue-700 pt-2">
                    <div className="text-xs text-blue-300 mb-1">Products:</div>
                    <div className="flex flex-wrap gap-1">
                      {location.products.map((product, i) => (
                        <span key={i} className="text-xs bg-cyan-900/50 text-cyan-200 px-2 py-1 rounded-full border border-cyan-600/30">
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      {/* Ocean waves effect */}
      <motion.div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-900/30 to-transparent">
        <motion.div
          animate={{
            x: [0, 100, 0],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-full h-full bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
        />
      </motion.div>

      {/* Shipping Traffic Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute top-4 left-4 z-30"
      >
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-3 border border-green-400/30">
          <div className="text-green-400 text-xs font-bold mb-2 flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              ⚓
            </motion.div>
            Live Shipping Traffic
          </div>
          <div className="space-y-1 text-xs text-green-200">
            {shippingRoutes.slice(0, 3).map((route, i) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 + 2.5 }}
                className="flex items-center gap-2"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  className="w-1.5 h-1.5 bg-green-400 rounded-full"
                />
                <span>{route.shipType} → {route.destination.name}</span>
              </motion.div>
            ))}
            <div className="text-xs text-gray-400 mt-2">
              +{shippingRoutes.length - 3} more routes
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats overlay */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 4 }}
        className="absolute top-4 right-4 z-30"
      >
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl p-4 border border-cyan-400/30">
          <div className="text-cyan-400 text-sm font-bold mb-3 flex items-center gap-2">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              🌊
            </motion.span>
            Global Network
          </div>
          <div className="space-y-2 text-xs text-blue-200">
            <div className="flex justify-between">
              <span>Countries:</span>
              <span className="text-cyan-400 font-bold">{Array.from(new Set(locations.map(l => l.country))).length}</span>
            </div>
            <div className="flex justify-between">
              <span>Destinations:</span>
              <span className="text-cyan-400 font-bold">{locations.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Active Ships:</span>
              <div className="flex items-center gap-1">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 bg-green-400 rounded-full"
                />
                <span className="text-green-400 font-bold">{shippingRoutes.length}</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <span className="text-green-400 font-bold">24/7 Active</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating particles for ocean effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              y: [0, -100],
              x: [0, Math.random() * 50 - 25]
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              delay: Math.random() * 8
            }}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '0%'
            }}
          />
        ))}
      </div>
    </div>
  );
}