import React, { useState } from "react";
import './CSS/StudentDashboard.css';
import './CSS/browseInternships.css';

const StudentNotifications = () => {
    const [expandedId, setExpandedId] = useState(null);
    const [notifications] = useState([
        {
            id: 1,
            message: "🎉 A new internship cycle has begun! Start applying now.",
            date: "2025-05-01"
        },
        {
            id: 2,
            message: "⏳ A new internship cycle will begin next week. Get your documents ready!",
            date: "2025-04-25"
        },
        {
            id: 3,
            message: "📝 Your internship report status (Microsoft internship) has been sent.",
            date: "2025-04-25"
        },
        {
            id: 4,
            message: "📝 Your internship report status (Sumerge internship) has been sent.",
            date: "2025-04-29"
        }
    ]);

    return (
        <div className="browser-wrapper">
            <header className="browser-header">
                <h1 className="browser-title">Notifications</h1>
            </header>

            <main className="browser-main">
                <button className="back-button" onClick={() => window.location.href = "/StudentDashboard"}>
                    ← Back to Home
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
                                <p>{notification.message}</p>
                                <small><em>Date: {notification.date}</em></small>

                                {expandedId === notification.id && (
                                    <div style={{ marginTop: '10px' }}>
                                        <p>This is your full notification message:</p>
                                        <p><strong>{notification.message}</strong></p>
                                        {(notification.id === 3 || notification.id === 4) && (
                                            <button
                                                onClick={() => window.location.href = `/reportFeedback?source=${notification.id}`}
                                                className="view-report-button"
                                            >
                                                Click to View
                                            </button>
                                        )}
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

export default StudentNotifications;
