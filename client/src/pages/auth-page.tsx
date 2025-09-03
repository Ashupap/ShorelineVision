import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Redirect } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Fish, Shield, Globe, Users } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const { user, isLoading, loginMutation, registerMutation } = useAuth();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    },
  });

  // Redirect if already logged in
  if (!isLoading && user) {
    return <Redirect to="/admin" />;
  }

  const onLogin = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const onRegister = (data: RegisterFormData) => {
    const cleanData = {
      ...data,
      email: data.email || undefined,
      firstName: data.firstName || undefined,
      lastName: data.lastName || undefined,
    };
    registerMutation.mutate(cleanData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-4rem)]">
          {/* Left Column - Auth Forms */}
          <div className="flex items-center justify-center">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Fish className="h-8 w-8 text-blue-600" />
                  <span className="text-2xl font-bold text-blue-600">Alashore Marine</span>
                </div>
                <CardTitle className="text-2xl">Admin Access</CardTitle>
                <CardDescription>
                  Sign in to manage your seafood export business
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                    <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-username">Username</Label>
                        <Input
                          id="login-username"
                          data-testid="input-login-username"
                          {...loginForm.register("username")}
                          placeholder="Enter your username"
                          disabled={loginMutation.isPending}
                        />
                        {loginForm.formState.errors.username && (
                          <p className="text-sm text-destructive">
                            {loginForm.formState.errors.username.message}
                          </p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="login-password">Password</Label>
                        <Input
                          id="login-password"
                          data-testid="input-login-password"
                          type="password"
                          {...loginForm.register("password")}
                          placeholder="Enter your password"
                          disabled={loginMutation.isPending}
                        />
                        {loginForm.formState.errors.password && (
                          <p className="text-sm text-destructive">
                            {loginForm.formState.errors.password.message}
                          </p>
                        )}
                      </div>
                      
                      <Button
                        type="submit"
                        data-testid="button-login"
                        className="w-full"
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            Signing in...
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </form>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Hero Section */}
          <div className="hidden lg:block">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                  Premium Seafood
                  <span className="text-blue-600 block">Exports</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                  Manage your global seafood export operations with our comprehensive admin platform
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
                <div className="text-center p-4 bg-white/50 dark:bg-white/5 rounded-lg backdrop-blur-sm">
                  <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Secure</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Protected admin access</p>
                </div>
                <div className="text-center p-4 bg-white/50 dark:bg-white/5 rounded-lg backdrop-blur-sm">
                  <Globe className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Global</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Worldwide export reach</p>
                </div>
                <div className="text-center p-4 bg-white/50 dark:bg-white/5 rounded-lg backdrop-blur-sm">
                  <Fish className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Quality</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Premium seafood products</p>
                </div>
                <div className="text-center p-4 bg-white/50 dark:bg-white/5 rounded-lg backdrop-blur-sm">
                  <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Trusted</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Reliable partnerships</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}