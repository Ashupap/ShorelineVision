import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Suspense, lazy } from "react";
import { useAuth } from "@/hooks/useAuth";

// Lazy load pages for better performance
const Home = lazy(() => import("@/pages/home"));
const AboutUs = lazy(() => import("@/pages/about-us"));
const Products = lazy(() => import("@/pages/products"));
const Sustainability = lazy(() => import("@/pages/sustainability"));
const Media = lazy(() => import("@/pages/media"));
const Contact = lazy(() => import("@/pages/contact"));
const Blog = lazy(() => import("@/pages/blog"));
const Admin = lazy(() => import("@/pages/admin"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex items-center space-x-3">
      <div className="w-8 h-8 border-4 border-ocean-blue border-t-transparent rounded-full animate-spin"></div>
      <span className="text-ocean-blue font-medium">Loading...</span>
    </div>
  </div>
);

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about-us" component={AboutUs} />
        <Route path="/products" component={Products} />
        <Route path="/sustainability" component={Sustainability} />
        <Route path="/media" component={Media} />
        <Route path="/contact" component={Contact} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={Blog} />
        {isAuthenticated && <Route path="/meadmin" component={Admin} />}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
