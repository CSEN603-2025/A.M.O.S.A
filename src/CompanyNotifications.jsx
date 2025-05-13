import React, { useState } from "react";
import './CSS/StudentDashboard.css'; // Reusing styles from Student version
import './CSS/browseInternships.css';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";

const CompanyNotifications = () => {
    const navigate = useNavigate();
    const [expandedId, setExpandedId] = useState(null);

    const notifications = [
        {
            id: 1,
            type: 'email',
            message: 'New application received for "Frontend Developer Intern".',
            time: '5 minutes ago'
        },
        {
            id: 2,
            type: 'email',
            message: 'Candidate John Doe has accepted the offer for "Data Analyst Intern".',
            time: '1 hour ago'
        },
        {
            id: 3,
            type: 'email',
            message: 'New application received for "Backend Developer Intern".',
            time: '2 hours ago'
        },
        {
            id: 4,
            type: 'system',
            message: 'Your application has been accepted, welcome to the system',
            time: 'Yesterday, 9:45 AM'
        }
    ];

    return (
        <div className="browser-wrapper">
            <header className="browser-header">
                <h1 className="browser-title">Notifications</h1>
            </header>

            <main className="browser-main">
                <button className="back-button" onClick={() => navigate('/CompanyDashboard')}>
                    <FiArrowLeft style={{ marginRight: '5px' }} /> Back to Dashboard
                </button>

                <section className="filter-section">
                    <h2 className="section-title">Latest Alerts</h2>
                    <ul className="internship-list">
                        {notifications.map(notification => (
                            <li
                                key={notification.id}
                                className="internship-item"
                                onClick={() => setExpandedId(expandedId === notification.id ? null : notification.id)}
                                style={{ cursor: "pointer" }}
                            >
                                <p><strong>{notification.type === 'email' ? 'Email: ' : 'System: '}</strong>{notification.message}</p>
                                <small><em>{notification.time}</em></small>

                                {expandedId === notification.id && (
                                    <div style={{ marginTop: '10px' }}>
                                        <p>Full Notification:</p>
                                        <p><strong>{notification.message}</strong></p>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            </main>

            <footer className="dashboard-footer">
                <p>&copy; 2025 SCAD System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default CompanyNotifications;
