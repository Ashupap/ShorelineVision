import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  // Try to get user from either temp auth or regular auth
  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}
