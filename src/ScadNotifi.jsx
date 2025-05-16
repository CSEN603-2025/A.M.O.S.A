import React, { useState } from "react";
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";

const SCADNotificationPage = () => {
    const navigate = useNavigate();
    const [expandedId, setExpandedId] = useState(null);

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
    const getBadgeColor = (type) => {
        switch (type) {
            case 'email': return '#007bff';
            case 'system': return '#28a745';
            default: return '#6c757d';
        }
    };

    const formatTypeLabel = (type) => {
        if (type === 'email') return 'Email';
        if (type === 'system') return 'System';
        return 'Notification';
    };

    return (
        <div style={{
            fontFamily: 'Segoe UI, sans-serif',
            backgroundColor: '#f4f7fb',
            minHeight: '100vh',
            margin: 0,
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            color: '#1a1a1a',
            width: '100vw',
            boxSizing: 'border-box',
            overflowX: 'hidden'
        }}>
            {/* Header */}
            <header style={{
                backgroundColor: '#001f3f',
                color: 'white',
                padding: '20px 40px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                width: '100%'
            }}>
                <h1 style={{ margin: 0 }}>Notifications</h1>
            </header>

            {/* Main Content */}
            <main style={{ padding: '30px 40px', flex: 1, width: '100%', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '25px' }}>
                    <button
                        style={{
                            backgroundColor: '#001f3f',
                            color: 'white',
                            padding: '10px 20px',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            transition: 'background-color 0.3s'
                        }}
                        onClick={() => navigate('/SCADOfficedashboard')}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#003366'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#001f3f'}
                    >
                        <FiArrowLeft /> Back to Dashboard
                    </button>
                </div>

                <section>
                    <h2 style={{ color: '#001f3f', marginBottom: '20px' }}>Latest Alerts</h2>
                    <ul style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'grid',
                        gap: '20px',
                        width: '100%'
                    }}>
                        {notifications.map(notification => (
                            <li
                                key={notification.id}
                                onClick={() => setExpandedId(expandedId === notification.id ? null : notification.id)}
                                style={{
                                    backgroundColor: 'white',
                                    borderLeft: `6px solid ${getBadgeColor(notification.type)}`,
                                    padding: '20px',
                                    borderRadius: '10px',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s, box-shadow 0.2s'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 6px 14px rgba(0,0,0,0.15)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'none';
                                    e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '8px'
                                }}>
                                    {/* Notification Type Badge */}
                                    <span style={{
                                        backgroundColor: getBadgeColor(notification.type),
                                        color: 'white',
                                        padding: '5px 12px',
                                        fontSize: '13px',
                                        borderRadius: '20px',
                                        fontWeight: '600',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.5px'
                                    }}>
                                        {formatTypeLabel(notification.type)}
                                    </span>

                                    {/* Timestamp */}
                                    <small style={{ color: '#666', fontSize: '14px' }}>{notification.time}</small>
                                </div>

                                {/* Main Message */}
                                <p style={{ fontSize: '16px', fontWeight: '500' }}>{notification.message}</p>

                                {/* Expanded Message */}
                                {expandedId === notification.id && (
                                    <div style={{
                                        marginTop: '15px',
                                        backgroundColor: '#f0f4f8',
                                        padding: '15px',
                                        borderRadius: '8px',
                                        borderLeft: '4px solid #003366'
                                    }}>
                                        <p style={{ fontWeight: 'bold', marginBottom: '8px', color: '#001f3f' }}>
                                            Full Notification
                                        </p>
                                        <p style={{ marginBottom: '10px' }}>{notification.message}</p>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            </main>

            {/* Footer */}
            <footer style={{
                backgroundColor: '#001f3f',
                color: 'white',
                textAlign: 'center',
                padding: '15px',
                fontSize: '14px',
                width: '100%'
            }}>
                <p style={{ margin: 0 }}>&copy; 2025 SCAD System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default SCADNotificationPage;
