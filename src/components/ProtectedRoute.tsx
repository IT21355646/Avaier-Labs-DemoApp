// src/components/ProtectedRoute.tsx
import React from "react";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="p-8 text-center text-red-500">
        Access denied. Please log in.
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
