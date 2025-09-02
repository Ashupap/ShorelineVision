import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Suspense, lazy } from "react";
import { useAuth } from "@/hooks/useAuth";
import BeautifulLoader from "@/components/ui/beautiful-loader";

// Lazy load pages for better performance
const Home = lazy(() => import("@/pages/home"));
const AboutUs = lazy(() => import("@/pages/about-us"));
const Products = lazy(() => import("@/pages/products"));
const Sustainability = lazy(() => import("@/pages/sustainability"));
const Media = lazy(() => import("@/pages/media"));
const Contact = lazy(() => import("@/pages/contact"));
const Blog = lazy(() => import("@/pages/blog"));
const SubmitTestimonial = lazy(() => import("@/pages/submit-testimonial"));
const Admin = lazy(() => import("@/pages/admin"));
const TempLogin = lazy(() => import("@/pages/temp-login"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Beautiful loading component

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  return (
    <Suspense fallback={<BeautifulLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about-us" component={AboutUs} />
        <Route path="/products" component={Products} />
        <Route path="/sustainability" component={Sustainability} />
        <Route path="/media" component={Media} />
        <Route path="/contact" component={Contact} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={Blog} />
        <Route path="/submit-testimonial" component={SubmitTestimonial} />
        <Route path="/temp-login" component={TempLogin} />
        <Route path="/admin" component={Admin} />
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
