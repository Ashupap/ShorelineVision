import { motion } from "framer-motion";
import { PerformanceImage } from "@/components/ui/performance-image";

interface Leader {
  name: string;
  position: string;
  image: string;
  bio: string;
}

interface LeadershipCardProps {
  leader: Leader;
  index: number;
  className?: string;
}

export default function LeadershipCard({ leader, index, className }: LeadershipCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: "backOut"
      }}
      viewport={{ once: true, margin: "-50px" }}
      className={`${className} flex-shrink-0 w-72 h-96 bg-white rounded-xl shadow-xl overflow-hidden group hover:shadow-2xl transition-all duration-300`}
    >
      <div className="relative h-64 overflow-hidden">
        <PerformanceImage
          src={leader.image}
          alt={leader.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          width={288}
          height={256}
          aspectRatio="9/8"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{leader.name}</h3>
        <p className="text-ocean-blue font-semibold mb-3">{leader.position}</p>
        <p className="text-gray-600 text-sm leading-relaxed">{leader.bio}</p>
      </div>
    </motion.div>
  );
}