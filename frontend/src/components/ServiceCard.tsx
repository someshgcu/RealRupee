import { Check } from "lucide-react";

interface ServiceCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
}

const ServiceCard = ({ name, price, description, features, highlighted }: ServiceCardProps) => {
  return (
    <div className={`flex flex-col rounded-md border p-6 shadow-sm transition-shadow hover:shadow-md ${
      highlighted ? "border-primary bg-primary/[0.02] ring-1 ring-primary/20" : "bg-card"
    }`}>
      <h3 className="text-lg font-semibold text-foreground">{name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <p className="mt-4 text-3xl font-bold text-foreground">{price}</p>
      <p className="text-xs text-muted-foreground">one-time fee</p>
      <ul className="mt-6 flex-1 space-y-3">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-foreground">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
            {f}
          </li>
        ))}
      </ul>
      <button className={`mt-6 w-full rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${
        highlighted
          ? "bg-primary text-primary-foreground hover:opacity-90"
          : "border bg-card text-foreground hover:bg-muted"
      }`}>
        Learn More
      </button>
    </div>
  );
};

export default ServiceCard;
