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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
            Don't Just Take Our Word For It
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Witness it first hand, directly from our lovely customers
          </p>
        </motion.div>

        {isLoading ? (
          <div className="max-w-4xl mx-auto">
            <div className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              plugins={[Autoplay({ delay: 5000 })]}
              className="w-full"
            >
              <CarouselContent>
                {displayTestimonials.map((testimonial: any, index: number) => (
                  <CarouselItem key={testimonial.id}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center px-8"
                    >
                      {/* Large Quote */}
                      <div className="mb-8">
                        <Quote size={48} className="text-ocean-blue mx-auto mb-6 opacity-30" />
                        <blockquote className="text-2xl md:text-3xl font-light text-gray-700 leading-relaxed italic mb-8">
                          "{testimonial.content}"
                        </blockquote>
                      </div>

                      {/* Customer Info */}
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full bg-ocean-blue/10 flex items-center justify-center mb-4">
                          {testimonial.avatar ? (
                            <img 
                              src={testimonial.avatar} 
                              alt={testimonial.name}
                              className="w-18 h-18 rounded-full object-cover"
                            />
                          ) : (
                            <User className="text-ocean-blue" size={32} />
                          )}
                        </div>
                        
                        <h4 className="font-bold text-gray-900 text-lg mb-1">{testimonial.name}</h4>
                        {testimonial.company && (
                          <p className="text-gray-500 text-sm font-medium">{testimonial.company}</p>
                        )}
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-4 md:-left-12 bg-white hover:bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-800" />
              <CarouselNext className="-right-4 md:-right-12 bg-white hover:bg-gray-50 border-gray-200 text-gray-600 hover:text-gray-800" />
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
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block text-ocean-blue font-semibold text-lg hover:text-deep-navy transition-colors duration-300 underline underline-offset-4"
            data-testid="link-see-all-reviews"
          >
            see all reviews
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
