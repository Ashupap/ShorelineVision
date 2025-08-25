import { motion } from "framer-motion";
import { useState } from "react";

interface Location {
  name: string;
  country: string;
  x: number;
  y: number;
  region: string;
}

const locations: Location[] = [
  // USA
  { name: "Houston", country: "USA", x: 22, y: 45, region: "North America" },
  { name: "New York", country: "USA", x: 26, y: 38, region: "North America" },
  { name: "New Jersey", country: "USA", x: 26, y: 39, region: "North America" },
  { name: "LA", country: "USA", x: 15, y: 44, region: "North America" },
  { name: "Miami", country: "USA", x: 24, y: 52, region: "North America" },
  { name: "Chicago", country: "USA", x: 22, y: 40, region: "North America" },
  { name: "Seattle", country: "USA", x: 17, y: 35, region: "North America" },
  
  // Canada
  { name: "Toronto", country: "Canada", x: 25, y: 32, region: "North America" },
  { name: "Vancouver", country: "Canada", x: 17, y: 30, region: "North America" },
  
  // Europe
  { name: "Antwerp", country: "Belgium", x: 50, y: 30, region: "Europe" },
  { name: "Amsterdam", country: "Netherlands", x: 50, y: 28, region: "Europe" },
  { name: "Rotterdam", country: "Netherlands", x: 50, y: 29, region: "Europe" },
  
  // Asia
  { name: "Tokyo", country: "Japan", x: 85, y: 42, region: "Asia" },
  { name: "Osaka", country: "Japan", x: 84, y: 44, region: "Asia" },
  { name: "Zhanjiang", country: "China", x: 78, y: 48, region: "Asia" },
  { name: "Xiamen", country: "China", x: 80, y: 50, region: "Asia" },
  { name: "Port Penang", country: "Malaysia", x: 74, y: 58, region: "Asia" },
  
  // Middle East
  { name: "Sharjah", country: "UAE", x: 60, y: 52, region: "Middle East" },
  
  // Africa
  { name: "Port Louis", country: "Mauritius", x: 62, y: 72, region: "Africa" },
  
  // Vietnam
  { name: "Catlai", country: "Vietnam", x: 76, y: 56, region: "Asia" },
];

export default function AnimatedWorldMap() {
  const [hoveredLocation, setHoveredLocation] = useState<Location | null>(null);

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-ocean-blue/10 to-marine-teal/10 rounded-3xl overflow-hidden">
      {/* World Map SVG Background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <svg 
          viewBox="0 0 100 80" 
          className="w-full h-full"
          style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}
        >
          {/* Simplified world map paths */}
          <g fill="#E5F3FF" stroke="#3B82F6" strokeWidth="0.2">
            {/* North America */}
            <path d="M5 25 L25 20 L30 35 L25 50 L15 55 L10 50 L5 45 Z" />
            {/* South America */}
            <path d="M20 55 L30 50 L35 65 L25 75 L20 70 Z" />
            {/* Europe */}
            <path d="M45 20 L55 18 L58 30 L50 35 L45 30 Z" />
            {/* Africa */}
            <path d="M45 35 L60 30 L65 50 L60 70 L50 75 L45 60 Z" />
            {/* Asia */}
            <path d="M55 15 L90 10 L95 25 L90 45 L85 50 L75 55 L70 45 L65 35 L60 25 L55 20 Z" />
            {/* Australia */}
            <path d="M75 60 L90 58 L95 65 L85 70 L75 68 Z" />
          </g>
        </svg>
      </motion.div>

      {/* Location Markers */}
      {locations.map((location, index) => (
        <motion.div
          key={`${location.name}-${location.country}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1 + 1,
            type: "spring",
            stiffness: 200
          }}
          style={{
            position: 'absolute',
            left: `${location.x}%`,
            top: `${location.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          className="group cursor-pointer"
          onMouseEnter={() => setHoveredLocation(location)}
          onMouseLeave={() => setHoveredLocation(null)}
        >
          {/* Ripple Effect */}
          <motion.div
            animate={{
              scale: [1, 2, 1],
              opacity: [0.3, 0, 0.3]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 w-6 h-6 bg-ocean-blue rounded-full"
          />
          
          {/* Main Marker */}
          <motion.div
            whileHover={{ scale: 1.5 }}
            className="relative w-4 h-4 bg-gradient-to-br from-coral-accent to-ocean-blue rounded-full border-2 border-white shadow-lg z-10"
          >
            {/* Pulse animation */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.5, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-coral-accent rounded-full"
            />
          </motion.div>

          {/* Tooltip */}
          {hoveredLocation?.name === location.name && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: -10, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-white rounded-lg shadow-xl border z-20 whitespace-nowrap"
            >
              <div className="text-sm font-semibold text-gray-900">{location.name}</div>
              <div className="text-xs text-ocean-blue">{location.country}</div>
              {/* Arrow */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
            </motion.div>
          )}
        </motion.div>
      ))}

      {/* Animated Connection Lines */}
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2, delay: 2 }}
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 80"
      >
        {/* Sample connection lines */}
        <motion.path
          d="M25 35 Q50 20 75 45"
          stroke="url(#gradient1)"
          strokeWidth="0.5"
          fill="none"
          strokeDasharray="2,2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 2.5 }}
        />
        <motion.path
          d="M25 35 Q40 50 60 50"
          stroke="url(#gradient2)"
          strokeWidth="0.5"
          fill="none"
          strokeDasharray="2,2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, delay: 3 }}
        />
        
        {/* Gradients for lines */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.8"/>
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.8"/>
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Region Legend */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 3 }}
        className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg"
      >
        <div className="text-sm font-semibold text-gray-900 mb-2">Our Global Reach</div>
        <div className="space-y-1 text-xs">
          {['North America', 'Europe', 'Asia', 'Middle East', 'Africa'].map((region, index) => (
            <div key={region} className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-ocean-blue to-marine-teal"></div>
              <span className="text-gray-600">{region}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}