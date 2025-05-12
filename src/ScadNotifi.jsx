import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './CSS/StudentDashboard.css';
import './CSS/browseInternships.css';

const SCADNotificationPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const previousPage = location.state?.from || "/scadOfficeDashboard";

    const goBack = () => {
        navigate(previousPage);
    };

    const notifications = [
        {
            id: 1,
            message: "Ahmed Ali accepted your appointment at 10:00 AM on 12-May-2025.",
            date: "2025-05-12"
        },
        {
            id: 2,
            message: "Sara Mohamed rescheduled your appointment to 2:30 PM on 13-May-2025.",
            date: "2025-05-13"
        },
        {
            id: 3,
            message: "Company XYZ approved your internship request at 9:15 AM on 14-May-2025.",
            date: "2025-05-14"
        }
    ];

    return (
        <div className="browser-wrapper">
            <header className="browser-header">
                <h1 className="browser-title">Notifications</h1>
            </header>

            <main className="browser-main">
                <button
                    className="back-button"
                    onClick={goBack}
                >
                    ← Back
                </button>

                <section className="filter-section">
                    <h2 className="section-title">Latest Alerts</h2>
                    <ul className="internship-list">
                        {notifications.map((notification) => (
                            <li key={notification.id} className="internship-item">
                                <p>{notification.message}</p>
                                <small><em>Date: {notification.date}</em></small>
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

export default SCADNotificationPage;
