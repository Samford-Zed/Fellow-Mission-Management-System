import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { useAuth } from "../auth/AuthContext";
import {
  Rocket,
  LayoutDashboard,
  Users,
  FolderKanban,
  Database,
  LogOut,
  Menu,
  X,
  FileText,
  ClipboardList,
} from "lucide-react";

export default function Sidebar({ isAdmin = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout, user } = useAuth();
  const location = useLocation();

  const adminLinks = [
    { name: "Users", icon: Users, page: "AdminDashboard", hash: "users" },
    {
      name: "Groups",
      icon: FolderKanban,
      page: "AdminDashboard",
      hash: "groups",
    },
    {
      name: "Collected Data",
      icon: Database,
      page: "AdminDashboard",
      hash: "data",
    },
  ];

  const userLinks = [
    { name: "Dashboard", icon: LayoutDashboard, page: "UserDashboard" },
    { name: "Fill Form", icon: FileText, page: "FillForm" },
    {
      name: "My Submissions",
      icon: ClipboardList,
      page: "UserDashboard",
      hash: "submissions",
      scroll: true,
    },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  const handleLogout = () => {
    logout();
    window.location.href = createPageUrl("SignIn");
  };

  const isActive = (link) => {
    const currentPath = location.pathname;
    const pagePath = createPageUrl(link.page);
    const currentHash = location.hash.replace("#", "");

    if (currentPath !== pagePath) return false;

    // If the link has a hash, check if it matches
    if (link.hash) {
      return currentHash === link.hash;
    }

    // If no hash on link, only active if current page has no hash
    return !currentHash;
  };

  const styles = `
    .sidebar {
      position: fixed;
      left: 0;
      top: 0;
      height: 100vh;
      width: 260px;
      background: rgba(15, 15, 30, 0.95);
      border-right: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px);
      display: flex;
      flex-direction: column;
      z-index: 1000;
      transition: transform 0.3s ease;
    }

    .sidebar-header {
      padding: 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .sidebar-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
    }

    .sidebar-logo-icon {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #7c3aed, #a855f7);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .sidebar-logo-text {
      color: white;
      font-size: 1.25rem;
      font-weight: 700;
    }

    .sidebar-nav {
      flex: 1;
      padding: 1.5rem 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .sidebar-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.875rem 1rem;
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      border-radius: 12px;
      transition: all 0.3s ease;
      font-weight: 500;
    }

    .sidebar-link:hover {
      background: rgba(255, 255, 255, 0.08);
      color: white;
    }

    .sidebar-link.active {
      background: linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(168, 85, 247, 0.2));
      color: white;
      border: 1px solid rgba(168, 85, 247, 0.3);
    }

    .sidebar-link.active .sidebar-link-icon {
      color: #c4b5fd;
    }

    .sidebar-footer {
      padding: 1.5rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .sidebar-user {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }

    .sidebar-avatar {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #7c3aed, #a855f7);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      font-size: 1rem;
    }

    .sidebar-user-info {
      flex: 1;
      overflow: hidden;
    }

    .sidebar-user-name {
      color: white;
      font-weight: 600;
      font-size: 0.875rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .sidebar-user-role {
      color: rgba(255, 255, 255, 0.5);
      font-size: 0.75rem;
      text-transform: capitalize;
    }

    .sidebar-logout {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      width: 100%;
      padding: 0.75rem;
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.2);
      border-radius: 10px;
      color: #f87171;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .sidebar-logout:hover {
      background: rgba(239, 68, 68, 0.2);
      border-color: rgba(239, 68, 68, 0.3);
    }

    .mobile-toggle {
      display: none;
      position: fixed;
      top: 1rem;
      left: 1rem;
      z-index: 1001;
      width: 44px;
      height: 44px;
      background: rgba(15, 15, 30, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      color: white;
      cursor: pointer;
      align-items: center;
      justify-content: center;
    }

    .sidebar-overlay {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999;
    }

    @media (max-width: 1024px) {
      .sidebar {
        transform: translateX(-100%);
      }

      .sidebar.open {
        transform: translateX(0);
      }

      .mobile-toggle {
        display: flex;
      }

      .sidebar-overlay.visible {
        display: block;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>

      <button className='mobile-toggle' onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`sidebar-overlay ${isOpen ? "visible" : ""}`}
        onClick={() => setIsOpen(false)}
      />

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className='sidebar-header'>
          <Link to={createPageUrl("LandingPage")} className='sidebar-logo'>
            <div className='sidebar-logo-icon'>
              <Rocket size={20} />
            </div>
            <span className='sidebar-logo-text'>Mini Mission</span>
          </Link>
        </div>

        <nav className='sidebar-nav'>
          {links.map((link) => (
            <Link
              key={link.name}
              to={createPageUrl(link.page) + (link.hash ? `#${link.hash}` : "")}
              className={`sidebar-link ${isActive(link) ? "active" : ""}`}
              onClick={() => {
                setIsOpen(false);
                if (link.scroll && link.hash) {
                  // Small delay to allow navigation to complete first
                  setTimeout(() => {
                    const element = document.getElementById(link.hash);
                    if (element) {
                      element.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }, 100);
                }
              }}
            >
              <link.icon size={20} className='sidebar-link-icon' />
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>

        <div className='sidebar-footer'>
          <div className='sidebar-user'>
            <div className='sidebar-avatar'>
              {user?.fullName?.[0] || user?.email?.[0]?.toUpperCase() || "U"}
            </div>
            <div className='sidebar-user-info'>
              <div className='sidebar-user-name'>
                {user?.fullName || user?.email}
              </div>
              <div className='sidebar-user-role'>
                {isAdmin ? "Administrator" : "User"}
              </div>
            </div>
          </div>
          <button className='sidebar-logout' onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
