import React from "react";
import './CSS/SCADOfficeDashboard.css';

const SCADOfficeDashboard = () => {
    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                <h1 className="dashboard-title">SCAD Office Dashboard</h1>
            </header>
            <div className="dashboard-content">
                <aside className="dashboard-sidebar">
                    <h2 className="sidebar-title">Navigation</h2>
                    <ul className="nav-list">
                        <li className="nav-item"><a href="/scad/companies" className="nav-link">Pending Company Applications</a></li>
                        <li className="nav-item"><a href="/scad/cycle" className="nav-link">Current Cycle Information</a></li>
                        <li className="nav-item"><a href="/scad/students" className="nav-link">View Students</a></li>
                        <li className="nav-item"><a href="/scad/reports" className="nav-link">View Reports</a></li>
                        <li className="nav-item"><a href="/scad/settings" className="nav-link">Settings</a></li>
                    </ul>
                </aside>
                <main className="dashboard-main">
                    <section className="stats-section">
                        <h2 className="section-title">Key Statistics</h2>
                        <p>Pending Company Applications: 12</p>
                        <p>Active Internship Cycles: 1</p>
                        <p>Total Students: 150</p>
                    </section>
                    <section className="cycle-section">
                        <h2 className="section-title">Current Cycle Information</h2>
                        <p>Start Date: May 1, 2025</p>
                        <p>End Date: August 31, 2025</p>
                        <p>Status: Active</p>
                    </section>
                    <div className="actions-section">
                        <h2 className="section-title">Quick Actions</h2>
                        <button className="action-button">View Pending Applications</button>
                        <button className="action-button">Manage Internship Cycle</button>
                        <button className="action-button">Generate Reports</button>
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
