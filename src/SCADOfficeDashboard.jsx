import React from "react";
import './CSS/SCADOfficeDashboard.css';

const SCADOfficeDashboard = () => {
    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                <div className="header-left">
                    <h1 className="dashboard-title">SCAD Office Dashboard</h1>
                </div>
                <div className="header-right">
                    <a href="/" className="signout-button">Sign Out</a>
                </div>
            </header>
            <div className="dashboard-content">
                <aside className="dashboard-sidebar">
                    <h2 className="sidebar-title">Navigation</h2>
                    <ul className="nav-list">
                        <li className="nav-item">Home</li>
                        <li className="nav-item"><a href="/scad/companies" className="nav-link">Pending Company Applications</a></li>
                        <li className="nav-item"><a href="/scad/interns" className="nav-link">All Internships</a></li>
                        <li className="nav-item"><a href="/scad/cycle" className="nav-link">Current Cycle Information</a></li>
                        <li className="nav-item"><a href="/scad/students" className="nav-link">View Students</a></li>
                        <li className="nav-item"><a href="/scad/reports" className="nav-link">View Reports</a></li>
                        <li className="nav-item"><a href="/scad/Statistics" className="nav-link">Statistics</a></li>
                        <li className="nav-item"><a href="/scad/Appointmnets" className="nav-link">Appointments</a></li>
                        <li className="nav-item"><a href="/scad/Calls" className="nav-link">Calls</a></li>
                        <li className="nav-item"><a href="/scad/Workshop" className="nav-link">Workshop</a></li>
                    </ul>
                </aside>
                <main className="dashboard-main">
                    <div className="welcome-box">
                        <h2 className="welcome-title">Welcome to the SCAD Office Dashboard</h2>
                        <p className="welcome-text">Use the navigation panel on the right to explore and manage internships, company applications, students, and more.</p>
                    </div>
                </main>
            </div>
            <footer className="dashboard-footer">
                <p>&copy; 2025 SCAD System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default SCADOfficeDashboard;
