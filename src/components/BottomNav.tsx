import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  PlusSquare,
  LayoutDashboard,
  Briefcase,
  MapPin,
  LogIn,
  ChevronDown,
  Building2,
  MessageSquare,
  Heart,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cities } from "@/data/mockData";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();
  const [cityOpen, setCityOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [showSignoutConfirm, setShowSignoutConfirm] = useState(false);

  const handleSignout = () => {
    setAvatarOpen(false);
    setShowSignoutConfirm(true);
  };

  const confirmSignout = () => {
    logout();
    setShowSignoutConfirm(false);
    navigate("/");
  };

  // Pre-login tabs
  const preLoginTabs = [
    { label: "Home", icon: Home, path: "/" },
    { label: "Services", icon: Briefcase, path: "/services" },
    { label: "Post", icon: PlusSquare, path: "/login" },
    { label: "Login", icon: LogIn, path: "/login" },
  ];

  // Post-login tabs
  const postLoginTabs = [
    { label: "Home", icon: Home, path: "/" },
    { label: "Services", icon: Briefcase, path: "/services" },
    { label: "Post", icon: PlusSquare, path: "/post-property" },
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Account", icon: null, action: "avatar" as const },
  ];

  const tabs = isLoggedIn ? postLoginTabs : preLoginTabs;

  const handleTabClick = (tab: (typeof tabs)[0]) => {
    if ("action" in tab && tab.action === "avatar") {
      setAvatarOpen(!avatarOpen);
    } else if ("path" in tab && tab.path) {
      navigate(tab.path);
      setAvatarOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card md:hidden">
        {/* City selector popup */}
        {cityOpen && (
          <div className="absolute bottom-full left-0 right-0 border-t bg-card px-4 py-3 shadow-lg">
            <p className="mb-2 text-xs font-medium text-muted-foreground">
              Select City
            </p>
            <div className="grid grid-cols-3 gap-2">
              {cities.map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    setSelectedCity(city);
                    setCityOpen(false);
                  }}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${selectedCity === city
                    ? "border-primary bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted"
                    }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Avatar dropdown popup */}
        {avatarOpen && isLoggedIn && (
          <div className="absolute bottom-full left-0 right-0 border-t bg-card px-4 py-3 shadow-lg">
            <div className="mb-3 flex items-center gap-3 border-b pb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                {user?.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  {user?.name}
                </p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <div className="space-y-1">
              <button
                onClick={() => {
                  navigate("/my-properties");
                  setAvatarOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
              >
                <Building2 className="h-4 w-4 text-muted-foreground" /> My
                Properties
              </button>
              <button
                onClick={() => {
                  navigate("/leads-enquiries");
                  setAvatarOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
              >
                <MessageSquare className="h-4 w-4 text-muted-foreground" />{" "}
                Leads & Enquiries
              </button>
              <button
                onClick={() => {
                  navigate("/my-shortlist");
                  setAvatarOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
              >
                <Heart className="h-4 w-4 text-muted-foreground" /> My
                Shortlist
              </button>
              <button
                onClick={() => {
                  navigate("/dashboard");
                  setAvatarOpen(false);
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
              >
                <Settings className="h-4 w-4 text-muted-foreground" /> Profile
                Settings
              </button>
              <div className="border-t pt-1">
                <button
                  onClick={handleSignout}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-destructive transition-colors hover:bg-muted"
                >
                  <LogOut className="h-4 w-4" /> Signout
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Nav Bar */}
        <div className="flex h-16 items-center justify-around">
          {tabs.map((tab) => {
            const isActive =
              "path" in tab && tab.path
                ? location.pathname === tab.path
                : false;
            const isAvatarTab =
              "action" in tab && tab.action === "avatar";

            return (
              <button
                key={tab.label}
                onClick={() => handleTabClick(tab)}
                className={`flex flex-col items-center gap-1 px-3 py-1 transition-colors ${isActive ? "text-primary" : "text-muted-foreground"
                  }`}
              >
                {isAvatarTab ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                    {user?.name.charAt(0)}
                  </div>
                ) : (
                  tab.icon && <tab.icon className="h-5 w-5" />
                )}
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>
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

export default BottomNav;
