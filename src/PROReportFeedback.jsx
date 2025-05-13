import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import './CSS/StudentDashboard.css';

const PROReportFeedback = () => {
    const [status, setStatus] = useState("");
    const [comment, setComment] = useState("");
    const [appealVisible, setAppealVisible] = useState(false);
    const [appealMessage, setAppealMessage] = useState("");
    const [appealSent, setAppealSent] = useState(false);

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const source = params.get("source");

        if (source === "3") {
            setStatus("Rejected");
            setComment("Your report lacks sufficient detail about your responsibilities.");
        } else if (source === "4") {
            setStatus("Flagged");
            setComment("Please elaborate on the tools and technologies used in your internship.");
        }
    }, [location.search]);

    const handleAppealClick = () => {
        setAppealVisible(!appealVisible);
    };

    const handleSendAppeal = () => {
        setAppealSent(true);
        setAppealVisible(false);
    };

    return (
        <div className="browser-wrapper">
            <header className="browser-header">
                <h1 className="browser-title">Report Feedback</h1>
            </header>

            <main className="browser-main">
                <button className="back-button" onClick={() => window.location.href = "/PROStudentNotifications"}>
                    ← Back to Notifications
                </button>

                <section className="feedback-section">
                    <h2 className="section-title">Feedback on Your Report</h2>
                    <div className="internship-item">
                        <p><strong>Status:</strong> {status}</p>
                        <p><strong>Comment:</strong> {comment}</p>

                        {!appealSent && (
                            <button
                                className="send-reply-button"
                                onClick={handleAppealClick}
                                style={{ marginTop: '10px' }}
                            >
                                {appealVisible ? "Cancel Appeal" : "Appeal"}
                            </button>
                        )}

                        {appealVisible && !appealSent && (
                            <div style={{ marginTop: '10px' }}>
                                <textarea
                                    placeholder="Write your appeal..."
                                    value={appealMessage}
                                    onChange={e => setAppealMessage(e.target.value)}
                                    style={{ width: '100%', marginTop: '8px' }}
                                />
                                <button
                                    onClick={handleSendAppeal}
                                    className="send-reply-button"
                                    style={{ marginTop: '5px' }}
                                >
                                    Send Appeal
                                </button>
                            </div>
                        )}

                        {appealSent && (
                            <p style={{ marginTop: '10px', color: 'green', fontWeight: 'bold' }}>Sent</p>
                        )}
                    </div>
                </section>
            </main>

            <footer className="dashboard-footer">
                <p>&copy; 2025 SCAD System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default PROReportFeedback;
