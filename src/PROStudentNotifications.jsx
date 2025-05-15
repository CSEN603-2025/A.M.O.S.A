import React, { useState } from "react";
import './CSS/StudentDashboard.css';
import './CSS/browseInternships.css';

const PROStudentNotifications = () => {
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
        },
        {
            id: 5,
            message: "Ahmed Ali accepted your appointment at 10:00 AM on 12-May-2025.",
            date: "2025-05-12"
        },
        {
            id: 6,
            message: "Sara Mohamed rescheduled your appointment to 2:30 PM on 13-May-2025.",
            date: "2025-05-13"
        },
        {
    id: 7,
    message: "📅 Reminder: You registered for the 'Real-World Skills Workshop' happening on the 25th of this month. Don't forget to attend!",
    date: "2025-05-16"
},
{
    id: 8,
    message: "📣 The 'Career Development Workshop'starts tomorrow at 10:00 AM. Good luck!",
    date: "2025-05-17"
}


    ]);

    return (
        <div className="browser-wrapper">
            <header className="browser-header">
                <h1 className="browser-title">Notifications</h1>
            </header>

            <main className="browser-main">
                <button className="back-button" onClick={() => window.location.href = "/PROStudentDashboard"}>
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
                                                onClick={() => window.location.href = `/PROReportFeedback?source=${notification.id}`}
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

export default PROStudentNotifications;
