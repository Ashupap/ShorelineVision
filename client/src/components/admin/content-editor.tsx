import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { X, Save, Eye, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertWebsiteContentSchema, type InsertWebsiteContentSchema, type WebsiteContent } from "@shared/schema";
import { z } from "zod";

interface ContentEditorProps {
  section: string;
  onClose: () => void;
}

const contentSchema = insertWebsiteContentSchema.extend({
  section: z.string().min(1, "Section is required"),
});

export default function ContentEditor({ section, onClose }: ContentEditorProps) {
  const [isPreview, setIsPreview] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: existingContent, isLoading } = useQuery<WebsiteContent>({
    queryKey: ["/api/content", section],
    enabled: !!section,
  });

  const form = useForm<InsertWebsiteContentSchema>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      section,
      title: "",
      subtitle: "",
      content: "",
      imageUrl: "",
      buttonText: "",
      buttonLink: "",
      isActive: true,
    },
  });

  useEffect(() => {
    if (existingContent) {
      form.reset({
        section: existingContent.section,
        title: existingContent.title ?? "",
        subtitle: existingContent.subtitle ?? "",
        content: existingContent.content ?? "",
        imageUrl: existingContent.imageUrl ?? "",
        buttonText: existingContent.buttonText ?? "",
        buttonLink: existingContent.buttonLink ?? "",
        isActive: existingContent.isActive ?? true,
      });
    }
  }, [existingContent, form]);

  const createMutation = useMutation({
    mutationFn: async (data: InsertWebsiteContentSchema) => {
      const response = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to create content");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Content created successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/content"] });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create content",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: Partial<InsertWebsiteContentSchema>) => {
      const response = await fetch(`/api/content/${section}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to update content");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Content updated successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/content"] });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update content",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertWebsiteContentSchema) => {
    if (existingContent) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const getSectionTitle = (section: string) => {
    switch (section) {
      case "hero": return "Hero Section";
      case "about": return "About Section";
      case "contact": return "Contact Section";
      case "footer": return "Footer Section";
      default: return `${section.charAt(0).toUpperCase() + section.slice(1)} Section`;
    }
  };

  const getFieldPlaceholders = (section: string) => {
    switch (section) {
      case "hero":
        return {
          title: "Welcome to Alashore Marine Exports",
          subtitle: "Your trusted partner in premium seafood exports",
          content: "Discover our wide range of fresh, frozen, and processed seafood products...",
          buttonText: "View Our Products",
          buttonLink: "/products",
        };
      case "about":
        return {
          title: "About Alashore Marine Exports",
          subtitle: "Excellence in seafood since 1995",
          content: "We are a leading seafood export company committed to delivering the finest quality...",
          buttonText: "Learn More",
          buttonLink: "/about",
        };
      case "contact":
        return {
          title: "Get in Touch",
          subtitle: "Ready to discuss your seafood needs?",
          content: "Contact our team for inquiries about our products and services...",
          buttonText: "Contact Us",
          buttonLink: "/contact",
        };
      default:
        return {
          title: "Section Title",
          subtitle: "Section Subtitle",
          content: "Section content goes here...",
          buttonText: "Learn More",
          buttonLink: "#",
        };
    }
  };

  const placeholders = getFieldPlaceholders(section);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-48"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-heading font-bold text-gray-900">
              Edit {getSectionTitle(section)}
            </h2>
            <p className="text-gray-600">Customize your website content</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsPreview(!isPreview)}
              data-testid="button-toggle-preview"
            >
              <Eye size={16} className="mr-2" />
              {isPreview ? "Edit" : "Preview"}
            </Button>
            <Button
              variant="ghost"
              onClick={onClose}
              data-testid="button-close-editor"
            >
              <X size={20} />
            </Button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          {isPreview ? (
            <div className="p-6">
              <div className="bg-gray-50 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {form.watch("title") || placeholders.title}
                </h3>
                {form.watch("subtitle") && (
                  <p className="text-xl text-gray-600 mb-4">
                    {form.watch("subtitle")}
                  </p>
                )}
                {form.watch("imageUrl") && (
                  <img
                    src={form.watch("imageUrl")}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                )}
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {form.watch("content") || placeholders.content}
                  </p>
                </div>
                {form.watch("buttonText") && (
                  <div className="mt-6">
                    <Button className="bg-ocean-blue hover:bg-deep-navy">
                      {form.watch("buttonText")}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder={placeholders.title}
                    {...form.register("title")}
                    data-testid="input-title"
                  />
                  {form.formState.errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {form.formState.errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    placeholder={placeholders.subtitle}
                    {...form.register("subtitle")}
                    data-testid="input-subtitle"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  rows={6}
                  placeholder={placeholders.content}
                  {...form.register("content")}
                  data-testid="textarea-content"
                />
              </div>

              <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    {...form.register("imageUrl")}
                    data-testid="input-image-url"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    data-testid="button-upload-image"
                  >
                    <Upload size={16} />
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="buttonText">Button Text</Label>
                  <Input
                    id="buttonText"
                    placeholder={placeholders.buttonText}
                    {...form.register("buttonText")}
                    data-testid="input-button-text"
                  />
                </div>

                <div>
                  <Label htmlFor="buttonLink">Button Link</Label>
                  <Input
                    id="buttonLink"
                    placeholder={placeholders.buttonLink}
                    {...form.register("buttonLink")}
                    data-testid="input-button-link"
                  />
                </div>
              </div>
            </form>
          )}
        </div>

        {!isPreview && (
          <div className="flex items-center justify-end space-x-4 p-6 border-t bg-gray-50">
            <Button
              variant="outline"
              onClick={onClose}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={createMutation.isPending || updateMutation.isPending}
              className="bg-ocean-blue hover:bg-deep-navy"
              data-testid="button-save-content"
            >
              <Save size={16} className="mr-2" />
              {createMutation.isPending || updateMutation.isPending
                ? "Saving..."
                : existingContent
                ? "Update Content"
                : "Create Content"}
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}