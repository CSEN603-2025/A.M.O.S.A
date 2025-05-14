import React from "react";
import "./CSS/SCADOfficeDashboard.css";
import { FiBell } from 'react-icons/fi';
import { FaPhone } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const PROViewed = () => {
    const navigate = useNavigate();

    const goToCalls = () => {
        navigate("/student/Calls");
    };

    const goToNotifications = () => {
        navigate("/PROStudentNotifications");
    };

    const missedCalls = 5;
    const notifications = 3;

    // Sample company data with view timestamps
    const companies = [
        {
            id: 1,
            name: "Orange",
            viewedAt: new Date(Date.now() - 3600000 * 3), // 3 hours ago
        },
        {
            id: 2,
            name: "Siemens",
            viewedAt: new Date(Date.now() - 3600000 * 24), // 1 day ago
        },
        {
            id: 3,
            name: "GlobalFinance",
            viewedAt: new Date(Date.now() - 3600000 * 72), // 3 days ago
        }
    ];

    // Function to calculate time passed
    const getTimePassed = (date) => {
        const seconds = Math.floor((new Date() - date) / 1000);

        if (seconds < 60) return "Just now";
        if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
        return `${Math.floor(seconds / 86400)} days ago`;
    };

    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                <div className="header-left">
                    <h1 className="dashboard-title">PRO Student Dashboard</h1>
                </div>
                <div className="header-right">
                    <div className="header-icons">
                        <button onClick={goToCalls} className="notification-bell">
                            <FaPhone />
                            <span className="call-badge">{missedCalls}</span>
                        </button>

                        <button onClick={goToNotifications} className="notification-bell">
                            <FiBell size={24} />
                            <span className="notification-count">{notifications}</span>
                        </button>

                        <a href="/" className="signout-button">Sign Out</a>
                    </div>
                </div> {/* ✅ Properly closed header-right div */}
            </header>

            <div className="dashboard-content">
                <aside className="dashboard-sidebar">
                    <h2 className="sidebar-title">Navigation</h2>
                    <ul className="nav-list">
                        <li className="nav-item"><a href="/PROStudentDashboard" className="nav-link">Home</a></li>
                        <li className="nav-item"><a href="/PROStudentinternship" className="nav-link">Browse Internships</a></li>
                        <li className="nav-item"><a href="/PROStudentApplied" className="nav-link">View Applied Internships</a></li>
                        <li className="nav-item"><a href="/student/proprofile" className="nav-link">My Profile</a></li>
                        <li className="nav-item"><a href="/PROMyInternships" className="nav-link">My Internships</a></li>
                        <li className="nav-item"><a href="/student/appointments" className="nav-link">Appointments</a></li>
                        <li className="nav-item"><a href="/student/Calls" className="nav-link">Calls</a></li>
                        <li className="nav-item">Viewed my profile</li>
                        <li className="nav-item"><a href="/student/assessment" className="nav-link">Online assessments</a></li>
                        <li className="nav-item"><a href="/student/workshop" className="nav-link">Workshop</a></li>
                        <li className="nav-item"><a href="/PreRecord" className="nav-link">Pre-recorded workshops</a></li>
                    </ul>
                </aside>

                <main className="dashboard-main">
                    <h2>Companies That Viewed Your Profile</h2>

                    <ul className="company-list">
                        {companies.map((company) => (
                            <li key={company.id} className="company-item">
                                <div className="company-info">
                                    <h3>{company.name}</h3>
                                    <p className="view-time">Viewed {getTimePassed(company.viewedAt)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </main>
            </div>

            <footer className="dashboard-footer">
                <p>&copy; 2025 SCAD System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default PROViewed;
