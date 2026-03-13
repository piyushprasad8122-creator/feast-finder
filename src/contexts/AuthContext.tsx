import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "customer" | "admin" | "delivery";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: Record<UserRole, User> = {
  customer: { id: "u1", name: "Rahul Sharma", email: "rahul@example.com", role: "customer", phone: "+91 98765 43210" },
  admin: { id: "u2", name: "Admin User", email: "admin@zomato.com", role: "admin" },
  delivery: { id: "u3", name: "Ravi Kumar", email: "ravi@delivery.com", role: "delivery", phone: "+91 87654 32109" },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (_email: string, _password: string, role: UserRole) => {
    await new Promise(r => setTimeout(r, 500));
    setUser(mockUsers[role]);
  };

  const signup = async (name: string, email: string, _password: string, role: UserRole) => {
    await new Promise(r => setTimeout(r, 500));
    setUser({ id: "new-" + Date.now(), name, email, role });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
