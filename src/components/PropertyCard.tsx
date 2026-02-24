import { Heart, MapPin, Bed, Bath, Maximize, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Property, formatPrice } from "@/data/mockData";

interface PropertyCardProps {
  property: Property;
  onShortlist?: () => void;
  isShortlisted?: boolean;
  showStatus?: boolean;
}

const PropertyCard = ({ property, onShortlist, isShortlisted, showStatus }: PropertyCardProps) => {
  return (
    <Link to={`/properties/${property.id}`} className="block">
      <div className="group overflow-hidden rounded-md border bg-card shadow-sm card-hover">
        <div className="relative">
          <img
            src={property.imageUrl}
            alt={property.title}
            className="h-48 w-full object-cover"
            loading="lazy"
          />
          {property.isValidated && (
            <span className="absolute left-3 top-3 flex items-center gap-1 rounded-sm bg-success px-2 py-0.5 text-xs font-medium text-success-foreground">
              <Shield className="h-3 w-3" /> Validated
            </span>
          )}
          {showStatus && (
            <span className={`absolute right-3 top-3 rounded-sm px-2 py-0.5 text-xs font-medium ${property.status === "Active" ? "bg-success text-success-foreground" :
                property.status === "Awaiting Approval" ? "bg-accent text-accent-foreground" :
                  property.status === "Under Review" ? "bg-primary text-primary-foreground" :
                    "bg-muted text-muted-foreground"
              }`}>
              {property.status}
            </span>
          )}
          {onShortlist && (
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onShortlist(); }}
              className="absolute right-3 top-3 rounded-full bg-card/80 p-1.5 backdrop-blur-sm transition-colors hover:bg-card"
            >
              <Heart className={`h-4 w-4 ${isShortlisted ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
            </button>
          )}
        </div>
        <div className="p-4">
          <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {property.location}
          </div>
          <h3 className="mb-2 line-clamp-1 text-sm font-semibold text-foreground">{property.title}</h3>
          <p className="mb-3 text-lg font-bold text-primary">
            {formatPrice(property.price)}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {property.beds > 0 && (
              <span className="flex items-center gap-1"><Bed className="h-3.5 w-3.5" /> {property.beds} Beds</span>
            )}
            {property.baths > 0 && (
              <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5" /> {property.baths} Baths</span>
            )}
            <span className="flex items-center gap-1"><Maximize className="h-3.5 w-3.5" /> {property.area} {property.areaUnit}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;

