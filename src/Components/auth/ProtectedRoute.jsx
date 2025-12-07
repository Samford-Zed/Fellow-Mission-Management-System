import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { createPageUrl } from "../../utils";
import { Loader2 } from "lucide-react";

export function AdminRoute({ children }) {
  const { isAuthenticated, role, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className='route-loading'>
        <Loader2 className='spinner' size={40} />
        <p>Loading...</p>
        <style>{`
          .route-loading {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%);
            color: white;
            gap: 1rem;
          }
          .spinner {
            animation: spin 1s linear infinite;
            color: #a855f7;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={createPageUrl("SignIn")} replace />;
  }

  if (role !== "admin") {
    return <Navigate to={createPageUrl("UserDashboard")} replace />;
  }

  return children;
}

export function UserRoute({ children }) {
  const { isAuthenticated, role, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className='route-loading'>
        <Loader2 className='spinner' size={40} />
        <p>Loading...</p>
        <style>{`
          .route-loading {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%);
            color: white;
            gap: 1rem;
          }
          .spinner {
            animation: spin 1s linear infinite;
            color: #a855f7;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={createPageUrl("SignIn")} replace />;
  }

  if (role === "admin") {
    return <Navigate to={createPageUrl("AdminDashboard")} replace />;
  }

  return children;
}
