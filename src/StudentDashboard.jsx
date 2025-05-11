import React from "react";
import './CSS/StudentDashboard.css';
import { FiBell } from 'react-icons/fi'; // Bell icon

const StudentDashboard = () => {
    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                <h1 className="dashboard-title">Student Dashboard</h1>
            </header>
            <div className="dashboard-content">
                <aside className="dashboard-sidebar">
                    {/* Notification Icon Section */}
                    <div className="notification-widget">
                        <a href="/StudentNotifications" className="notification-link">
                            <FiBell size={18} className="bell-icon" />
                            <span>Notifications</span>
                        </a>
                    </div>

                    <h2 className="sidebar-title">Navigation</h2>
                    <ul className="nav-list">
                        <li className="nav-item">Home</li>
                        <li className="nav-item"><a href="/studentInternships" className="nav-link">Browse Internships</a></li>
                        <li className="nav-item"><a href="/StudentApplied" className="nav-link">View Applied Internships</a></li>
                        <li className="nav-item"><a href="/student/profile" className="nav-link">My Profile</a></li>
                        <li className="nav-item"><a href="/student/settings" className="nav-link">Settings</a></li>
                    </ul>
                </aside>

                <main className="dashboard-main">
                    <section className="recommendations-section">
                        <h2 className="section-title">Internship Recommendations</h2>
                        <ul>
                            <li>Software Engineer Intern at TechCorp</li>
                            <li>Marketing Intern at Marketify</li>
                            <li>Data Analyst Intern at DataWorks</li>
                        </ul>
                    </section>

                    <section className="video-section">
                        <h2 className="section-title">Introduction Video</h2>
                        <div className="video-placeholder">
                            <p>Video cannot be played. No video link provided.</p>
                            <button className="play-button" disabled>Play</button>
                        </div>
                    </section>

                    <section className="status-section">
                        <h2 className="section-title">Current Internship</h2>
                        <p>Status: Active</p>
                        <p>Company: TechCorp</p>
                        <p>Role: Software Engineer Intern</p>
                    </section>

                    <section className="deadlines-section">
                        <h2 className="section-title">Upcoming Deadlines</h2>
                        <ul>
                            <li>Submit Internship Report - May 15, 2025</li>
                            <li>Apply for Summer Internships - June 1, 2025</li>
                        </ul>
                    </section>
                </main>
            </div>
            <footer className="dashboard-footer">
                <p>&copy; 2025 SCAD System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default StudentDashboard;
