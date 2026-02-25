import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import PropertyCard from "@/components/PropertyCard";
import { Heart, Search, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const MyShortlist = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [shortlisted, setShortlisted] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchShortlist = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("shortlists")
          .select(`
            *,
            properties (
              *,
              property_images (image_url)
            )
          `)
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;

        // Flatten the data: extract property objects from shortlists
        const flattened = (data || [])
          .map((s: any) => s.properties)
          .filter(Boolean);

        setShortlisted(flattened);
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

    fetchShortlist();
  }, [user, toast]);

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-foreground">My Shortlist</h1>
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : shortlisted.length === 0 ? (
        /* Elegant Empty State */
        <div className="flex flex-col items-center justify-center py-20">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted/60">
            <Heart className="h-12 w-12 text-gray-300" />
          </div>
          <h2 className="mb-2 text-xl font-semibold text-foreground">
            Your Shortlist is Empty
          </h2>
          <p className="mb-6 max-w-sm text-center text-sm text-muted-foreground">
            Your shortlist is empty. Save your favorite properties here to
            compare and revisit them later.
          </p>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 hover:shadow-lg"
          >
            <Search className="h-4 w-4" />
            Explore Properties
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shortlisted.map((p) => (
            <PropertyCard
              key={p.id}
              property={p}
              isShortlisted
              onShortlist={() => { }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyShortlist;
