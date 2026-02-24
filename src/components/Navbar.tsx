import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { cities } from "@/data/mockData";
import {
  ChevronDown, LogOut, User, Building2, Heart, Eye, MessageSquare,
  Plus, Menu, X
} from "lucide-react";

const Navbar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [cityOpen, setCityOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) setAvatarOpen(false);
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) setCityOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="sticky top-0 z-50 border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold text-primary">
            PropTrust
          </Link>

          {/* City Selector */}
          <div ref={cityRef} className="relative hidden md:block">
            <button
              onClick={() => setCityOpen(!cityOpen)}
              className="flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-muted"
            >
              {selectedCity}
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
            {cityOpen && (
              <div className="absolute left-0 top-full mt-1 w-40 rounded-md border bg-card py-1 shadow-lg">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => { setSelectedCity(city); setCityOpen(false); }}
                    className="block w-full px-4 py-2 text-left text-sm text-foreground transition-colors hover:bg-muted"
                  >
                    {city}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <button
            onClick={() => navigate(isLoggedIn ? "/post-property" : "/login")}
            className="flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:opacity-90"
          >
            <Plus className="h-4 w-4" />
            Post Property
          </button>

          {isLoggedIn ? (
            <div ref={avatarRef} className="relative">
              <button
                onClick={() => setAvatarOpen(!avatarOpen)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
              >
                {user?.name.charAt(0)}
              </button>
              {avatarOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-md border bg-card py-1 shadow-lg">
                  <div className="border-b px-4 py-3">
                    <p className="text-sm font-medium text-foreground">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <Link to="/my-properties" className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-muted">
                    <Building2 className="h-4 w-4 text-muted-foreground" /> My Properties
                  </Link>
                  <Link to="/leads-enquiries" className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-muted">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" /> Leads & Enquiries
                  </Link>
                  <Link to="/my-shortlist" className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-muted">
                    <Heart className="h-4 w-4 text-muted-foreground" /> My Shortlist
                  </Link>
                  <Link to="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-muted">
                    <User className="h-4 w-4 text-muted-foreground" /> Profile Settings
                  </Link>
                  <div className="border-t">
                    <button
                      onClick={() => { logout(); setAvatarOpen(false); navigate("/"); }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-destructive transition-colors hover:bg-muted"
                    >
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
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
          {mobileMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="border-t bg-card px-4 py-4 md:hidden">
          <div className="mb-3">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full rounded-md border bg-card px-3 py-2 text-sm text-foreground"
            >
              {cities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => navigate(isLoggedIn ? "/post-property" : "/login")}
            className="mb-3 w-full rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
          >
            Post Property
          </button>
          {!isLoggedIn && (
            <button
              onClick={() => navigate("/login")}
              className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
