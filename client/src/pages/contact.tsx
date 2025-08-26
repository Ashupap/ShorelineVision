import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Building, 
  Clock, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin,
  Send
} from "lucide-react";
import { insertInquirySchema, type InsertInquirySchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import contactBg from "@assets/generated_images/Professional_office_contact_background_95a1aff4.png";

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const y = useSpring(parallaxY, springConfig);
  
  const { toast } = useToast();

  const form = useForm<InsertInquirySchema>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  const createInquiry = useMutation({
    mutationFn: async (data: InsertInquirySchema) => {
      await apiRequest("POST", "/api/inquiries", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertInquirySchema) => {
    createInquiry.mutate(data);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Head Office",
      content: "Plot No- D1/18(P), D1/19, D1/20 & D1/37, D1/38, D1/39(P)\nSomnathpur Industrial Estate, Balasore, Odisha, India, Pin- 755019",
    },
    {
      icon: Mail,
      title: "Email",
      content: "alashoremarine@gmail.com",
      href: "mailto:alashoremarine@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "+91 7381050536",
      href: "tel:+917381050536",
    },
    {
      icon: Building,
      title: "Company Registration",
      content: "CIN: U05000OR2012PTC016366",
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Monday - Saturday: 9:00 AM - 6:00 PM\nSunday: Closed",
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/AlashoreMarine/", name: "Facebook" },
    { icon: Instagram, href: "https://www.instagram.com/alashoremarine/", name: "Instagram" },
    { icon: Twitter, href: "https://twitter.com/AlashoreL", name: "Twitter" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/alashore-marine-private-limited/", name: "LinkedIn" },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-background relative">
      <Header />
      <main>
        {/* Enhanced Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-ocean-blue via-deep-navy to-marine-teal text-white overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${contactBg})` }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-ocean-blue/90 via-deep-navy/85 to-marine-teal/90" />
          <motion.div 
            style={{ y, opacity: parallaxOpacity }}
            className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"
          />
          <motion.div
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.4, 1]
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
              y: [0, -50, 0],
              x: [0, 40, 0]
            }}
            transition={{ 
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 8
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
                <Send className="text-coral-accent mr-2" size={20} />
                <span className="text-white/90 font-medium">Let's Connect</span>
              </motion.div>
              <motion.h1 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.2 }}
                className="text-6xl md:text-8xl font-heading font-bold mb-8"
              >
                Contact <span className="text-coral-accent">Us</span>
              </motion.h1>
              <motion.p 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-xl md:text-2xl text-light-marine max-w-4xl mx-auto leading-relaxed"
              >
                Ready to experience premium seafood quality? Get in touch with our team today 
                and let's discuss your requirements.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Contact Information Cards */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
                Get In Touch
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're here to help with all your seafood needs. Contact us through any of the following channels.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-light-marine to-white p-8 rounded-xl shadow-lg text-center"
                >
                  <div className="w-16 h-16 bg-ocean-blue rounded-full flex items-center justify-center mx-auto mb-6">
                    <info.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-gray-900 mb-4">
                    {info.title}
                  </h3>
                  {info.href ? (
                    <a
                      href={info.href}
                      className="text-gray-600 hover:text-ocean-blue transition-colors whitespace-pre-line"
                      data-testid={`link-contact-${info.title.toLowerCase().replace(" ", "-")}`}
                    >
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-gray-600 whitespace-pre-line">{info.content}</p>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Contact Form and Map */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-light-marine p-8 rounded-xl shadow-lg"
              >
                <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-6">
                  Send us a Message
                </h3>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="John"
                                {...field}
                                data-testid="input-first-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Doe"
                                {...field}
                                data-testid="input-last-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="john@example.com"
                              {...field}
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="+1 (555) 123-4567"
                              {...field}
                              value={field.value || ""}
                              data-testid="input-phone"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your Company"
                              {...field}
                              value={field.value || ""}
                              data-testid="input-company"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              rows={5}
                              placeholder="Tell us about your requirements..."
                              {...field}
                              data-testid="textarea-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={createInquiry.isPending}
                      className="w-full bg-ocean-blue hover:bg-deep-navy"
                      data-testid="button-send-message"
                    >
                      {createInquiry.isPending ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send size={16} className="mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </motion.div>

              {/* Map and Additional Info */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
                  <h3 className="text-2xl font-heading font-semibent text-gray-900 mb-6">
                    Find Our Location
                  </h3>
                  <div className="w-full h-64 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MapPin size={48} className="mx-auto mb-2" />
                      <p>Interactive Map</p>
                      <p className="text-sm">Somnathpur Industrial Estate</p>
                      <p className="text-sm">Balasore, Odisha, India</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Located in the heart of Odisha's industrial area, our facility is easily accessible 
                    and strategically positioned for efficient distribution across India and international markets.
                  </p>
                </div>

                {/* Social Media */}
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-6">
                    Follow Us
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Stay updated with our latest news, product announcements, and industry insights.
                  </p>
                  <div className="flex space-x-4">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 bg-ocean-blue rounded-lg flex items-center justify-center text-white hover:bg-deep-navy transition-colors"
                        data-testid={`link-social-${social.name.toLowerCase()}`}
                      >
                        <social.icon size={20} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gradient-to-br from-light-marine to-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Quick answers to common questions about our products and services.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What are your minimum order quantities?
                </h3>
                <p className="text-gray-600">
                  Our minimum order quantity varies by product but typically starts at 1 metric ton. 
                  Contact our sales team for specific product MOQs.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Do you provide samples?
                </h3>
                <p className="text-gray-600">
                  Yes, we provide samples for quality verification. Sample costs and shipping 
                  charges apply, which can be adjusted against your first order.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What certifications do you have?
                </h3>
                <p className="text-gray-600">
                  We hold HACCP, BRC, EU approval, and other international certifications. 
                  Our EIA-approved laboratory ensures consistent quality standards.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What are your delivery timelines?
                </h3>
                <p className="text-gray-600">
                  Delivery timelines depend on order quantity and destination. Typically, 
                  we can fulfill orders within 2-4 weeks from confirmation.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-ocean-blue to-deep-navy text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Ready to Start Your Order?
              </h2>
              <p className="text-xl text-light-marine mb-8 max-w-3xl mx-auto">
                Our sales team is ready to help you with custom quotes, product specifications, 
                and any questions about our premium seafood products.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="tel:+917381050536"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-coral-accent hover:bg-golden-orange text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center"
                  data-testid="button-call-now"
                >
                  <Phone size={20} className="mr-2" />
                  Call Now
                </motion.a>
                <motion.a
                  href="mailto:alashoremarine@gmail.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white hover:bg-white hover:text-ocean-blue px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 inline-flex items-center justify-center"
                  data-testid="button-email-us"
                >
                  <Mail size={20} className="mr-2" />
                  Email Us
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}