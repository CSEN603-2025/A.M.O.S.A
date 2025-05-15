import React, { useState } from "react";
import "./CSS/PROStudentDashboard.css";
import ProstudentLayout from "./components/prostudentLayout";

const PROPreRecordedWorkshops = () => {
    const preRecordedWorkshops = [
        {
            "id": 1,
    "name": "Resume Writing Masterclass",
    "duration": "45 min",
    "description": "Learn to craft a professional resume that stands out.",
    "speakerBio": "Jane Doe, Career Coach",
    "uploadDate": "2025-05-01",
    "videoUrl": "#",
    "details": "This session covers resume structure, impactful language, and formatting tips. Ideal for students and professionals aiming to enhance job prospects."
        },
       {
    "id": 2,
    "name": "Technical Interview Preparation",
    "duration": "1h 20min",
    "description": "Ace your technical interviews with these strategies.",
    "speakerBio": "John Smith, Senior Developer",
    "uploadDate": "2025-05-10",
    "videoUrl": "#",
    "details": "Learn how to approach coding problems, communicate your thought process, and handle common technical questions. Perfect for software job seekers at any level."
},
{
    "id": 3,
    "name": "Networking for Introverts",
    "duration": "35 min",
    "description": "Effective networking strategies for shy professionals.",
    "speakerBio": "Alex Johnson, HR Specialist",
    "uploadDate": "2025-05-15",
    "videoUrl": "#",
    "details": "Discover techniques to build meaningful connections without stepping out of your comfort zone. A must-watch for professionals who find traditional networking challenging."
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
        setExpandedWorkshop(expandedWorkshop === id ? null : id);
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
        <ProstudentLayout>
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
                                            <button 
                                                className="register-button" 
                                                onClick={() => handlePlayWorkshop(workshop)}
                                            >
                                                Play Workshop
                                            </button>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </section>
                </main>
            

            {activeWorkshop && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3>Pre-Recorded: {activeWorkshop.name}</h3>
                            <button 
                                className="cancel-button" 
                                onClick={handleCancelWorkshop}
                                title="Close Workshop"
                                aria-label="Close Workshop"
                            >
                                ✕
                            </button>
                        </div>
                        <div style={{ 
                            background: "#000", 
                            height: "300px", 
                            marginBottom: "1rem", 
                            color: "white", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center",
                            position: "relative"
                        }}>
                            <p>🎥 Video Player - {activeWorkshop.name}</p>
                            <div style={{
                                position: "absolute",
                                bottom: "10px",
                                left: "10px",
                                display: "flex",
                                gap: "10px"
                            }}>
                                <button 
                                    onClick={() => isPlaying ? handlePauseWorkshop() : handlePlayWorkshop(activeWorkshop)}
                                    style={{
                                        padding: "5px 15px",
                                        background: "#4CAF50",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer"
                                    }}
                                >
                                    {isPlaying ? "Pause" : "Play"}
                                </button>
                                <button 
                                    onClick={handleStopWorkshop}
                                    style={{
                                        padding: "5px 15px",
                                        background: "#f44336",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer"
                                    }}
                                >
                                    Stop
                                </button>
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
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "1rem" }}>
                            <button 
                                onClick={handleCancelWorkshop}
                                style={{
                                    padding: "10px",
                                    background: "#f44336",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: "pointer"
                                }}
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleFinishWorkshop}
                                style={{
                                    padding: "10px",
                                    background: "#4CAF50",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "8px",
                                    cursor: "pointer"
                                }}
                            >
                                Finish Workshop
                            </button>
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
                                <button 
                                    onClick={handleSubmitFeedback}
                                    style={{
                                        padding: "10px 20px",
                                        background: "#4CAF50",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "8px",
                                        cursor: "pointer"
                                    }}
                                >
                                    Submit Feedback
                                </button>
                            </>
                        ) : (
                            <h3 style={{ textAlign: "center", color: "#4CAF50" }}>✅ Thank you for your feedback!</h3>
                        )}
                    </div>
                </div>
            )}

           </ProstudentLayout>
    );
};

export default PROPreRecordedWorkshops;