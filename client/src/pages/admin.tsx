import { useAuth } from "@/hooks/use-auth";
import AdminDashboard from "@/components/admin/admin-dashboard";
import { Loader2 } from "lucide-react";

export default function Admin() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // This page is protected by ProtectedRoute with requireAdmin
  // so we know the user is authenticated and has admin role
  return <AdminDashboard />;
}
