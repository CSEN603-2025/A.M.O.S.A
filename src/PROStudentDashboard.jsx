import React from "react";
import './CSS/StudentDashboard.css';
import { FiBell } from 'react-icons/fi';
import { FaPhone } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'; // ✅ Import added

const PROStudentDashboard = () => {
    const navigate = useNavigate();

    const goToCalls = () => {
        navigate("/student/Calls");
    };

    const goToNotifications = () => {
        navigate("/PROStudentNotifications");
    };

    const missedCalls = 5;
    const notifications = 3;

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
                </div>
            </header>

            <div className="dashboard-content">
                <aside className="dashboard-sidebar">
                    <h2 className="sidebar-title">Navigation</h2>
                    <ul className="nav-list">
                        <li className="nav-item">Home</li>
                        <li className="nav-item"><a href="/PROStudentinternship" className="nav-link">Browse Internships</a></li>
                        <li className="nav-item"><a href="/PROStudentApplied" className="nav-link">View Applied Internships</a></li>
                        <li className="nav-item"><a href="/student/proprofile" className="nav-link">My Profile</a></li>
                        <li className="nav-item"><a href="/PROMyInternships" className="nav-link">My Internships</a></li>
                        <li className="nav-item"><a href="/student/appointments" className="nav-link">Appointments</a></li>
                        <li className="nav-item"><a href="/student/Calls" className="nav-link">Calls</a></li>
                        <li className="nav-item"><a href="/student/viewed" className="nav-link">Viewed my profile</a></li>
                        <li className="nav-item"><a href="/student/assessment" className="nav-link">Online assessments</a></li>
                        <li className="nav-item"><a href="/student/workshop" className="nav-link">Workshop</a></li>
                        <li className="nav-item"><a href="/PreRecord" className="nav-link">Pre-recorded workshops</a></li>
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

export default PROStudentDashboard;
