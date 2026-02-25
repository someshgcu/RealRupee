import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { cities } from "@/data/mockData";
import logo from "@/assets/realrupee_logo_light.webp";
import {
  ChevronDown,
  LogOut,
  User,
  Building2,
  Heart,
  MessageSquare,
  Plus,
  Menu,
  X,
  Settings,
  Briefcase,
  Search,
} from "lucide-react";

const Navbar = () => {
  const { isLoggedIn, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [cityOpen, setCityOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSignoutConfirm, setShowSignoutConfirm] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node))
        setAvatarOpen(false);
      if (cityRef.current && !cityRef.current.contains(e.target as Node))
        setCityOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Sticky search on scroll
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 300);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSignout = () => {
    setShowSignoutConfirm(true);
    setAvatarOpen(false);
  };

  const confirmSignout = async () => {
    await signOut();
    setShowSignoutConfirm(false);
    navigate("/");
  };

  const isHomePage = location.pathname === "/";
  const showStickySearch = scrolled && isHomePage;

  return (
    <>
      <nav
        className={`sticky top-0 z-50 border-b bg-card transition-shadow duration-300 ${showStickySearch ? "shadow-md" : "shadow-sm"}`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
          <div className="flex items-center gap-6">
            <Link to="/" className="shrink-0">
              <img src={logo} alt="RealRupee" className="h-10 w-auto object-contain" />
            </Link>

            {/* City Selector - Desktop */}
            <div ref={cityRef} className="relative hidden md:block">
              <button
                onClick={() => setCityOpen(!cityOpen)}
                className="flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-muted"
              >
                {selectedCity}
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </button>
              {cityOpen && (
                <div className="absolute left-0 top-full mt-1 w-40 rounded-lg border bg-card py-1 shadow-lg">
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setCityOpen(false);
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-foreground transition-colors hover:bg-muted"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Compact Sticky Search Bar */}
          <div
            className={`hidden flex-1 items-center transition-all duration-300 md:flex ${showStickySearch ? "max-w-md opacity-100" : "max-w-0 opacity-0 overflow-hidden"}`}
          >
            <div className="flex w-full items-center rounded-lg border bg-muted/50">
              <Search className="ml-3 h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search location, project..."
                className="flex-1 border-0 bg-transparent px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button className="mr-1 rounded-md bg-accent px-4 py-1.5 text-xs font-medium text-accent-foreground transition-colors hover:opacity-90">
                Search
              </button>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-4 md:flex">
            <button
              onClick={() => navigate("/services")}
              className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Briefcase className="h-4 w-4" />
              Services
            </button>
            <button
              onClick={() => navigate(isLoggedIn ? "/post-property" : "/login")}
              className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              Post Property
            </button>

            {isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="rounded-lg border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  Dashboard
                </button>
                <div ref={avatarRef} className="relative">
                  <button
                    onClick={() => setAvatarOpen(!avatarOpen)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
                  >
                    {profile?.full_name?.charAt(0) ?? "U"}
                  </button>
                  {avatarOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border bg-card py-1 shadow-lg">
                      <div className="border-b px-4 py-3">
                        <p className="text-sm font-medium text-foreground">
                          {profile?.full_name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {profile?.email}
                        </p>
                      </div>
                      <Link
                        to="/my-properties"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
                      >
                        <Building2 className="h-4 w-4 text-muted-foreground" />{" "}
                        My Properties
                      </Link>
                      <Link
                        to="/leads-enquiries"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
                      >
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />{" "}
                        Leads & Enquiries
                      </Link>
                      <Link
                        to="/my-shortlist"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
                      >
                        <Heart className="h-4 w-4 text-muted-foreground" /> My
                        Shortlist
                      </Link>
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
                      >
                        <Settings className="h-4 w-4 text-muted-foreground" />{" "}
                        Profile Settings
                      </Link>
                      <div className="border-t">
                        <button
                          onClick={handleSignout}
                          className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-destructive transition-colors hover:bg-muted"
                        >
                          <LogOut className="h-4 w-4" /> Signout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="border-t bg-card px-4 py-4 md:hidden">
            {/* Mobile sticky search */}
            {showStickySearch && (
              <div className="mb-3 flex items-center rounded-lg border bg-muted/50">
                <Search className="ml-3 h-4 w-4 shrink-0 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search location, project..."
                  className="flex-1 border-0 bg-transparent px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
            )}
            <div className="mb-3">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full rounded-lg border bg-card px-3 py-2 text-sm text-foreground"
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() =>
                navigate(isLoggedIn ? "/post-property" : "/login")
              }
              className="mb-3 w-full rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
            >
              Post Property
            </button>
            {!isLoggedIn && (
              <button
                onClick={() => navigate("/login")}
                className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
              >
                Login
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Sign Out Confirmation Modal */}
      {showSignoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-sm rounded-xl border bg-card p-6 shadow-2xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                <LogOut className="h-5 w-5 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                Sign Out
              </h3>
            </div>
            <p className="mb-6 text-sm text-muted-foreground">
              Are you sure you want to sign out? You will need to log in again
              to access your dashboard and properties.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSignoutConfirm(false)}
                className="flex-1 rounded-lg border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                Cancel
              </button>
              <button
                onClick={confirmSignout}
                className="flex-1 rounded-lg bg-destructive px-4 py-2.5 text-sm font-medium text-destructive-foreground transition-colors hover:opacity-90"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
