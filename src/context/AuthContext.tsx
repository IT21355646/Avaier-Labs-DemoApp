// Sample auth context
import React, { createContext, useContext, useState, ReactNode } from "react";

type Role = "Admin" | "Broker";

interface AuthContextType {
  isAuthenticated: boolean;
  role: Role | null;
  login: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setAuthenticated] = useState(true);
  const [role, setRole] = useState<Role | null>("Admin"); // Mock role

  const login = (role: Role) => {
    setAuthenticated(true);
    setRole(role);
  };

  const logout = () => {
    setAuthenticated(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
