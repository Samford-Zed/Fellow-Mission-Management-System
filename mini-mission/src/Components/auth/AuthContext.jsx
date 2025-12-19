import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

const API = "http://localhost:7000/api/auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // ============================
  // LOAD SAVED SESSION ON START
  // ============================
  useEffect(() => {
    const saved = localStorage.getItem("miniMissionAuth");

    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed.user);
      setRole(parsed.role);
      setToken(parsed.token);
    }

    setLoading(false);
  }, []);

  // ==================================================
  // REGISTER USER
  // ==================================================
  const register = async (formData) => {
    try {
      const res = await fetch(`${API}/signup`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name || formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      return res.json();
    } catch (err) {
      return { success: false, message: "Network error" };
    }
  };

  // ==================================================
  // LOGIN USER (STORE TOKEN)
  // ==================================================
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

      const loggedUser = {
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
      };

      // Save session
      const session = {
        user: loggedUser,
        role: loggedUser.role,
        token: data.token, // ⭐ store token
      };

      localStorage.setItem("miniMissionAuth", JSON.stringify(session));

      setUser(loggedUser);
      setRole(loggedUser.role);
      setToken(data.token);

      return { success: true, role: loggedUser.role };
    } catch (err) {
      return { success: false, message: "Network error" };
    }
  };

  // ==================================================
  // LOGOUT
  // ==================================================
  const logout = () => {
    localStorage.removeItem("miniMissionAuth");
    setUser(null);
    setRole(null);
    setToken(null);
  };

  // ==================================================
  // SEND AUTHORIZED REQUESTS
  // ==================================================

  const authFetch = async (path, options = {}) => {
    const res = await fetch(`http://localhost:7000${path}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    return res.json();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        token,
        loading,
        isAuthenticated: !!user,
        register,
        login,
        logout,
        authFetch, // ⭐ use this for protected API calls
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
