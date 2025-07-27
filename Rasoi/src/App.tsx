import { useEffect, useState } from "react";
import { Toaster } from "./component/ui/toaster";
import { Toaster as Sonner } from "./component/ui/sonner";
import { TooltipProvider } from "./component/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import supabase  from "./integeration/supabase/supabase";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./component/Auth";
import VendorDashboard from "./component/VendorDashboard";
import SupplierDashboard from "./component/SupplierDashboard";

const queryClient = new QueryClient();

const App = () => {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching user profile:", error);
      }

      setUser(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading RasoiLink...</p>
        </div>
      </div>
    );
  }

  // If no session, show landing page
  if (!session) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  // If session but no user profile, show auth component
  if (!user) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Auth />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  // Show role-based dashboard
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {user.role === "vendor" ? <VendorDashboard /> : <SupplierDashboard />}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;