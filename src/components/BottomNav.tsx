import { useLocation, useNavigate } from "react-router-dom";
import { Home, Search, PlusSquare, Heart, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const tabs = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Search", icon: Search, path: "/" },
  { label: "Post", icon: PlusSquare, path: "/post-property", requiresAuth: true },
  { label: "Saved", icon: Heart, path: "/my-shortlist", requiresAuth: true },
  { label: "Account", icon: User, path: "/dashboard", requiresAuth: true },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleNav = (tab: typeof tabs[0]) => {
    if (tab.requiresAuth && !isLoggedIn) {
      navigate("/login");
    } else {
      navigate(tab.path);
    }
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-card md:hidden">
      <div className="flex h-16 items-center justify-around">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.label}
              onClick={() => handleNav(tab)}
              className={`flex flex-col items-center gap-1 px-3 py-1 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
