import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

// Lazy load leadership cards for better performance
const LeadershipCard = lazy(() => import("./leadership-card"));

const leaders = [
  {
    name: "Rajesh Kumar",
    position: "Founder & CEO",
    image: "/api/placeholder/300/300",
    bio: "Visionary leader with 25+ years in seafood industry"
  },
  {
    name: "Priya Sharma",
    position: "Head of Operations",
    image: "/api/placeholder/300/300", 
    bio: "Operations expert ensuring quality at every step"
  },
  {
    name: "Dr. Anil Patel",
    position: "Quality Director",
    image: "/api/placeholder/300/300",
    bio: "Marine biologist ensuring highest quality standards"
  },
  {
    name: "Sarah Johnson", 
    position: "Global Sales Director",
    image: "/api/placeholder/300/300",
    bio: "International trade specialist with global network"
  }
];

export default function LeadershipSection() {
  const { elementRef: ref, isIntersecting: isInView } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
            Leadership <span className="text-ocean-blue">Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the experienced professionals driving our mission of excellence
          </p>
        </motion.div>

        <div className="leadership-scroll-container overflow-hidden">
          <motion.div 
            className="leadership-track flex gap-8"
            initial={{ x: -100 }}
            animate={isInView ? { x: 0 } : {}}
            transition={{ duration: 1, staggerChildren: 0.2 }}
          >
            {leaders.concat(leaders).map((leader, index) => (
              <Suspense 
                key={`${leader.name}-${index}`}
                fallback={<div className="w-72 h-96 bg-gray-200 rounded-xl animate-pulse" />}
              >
                <LeadershipCard 
                  leader={leader} 
                  index={index}
                  className="leadership-card"
                />
              </Suspense>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}