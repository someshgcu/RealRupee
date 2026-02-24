import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { properties } from "@/data/mockData";
import PropertyCard from "@/components/PropertyCard";

const MyProperties = () => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  const userProps = properties.filter((p) => p.ownerId === "u1");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-foreground">My Properties</h1>
      {userProps.length === 0 ? (
        <p className="text-muted-foreground">You haven't posted any properties yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {userProps.map((p) => (
            <PropertyCard key={p.id} property={p} showStatus />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProperties;
