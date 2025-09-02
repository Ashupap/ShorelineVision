import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Star, CheckCircle, Anchor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

// Form validation schema
const testimonialSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().optional(),
  content: z.string().min(10, "Please write at least 10 characters about your experience"),
  rating: z.number().min(1).max(5, "Rating must be between 1 and 5")
});

type TestimonialFormData = z.infer<typeof testimonialSchema>;

export default function SubmitTestimonial() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: "",
      company: "",
      content: "",
      rating: 5
    }
  });

  const submitTestimonial = useMutation({
    mutationFn: async (data: TestimonialFormData) => {
      const response = await fetch('/api/testimonials/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit testimonial');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      setIsSubmitted(true);
      // Invalidate testimonials cache to refresh the home page
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
      toast({
        title: "Testimonial Submitted!",
        description: "Thank you for sharing your experience. Your testimonial is now live on our website.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: TestimonialFormData) => {
    submitTestimonial.mutate(data);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 pt-24 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-md"
          >
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Thank You!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Your testimonial has been successfully submitted and will be reviewed by our team. 
              Once approved, it will appear on our website. We appreciate you taking the time to share your experience with Alashore Marine.
            </p>
            <div className="space-y-4">
              <Button 
                onClick={() => window.location.href = '/'}
                className="w-full"
                data-testid="button-home"
              >
                Return to Home
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsSubmitted(false)}
                className="w-full"
                data-testid="button-another"
              >
                Submit Another Testimonial
              </Button>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-gray-800 pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-6">
              <Anchor className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Share Your Experience
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We'd love to hear about your experience with Alashore Marine's seafood products. 
              Your testimonial will be featured on our website.
            </p>
          </motion.div>

          {/* Testimonial Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl text-center text-gray-900 dark:text-white">
                  Submit Your Testimonial
                </CardTitle>
                <CardDescription className="text-center text-gray-600 dark:text-gray-300">
                  Tell us about the quality and service you experienced
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name Field */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 dark:text-gray-300">Full Name *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your full name" 
                              {...field}
                              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                              data-testid="input-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Company Field */}
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 dark:text-gray-300">Company Name (Optional)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your company or organization" 
                              {...field}
                              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                              data-testid="input-company"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Rating Field */}
                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 dark:text-gray-300">Rating *</FormLabel>
                          <FormControl>
                            <div className="flex items-center space-x-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => field.onChange(star)}
                                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                                  data-testid={`rating-${star}`}
                                >
                                  <Star
                                    className={`w-8 h-8 transition-colors ${
                                      star <= field.value
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300 dark:text-gray-600"
                                    }`}
                                  />
                                </button>
                              ))}
                              <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                                {field.value} of 5 stars
                              </span>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Content Field */}
                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700 dark:text-gray-300">Your Experience *</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Share your experience with our seafood products and services. What did you like most? How was the quality and freshness?"
                              className="min-h-[120px] bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 resize-none"
                              {...field}
                              data-testid="textarea-content"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={submitTestimonial.isPending}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                      data-testid="button-submit"
                    >
                      {submitTestimonial.isPending ? "Submitting..." : "Submit Testimonial"}
                    </Button>
                  </form>
                </Form>

                {/* Disclaimer */}
                <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
                  Your testimonial will be reviewed and published on our website. 
                  By submitting, you agree to let us use your feedback for marketing purposes.
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}