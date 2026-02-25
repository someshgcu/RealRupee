import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { properties } from "@/data/mockData";
import PropertyCard from "@/components/PropertyCard";
import { Heart, Search } from "lucide-react";

const MyShortlist = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [shortlisted] = useState(
    properties.filter((p) => p.isValidated).slice(0, 4)
  );

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-foreground">My Shortlist</h1>
      {shortlisted.length === 0 ? (
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
