import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { properties } from "@/data/mockData";
import PropertyCard from "@/components/PropertyCard";

const MyShortlist = () => {
  const { isLoggedIn } = useAuth();
  const [shortlisted] = useState(properties.filter((p) => p.isValidated).slice(0, 4));

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-foreground">My Shortlist</h1>
      {shortlisted.length === 0 ? (
        <p className="text-muted-foreground">No shortlisted properties.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shortlisted.map((p) => (
            <PropertyCard key={p.id} property={p} isShortlisted onShortlist={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyShortlist;
