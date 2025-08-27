import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { Award, Camera, Heart, Users, Play, ExternalLink, Star, Trophy, Newspaper, Image as ImageIcon } from "lucide-react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import mediaBg from "@assets/generated_images/Media_page_hero_background_85689f5f.png";

export default function Media() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(parallaxY, springConfig);

  const recognitionAwards = [
    {
      title: "Excellence in Seafood Export",
      description: "Recognized for outstanding quality and sustainable practices in the seafood export industry",
      image: "https://alashoremarine.com/wp-content/uploads/2024/03/Untitled-design-17.png",
      year: "2024"
    },
    {
      title: "Industry Leadership Award", 
      description: "Acknowledged for leading innovation in marine product processing and export",
      image: "https://alashoremarine.com/wp-content/uploads/2024/03/Untitled-design-26.png",
      year: "2024"
    },
    {
      title: "Quality Certification",
      description: "Certified for maintaining highest quality standards in seafood processing",
      image: "https://alashoremarine.com/wp-content/uploads/2024/03/3.jpg",
      year: "2024"
    },
    {
      title: "Professional Excellence Award",
      description: "Recognition for maintaining professional standards and business excellence in seafood industry",
      image: "https://alashoremarine.com/wp-content/uploads/2024/03/2.jpg",
      year: "2024"
    },
    {
      title: "Outstanding Performance Recognition",
      description: "Awarded for exceptional performance and contribution to the marine export sector",
      image: "https://alashoremarine.com/wp-content/uploads/2024/03/1.jpg",
      year: "2024"
    },
    {
      title: "Business Excellence Certificate",
      description: "Certified for excellence in business operations and sustainable practices",
      image: "https://alashoremarine.com/wp-content/uploads/2024/03/4.jpg",
      year: "2024"
    }
  ];

  const newsItems = [
    {
      title: "बालासोर के सेंट्रल स्कूल चौक प्रोजेक्टर सहयोग के तहत लगा CCTV कैमरा",
      description: "Alashore Marine contributes to road safety by installing CCTV cameras in Balasore",
      videoId: "fqzQSb31Gqw",
      source: "Tarjuman News Time",
      date: "2024"
    },
    {
      title: "ପ୍ରୋଜେକ୍ଟ ସହଯୋଗ ମାଧ୍ୟମରେ ସେଂଟ୍ରାଲ ସ୍କୁଲ ଛକରେ ଲାଗିଲା ସିସିଟିଭି କ୍ୟାମେରା",
      description: "Community safety initiative through CCTV installation project in Balasore",
      videoId: "XsLWbTICN1U", 
      source: "The Ajikali",
      date: "2024"
    }
  ];

  const galleryImages = [
    {
      src: "https://alashoremarine.com/wp-content/uploads/2024/03/Untitled-design-17.png",
      alt: "Company recognition and awards",
      category: "Recognition"
    },
    {
      src: "https://alashoremarine.com/wp-content/uploads/2024/03/Untitled-design-26.png", 
      alt: "Excellence in seafood industry",
      category: "Recognition"
    },
    {
      src: "https://alashoremarine.com/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-02-at-6.03.31-PM.jpg",
      alt: "Modern seafood processing facility",
      category: "Facility"
    },
    {
      src: "https://alashoremarine.com/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-02-at-6.06.23-PM-1.jpg",
      alt: "Quality control and packaging operations",
      category: "Processing"
    },
    {
      src: "https://alashoremarine.com/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-02-at-6.12.24-PM.jpg",
      alt: "Fresh seafood products and quality standards",
      category: "Products"
    },
    {
      src: "https://alashoremarine.com/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-02-at-6.12.23-PM.jpg",
      alt: "Export operations and logistics",
      category: "Operations"
    },
    {
      src: "https://alashoremarine.com/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-02-at-6.12.24-PM-1.jpg",
      alt: "Team collaboration and workplace culture",
      category: "Team"
    }
  ];

  const csrActivities = [
    {
      title: "Enhancing Road Safety in Balasore",
      description: "We've reinforced Balasore's road safety by contributing 4 CCTV cameras in collaboration with Balasore SP Sagarika Nath. These cameras aim to improve traffic monitoring and ensure safer roads for the community.",
      image: "https://alashoremarine.com/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-02-at-6.06.23-PM-1.jpg",
      impact: "4 CCTV Cameras Installed"
    },
    {
      title: "Promoting Mobility and Inclusivity for the Handicapped in Balasore", 
      description: "In collaboration with Balasore Collector, we've donated 2 e-tricycles to empower handicapped individuals in Balasore. This initiative reflects our dedication to inclusive community development.",
      image: "https://alashoremarine.com/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-02-at-6.12.24-PM-1.jpg",
      impact: "2 E-Tricycles Donated"
    },
    {
      title: "Supporting Community Development",
      description: "Contributed towards the growth of RSS, Balasore, supporting various community development initiatives.",
      image: "https://alashoremarine.com/wp-content/uploads/2024/03/Untitled-design-17.png",
      impact: "Community Growth"
    },
    {
      title: "Advancing Education",
      description: "Contributed 20 lakhs towards rural school development initiatives, enhancing educational opportunities for underprivileged communities.",
      image: "https://alashoremarine.com/wp-content/uploads/2024/03/WhatsApp-Image-2024-03-02-at-6.12.23-PM.jpg",
      impact: "₹20 Lakhs Investment"
    }
  ];

  const categories = ["All", "Recognition", "Facility", "Processing", "Products", "Operations", "Team"];
  const filteredImages = selectedCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <div ref={containerRef} className="min-h-screen bg-background relative">
      <Header />
      <main>
        {/* Enhanced Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${mediaBg})`,
              filter: 'brightness(0.3) contrast(1.1)'
            }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-ocean-blue/80 via-marine-teal/70 to-deep-navy/85" />
          <motion.div 
            style={{ y, opacity: parallaxOpacity }}
            className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"
          />
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.3, 1]
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-10 right-10 w-56 h-56 bg-white/10 rounded-full backdrop-blur-sm"
          />
          <motion.div
            animate={{ 
              y: [0, -40, 0],
              x: [0, 30, 0]
            }}
            transition={{ 
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 7
            }}
            className="absolute bottom-20 left-10 w-40 h-40 bg-coral-accent/20 rounded-full backdrop-blur-sm"
          />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="inline-flex items-center bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 mb-8"
              >
                <Camera className="text-coral-accent mr-2" size={20} />
                <span className="text-white/90 font-medium">Media & Recognition</span>
              </motion.div>
              <motion.h1 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.2 }}
                className="text-6xl md:text-8xl font-heading font-bold mb-8"
              >
                Media <span className="text-coral-accent">&</span>
                <br />Recognition
              </motion.h1>
              <motion.p 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-xl md:text-2xl text-light-marine max-w-4xl mx-auto leading-relaxed"
              >
                Explore our accolades, industry recognition, and community initiatives showcasing our commitment to excellence in the seafood export industry
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Recognition Section */}
        <motion.section 
          style={{ y: useTransform(scrollYProgress, [0.1, 0.3], [50, 0]) }}
          className="py-24 bg-gradient-to-br from-white via-light-marine/10 to-white relative overflow-hidden"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 right-20 w-64 h-64 bg-marine-teal/10 rounded-full backdrop-blur-sm"
          />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-flex items-center bg-white/70 backdrop-blur-md px-6 py-3 rounded-full border border-gray-200/50 mb-8"
              >
                <Award className="text-coral-accent mr-2" size={20} />
                <span className="text-gray-700 font-medium">Our Recognition</span>
              </motion.div>
              <motion.h2
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-heading font-bold text-gray-900 mb-6"
              >
                Awards & <span className="text-coral-accent">Achievements</span>
              </motion.h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="w-24 h-1 bg-gradient-to-r from-coral-accent to-golden-orange mx-auto rounded-full"
              />
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {recognitionAwards.map((award, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -15, 
                    scale: 1.02,
                    boxShadow: "0 25px 60px rgba(0, 0, 0, 0.15)"
                  }}
                  className="group bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:shadow-2xl border border-gray-100/50 backdrop-blur-md"
                >
                  <div className="relative overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                      src={award.image}
                      alt={award.title}
                      className="w-full h-64 object-cover"
                    />
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-start p-6"
                    >
                      <span className="bg-coral-accent text-white px-4 py-2 rounded-full text-sm font-bold">
                        {award.year}
                      </span>
                    </motion.div>
                  </div>
                  <div className="p-8">
                    <motion.h3 
                      className="text-xl font-heading font-bold text-gray-900 mb-4 group-hover:text-coral-accent transition-colors duration-300"
                    >
                      {award.title}
                    </motion.h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {award.description}
                    </p>
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="flex items-center text-coral-accent font-semibold"
                    >
                      <Trophy size={16} className="mr-2" />
                      <span className="text-sm">Excellence Award</span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* News Section */}
        <section className="py-24 bg-gradient-to-br from-light-marine/20 to-white relative overflow-hidden">
          <motion.div
            animate={{ 
              x: [0, 50, 0],
              y: [0, -30, 0]
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-10 left-10 w-32 h-32 bg-coral-accent/10 rounded-full backdrop-blur-sm"
          />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-flex items-center bg-white/70 backdrop-blur-md px-6 py-3 rounded-full border border-gray-200/50 mb-8"
              >
                <Newspaper className="text-coral-accent mr-2" size={20} />
                <span className="text-gray-700 font-medium">In the News</span>
              </motion.div>
              <motion.h2
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-heading font-bold text-gray-900 mb-6"
              >
                Latest <span className="text-coral-accent">News</span>
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                Stay updated with our latest news and sponsorship activities, highlighting our commitment to community engagement
              </motion.p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-10">
              {newsItems.map((news, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)"
                  }}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden group"
                >
                  <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="w-20 h-20 bg-coral-accent rounded-full flex items-center justify-center cursor-pointer group-hover:bg-golden-orange transition-colors duration-300"
                    >
                      <Play size={32} className="text-white ml-2" />
                    </motion.div>
                    <motion.div
                      className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-white text-sm font-medium">{news.source}</span>
                    </motion.div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-heading font-bold text-gray-900 mb-4 group-hover:text-coral-accent transition-colors duration-300">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {news.description}
                    </p>
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="flex items-center text-coral-accent font-semibold"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      <span className="text-sm">Watch Video</span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-24 bg-white relative overflow-hidden">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-20 right-20 w-48 h-48 bg-marine-teal/10 rounded-full backdrop-blur-sm"
          />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-flex items-center bg-light-marine/20 backdrop-blur-md px-6 py-3 rounded-full border border-gray-200/50 mb-8"
              >
                <ImageIcon className="text-coral-accent mr-2" size={20} />
                <span className="text-gray-700 font-medium">Our Gallery</span>
              </motion.div>
              <motion.h2
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-heading font-bold text-gray-900 mb-6"
              >
                Visual <span className="text-coral-accent">Journey</span>
              </motion.h2>
              
              {/* Category Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-4 mb-12"
              >
                {categories.map((category, index) => (
                  <motion.button
                    key={category}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 backdrop-blur-md border ${
                      selectedCategory === category
                        ? "bg-gradient-to-r from-coral-accent to-golden-orange text-white border-transparent shadow-lg"
                        : "bg-white/70 text-gray-700 border-gray-200 hover:bg-white/90 hover:border-coral-accent"
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
            
            <motion.div 
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredImages.map((image, index) => (
                <motion.div
                  key={`${image.category}-${index}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -10,
                    scale: 1.02
                  }}
                  className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover"
                  />
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-start p-6"
                  >
                    <div>
                      <p className="text-white font-semibold text-lg mb-1">{image.alt}</p>
                      <span className="bg-coral-accent text-white px-3 py-1 rounded-full text-xs font-medium">
                        {image.category}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CSR Activities Section */}
        <section className="py-24 bg-gradient-to-br from-light-marine/10 to-white relative overflow-hidden">
          <motion.div
            animate={{ 
              y: [0, -50, 0],
              x: [0, 40, 0]
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-20 w-40 h-40 bg-coral-accent/10 rounded-full backdrop-blur-sm"
          />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-flex items-center bg-white/70 backdrop-blur-md px-6 py-3 rounded-full border border-gray-200/50 mb-8"
              >
                <Heart className="text-coral-accent mr-2" size={20} />
                <span className="text-gray-700 font-medium">CSR Activities</span>
              </motion.div>
              <motion.h2
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl font-heading font-bold text-gray-900 mb-6"
              >
                Community <span className="text-coral-accent">Impact</span>
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                Our commitment to giving back to the community through meaningful initiatives and social responsibility programs
              </motion.p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-12">
              {csrActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)"
                  }}
                  className="group bg-white rounded-3xl shadow-xl overflow-hidden"
                >
                  <div className="relative overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-64 object-cover"
                    />
                    <motion.div 
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full"
                    >
                      <span className="text-coral-accent font-bold text-sm">{activity.impact}</span>
                    </motion.div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-heading font-bold text-gray-900 mb-4 group-hover:text-coral-accent transition-colors duration-300">
                      {activity.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {activity.description}
                    </p>
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="flex items-center text-coral-accent font-semibold"
                    >
                      <Users size={16} className="mr-2" />
                      <span className="text-sm">Community Initiative</span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <motion.section 
          style={{ y: useTransform(scrollYProgress, [0.8, 1], [0, -50]) }}
          className="py-32 bg-gradient-to-br from-ocean-blue via-marine-teal to-deep-navy text-white relative overflow-hidden"
        >
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.3, 1]
            }}
            transition={{ 
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full backdrop-blur-sm"
          />
          <motion.div
            animate={{ 
              x: [0, 100, 0],
              y: [0, -50, 0]
            }}
            transition={{ 
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-0 left-0 w-64 h-64 bg-coral-accent/10 rounded-full backdrop-blur-sm"
          />
          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-heading font-bold mb-8 leading-tight"
              >
                Ready to Be Part of<br />
                <motion.span
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="text-coral-accent"
                >
                  Our Success Story?
                </motion.span>
              </motion.h2>
              <motion.p 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                viewport={{ once: true }}
                className="text-xl md:text-2xl text-light-marine mb-12 max-w-4xl mx-auto leading-relaxed"
              >
                Join us in our mission to deliver excellence while making a positive impact on our community and environment.
              </motion.p>
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 25px 50px rgba(255, 107, 107, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="relative bg-gradient-to-r from-coral-accent to-golden-orange hover:from-golden-orange hover:to-coral-accent text-white px-12 py-6 rounded-2xl text-xl font-bold transition-all duration-500 shadow-2xl overflow-hidden group"
                data-testid="button-get-in-touch"
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">GET IN TOUCH</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}