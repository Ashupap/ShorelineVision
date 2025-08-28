import { motion } from "framer-motion";
import { Leaf, Target, Award, Users } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const values = [
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Environmental responsibility in every aspect of our operations",
    color: "text-green-600"
  },
  {
    icon: Target,
    title: "Quality Excellence", 
    description: "Uncompromising standards from ocean to your table",
    color: "text-ocean-blue"
  },
  {
    icon: Award,
    title: "Innovation",
    description: "Continuous improvement and cutting-edge practices",
    color: "text-coral-accent"
  },
  {
    icon: Users,
    title: "Partnership",
    description: "Building long-term relationships with trust and transparency",
    color: "text-marine-teal"
  }
];

export default function ValuesSection() {
  const { elementRef: ref, isIntersecting: isInView } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
            Our <span className="text-ocean-blue">Values</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The principles that guide everything we do
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-6 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50 hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`${value.color} w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-white rounded-full shadow-md`}>
                <value.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}