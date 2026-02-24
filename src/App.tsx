import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MyProperties from "./pages/MyProperties";
import MyShortlist from "./pages/MyShortlist";
import PropertyVisitors from "./pages/PropertyVisitors";
import LeadsEnquiries from "./pages/LeadsEnquiries";
import PostProperty from "./pages/PostProperty";
import Services from "./pages/Services";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/my-properties" element={<MyProperties />} />
              <Route path="/my-shortlist" element={<MyShortlist />} />
              <Route path="/property-visitors" element={<PropertyVisitors />} />
              <Route path="/leads-enquiries" element={<LeadsEnquiries />} />
              <Route path="/post-property" element={<PostProperty />} />
              <Route path="/services" element={<Services />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
