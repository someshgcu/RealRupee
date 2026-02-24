import { useParams, useNavigate, Link } from "react-router-dom";
import { propertyVisitors, properties } from "@/data/mockData";
import {
    ArrowLeft,
    User,
    Calendar,
    Search,
    Phone,
    Building2,
    MapPin,
    ExternalLink,
} from "lucide-react";

const PropertyVisitorDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const visitor = propertyVisitors.find((v) => v.id === id);

    if (!visitor) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <User className="h-10 w-10 text-muted-foreground" />
                </div>
                <h1 className="mb-2 text-2xl font-bold text-foreground">Visitor Not Found</h1>
                <p className="mb-6 text-muted-foreground">
                    This visitor record does not exist or has been removed.
                </p>
                <button
                    onClick={() => navigate("/property-visitors")}
                    className="flex items-center gap-2 rounded-lg bg-[#1a4b8c] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
                >
                    <ArrowLeft className="h-4 w-4" /> Back to Visitors
                </button>
            </div>
        );
    }

    const property = properties.find((p) => p.id === visitor.propertyId);

    return (
        <div className="container mx-auto px-4 py-6">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
                <ArrowLeft className="h-4 w-4" /> Back
            </button>

            <h1 className="mb-6 text-2xl font-bold text-foreground">Visitor Details</h1>

            <div className="grid gap-6 lg:grid-cols-2">
                {/* Visitor Info Card */}
                <div className="rounded-xl border bg-card p-6 shadow-sm">
                    <div className="mb-4 flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1a4b8c]/10">
                            <User className="h-7 w-7 text-[#1a4b8c]" />
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-foreground">{visitor.name}</h2>
                            <p className="text-sm text-muted-foreground">Property Viewer</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {visitor.contact && (
                            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-xs text-muted-foreground">Contact</p>
                                    <p className="text-sm font-medium text-foreground">{visitor.contact}</p>
                                </div>
                            </div>
                        )}
                        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p className="text-xs text-muted-foreground">Date Visited</p>
                                <p className="text-sm font-medium text-foreground">{visitor.date}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                            <Search className="h-4 w-4 text-muted-foreground" />
                            <div>
                                <p className="text-xs text-muted-foreground">Source</p>
                                <p className="text-sm font-medium text-foreground">{visitor.source}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Property Summary Card */}
                {property && (
                    <Link
                        to={`/properties/${property.id}`}
                        className="group rounded-xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
                    >
                        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                            Property Viewed
                        </h3>
                        <img
                            src={property.imageUrl}
                            alt={property.title}
                            className="mb-4 h-40 w-full rounded-lg object-cover"
                        />
                        <h4 className="mb-1 text-lg font-semibold text-foreground group-hover:text-[#1a4b8c]">
                            {property.title}
                        </h4>
                        <p className="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
                            <MapPin className="h-3.5 w-3.5" /> {property.location}
                        </p>
                        <div className="flex items-center justify-between">
                            <p className="text-lg font-bold text-[#1a4b8c]">
                                {property.price >= 10000000
                                    ? `₹${(property.price / 10000000).toFixed(2)} Cr`
                                    : `₹${(property.price / 100000).toFixed(2)} L`}
                            </p>
                            <span className="flex items-center gap-1 text-xs font-medium text-[#1a4b8c]">
                                View Details <ExternalLink className="h-3 w-3" />
                            </span>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default PropertyVisitorDetails;
