import { useAuth } from "@/context/AuthContext";
import { dashboardStats } from "@/data/mockData";
import StatCard from "@/components/StatCard";
import { Building2, Heart, Eye, MessageSquare, Receipt, Coins, PlusCircle } from "lucide-react";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back, {user?.name}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <StatCard title="Add New Property" value="+" icon={PlusCircle} link="/post-property" accent />
        <StatCard title="My Properties" value={dashboardStats.totalProperties} icon={Building2} link="/my-properties" />
        <StatCard title="My Shortlist" value={dashboardStats.shortlistCount} icon={Heart} link="/my-shortlist" />
        <StatCard title="Property Visitors" value={dashboardStats.visitorCount} icon={Eye} link="/property-visitors" />
        <StatCard title="Leads & Enquiries" value={dashboardStats.leadsCount} icon={MessageSquare} link="/leads-enquiries" />
        <StatCard title="Transactions" value={dashboardStats.transactionCount} icon={Receipt} />
        <StatCard title="My Coins" value={dashboardStats.coins} icon={Coins} />
      </div>
    </div>
  );
};

export default Dashboard;
