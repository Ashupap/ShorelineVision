import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff, 
  Search, 
  Calendar,
  User,
  Star,
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import type { Testimonial } from "@shared/schema";

export default function TestimonialsManager() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("pending");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all testimonials
  const { data: allTestimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  // Approve testimonial mutation
  const approveMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: true }),
      });
      if (!response.ok) throw new Error("Failed to approve testimonial");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Testimonial approved and published!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
    },
    onError: (error) => {
      toast({
        title: "Approval Failed",
        description: error.message || "Failed to approve testimonial",
        variant: "destructive",
      });
    },
  });

  // Reject/Unpublish testimonial mutation
  const rejectMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ published: false }),
      });
      if (!response.ok) throw new Error("Failed to reject testimonial");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Testimonial rejected/unpublished!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
    },
    onError: (error) => {
      toast({
        title: "Rejection Failed",
        description: error.message || "Failed to reject testimonial",
        variant: "destructive",
      });
    },
  });

  // Delete testimonial mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete testimonial");
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Testimonial deleted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
    },
    onError: (error) => {
      toast({
        title: "Delete Failed",
        description: error.message || "Failed to delete testimonial",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-ocean-blue"></div>
      </div>
    );
  }

  const testimonials = allTestimonials || [];
  
  // Filter testimonials based on search and tab
  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = !searchTerm || 
      testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      testimonial.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === "all" || 
      (activeTab === "pending" && !testimonial.published) ||
      (activeTab === "published" && testimonial.published);
    
    return matchesSearch && matchesTab;
  });

  const pendingCount = testimonials.filter(t => !t.published).length;
  const publishedCount = testimonials.filter(t => t.published).length;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}
      />
    ));
  };

  const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center">
                <User className="text-teal-600" size={20} />
              </div>
              <div>
                <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                <p className="text-sm text-gray-500">{testimonial.company || "Customer"}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={testimonial.published ? "default" : "secondary"}>
                {testimonial.published ? "Published" : "Pending"}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {!testimonial.published ? (
                    <DropdownMenuItem onClick={() => approveMutation.mutate(testimonial.id)}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem onClick={() => rejectMutation.mutate(testimonial.id)}>
                      <EyeOff className="w-4 h-4 mr-2" />
                      Unpublish
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem 
                    onClick={() => deleteMutation.mutate(testimonial.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-3">
            <div className="flex mr-3">{renderStars(testimonial.rating)}</div>
            <span className="text-sm text-gray-500">
              {testimonial.createdAt ? formatDistanceToNow(new Date(testimonial.createdAt)) : 'Recently'} ago
            </span>
          </div>
          <p className="text-gray-700 leading-relaxed">{testimonial.content}</p>
          
          {!testimonial.published && (
            <div className="mt-4 flex space-x-2">
              <Button 
                size="sm" 
                onClick={() => approveMutation.mutate(testimonial.id)}
                className="bg-green-600 hover:bg-green-700"
                disabled={approveMutation.isPending}
              >
                <CheckCircle className="w-4 h-4 mr-1" />
                Approve
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => deleteMutation.mutate(testimonial.id)}
                className="text-red-600 border-red-600 hover:bg-red-50"
                disabled={deleteMutation.isPending}
              >
                <XCircle className="w-4 h-4 mr-1" />
                Reject
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900">
          Testimonial Management
        </h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Search testimonials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Review</p>
                <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
              </div>
              <Clock className="text-orange-600" size={32} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Published</p>
                <p className="text-2xl font-bold text-green-600">{publishedCount}</p>
              </div>
              <CheckCircle className="text-green-600" size={32} />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total</p>
                <p className="text-2xl font-bold text-ocean-blue">{testimonials.length}</p>
              </div>
              <MessageSquare className="text-ocean-blue" size={32} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for filtering */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="pending" className="relative">
            Pending Review
            {pendingCount > 0 && (
              <Badge className="ml-2 h-5 w-5 p-0 text-xs bg-red-500">
                {pendingCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Testimonials Grid */}
      {filteredTestimonials.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {activeTab === "pending" ? "No pending testimonials" : 
               activeTab === "published" ? "No published testimonials" : 
               "No testimonials found"}
            </h3>
            <p className="text-gray-600">
              {activeTab === "pending" 
                ? "All testimonials have been reviewed." 
                : searchTerm 
                ? "Try adjusting your search terms."
                : "Testimonials will appear here when customers submit them."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      )}
    </div>
  );
}