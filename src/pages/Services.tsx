import { ArrowRight } from "lucide-react";

interface ServiceInfo {
  name: string;
  price: string;
  description: string;
  linkText: string;
}

const services: ServiceInfo[] = [
  {
    name: "Auction",
    price: "₹4999",
    description:
      "RealRupee Online Auctions offers a transparent, high-visibility platform for property auctions, significantly increasing lead generation. Free participation for registered users, making it accessible and risk-free. No immediate exchange of contracts allows time for the final decision, protecting both buyers and sellers. Ideal for bankers to auction foreclosure properties and attract buyers profitably.",
    linkText: "Learn More...",
  },
  {
    name: "Property Validation",
    price: "₹999",
    description:
      "RealRupee's property validation ensures legality, while safeguarding buyers interests. Property validation ensures properties are free from litigations, confirms lawful ownership. Documents are validated by seasoned legal advocates to streamline the buying process for quicker transactions and easy loan approvals. Legally validated properties get higher visibility on the website, enhancing marketability",
    linkText: "Learn More...",
  },
  {
    name: "Group Buying",
    price: "₹9999",
    description:
      "RealRupee Group Buying Service is a unique platform leveraging volume discount strategies to generate quick leads. Offers group property discounts to boost buying decisions and generate more leads. Maximizes property exposure on the website and social platforms. Publishers can extend deadlines up to 3 months for group completion.",
    linkText: "Learn More...",
  },
];

const Services = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-foreground">My Services</h1>
        <p className="mt-2 text-muted-foreground">
          Enterprise-grade real estate services for buyers and sellers
        </p>
      </div>
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        {services.map((s) => (
          <div
            key={s.name}
            className="group flex flex-col rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-lg hover:border-primary/30"
          >
            <h3 className="text-xl font-semibold text-foreground">{s.name}</h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              {s.description}
            </p>
            <div className="mt-5">
              <button className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:underline">
                {s.linkText} <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="mt-4 border-t pt-4">
              <p className="text-3xl font-bold text-foreground">{s.price}</p>
              <p className="text-xs text-muted-foreground">one-time fee</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
