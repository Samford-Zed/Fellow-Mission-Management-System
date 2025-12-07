import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { useAuth } from "../components/auth/AuthContext";
import AppLayout from "../components/ui-custom/AppLayout";
import PageHeader from "../components/ui-custom/PageHeader";
import Card from "../components/ui-custom/Card";
import Button from "../components/ui-custom/Button";
import {
  LayoutDashboard,
  FileText,
  ClipboardList,
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function UserDashboard() {
  const { user } = useAuth();

  // === REAL DATA STATES ===
  const [assignedGroup, setAssignedGroup] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  // Helper: get userId safely
  const userId = user?._id;

  // 🚀 Fetch Group + Submissions
  useEffect(() => {
    if (!userId) return;

    // Fetch group
    fetch(`http://localhost:7000/api/user/group/${userId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setAssignedGroup(data.group);
      })
      .catch((err) => console.log("Group fetch error:", err));

    // Fetch submissions
    fetch(`http://localhost:7000/api/user/submissions/${userId}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setSubmissions(data.submissions);
      })
      .catch((err) => console.log("Submissions fetch error:", err));
  }, [userId]);

  // === Stats ===
  const stats = [
    {
      label: "Total Submissions",
      value: submissions.length,
      icon: ClipboardList,
      color: "#7c3aed",
    },
    {
      label: "Completed",
      value: submissions.filter((s) => s.status === "Completed").length,
      icon: CheckCircle2,
      color: "#10b981",
    },
    {
      label: "Pending",
      value: submissions.filter((s) => s.status === "Pending").length,
      icon: Clock,
      color: "#f59e0b",
    },
  ];

  return (
    <AppLayout isAdmin={false}>
      <PageHeader
        title={`Welcome back, ${user?.name?.split(" ")[0] || "User"}!`}
        subtitle='Track your missions and submissions'
        icon={LayoutDashboard}
      />

      {/* Stats Grid */}
      <div className='stats-grid'>
        {stats.map((stat, index) => (
          <Card key={index} hover className='stat-card'>
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

      {/* Main Grid */}
      <div className='dashboard-grid'>
        {/* ===== GROUP CARD ===== */}
        <Card padding='lg' className='group-card'>
          <div className='card-header'>
            <Users size={20} />
            <h3>Group Assignment</h3>
          </div>

          {!assignedGroup ? (
            <div className='no-group'>
              <div className='no-group-icon'>
                <Users size={32} />
              </div>
              <p>No group assigned yet</p>
              <span>Contact your admin for group assignment</span>
            </div>
          ) : (
            <div className='group-info'>
              <div className='group-name'>
                <Sparkles size={18} className='group-icon' />
                <span>{assignedGroup.name}</span>
              </div>

              <div className='group-stats'>
                <div className='group-stat'>
                  <span className='stat-number'>
                    {assignedGroup.members?.length || 0}
                  </span>
                  <span className='stat-text'>Members</span>
                </div>

                <div className='group-stat'>
                  <span className='stat-number'>
                    {assignedGroup.activeMissions || 0}
                  </span>
                  <span className='stat-text'>Active Missions</span>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* ===== QUICK ACTIONS ===== */}
        <Card padding='lg' className='actions-card'>
          <div className='card-header'>
            <FileText size={20} />
            <h3>Quick Actions</h3>
          </div>

          <div className='actions-list'>
            <Link to={createPageUrl("FillForm")} className='action-item'>
              <div className='action-info'>
                <FileText size={20} />
                <div>
                  <span className='action-title'>Fill New Form</span>
                  <span className='action-desc'>Submit field data</span>
                </div>
              </div>
              <ArrowRight size={18} />
            </Link>

            <button
              onClick={() =>
                document
                  .getElementById("submissions")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className='action-item'
            >
              <div className='action-info'>
                <ClipboardList size={20} />
                <div>
                  <span className='action-title'>View Submissions</span>
                  <span className='action-desc'>See your history</span>
                </div>
              </div>
              <ArrowRight size={18} />
            </button>
          </div>
        </Card>
      </div>

      {/* ===== SUBMISSIONS TABLE ===== */}
      <Card padding='none' className='submissions-card' id='submissions'>
        <div className='submissions-header'>
          <div className='card-header'>
            <ClipboardList size={20} />
            <h3>My Submissions</h3>
          </div>

          <Link to={createPageUrl("FillForm")}>
            <Button size='sm' icon={FileText}>
              New Submission
            </Button>
          </Link>
        </div>

        <div className='table-container'>
          <table className='submissions-table'>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {submissions.length === 0 ? (
                <tr>
                  <td colSpan='4' style={{ textAlign: "center", padding: 20 }}>
                    No submissions found.
                  </td>
                </tr>
              ) : (
                submissions.map((s) => (
                  <tr key={s._id}>
                    <td className='name-cell'>{s.name}</td>
                    <td>{s.address}</td>
                    <td>
                      <div className='date-cell'>
                        <Calendar size={14} />
                        {s.date?.split("T")[0]}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${s.status.toLowerCase()}`}
                      >
                        {s.status === "Completed" && <CheckCircle2 size={14} />}
                        {s.status === "Pending" && <Clock size={14} />}
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <style>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
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

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: white;
          margin-bottom: 1.25rem;
        }

        .card-header h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0;
        }

        .group-info {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .group-name {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem;
          background: linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(168, 85, 247, 0.1));
          border: 1px solid rgba(168, 85, 247, 0.2);
          border-radius: 12px;
          color: white;
          font-weight: 600;
          font-size: 1.125rem;
        }

        .group-icon {
          color: #a855f7;
        }

        .group-stats {
          display: flex;
          gap: 1.5rem;
        }

        .group-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
        }

        .group-stat .stat-number {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
        }

        .group-stat .stat-text {
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .no-group {
          text-align: center;
          padding: 2rem;
        }

        .no-group-icon {
          width: 64px;
          height: 64px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.3);
          margin: 0 auto 1rem;
        }

        .no-group p {
          color: white;
          font-weight: 600;
          margin: 0 0 0.25rem;
        }

        .no-group span {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.875rem;
        }

        /* Container to center and equalize both action buttons */
.actions-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  max-width: 520px;       /* medium width – matches “View Submissions” area */
  margin: 0 auto;         /* center inside the card */
}

/* Each action button */
.action-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
  width: 100%;   
  height: 100%;          /* makes both equal width */
  cursor: pointer;
  font-family: inherit;
  font-size: inherit;
  box-sizing: border-box;
}

/* Hover state */
.action-item:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.15);
  color: white;
}

/* Icon + text wrapper */
.action-info {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  color: white;
}

/* Text alignment inside icons */
.action-info > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Title text */
.action-title {
  font-weight: 600;
  font-size: 0.9375rem;
}

/* Subtitle text */
.action-desc {
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.5);
}

        .submissions-card {
          overflow: hidden;
        }

        .submissions-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .submissions-header .card-header {
          margin-bottom: 0;
        }

        .table-container {
          overflow-x: auto;
        }

        .submissions-table {
          width: 100%;
          border-collapse: collapse;
        }

        .submissions-table th,
        .submissions-table td {
          padding: 1rem 1.5rem;
          text-align: left;
        }

        .submissions-table th {
          background: rgba(255, 255, 255, 0.03);
          color: rgba(255, 255, 255, 0.6);
          font-weight: 500;
          font-size: 0.8125rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .submissions-table td {
          color: rgba(255, 255, 255, 0.8);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .submissions-table tbody tr:hover {
          background: rgba(255, 255, 255, 0.03);
        }

        .name-cell {
          font-weight: 600;
          color: white !important;
        }

        .date-cell {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.375rem 0.75rem;
          border-radius: 50px;
          font-size: 0.8125rem;
          font-weight: 500;
        }

        .status-badge.completed {
          background: rgba(16, 185, 129, 0.15);
          color: #10b981;
        }

        .status-badge.pending {
          background: rgba(245, 158, 11, 0.15);
          color: #f59e0b;
        }

        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .submissions-header {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
        }
      `}</style>
    </AppLayout>
  );
}
