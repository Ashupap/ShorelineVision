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
    <section className="py-0">
      <div className="grid lg:grid-cols-2 min-h-[500px]">

        {/* Left Side - Teal Background */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-teal-500 px-8 py-16 lg:px-16 lg:py-20 flex flex-col justify-center"
        >
          <Quote size={64} className="text-white/30 mb-8" />
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Don't just take our word for it
          </h2>
          <p className="text-white/90 text-lg leading-relaxed">
            Witness it first hand, directly from our lovely customers
          </p>
        </motion.div>

        {/* Right Side - White Testimonial Card */}
        {isLoading ? (
          <div className="bg-gray-100 px-8 py-16 lg:px-16 lg:py-20 flex items-center justify-center">
            <div className="w-full max-w-md h-64 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-teal-500 px-8 py-16 lg:px-16 lg:py-20 flex items-center justify-center"
          >
            <Carousel
              opts={{
                align: "center",
                loop: true,
              }}
              plugins={[Autoplay({ delay: 6000 })]}
              className="w-full max-w-lg"
            >
              <CarouselContent>
                {displayTestimonials.map((testimonial: any) => (
                  <CarouselItem key={testimonial.id}>
                    <motion.div
                      initial={{ 
                        opacity: 0, 
                        y: Math.random() * 100 + 50,
                        x: Math.random() * 60 - 30,
                        rotate: Math.random() * 20 - 10,
                        scale: 0.8
                      }}
                      whileInView={{ 
                        opacity: 1, 
                        y: 0,
                        x: 0,
                        rotate: 0,
                        scale: 1
                      }}
                      transition={{ 
                        duration: 1.2,
                        type: "spring",
                        stiffness: 80,
                        damping: 15
                      }}
                      viewport={{ once: true }}
                      whileHover={{
                        y: Math.random() * 20 - 10,
                        x: Math.random() * 20 - 10,
                        rotate: Math.random() * 6 - 3,
                        transition: { duration: 0.6, type: "spring" }
                      }}
                      animate={{
                        y: [0, Math.random() * 8 - 4, 0],
                        x: [0, Math.random() * 6 - 3, 0],
                        rotate: [0, Math.random() * 2 - 1, 0],
                      }}
                      transition={{
                        duration: 4 + Math.random() * 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="bg-white p-12 rounded-sm shadow-2xl drop-shadow-xl min-h-[320px] flex flex-col justify-between"
                    >
                      {/* Testimonial Quote */}
                      <blockquote className="text-gray-700 text-lg leading-relaxed mb-10 italic flex-grow">
                        "{testimonial.content}"
                      </blockquote>

                      {/* Customer Info */}
                      <div className="flex items-center gap-5">
                        <div className="w-18 h-18 rounded-full overflow-hidden bg-gray-200 flex-shrink-0 ring-2 ring-gray-100">
                          {testimonial.avatar ? (
                            <img 
                              src={testimonial.avatar} 
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-teal-100 flex items-center justify-center">
                              <User className="text-teal-600" size={28} />
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <h4 className="font-bold text-gray-900 text-xl mb-1">{testimonial.name}</h4>
                          <p className="text-gray-400 text-sm font-medium uppercase tracking-wide">
                            {testimonial.company || 'FOUNDER, SOME COMPANY'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </motion.div>
        )}

      </div>
    </section>
  );
}
