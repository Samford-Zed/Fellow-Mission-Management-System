import React, { useState, useEffect } from "react";
import { useAuth } from "../components/auth/AuthContext";
import AppLayout from "../components/ui-custom/AppLayout";
import PageHeader from "../components/ui-custom/PageHeader";
import Card from "../components/ui-custom/Card";
import Button from "../components/ui-custom/Button";

import {
  LayoutDashboard,
  Users,
  FolderKanban,
  Database,
  UserPlus,
  Plus,
  Search,
  MoreVertical,
  Phone,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  Shield,
  User,
} from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();

  // ------------
  // TABS
  // ------------
  const getInitialTab = () => {
    const hash = window.location.hash.replace("#", "");
    return ["users", "groups", "data"].includes(hash) ? hash : "users";
  };

  const [activeTab, setActiveTab] = useState(getInitialTab());
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const updateTabFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (["users", "groups", "data"].includes(hash)) setActiveTab(hash);
    };
    window.addEventListener("hashchange", updateTabFromHash);
    return () => window.removeEventListener("hashchange", updateTabFromHash);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    window.location.hash = tab;
  };

  // -----------------------------
  // REAL DATA STATES
  // -----------------------------
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [collectedData, setCollectedData] = useState([]);

  // -----------------------------
  // FETCH REAL DATA FROM BACKEND
  // -----------------------------
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [uRes, gRes, dRes] = await Promise.all([
          fetch("http://localhost:7000/api/admin/users", {
            credentials: "include",
          }),
          fetch("http://localhost:7000/api/admin/groups", {
            credentials: "include",
          }),
          fetch("http://localhost:7000/api/admin/collected", {
            credentials: "include",
          }),
        ]);

        const usersJson = await uRes.json();
        const groupsJson = await gRes.json();
        const dataJson = await dRes.json();

        if (usersJson.success) setUsers(usersJson.users);
        if (groupsJson.success) setGroups(groupsJson.groups);
        if (dataJson.success) setCollectedData(dataJson.data);
      } catch (err) {
        console.log("ADMIN DATA LOAD ERROR:", err);
      }
    };

    fetchAdminData();
  }, []);

  // -----------------------------
  // STATUS BADGES
  // -----------------------------
  const getStatusBadge = (status) => {
    const styles = {
      active: {
        bg: "rgba(16,185,129,0.15)",
        color: "#10b981",
        icon: CheckCircle2,
      },
      pending: {
        bg: "rgba(245,158,11,0.15)",
        color: "#f59e0b",
        icon: Clock,
      },
      inactive: {
        bg: "rgba(107,114,128,0.15)",
        color: "#6b7280",
        icon: XCircle,
      },
      completed: {
        bg: "rgba(16,185,129,0.15)",
        color: "#10b981",
        icon: CheckCircle2,
      },
    };

    const st = styles[status?.toLowerCase()] || styles.pending;
    const Icon = st.icon;

    return (
      <span
        className='status-badge'
        style={{ background: st.bg, color: st.color }}
      >
        <Icon size={14} />
        {status}
      </span>
    );
  };

  // -----------------------------
  // FILTERS
  // -----------------------------
  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredData = collectedData.filter(
    (d) =>
      d.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.collectedByName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // -----------------------------
  // DASHBOARD STATS
  // -----------------------------
  const stats = [
    {
      label: "Total Users",
      value: users.length,
      icon: Users,
      color: "#7c3aed",
    },
    {
      label: "Active Groups",
      value: groups.length,
      icon: FolderKanban,
      color: "#10b981",
    },
    {
      label: "Data Collected",
      value: collectedData.length,
      icon: Database,
      color: "#f59e0b",
    },
    {
      label: "Pending",
      value: collectedData.filter((d) => d.status === "Pending").length,
      icon: Clock,
      color: "#ef4444",
    },
  ];

  return (
    <AppLayout isAdmin={true}>
      <PageHeader
        title='Admin Dashboard'
        subtitle={`Welcome back, ${user?.name?.split(" ")[0] || "Admin"}`}
        icon={LayoutDashboard}
      />
      {/* Stats */}
      <div className='stats-grid'>
        {stats.map((stat, i) => (
          <Card key={i} hover className='stat-card'>
            <div
              className='stat-icon'
              style={{ background: `${stat.color}20` }}
            >
              <stat.icon size={24} style={{ color: stat.color }} />
            </div>
            <div className='stat-content'>
              <span className='stat-value'>{stat.value}</span>
              <span className='stat-label'>{stat.label}</span>
            </div>
          </Card>
        ))}
      </div>
      {/* Tabs */}
      <div className='admin-tabs'>
        <button
          className={`tab-btn ${activeTab === "users" ? "active" : ""}`}
          onClick={() => handleTabChange("users")}
        >
          <Users size={18} />
          Users
        </button>
        <button
          className={`tab-btn ${activeTab === "groups" ? "active" : ""}`}
          onClick={() => handleTabChange("groups")}
        >
          <FolderKanban size={18} />
          Groups
        </button>
        <button
          className={`tab-btn ${activeTab === "data" ? "active" : ""}`}
          onClick={() => handleTabChange("data")}
        >
          <Database size={18} />
          Collected Data
        </button>
      </div>
      {/* Search & Toolbar */}
      <div className='toolbar'>
        <div className='search-box'>
          <Search size={18} />
          <input
            type='text'
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {/* Users Table */}
      {activeTab === "users" && (
        <Card padding='none' className='data-table-card'>
          <div className='table-container'>
            <table className='data-table'>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Contact</th>
                  <th>Role</th>
                  <th>Group</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u._id}>
                    <td>
                      <div className='user-cell'>
                        <div className='user-avatar'>
                          {u.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div className='user-info'>
                          <span className='user-name'>{u.name}</span>
                          <span className='user-email'>{u.email}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className='contact-cell'>
                        <Phone size={14} />
                        {u.phone}
                      </div>
                    </td>

                    <td>
                      <span className={`role-badge ${u.role}`}>
                        {u.role === "admin" ? (
                          <Shield size={14} />
                        ) : (
                          <User size={14} />
                        )}
                        {u.role}
                      </span>
                    </td>

                    <td>{u.groupId?.name || "Unassigned"}</td>

                    <td>
                      <button className='action-btn'>
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
      {/* Groups Table */}
      {activeTab === "groups" && (
        <Card padding='none' className='data-table-card'>
          <div className='table-container'>
            <table className='data-table'>
              <thead>
                <tr>
                  <th>Group Name</th>
                  <th>Members</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {groups.map((g) => (
                  <tr key={g._id}>
                    <td>{g.name}</td>
                    <td>{g.members?.length}</td>

                    <td>
                      <button className='action-btn'>
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
      {/* Collected Data */}
      {activeTab === "data" && (
        <Card padding='none' className='data-table-card'>
          <div className='table-container'>
            <table className='data-table'>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Submitted By</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((d) => (
                  <tr key={d._id}>
                    <td>{d.name}</td>
                    <td>{d.phone}</td>
                    <td>{d.address}</td>
                    <td>{d.collectedByName}</td>
                    <td>
                      <div className='date-cell'>
                        <Calendar size={14} />
                        {d.createdAt?.split("T")[0]}
                      </div>
                    </td>
                    <td>{getStatusBadge(d.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}{" "}
      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .stat-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-content {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 1.75rem;
          font-weight: 700;
          color: white;
        }

        .stat-label {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .admin-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          padding: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 14px;
          width: fit-content;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          background: transparent;
          border: none;
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .tab-btn:hover {
          color: white;
          background: rgba(255, 255, 255, 0.05);
        }

        .tab-btn.active {
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          color: white;
        }

        .toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          min-width: 300px;
          color: rgba(255, 255, 255, 0.5);
        }

        .search-box input {
          background: transparent;
          border: none;
          color: white;
          font-size: 0.9375rem;
          width: 100%;
        }

        .search-box input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .search-box input:focus {
          outline: none;
        }

        .data-table-card {
          overflow: hidden;
        }

        .table-container {
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th,
        .data-table td {
          padding: 1rem 1.5rem;
          text-align: left;
        }

        .data-table th {
          background: rgba(255, 255, 255, 0.03);
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
          font-size: 0.8125rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .data-table td {
          color: rgba(255, 255, 255, 0.8);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .data-table tbody tr:hover {
          background: rgba(255, 255, 255, 0.03);
        }

        .user-cell {
          display: flex;
          align-items: center;
          gap: 0.875rem;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #7c3aed, #a855f7);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .user-info {
          display: flex;
          flex-direction: column;
        }

        .user-name {
          color: white;
          font-weight: 600;
        }

        .user-email {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.8125rem;
        }

        .contact-cell, .date-cell, .members-cell {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .role-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem 0.75rem;
          border-radius: 50px;
          font-size: 0.8125rem;
          font-weight: 500;
          text-transform: capitalize;
        }

        .role-badge.admin {
          background: rgba(124, 58, 237, 0.15);
          color: #a855f7;
        }

        .role-badge.user {
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.7);
        }

        .no-group {
          color: rgba(255, 255, 255, 0.4);
          font-style: italic;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem 0.75rem;
          border-radius: 50px;
          font-size: 0.8125rem;
          font-weight: 500;
          text-transform: capitalize;
        }

        .group-cell {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .group-icon {
          width: 36px;
          height: 36px;
          background: rgba(124, 58, 237, 0.15);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #a855f7;
        }

        .group-name {
          color: white;
          font-weight: 600;
        }

        .name-cell {
          font-weight: 600;
          color: white !important;
        }

        .submitted-by {
          color: #a855f7;
          font-weight: 500;
        }

        .action-buttons {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .action-btn {
          width: 36px;
          height: 36px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.6);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .action-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }

        @media (max-width: 1200px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          .admin-tabs {
            width: 100%;
            overflow-x: auto;
          }
          .toolbar {
            flex-direction: column;
            align-items: stretch;
          }
          .search-box {
            min-width: 100%;
          }
        }
      `}</style>
    </AppLayout>
  );
}

