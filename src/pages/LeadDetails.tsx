import { useParams, useNavigate, Link } from "react-router-dom";
import { leadsAndEnquiries, properties } from "@/data/mockData";
import {
    ArrowLeft,
    User,
    Calendar,
    Phone,
    Mail,
    MessageSquare,
    Building2,
    MapPin,
    ExternalLink,
} from "lucide-react";

const LeadDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const lead = leadsAndEnquiries.find((l) => l.id === id);

    if (!lead) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                    <MessageSquare className="h-10 w-10 text-muted-foreground" />
                </div>
                <h1 className="mb-2 text-2xl font-bold text-foreground">Lead Not Found</h1>
                <p className="mb-6 text-muted-foreground">
                    This lead or enquiry does not exist or has been removed.
                </p>
                <button
                    onClick={() => navigate("/leads-enquiries")}
                    className="flex items-center gap-2 rounded-lg bg-[#1a4b8c] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
                >
                    <ArrowLeft className="h-4 w-4" /> Back to Leads
                </button>
            </div>
        );
    }

    const property = properties.find((p) => p.id === lead.propertyId);

    const statusColor =
        lead.status === "New"
            ? "bg-[#fd7e14]/10 text-[#fd7e14]"
            : lead.status === "Contacted"
                ? "bg-[#1a4b8c]/10 text-[#1a4b8c]"
                : "bg-[#28a745]/10 text-[#28a745]";

    return (
        <div className="container mx-auto px-4 py-6">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
                <ArrowLeft className="h-4 w-4" /> Back
            </button>

            <div className="mb-6 flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">Lead Details</h1>
                <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${statusColor}`}>
                    {lead.status}
                </span>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Lead Info Card */}
                <div className="space-y-6 lg:col-span-2">
                    <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <div className="mb-4 flex items-center gap-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1a4b8c]/10">
                                <User className="h-7 w-7 text-[#1a4b8c]" />
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold text-foreground">{lead.name}</h2>
                                <p className="text-sm text-muted-foreground">Lead / Enquiry</p>
                            </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-xs text-muted-foreground">Phone</p>
                                    <p className="text-sm font-medium text-foreground">{lead.phone}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-xs text-muted-foreground">Email</p>
                                    <p className="text-sm font-medium text-foreground">{lead.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <div>
                                    <p className="text-xs text-muted-foreground">Date Received</p>
                                    <p className="text-sm font-medium text-foreground">{lead.date}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Message Card */}
                    <div className="rounded-xl border bg-card p-6 shadow-sm">
                        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
                            <MessageSquare className="h-4 w-4 text-muted-foreground" />
                            Message
                        </h3>
                        <p className="rounded-lg bg-muted/50 p-4 leading-relaxed text-foreground">
                            {lead.message}
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-3">
                        <a
                            href={`tel:${lead.phone.replace(/\s/g, "")}`}
                            className="flex items-center gap-2 rounded-lg bg-[#fd7e14] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e8710e]"
                        >
                            <Phone className="h-4 w-4" /> Call Lead
                        </a>
                        <a
                            href={`mailto:${lead.email}`}
                            className="flex items-center gap-2 rounded-lg bg-[#1a4b8c] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#153d73]"
                        >
                            <Mail className="h-4 w-4" /> Email Lead
                        </a>
                    </div>
                </div>

                {/* Property Summary Card */}
                {property && (
                    <div>
                        <Link
                            to={`/properties/${property.id}`}
                            className="group block rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
                        >
                            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                Inquiring About
                            </h3>
                            <img
                                src={property.imageUrl}
                                alt={property.title}
                                className="mb-3 h-36 w-full rounded-lg object-cover"
                            />
                            <h4 className="mb-1 font-semibold text-foreground group-hover:text-[#1a4b8c]">
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
                                    View <ExternalLink className="h-3 w-3" />
                                </span>
                            </div>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeadDetails;
