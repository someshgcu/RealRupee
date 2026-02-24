import { createContext, useContext, useState, ReactNode } from "react";
import { currentUser, CurrentUser } from "@/data/mockData";

interface AuthContextType {
  isLoggedIn: boolean;
  user: CurrentUser | null;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user: isLoggedIn ? currentUser : null, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
