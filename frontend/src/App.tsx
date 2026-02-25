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
import PropertyVisitorDetails from "./pages/PropertyVisitorDetails";
import LeadsEnquiries from "./pages/LeadsEnquiries";
import LeadDetails from "./pages/LeadDetails";
import PostProperty from "./pages/PostProperty";
import Services from "./pages/Services";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import Transactions from "./pages/Transactions";
import TransactionDetails from "./pages/TransactionDetails";
import MyCoins from "./pages/MyCoins";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Disclaimer from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";

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
              <Route path="/property-visitors/:id" element={<PropertyVisitorDetails />} />
              <Route path="/leads-enquiries" element={<LeadsEnquiries />} />
              <Route path="/leads-enquiries/:id" element={<LeadDetails />} />
              <Route path="/post-property" element={<PostProperty />} />
              <Route path="/services" element={<Services />} />
              <Route path="/properties" element={<Properties />} />
              <Route path="/properties/:id" element={<PropertyDetails />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/transactions/:id" element={<TransactionDetails />} />
              <Route path="/my-coins" element={<MyCoins />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsConditions />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

