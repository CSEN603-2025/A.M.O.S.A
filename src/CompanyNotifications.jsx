import React from "react";
import './CSS/CompanyDashboard.css';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

const CompanyNotifications = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate('/CompanyDashboard');
    };

    // Dummy notification data
    const notifications = [
        {
            id: 1,
            type: 'system',
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
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                <h1 className="dashboard-title">Notifications</h1>
                <button className="notification-bell" onClick={handleBackClick} title="Back to Dashboard">
                    <FiArrowLeft size={24} />
                </button>
            </header>
            <main className="dashboard-main">
                <section className="activity-section">
                    <h2 className="section-title">Recent Notifications</h2>
                    <ul className="posts-list">
                        {notifications.map((notif) => (
                            <li key={notif.id} className="internship-post">
                                <strong>{notif.type === 'email' ? 'Email: ' : 'System: '}</strong>
                                {notif.message}
                                <br />
                                <small style={{ color: '#4682b4' }}>{notif.time}</small>
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
