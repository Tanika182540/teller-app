import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { errorToast } from "../shared/components/Toast";

interface AuthContextType {
  user: string | null;
  login: (userData: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (userData: string) => {
    localStorage.setItem("user", userData);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    errorToast("useAuth must be used within an AuthProvider");
  }
  return context;
};
