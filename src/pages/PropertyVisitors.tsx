import { Navigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { propertyVisitors } from "@/data/mockData";
import { User, Calendar, Building2, ChevronRight } from "lucide-react";

const PropertyVisitors = () => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-foreground">Property Visitors</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {propertyVisitors.map((v) => (
          <Link key={v.id} to={`/property-visitors/${v.id}`} className="group rounded-md border bg-card p-4 shadow-sm card-hover transition-shadow hover:shadow-md">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">{v.name}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" /> {v.date}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
            </div>
            <div className="flex items-center gap-2 rounded-sm bg-muted px-3 py-2 text-xs text-muted-foreground">
              <Building2 className="h-3.5 w-3.5 shrink-0" />
              <span className="line-clamp-1">{v.propertyTitle}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PropertyVisitors;

