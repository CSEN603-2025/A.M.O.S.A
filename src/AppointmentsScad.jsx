import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaPhone } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import './CSS/SCADOfficeDashboard.css';
import './CSS/browseInternships.css'; // Reusing styles

const AppointmentsScad = () => {
    const [appointmentsScheduledByDefault, setAppointmentsScheduledByDefault] = useState([
        { id: 1, username: "JohnDoe", date: "2025-05-08", timing: "10:00 AM", subject: "Internship Interview", online: true },
        { id: 2, username: "JaneSmith", date: "2025-05-09", timing: "2:00 PM", subject: "Resume Review", online: false }
    ]);
    const [appointmentRequests, setAppointmentRequests] = useState([
        { id: 101, username: "AliAhmed", date: "2025-05-10", timing: "3:00 PM", subject: "Internship Discussion" },
        { id: 102, username: "SaraTamer", date: "2025-05-11", timing: "4:30 PM", subject: "General Inquiry" }
    ]);
    const [notifications, setNotifications] = useState([
        { id: 1, message: "JohnDoe has an upcoming appointment on 2025-05-08 at 10:00 AM for Internship Interview." },
        { id: 2, message: "JaneSmith has an upcoming appointment on 2025-05-09 at 2:00 PM for Resume Review." }
    ]);
    const [showRequestForm, setShowRequestForm] = useState(false);
    const [newAppointment, setNewAppointment] = useState({
        username: "",
        date: "",
        timing: "",
        subject: "",
        online: true
    });

    const navigate = useNavigate();
    const location = useLocation();
    const missedCalls = 2;
    const unreadNotifications = notifications.length;

    const goToCalls = () => {
        navigate("/scad/Calls", { state: { from: location.pathname } });
    };

    const goToNotifications = () => {
        navigate("/scad/noti", { state: { from: location.pathname } });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAppointment(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setNewAppointment({ username: "", date: "", timing: "", subject: "", online: true });
        setShowRequestForm(false);
    };

    const handleAcceptRequest = (request) => {
        setAppointmentsScheduledByDefault(prev => [
            ...prev,
            { ...request, id: prev.length + 1, online: false }
        ]);
        setAppointmentRequests(prev => prev.filter(req => req.id !== request.id));
    };

    const handleRejectRequest = (id) => {
        setAppointmentRequests(prev => prev.filter(req => req.id !== id));
    };

    return (
        <div className="dashboard-wrapper">
            {/* Header */}
            <header className="dashboard-header">
                <div className="header-left">
                    <h1 className="dashboard-title">SCAD Office Dashboard</h1>
                </div>
                <div className="header-right">
                    <div className="header-icons">
                        <button onClick={goToCalls} className="notification-bell">
                            <FaPhone />
                            <span className="call-badge">{missedCalls}</span>
                        </button>
                        <button onClick={goToNotifications} className="notification-bell">
                            <FiBell size={24} />
                            <span className="notification-badge">{unreadNotifications}</span>
                        </button>
                        <a href="/" className="signout-button">Sign Out</a>
                    </div>
                </div>
            </header>

            {/* Sidebar and Main */}
            <div className="dashboard-content">
                <aside className="dashboard-sidebar">
                    <h2 className="sidebar-title">Navigation</h2>
                    <ul className="nav-list">
                        <li className="nav-item"><a href="/ScadOfficeDashboard" className="nav-link">Home</a></li>
                        <li className="nav-item"><a href="/scad/companies" className="nav-link">Pending Company Applications</a></li>
                        <li className="nav-item"><a href="/scad/interns" className="nav-link">All Internships</a></li>
                        <li className="nav-item"><a href="/scad/cycle" className="nav-link">Current Cycle Information</a></li>
                        <li className="nav-item"><a href="/scad/students" className="nav-link">View Students</a></li>
                        <li className="nav-item"><a href="/scad/reports" className="nav-link">View Reports</a></li>
                        <li className="nav-item"><a href="/scad/Statistics" className="nav-link">Statistics</a></li>
                        <li className="nav-item">Appointments</li>
                        <li className="nav-item"><a href="/scad/Calls" className="nav-link">Calls</a></li>
                        <li className="nav-item"><a href="/scad/Workshop" className="nav-link">Workshop</a></li>
                    </ul>
                </aside>

                <main className="dashboard-main">
                    <div className="browser-wrapper">
                        {/* Title Header */}
                        <header className="browser-header">
                            <h1 className="browser-title">Appointments</h1>
                        </header>

                        {/* Main Appointment Sections */}
                        <main className="browser-main">
                            <section className="list-section">
                                <h2 className="section-title">Notifications</h2>
                                {notifications.length === 0 ? (
                                    <p>No notifications.</p>
                                ) : (
                                    <ul>
                                        {notifications.map(note => (
                                            <li key={note.id}>{note.message}</li>
                                        ))}
                                    </ul>
                                )}
                            </section>

                            <section className="list-section">
                                <h2 className="section-title">Scheduled Appointments</h2>
                                <ul>
                                    {appointmentsScheduledByDefault.map(app => (
                                        <li key={app.id}>
                                            <strong>{app.username}</strong> on <em>{app.date}</em> at <em>{app.timing}</em> - {app.subject}
                                            <span className={`status ${app.online ? "online" : "offline"}`}>
                                                {app.online ? "Online" : "Offline"}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section className="list-section">
                                <h2 className="section-title">Appointment Requests (Incoming)</h2>
                                {appointmentRequests.length === 0 ? (
                                    <p>No incoming requests.</p>
                                ) : (
                                    <ul>
                                        {appointmentRequests.map(req => (
                                            <li key={req.id}>
                                                <div>
                                                    <strong>{req.username}</strong> requests <em>{req.subject}</em> on <em>{req.date}</em> at <em>{req.timing}</em>
                                                </div>
                                                <button className="accept-btn" onClick={() => handleAcceptRequest(req)}>Accept</button>
                                                <button className="reject-btn" onClick={() => handleRejectRequest(req.id)}>Reject</button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </section>

                            <section className="list-section">
                                <button className="request-button" onClick={() => setShowRequestForm(true)}>
                                    Request Appointment
                                </button>

                                {showRequestForm && (
                                    <div className="popup-form">
                                        <form onSubmit={handleSubmit}>
                                            <h3>Request New Appointment</h3>
                                            <label>Username:
                                                <input type="text" name="username" value={newAppointment.username} onChange={handleInputChange} required />
                                            </label>
                                            <label>Date:
                                                <input type="date" name="date" value={newAppointment.date} onChange={handleInputChange} required />
                                            </label>
                                            <label>Timing:
                                                <input type="time" name="timing" value={newAppointment.timing} onChange={handleInputChange} required />
                                            </label>
                                            <label>Subject:
                                                <input type="text" name="subject" value={newAppointment.subject} onChange={handleInputChange} required />
                                            </label>
                                            <div className="form-buttons">
                                                <button type="submit">Submit</button>
                                                <button type="button" onClick={() => setShowRequestForm(false)}>Cancel</button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </section>
                        </main>
                    </div>
                </main>
            </div>

            {/* Footer */}
            <footer className="dashboard-footer">
                <p>&copy; 2025 SCAD System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AppointmentsScad;
