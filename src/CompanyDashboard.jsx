import React from "react";
import './CSS/CompanyDashboard.css';

const CompanyDashboard = () => {
    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                <h1 className="dashboard-title">Company Dashboard</h1>
            </header>
            <div className="dashboard-content">
                <aside className="dashboard-sidebar">
                    <h2 className="sidebar-title">Navigation</h2>
                    <ul className="nav-list">
                        <li className="nav-item">Home</li>
                        <li className="nav-item"><a href="/CompanyInternships" className="nav-link"> My Internship Posts</a></li>
                        <li className="nav-item"><a href="/company/applications" className="nav-link">Applications</a></li>
                        <li className="nav-item"><a href="/company/current-interns" className="nav-link">Current Interns</a></li>
                        <li className="nav-item"><a href="/company/evaluations" className="nav-link">Evaluations</a></li>
                        <li className="nav-item"><a href="/company/settings" className="nav-link">Settings</a></li>
                    </ul>
                </aside>
                <main className="dashboard-main">
                    <section className="stats-section">
                        <h2 className="section-title">Quick Stats</h2>
                        <p>Active Posts: 5</p>
                        <p>New Applications: 12</p>
                        <p>Current Interns: 8</p>
                    </section>
                    <section className="activity-section">
                        <h2 className="section-title">Recent Activity</h2>
                        <ul>
                            <li>New application for "Software Engineer Intern"</li>
                            <li>Post "Marketing Intern" updated</li>
                            <li>Application for "Data Analyst Intern" reviewed</li>
                        </ul>
                    </section>
                    <div className="actions-section">
                        <button className="action-button">Create New Internship Post</button>
                        <br />
                        <br />
                        <button className="action-button">View All Applications</button>
                    </div>
                </main>
            </div>
            <footer className="dashboard-footer">
                <p>&copy; 2025 SCAD System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default CompanyDashboard;

