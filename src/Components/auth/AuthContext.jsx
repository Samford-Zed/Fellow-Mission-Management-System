import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const API = "http://localhost:7000/api/auth";

  // ==========================
  // LOAD USER FROM LOCAL STORAGE
  // ==========================
  useEffect(() => {
    const saved = localStorage.getItem("miniMissionAuth");
    if (saved) {
      const parsed = JSON.parse(saved);
      setIsAuthenticated(true);
      setUser(parsed.user);
      setRole(parsed.role);
    }
    setIsLoading(false);
  }, []);

  // ==========================
  // REGISTER USER (SIGNUP)
  // ==========================
  const register = async (formData) => {
    try {
      const res = await fetch(`${API}/signup`, {
        method: "POST",
        credentials: "include", // FIXED: cookie saved
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name || formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await res.json();
      return data;
    } catch (err) {
      return { success: false, message: "Network error" };
    }
  };

  // ==========================
  // LOGIN USER
  // ==========================
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!data.success) return data;

      // SAVE REAL USER FROM BACKEND
      const loggedInUser = {
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
      };

      setIsAuthenticated(true);
      setUser(loggedInUser);
      setRole(loggedInUser.role);

      // SAVE IN LOCAL STORAGE
      localStorage.setItem(
        "miniMissionAuth",
        JSON.stringify({
          user: loggedInUser,
          role: loggedInUser.role,
        })
      );

      return { success: true, role: loggedInUser.role };
    } catch (err) {
      return { success: false, message: "Network error" };
    }
  };

  // ==========================
  // LOGOUT
  // ==========================
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setRole(null);
    localStorage.removeItem("miniMissionAuth");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        role,
        isLoading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
