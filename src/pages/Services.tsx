import ServiceCard from "@/components/ServiceCard";

const services = [
  {
    name: "Property Validation",
    price: "999",
    description: "Complete legal verification of property documents by certified professionals.",
    features: [
      "Title deed verification",
      "Encumbrance certificate check",
      "RERA compliance audit",
      "Legal opinion report",
      "Delivered within 7 business days",
    ],
  },
  {
    name: "Auction Services",
    price: "4,999",
    description: "Professional auction management for premium property sales with maximum reach.",
    features: [
      "Dedicated auction manager",
      "Marketing and promotion",
      "Verified bidder screening",
      "Legal documentation support",
      "Post-auction settlement",
      "Priority listing for 30 days",
    ],
    highlighted: true,
  },
  {
    name: "Group Buying",
    price: "9,999",
    description: "Pool resources with verified buyers for premium properties at negotiated prices.",
    features: [
      "Curated buyer groups",
      "Bulk negotiation support",
      "Legal pooling agreements",
      "Escrow payment management",
      "Dedicated relationship manager",
    ],
  },
];

const Services = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-foreground">Our Services</h1>
        <p className="mt-2 text-muted-foreground">Enterprise-grade real estate services for buyers and sellers</p>
      </div>
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        {services.map((s) => (
          <ServiceCard key={s.name} {...s} />
        ))}
      </div>
    </div>
  );
};

export default Services;
