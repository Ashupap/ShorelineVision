import { motion } from "framer-motion";
import { X, BarChart3, FileText, Star, Cog, Fish, Edit3, Image, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function AdminSidebar({ activeSection, onSectionChange }: AdminSidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "content", label: "Website Content", icon: Edit3 },
    { id: "media", label: "Media Library", icon: Image },
    { id: "blog", label: "Blog Management", icon: FileText },
    { id: "products", label: "Products", icon: Fish },
    { id: "testimonials", label: "Testimonials", icon: Star },
    { id: "inquiries", label: "Inquiries", icon: Mail },
    { id: "settings", label: "Website Settings", icon: Globe },
  ];

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const goToHome = () => {
    window.location.href = "/";
  };

  return (
    <motion.div
      initial={{ x: -264 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-full w-64 bg-deep-navy text-white p-6 z-50 shadow-2xl"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-heading font-bold">Admin Panel</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={goToHome}
          className="text-white hover:bg-ocean-blue"
          data-testid="button-close-admin"
        >
          <X size={20} />
        </Button>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ x: 4 }}
            onClick={() => onSectionChange(item.id)}
            className={`w-full text-left p-3 rounded-lg transition-colors flex items-center ${
              activeSection === item.id
                ? "bg-ocean-blue text-white"
                : "text-light-marine hover:bg-ocean-blue/50 hover:text-white"
            }`}
            data-testid={`button-nav-${item.id}`}
          >
            <item.icon size={20} className="mr-3" />
            {item.label}
          </motion.button>
        ))}
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full text-white border-white hover:bg-white hover:text-deep-navy"
          data-testid="button-logout"
        >
          Logout
        </Button>
      </div>
    </motion.div>
  );
}
