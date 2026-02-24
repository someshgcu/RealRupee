import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  link?: string;
  accent?: boolean;
}

const StatCard = ({ title, value, icon: Icon, link, accent }: StatCardProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => link && navigate(link)}
      className={`flex w-full flex-col items-start gap-3 rounded-md border p-5 text-left shadow-sm transition-shadow hover:shadow-md ${
        accent ? "border-accent/30 bg-accent/5" : "bg-card"
      }`}
    >
      <div className={`rounded-md p-2 ${accent ? "bg-accent/10 text-accent" : "bg-primary/10 text-primary"}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </button>
  );
};

export default StatCard;
