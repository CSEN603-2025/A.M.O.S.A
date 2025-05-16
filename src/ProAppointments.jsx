import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import { FiBell, FiCalendar, FiClock, FiUser, FiMail } from "react-icons/fi";
import './CSS/SCADOfficeDashboard.css';
import ProstudentLayout from './components/prostudentLayout';

const AppointmentsStudent = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);

   
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
        setShowAlert(true);
        setFadeOut(true); // Ensure visible

        // Start fade out after 2.5s
        setTimeout(() => {
            setFadeOut(false); // Triggers opacity: 0
        }, 2500);

        // Hide completely after 3s (fade duration = 500ms)
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };

    const handleAcceptOffer = (offer) => {
        setScheduledAppointments(prev => [...prev, offer]);
        setIncomingOffers(prev => prev.filter(o => o.id !== offer.id));
    };

    const handleRejectOffer = (id) => {
        setIncomingOffers(prev => prev.filter(o => o.id !== id));
    };
    const location = useLocation();

    return (
        <ProstudentLayout>
            <main className="main-content" aria-label="Main Content">
                <h1 className="main-welcome" style={{ marginTop: 0, marginBottom: 32 }}>My Appointments</h1>
                {showAlert && (
                    <div style={{
                        background: '#00C49F',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: 6,
                        position: 'fixed',
                        top: 20,
                        right: 20,
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        zIndex: 999,
                        opacity: fadeOut ? 1 : 0,
                        transition: 'opacity 0.5s ease-out'
                    }}>
                        Appointment requested!
                    </div>
                )}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: '100%', marginBottom: 24 }}>
                    {/* Notifications Section */}
                    <div className="internship-item" style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(30,41,59,0.06)', padding: 24, border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                            <FiBell style={{ color: 'var(--primary)', fontSize: 22 }} />
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Notifications</span>
                        </div>
                        {notifications.length === 0 ? (
                            <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>No notifications.</p>
                        ) : (
                            <div style={{ display: 'grid', gap: 12 }}>
                                {notifications.map(note => (
                                    <div key={note.id} style={{
                                        padding: '12px 16px',
                                        background: 'rgba(0, 196, 159, 0.1)',
                                        borderRadius: 8,
                                        fontSize: 15
                                    }}>
                                        {note.message}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Scheduled Appointments Section */}
                    <div className="internship-item" style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(30,41,59,0.06)', padding: 24, border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                            <FiCalendar style={{ color: 'var(--primary)', fontSize: 22 }} />
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Scheduled Appointments</span>
                        </div>
                        {scheduledAppointments.length === 0 ? (
                            <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>No scheduled appointments.</p>
                        ) : (
                            <div style={{ display: 'grid', gap: 12 }}>
                                {scheduledAppointments.map(app => (
                                    <div key={app.id} style={{
                                        padding: '12px 16px',
                                        background: 'rgba(0, 196, 159, 0.1)',
                                        borderRadius: 8,
                                        fontSize: 15
                                    }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                            <span style={{ fontWeight: 600 }}>{app.subject}</span>
                                            <span style={{
                                                color: app.online ? '#00C49F' : '#FF6384',
                                                fontWeight: 600,
                                                fontSize: 14
                                            }}>
                                                {app.online ? 'Online' : 'Offline'}
                                            </span>
                                        </div>
                                        <div style={{ display: 'grid', gap: 4 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <FiCalendar size={14} />
                                                <span>{app.date}</span>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <FiClock size={14} />
                                                <span>{app.timing}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Appointment Offers Section */}
                <div className="internship-item" style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(30,41,59,0.06)', padding: 24, border: '1px solid var(--border)', marginBottom: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                        <FiUser style={{ color: 'var(--primary)', fontSize: 22 }} />
                        <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Appointment Offers</span>
                    </div>
                    {incomingOffers.length === 0 ? (
                        <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>No incoming offers.</p>
                    ) : (
                        <div style={{ display: 'grid', gap: 12 }}>
                            {incomingOffers.map(offer => (
                                <div key={offer.id} style={{
                                    padding: '12px 16px',
                                    background: 'rgba(0, 196, 159, 0.1)',
                                    borderRadius: 8,
                                    fontSize: 15
                                }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                        <span style={{ fontWeight: 600 }}>{offer.subject}</span>
                                        <span style={{ fontWeight: 600, fontSize: 14 }}>Pending</span>
                                    </div>
                                    <div style={{ display: 'grid', gap: 4 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <FiCalendar size={14} />
                                            <span>{offer.date}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <FiClock size={14} />
                                            <span>{offer.timing}</span>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                                        <button
                                            onClick={() => handleAcceptOffer(offer)}
                                            style={{
                                                background: '#00C49F',
                                                color: 'white',
                                                border: 'none',
                                                padding: '8px 16px',
                                                borderRadius: 8,
                                                cursor: 'pointer',
                                                fontWeight: 600,
                                                fontSize: 14
                                            }}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleRejectOffer(offer.id)}
                                            style={{
                                                background: '#FF6384',
                                                color: 'white',
                                                border: 'none',
                                                padding: '8px 16px',
                                                borderRadius: 8,
                                                cursor: 'pointer',
                                                fontWeight: 600,
                                                fontSize: 14
                                            }}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Request Appointment Button */}
                <button
                    onClick={() => setShowRequestForm(true)}
                    style={{
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: 8,
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: 16,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        margin: '0 auto'
                    }}
                >
                    Request New Appointment
                </button>

                {/* Appointment Request Form Modal */}
                {showRequestForm && (
                    <div className="workshop-modal-backdrop">
                        <div className="workshop-modal">
                            <div className="modal-buttons">
                                <button onClick={() => setShowRequestForm(false)} style={{
                                    background: '#FF6384',
                                    color: 'white',
                                    border: 'none',
                                    padding: '8px 16px',
                                    borderRadius: 8,
                                    cursor: 'pointer',
                                    fontWeight: 600
                                }}>
                                    Close
                                </button>
                            </div>
                            <h2 style={{ marginBottom: 24 }}>Request New Appointment</h2>
                            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
                                <div style={{ display: 'grid', gap: 8 }}>
                                    <label style={{ fontWeight: 600 }}>Date:</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={newAppointment.date}
                                        onChange={handleInputChange}
                                        required
                                        style={{
                                            width: '100%',
                                            height: 40,
                                            borderRadius: 8,
                                            border: '1px solid var(--border)',
                                            padding: '0 14px',
                                            fontSize: 16
                                        }}
                                    />
                                </div>
                                <div style={{ display: 'grid', gap: 8 }}>
                                    <label style={{ fontWeight: 600 }}>Timing:</label>
                                    <input
                                        type="time"
                                        name="timing"
                                        value={newAppointment.timing}
                                        onChange={handleInputChange}
                                        required
                                        style={{
                                            width: '100%',
                                            height: 40,
                                            borderRadius: 8,
                                            border: '1px solid var(--border)',
                                            padding: '0 14px',
                                            fontSize: 16
                                        }}
                                    />
                                </div>
                                <div style={{ display: 'grid', gap: 8 }}>
                                    <label style={{ fontWeight: 600 }}>Subject:</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={newAppointment.subject}
                                        onChange={handleInputChange}
                                        required
                                        style={{
                                            width: '100%',
                                            height: 40,
                                            borderRadius: 8,
                                            border: '1px solid var(--border)',
                                            padding: '0 14px',
                                            fontSize: 16
                                        }}
                                    />
                                </div>
                                
                                 


                                <button
                                    type="submit"
                                    
                                    style={{
                                        background: '#00C49F',
                                        color: 'white',
                                        border: 'none',
                                        padding: '12px 24px',
                                        borderRadius: 8,
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        fontSize: 16,
                                        marginTop: 16
                                    }}
                                >
                                    Submit Request
                                </button>
                            </form>
                         
                        </div>
                    </div>
                )}
            </main>
        </ProstudentLayout>
    );
};

export default AppointmentsStudent;