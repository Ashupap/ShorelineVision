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
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block text-blue-300 font-semibold text-lg mb-4"
          >
            Customer Stories
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Don't Just Take Our Word For It
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover why customers trust Alashore Marine for premium seafood quality and exceptional service
          </p>
        </motion.div>

        {isLoading ? (
          <div className="max-w-4xl mx-auto">
            <div className="h-80 bg-white/5 backdrop-blur-sm rounded-3xl animate-pulse"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              plugins={[Autoplay({ delay: 5000 })]}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {displayTestimonials.map((testimonial: any, index: number) => (
                  <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="group h-full"
                    >
                      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 h-full transition-all duration-500 hover:bg-white/15 hover:border-white/30 hover:shadow-2xl hover:shadow-blue-500/20">
                        {/* Quote Icon */}
                        <div className="absolute -top-4 left-8">
                          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-full shadow-lg">
                            <Quote size={20} className="text-white" />
                          </div>
                        </div>
                        
                        {/* Star Rating */}
                        <div className="flex justify-center mb-6 mt-4">
                          <div className="flex gap-1">
                            {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.1 * i }}
                                viewport={{ once: true }}
                              >
                                <Star size={18} className="text-yellow-400 fill-current" />
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Testimonial Content */}
                        <div className="text-center mb-8">
                          <p className="text-gray-100 text-lg leading-relaxed italic">
                            "{testimonial.content}"
                          </p>
                        </div>

                        {/* Customer Info */}
                        <div className="flex flex-col items-center">
                          <div className="relative mb-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-0.5">
                              <div className="w-full h-full rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                                {testimonial.avatar ? (
                                  <img 
                                    src={testimonial.avatar} 
                                    alt={testimonial.name}
                                    className="w-14 h-14 rounded-full object-cover"
                                  />
                                ) : (
                                  <User className="text-white" size={28} />
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-center">
                            <h4 className="font-bold text-white text-lg mb-1">{testimonial.name}</h4>
                            {testimonial.company && (
                              <p className="text-blue-200 text-sm font-medium">{testimonial.company}</p>
                            )}
                          </div>
                        </div>

                        {/* Hover Effect Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-purple-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:via-purple-600/5 group-hover:to-blue-600/5 rounded-3xl transition-all duration-500"></div>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-4 md:-left-12 bg-white/10 hover:bg-white/20 border-white/20 text-white hover:text-white backdrop-blur-sm" />
              <CarouselNext className="-right-4 md:-right-12 bg-white/10 hover:bg-white/20 border-white/20 text-white hover:text-white backdrop-blur-sm" />
            </Carousel>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
            data-testid="button-view-all-testimonials"
          >
            See All Reviews
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
