import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, X, ShieldCheck, Users, Gavel, Info } from "lucide-react";
import { BackButton } from "@/components/BackButton";

interface ServiceInfo {
  name: string;
  price: string;
  description: string;
  linkText: string;
  category: "buyer" | "seller";
}

const services: ServiceInfo[] = [
  {
    name: "Property Validation",
    price: "₹999",
    description:
      "RealRupee's property validation ensures legality, while safeguarding buyers interests. Property validation ensures properties are free from litigations, confirms lawful ownership. Documents are validated by seasoned legal advocates to streamline the buying process for quicker transactions and easy loan approvals. Legally validated properties get higher visibility on the website, enhancing marketability",
    linkText: "Learn More...",
    category: "buyer",
  },
  {
    name: "Group Buying",
    price: "₹9999",
    description:
      "RealRupee Group Buying Service is a unique platform leveraging volume discount strategies to generate quick leads. Offers group property discounts to boost buying decisions and generate more leads. Maximizes property exposure on the website and social platforms. Publishers can extend deadlines up to 3 months for group completion.",
    linkText: "Learn More...",
    category: "buyer",
  },
  {
    name: "Auction",
    price: "₹4999",
    description:
      "RealRupee Online Auctions offers a transparent, high-visibility platform for property auctions, significantly increasing lead generation. Free participation for registered users, making it accessible and risk-free. No immediate exchange of contracts allows time for the final decision, protecting both buyers and sellers. Ideal for bankers to auction foreclosure properties and attract buyers profitably.",
    linkText: "Learn More...",
    category: "seller",
  },
];

const ServiceCard = ({
  service,
  icon: Icon,
  onBuy,
}: {
  service: ServiceInfo;
  icon: typeof ShieldCheck;
  onBuy: () => void;
}) => (
  <div className="group flex flex-col rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:border-primary/30">
    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <h3 className="text-xl font-semibold text-foreground">{service.name}</h3>
    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
      {service.description}
    </p>
    <div className="mt-5">
      <button className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:underline">
        {service.linkText} <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </div>
    <div className="mt-4 border-t pt-4">
      <p className="text-3xl font-bold text-foreground">{service.price}</p>
      <p className="text-xs text-muted-foreground">one-time fee</p>
      <button
        onClick={onBuy}
        className="mt-3 w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground transition-colors hover:opacity-90"
      >
        Buy / Avail
      </button>
    </div>
  </div>
);

const Services = () => {
  const navigate = useNavigate();
  const [showBanner, setShowBanner] = useState(true);

  const buyerServices = services.filter((s) => s.category === "buyer");
  const sellerServices = services.filter((s) => s.category === "seller");

  const iconMap: Record<string, typeof ShieldCheck> = {
    "Property Validation": ShieldCheck,
    "Group Buying": Users,
    Auction: Gavel,
  };

  const handleBuyService = (serviceName: string) => {
    navigate(
      `/my-properties?action=selectForService&service=${encodeURIComponent(serviceName)}`
    );
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <BackButton />
      {/* Dismissible Banner */}
      {showBanner && (
        <div className="relative mb-8 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 px-5 py-4">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p className="flex-1 text-sm font-medium text-primary">
            You can select any of your properties or add a new property to
            continue.
          </p>
          <button
            onClick={() => setShowBanner(false)}
            className="shrink-0 rounded-md p-1 text-primary/60 transition-colors hover:bg-blue-100 hover:text-primary"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-foreground">My Services</h1>
        <p className="mt-2 text-muted-foreground">
          Enterprise-grade real estate services for buyers and sellers
        </p>
      </div>

      {/* For Buyers */}
      <div className="mb-12">
        <div className="mb-6 flex items-center gap-2">
          <div className="h-8 w-1 rounded-full bg-primary" />
          <h2 className="text-xl font-bold text-foreground">For Buyers</h2>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {buyerServices.map((s) => (
            <ServiceCard
              key={s.name}
              service={s}
              icon={iconMap[s.name] || ShieldCheck}
              onBuy={() => handleBuyService(s.name)}
            />
          ))}
        </div>
      </div>

      {/* For Sellers */}
      <div>
        <div className="mb-6 flex items-center gap-2">
          <div className="h-8 w-1 rounded-full bg-accent" />
          <h2 className="text-xl font-bold text-foreground">For Sellers</h2>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {sellerServices.map((s) => (
            <ServiceCard
              key={s.name}
              service={s}
              icon={iconMap[s.name] || Gavel}
              onBuy={() => handleBuyService(s.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
