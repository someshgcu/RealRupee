import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  currentUser,
  propertyTypes,
  propertySubtypes,
  conditions,
  facingOptions,
  areaUnits,
  amenitiesList,
  documentChecklist,
} from "@/data/mockData";
import {
  Coins,
  ChevronRight,
  ChevronLeft,
  Check,
  Upload,
  Eye,
  EyeOff,
  Bed,
  Bath,
  Car,
  Wind,
  MapPin,
  Youtube,
  ShieldCheck,
  Lock,
  Waves,
  Building2,
  Trophy,
  ParkingCircle,
  MonitorSpeaker,
  TreePine,
  Dumbbell,
  Gamepad2,
  Phone as PhoneIcon,
  Footprints,
  Flower2,
  BookOpen,
  DoorOpen,
  Zap,
  CloudRain,
  Droplets,
  Users,
  Lamp,
  CloudLightning,
  Compass,
  Cctv,
  Baby,
} from "lucide-react";
import { BackButton } from "@/components/BackButton";

// Map amenities to lucide-react icons
const amenityIconMap: Record<string, React.ElementType> = {
  "24 X 7 Security": ShieldCheck,
  "Amphitheater": Trophy,
  "Banquet Hall": DoorOpen,
  "Basketball Court": Trophy,
  "Car Parking": ParkingCircle,
  "CCTV": Cctv,
  "Children Play Area": Baby,
  "Closed Car Parking": Car,
  "Club House": Building2,
  "Gated Community": Lock,
  "Gymnasium": Dumbbell,
  "Indoor Games": Gamepad2,
  "Intercom": PhoneIcon,
  "Jogging Track": Footprints,
  "Landscaped Gardens": Flower2,
  "Library": BookOpen,
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

const steps = ["General Information", "Features & Location", "Images & Documents"];

const PostProperty = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    type: "",
    subtype: "",
    condition: "",
    area: "",
    areaUnit: "Square feet",
    unitCost: "",
    totalCost: "",
    negotiable: false,
    additionalCosts: "",
    beds: 0,
    baths: 0,
    balconies: 0,
    parking: 0,
    facing: "",
    amenities: [] as string[],
    title: "",
    description: "",
    doorNo: "",
    areaLocality: "",
    city: "",
    state: "",
    pincode: "",
    landmarks: "",
    phone1: "",
    phone2: "",
    whatsapp: "",
    email1: "",
    email2: "",
    youtubeUrl: "",
  });
  const [documents, setDocuments] = useState(
    documentChecklist.map((name) => ({ name, uploaded: false, visible: true }))
  );
  const [validationProgress, setValidationProgress] = useState(0);

  // Auth gating: if not logged in, show Login/Signup prompt
  if (!isLoggedIn) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-xl border bg-card p-8 text-center shadow-lg">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mb-2 text-2xl font-bold text-foreground">Login Required</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            You need to be logged in to post a property. Please sign in or create an account to continue.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
  }

  const update = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));
  const toggleAmenity = (a: string) => {
    setForm((f) => ({
      ...f,
      amenities: f.amenities.includes(a)
        ? f.amenities.filter((x) => x !== a)
        : [...f.amenities, a],
    }));
  };

  const handleDocUpload = (i: number) => {
    const updated = [...documents];
    updated[i].uploaded = true;
    setDocuments(updated);
    const uploaded = updated.filter((d) => d.uploaded).length;
    setValidationProgress(Math.round((uploaded / documents.length) * 100));
  };

  const toggleDocVisibility = (i: number) => {
    const updated = [...documents];
    updated[i].visible = !updated[i].visible;
    setDocuments(updated);
  };

  const subtypes = form.type ? propertySubtypes[form.type] || [] : [];

  const inputClass =
    "w-full rounded-lg border bg-card px-3 py-2.5 text-base text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary";
  const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <BackButton />
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Post Property</h1>
        <div className="flex items-center gap-2 rounded-lg bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent">
          <Coins className="h-4 w-4" /> Your Coins: {currentUser.coins}
        </div>
      </div>

      {/* Step indicator */}
      <div className="mb-8 flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium ${i < step
                ? "bg-green-500 text-white"
                : i === step
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
                }`}
            >
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className="hidden text-xs font-medium text-muted-foreground sm:block">
              {s}
            </span>
            {i < steps.length - 1 && <div className="h-px flex-1 bg-border" />}
          </div>
        ))}
      </div>

      {/* Step 1: General Information */}
      {step === 0 && (
        <div className="space-y-6 rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">General Information</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Property Type</label>
              <select
                value={form.type}
                onChange={(e) => {
                  update("type", e.target.value);
                  update("subtype", "");
                  update("condition", "");
                }}
                className={inputClass}
              >
                <option value="">Select Type</option>
                {propertyTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Property Subtype</label>
              <select
                value={form.subtype}
                onChange={(e) => update("subtype", e.target.value)}
                className={inputClass}
                disabled={!form.type}
              >
                <option value="">Select Subtype</option>
                {subtypes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Property Condition: shown ONLY for Residential */}
          {form.type === "Residential" && (
            <div>
              <label className={labelClass}>Property Condition</label>
              <select
                value={form.condition}
                onChange={(e) => update("condition", e.target.value)}
                className={inputClass}
              >
                <option value="">Select Condition</option>
                {conditions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Size/Area */}
          <div>
            <label className={labelClass}>Size / Area</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="1200"
                value={form.area}
                onChange={(e) => update("area", e.target.value)}
                className={inputClass}
              />
              <select
                value={form.areaUnit}
                onChange={(e) => update("areaUnit", e.target.value)}
                className="w-36 rounded-lg border bg-card px-2 py-2.5 text-base text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              >
                {areaUnits.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cost */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Cost per unit</label>
              <input
                type="number"
                placeholder="15000"
                value={form.unitCost}
                onChange={(e) => update("unitCost", e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Total Cost</label>
              <input
                type="number"
                placeholder="18000000"
                value={form.totalCost}
                onChange={(e) => update("totalCost", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input
                type="checkbox"
                checked={form.negotiable}
                onChange={(e) => update("negotiable", e.target.checked)}
                className="h-4 w-4 rounded border accent-primary"
              />
              Price negotiable
            </label>
          </div>

          <div>
            <label className={labelClass}>Additional costs</label>
            <input
              type="text"
              placeholder="e.g. Stamp duty, Registration charges"
              value={form.additionalCosts}
              onChange={(e) => update("additionalCosts", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      )}

      {/* Step 2: Features & Location */}
      {step === 1 && (
        <div className="space-y-6 rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">Features & Location</h2>

          {/* Numeric inputs */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Bedrooms", key: "beds", icon: Bed },
              { label: "Bathrooms", key: "baths", icon: Bath },
              { label: "Balconies", key: "balconies", icon: Wind },
              { label: "Car parking", key: "parking", icon: Car },
            ].map(({ label, key, icon: Icon }) => (
              <div key={key}>
                <label className={labelClass}>{label}</label>
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="number"
                    min={0}
                    value={(form as any)[key]}
                    onChange={(e) => update(key, parseInt(e.target.value) || 0)}
                    className={inputClass}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Facing */}
          <div>
            <label className={labelClass}>Facing</label>
            <select
              value={form.facing}
              onChange={(e) => update("facing", e.target.value)}
              className={inputClass}
            >
              <option value="">Select Facing</option>
              {facingOptions.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          {/* Amenities with icons */}
          <div>
            <label className={labelClass}>Amenities</label>
            <div className="flex flex-wrap gap-2">
              {amenitiesList.map((a) => {
                const IconComp = amenityIconMap[a] || ShieldCheck;
                return (
                  <button
                    key={a}
                    type="button"
                    onClick={() => toggleAmenity(a)}
                    className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${form.amenities.includes(a)
                      ? "border-primary bg-primary/10 text-primary"
                      : "bg-card text-muted-foreground hover:bg-muted"
                      }`}
                  >
                    <IconComp className="h-3.5 w-3.5" />
                    {a}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Property Title & Description */}
          <div>
            <label className={labelClass}>
              Property Title <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Luxury 3BHK with Sea View"
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Property Description</label>
            <textarea
              rows={3}
              placeholder="Describe your property..."
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Address Section */}
          <div className="rounded-lg border bg-muted/50 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
              <MapPin className="h-4 w-4 text-primary" /> Address
            </div>
            <div className="mb-3 flex h-40 items-center justify-center rounded-lg border bg-muted text-sm text-muted-foreground">
              Map Placeholder
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Door No. / Street (Optional)"
                value={form.doorNo}
                onChange={(e) => update("doorNo", e.target.value)}
                className={inputClass}
              />
              <div>
                <input
                  type="text"
                  placeholder="Area / Colony / Locality *"
                  value={form.areaLocality}
                  onChange={(e) => update("areaLocality", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="City / Town / Village *"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="State *"
                  value={form.state}
                  onChange={(e) => update("state", e.target.value)}
                  className={inputClass}
                />
              </div>
              <input
                type="text"
                placeholder="Pincode *"
                value={form.pincode}
                onChange={(e) => update("pincode", e.target.value)}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Landmarks (Optional)"
                value={form.landmarks}
                onChange={(e) => update("landmarks", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="rounded-lg border bg-muted/50 p-4">
            <div className="mb-3 text-sm font-medium text-foreground">Contact Details</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className={labelClass}>
                  Phone Contact <span className="text-destructive">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={form.phone1}
                  onChange={(e) => update("phone1", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  Phone Contact 2 <span className="text-destructive">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={form.phone2}
                  onChange={(e) => update("phone2", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>WhatsApp Contact</label>
                <input
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={form.whatsapp}
                  onChange={(e) => update("whatsapp", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  Email <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email1}
                  onChange={(e) => update("email1", e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>
                  Email 2 <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  placeholder="alternate@example.com"
                  value={form.email2}
                  onChange={(e) => update("email2", e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Images & Documents */}
      {step === 2 && (
        <div className="space-y-6 rounded-xl border bg-card p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground">Images & Documents</h2>

          {/* Media: Multi-image uploader */}
          <div>
            <label className={labelClass}>Property Images</label>
            <div className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed bg-muted/30 text-muted-foreground transition-colors hover:bg-muted/50">
              <Upload className="mb-2 h-8 w-8" />
              <p className="text-sm font-medium">Drag and drop images here</p>
              <p className="text-xs">or click to browse (multiple images supported)</p>
            </div>
          </div>

          {/* YouTube Video URL */}
          <div>
            <label className={labelClass}>YouTube Video URL</label>
            <div className="flex items-center gap-2">
              <Youtube className="h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                type="url"
                placeholder="https://youtube.com/watch?v=..."
                value={form.youtubeUrl}
                onChange={(e) => update("youtubeUrl", e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          {/* Validation Progress */}
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">Validation Progress</span>
              <span className="text-muted-foreground">{validationProgress}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-green-500 transition-all duration-500"
                style={{ width: `${validationProgress}%` }}
              />
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Validation Status will be automatically updated based on your documents list.
            </p>
          </div>

          {/* Document Checklist - exactly 20 items */}
          <div>
            <label className={labelClass}>
              Document Checklist ({documents.filter((d) => d.uploaded).length}/{documents.length})
            </label>
            <div className="space-y-2">
              {documents.map((doc, i) => (
                <div
                  key={doc.name}
                  className="flex items-center justify-between rounded-lg border px-3 py-2.5"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-2 w-2 rounded-full ${doc.uploaded ? "bg-green-500" : "bg-muted"
                        }`}
                    />
                    <span className="text-sm text-foreground">{doc.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleDocVisibility(i)}
                      className={`rounded-md p-1.5 text-sm transition-colors ${doc.visible
                        ? "bg-green-50 text-green-600 hover:bg-green-100"
                        : "bg-red-50 text-red-500 hover:bg-red-100"
                        }`}
                      title={doc.visible ? "Visibility ON" : "Visibility OFF"}
                    >
                      {doc.visible ? (
                        <Eye className="h-4 w-4" />
                      ) : (
                        <EyeOff className="h-4 w-4" />
                      )}
                    </button>
                    {!doc.uploaded ? (
                      <button
                        onClick={() => handleDocUpload(i)}
                        className="rounded-lg bg-primary px-3 py-1 text-xs font-medium text-primary-foreground transition-colors hover:opacity-90"
                      >
                        Upload
                      </button>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                        <Check className="h-3.5 w-3.5" /> Done
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => (step > 0 ? setStep(step - 1) : navigate("/dashboard"))}
          className="flex items-center gap-1 rounded-lg border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <ChevronLeft className="h-4 w-4" /> {step > 0 ? "Previous" : "Cancel"}
        </button>
        {step < 2 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="flex items-center gap-1 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:opacity-90"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={() => navigate("/my-properties")}
            className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-green-700"
          >
            Submit Property
          </button>
        )}
      </div>
    </div>
  );
};

export default PostProperty;
