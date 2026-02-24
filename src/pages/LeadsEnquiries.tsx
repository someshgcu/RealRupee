import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { leadsAndEnquiries } from "@/data/mockData";
import { MessageSquare, Phone, Mail, Building2 } from "lucide-react";

const LeadsEnquiries = () => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-foreground">Leads & Enquiries</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {leadsAndEnquiries.map((lead) => (
          <div key={lead.id} className="rounded-md border bg-card p-4 shadow-sm card-hover">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">{lead.name}</p>
              <span className={`rounded-sm px-2 py-0.5 text-xs font-medium ${
                lead.status === "New" ? "bg-accent/10 text-accent" :
                lead.status === "Contacted" ? "bg-primary/10 text-primary" :
                "bg-muted text-muted-foreground"
              }`}>
                {lead.status}
              </span>
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
              <span className="line-clamp-1">{lead.propertyTitle}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadsEnquiries;
