import { motion } from "framer-motion";
import { Waves, Fish } from "lucide-react";

const BeautifulLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 relative overflow-hidden">
      {/* Background animated waves */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(14, 165, 233, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 40%, rgba(6, 182, 212, 0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        />
      </div>

      {/* Main loading container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 text-center"
      >
        {/* Animated logo/brand */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-8"
        >
          <div className="relative">
            {/* Main circle with waves */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-20 h-20 mx-auto bg-gradient-to-br from-ocean-blue to-marine-teal rounded-full flex items-center justify-center shadow-2xl"
            >
              <Waves className="text-white w-8 h-8" />
            </motion.div>

            {/* Orbiting fish */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 w-20 h-20"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute -top-2 left-1/2 transform -translate-x-1/2"
              >
                <Fish className="text-coral-accent w-4 h-4" />
              </motion.div>
            </motion.div>

            {/* Ripple effects */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [0, 2, 0],
                  opacity: [0, 0.5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.8,
                  ease: "easeOut"
                }}
                className="absolute inset-0 w-20 h-20 border-2 border-ocean-blue/30 rounded-full"
              />
            ))}
          </div>
        </motion.div>

        {/* Animated text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-4"
        >
          <motion.h2
            animate={{
              background: [
                "linear-gradient(45deg, #144e75, #1d9b9b)",
                "linear-gradient(45deg, #1d9b9b, #ff6b6b)",
                "linear-gradient(45deg, #ff6b6b, #144e75)",
                "linear-gradient(45deg, #144e75, #1d9b9b)"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="text-3xl font-bold bg-clip-text text-transparent inline-block"
          >
            Alashore Marine
          </motion.h2>
          
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-slate-600 text-lg"
          >
            Loading premium seafood experience...
          </motion.p>

          {/* Loading progress bar */}
          <div className="w-64 h-1 bg-slate-200 rounded-full mx-auto overflow-hidden">
            <motion.div
              animate={{ 
                x: ["-100%", "100%"],
                background: [
                  "linear-gradient(90deg, transparent, #144e75, transparent)",
                  "linear-gradient(90deg, transparent, #1d9b9b, transparent)",
                  "linear-gradient(90deg, transparent, #ff6b6b, transparent)"
                ]
              }}
              transition={{ 
                x: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                background: { duration: 3, repeat: Infinity }
              }}
              className="w-full h-full"
            />
          </div>
        </motion.div>

        {/* Floating seafood elements */}
        <div className="absolute -top-10 -left-10 w-full h-full pointer-events-none">
          {[
            { delay: 0, x: 20, y: 30, duration: 6 },
            { delay: 1, x: -20, y: 50, duration: 8 },
            { delay: 2, x: 30, y: 20, duration: 7 }
          ].map((bubble, i) => (
            <motion.div
              key={i}
              animate={{
                y: [bubble.y, bubble.y - 100, bubble.y],
                x: [bubble.x, bubble.x + 20, bubble.x],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: bubble.duration,
                repeat: Infinity,
                delay: bubble.delay,
                ease: "easeInOut"
              }}
              className="absolute w-2 h-2 bg-ocean-blue/30 rounded-full"
              style={{
                left: `${30 + i * 20}%`,
                top: `${60 + i * 10}%`
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default BeautifulLoader;