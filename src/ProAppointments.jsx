import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import ProstudentLayout from './components/prostudentLayout';
import './CSS/ProStudent.css';

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
    const location = useLocation();
    const currentPath = location.pathname;


    return (
       <ProstudentLayout>

                <main className="dashboard-main">
                    {/* Notifications */}
                    <section className="notifications">
                        <h2>Notifications</h2>
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

                    {/* Scheduled Appointments */}
                    <section className="scheduled-appointments">
                        <h2>My Scheduled Appointments</h2>
                        <ul>
                            {scheduledAppointments.map(app => (
                                <li key={app.id}>
                                    <strong>{app.subject}</strong> on <em>{app.date}</em> at <em>{app.timing}</em>
                                    <span className={`status ${app.online ? "online" : "offline"}`}>
                                        {app.online ? "Online" : "Offline"}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Incoming Appointment Offers */}
                    <section className="appointment-requests">
                        <h2>Appointment Offers</h2>
                        {incomingOffers.length === 0 ? (
                            <p>No new appointment offers.</p>
                        ) : (
                            <ul>
                                {incomingOffers.map(offer => (
                                    <li key={offer.id}>
                                        <div>
                                            <strong>{offer.subject}</strong> offered for <em>{offer.date}</em> at <em>{offer.timing}</em>
                                        </div>
                                        <button className="accept-btn" onClick={() => handleAcceptOffer(offer)}>Accept</button>
                                        <button className="reject-btn" onClick={() => handleRejectOffer(offer.id)}>Reject</button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>

                    {/* Request New Appointment */}
                    <section className="request-section">
                        <button className="request-button" onClick={() => setShowRequestForm(true)}>
                            Request Appointment
                        </button>

                        {showRequestForm && (
                            <div className="popup-form">
                                <form onSubmit={handleSubmit}>
                                    <h3>Request New Appointment</h3>
                                    <label>
                                        Date:
                                        <input type="date" name="date" value={newAppointment.date} onChange={handleInputChange} required />
                                    </label>
                                    <label>
                                        Timing:
                                        <input type="time" name="timing" value={newAppointment.timing} onChange={handleInputChange} required />
                                    </label>
                                    <label>
                                        Subject:
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
        </ProstudentLayout>
    );
};

export default AppointmentsStudent;
