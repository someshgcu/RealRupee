import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ChevronRight,
  Shield,
  Clock,
  Star,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { properties } from "@/data/mockData";
import PropertyCard from "@/components/PropertyCard";

const Index = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const validated = properties.filter((p) => p.isValidated);
  const recent = [...properties].sort((a, b) =>
    b.postedDate.localeCompare(a.postedDate)
  );
  const featured = properties.filter((p) => p.isFeatured);
  const userProperties = properties.filter((p) => p.ownerId === "u1");

  const scrollRef1 = useRef<HTMLDivElement>(null);
  const scrollRef2 = useRef<HTMLDivElement>(null);
  const scrollRef3 = useRef<HTMLDivElement>(null);

  const CarouselSection = ({
    title,
    items,
    icon: Icon,
    scrollRef,
  }: {
    title: string;
    items: typeof properties;
    icon: typeof Shield;
    scrollRef: React.RefObject<HTMLDivElement>;
  }) => (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <Icon className="h-5 w-5 text-primary" /> {title}
          </h2>
          <button className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:underline">
            See All <ChevronRight className="h-4 w-4" />
          </button>
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
      <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/70">
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
              placeholder="Search by location, project, or builder..."
              className="flex-1 border-0 bg-transparent px-4 py-3.5 text-base text-foreground outline-none placeholder:text-muted-foreground"
            />
            <button className="mr-1.5 rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:opacity-90">
              Search
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
      />
      <div className="border-t" />
      <CarouselSection
        title="Recently Added"
        items={recent}
        icon={Clock}
        scrollRef={scrollRef2}
      />
      <div className="border-t" />
      <CarouselSection
        title="Featured Properties"
        items={featured}
        icon={Star}
        scrollRef={scrollRef3}
      />

      {/* User Properties (post-login) — "My Properties - See all" */}
      {isLoggedIn && userProperties.length > 0 && (
        <>
          <div className="border-t" />
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">
                  My Properties
                </h2>
                <button
                  onClick={() => navigate("/my-properties")}
                  className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  See all <ArrowRight className="h-4 w-4" />
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {userProperties.map((p) => (
                  <PropertyCard key={p.id} property={p} showStatus />
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Index;
