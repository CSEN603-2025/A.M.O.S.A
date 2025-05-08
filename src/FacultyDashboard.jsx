import React from "react";
import './CSS/FacultyDashboard.css';

const FacultyDashboard = () => {
    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">

                <div className="header-left">
                    <h1 className="dashboard-title">Faculty Member Dashboard</h1>
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
                        <li className="nav-item"><a href="/faculty/reports" className="nav-link">Review Reports</a></li>
                        <li className="nav-item"><a href="/faculty/statistics" className="nav-link">Statistics</a></li>
                     
                    </ul>
                </aside>
                <main className="dashboard-main">
                    
                        <div className="welcome-box">
                            <h2 className="welcome-title">Welcome to the Fcaulty Dashboard</h2>
                            <p className="welcome-text">Use the navigation panel on the right to view Reports and Statisitcs </p>

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

