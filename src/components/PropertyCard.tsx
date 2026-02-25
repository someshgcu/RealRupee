import { useState } from "react";
import {
  Heart,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Shield,
  FileText,
  Upload,
  X,
  CheckCircle,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Property, formatPrice } from "@/data/mockData";

interface PropertyCardProps {
  property: Property;
  onShortlist?: () => void;
  isShortlisted?: boolean;
  showStatus?: boolean;
  selectMode?: boolean;
  onSelectForService?: (id: string) => void;
}

const PropertyCard = ({
  property,
  onShortlist,
  isShortlisted,
  showStatus,
  selectMode,
  onSelectForService,
}: PropertyCardProps) => {
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [uploadFileName, setUploadFileName] = useState("");

  const hasLegalOpinion = property.isValidated;

  const handleLegalClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowLegalModal(true);
  };

  const handleSelectForService = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSelectForService?.(property.id);
  };

  const cardContent = (
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
          <span
            className={`absolute right-3 top-3 rounded-sm px-2 py-0.5 text-xs font-medium ${property.status === "Active"
                ? "bg-success text-success-foreground"
                : property.status === "Awaiting Approval"
                  ? "bg-accent text-accent-foreground"
                  : property.status === "Under Review"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
              }`}
          >
            {property.status}
          </span>
        )}
        {onShortlist && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onShortlist();
            }}
            className="absolute right-3 top-3 rounded-full bg-card/80 p-1.5 backdrop-blur-sm transition-colors hover:bg-card"
          >
            <Heart
              className={`h-4 w-4 ${isShortlisted ? "fill-destructive text-destructive" : "text-muted-foreground"}`}
            />
          </button>
        )}
      </div>
      <div className="p-4">
        <div className="mb-1 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          {property.location}
        </div>
        <h3 className="mb-2 line-clamp-1 text-sm font-semibold text-foreground">
          {property.title}
        </h3>
        <p className="mb-3 text-lg font-bold text-primary">
          {formatPrice(property.price)}
        </p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {property.beds > 0 && (
            <span className="flex items-center gap-1">
              <Bed className="h-3.5 w-3.5" /> {property.beds} Beds
            </span>
          )}
          {property.baths > 0 && (
            <span className="flex items-center gap-1">
              <Bath className="h-3.5 w-3.5" /> {property.baths} Baths
            </span>
          )}
          <span className="flex items-center gap-1">
            <Maximize className="h-3.5 w-3.5" /> {property.area}{" "}
            {property.areaUnit}
          </span>
        </div>

        {/* Action Buttons */}
        {(showStatus || selectMode) && (
          <div className="mt-4 flex gap-2 border-t pt-3">
            {selectMode ? (
              <button
                onClick={handleSelectForService}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:opacity-90"
              >
                <CheckCircle className="h-4 w-4" />
                Select for Service
              </button>
            ) : (
              <>
                <button
                  onClick={handleLegalClick}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <FileText className="h-3.5 w-3.5" />
                  View Legal Opinion
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Legal Opinion Modal */}
      {showLegalModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShowLegalModal(false);
          }}
        >
          <div
            className="w-full max-w-md rounded-xl border bg-card p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {hasLegalOpinion ? (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
                      <Eye className="h-5 w-5 text-success" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Legal Opinion
                    </h3>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowLegalModal(false);
                    }}
                    className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="rounded-lg border border-success/20 bg-success/5 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-success" />
                    <span className="text-sm font-medium text-success">
                      Document Available
                    </span>
                  </div>
                  <p className="mb-1 text-sm font-medium text-foreground">
                    {property.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Legal opinion document has been verified and is available for
                    review.
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-center rounded-lg border-2 border-dashed border-muted p-8">
                  <div className="text-center">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground/40" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      Legal_Opinion_{property.id}.pdf
                    </p>
                    <button className="mt-3 rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90">
                      View Document
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                      <Upload className="h-5 w-5 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Upload Legal Opinion
                    </h3>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowLegalModal(false);
                    }}
                    className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">{property.title}</span>
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    No legal opinion document is available for this property.
                    Upload one to get verified.
                  </p>
                </div>
                <div className="mt-4">
                  <label
                    className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted p-8 transition-colors hover:border-primary/30 hover:bg-muted/30"
                  >
                    <Upload className="h-10 w-10 text-muted-foreground/40" />
                    <p className="mt-3 text-sm font-medium text-foreground">
                      {uploadFileName || "Click to upload Legal Opinion PDF"}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      PDF format, max 10MB
                    </p>
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setUploadFileName(file.name);
                      }}
                    />
                  </label>
                  {uploadFileName && (
                    <button className="mt-4 w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:opacity-90">
                      Upload Document
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // If in select mode, don't wrap card in a link
  if (selectMode) {
    return cardContent;
  }

  return (
    <Link to={`/properties/${property.id}`} className="block">
      {cardContent}
    </Link>
  );
};

export default PropertyCard;
