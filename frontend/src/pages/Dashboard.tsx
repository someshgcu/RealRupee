import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import StatCard from "@/components/StatCard";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import {
  Building2,
  Heart,
  Eye,
  MessageSquare,
  Receipt,
  Coins,
  PlusCircle,
  Loader2,
} from "lucide-react";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { isLoggedIn, user, profile } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState({
    totalProperties: 0,
    shortlistCount: 0,
    visitorCount: 0,
    leadsCount: 0,
    transactionCount: 0,
    coins: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      setLoading(true);
      try {
        // Parallel aggregation queries
        const [
          { count: propCount, error: propError },
          { count: favCount, error: favError },
          { count: visitorCount, error: visitorError },
          { count: leadCount, error: leadError },
          { count: transCount, error: transError },
        ] = await Promise.all([
          supabase.from("properties").select("id", { count: "exact", head: true }).eq("seller_id", user.id),
          supabase.from("shortlists").select("id", { count: "exact", head: true }).eq("user_id", user.id),
          supabase.from("property_visitors").select("id", { count: "exact", head: true }).eq("owner_id", user.id),
          supabase.from("leads_enquiries").select("id", { count: "exact", head: true }).eq("owner_id", user.id),
          supabase.from("service_transactions").select("id", { count: "exact", head: true }).eq("user_id", user.id),
        ]);

        if (propError || favError || visitorError || leadError || transError) {
          throw new Error("One or more statistics failed to load.");
        }

        setStats({
          totalProperties: propCount || 0,
          shortlistCount: favCount || 0,
          visitorCount: visitorCount || 0,
          leadsCount: leadCount || 0,
          transactionCount: transCount || 0,
          coins: profile?.coins_balance || 0,
        });
      } catch (error: any) {
        toast({
          title: "Statistics Error",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, profile, toast]);

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back, {profile?.full_name || user?.email}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <StatCard
          title="Add New Property"
          value="+"
          icon={PlusCircle}
          link="/post-property"
          accent
        />
        <StatCard
          title="My Properties"
          value={stats.totalProperties}
          icon={Building2}
          link="/my-properties"
        />
        <StatCard
          title="My Shortlist"
          value={stats.shortlistCount}
          icon={Heart}
          link="/my-shortlist"
        />
        <StatCard
          title="Property Visitors"
          value={stats.visitorCount}
          icon={Eye}
          link="/property-visitors"
        />
        <StatCard
          title="Leads & Enquiries"
          value={stats.leadsCount}
          icon={MessageSquare}
          link="/leads-enquiries"
        />
        <StatCard
          title="Transactions"
          value={stats.transactionCount}
          icon={Receipt}
          link="/transactions"
        />
        <StatCard
          title="My Coins"
          value={stats.coins}
          icon={Coins}
          link="/my-coins"
        />
      </div>
    </div>
  );
};

export default Dashboard;
