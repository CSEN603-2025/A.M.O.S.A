import React, { useState } from "react";
import "./CSS/PROStudentDashboard.css";
import { FiBell } from 'react-icons/fi';
import { FaPhone } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom';

const PROPreRecordedWorkshops = () => {
    const navigate = useNavigate();

    const missedCalls = 5;
    const notifications = 3;

    const preRecordedWorkshops = [
        {
            id: 1,
            name: "Resume Writing Masterclass",
            duration: "45 min",
            description: "Learn to craft a professional resume that stands out.",
            speakerBio: "Jane Doe, Career Coach",
            uploadDate: "2025-05-01",
            videoUrl: "#",
            details: "This session covers resume structure, impactful language, and formatting tips. Ideal for students and professionals aiming to enhance job prospects."
        },
        {
            id: 2,
            name: "Technical Interview Preparation",
            duration: "1h 20min",
            description: "Ace your technical interviews with these strategies.",
            speakerBio: "John Smith, Senior Developer",
            uploadDate: "2025-05-10",
            videoUrl: "#",
            details: "Learn how to approach coding problems, communicate your thought process, and handle common technical questions. Perfect for software job seekers at any level."
        },
        {
            id: 3,
            name: "Networking for Introverts",
            duration: "35 min",
            description: "Effective networking strategies for shy professionals.",
            speakerBio: "Alex Johnson, HR Specialist",
            uploadDate: "2025-05-15",
            videoUrl: "#",
            details: "Discover techniques to build meaningful connections without stepping out of your comfort zone. A must-watch for professionals who find traditional networking challenging."
        }
    ];

    const [expandedWorkshop, setExpandedWorkshop] = useState(null);
    const [activeWorkshop, setActiveWorkshop] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [notes, setNotes] = useState("");
    const [showFeedback, setShowFeedback] = useState(false);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [submittedFeedback, setSubmittedFeedback] = useState(false);

    const toggleWorkshop = (id) => {
        setExpandedWorkshop(prev => (prev === id ? null : id));
    };

    const handlePlayWorkshop = (workshop) => {
        setActiveWorkshop(workshop);
        setIsPlaying(true);
    };

    const handlePauseWorkshop = () => {
        setIsPlaying(false);
    };

    const handleStopWorkshop = () => {
        setIsPlaying(false);
        setActiveWorkshop(null);
    };

    const handleFinishWorkshop = () => {
        setIsPlaying(false);
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
            setActiveWorkshop(null);
        }, 2000);
    };

    const handleCancelWorkshop = () => {
        setActiveWorkshop(null);
        setIsPlaying(false);
    };

    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                <div className="header-left">
                    <h1 className="dashboard-title">PRO Student Dashboard</h1>
                </div>
                <div className="header-right">
                    <div className="header-icons">
                        <button onClick={() => navigate("/student/Calls")} className="notification-bell">
                            <FaPhone />
                            <span className="call-badge">{missedCalls}</span>
                        </button>

                        <button onClick={() => navigate("/PROStudentNotifications")} className="notification-bell">
                            <FiBell size={24} />
                            <span className="notification-count">{notifications}</span>
                        </button>

                        <Link to="/" className="signout-button">Sign Out</Link>
                    </div>
                </div>
            </header>

            <div className="dashboard-content">
                <aside className="dashboard-sidebar">
                    <h2 className="sidebar-title">Navigation</h2>
                    <ul className="nav-list">
                        <li className="nav-item"><Link to="/PROStudentDashboard" className="nav-link">Home</Link></li>
                        <li className="nav-item"><Link to="/PROStudentinternship" className="nav-link">Browse Internships</Link></li>
                        <li className="nav-item"><Link to="/PROStudentApplied" className="nav-link">View Applied Internships</Link></li>
                        <li className="nav-item"><Link to="/student/proprofile" className="nav-link">My Profile</Link></li>
                        <li className="nav-item"><Link to="/PROMyInternships" className="nav-link">My Internships</Link></li>
                        <li className="nav-item"><Link to="/student/appointments" className="nav-link">Appointments</Link></li>
                        <li className="nav-item"><Link to="/student/Calls" className="nav-link">Calls</Link></li>
                        <li className="nav-item"><Link to="/student/viewed" className="nav-link">Viewed my profile</Link></li>
                        <li className="nav-item"><Link to="/student/assessment" className="nav-link">Online assessments</Link></li>
                        <li className="nav-item"><Link to="/student/workshop" className="nav-link">Workshop</Link></li>
                        <li className="nav-item active">Pre-Recorded workshops</li>
                    </ul>
                </aside>

                <main className="dashboard-main">
                    <section>
                        <h2>Pre-Recorded Workshops</h2>
                        <ul className="workshop-list">
                            {preRecordedWorkshops.map((workshop) => (
                                <li key={workshop.id} className="workshop-item">
                                    <div className="workshop-summary">
                                        <h3>{workshop.name}</h3>
                                        <p><strong>Duration:</strong> {workshop.duration}</p>
                                        <p><strong>Description:</strong> {workshop.description}</p>
                                        <p><strong>Upload Date:</strong> {new Date(workshop.uploadDate).toLocaleDateString()}</p>
                                        <button className="learn-more-button" onClick={() => toggleWorkshop(workshop.id)}>
                                            {expandedWorkshop === workshop.id ? "Show Less" : "Learn More"}
                                        </button>
                                    </div>
                                    {expandedWorkshop === workshop.id && (
                                        <div className="workshop-details">
                                            <p><strong>Speaker:</strong> {workshop.speakerBio}</p>
                                            <p><strong>Full Details:</strong> {workshop.details}</p>
                                            <button className="register-button" onClick={() => handlePlayWorkshop(workshop)}>
                                                Play Workshop
                                            </button>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </section>
                </main>
            </div>

            {activeWorkshop && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Pre-Recorded: {activeWorkshop.name}</h3>
                            <button className="cancel-button" onClick={handleCancelWorkshop}>✕</button>
                        </div>
                        <div className="video-placeholder">
                            <p>🎥 Video Player - {activeWorkshop.name}</p>
                            <div className="video-controls">
                                <button onClick={() => isPlaying ? handlePauseWorkshop() : handlePlayWorkshop(activeWorkshop)}>
                                    {isPlaying ? "Pause" : "Play"}
                                </button>
                                <button onClick={handleStopWorkshop}>Stop</button>
                            </div>
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
                        </div>
                        <div className="modal-actions">
                            <button onClick={handleCancelWorkshop}>Cancel</button>
                            <button onClick={handleFinishWorkshop}>Finish Workshop</button>
                        </div>
                    </div>
                </div>
            )}

            {showFeedback && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        {!submittedFeedback ? (
                            <>
                                <h3>Rate this Workshop</h3>
                                <div className="rating-stars">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            onClick={() => setRating(star)}
                                            style={{ cursor: "pointer", fontSize: "24px", color: star <= rating ? "#ffcc00" : "#ccc" }}
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

export default PROPreRecordedWorkshops;
