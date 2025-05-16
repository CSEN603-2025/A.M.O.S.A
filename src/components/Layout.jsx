import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPhone } from "react-icons/fa";
import { FiBell, FiHome, FiBriefcase, FiList, FiInfo, FiUsers, FiFileText, FiBarChart2, FiCalendar, FiPhone as FiPhoneIcon, FiTool } from "react-icons/fi";
import '../CSS/SCADOfficeDashboard.css';
import { Link } from "react-router-dom";

const navItems = [
  { label: "Home", icon: <FiHome />, link: "/SCADOfficeDashboard" },
  { label: "Pending Company Applications", icon: <FiBriefcase />, link: "/scad/companies" },
  { label: "All Internships", icon: <FiList />, link: "/scad/interns" },
  { label: "Current Cycle Information", icon: <FiInfo />, link: "/scad/cycle" },
  { label: "View Students", icon: <FiUsers />, link: "/scad/students" },
  { label: "View Reports", icon: <FiFileText />, link: "/scad/reports" },
  { label: "Statistics", icon: <FiBarChart2 />, link: "/scad/Statistics" },
  { label: "Appointments", icon: <FiCalendar />, link: "/scad/Appointmnets" },
  { label: "Calls", icon: <FiPhoneIcon />, link: "/scad/Calls" },
  { label: "Workshop", icon: <FiTool />, link: "/scad/Workshop" },
];

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const missedCalls = 5;
  const notifications = 3;

  return (
    <div
      className="dashboard-root"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "row",
        background: "var(--bg)",

      }}
    >
      <aside className="sidebar" aria-label="Sidebar Navigation">
        <div className="sidebar-brand">SCAD</div>
        <nav>
          <ul className="sidebar-nav">
            {navItems.map((item) => (
              <li key={item.label} className="sidebar-nav-item">
                <Link to={item.link} className="sidebar-link">
                  <span className="sidebar-icon">{item.icon}</span>
                  <span className="sidebar-text">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <div
        className="main-area"
        style={{
          flex: "1 1 0%",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <header
          className="main-header"
          aria-label="SCAD Office Dashboard Header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 2.5rem 0 2.5rem",
            height: 56,
            background: "var(--header-bg)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div className="main-header-title">Welcome!</div>
          <div className="main-header-actions" style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
            <button onClick={() => navigate("/scad/Calls")} className="icon-btn" aria-label="Missed Calls">
              <FaPhone />
              <span className="badge" aria-label={`${missedCalls} missed calls`}>{missedCalls}</span>
            </button>
            <button onClick={() => navigate("/scad/noti")} className="icon-btn" aria-label="Notifications">
              <FiBell size={22} />
              <span className="badge" aria-label={`${notifications} notifications`}>{notifications}</span>
            </button>
            <a href="/" className="signout-btn" aria-label="Sign Out">Sign Out</a>
          </div>
        </header>
        <main
          className="main-content fade-in"
          aria-label="Main Content"
         
        >
          {children}
        </main>
        <footer className="main-footer" aria-label="Footer">
          <p>&copy; 2025 SCAD System. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;