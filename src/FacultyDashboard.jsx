import React from "react";
import './CSS/FacultyDashboard.css';

const FacultyDashboard = () => {
    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                <h1 className="dashboard-title">Faculty Dashboard</h1>
            </header>
            <div className="dashboard-content">
                <aside className="dashboard-sidebar">
                    <h2 className="sidebar-title">Navigation</h2>
                    <ul className="nav-list">
                        <li className="nav-item"><a href="/faculty/reports" className="nav-link">Review Reports</a></li>
                        <li className="nav-item"><a href="/faculty/statistics" className="nav-link">Statistics</a></li>
                        <li className="nav-item"><a href="/faculty/settings" className="nav-link">Settings</a></li>
                    </ul>
                </aside>
                <main className="dashboard-main">
                    <section className="stats-section">
                        <h2 className="section-title">Report Review Status</h2>
                        <p>Reports to Review: 15</p>
                        <p>Flagged Reports: 3</p>
                        <p>Accepted Reports: 10</p>
                    </section>
                    <section className="filters-section">
                        <h2 className="section-title">Quick Filters</h2>
                        <button className="action-button">Pending Reports</button>
                        <button className="action-button">Flagged Reports</button>
                        <button className="action-button">Accepted Reports</button>
                    </section>
                    <div className="actions-section">
                        <h2 className="section-title">Actions</h2>
                        <button className="action-button">View All Reports</button>
                        <button className="action-button">Generate Statistics</button>
                    </div>
                </main>
            </div>
            <footer className="dashboard-footer">
                <p>&copy; 2025 SCAD System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default FacultyDashboard;

