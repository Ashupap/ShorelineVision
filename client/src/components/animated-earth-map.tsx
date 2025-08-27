import { motion } from "framer-motion";
import { useState } from "react";

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
  
  // Middle East
  { name: "Sharjah", country: "UAE", x: 60, y: 52, region: "Middle East", products: ["Desert Port Mix"] },
  
  // Africa
  { name: "Port Louis", country: "Mauritius", x: 62, y: 72, region: "Africa", products: ["Island Seafood"] },
  
  // Vietnam
  { name: "Catlai", country: "Vietnam", x: 76, y: 56, region: "Asia", products: ["River & Sea"] },
];

export default function AnimatedEarthMap() {
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const regions = Array.from(new Set(locations.map(loc => loc.region)));

  return (
    <div className="relative w-full min-h-[600px] bg-black rounded-3xl overflow-hidden shadow-2xl">
      {/* Earth Background with Animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
      >
        {/* Earth Image */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-cover bg-center rounded-3xl"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1614728894747-a83421bba4b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=85')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-black/40 to-blue-900/60"></div>
        </motion.div>

        {/* Space Stars Effect */}
        <motion.div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Location Markers */}
      {locations.map((location, index) => (
        <motion.div
          key={`${location.name}-${location.country}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: index * 0.1 + 2,
            type: "spring",
            stiffness: 200
          }}
          style={{
            position: 'absolute',
            left: `${location.x}%`,
            top: `${location.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          className="group cursor-pointer z-10"
          onMouseEnter={() => setHoveredLocation(location)}
          onMouseLeave={() => setHoveredLocation(null)}
        >
          {/* Pulsing Ripple Effect */}
          <motion.div
            animate={{
              scale: [1, 2.5, 1],
              opacity: [0.7, 0, 0.7]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 w-8 h-8 bg-cyan-400 rounded-full"
          />
          
          {/* Main Marker */}
          <motion.div
            whileHover={{ scale: 1.8 }}
            className="relative w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full border-2 border-white shadow-lg z-10 flex items-center justify-center"
          >
            {/* Inner glow */}
            <div className="w-3 h-3 bg-white rounded-full opacity-80"></div>
            
            {/* Continuous pulse */}
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.3, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-cyan-400 rounded-full"
            />
          </motion.div>

          {/* Advanced Tooltip */}
          {hoveredLocation?.name === location.name && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: -15, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 z-20"
            >
              <div className="bg-gradient-to-br from-gray-900 to-black text-white px-4 py-3 rounded-xl shadow-2xl border border-cyan-400/30 backdrop-blur-sm min-w-[200px]">
                <div className="text-sm font-bold text-cyan-400 mb-1">{location.name}</div>
                <div className="text-xs text-gray-300 mb-2">{location.country} • {location.region}</div>
                <div className="border-t border-gray-700 pt-2">
                  <div className="text-xs text-gray-400 mb-1">Products:</div>
                  <div className="flex flex-wrap gap-1">
                    {location.products.map((product, i) => (
                      <span key={i} className="text-xs bg-cyan-900/50 text-cyan-200 px-2 py-1 rounded-full">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Arrow */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}

      {/* Floating Connection Lines */}
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 3, delay: 3 }}
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 80"
      >
        {/* Dynamic connection lines with animation */}
        <motion.path
          d="M25 35 Q50 20 75 45"
          stroke="url(#connectionGradient1)"
          strokeWidth="0.5"
          fill="none"
          strokeDasharray="2,3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, delay: 3.5 }}
        />
        <motion.path
          d="M25 35 Q40 60 60 50"
          stroke="url(#connectionGradient2)"
          strokeWidth="0.5"
          fill="none"
          strokeDasharray="2,3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, delay: 4 }}
        />
        <motion.path
          d="M50 30 Q70 40 85 45"
          stroke="url(#connectionGradient3)"
          strokeWidth="0.5"
          fill="none"
          strokeDasharray="2,3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, delay: 4.5 }}
        />
        
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="connectionGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#0099cc" stopOpacity="0.3"/>
          </linearGradient>
          <linearGradient id="connectionGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00cc99" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#0066ff" stopOpacity="0.3"/>
          </linearGradient>
          <linearGradient id="connectionGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0066ff" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#9900cc" stopOpacity="0.3"/>
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Regional Filter */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 4 }}
        className="absolute top-6 left-6 z-30"
      >
        <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-cyan-400/30">
          <div className="text-cyan-400 text-sm font-bold mb-3">Filter by Region</div>
          <div className="space-y-2">
            <button
              onClick={() => setSelectedRegion(null)}
              className={`block w-full text-left px-3 py-1 rounded-lg text-xs transition-colors ${
                selectedRegion === null ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              All Regions
            </button>
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`block w-full text-left px-3 py-1 rounded-lg text-xs transition-colors ${
                  selectedRegion === region ? 'bg-cyan-600 text-white' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stats Panel */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 4.5 }}
        className="absolute top-6 right-6 z-30"
      >
        <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-cyan-400/30">
          <div className="text-cyan-400 text-sm font-bold mb-3">Global Reach</div>
          <div className="space-y-2 text-xs text-gray-300">
            <div className="flex justify-between">
              <span>Countries:</span>
              <span className="text-cyan-400 font-bold">{Array.from(new Set(locations.map(l => l.country))).length}</span>
            </div>
            <div className="flex justify-between">
              <span>Cities:</span>
              <span className="text-cyan-400 font-bold">{locations.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Regions:</span>
              <span className="text-cyan-400 font-bold">{regions.length}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              y: [-20, -100],
              x: [0, Math.random() * 40 - 20]
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 5
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