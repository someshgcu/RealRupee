import { useParams, useNavigate, Link } from "react-router-dom";
import { properties, formatPrice } from "@/data/mockData";
import {
    MapPin,
    Bed,
    Bath,
    Wind,
    Compass,
    Maximize,
    Shield,
    Phone,
    Mail,
    ArrowLeft,
    ExternalLink,
    ShieldCheck,
    ParkingCircle,
    Dumbbell,
    Waves,
    Lock,
    Building2,
    Trophy,
    Baby,
    Car,
    Zap,
    BookOpen,
    Flower2,
    Footprints,
    Gamepad2,
    DoorOpen,
    CloudRain,
    Droplets,
    Users,
    Lamp,
    CloudLightning,
    Cctv,
    Youtube,
} from "lucide-react";
import { BackButton } from "@/components/BackButton";

const amenityIconMap: Record<string, React.ElementType> = {
    "24 X 7 Security": ShieldCheck,
    Amphitheater: Trophy,
    "Banquet Hall": DoorOpen,
    "Basketball Court": Trophy,
    "Car Parking": ParkingCircle,
    CCTV: Cctv,
    "Children Play Area": Baby,
    "Closed Car Parking": Car,
    "Club House": Building2,
    "Gated Community": Lock,
    Gymnasium: Dumbbell,
    "Indoor Games": Gamepad2,
    Intercom: Phone,
    "Jogging Track": Footprints,
    "Landscaped Gardens": Flower2,
    Library: BookOpen,
    "Multipurpose Room": DoorOpen,
    "Power Backup": Zap,
    "Rain Water Harvesting": CloudRain,
    "Sewage Treatment Plant": Droplets,
    "Staff Quarter": Users,
    "Street Lighting": Lamp,
    "Storm Water Drains": CloudLightning,
    "Swimming Pool": Waves,
    "Vaastu Compliant": Compass,
};

const PropertyDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const property = properties.find((p) => p.id === id);

    if (!property) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <Building2 className="h-10 w-10 text-muted-foreground" />
                </div>
                <h1 className="mb-2 text-2xl font-bold text-foreground">Property Not Found</h1>
                <p className="mb-6 text-muted-foreground">
                    The property you are looking for does not exist or has been removed.
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 rounded-lg bg-[#1a4b8c] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
                >
                    <ArrowLeft className="h-4 w-4" /> Back to Home
                </button>
            </div>
        );
    }

    // Generate gallery images (using the main image + variations)
    const galleryImages = [
        property.imageUrl,
        property.imageUrl.replace("w=600", "w=601"),
        property.imageUrl.replace("w=600", "w=602"),
        property.imageUrl.replace("w=600", "w=603"),
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Back Navigation */}
            <div className="container mx-auto px-4 py-4">
                <BackButton />
            </div>

            {/* Media Gallery */}
            <section className="container mx-auto px-4">
                <div className="grid gap-2 md:grid-cols-4 md:grid-rows-2">
                    <div className="overflow-hidden rounded-xl md:col-span-3 md:row-span-2">
                        <img
                            src={galleryImages[0]}
                            alt={property.title}
                            className="h-64 w-full object-cover md:h-[420px]"
                        />
                    </div>
                    {galleryImages.slice(1).map((img, i) => (
                        <div key={i} className="hidden overflow-hidden rounded-xl md:block">
                            <img
                                src={img}
                                alt={`${property.title} ${i + 2}`}
                                className="h-[136px] w-full object-cover"
                            />
                        </div>
                    ))}
                </div>
                {/* Mobile thumbnail row */}
                <div className="mt-2 flex gap-2 overflow-x-auto md:hidden">
                    {galleryImages.slice(1).map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            alt={`Thumbnail ${i + 2}`}
                            className="h-16 w-20 shrink-0 rounded-lg object-cover"
                        />
                    ))}
                </div>
            </section>

            {/* Content + Sidebar */}
            <div className="container mx-auto px-4 py-6">
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Header Section */}
                        <div>
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                                {property.isValidated && (
                                    <span className="flex items-center gap-1 rounded-md bg-[#28a745]/10 px-2.5 py-1 text-xs font-semibold text-[#28a745]">
                                        <Shield className="h-3.5 w-3.5" /> RR Validated
                                    </span>
                                )}
                                <span className="rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                                    {property.type} - {property.subtype}
                                </span>
                                {property.status !== "Active" && (
                                    <span className="rounded-md bg-[#fd7e14]/10 px-2.5 py-1 text-xs font-medium text-[#fd7e14]">
                                        {property.status}
                                    </span>
                                )}
                            </div>
                            <h1 className="mb-1 text-2xl font-bold text-foreground md:text-3xl">
                                {property.title}
                            </h1>
                            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" /> {property.location}
                            </p>
                            <p className="mt-3 text-3xl font-bold text-[#1a4b8c]">
                                {formatPrice(property.price)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {formatPrice(property.pricePerSqft)} per {property.areaUnit}
                            </p>
                        </div>

                        {/* Key Specs Bar */}
                        <div className="grid grid-cols-2 gap-3 rounded-xl border bg-card p-4 sm:grid-cols-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-[#1a4b8c]/10 p-2">
                                    <Maximize className="h-5 w-5 text-[#1a4b8c]" />
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-foreground">{property.area}</p>
                                    <p className="text-xs text-muted-foreground">{property.areaUnit}</p>
                                </div>
                            </div>
                            {property.beds > 0 && (
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-[#1a4b8c]/10 p-2">
                                        <Bed className="h-5 w-5 text-[#1a4b8c]" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-foreground">{property.beds}</p>
                                        <p className="text-xs text-muted-foreground">Bedrooms</p>
                                    </div>
                                </div>
                            )}
                            {property.baths > 0 && (
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-[#1a4b8c]/10 p-2">
                                        <Bath className="h-5 w-5 text-[#1a4b8c]" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-foreground">{property.baths}</p>
                                        <p className="text-xs text-muted-foreground">Bathrooms</p>
                                    </div>
                                </div>
                            )}
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-[#1a4b8c]/10 p-2">
                                    <Compass className="h-5 w-5 text-[#1a4b8c]" />
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-foreground">{property.facing}</p>
                                    <p className="text-xs text-muted-foreground">Facing</p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="rounded-xl border bg-card p-5">
                            <h2 className="mb-3 text-lg font-semibold text-foreground">Description</h2>
                            <p className="leading-relaxed text-muted-foreground">{property.description}</p>
                        </div>

                        {/* Amenities Grid */}
                        {property.amenities.length > 0 && (
                            <div className="rounded-xl border bg-card p-5">
                                <h2 className="mb-4 text-lg font-semibold text-foreground">Amenities & Features</h2>
                                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                                    {property.amenities.map((a) => {
                                        const IconComp = amenityIconMap[a] || Shield;
                                        return (
                                            <div
                                                key={a}
                                                className="flex items-center gap-2.5 rounded-lg border bg-background p-3"
                                            >
                                                <div className="rounded-md bg-[#28a745]/10 p-1.5">
                                                    <IconComp className="h-4 w-4 text-[#28a745]" />
                                                </div>
                                                <span className="text-sm font-medium text-foreground">{a}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Additional Info */}
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-xl border bg-card p-5">
                                <h3 className="mb-2 text-sm font-semibold text-foreground">Property Details</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Type</span>
                                        <span className="font-medium text-foreground">{property.type}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Sub Type</span>
                                        <span className="font-medium text-foreground">{property.subtype}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Facing</span>
                                        <span className="font-medium text-foreground">{property.facing}</span>
                                    </div>
                                    {property.balconies > 0 && (
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Balconies</span>
                                            <span className="font-medium text-foreground">{property.balconies}</span>
                                        </div>
                                    )}
                                    {property.parking > 0 && (
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Car Parking</span>
                                            <span className="font-medium text-foreground">{property.parking}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="rounded-xl border bg-card p-5">
                                <h3 className="mb-2 text-sm font-semibold text-foreground">Listing Info</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Status</span>
                                        <span className="font-medium text-foreground">{property.status}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Posted On</span>
                                        <span className="font-medium text-foreground">{property.postedDate}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">City</span>
                                        <span className="font-medium text-foreground">{property.city}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Validation</span>
                                        <span className={`font-medium ${property.isValidated ? "text-[#28a745]" : "text-muted-foreground"}`}>
                                            {property.isValidated ? "Verified" : "Pending"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar — Sticky Action Card (Desktop) */}
                    <div className="hidden lg:block">
                        <div className="sticky top-20 space-y-4 rounded-xl border bg-card p-5 shadow-sm">
                            <h3 className="text-lg font-semibold text-foreground">Seller Contact</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                                    <Phone className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Phone</p>
                                        <p className="text-sm font-medium text-foreground">+91 98765 43210</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Email</p>
                                        <p className="text-sm font-medium text-foreground">seller@realrupee.com</p>
                                    </div>
                                </div>
                            </div>
                            <button className="w-full rounded-lg bg-[#fd7e14] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e8710e]">
                                Contact Seller
                            </button>
                            <button className="w-full rounded-lg bg-[#1a4b8c] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#153d73]">
                                Request Legal Opinion
                            </button>
                            {property.isFeatured && (
                                <p className="text-center text-xs text-muted-foreground">
                                    Featured listing with priority support
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Fixed Bottom Action Bar */}
            <div className="fixed bottom-16 left-0 right-0 z-40 border-t bg-card p-3 shadow-lg lg:hidden">
                <div className="flex gap-2">
                    <button className="flex-1 rounded-lg bg-[#fd7e14] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e8710e]">
                        Contact Seller
                    </button>
                    <button className="flex-1 rounded-lg bg-[#1a4b8c] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#153d73]">
                        Request Legal Opinion
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;
