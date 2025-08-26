import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";

// Fix for default markers in Leaflet with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface Location {
  name: string;
  country: string;
  region: string;
  products: string[];
  lat: number;
  lng: number;
  flag?: string;
}

const shippingDestinations: Location[] = [
  // North America - USA
  { name: "Houston", country: "USA", region: "North America", products: ["Shrimp", "Fish"], lat: 29.7604, lng: -95.3698, flag: "🇺🇸" },
  { name: "New York", country: "USA", region: "North America", products: ["Premium Seafood"], lat: 40.7128, lng: -74.0060, flag: "🇺🇸" },
  { name: "New Jersey", country: "USA", region: "North America", products: ["Frozen Fish"], lat: 40.0583, lng: -74.4057, flag: "🇺🇸" },
  { name: "Los Angeles", country: "USA", region: "North America", products: ["Crab", "Lobster"], lat: 34.0522, lng: -118.2437, flag: "🇺🇸" },
  { name: "Miami", country: "USA", region: "North America", products: ["Tropical Fish"], lat: 25.7617, lng: -80.1918, flag: "🇺🇸" },
  { name: "Chicago", country: "USA", region: "North America", products: ["Seafood Mix"], lat: 41.8781, lng: -87.6298, flag: "🇺🇸" },
  { name: "Seattle", country: "USA", region: "North America", products: ["Salmon"], lat: 47.6062, lng: -122.3321, flag: "🇺🇸" },

  // Canada
  { name: "Toronto", country: "Canada", region: "North America", products: ["Atlantic Fish"], lat: 43.6532, lng: -79.3832, flag: "🇨🇦" },
  { name: "Vancouver", country: "Canada", region: "North America", products: ["Pacific Seafood"], lat: 49.2827, lng: -123.1207, flag: "🇨🇦" },

  // Europe
  { name: "Antwerp", country: "Belgium", region: "Europe", products: ["European Mix"], lat: 51.2194, lng: 4.4025, flag: "🇧🇪" },
  { name: "Amsterdam", country: "Netherlands", region: "Europe", products: ["Premium Selection"], lat: 52.3676, lng: 4.9041, flag: "🇳🇱" },
  { name: "Rotterdam", country: "Netherlands", region: "Europe", products: ["Bulk Seafood"], lat: 51.9244, lng: 4.4777, flag: "🇳🇱" },

  // Asia
  { name: "Tokyo", country: "Japan", region: "Asia", products: ["Sushi Grade"], lat: 35.6762, lng: 139.6503, flag: "🇯🇵" },
  { name: "Osaka", country: "Japan", region: "Asia", products: ["Premium Fish"], lat: 34.6937, lng: 135.5023, flag: "🇯🇵" },
  { name: "Zhanjiang", country: "China", region: "Asia", products: ["Bulk Export"], lat: 21.2707, lng: 110.3594, flag: "🇨🇳" },
  { name: "Xiamen", country: "China", region: "Asia", products: ["Frozen Seafood"], lat: 24.4798, lng: 118.0819, flag: "🇨🇳" },
  { name: "Port Penang", country: "Malaysia", region: "Asia", products: ["Tropical Catch"], lat: 5.4164, lng: 100.3327, flag: "🇲🇾" },
  { name: "Catlai", country: "Vietnam", region: "Asia", products: ["River & Sea"], lat: 10.3833, lng: 107.2167, flag: "🇻🇳" },

  // Middle East
  { name: "Sharjah", country: "UAE", region: "Middle East", products: ["Desert Port Mix"], lat: 25.3463, lng: 55.4209, flag: "🇦🇪" },

  // Africa
  { name: "Port Louis", country: "Mauritius", region: "Africa", products: ["Island Seafood"], lat: -20.1609, lng: 57.5012, flag: "🇲🇺" },
];

// India (origin point)
const originPoint = { name: "Balashore", country: "Odisha, India", lat: 21.4934, lng: 87.0264, flag: "🇮🇳" };

// Regional color scheme
const regionColors: { [key: string]: string } = {
  "North America": "#3B82F6", // Blue
  "Europe": "#10B981", // Green
  "Asia": "#F59E0B", // Orange
  "Middle East": "#8B5CF6", // Purple
  "Africa": "#EF4444", // Red
};

export default function InteractiveGlobalMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<L.Map | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    if (!mapRef.current || map) return;

    // Delay initialization to ensure DOM is ready
    const timer = setTimeout(() => {
      if (!mapRef.current) return;

      try {
        // Initialize map
        const newMap = L.map(mapRef.current, {
          center: [20, 60],
          zoom: 1.5,
          zoomControl: false,
          scrollWheelZoom: false,
          doubleClickZoom: false,
          dragging: true,
          attributionControl: false,
          maxZoom: 10,
          minZoom: 1.5,
        });

    // Add custom tile layer with ocean theme
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
      attribution: '',
      subdomains: 'abcd',
      maxZoom: 10,
      minZoom: 2,
    }).addTo(newMap);

    // Custom zoom controls
    L.control.zoom({
      position: 'topright'
    }).addTo(newMap);

        setMap(newMap);
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!map) return;

    // Create origin marker
    const originIcon = L.divIcon({
      className: 'origin-marker',
      html: `
        <div class="relative flex items-center justify-center">
          <div class="absolute w-12 h-12 bg-red-500 rounded-full animate-pulse opacity-30"></div>
          <div class="absolute w-8 h-8 bg-red-500 rounded-full animate-ping opacity-50"></div>
          <div class="relative w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-xs">
            ${originPoint.flag}
          </div>
        </div>
      `,
      iconSize: [48, 48],
      iconAnchor: [24, 24],
    });

    const originMarker = L.marker([originPoint.lat, originPoint.lng], { icon: originIcon })
      .addTo(map)
      .bindPopup(`
        <div class="p-2 min-w-48">
          <div class="flex items-center mb-2">
            <span class="text-lg mr-2">${originPoint.flag}</span>
            <div>
              <h3 class="font-bold text-gray-900">${originPoint.name}</h3>
              <p class="text-sm text-gray-600">${originPoint.country}</p>
            </div>
          </div>
          <div class="border-t pt-2">
            <p class="text-sm font-semibold text-blue-600">🏭 Processing Plant</p>
            <p class="text-xs text-gray-500">Alashore Marine Exports Facility</p>
          </div>
        </div>
      `);

    // Create destination markers with animation
    const markers: L.Marker[] = [];
    const animationDelay = 200;

    shippingDestinations.forEach((location, index) => {
      setTimeout(() => {
        const regionColor = regionColors[location.region] || "#6B7280";
        
        const markerIcon = L.divIcon({
          className: 'destination-marker',
          html: `
            <div class="relative flex items-center justify-center">
              <div class="absolute w-8 h-8 rounded-full opacity-20 animate-pulse" style="background-color: ${regionColor}"></div>
              <div class="relative w-5 h-5 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-xs font-bold text-white" 
                   style="background-color: ${regionColor}">
                ${location.flag}
              </div>
            </div>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 16],
        });

        const marker = L.marker([location.lat, location.lng], { icon: markerIcon })
          .addTo(map)
          .bindPopup(`
            <div class="p-3 min-w-64">
              <div class="flex items-center mb-3">
                <span class="text-lg mr-2">${location.flag}</span>
                <div>
                  <h3 class="font-bold text-gray-900">${location.name}</h3>
                  <p class="text-sm text-gray-600">${location.country}</p>
                  <span class="inline-block px-2 py-1 text-xs font-semibold rounded-full" 
                        style="background-color: ${regionColor}20; color: ${regionColor}">
                    ${location.region}
                  </span>
                </div>
              </div>
              <div class="border-t pt-2">
                <h4 class="text-sm font-semibold text-gray-700 mb-2">🐟 Products Shipped:</h4>
                <div class="flex flex-wrap gap-1">
                  ${location.products.map(product => 
                    `<span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">${product}</span>`
                  ).join('')}
                </div>
              </div>
            </div>
          `);

        // Add shipping route line from origin to destination
        const routeLine = L.polyline([
          [originPoint.lat, originPoint.lng],
          [location.lat, location.lng]
        ], {
          color: regionColor,
          weight: 2,
          opacity: 0.6,
          dashArray: '5, 10',
        }).addTo(map);

        // Animate the route line
        const animateRoute = () => {
          let dashOffset = 0;
          const animate = () => {
            dashOffset += 5;
            routeLine.setStyle({ dashOffset: dashOffset.toString() });
            if (dashOffset < 100) {
              requestAnimationFrame(animate);
            }
          };
          animate();
        };

        // Add hover effects
        marker.on('mouseover', function() {
          routeLine.setStyle({
            weight: 4,
            opacity: 0.8,
          });
          animateRoute();
        });

        marker.on('mouseout', function() {
          routeLine.setStyle({
            weight: 2,
            opacity: 0.6,
          });
        });

        markers.push(marker);
      }, index * animationDelay);
    });

    // Fit map to show all markers with generous padding
    const group = new L.FeatureGroup([originMarker, ...markers]);
    setTimeout(() => {
      map.fitBounds(group.getBounds(), { 
        padding: [50, 50],
        maxZoom: 2.5 
      });
    }, animationDelay * shippingDestinations.length + 500);

  }, [map]);

  // Region statistics
  const regionStats = Object.entries(
    shippingDestinations.reduce((acc, location) => {
      if (!acc[location.region]) {
        acc[location.region] = { count: 0, countries: new Set() };
      }
      acc[location.region].count++;
      acc[location.region].countries.add(location.country);
      return acc;
    }, {} as { [key: string]: { count: number; countries: Set<string> } })
  );

  return (
    <div className="w-full bg-white rounded-3xl shadow-2xl overflow-hidden" data-testid="interactive-global-map">
      {/* Map Header */}
      <div className="bg-gradient-to-r from-ocean-blue to-marine-teal text-white p-6">
        <h3 className="text-2xl font-bold mb-2">Interactive Global Shipping Network</h3>
        <p className="text-blue-100">
          Explore our worldwide destinations and shipping routes in real-time
        </p>
      </div>

      {/* Map Container */}
      <div className="relative">
        <div 
          ref={mapRef} 
          className="h-[500px] w-full bg-blue-50"
          data-testid="leaflet-map-container"
        />
        
        {/* Map Legend */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 max-w-xs">
          <h4 className="font-bold text-gray-900 mb-3 text-sm">Regional Distribution</h4>
          <div className="space-y-2">
            {regionStats.map(([region, stats]) => (
              <motion.div
                key={region}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all ${
                  selectedRegion === region ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedRegion(selectedRegion === region ? null : region)}
                data-testid={`region-filter-${region.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: regionColors[region] }}
                  />
                  <span className="text-sm font-medium text-gray-700">{region}</span>
                </div>
                <div className="text-xs text-gray-500">
                  {stats.count} cities
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-4 pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>🏭 Origin</span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-1" />
                India
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-ocean-blue">{shippingDestinations.length}</div>
              <div className="text-xs text-gray-500">Destinations</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-marine-teal">{regionStats.length}</div>
              <div className="text-xs text-gray-500">Regions</div>
            </div>
            <div className="col-span-2">
              <div className="text-2xl font-bold text-coral-accent">
                {new Set(shippingDestinations.map(d => d.country)).size}
              </div>
              <div className="text-xs text-gray-500">Countries Served</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Features Info */}
      <div className="bg-gray-50 p-4 text-center">
        <p className="text-sm text-gray-600">
          🖱️ Click markers for product details • 🔍 Use zoom controls • 🌍 Drag to explore
        </p>
      </div>
    </div>
  );
}