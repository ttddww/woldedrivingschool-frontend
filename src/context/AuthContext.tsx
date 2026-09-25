import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { api, clearToken, getToken, setToken } from "../api";

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  addressLine?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  programId?: number | string | null;
  drivingExperience?: string;
  preferredTime?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  notes?: string;
  email: string;
  phone: string;
  role?: string;
  program?: { id: number; name: string; priceCents: number; currency: string } | null;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  register: (incoming: User & { password: string }) => Promise<string | null>;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);
const SESSION_KEY = "wolde-session";

function getStoredUser(): User | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function saveUser(next: User | null) {
  if (next) localStorage.setItem(SESSION_KEY, JSON.stringify(next));
  else localStorage.removeItem(SESSION_KEY);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getStoredUser());
  const [loading, setLoading] = useState(() => Boolean(getToken()));

  const refreshUser = async () => {
    if (!getToken()) {
      setLoading(false);
      return;
    }
    try {
      const data = await api<{ user: User }>("/api/auth/me");
      setUser(data.user);
      saveUser(data.user);
    } catch {
      clearToken();
      setUser(null);
      saveUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refreshUser();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,

      register: async (incoming) => {
        try {
          const data = await api<{ token: string; user: User }>("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(incoming),
          });
          setToken(data.token);
          setUser(data.user);
          saveUser(data.user);
          return null;
        } catch (error) {
          return error instanceof Error ? error.message : "Registration failed.";
        }
      },

      login: async (email, password) => {
        try {
          clearToken();
          const data = await api<{ token: string; user: User }>("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
          });
          setToken(data.token);
          setUser(data.user);
          saveUser(data.user);
          return null;
        } catch (error) {
          return error instanceof Error ? error.message : "Email or password is incorrect.";
        }
      },

      logout: () => {
        clearToken();
        saveUser(null);
        setUser(null);
      },

      refreshUser,
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
