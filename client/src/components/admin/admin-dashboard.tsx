import { useState } from "react";
import { motion } from "framer-motion";
import AdminSidebar from "./admin-sidebar";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import type { BlogPost, Product, Testimonial, Inquiry } from "@shared/schema";
import BlogEditor from "@/components/blog/blog-editor";
import ContentEditor from "./content-editor";
import MediaManager from "./media-manager";
import BlogManager from "./blog-manager";
import TestimonialsManager from "./testimonials-manager";
import { 
  BarChart3, 
  FileText, 
  Star, 
  Mail, 
  Edit, 
  Trash2, 
  Plus,
  Calendar,
  Tag,
  Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showBlogEditor, setShowBlogEditor] = useState(false);
  const [showContentEditor, setShowContentEditor] = useState<string | null>(null);
  const [showMediaManager, setShowMediaManager] = useState(false);
  const { toast } = useToast();

  const { data: blogPosts, isLoading: blogLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog"],
  });

  const { data: testimonials } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });

  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: inquiries } = useQuery<Inquiry[]>({
    queryKey: ["/api/inquiries"],
  });

  const renderDashboard = () => (
    <div>
      <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8">
        Dashboard Overview
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Blog Posts</p>
              <p className="text-2xl font-bold text-gray-900">
                {blogPosts?.length || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-ocean-blue rounded-lg flex items-center justify-center">
              <FileText className="text-white" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Products Listed</p>
              <p className="text-2xl font-bold text-gray-900">
                {products?.length || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-marine-teal rounded-lg flex items-center justify-center">
              <BarChart3 className="text-white" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Testimonials</p>
              <p className="text-2xl font-bold text-gray-900">
                {testimonials?.length || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-coral-accent rounded-lg flex items-center justify-center">
              <Star className="text-white" size={24} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Inquiries</p>
              <p className="text-2xl font-bold text-gray-900">
                {inquiries?.length || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-golden-orange rounded-lg flex items-center justify-center">
              <Mail className="text-white" size={24} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-heading font-semibold text-gray-900 mb-6">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {blogPosts?.slice(0, 3).map((post, index) => (
            <div key={post.id} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-ocean-blue rounded-full flex items-center justify-center mr-4">
                  <FileText className="text-white" size={16} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Blog post published</p>
                  <p className="text-sm text-gray-600">{post.title}</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(post.createdAt!))} ago
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBlogManagement = () => <BlogManager />;

  const renderContentManagement = () => (
    <div>
      <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8">
        Website Content Management
      </h1>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-xl font-heading font-semibold text-gray-900 mb-4">Hero Section</h3>
          <p className="text-gray-600 mb-4">Manage your homepage hero section content</p>
          <Button 
            className="bg-ocean-blue hover:bg-deep-navy" 
            onClick={() => setShowContentEditor("hero")}
            data-testid="button-edit-hero"
          >
            Edit Hero Content
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-xl font-heading font-semibold text-gray-900 mb-4">About Section</h3>
          <p className="text-gray-600 mb-4">Update your company information and about content</p>
          <Button 
            className="bg-ocean-blue hover:bg-deep-navy" 
            onClick={() => setShowContentEditor("about")}
            data-testid="button-edit-about"
          >
            Edit About Content
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-xl font-heading font-semibold text-gray-900 mb-4">Contact Information</h3>
          <p className="text-gray-600 mb-4">Manage contact details and company information</p>
          <Button 
            className="bg-ocean-blue hover:bg-deep-navy" 
            onClick={() => setShowContentEditor("contact")}
            data-testid="button-edit-contact"
          >
            Edit Contact Info
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-xl font-heading font-semibold text-gray-900 mb-4">Footer Content</h3>
          <p className="text-gray-600 mb-4">Update footer links and information</p>
          <Button 
            className="bg-ocean-blue hover:bg-deep-navy" 
            onClick={() => setShowContentEditor("footer")}
            data-testid="button-edit-footer"
          >
            Edit Footer Content
          </Button>
        </motion.div>
      </div>
    </div>
  );

  const renderMediaLibrary = () => (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900">
          Media Library
        </h1>
        <Button 
          className="bg-ocean-blue hover:bg-deep-navy" 
          onClick={() => setShowMediaManager(true)}
          data-testid="button-upload-media"
        >
          <Plus size={20} className="mr-2" />
          Upload Media
        </Button>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No media files yet</h3>
        <p className="text-gray-600 mb-6">Upload images and files to get started.</p>
        <Button 
          className="bg-ocean-blue hover:bg-deep-navy" 
          onClick={() => setShowMediaManager(true)}
          data-testid="button-upload-first-media"
        >
          Upload First File
        </Button>
      </div>
    </div>
  );

  const renderInquiriesManagement = () => (
    <div>
      <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8">
        Contact Inquiries
      </h1>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-xl font-heading font-semibold text-gray-900">
            Recent Inquiries
          </h3>
        </div>
        
        {inquiries && inquiries.length > 0 ? (
          <div className="divide-y">
            {inquiries.map((inquiry) => (
              <div key={inquiry.id} className="p-6 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {inquiry.firstName} {inquiry.lastName}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">{inquiry.email}</p>
                  <p className="text-gray-700">{inquiry.message.substring(0, 100)}...</p>
                </div>
                <div className="text-sm text-gray-500">
                  {formatDistanceToNow(new Date(inquiry.createdAt!))} ago
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No inquiries yet</h3>
            <p className="text-gray-600">Contact inquiries will appear here when received.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderWebsiteSettings = () => (
    <div>
      <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8">
        Website Settings
      </h1>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-xl font-heading font-semibold text-gray-900 mb-4">Site Information</h3>
          <p className="text-gray-600 mb-4">Company name, tagline, and basic information</p>
          <Button className="bg-ocean-blue hover:bg-deep-navy" data-testid="button-edit-site-info">
            Edit Site Information
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-xl font-heading font-semibold text-gray-900 mb-4">SEO Settings</h3>
          <p className="text-gray-600 mb-4">Meta titles, descriptions, and SEO configuration</p>
          <Button className="bg-ocean-blue hover:bg-deep-navy" data-testid="button-edit-seo">
            Edit SEO Settings
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-xl font-heading font-semibold text-gray-900 mb-4">Social Media</h3>
          <p className="text-gray-600 mb-4">Social media links and sharing settings</p>
          <Button className="bg-ocean-blue hover:bg-deep-navy" data-testid="button-edit-social">
            Edit Social Media
          </Button>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <h3 className="text-xl font-heading font-semibold text-gray-900 mb-4">Analytics</h3>
          <p className="text-gray-600 mb-4">Google Analytics and tracking configuration</p>
          <Button className="bg-ocean-blue hover:bg-deep-navy" data-testid="button-edit-analytics">
            Edit Analytics
          </Button>
        </motion.div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard();
      case "content":
        return renderContentManagement();
      case "media":
        return renderMediaLibrary();
      case "blog":
        return renderBlogManagement();
      case "products":
        return (
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8">
              Product Management
            </h1>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <p className="text-gray-600">Product management features coming soon...</p>
            </div>
          </div>
        );
      case "testimonials":
        return <TestimonialsManager />;
      case "inquiries":
        return renderInquiriesManagement();
      case "settings":
        return renderWebsiteSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-100 z-40">
        <div className="flex h-full">
          <AdminSidebar
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
          <div className="flex-1 ml-64 p-8 overflow-y-auto">
            {renderContent()}
          </div>
        </div>
      </div>

      {showBlogEditor && (
        <BlogEditor onClose={() => setShowBlogEditor(false)} />
      )}

      {showContentEditor && (
        <ContentEditor 
          section={showContentEditor} 
          onClose={() => setShowContentEditor(null)} 
        />
      )}

      {showMediaManager && (
        <MediaManager onClose={() => setShowMediaManager(false)} />
      )}
    </>
  );
}
