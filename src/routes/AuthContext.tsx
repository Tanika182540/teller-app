import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { errorToast } from "../shared/components/Toast";
import { User } from "firebase/auth";

interface AuthContextType {
  user?: User;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(undefined);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use authentication context
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType | undefined => {
  const context = useContext(AuthContext);
  if (!context) {
    errorToast("useAuth must be used within an AuthProvider");
  }
  return context;
};
