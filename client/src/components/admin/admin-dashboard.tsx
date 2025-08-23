import { useState } from "react";
import { motion } from "framer-motion";
import AdminSidebar from "./admin-sidebar";
import { useQuery } from "@tanstack/react-query";
import { isUnauthorizedError } from "@/lib/authUtils";
import { useToast } from "@/hooks/use-toast";
import BlogEditor from "@/components/blog/blog-editor";
import { 
  BarChart3, 
  FileText, 
  Star, 
  Mail, 
  Edit, 
  Trash2, 
  Plus,
  Calendar,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDistanceToNow } from "date-fns";

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showBlogEditor, setShowBlogEditor] = useState(false);
  const { toast } = useToast();

  const { data: blogPosts, isLoading: blogLoading } = useQuery({
    queryKey: ["/api/blog"],
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
      }
    },
  });

  const { data: testimonials } = useQuery({
    queryKey: ["/api/testimonials"],
  });

  const { data: products } = useQuery({
    queryKey: ["/api/products"],
  });

  const { data: inquiries } = useQuery({
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

  const renderBlogManagement = () => (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-heading font-bold text-gray-900">
          Blog Management
        </h1>
        <Button
          onClick={() => setShowBlogEditor(true)}
          className="bg-ocean-blue hover:bg-deep-navy"
          data-testid="button-new-post"
        >
          <Plus size={20} className="mr-2" />
          New Post
        </Button>
      </div>

      {blogLoading ? (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="text-xl font-heading font-semibold text-gray-900">
              Published Posts
            </h3>
          </div>
          <div className="divide-y">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="p-6 animate-pulse">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4"></div>
                    <div>
                      <div className="h-6 bg-gray-200 rounded w-64 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-48"></div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                    <div className="w-8 h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="text-xl font-heading font-semibold text-gray-900">
              Published Posts
            </h3>
          </div>

          {blogPosts && blogPosts.length > 0 ? (
            <div className="divide-y">
              {blogPosts.map((post) => (
                <div key={post.id} className="p-6 flex items-center justify-between">
                  <div className="flex items-center">
                    {post.featuredImage ? (
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-16 h-16 rounded-lg object-cover mr-4"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4 flex items-center justify-center">
                        <FileText className="text-gray-400" size={20} />
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {post.title}
                      </h4>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar size={14} className="mr-1" />
                        <span>{formatDistanceToNow(new Date(post.createdAt!))} ago</span>
                        <span className="mx-2">•</span>
                        <Tag size={14} className="mr-1" />
                        <span>{post.category}</span>
                        <span className="mx-2">•</span>
                        <span className={`px-2 py-1 rounded text-xs ${
                          post.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-ocean-blue hover:text-deep-navy"
                      data-testid={`button-edit-post-${post.id}`}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-coral-accent hover:text-red-600"
                      data-testid={`button-delete-post-${post.id}`}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No blog posts yet
              </h3>
              <p className="text-gray-600 mb-6">
                Create your first blog post to get started.
              </p>
              <Button
                onClick={() => setShowBlogEditor(true)}
                className="bg-ocean-blue hover:bg-deep-navy"
                data-testid="button-create-first-post"
              >
                Create First Post
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return renderDashboard();
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
        return (
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8">
              Testimonial Management
            </h1>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <p className="text-gray-600">Testimonial management features coming soon...</p>
            </div>
          </div>
        );
      case "settings":
        return (
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8">
              Settings
            </h1>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <p className="text-gray-600">Settings panel coming soon...</p>
            </div>
          </div>
        );
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
    </>
  );
}
