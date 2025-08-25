import { useQuery } from "@tanstack/react-query";

export function useAuth() {
  // First try temp user, then regular auth
  const { data: tempUser, isLoading: tempLoading } = useQuery({
    queryKey: ["/api/auth/temp-user"],
    retry: false,
  });

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
    enabled: !tempUser, // Only try regular auth if no temp user
  });

  const currentUser = tempUser || user;
  const isLoading = tempLoading || userLoading;

  return {
    user: currentUser,
    isLoading,
    isAuthenticated: !!currentUser,
  };
}
