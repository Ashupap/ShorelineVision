import { memo } from "react";
import azureLogo from "@assets/AZURE_1755944927383.png";
import costarLogo from "@assets/Costar_1755944927383.png";
import geishaLogo from "@assets/GEISHA_1755944927383.png";
import genseaLogo from "@assets/GENSEA_1755944927383.png";
import goldenBayLogo from "@assets/Golden-bay_1755944927383.png";
import seastarLogo from "@assets/Seastar_1755944927383.png";
import selectLogo from "@assets/SELECT_1755944927384.png";

export const MobileOptimizedNetwork = memo(() => {
  const logos = [
    { name: "AZURE", img: azureLogo },
    { name: "COSTAR", img: costarLogo },
    { name: "GEISHA", img: geishaLogo },
    { name: "GENSEA", img: genseaLogo },
    { name: "GOLDEN BAY", img: goldenBayLogo },
    { name: "SEASTAR", img: seastarLogo },
    { name: "SELECT", img: selectLogo }
  ];

  return (
    <div className="relative py-8">
      {/* Static grid layout optimized for mobile */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-sm mx-auto">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="w-20 h-20 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-white/50 flex items-center justify-center p-3 transform transition-transform duration-300 hover:scale-105"
          >
            <img
              src={logo.img}
              alt={logo.name}
              className="max-w-full max-h-full object-contain filter drop-shadow-sm"
            />
          </div>
        ))}
      </div>
      
      {/* Center badge */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-white via-coral-accent/20 to-golden-orange/20 rounded-full shadow-lg border-2 border-white/60 backdrop-blur-xl flex items-center justify-center">
        <div className="text-ocean-blue font-bold text-xs text-center leading-tight">
          GLOBAL<br/>TRUST
        </div>
      </div>
    </div>
  );
});

MobileOptimizedNetwork.displayName = "MobileOptimizedNetwork";