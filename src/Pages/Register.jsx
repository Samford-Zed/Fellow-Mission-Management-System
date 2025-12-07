import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "../utils";
import { useAuth } from "../components/auth/AuthContext";
import Input from "../components/ui-custom/Input";
import Button from "../components/ui-custom/Button";
import Card from "../components/ui-custom/Card";
import {
  Rocket,
  User,
  Mail,
  Phone,
  Lock,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "", // MUST MATCH backend
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.phone.trim()) newErrors.phone = "Phone is required";

    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    // SEND EXACT STRUCTURE BACKEND EXPECTS
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };

    const result = await register(payload);
    setIsLoading(false);

    if (result.success) {
      alert("Registration successful! Please login.");
      navigate(createPageUrl("SignIn"));
    } else {
      alert(result.message || "Registration failed");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

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
            <h1>Create Account</h1>
            <p>Join Mini Mission and start your journey</p>
          </div>

          <form onSubmit={handleSubmit} className='auth-form'>
            <Input
              label='Full Name'
              name='name'
              placeholder='John Doe'
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              icon={User}
              required
            />

            <Input
              label='Email'
              name='email'
              type='email'
              placeholder='john@example.com'
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              icon={Mail}
              required
            />

            <Input
              label='Phone'
              name='phone'
              type='tel'
              placeholder='0911000000'
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              icon={Phone}
              required
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
            />

            <Button
              type='submit'
              fullWidth
              size='lg'
              isLoading={isLoading}
              icon={Sparkles}
            >
              Create Account
            </Button>
          </form>

          <div className='auth-footer'>
            <p>
              Already have an account?{" "}
              <Link to={createPageUrl("SignIn")}>Sign in</Link>
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
          margin-bottom: 2rem;
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
