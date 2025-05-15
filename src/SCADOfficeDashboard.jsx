import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPhone } from "react-icons/fa";
import { FiBell, FiHome, FiBriefcase, FiList, FiInfo, FiUsers, FiFileText, FiBarChart2, FiCalendar, FiPhone as FiPhoneIcon, FiTool } from "react-icons/fi";
import './CSS/SCADOfficeDashboard.css';
import DashboardLayout from './components/Layout';
const navItems = [
  { label: "Home", icon: <FiHome />, link: "/scad" },
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

const SCADOfficeDashboard = () => {
  const navigate = useNavigate();
  const missedCalls = 5;
  const notifications = 3;

  return (
    <DashboardLayout>
      
        <main className="main-content" aria-label="Main Content">
          <h2 className="main-welcome">Welcome to the SCAD Office Dashboard</h2>
          <p className="main-desc">
            Use the navigation panel on the left to explore and manage internships, company applications, students, and more.
          </p>
        </main>
       
      
    </DashboardLayout>
  );
};

export default SCADOfficeDashboard;
