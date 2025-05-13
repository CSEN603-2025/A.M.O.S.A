import React, { useState } from "react";
import "./CSS/PROStudentDashboard.css";
import { useLocation } from 'react-router-dom';

const PROWorkshop = () => {
    const upcomingWorkshops = [
        {
            id: 1,
            name: "Resume Writing 101",
            startDate: "2025-06-01T10:00",
            endDate: "2025-06-01T12:00",
            description: "Learn to craft a compelling resume.",
            speakerBio: "Jane Doe, Career Coach",
            agenda: "Intro > Tips > Q&A",
            details: "This workshop will cover resume writing including formatting, content, and tailoring your resume for specific applications."
        },
        {
            id: 2,
            name: "Portfolio Presentation",
            startDate: "2025-06-05T14:00",
            endDate: "2025-06-05T16:00",
            description: "Showcasing your work like a pro.",
            speakerBio: "John Smith, Industry Expert",
            agenda: "Presentation Skills > Demo > Review",
            details: "Learn to present your portfolio effectively to employers."
        }
    ];

    const liveWorkshops = [
        {
            id: 101,
            name: "Live Interview Practice",
            speaker: "Aly Mohamed",
            description: "Practice your interview skills with real-time feedback",
            agenda: "Introduction > Mock Interviews > Q&A Session",
            currentTopic: "Mock Interviews: Behavioral Questions",
            chat: [{ sender: "Aly Ewida", message: "Good morning everyone! " }]
        }
    ];

    const [expandedWorkshop, setExpandedWorkshop] = useState(null);
    const [activeLiveWorkshop, setActiveLiveWorkshop] = useState(null);
    const [notes, setNotes] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [submittedFeedback, setSubmittedFeedback] = useState(false);

    const toggleWorkshop = (id) => {
        setExpandedWorkshop(expandedWorkshop === id ? null : id);
    };

    const handleRegister = (e, workshopId) => {
        e.stopPropagation();
        console.log(`Registering for workshop ${workshopId}`);
    };

    const handleJoinLive = (workshop) => {
        setActiveLiveWorkshop(workshop);
        setChatMessages(workshop.chat);
        setNotes("");
        setShowPopup(true);
    };

    const handleSendChat = () => {
        if (chatInput.trim()) {
            setChatMessages([...chatMessages, { sender: "You", message: chatInput }]);
            setChatInput("");
        }
    };

    const handleFinishWorkshop = () => {
        setShowFeedback(true);
    };

    const handleSubmitFeedback = () => {
        console.log("Feedback submitted:", { rating, feedback });
        setSubmittedFeedback(true);
        setTimeout(() => {
            setShowFeedback(false);
            setSubmittedFeedback(false);
            setRating(0);
            setFeedback("");
            setActiveLiveWorkshop(null);
            setShowPopup(false);
        }, 2000);
    };

    const handleCancelWorkshop = () => {
        setActiveLiveWorkshop(null);
        setShowPopup(false);
    };

    const location = useLocation();

    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                <div className="header-left">
                    <h1 className="dashboard-title">PRO Student Dashboard</h1>
                </div>
                <div className="header-right">
                    <a href="/" className="signout-button">Sign Out</a>
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
                        <li className="nav-item"><a href="/student/appointments" className="nav-link">Appointments</a></li>
                        <li className="nav-item"><a href="/student/Calls" className="nav-link">Calls</a></li>
                        <li className="nav-item"><a href="/student/viewed" className="nav-link">Viewed my profile</a></li>
                        <li className="nav-item"><a href="/student/assessment" className="nav-link">Online assessments</a></li>
                        <li className="nav-item">Workshop</li>
                        <li className="nav-item"><a href="/PreRecord" className="nav-link">Pre-recorded workshops</a></li>
                    </ul>
                </aside>

                <main className="dashboard-main">
                    <section>
                        <h2>Upcoming Workshops</h2>
                        <ul className="workshop-list">
                            {upcomingWorkshops.map((workshop) => (
                                <li key={workshop.id} className="workshop-item">
                                    <div className="workshop-summary">
                                        <h3>{workshop.name}</h3>
                                        <p><strong>Time:</strong> {new Date(workshop.startDate).toLocaleString()} to {new Date(workshop.endDate).toLocaleString()}</p>
                                        <p><strong>Description:</strong> {workshop.description}</p>
                                        <button className="learn-more-button" onClick={() => toggleWorkshop(workshop.id)}>
                                            {expandedWorkshop === workshop.id ? "Show Less" : "Learn More"}
                                        </button>
                                    </div>
                                    {expandedWorkshop === workshop.id && (
                                        <div className="workshop-details">
                                            <p><strong>Speaker:</strong> {workshop.speakerBio}</p>
                                            <p><strong>Agenda:</strong> {workshop.agenda}</p>
                                            <p><strong>Full Details:</strong> {workshop.details}</p>
                                            <button className="register-button" onClick={(e) => handleRegister(e, workshop.id)}>
                                                Register
                                            </button>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section>
                        <h2>Live Workshops</h2>
                        <ul className="workshop-list">
                            {liveWorkshops.map((workshop) => (
                                <li key={workshop.id} className="workshop-item">
                                    <div className="workshop-summary">
                                        <h3>{workshop.name}</h3>
                                        <p><strong>Speaker:</strong> {workshop.speaker}</p>
                                        <p><strong>Description:</strong> {workshop.description}</p>
                                        <p><strong>Current Topic:</strong> {workshop.currentTopic}</p>
                                        <p><strong>Agenda:</strong> {workshop.agenda}</p>
                                        <button className="register-button" onClick={() => handleJoinLive(workshop)}>
                                            Join Workshop
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                </main>
            </div>

            {showPopup && activeLiveWorkshop && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Live: {activeLiveWorkshop.name}</h3>
                            <button className="cancel-button" onClick={handleCancelWorkshop}>✕</button>
                        </div>
                        <div style={{ background: "#000", height: "200px", marginBottom: "1rem", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <p>📹 Video Placeholder</p>
                        </div>
                        <div className="live-section">
                            <div className="notes-section">
                                <h4>Your Notes</h4>
                                <textarea
                                    rows="6"
                                    placeholder="Write your notes here..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>
                            <div className="chat-section">
                                <h4>Chat</h4>
                                <div className="chat-box">
                                    {chatMessages.map((msg, idx) => (
                                        <p key={idx}><strong>{msg.sender}:</strong> {msg.message}</p>
                                    ))}
                                </div>
                                <input
                                    type="text"
                                    placeholder="Type your message..."
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                                />
                                <button onClick={handleSendChat}>Send</button>
                            </div>
                        </div>
                        <button onClick={handleFinishWorkshop} style={{ marginTop: "1rem", background: "#4CAF50", color: "white", padding: "10px", borderRadius: "8px" }}>
                            Finish Workshop
                        </button>
                    </div>
                </div>
            )}

            {showFeedback && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        {!submittedFeedback ? (
                            <>
                                <h3>Rate this Workshop</h3>
                                <div style={{ marginBottom: "1rem" }}>
                                    <label>Rating: </label>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            onClick={() => setRating(star)}
                                            style={{
                                                cursor: "pointer",
                                                fontSize: "24px",
                                                color: star <= rating ? "#ffcc00" : "#ccc"
                                            }}
                                        >
                                            ★
                                        </span>
                                    ))}
                                </div>
                                <textarea
                                    rows="4"
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    placeholder="Leave your feedback here..."
                                    style={{ width: "100%", padding: "10px", borderRadius: "8px", marginBottom: "1rem" }}
                                />
                                <button onClick={handleSubmitFeedback}>Submit Feedback</button>
                            </>
                        ) : (
                            <h3 style={{ textAlign: "center", color: "#4CAF50" }}>✅ Thank you for your feedback!</h3>
                        )}
                    </div>
                </div>
            )}

            <footer className="dashboard-footer">
                <p>&copy; 2025 SCAD System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default PROWorkshop;