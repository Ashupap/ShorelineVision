import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const milestones = [
  {
    year: "1997",
    title: "Foundation",
    description: "Alashore Marine Exports established with a vision for quality seafood",
    icon: "🏗️",
    achievements: ["Started with small processing unit", "Local market focus"]
  },
  {
    year: "2000-2005", 
    title: "Growth Phase",
    description: "Expanded operations and built strong supplier network",
    icon: "📈",
    achievements: ["Expanded processing capacity", "International certifications", "First exports"]
  },
  {
    year: "2009",
    title: "Global Expansion", 
    description: "Entered international markets with premium product lines",
    icon: "🌏",
    achievements: ["50+ international customers", "Advanced processing technology"]
  },
  {
    year: "2012",
    title: "Innovation Era",
    description: "Introduced sustainable practices and advanced quality systems",
    icon: "🚀", 
    achievements: ["Sustainability certifications", "Quality management systems"]
  },
  {
    year: "2015-2020",
    title: "Excellence Recognition",
    description: "Received multiple industry awards and certifications",
    icon: "🏆",
    achievements: ["Industry leadership awards", "90+ global customers"]
  },
  {
    year: "2021-Present",
    title: "Future Forward",
    description: "Leading sustainable seafood practices globally",
    icon: "🌟",
    achievements: ["Carbon neutral operations", "Digital transformation"]
  }
];

export default function TimelineSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { elementRef: ref, isIntersecting: isInView } = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    if (!isInView || !timelineRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    
    const container = timelineRef.current;
    const cards = container.querySelectorAll(".timeline-card");
    const progressFill = container.querySelector(".timeline-progress-fill");
    
    if (cards.length === 0 || !progressFill) return;

    // Horizontal scroll timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 1,
        snap: 1 / (cards.length - 1),
        end: () => "+=" + (window.innerWidth * cards.length),
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(progressFill, { width: `${progress * 100}%` });
        }
      }
    });

    tl.to(cards, {
      xPercent: -100 * (cards.length - 1),
      ease: "none"
    });

    return () => {
      ScrollTrigger.killAll();
    };
  }, [isInView]);

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
            Our <span className="text-ocean-blue">Journey</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From our humble beginnings to becoming a global leader
          </p>
        </motion.div>
      </div>

      <div ref={timelineRef} className="timeline-container relative h-screen overflow-hidden">
        {/* Progress bar */}
        <div className="absolute top-8 left-0 right-0 z-10">
          <div className="w-full h-2 bg-gray-200 rounded-full mx-auto max-w-4xl">
            <div className="timeline-progress-fill h-full bg-gradient-to-r from-ocean-blue to-coral-accent rounded-full w-0"></div>
          </div>
        </div>

        <div className="timeline-cards flex h-full">
          {milestones.map((milestone, index) => (
            <div
              key={milestone.year}
              className="timeline-card flex-shrink-0 w-full h-full flex items-center justify-center px-8"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-2xl mx-auto text-center"
              >
                <div className="text-6xl mb-6">{milestone.icon}</div>
                <h3 className="text-2xl font-bold text-ocean-blue mb-2">{milestone.year}</h3>
                <h4 className="text-4xl font-heading font-bold text-gray-900 mb-6">{milestone.title}</h4>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">{milestone.description}</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {milestone.achievements.map((achievement, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-r from-ocean-blue/10 to-coral-accent/10 p-4 rounded-lg border border-ocean-blue/20"
                    >
                      <span className="text-gray-700 font-medium">{achievement}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}