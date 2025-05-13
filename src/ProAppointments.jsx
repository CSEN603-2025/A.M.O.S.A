import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaPhone } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import './CSS/PROStudentDashboard.css';
import './CSS/browseInternships.css';

const AppointmentsStudent = () => {
    const [notifications, setNotifications] = useState([
        { id: 1, message: "Your appointment for Career guidance on 2025-05-08 at 10:00 AM was accepted." },
        { id: 2, message: "Your appointment for Career guidance on 2025-05-09 at 2:00 PM was accepted." }
    ]);

    const [scheduledAppointments, setScheduledAppointments] = useState([
        { id: 1, date: "2025-05-08", timing: "10:00 AM", subject: "Career guidance with Dr Lionel Messi", online: true },
        { id: 2, date: "2025-05-09", timing: "2:00 PM", subject: "Career guidance with Dr Ahmed Hosny", online: false }
    ]);

    const [incomingOffers, setIncomingOffers] = useState([
        { id: 3, date: "2025-05-11", timing: "1:00 PM", subject: "Career Guidance", online: true }
    ]);

    const [showRequestForm, setShowRequestForm] = useState(false);
    const [newAppointment, setNewAppointment] = useState({
        date: "",
        timing: "",
        subject: "",
        online: true
    });

    const navigate = useNavigate();
    const location = useLocation();
    const missedCalls = 0;
    const unreadNotifications = notifications.length;

    const goToCalls = () => {
        navigate("/student/Calls", { state: { from: location.pathname } });
    };

    const goToNotifications = () => {
        navigate("/PROStudentNotifications", { state: { from: location.pathname } });
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
        setNewAppointment({ date: "", timing: "", subject: "", online: true });
        setShowRequestForm(false);
    };

    const handleAcceptOffer = (offer) => {
        setScheduledAppointments(prev => [...prev, offer]);
        setIncomingOffers(prev => prev.filter(o => o.id !== offer.id));
    };

    const handleRejectOffer = (id) => {
        setIncomingOffers(prev => prev.filter(o => o.id !== id));
    };

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
                            <span className="notification-badge">{unreadNotifications}</span>
                        </button>
                        <a href="/" className="signout-button">Sign Out</a>
                    </div>
                </div>
            </header>

            <div className="dashboard-content">
                <aside className="dashboard-sidebar">
                    <h2 className="sidebar-title">Navigation</h2>
                    <ul className="nav-list">
                        <li className="nav-item"><a href="/PROStudentDashboard" className="nav-link">Home</a></li>
                        <li className="nav-item"><a href="/PROStudentinternship" className="nav-link">Browse Internships</a></li>
                        <li className="nav-item"><a href="/PROStudentApplied" className="nav-link">View Applied Internships</a></li>
                        <li className="nav-item"><a href="/student/proprofile" className="nav-link">My Profile</a></li>
                        <li className="nav-item"><a href="/PROMyInternships" className="nav-link">My Internships</a></li>
                        <li className="nav-item">Appointments</li>
                        <li className="nav-item"><a href="/student/Calls" className="nav-link">Calls</a></li>
                        <li className="nav-item"><a href="/student/viewed" className="nav-link">Viewed my profile</a></li>
                        <li className="nav-item"><a href="/student/assessment" className="nav-link">Online assessments</a></li>
                        <li className="nav-item"><a href="/student/workshop" className="nav-link">Workshop</a></li>
                        <li className="nav-item"><a href="/PreRecord" className="nav-link">Pre-recorded workshops</a></li>
                    </ul>
                </aside>

                <main className="dashboard-main">
                    <div className="browser-wrapper">
                        <header className="browser-header">
                            <h1 className="browser-title">Appointments</h1>
                        </header>

                        <main className="browser-main">
                            <section className="list-section">
                                <h2 className="section-title">Notifications</h2>
                                {notifications.length === 0 ? (
                                    <p>No notifications.</p>
                                ) : (
                                    <ul className="notification-list">
                                        {notifications.map(note => (
                                            <li key={note.id} className="notification-item">{note.message}</li>
                                        ))}
                                    </ul>
                                )}
                            </section>

                            <section className="list-section">
                                <h2 className="section-title">My Scheduled Appointments</h2>
                                {scheduledAppointments.length === 0 ? (
                                    <p>No scheduled appointments.</p>
                                ) : (
                                    <ul className="appointment-list">
                                        {scheduledAppointments.map(app => (
                                            <li key={app.id} className="appointment-item">
                                                <div className="appointment-details">
                                                    <strong>{app.subject}</strong>
                                                    <div className="appointment-meta">
                                                        <span>Date: {app.date}</span>
                                                        <span>Time: {app.timing}</span>
                                                    </div>
                                                </div>
                                                <span className={`status ${app.online ? "online" : "offline"}`}>
                                                    {app.online ? "Online" : "Offline"}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </section>

                            <section className="list-section">
                                <h2 className="section-title">Appointment Offers</h2>
                                {incomingOffers.length === 0 ? (
                                    <p>No new appointment offers.</p>
                                ) : (
                                    <ul className="offer-list">
                                        {incomingOffers.map(offer => (
                                            <li key={offer.id} className="offer-item">
                                                <div className="offer-details">
                                                    <strong>{offer.subject}</strong>
                                                    <div className="offer-meta">
                                                        <span>Date: {offer.date}</span>
                                                        <span>Time: {offer.timing}</span>
                                                    </div>
                                                </div>
                                                <div className="offer-actions">
                                                    <button className="accept-btn" onClick={() => handleAcceptOffer(offer)}>Accept</button>
                                                    <button className="reject-btn" onClick={() => handleRejectOffer(offer.id)}>Reject</button>
                                                </div>
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
                                            <div className="form-group">
                                                <label>Date:</label>
                                                <input type="date" name="date" value={newAppointment.date} onChange={handleInputChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label>Timing:</label>
                                                <input type="time" name="timing" value={newAppointment.timing} onChange={handleInputChange} required />
                                            </div>
                                            <div className="form-group">
                                                <label>Subject:</label>
                                                <input type="text" name="subject" value={newAppointment.subject} onChange={handleInputChange} required />
                                            </div>
                                            <div className="form-buttons">
                                                <button type="submit" className="submit-btn">Submit</button>
                                                <button type="button" className="cancel-btn" onClick={() => setShowRequestForm(false)}>Cancel</button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </section>
                        </main>
                    </div>
                </main>
            </div>

            <footer className="dashboard-footer">
                <p>&copy; 2025 PRO Student System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default AppointmentsStudent;