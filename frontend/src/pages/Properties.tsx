import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
    Search,
    SlidersHorizontal,
    X,
    Building2,
    ArrowUpDown,
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetDescription,
} from "@/components/ui/sheet";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    properties,
    propertyTypes,
    propertySubtypes,
    facingOptions,
    conditions,
    amenitiesList,
} from "@/data/mockData";
import PropertyCard from "@/components/PropertyCard";

// ── Price option helpers ──
const minPriceOptions = [
    { label: "No Min", value: "" },
    { label: "> 25 Lakh", value: "2500000" },
    { label: "> 45 Lakh", value: "4500000" },
    { label: "> 65 Lakh", value: "6500000" },
    { label: "> 85 Lakh", value: "8500000" },
    { label: "> 1 Crore", value: "10000000" },
    { label: "> 2 Crore", value: "20000000" },
    { label: "> 3 Crore", value: "30000000" },
    { label: "> 4 Crore", value: "40000000" },
];

const maxPriceOptions = [
    { label: "No Max", value: "" },
    { label: "< 45 Lakh", value: "4500000" },
    { label: "< 65 Lakh", value: "6500000" },
    { label: "< 85 Lakh", value: "8500000" },
    { label: "< 1 Crore", value: "10000000" },
    { label: "< 2 Crore", value: "20000000" },
    { label: "< 3 Crore", value: "30000000" },
    { label: "< 4 Crore", value: "40000000" },
    { label: "< 5 Crore", value: "50000000" },
];

const areaUnitOptions = ["Any", "Square feet", "Square yards", "Cents", "Acres"];
const numberOptions = ["Any", "1", "2", "3", "4", "5+"];
const serviceOptions = ["Auction", "Group Buying", "Validation"];

type SortOption = "relevance" | "price_asc" | "price_desc" | "newest";

// ── Toggle Button Group ──
const ToggleGroup = ({
    label,
    value,
    onChange,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
}) => (
    <div className="space-y-1.5">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <div className="flex flex-wrap gap-1">
            {numberOptions.map((opt) => (
                <button
                    key={opt}
                    onClick={() => onChange(opt === "Any" ? "" : opt)}
                    className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${(value === "" && opt === "Any") || value === opt
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-input bg-background text-foreground hover:bg-muted"
                        }`}
                >
                    {opt}
                </button>
            ))}
        </div>
    </div>
);

// ── Helper: get/set URL params ──
function useFilterParams() {
    const [searchParams, setSearchParams] = useSearchParams();

    const get = (key: string) => searchParams.get(key) || "";
    const getAll = (key: string) => searchParams.getAll(key);

    const set = (key: string, value: string) => {
        const next = new URLSearchParams(searchParams);
        if (!value || value === "Any") {
            next.delete(key);
        } else {
            next.set(key, value);
        }
        setSearchParams(next, { replace: true });
    };

    const toggleArray = (key: string, value: string) => {
        const next = new URLSearchParams(searchParams);
        const current = next.getAll(key);
        if (current.includes(value)) {
            next.delete(key);
            current.filter((v) => v !== value).forEach((v) => next.append(key, v));
        } else {
            next.append(key, value);
        }
        setSearchParams(next, { replace: true });
    };

    const clearAll = () => {
        setSearchParams({}, { replace: true });
    };

    return { get, getAll, set, toggleArray, clearAll, searchParams };
}

// ── Filter Drawer Content ──
const FilterContent = ({
    fp,
    onApply,
}: {
    fp: ReturnType<typeof useFilterParams>;
    onApply?: () => void;
}) => {
    const activeType = fp.get("type");
    const subtypes =
        activeType && propertySubtypes[activeType]
            ? propertySubtypes[activeType]
            : Object.values(propertySubtypes).flat();

    const activeCount = Array.from(fp.searchParams.entries()).filter(
        ([k]) => k !== "q" && k !== "sort"
    ).length;

    return (
        <div className="flex h-full flex-col">
            {/* Scrollable filter body */}
            <div className="flex-1 space-y-1 overflow-y-auto pr-1">
                {/* Header */}
                <div className="flex items-center justify-between pb-2">
                    <h3 className="text-sm font-semibold text-foreground">
                        Filters{" "}
                        {activeCount > 0 && (
                            <span className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                                {activeCount}
                            </span>
                        )}
                    </h3>
                    {activeCount > 0 && (
                        <button
                            onClick={fp.clearAll}
                            className="text-xs font-medium text-destructive hover:underline"
                        >
                            Clear All
                        </button>
                    )}
                </div>

                <Accordion
                    type="multiple"
                    defaultValue={["basic", "pricing", "area", "additional", "amenities"]}
                    className="w-full"
                >
                    {/* 1. Basic Categories */}
                    <AccordionItem value="basic">
                        <AccordionTrigger className="py-3 text-sm font-semibold">
                            Basic Categories
                        </AccordionTrigger>
                        <AccordionContent className="space-y-3">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-muted-foreground">
                                    Property Type
                                </label>
                                <Select
                                    value={fp.get("type") || "__any__"}
                                    onValueChange={(v) => {
                                        fp.set("type", v === "__any__" ? "" : v);
                                        fp.set("subType", "");
                                    }}
                                >
                                    <SelectTrigger className="h-9 text-xs">
                                        <SelectValue placeholder="Any" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="__any__">Any</SelectItem>
                                        {propertyTypes.map((t) => (
                                            <SelectItem key={t} value={t}>
                                                {t}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-muted-foreground">
                                    Sub Type
                                </label>
                                <Select
                                    value={fp.get("subType") || "__any__"}
                                    onValueChange={(v) =>
                                        fp.set("subType", v === "__any__" ? "" : v)
                                    }
                                >
                                    <SelectTrigger className="h-9 text-xs">
                                        <SelectValue placeholder="Any" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="__any__">Any</SelectItem>
                                        {subtypes.map((s) => (
                                            <SelectItem key={s} value={s}>
                                                {s}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-muted-foreground">
                                    RealRupee Service
                                </label>
                                {serviceOptions.map((svc) => (
                                    <label
                                        key={svc}
                                        className="flex cursor-pointer items-center gap-2"
                                    >
                                        <Checkbox
                                            checked={fp.getAll("service").includes(svc)}
                                            onCheckedChange={() => fp.toggleArray("service", svc)}
                                        />
                                        <span className="text-xs text-foreground">{svc}</span>
                                    </label>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* 2. Pricing */}
                    <AccordionItem value="pricing">
                        <AccordionTrigger className="py-3 text-sm font-semibold">
                            Pricing
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-muted-foreground">
                                        Min Price
                                    </label>
                                    <Select
                                        value={fp.get("minPrice") || "__none__"}
                                        onValueChange={(v) =>
                                            fp.set("minPrice", v === "__none__" ? "" : v)
                                        }
                                    >
                                        <SelectTrigger className="h-9 text-xs">
                                            <SelectValue placeholder="No Min" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {minPriceOptions.map((o) => (
                                                <SelectItem
                                                    key={o.label}
                                                    value={o.value || "__none__"}
                                                >
                                                    {o.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-muted-foreground">
                                        Max Price
                                    </label>
                                    <Select
                                        value={fp.get("maxPrice") || "__none__"}
                                        onValueChange={(v) =>
                                            fp.set("maxPrice", v === "__none__" ? "" : v)
                                        }
                                    >
                                        <SelectTrigger className="h-9 text-xs">
                                            <SelectValue placeholder="No Max" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {maxPriceOptions.map((o) => (
                                                <SelectItem
                                                    key={o.label}
                                                    value={o.value || "__none__"}
                                                >
                                                    {o.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* 3. Area & Specs */}
                    <AccordionItem value="area">
                        <AccordionTrigger className="py-3 text-sm font-semibold">
                            Area & Specs
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-muted-foreground">
                                    Area Unit
                                </label>
                                <Select
                                    value={fp.get("areaUnit") || "__any__"}
                                    onValueChange={(v) =>
                                        fp.set("areaUnit", v === "__any__" ? "" : v)
                                    }
                                >
                                    <SelectTrigger className="h-9 text-xs">
                                        <SelectValue placeholder="Any" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {areaUnitOptions.map((u) => (
                                            <SelectItem key={u} value={u === "Any" ? "__any__" : u}>
                                                {u}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <ToggleGroup
                                label="Beds"
                                value={fp.get("beds")}
                                onChange={(v) => fp.set("beds", v)}
                            />
                            <ToggleGroup
                                label="Baths"
                                value={fp.get("baths")}
                                onChange={(v) => fp.set("baths", v)}
                            />
                            <ToggleGroup
                                label="Balconies"
                                value={fp.get("balconies")}
                                onChange={(v) => fp.set("balconies", v)}
                            />
                            <ToggleGroup
                                label="Car Parking"
                                value={fp.get("parking")}
                                onChange={(v) => fp.set("parking", v)}
                            />
                        </AccordionContent>
                    </AccordionItem>

                    {/* 4. Additional Details */}
                    <AccordionItem value="additional">
                        <AccordionTrigger className="py-3 text-sm font-semibold">
                            Additional Details
                        </AccordionTrigger>
                        <AccordionContent className="space-y-3">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-muted-foreground">
                                    Facing
                                </label>
                                <Select
                                    value={fp.get("facing") || "__any__"}
                                    onValueChange={(v) =>
                                        fp.set("facing", v === "__any__" ? "" : v)
                                    }
                                >
                                    <SelectTrigger className="h-9 text-xs">
                                        <SelectValue placeholder="Any" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="__any__">Any</SelectItem>
                                        {facingOptions.map((f) => (
                                            <SelectItem key={f} value={f}>
                                                {f}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-muted-foreground">
                                    Condition
                                </label>
                                <Select
                                    value={fp.get("condition") || "__any__"}
                                    onValueChange={(v) =>
                                        fp.set("condition", v === "__any__" ? "" : v)
                                    }
                                >
                                    <SelectTrigger className="h-9 text-xs">
                                        <SelectValue placeholder="Any" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="__any__">Any</SelectItem>
                                        {conditions.map((c) => (
                                            <SelectItem key={c} value={c}>
                                                {c}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    {/* 5. Amenities */}
                    <AccordionItem value="amenities">
                        <AccordionTrigger className="py-3 text-sm font-semibold">
                            Amenities
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="grid grid-cols-1 gap-2">
                                {amenitiesList.map((a) => (
                                    <label
                                        key={a}
                                        className="flex cursor-pointer items-center gap-2"
                                    >
                                        <Checkbox
                                            checked={fp.getAll("amenity").includes(a)}
                                            onCheckedChange={() => fp.toggleArray("amenity", a)}
                                        />
                                        <span className="text-xs text-foreground">{a}</span>
                                    </label>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            {/* Sticky Bottom Actions */}
            <div className="sticky bottom-0 flex gap-2 border-t bg-background pt-4">
                <button
                    onClick={fp.clearAll}
                    className="flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                    Clear All
                </button>
                <button
                    onClick={onApply}
                    className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:opacity-90"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );
};

// ── Main Page ──
const Properties = () => {
    const fp = useFilterParams();
    const [locationQuery, setLocationQuery] = useState(fp.get("q"));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [sortBy, setSortBy] = useState<SortOption>(
        (fp.get("sort") as SortOption) || "relevance"
    );

    const handleSearch = () => {
        fp.set("q", locationQuery.trim());
    };

    const handleSort = (value: string) => {
        setSortBy(value as SortOption);
        fp.set("sort", value === "relevance" ? "" : value);
    };

    // ── Filtering Logic ──
    const filtered = useMemo(() => {
        let result = properties.filter((p) => {
            // Location / text search
            const q = fp.get("q").toLowerCase();
            if (
                q &&
                !p.location.toLowerCase().includes(q) &&
                !p.title.toLowerCase().includes(q) &&
                !p.city.toLowerCase().includes(q)
            )
                return false;

            // Property type
            const type = fp.get("type");
            if (type && p.type !== type) return false;

            // Sub type
            const subType = fp.get("subType");
            if (subType && p.subtype !== subType) return false;

            // Min price — numeric comparison against property price
            const minPrice = fp.get("minPrice");
            if (minPrice && p.price < Number(minPrice)) return false;

            // Max price — numeric comparison against property price
            const maxPrice = fp.get("maxPrice");
            if (maxPrice && p.price > Number(maxPrice)) return false;

            // Area unit
            const areaUnit = fp.get("areaUnit");
            if (areaUnit && p.areaUnit !== areaUnit) return false;

            // Beds — exact match or 5+ means >= 5
            const beds = fp.get("beds");
            if (beds) {
                const n = beds === "5+" ? 5 : Number(beds);
                if (beds === "5+" ? p.beds < n : p.beds !== n) return false;
            }

            // Baths — exact match or 5+ means >= 5
            const baths = fp.get("baths");
            if (baths) {
                const n = baths === "5+" ? 5 : Number(baths);
                if (baths === "5+" ? p.baths < n : p.baths !== n) return false;
            }

            // Balconies — exact match or 5+ means >= 5
            const balconies = fp.get("balconies");
            if (balconies) {
                const n = balconies === "5+" ? 5 : Number(balconies);
                if (balconies === "5+" ? p.balconies < n : p.balconies !== n)
                    return false;
            }

            // Parking — exact match or 5+ means >= 5
            const parking = fp.get("parking");
            if (parking) {
                const n = parking === "5+" ? 5 : Number(parking);
                if (parking === "5+" ? p.parking < n : p.parking !== n) return false;
            }

            // Facing
            const facing = fp.get("facing");
            if (facing && p.facing !== facing) return false;

            // Amenities — ALL selected amenities must be present on the property
            const selectedAmenities = fp.getAll("amenity");
            if (selectedAmenities.length > 0) {
                if (!selectedAmenities.every((a) => p.amenities.includes(a)))
                    return false;
            }

            // Service filters (mock logic: Validation = isValidated)
            const selectedServices = fp.getAll("service");
            if (selectedServices.length > 0) {
                if (selectedServices.includes("Validation") && !p.isValidated)
                    return false;
            }

            return true;
        });

        // Sorting
        const sort = fp.get("sort") || sortBy;
        if (sort === "price_asc") {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (sort === "price_desc") {
            result = [...result].sort((a, b) => b.price - a.price);
        } else if (sort === "newest") {
            result = [...result].sort((a, b) =>
                b.postedDate.localeCompare(a.postedDate)
            );
        }

        return result;
    }, [fp.searchParams, sortBy]);

    const activeFilterCount = Array.from(fp.searchParams.entries()).filter(
        ([k]) => k !== "q" && k !== "sort"
    ).length;

    return (
        <div className="min-h-screen bg-background">
            {/* Top Control Bar */}
            <div className="sticky top-16 z-30 border-b bg-card shadow-sm">
                <div className="container mx-auto px-4 py-3">
                    <div className="flex items-center gap-3">
                        {/* Search Input */}
                        <div className="flex flex-1 items-center overflow-hidden rounded-lg border bg-background">
                            <Search className="ml-3 h-4 w-4 shrink-0 text-muted-foreground" />
                            <input
                                type="text"
                                value={locationQuery}
                                onChange={(e) => setLocationQuery(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                placeholder="Search by location, project, or builder..."
                                className="flex-1 border-0 bg-transparent px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                            />
                            {locationQuery && (
                                <button
                                    onClick={() => {
                                        setLocationQuery("");
                                        fp.set("q", "");
                                    }}
                                    className="mr-1 rounded-md p-1 text-muted-foreground hover:bg-muted"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                        <button
                            onClick={handleSearch}
                            className="hidden rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:opacity-90 sm:block"
                        >
                            Search
                        </button>

                        {/* Filters Button → Sheet Drawer */}
                        <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
                            <SheetTrigger asChild>
                                <button className="relative flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                                    <SlidersHorizontal className="h-4 w-4" />
                                    <span className="hidden sm:inline">Filters</span>
                                    {activeFilterCount > 0 && (
                                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                                            {activeFilterCount}
                                        </span>
                                    )}
                                </button>
                            </SheetTrigger>
                            <SheetContent
                                side="left"
                                className="flex w-[300px] flex-col sm:w-[380px]"
                            >
                                <SheetHeader>
                                    <SheetTitle>Filters</SheetTitle>
                                    <SheetDescription>
                                        Refine your property search
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="mt-2 flex-1 overflow-hidden">
                                    <FilterContent
                                        fp={fp}
                                        onApply={() => setDrawerOpen(false)}
                                    />
                                </div>
                            </SheetContent>
                        </Sheet>

                        {/* Sort By */}
                        <Select value={sortBy} onValueChange={handleSort}>
                            <SelectTrigger className="hidden h-10 w-[180px] gap-2 sm:flex">
                                <ArrowUpDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                                <SelectValue placeholder="Sort By" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="relevance">Relevance</SelectItem>
                                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                                <SelectItem value="price_desc">Price: High to Low</SelectItem>
                                <SelectItem value="newest">Newest First</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Active Filter Tags */}
                    {activeFilterCount > 0 && (
                        <div className="mt-3 flex flex-wrap items-center gap-2">
                            {fp.get("type") && (
                                <FilterTag
                                    label={`Type: ${fp.get("type")}`}
                                    onRemove={() => fp.set("type", "")}
                                />
                            )}
                            {fp.get("subType") && (
                                <FilterTag
                                    label={`Sub: ${fp.get("subType")}`}
                                    onRemove={() => fp.set("subType", "")}
                                />
                            )}
                            {fp.get("minPrice") && (
                                <FilterTag
                                    label={`Min: ${minPriceOptions.find((o) => o.value === fp.get("minPrice"))?.label || fp.get("minPrice")}`}
                                    onRemove={() => fp.set("minPrice", "")}
                                />
                            )}
                            {fp.get("maxPrice") && (
                                <FilterTag
                                    label={`Max: ${maxPriceOptions.find((o) => o.value === fp.get("maxPrice"))?.label || fp.get("maxPrice")}`}
                                    onRemove={() => fp.set("maxPrice", "")}
                                />
                            )}
                            {fp.get("beds") && (
                                <FilterTag
                                    label={`Beds: ${fp.get("beds")}`}
                                    onRemove={() => fp.set("beds", "")}
                                />
                            )}
                            {fp.get("baths") && (
                                <FilterTag
                                    label={`Baths: ${fp.get("baths")}`}
                                    onRemove={() => fp.set("baths", "")}
                                />
                            )}
                            {fp.get("facing") && (
                                <FilterTag
                                    label={`Facing: ${fp.get("facing")}`}
                                    onRemove={() => fp.set("facing", "")}
                                />
                            )}
                            {fp.getAll("amenity").map((a) => (
                                <FilterTag
                                    key={a}
                                    label={a}
                                    onRemove={() => fp.toggleArray("amenity", a)}
                                />
                            ))}
                            {fp.getAll("service").map((s) => (
                                <FilterTag
                                    key={s}
                                    label={s}
                                    onRemove={() => fp.toggleArray("service", s)}
                                />
                            ))}
                            <button
                                onClick={fp.clearAll}
                                className="text-xs font-medium text-destructive hover:underline"
                            >
                                Clear all
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Full-Width Property Grid */}
            <div className="container mx-auto px-4 py-6">
                <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">
                            {filtered.length}
                        </span>{" "}
                        {filtered.length === 1 ? "property" : "properties"} found
                    </p>
                    {fp.get("q") && (
                        <p className="text-xs text-muted-foreground">
                            Searching: &ldquo;
                            <span className="font-medium text-foreground">
                                {fp.get("q")}
                            </span>
                            &rdquo;
                        </p>
                    )}
                </div>

                {filtered.length === 0 ? (
                    /* Elegant Empty State */
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-muted/60">
                            <Building2 className="h-12 w-12 text-gray-300" />
                        </div>
                        <h2 className="mb-2 text-xl font-semibold text-foreground">
                            No Properties Found
                        </h2>
                        <p className="mb-6 max-w-sm text-center text-sm text-muted-foreground">
                            No properties found matching your criteria. Try adjusting your
                            filters or broadening your search.
                        </p>
                        <button
                            onClick={fp.clearAll}
                            className="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-all hover:opacity-90 hover:shadow-lg"
                        >
                            Clear All Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filtered.map((p) => (
                            <PropertyCard key={p.id} property={p} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// ── Filter Tag Chip ──
const FilterTag = ({
    label,
    onRemove,
}: {
    label: string;
    onRemove: () => void;
}) => (
    <span className="inline-flex items-center gap-1 rounded-full border bg-muted/50 px-2.5 py-1 text-xs font-medium text-foreground">
        {label}
        <button
            onClick={onRemove}
            className="rounded-full p-0.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
            <X className="h-3 w-3" />
        </button>
    </span>
);

export default Properties;
