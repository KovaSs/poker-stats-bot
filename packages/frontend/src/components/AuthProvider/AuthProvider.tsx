import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface UserIdentity {
  platform: string;
  username: string;
  chat_id: number;
  id: number;
}

interface User {
  telegram_id: number | null;
  identities: UserIdentity[];
  role: "admin" | "user";
  vk_id: number | null;
  id: number;
}

interface AuthContextValue {
  login: (token: string) => Promise<void>;
  isAuthenticated: boolean;
  token: string | null;
  logout: () => void;
  user: User | null;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  isAdmin: false,
  token: null,
  user: null,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("jwt_token"));
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (token) {
      fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => setUser(data))
        .catch(() => {
          localStorage.removeItem("jwt_token");
          setToken(null);
        });
    }
  }, [token]);

  const login = async (newToken: string) => {
    localStorage.setItem("jwt_token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("jwt_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token && !!user,
        isAdmin: user?.role === "admin",
        logout,
        token,
        login,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
