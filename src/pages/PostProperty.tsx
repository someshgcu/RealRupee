import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { currentUser, propertyTypes, propertySubtypes, conditions, facingOptions, amenitiesList, documentChecklist } from "@/data/mockData";
import {
  Coins, ChevronRight, ChevronLeft, Check, Upload, Eye, EyeOff,
  Bed, Bath, Car, Wind, MapPin, Youtube
} from "lucide-react";

const steps = ["General Info", "Features & Location", "Images & Documents"];

const PostProperty = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    type: "",
    subtype: "",
    condition: "",
    area: "",
    areaUnit: "sq.ft",
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
    address: "",
    city: "",
    pincode: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    youtubeUrl: "",
  });
  const [documents, setDocuments] = useState(
    documentChecklist.map((name) => ({ name, uploaded: false, visible: true }))
  );
  const [validationProgress, setValidationProgress] = useState(0);

  if (!isLoggedIn) return <Navigate to="/login" replace />;

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

  const inputClass = "w-full rounded-md border bg-card px-3 py-2.5 text-base text-foreground outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary";
  const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Post Property</h1>
        <div className="flex items-center gap-2 rounded-md bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent">
          <Coins className="h-4 w-4" /> Your Coins: {currentUser.coins}
        </div>
      </div>

      {/* Step indicator */}
      <div className="mb-8 flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 items-center gap-2">
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
              i < step ? "bg-success text-success-foreground" :
              i === step ? "bg-primary text-primary-foreground" :
              "bg-muted text-muted-foreground"
            }`}>
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className="hidden text-xs font-medium text-muted-foreground sm:block">{s}</span>
            {i < steps.length - 1 && <div className="h-px flex-1 bg-border" />}
          </div>
        ))}
      </div>

      {/* Step 1: General Info */}
      {step === 0 && (
        <div className="space-y-6 rounded-md border bg-card p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Property Type</label>
              <select value={form.type} onChange={(e) => { update("type", e.target.value); update("subtype", ""); }} className={inputClass}>
                <option value="">Select Type</option>
                {propertyTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Sub Type</label>
              <select value={form.subtype} onChange={(e) => update("subtype", e.target.value)} className={inputClass} disabled={!form.type}>
                <option value="">Select Sub Type</option>
                {subtypes.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass}>Condition</label>
            <select value={form.condition} onChange={(e) => update("condition", e.target.value)} className={inputClass}>
              <option value="">Select Condition</option>
              {conditions.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Size / Area</label>
              <div className="flex gap-2">
                <input type="number" placeholder="1200" value={form.area} onChange={(e) => update("area", e.target.value)} className={inputClass} />
                <select value={form.areaUnit} onChange={(e) => update("areaUnit", e.target.value)} className="w-28 rounded-md border bg-card px-2 py-2.5 text-base text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary">
                  <option value="sq.ft">sq.ft</option>
                  <option value="sq.m">sq.m</option>
                  <option value="acres">acres</option>
                  <option value="hectares">hectares</option>
                </select>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Unit Cost (per {form.areaUnit})</label>
              <input type="number" placeholder="15000" value={form.unitCost} onChange={(e) => update("unitCost", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Total Cost</label>
              <input type="number" placeholder="18000000" value={form.totalCost} onChange={(e) => update("totalCost", e.target.value)} className={inputClass} />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm text-foreground">
              <input type="checkbox" checked={form.negotiable} onChange={(e) => update("negotiable", e.target.checked)} className="h-4 w-4 rounded border accent-primary" />
              Price Negotiable
            </label>
          </div>
          <div>
            <label className={labelClass}>Additional Costs (if any)</label>
            <input type="text" placeholder="e.g. Stamp duty, Registration" value={form.additionalCosts} onChange={(e) => update("additionalCosts", e.target.value)} className={inputClass} />
          </div>
        </div>
      )}

      {/* Step 2: Features & Location */}
      {step === 1 && (
        <div className="space-y-6 rounded-md border bg-card p-6 shadow-sm">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Bedrooms", key: "beds", icon: Bed },
              { label: "Bathrooms", key: "baths", icon: Bath },
              { label: "Balconies", key: "balconies", icon: Wind },
              { label: "Parking", key: "parking", icon: Car },
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

          <div>
            <label className={labelClass}>Facing</label>
            <select value={form.facing} onChange={(e) => update("facing", e.target.value)} className={inputClass}>
              <option value="">Select Facing</option>
              {facingOptions.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>

          <div>
            <label className={labelClass}>Amenities</label>
            <div className="flex flex-wrap gap-2">
              {amenitiesList.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => toggleAmenity(a)}
                  className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                    form.amenities.includes(a)
                      ? "border-primary bg-primary/10 text-primary"
                      : "bg-card text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelClass}>Property Title</label>
            <input type="text" placeholder="e.g. Luxury 3BHK with Sea View" value={form.title} onChange={(e) => update("title", e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Description</label>
            <textarea rows={3} placeholder="Describe your property..." value={form.description} onChange={(e) => update("description", e.target.value)} className={inputClass} />
          </div>

          <div className="rounded-md border bg-muted/50 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-foreground">
              <MapPin className="h-4 w-4 text-primary" /> Location
            </div>
            <div className="mb-3 flex h-40 items-center justify-center rounded-md border bg-muted text-sm text-muted-foreground">
              Google Maps Placeholder
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input type="text" placeholder="Full Address" value={form.address} onChange={(e) => update("address", e.target.value)} className={inputClass} />
              <input type="text" placeholder="City" value={form.city} onChange={(e) => update("city", e.target.value)} className={inputClass} />
              <input type="text" placeholder="Pincode" value={form.pincode} onChange={(e) => update("pincode", e.target.value)} className={inputClass} />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className={labelClass}>Contact Name</label>
              <input type="text" value={form.contactName} onChange={(e) => update("contactName", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Contact Phone</label>
              <input type="tel" value={form.contactPhone} onChange={(e) => update("contactPhone", e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Contact Email</label>
              <input type="email" value={form.contactEmail} onChange={(e) => update("contactEmail", e.target.value)} className={inputClass} />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Images & Documents */}
      {step === 2 && (
        <div className="space-y-6 rounded-md border bg-card p-6 shadow-sm">
          {/* Image Upload */}
          <div>
            <label className={labelClass}>Property Images</label>
            <div className="flex h-40 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed bg-muted/30 text-muted-foreground transition-colors hover:bg-muted/50">
              <Upload className="mb-2 h-8 w-8" />
              <p className="text-sm font-medium">Drag and drop images here</p>
              <p className="text-xs">or click to browse</p>
            </div>
          </div>

          {/* YouTube */}
          <div>
            <label className={labelClass}>YouTube Video URL</label>
            <div className="flex items-center gap-2">
              <Youtube className="h-5 w-5 shrink-0 text-muted-foreground" />
              <input type="url" placeholder="https://youtube.com/watch?v=..." value={form.youtubeUrl} onChange={(e) => update("youtubeUrl", e.target.value)} className={inputClass} />
            </div>
          </div>

          {/* Validation Progress */}
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">Validation Progress</span>
              <span className="text-muted-foreground">{validationProgress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-success transition-all duration-500"
                style={{ width: `${validationProgress}%` }}
              />
            </div>
          </div>

          {/* Document Checklist */}
          <div>
            <label className={labelClass}>Document Checklist ({documents.filter((d) => d.uploaded).length}/{documents.length})</label>
            <div className="space-y-2">
              {documents.map((doc, i) => (
                <div key={doc.name} className="flex items-center justify-between rounded-md border px-3 py-2.5">
                  <div className="flex items-center gap-3">
                    <div className={`h-2 w-2 rounded-full ${doc.uploaded ? "bg-success" : "bg-muted"}`} />
                    <span className="text-sm text-foreground">{doc.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleDocVisibility(i)}
                      className="p-1 text-muted-foreground transition-colors hover:text-foreground"
                      title={doc.visible ? "Public" : "Private"}
                    >
                      {doc.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </button>
                    {!doc.uploaded ? (
                      <button
                        onClick={() => handleDocUpload(i)}
                        className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground transition-colors hover:opacity-90"
                      >
                        Upload
                      </button>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-medium text-success">
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
          onClick={() => step > 0 ? setStep(step - 1) : navigate("/dashboard")}
          className="flex items-center gap-1 rounded-md border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <ChevronLeft className="h-4 w-4" /> {step > 0 ? "Previous" : "Cancel"}
        </button>
        {step < 2 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="flex items-center gap-1 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground transition-colors hover:opacity-90"
          >
            Next <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={() => navigate("/my-properties")}
            className="rounded-md bg-success px-5 py-2.5 text-sm font-medium text-success-foreground transition-colors hover:opacity-90"
          >
            Submit Property
          </button>
        )}
      </div>
    </div>
  );
};

export default PostProperty;
