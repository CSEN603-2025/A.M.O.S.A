import React, { useState } from "react";
import { FiBook } from "react-icons/fi";
import "./CSS/SCADOfficeDashboard.css";
import ProstudentLayout from "./components/ProstudentLayout";

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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <ProstudentLayout>
            <main className="main-content" aria-label="Main Content">
                <h1 className="main-welcome" style={{ marginTop: 0, marginBottom: 32 }}>Pre-Recorded Workshops</h1>

                <div className="internship-item" style={{
                    background: '#fff',
                    borderRadius: 12,
                    boxShadow: '0 2px 8px rgba(30,41,59,0.06)',
                    padding: 24,
                    border: '1px solid var(--border)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                        <FiBook style={{ color: 'var(--primary)', fontSize: 22 }} />
                        <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Available Workshops</span>
                    </div>

                    <div style={{ display: 'grid', gap: 16 }}>
                        {preRecordedWorkshops.map((workshop) => (
                            <div key={workshop.id} style={{
                                background: '#fff',
                                borderRadius: 8,
                                border: '1px solid var(--border)',
                                padding: 16,
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--primary)' }}>{workshop.name}</h3>
                                    <button
                                        onClick={() => toggleWorkshop(workshop.id)}
                                        style={{
                                            background: 'transparent',
                                            border: '1px solid var(--primary)',
                                            color: 'var(--primary)',
                                            padding: '6px 12px',
                                            borderRadius: 6,
                                            cursor: 'pointer',
                                            fontWeight: 600
                                        }}
                                    >
                                        {expandedWorkshop === workshop.id ? "Show Less" : "Show More"}
                                    </button>
                                </div>
                                <p style={{ margin: '8px 0', color: '#666' }}>{workshop.description}</p>
                                <p style={{ margin: '4px 0', fontSize: 14 }}><strong>Duration:</strong> {workshop.duration}</p>
                                <p style={{ margin: '4px 0', fontSize: 14 }}><strong>Upload Date:</strong> {formatDate(workshop.uploadDate)}</p>

                                {expandedWorkshop === workshop.id && (
                                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                                        <p style={{ margin: '8px 0' }}><strong>Speaker:</strong> {workshop.speakerBio}</p>
                                        <p style={{ margin: '8px 0' }}><strong>Details:</strong> {workshop.details}</p>
                                        <button
                                            onClick={() => handlePlayWorkshop(workshop)}
                                            style={{
                                                background: 'var(--primary)',
                                                color: 'white',
                                                border: 'none',
                                                padding: '8px 16px',
                                                borderRadius: 6,
                                                cursor: 'pointer',
                                                fontWeight: 600,
                                                marginTop: 12
                                            }}
                                        >
                                            Play Workshop
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {activeWorkshop && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: '#fff',
                        borderRadius: 12,
                        width: '80%',
                        maxWidth: 900,
                        maxHeight: '90vh',
                        overflow: 'auto',
                        padding: 24,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <h3 style={{ margin: 0, color: 'var(--primary)' }}>Pre-Recorded: {activeWorkshop.name}</h3>
                            <button
                                onClick={handleCancelWorkshop}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    fontSize: 20,
                                    cursor: 'pointer',
                                    color: '#666'
                                }}
                            >
                                ✕
                            </button>
                        </div>
                        <div style={{
                            background: "#000",
                            height: 300,
                            marginBottom: 24,
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 8,
                            position: 'relative'
                        }}>
                            <p>🎥 Video Player - {activeWorkshop.name}</p>
                            <div style={{
                                position: 'absolute',
                                bottom: '10px',
                                left: '10px',
                                display: 'flex',
                                gap: '10px'
                            }}>
                                <button
                                    onClick={() => isPlaying ? handlePauseWorkshop() : handlePlayWorkshop(activeWorkshop)}
                                    style={{
                                        padding: '5px 15px',
                                        background: '#4CAF50',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {isPlaying ? "Pause" : "Play"}
                                </button>
                                <button
                                    onClick={handleStopWorkshop}
                                    style={{
                                        padding: '5px 15px',
                                        background: '#f44336',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Stop
                                </button>
                            </div>
                        </div>
                        <div>
                            <h4 style={{ marginBottom: 12 }}>Your Notes</h4>
                            <textarea
                                rows={8}
                                placeholder="Write your notes here..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: 12,
                                    borderRadius: 8,
                                    border: '1px solid var(--border)',
                                    resize: 'vertical',
                                    marginBottom: 24
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                            <button
                                onClick={handleCancelWorkshop}
                                style={{
                                    background: '#f44336',
                                    color: 'white',
                                    border: 'none',
                                    padding: '10px 20px',
                                    borderRadius: 8,
                                    cursor: 'pointer',
                                    fontWeight: 600
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleFinishWorkshop}
                                style={{
                                    background: '#00C49F',
                                    color: 'white',
                                    border: 'none',
                                    padding: '10px 20px',
                                    borderRadius: 8,
                                    cursor: 'pointer',
                                    fontWeight: 600
                                }}
                            >
                                Finish Workshop
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showFeedback && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: '#fff',
                        borderRadius: 12,
                        width: '80%',
                        maxWidth: 500,
                        padding: 24,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                    }}>
                        {!submittedFeedback ? (
                            <>
                                <h3 style={{ marginBottom: 16, color: 'var(--primary)' }}>Rate this Workshop</h3>
                                <div style={{ marginBottom: 24 }}>
                                    <label style={{ display: 'block', marginBottom: 8 }}>Rating: </label>
                                    <div style={{ display: 'flex', gap: 8 }}>
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
                                </div>
                                <div style={{ marginBottom: 24 }}>
                                    <label style={{ display: 'block', marginBottom: 8 }}>Feedback:</label>
                                    <textarea
                                        rows={4}
                                        value={feedback}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        placeholder="Leave your feedback here..."
                                        style={{
                                            width: '100%',
                                            padding: 12,
                                            borderRadius: 8,
                                            border: '1px solid var(--border)'
                                        }}
                                    />
                                </div>
                                <button
                                    onClick={handleSubmitFeedback}
                                    style={{
                                        background: 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        padding: '12px 24px',
                                        borderRadius: 8,
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        width: '100%'
                                    }}
                                >
                                    Submit Feedback
                                </button>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center', padding: 24 }}>
                                <h3 style={{ color: '#00C49F', marginBottom: 16 }}>✅ Thank you for your feedback!</h3>
                                <p>Your input helps us improve future workshops.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </ProstudentLayout>
    );
};

export default PROPreRecordedWorkshops;