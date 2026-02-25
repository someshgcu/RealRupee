import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { MessageSquare, Phone, Mail, Building2, ChevronRight, Loader2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LeadsEnquiries = () => {
  const { isLoggedIn, user } = useAuth();
  const { toast } = useToast();
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchLeads = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("leads_enquiries")
          .select("*, properties(title)")
          .eq("owner_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setLeads(data || []);
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

    fetchLeads();
  }, [user, toast]);

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-foreground">Leads & Enquiries</h1>

      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : leads.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted/60">
            <MessageSquare className="h-12 w-12 text-gray-300" />
          </div>
          <h2 className="mb-2 text-xl font-semibold text-foreground">No Leads Yet</h2>
          <p className="mb-6 max-w-sm text-center text-sm text-muted-foreground">
            You haven't received any leads or enquiries yet. They will appear here once buyers express interest in your properties.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {leads.map((lead) => (
            <Link key={lead.id} to={`/leads-enquiries/${lead.id}`} className="group rounded-md border bg-card p-4 shadow-sm card-hover transition-shadow hover:shadow-md">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">{lead.name}</p>
                <div className="flex items-center gap-2">
                  <span className={`rounded-sm px-2 py-0.5 text-xs font-medium ${lead.status === "New" ? "bg-accent/10 text-accent" :
                    lead.status === "Contacted" ? "bg-primary/10 text-primary" :
                      "bg-muted text-muted-foreground"
                    }`}>
                    {lead.status}
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
              <div className="mb-3 space-y-1.5 text-xs text-muted-foreground">
                <p className="flex items-center gap-1.5"><Phone className="h-3 w-3" /> {lead.phone}</p>
                <p className="flex items-center gap-1.5"><Mail className="h-3 w-3" /> {lead.email}</p>
              </div>
              <div className="mb-3 flex items-start gap-2 rounded-sm bg-muted/50 p-2.5">
                <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <p className="text-xs text-foreground">{lead.message}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Building2 className="h-3.5 w-3.5 shrink-0" />
                <span className="line-clamp-1">{(lead.properties as any)?.title || "Unknown Property"}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default LeadsEnquiries;

