import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { User, Calendar, Building2, ChevronRight, Loader2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const PropertyVisitors = () => {
  const { isLoggedIn, user } = useAuth();
  const { toast } = useToast();
  const [visitors, setVisitors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchVisitors = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("property_visitors")
          .select("*, properties(title)")
          .eq("owner_id", user.id)
          .order("visited_at", { ascending: false });

        if (error) throw error;
        setVisitors(data || []);
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchVisitors();
  }, [user, toast]);

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-foreground">Property Visitors</h1>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : visitors.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted/60">
            <Eye className="h-12 w-12 text-gray-300" />
          </div>
          <h2 className="mb-2 text-xl font-semibold text-foreground">No Visitors Yet</h2>
          <p className="mb-6 max-w-sm text-center text-sm text-muted-foreground">
            You haven't had any visitors on your properties yet. Once buyers click to view your contact details, they will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visitors.map((v) => (
            <Link key={v.id} to={`/property-visitors/${v.id}`} className="group rounded-md border bg-card p-4 shadow-sm card-hover transition-shadow hover:shadow-md">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <User className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{v.name || "Anonymous Buyer"}</p>
                  <p className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" /> {format(new Date(v.visited_at), "dd MMM yyyy, HH:mm")}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
              </div>
              <div className="flex items-center gap-2 rounded-sm bg-muted px-3 py-2 text-xs text-muted-foreground">
                <Building2 className="h-3.5 w-3.5 shrink-0" />
                <span className="line-clamp-1">{(v.properties as any)?.title || "Unknown Property"}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyVisitors;

