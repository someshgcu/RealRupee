import { useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Search,
  ChevronRight,
  Shield,
  Clock,
  Star,
  Building2,
  Briefcase,
  Gavel,
  Users,
} from "lucide-react";
import { properties } from "@/data/mockData";
import PropertyCard from "@/components/PropertyCard";

const Index = () => {
  const navigate = useNavigate();

  const validated = properties.filter((p) => p.isValidated);
  const recent = [...properties].sort((a, b) =>
    b.postedDate.localeCompare(a.postedDate)
  );
  const featured = properties.filter((p) => p.isFeatured);
  const auctionProperties = properties.slice(0, 4);
  const groupBuyingProperties = properties.slice(4);

  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);
  const scrollRef3 = useRef<HTMLDivElement>(null);
  const scrollRef4 = useRef<HTMLDivElement>(null);
  const scrollRef5 = useRef<HTMLDivElement>(null);

  const CarouselSection = ({
    title,
    items,
    icon: Icon,
    scrollRef,
    seeAllRoute,
  }: {
    title: string;
    items: typeof properties;
    icon: typeof Shield;
    scrollRef: React.RefObject<HTMLDivElement>;
    seeAllRoute: string;
  }) => (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Icon className="h-5 w-5 text-primary" /> {title}
          </h2>
          <Link
            to={seeAllRoute}
            className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:underline"
          >
            See All <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {items.map((p) => (
            <div key={p.id} className="w-72 shrink-0">
              <PropertyCard property={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div>
      {/* Hero */}
      <section
        id="hero-section"
        className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70"
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=800&fit=crop')] bg-cover bg-center opacity-20" />
        <div className="relative z-10 mx-auto max-w-2xl px-4 py-16 text-center">
          <h1 className="mb-3 text-3xl font-bold text-primary-foreground md:text-5xl">
            Find Your Legally Validated Property
          </h1>
          <p className="mb-8 text-base text-primary-foreground/80 md:text-lg">
            Trusted listings with complete legal verification, group buying, and
            auction support.
          </p>
          <div className="flex items-center overflow-hidden rounded-xl bg-card shadow-lg">
            <Search className="ml-4 h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              type="text"
              placeholder="Explore by City, Locality, Project or Builder..."
              className="flex-1 border-0 bg-transparent px-4 py-3.5 text-base text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button className="mr-1.5 rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:opacity-90">
              Search
            </button>
          </div>

          {/* Shortcut Buttons */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={() => navigate("/my-properties")}
              className="flex items-center gap-2 rounded-full bg-white/20 px-6 py-2.5 text-sm font-semibold text-primary-foreground backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-105"
            >
              <Building2 className="h-4 w-4" />
              My Properties
            </button>
            <button
              onClick={() => navigate("/services")}
              className="flex items-center gap-2 rounded-full bg-white/20 px-6 py-2.5 text-sm font-semibold text-primary-foreground backdrop-blur-sm transition-all hover:bg-white/30 hover:scale-105"
            >
              <Briefcase className="h-4 w-4" />
              My Services
            </button>
          </div>
        </div>
      </section>

      {/* Carousels */}
      <CarouselSection
        title="Legally Validated"
        items={validated}
        icon={Shield}
        scrollRef={scrollRef1}
        seeAllRoute="/properties?service=Validation"
      />
      <div className="border-t" />
      <CarouselSection
        title="Recently Added"
        items={recent}
        icon={Clock}
        scrollRef={scrollRef2}
        seeAllRoute="/properties"
      />
      <div className="border-t" />
      <CarouselSection
        title="Featured Properties"
        items={featured}
        icon={Star}
        scrollRef={scrollRef3}
        seeAllRoute="/properties"
      />
      <div className="border-t" />
      <CarouselSection
        title="Auction Properties"
        items={auctionProperties}
        icon={Gavel}
        scrollRef={scrollRef4}
        seeAllRoute="/properties?service=Auction"
      />
      <div className="border-t" />
      <CarouselSection
        title="Group Buying Properties"
        items={groupBuyingProperties}
        icon={Users}
        scrollRef={scrollRef5}
        seeAllRoute="/properties?service=Group+Buying"
      />
    </div>
  );
};

export default Index;
