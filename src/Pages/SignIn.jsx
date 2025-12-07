import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { useAuth } from "../components/auth/AuthContext";

import Input from "../components/ui-custom/Input";
import Button from "../components/ui-custom/Button";
import Card from "../components/ui-custom/Card";

import { Rocket, Mail, Lock, ArrowLeft, LogIn, Info } from "lucide-react";

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  // ---------------- VALIDATION ----------------
  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------- HANDLE LOGIN ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validateForm()) return;

    setIsLoading(true);
    const result = await login(formData.email, formData.password);
    setIsLoading(false);

    // Backend returns { success: false, message: "..."}
    if (!result.success) {
      setServerError(result.message || "Invalid credentials");
      return;
    }

    // Backend returns token + role in Cookie
    const userRole = result.role || "user";

    if (userRole === "admin") {
      navigate("/app/admin/dashboard");
    } else {
      navigate("/app/user/dashboard");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ---------------- UI ----------------
  return (
    <div className='auth-page'>
      <div className='auth-overlay' />

      <div className='auth-container'>
        <Link to={createPageUrl("LandingPage")} className='back-link'>
          <ArrowLeft size={18} />
          Back to Home
        </Link>

        <Card padding='xl' className='auth-card'>
          <div className='auth-header'>
            <div className='auth-logo'>
              <Rocket size={28} />
            </div>
            <h1>Welcome Back</h1>
            <p>Sign in to continue your mission</p>
          </div>

          {/* LOGIN HINT */}
          <div className='login-hint'>
            <Info size={16} />
            <span>Login with your real account credentials.</span>
          </div>

          {/* SERVER ERROR */}
          {serverError && (
            <div
              style={{
                background: "rgba(255,0,0,0.15)",
                border: "1px solid rgba(255,0,0,0.4)",
                padding: "10px 14px",
                borderRadius: "8px",
                marginBottom: "1rem",
                color: "#ff9b9b",
              }}
            >
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className='auth-form'>
            <Input
              label='Email'
              name='email'
              type='email'
              placeholder='admin@mission.com'
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={Mail}
              required
              autoComplete='email'
            />

            <Input
              label='Password'
              name='password'
              type='password'
              placeholder='••••••••'
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              icon={Lock}
              required
              autoComplete='current-password'
            />

            <Button
              type='submit'
              fullWidth
              size='lg'
              isLoading={isLoading}
              icon={LogIn}
            >
              Sign In
            </Button>
          </form>

          <div className='auth-footer'>
            <p>
              Don't have an account?{" "}
              <Link to={createPageUrl("Register")}>Create one</Link>
            </p>
          </div>
        </Card>
      </div>

      <style>{`
        .auth-page {
          min-height: 100vh;
          background-image: url("https://images.pexels.com/photos/34037/pexels-photo.jpg");
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .auth-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(10, 10, 30, 0.9) 0%,
            rgba(20, 20, 50, 0.85) 50%,
            rgba(30, 20, 60, 0.9) 100%
          );
          backdrop-filter: blur(4px);
        }

        .auth-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 440px;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 0.875rem;
          margin-bottom: 1.5rem;
          transition: color 0.3s ease;
        }

        .back-link:hover {
          color: white;
        }

        .auth-card {
          animation: slideUp 0.5s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .auth-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .auth-logo {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin: 0 auto 1.25rem;
          box-shadow: 0 8px 32px rgba(124, 58, 237, 0.3);
        }

        .auth-header h1 {
          color: white;
          font-size: 1.75rem;
          font-weight: 700;
          margin: 0 0 0.5rem;
        }

        .auth-header p {
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }

        .login-hint {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(124, 58, 237, 0.15);
          border: 1px solid rgba(124, 58, 237, 0.3);
          border-radius: 10px;
          padding: 0.75rem 1rem;
          margin-bottom: 1.5rem;
          color: #c4b5fd;
          font-size: 0.8125rem;
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .auth-footer {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          text-align: center;
        }

        .auth-footer p {
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
          font-size: 0.9375rem;
        }

        .auth-footer a {
          color: #a855f7;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .auth-footer a:hover {
          color: #c4b5fd;
        }

        @media (max-width: 480px) {
          .auth-page {
            padding: 1rem;
          }
          .auth-header h1 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
