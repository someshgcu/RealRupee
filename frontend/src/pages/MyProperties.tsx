import { useState, useEffect } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import PropertyCard from "@/components/PropertyCard";
import { Home, Info, Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BackButton } from "@/components/BackButton";

const MyProperties = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [userProps, setUserProps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const action = searchParams.get("action");
  const serviceName = searchParams.get("service");
  const isSelectMode = action === "selectForService";

  useEffect(() => {
    if (!user) return;

    const fetchMyProperties = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*, property_images(image_url)")
          .eq("seller_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setUserProps(data || []);
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

    fetchMyProperties();
  }, [user, toast]);

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  const handleSelectForService = (propertyId: string) => {
    const property = userProps.find((p) => p.id === propertyId);
    toast({
      title: "Property Selected",
      description: `"${property?.title}" selected for ${serviceName || "RealRupee service"}. Redirecting to payment...`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Service Selection Alert */}
      {isSelectMode && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 px-5 py-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-semibold text-primary">
              Now please select a property for which you'd like to purchase
              RealRupee service.
            </p>
            {serviceName && (
              <p className="mt-1 text-xs text-primary/70">
                Service: {serviceName}
              </p>
            )}
          </div>
        </div>
      )}

      <h1 className="mb-6 text-2xl font-bold text-foreground">My Properties</h1>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : userProps.length === 0 ? (
        /* Elegant Empty State */
        <div className="flex flex-col items-center justify-center py-20">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted/60">
            <Home className="h-12 w-12 text-gray-300" />
          </div>
          <h2 className="mb-2 text-xl font-semibold text-foreground">
            No Properties Listed
          </h2>
          <p className="mb-6 max-w-sm text-center text-sm text-muted-foreground">
            You haven't listed any properties yet. Start by posting your first
            property and reach thousands of potential buyers.
          </p>
          <button
            onClick={() => navigate("/post-property")}
            className="flex items-center gap-2 rounded-lg bg-accent px-8 py-3 text-sm font-semibold text-accent-foreground shadow-md transition-all hover:opacity-90 hover:shadow-lg"
          >
            <Plus className="h-4 w-4" />
            Post Property Free
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {userProps.map((p) => (
            <PropertyCard
              key={p.id}
              property={p}
              showStatus={!isSelectMode}
              selectMode={isSelectMode}
              onSelectForService={handleSelectForService}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProperties;
