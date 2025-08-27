import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { motion, AnimatePresence } from "framer-motion";
import { PerformanceImage } from "@/components/ui/performance-image";
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

export default function D3WorldMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredDestination, setHoveredDestination] = useState<Destination | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const svg = d3.select(svgRef.current);
    
    // Clear previous content
    svg.selectAll("*").remove();
    
    // Get container dimensions
    const containerRect = container.getBoundingClientRect();
    const width = containerRect.width;
    const height = 600;

    // Set SVG dimensions
    svg.attr("width", width).attr("height", height);

    // Create main group
    const g = svg.append("g");

    // Add shipping routes with D3 animations
    const routesGroup = g.append("g").attr("class", "routes");
    
    destinations.forEach((destination, index) => {
      const startX = (indiaLocation.x / 100) * width;
      const startY = (indiaLocation.y / 100) * height;
      const endX = (destination.x / 100) * width;
      const endY = (destination.y / 100) * height;
      
      // Create curved path
      const controlX = (startX + endX) / 2;
      const controlY = Math.min(startY, endY) - 50;
      
      const pathData = `M${startX},${startY} Q${controlX},${controlY} ${endX},${endY}`;
      
      const route = routesGroup
        .append("path")
        .attr("d", pathData)
        .attr("stroke", "url(#routeGradient)")
        .attr("stroke-width", 2)
        .attr("fill", "none")
        .attr("stroke-dasharray", "5,3")
        .attr("opacity", 0);

      // Animate route appearance with delay
      route
        .transition()
        .delay(2000 + index * 300)
        .duration(2000)
        .attr("opacity", 0.7)
        .attr("stroke-dashoffset", 0);

      // Add continuous dash animation
      route
        .transition()
        .delay(4000 + index * 300)
        .duration(3000)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", -20)
        .on("end", function repeat() {
          d3.select(this)
            .transition()
            .duration(3000)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", -40)
            .on("end", repeat);
        });
    });

    // Add gradient definitions
    const defs = svg.append("defs");
    
    const routeGradient = defs.append("linearGradient")
      .attr("id", "routeGradient")
      .attr("x1", "0%").attr("y1", "0%")
      .attr("x2", "100%").attr("y2", "0%");
    
    routeGradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#ff6b35")
      .attr("stop-opacity", 0.9);
    
    routeGradient.append("stop")
      .attr("offset", "50%")
      .attr("stop-color", "#00f5ff")
      .attr("stop-opacity", 0.7);
    
    routeGradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#0ea5e9")
      .attr("stop-opacity", 0.9);

    // Add India origin point
    const indiaGroup = g.append("g").attr("class", "india-origin");
    
    const indiaX = (indiaLocation.x / 100) * width;
    const indiaY = (indiaLocation.y / 100) * height;
    
    // Pulsing rings for India
    for (let i = 0; i < 3; i++) {
      indiaGroup
        .append("circle")
        .attr("cx", indiaX)
        .attr("cy", indiaY)
        .attr("r", 0)
        .attr("fill", "none")
        .attr("stroke", "#ff6b35")
        .attr("stroke-width", 2)
        .attr("opacity", 0.8)
        .transition()
        .delay(1000 + i * 800)
        .duration(2000)
        .ease(d3.easeLinear)
        .attr("r", 40)
        .attr("opacity", 0)
        .on("end", function() {
          d3.select(this).remove();
        });
    }
    
    // India main marker
    indiaGroup
      .append("circle")
      .attr("cx", indiaX)
      .attr("cy", indiaY)
      .attr("r", 0)
      .attr("fill", "#ff6b35")
      .attr("stroke", "white")
      .attr("stroke-width", 4)
      .style("cursor", "pointer")
      .transition()
      .delay(500)
      .duration(1000)
      .attr("r", 12)
      .on("end", function() {
        // Add continuous pulsing
        d3.select(this)
          .transition()
          .duration(2000)
          .ease(d3.easeSinInOut)
          .attr("r", 15)
          .transition()
          .duration(2000)
          .ease(d3.easeSinInOut)
          .attr("r", 12)
          .on("end", function repeat() {
            d3.select(this)
              .transition()
              .duration(2000)
              .ease(d3.easeSinInOut)
              .attr("r", 15)
              .transition()
              .duration(2000)
              .ease(d3.easeSinInOut)
              .attr("r", 12)
              .on("end", repeat);
          });
      });

    // Add destination markers
    const markersGroup = g.append("g").attr("class", "destination-markers");
    
    destinations.forEach((destination, index) => {
      const destX = (destination.x / 100) * width;
      const destY = (destination.y / 100) * height;
      
      const markerGroup = markersGroup.append("g");
      
      // Pulsing ring
      markerGroup
        .append("circle")
        .attr("cx", destX)
        .attr("cy", destY)
        .attr("r", 0)
        .attr("fill", "none")
        .attr("stroke", "#0ea5e9")
        .attr("stroke-width", 2)
        .attr("opacity", 0)
        .transition()
        .delay(3000 + index * 200)
        .duration(1000)
        .attr("r", 20)
        .attr("opacity", 0.6)
        .transition()
        .duration(1000)
        .attr("r", 0)
        .attr("opacity", 0)
        .on("end", function repeat() {
          d3.select(this)
            .transition()
            .delay(2000)
            .duration(1000)
            .attr("r", 20)
            .attr("opacity", 0.6)
            .transition()
            .duration(1000)
            .attr("r", 0)
            .attr("opacity", 0)
            .on("end", repeat);
        });
      
      // Main marker
      markerGroup
        .append("circle")
        .attr("cx", destX)
        .attr("cy", destY)
        .attr("r", 0)
        .attr("fill", "#0ea5e9")
        .attr("stroke", "white")
        .attr("stroke-width", 3)
        .style("cursor", "pointer")
        .transition()
        .delay(2500 + index * 200)
        .duration(800)
        .attr("r", 8)
        .on("end", function() {
          // Add hover effects
          d3.select(this)
            .on("mouseenter", function() {
              d3.select(this)
                .transition()
                .duration(200)
                .attr("r", 12)
                .attr("fill", "#f59e0b");
              setHoveredDestination(destination);
            })
            .on("mouseleave", function() {
              d3.select(this)
                .transition()
                .duration(200)
                .attr("r", 8)
                .attr("fill", "#0ea5e9");
              setHoveredDestination(null);
            })
            .on("click", function() {
              setSelectedDestination(destination);
            });
        });
    });

    // Cleanup function
    return () => {
      svg.selectAll("*").remove();
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl">
      {/* HD Network World Map Background */}
      <div className="absolute inset-0">
        <PerformanceImage
          src={mapImage}
          alt="Global Network Map"
          className="w-full h-full object-cover"
          priority={false}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* D3.js SVG Overlay */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full">
        <svg ref={svgRef} className="w-full h-full pointer-events-auto"></svg>
      </div>

      {/* Advanced Network Tooltip */}
      <AnimatePresence>
        {hoveredDestination && (
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
            className="absolute z-40 pointer-events-none"
            style={{
              left: `${hoveredDestination.x}%`,
              top: `${hoveredDestination.y - 25}%`,
              transform: 'translate(-50%, -100%)'
            }}
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
                  <div className="text-lg font-bold text-gray-800">{hoveredDestination.name}</div>
                  <div className="text-sm text-gray-600">{hoveredDestination.country} • {hoveredDestination.region}</div>
                </div>
              </div>
              
              {/* Global Network Integration */}
              {(() => {
                const networkRegion = globalNetwork.regions.find(r => 
                  r.cities.includes(hoveredDestination.name) || 
                  r.name === hoveredDestination.country ||
                  (r.name === "Southeast Asia" && ["Malaysia", "Vietnam"].includes(hoveredDestination.country)) ||
                  (r.name === "Europe" && ["Belgium", "Netherlands"].includes(hoveredDestination.country))
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
                  {hoveredDestination.products.map((product, i) => (
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

      {/* Global Network Summary */}
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
          
          {/* Network Stats */}
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