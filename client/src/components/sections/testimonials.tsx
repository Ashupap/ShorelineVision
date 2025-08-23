import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Star, User, Quote } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { Testimonial } from "@shared/schema";

export default function Testimonials() {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials?published=true"],
  });

  // Default testimonials data if API returns empty
  const defaultTestimonials = [
    {
      id: 1,
      name: "Nihar Tripathy",
      company: "",
      content: "Alashore Marine has an excellent shrimp processing unit, making them a leading seafood exporter in Odisha. They consistently deliver top-quality products that stand out in the industry.",
      rating: 5,
      avatar: null
    },
    {
      id: 2,
      name: "Abu Sadek Md.",
      company: "",
      content: "Alashore Marine shines as a top-notch seafood processing and exporting organization in India. Exceptional quality and service!",
      rating: 5,
      avatar: null
    },
    {
      id: 3,
      name: "Shrinibas Mohanty",
      company: "",
      content: "Alashore Marine's products exceed expectations, elevating my business offerings with unparalleled quality. Satisfied customer!",
      rating: 5,
      avatar: null
    },
    {
      id: 4,
      name: "Parthapratim Hira",
      company: "",
      content: "Exceptional exporter! Alashore Marine is a very good exporter. Their products are excellent, and they are known for high-quality standards.",
      rating: 5,
      avatar: null
    },
    {
      id: 5,
      name: "Debangshu Chakraborty",
      company: "",
      content: "Alashore Marine's export prawns offer premium quality at reasonable rates. A trusted choice for exceptional seafood!",
      rating: 5,
      avatar: null
    },
    {
      id: 6,
      name: "Devesh Sharma",
      company: "",
      content: "Highly commendable! Unit is well-maintained, emphasizing cleanliness and hygiene as top priorities. Greatly appreciated!",
      rating: 5,
      avatar: null
    }
  ];

  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Full Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800" 
          alt="Ocean background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/80 via-blue-900/70 to-indigo-900/80"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20"
        >
          <Quote size={64} className="text-white/30 mx-auto mb-8" />
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Don't just take our word for it
          </h2>
          <p className="text-white/90 text-xl max-w-2xl mx-auto leading-relaxed">
            Witness it first hand, directly from our lovely customers
          </p>
        </motion.div>

        {/* Flying Cards Section */}
        {isLoading ? (
          <div className="max-w-4xl mx-auto">
            <div className="h-80 bg-white/10 backdrop-blur-sm rounded-2xl animate-pulse"></div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto relative">
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              plugins={[Autoplay({ delay: 6000 })]}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {displayTestimonials.map((testimonial: any, index: number) => (
                  <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      initial={{ opacity: 0, y: 100, rotateY: -15 }}
                      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                      transition={{ 
                        duration: 0.8, 
                        delay: index * 0.2,
                        type: "spring",
                        stiffness: 100
                      }}
                      viewport={{ once: true }}
                      whileHover={{ 
                        y: -10, 
                        rotateY: 5,
                        transition: { duration: 0.3 }
                      }}
                      className="group perspective-1000"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      <div className="bg-white/95 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 h-full flex flex-col justify-between relative overflow-hidden hover:shadow-3xl transition-all duration-500">
                        {/* Floating Effect Background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Content */}
                        <div className="relative z-10">
                          {/* Quote */}
                          <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                            "{testimonial.content}"
                          </blockquote>
                          
                          {/* Star Rating */}
                          <div className="flex gap-1 mb-6">
                            {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.5 + (i * 0.1) }}
                                viewport={{ once: true }}
                              >
                                <Star size={16} className="text-yellow-400 fill-current" />
                              </motion.div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Customer Info */}
                        <div className="flex items-center gap-4 relative z-10">
                          <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 ring-2 ring-white/50">
                            {testimonial.avatar ? (
                              <img 
                                src={testimonial.avatar} 
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-teal-100 flex items-center justify-center">
                                <User className="text-teal-600" size={20} />
                              </div>
                            )}
                          </div>
                          
                          <div>
                            <h4 className="font-bold text-gray-900 text-base">{testimonial.name}</h4>
                            <p className="text-gray-500 text-sm font-medium">
                              {testimonial.company || 'Satisfied Customer'}
                            </p>
                          </div>
                        </div>
                        
                        {/* Floating Shine Effect */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {/* Custom Navigation */}
              <CarouselPrevious className="-left-4 lg:-left-12 bg-white/20 hover:bg-white/30 border-white/30 text-white hover:text-white backdrop-blur-sm" />
              <CarouselNext className="-right-4 lg:-right-12 bg-white/20 hover:bg-white/30 border-white/30 text-white hover:text-white backdrop-blur-sm" />
            </Carousel>
          </div>
        )}

      </div>
      
      {/* Floating Particles Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20],
              x: [-10, 10],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </section>
  );
}
