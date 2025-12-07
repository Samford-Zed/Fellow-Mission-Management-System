import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { Rocket, Shield, Users, ChevronRight, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className='landing-root'>
      {/* Overlay */}
      <div className='landing-overlay' />

      {/* Content */}
      <div className='landing-content'>
        {/* Navigation */}
        <nav className='landing-nav'>
          <div className='logo-container'>
            <div className='logo-icon'>
              <Rocket size={24} />
            </div>
            <span className='logo-text'>Mini Mission</span>
          </div>
          <div className='nav-buttons'>
            <Link to={createPageUrl("SignIn")} className='nav-link'>
              Sign In
            </Link>
            <Link to={createPageUrl("Register")} className='nav-btn-primary'>
              Get Started
              <ChevronRight size={16} />
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <main className='hero-section'>
          <div className='hero-badge'>
            <Sparkles size={14} />
            <span>Streamline Your Missions</span>
          </div>

          <h1 className='hero-title'>
            Collect Data.
            <br />
            <span className='gradient-text'>Manage Teams.</span>
            <br />
            Achieve Goals.
          </h1>

          <p className='hero-description'>
            A powerful platform for organizing field operations, collecting
            data, and managing your team's missions with elegance and precision.
          </p>

          <div className='hero-buttons'>
            <Link to={createPageUrl("Register")} className='btn-hero-primary'>
              Start Your Mission
              <ChevronRight size={18} />
            </Link>
            <Link to={createPageUrl("SignIn")} className='btn-hero-secondary'>
              I Have an Account
            </Link>
          </div>

          {/* Feature Cards */}
          <div className='features-grid'>
            <div className='feature-card'>
              <div className='feature-icon'>
                <Users size={24} />
              </div>
              <h3>Team Management</h3>
              <p>Organize users into groups and assign missions seamlessly</p>
            </div>
            <div className='feature-card'>
              <div className='feature-icon'>
                <Shield size={24} />
              </div>
              <h3>Role-Based Access</h3>
              <p>Secure admin and user dashboards with protected routes</p>
            </div>
            <div className='feature-card'>
              <div className='feature-icon'>
                <Rocket size={24} />
              </div>
              <h3>Data Collection</h3>
              <p>Streamlined forms for field data collection and tracking</p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className='landing-footer'>
          <p>© 2024 Mini Mission. Built with precision.</p>
        </footer>
      </div>

      <style>{`
        .landing-root {
          min-height: 100vh;
          background-image: url("https://images.pexels.com/photos/34037/pexels-photo.jpg");
          background-size: cover;
          background-position: center;
          background-attachment: fixed;
          position: relative;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .landing-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(10, 10, 30, 0.85) 0%,
            rgba(20, 20, 50, 0.75) 50%,
            rgba(30, 20, 60, 0.85) 100%
          );
          backdrop-filter: blur(2px);
        }

        .landing-content {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* Navigation */
        .landing-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 4rem;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-icon {
          width: 44px;
          height: 44px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 8px 32px rgba(124, 58, 237, 0.3);
        }

        .logo-text {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          letter-spacing: -0.5px;
        }

        .nav-buttons {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .nav-link {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          font-weight: 500;
          padding: 0.625rem 1.25rem;
          border-radius: 10px;
          transition: all 0.3s ease;
        }

        .nav-link:hover {
          color: white;
          background: rgba(255, 255, 255, 0.1);
        }

        .nav-btn-primary {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: white;
          text-decoration: none;
          font-weight: 600;
          padding: 0.625rem 1.5rem;
          border-radius: 10px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(124, 58, 237, 0.3);
        }

        .nav-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(124, 58, 237, 0.4);
        }

        /* Hero Section */
        .hero-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem 4rem 4rem;
          text-align: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(124, 58, 237, 0.2);
          border: 1px solid rgba(124, 58, 237, 0.3);
          color: #c4b5fd;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 2rem;
          backdrop-filter: blur(10px);
        }

        .hero-title {
          font-size: 4.5rem;
          font-weight: 800;
          color: white;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -2px;
        }

        .gradient-text {
          background: linear-gradient(135deg, #a855f7, #ec4899, #f97316);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 600px;
          line-height: 1.7;
          margin-bottom: 2.5rem;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
          margin-bottom: 5rem;
        }

        .btn-hero-primary {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: white;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.125rem;
          padding: 1rem 2rem;
          border-radius: 14px;
          transition: all 0.3s ease;
          box-shadow: 0 8px 32px rgba(124, 58, 237, 0.35);
        }

        .btn-hero-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(124, 58, 237, 0.45);
        }

        .btn-hero-secondary {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          text-decoration: none;
          font-weight: 600;
          font-size: 1.125rem;
          padding: 1rem 2rem;
          border-radius: 14px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .btn-hero-secondary:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        /* Features */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          width: 100%;
          max-width: 1000px;
        }

        .feature-card {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          backdrop-filter: blur(20px);
          transition: all 0.4s ease;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .feature-icon {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(168, 85, 247, 0.2));
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c4b5fd;
          margin-bottom: 1.25rem;
        }

        .feature-card h3 {
          color: white;
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.75rem;
        }

        .feature-card p {
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9375rem;
          line-height: 1.6;
        }

        /* Footer */
        .landing-footer {
          padding: 2rem;
          text-align: center;
        }

        .landing-footer p {
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.875rem;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .hero-title {
            font-size: 3.5rem;
          }
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
            padding: 0 1rem;
          }
        }

        @media (max-width: 768px) {
          .landing-nav {
            padding: 1rem 1.5rem;
          }
          .hero-section {
            padding: 2rem 1.5rem;
          }
          .hero-title {
            font-size: 2.5rem;
            letter-spacing: -1px;
          }
          .hero-description {
            font-size: 1rem;
          }
          .hero-buttons {
            flex-direction: column;
            width: 100%;
            max-width: 300px;
          }
          .btn-hero-primary,
          .btn-hero-secondary {
            justify-content: center;
            width: 100%;
          }
          .features-grid {
            grid-template-columns: 1fr;
          }
          .nav-buttons {
            gap: 0.5rem;
          }
          .nav-link {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
