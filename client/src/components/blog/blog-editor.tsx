import { useState } from "react";
import { motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { insertBlogPostSchema, type InsertBlogPostSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

interface BlogEditorProps {
  onClose: () => void;
}

export default function BlogEditor({ onClose }: BlogEditorProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [uploadingImage, setUploadingImage] = useState(false);

  const form = useForm<InsertBlogPostSchema>({
    resolver: zodResolver(insertBlogPostSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      featuredImage: "",
      category: "Industry",
      published: true,
    },
  });

  const createBlogPost = useMutation({
    mutationFn: async (data: InsertBlogPostSchema) => {
      await apiRequest("POST", "/api/blog", data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Blog post created successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/blog"] });
      onClose();
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/temp-login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to create blog post. Please try again.",
        variant: "destructive",
      });
    },
  });

  const uploadImage = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('alt', file.name);
      formData.append('category', 'blog');

      const response = await fetch('/api/media/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      return response.json();
    },
    onSuccess: (data) => {
      form.setValue('featuredImage', data.url);
      toast({
        title: "Success",
        description: "Image uploaded successfully!",
      });
    },
    onError: (error) => {
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload image",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertBlogPostSchema) => {
    createBlogPost.mutate(data);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "File too large",
          description: "Please select an image under 10MB",
          variant: "destructive",
        });
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }

      uploadImage.mutate(file);
    }
  };

  const categories = ["Industry", "Sustainability", "Quality", "Company News", "Technology"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-heading font-bold text-gray-900">
            Create New Blog Post
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            data-testid="button-close-editor"
          >
            <X size={20} />
          </Button>
        </div>

        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter post title..."
                        {...field}
                        data-testid="input-title"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-category">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="featuredImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Featured Image</FormLabel>
                      <div className="space-y-4">
                        {/* Image Upload Button */}
                        <div className="flex items-center space-x-4">
                          <input
                            type="file"
                            id="image-upload"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById('image-upload')?.click()}
                            disabled={uploadImage.isPending}
                            data-testid="button-upload-image"
                          >
                            <Upload size={16} className="mr-2" />
                            {uploadImage.isPending ? "Uploading..." : "Upload Image"}
                          </Button>
                          {field.value && (
                            <div className="flex items-center text-sm text-green-600">
                              <ImageIcon size={16} className="mr-1" />
                              Image uploaded
                            </div>
                          )}
                        </div>
                        
                        {/* URL Input (alternative) */}
                        <FormControl>
                          <Input
                            type="url"
                            placeholder="Or paste image URL..."
                            {...field}
                            value={field.value || ""}
                            data-testid="input-featured-image"
                          />
                        </FormControl>
                        
                        {/* Image Preview */}
                        {field.value && (
                          <div className="border rounded-lg p-2 bg-gray-50">
                            <img 
                              src={field.value} 
                              alt="Featured image preview" 
                              className="max-h-32 w-auto rounded object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        placeholder="Brief description of the post..."
                        {...field}
                        value={field.value || ""}
                        data-testid="textarea-excerpt"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={12}
                        placeholder="Write your blog content here..."
                        {...field}
                        data-testid="textarea-content"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value || false}
                        onCheckedChange={field.onChange}
                        data-testid="checkbox-published"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Publish immediately</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createBlogPost.isPending}
                  className="bg-ocean-blue hover:bg-deep-navy"
                  data-testid="button-publish"
                >
                  {createBlogPost.isPending ? "Publishing..." : "Publish Post"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </motion.div>
  );
}
