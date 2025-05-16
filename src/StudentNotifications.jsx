import React, { useState } from "react";

const StudentNotifications = () => {
    const [expandedId, setExpandedId] = useState(null);
    const [modalSource, setModalSource] = useState(null);
    const [appealVisible, setAppealVisible] = useState(false);
    const [appealMessage, setAppealMessage] = useState("");
    const [appealSent, setAppealSent] = useState(false);

    const notifications = [
        { id: 1, message: "🎉 A new internship cycle has begun! Start applying now.", date: "2025-05-01" },
        { id: 2, message: "⏳ A new internship cycle will begin next week. Get your documents ready!", date: "2025-04-25" },
        { id: 3, message: "📝 Your internship report status (Microsoft internship) has been sent.", date: "2025-04-25" },
        { id: 4, message: "📝 Your internship report status (Sumerge internship) has been sent.", date: "2025-04-29" },
        
    ];

    const getFeedbackData = (source) => {
        if (source === 3) {
            return {
                status: "Rejected",
                comment: "Your report lacks sufficient detail about your responsibilities."
            };
        } else if (source === 4) {
            return {
                status: "Flagged",
                comment: "Please elaborate on the tools and technologies used in your internship."
            };
        }
        return { status: "", comment: "" };
    };

    const openModal = (id) => {
        setModalSource(id);
        setAppealMessage("");
        setAppealSent(false);
        setAppealVisible(false);
    };

    return (
        <div style={{
            fontFamily: 'Segoe UI, sans-serif',
            backgroundColor: '#f4f7fb',
            minHeight: '100vh',
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

            {/* Main */}
            <main style={{ padding: '30px 40px', flex: 1 }}>
                <button
                    style={{
                        backgroundColor: '#001f3f',
                        color: 'white',
                        padding: '10px 20px',
                        border: 'none',
                        borderRadius: '8px',
                        marginBottom: '25px',
                        cursor: 'pointer'
                    }}
                    onClick={() => window.location.href = "/Studentdashboard"}
                >
                    ← Back to Dashboard
                </button>

                <h2 style={{ color: '#001f3f', marginBottom: '20px' }}>Latest Alerts</h2>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '20px' }}>
                    {notifications.map(notification => (
                        <li
                            key={notification.id}
                            onClick={() => setExpandedId(expandedId === notification.id ? null : notification.id)}
                            style={{
                                backgroundColor: 'white',
                                borderLeft: '6px solid #001f3f',
                                padding: '20px',
                                borderRadius: '10px',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                cursor: 'pointer'
                            }}
                        >
                            <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '5px' }}>{notification.message}</p>
                            <small style={{ color: '#666', fontSize: '14px' }}>📅 {notification.date}</small>

                            {expandedId === notification.id && (
                                <div style={{
                                    marginTop: '15px',
                                    backgroundColor: '#f0f4f8',
                                    padding: '15px',
                                    borderRadius: '8px',
                                    borderLeft: '4px solid #003366'
                                }}>
                                    <p style={{ fontWeight: 'bold', color: '#001f3f', marginBottom: '10px' }}>Full Notification</p>
                                    <p>{notification.message}</p>

                                    {(notification.id === 3 || notification.id === 4) && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openModal(notification.id);
                                            }}
                                            style={{
                                                backgroundColor: '#003366',
                                                color: 'white',
                                                padding: '8px 16px',
                                                border: 'none',
                                                borderRadius: '6px',
                                                marginTop: '10px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            View Report
                                        </button>
                                    )}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </main>

            {/* Modal */}
            {modalSource && (
                <div style={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}
                    onClick={() => setModalSource(null)}
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            backgroundColor: 'white',
                            padding: '30px',
                            borderRadius: '10px',
                            maxWidth: '600px',
                            width: '100%',
                            boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
                        }}
                    >
                        <h3 style={{ color: '#001f3f' }}>Internship Report Feedback</h3>
                        <p><strong>Status:</strong> {getFeedbackData(modalSource).status}</p>
                        <p><strong>Comment:</strong> {getFeedbackData(modalSource).comment}</p>

                        <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
                            {!appealSent && (
                                <button
                                    onClick={() => setAppealVisible(!appealVisible)}
                                    style={{
                                        backgroundColor: '#003366',
                                        color: 'white',
                                        padding: '8px 14px',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {appealVisible ? "Cancel Appeal" : "Appeal"}
                                </button>
                            )}
                            <button
                                onClick={() => setModalSource(null)}
                                style={{
                                    backgroundColor: '#ccc',
                                    color: '#000',
                                    padding: '8px 14px',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}
                            >
                                Close
                            </button>
                        </div>

                        {appealVisible && !appealSent && (
                            <div style={{ marginTop: '15px' }}>
                                <textarea
                                    placeholder="Write your appeal..."
                                    value={appealMessage}
                                    onChange={e => setAppealMessage(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '10px',
                                        borderRadius: '6px',
                                        border: '1px solid #ccc',
                                        marginBottom: '10px'
                                    }}
                                />
                                <button
                                    onClick={() => {
                                        setAppealSent(true);
                                        setAppealVisible(false);
                                    }}
                                    style={{
                                        backgroundColor: '#001f3f',
                                        color: 'white',
                                        padding: '8px 16px',
                                        border: 'none',
                                        borderRadius: '6px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Send Appeal
                                </button>
                            </div>
                        )}

                        {appealSent && (
                            <p style={{ marginTop: '10px', color: 'green', fontWeight: 'bold' }}>Appeal Sent</p>
                        )}
                    </div>
                </div>
            )}

            {/* Footer */}
            <footer style={{
                backgroundColor: '#001f3f',
                color: 'white',
                textAlign: 'center',
                padding: '15px',
                fontSize: '14px'
            }}>
                <p style={{ margin: 0 }}>&copy; 2025 SCAD System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default StudentNotifications;
