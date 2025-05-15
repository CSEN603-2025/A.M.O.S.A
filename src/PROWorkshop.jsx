import React, { useState } from "react";
import { FiBook, FiVideo, FiDownload } from "react-icons/fi";
import "./CSS/SCADOfficeDashboard.css";
import ProstudentLayout from "./components/ProstudentLayout";

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
            chat: [{ sender: "Aly Ewida", message: "Good morning everyone!" }]
        }
    ];

    const [expandedWorkshop, setExpandedWorkshop] = useState(null);
    const [activeLiveWorkshop, setActiveLiveWorkshop] = useState(null);
    const [notes, setNotes] = useState("");
    const [chatMessages, setChatMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [showCertificate, setShowCertificate] = useState(false);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [submittedFeedback, setSubmittedFeedback] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [registeredWorkshops, setRegisteredWorkshops] = useState([]);
    const [successMessage, setSuccessMessage] = useState(null);

    const toggleWorkshop = (id) => {
        setExpandedWorkshop(expandedWorkshop === id ? null : id);
    };

    const handleRegister = (e, workshopId) => {
        e.stopPropagation();
        const workshop = upcomingWorkshops.find(w => w.id === workshopId);
        setSuccessMessage(`You have successfully registered to "${workshop.name}"`);
        setTimeout(() => setSuccessMessage(null), 3000);
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
            setShowCertificate(true);
        }, 2000);
    };

    const handleDownloadCertificate = () => {
        // In a real app, this would download a PDF
        console.log("Downloading certificate...");
        // Simulate download
        const link = document.createElement('a');
        link.href = '#';
        link.download = `${activeLiveWorkshop.name}-Certificate.pdf`;
        link.click();
        setShowCertificate(false);
        setActiveLiveWorkshop(null);
        setShowPopup(false);
    };

    const handleCloseCertificate = () => {
        setShowCertificate(false);
        setActiveLiveWorkshop(null);
        setShowPopup(false);
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <ProstudentLayout>
            <main className="main-content" aria-label="Main Content">
                <h1 className="main-welcome" style={{ marginTop: 0, marginBottom: 32 }}>Workshops</h1>
                
                {successMessage && (
                    <div style={{
                        position: "fixed",
                        bottom: "20px",
                        right: "20px",
                        backgroundColor: "#2ecc71",
                        color: "white",
                        padding: "12px 18px",
                        borderRadius: "10px",
                        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
                        zIndex: 1000,
                        transition: "opacity 0.3s ease",
                        animation: "fadeInUp 0.3s ease"
                    }}>
                        {successMessage}
                    </div>
                )}

                <div style={{ display: 'grid', gap: 24, width: '100%' }}>
                    {/* Upcoming Workshops Section */}
                    <div className="internship-item" style={{
                        background: '#fff',
                        borderRadius: 12,
                        boxShadow: '0 2px 8px rgba(30,41,59,0.06)',
                        padding: 24,
                        border: '1px solid var(--border)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                            <FiBook style={{ color: 'var(--primary)', fontSize: 22 }} />
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Upcoming Workshops</span>
                        </div>

                        <div style={{ display: 'grid', gap: 16 }}>
                            {upcomingWorkshops.map((workshop) => (
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
                                    <p style={{ margin: '4px 0', fontSize: 14 }}><strong>When:</strong> {formatDateTime(workshop.startDate)} - {formatDateTime(workshop.endDate).split(', ')[1]}</p>

                                    {expandedWorkshop === workshop.id && (
                                        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                                            <p style={{ margin: '8px 0' }}><strong>Speaker:</strong> {workshop.speakerBio}</p>
                                            <p style={{ margin: '8px 0' }}><strong>Agenda:</strong> {workshop.agenda}</p>
                                            <p style={{ margin: '8px 0' }}><strong>Details:</strong> {workshop.details}</p>
                                            <button
                                                onClick={(e) => handleRegister(e, workshop.id)}
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
                                                Register
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Live Workshops Section */}
                    <div className="internship-item" style={{
                        background: '#fff',
                        borderRadius: 12,
                        boxShadow: '0 2px 8px rgba(30,41,59,0.06)',
                        padding: 24,
                        border: '1px solid var(--border)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                            <FiVideo style={{ color: 'var(--primary)', fontSize: 22 }} />
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Live Workshops</span>
                        </div>

                        {liveWorkshops.map((workshop) => (
                            <div key={workshop.id} style={{
                                background: '#fff',
                                borderRadius: 8,
                                border: '1px solid var(--border)',
                                padding: 16,
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                            }}>
                                <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--primary)' }}>{workshop.name}</h3>
                                <p style={{ margin: '8px 0', color: '#666' }}>{workshop.description}</p>
                                <p style={{ margin: '4px 0', fontSize: 14 }}><strong>Speaker:</strong> {workshop.speaker}</p>
                                <p style={{ margin: '4px 0', fontSize: 14 }}><strong>Current Topic:</strong> {workshop.currentTopic}</p>
                                <button
                                    onClick={() => handleJoinLive(workshop)}
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
                                    Join Workshop
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Live Workshop Popup */}
            {showPopup && activeLiveWorkshop && (
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
                            <h3 style={{ margin: 0, color: 'var(--primary)' }}>Live: {activeLiveWorkshop.name}</h3>
                            <button
                                onClick={handleCloseCertificate}
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
                            borderRadius: 8
                        }}>
                            <p>📹 Video Placeholder</p>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
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
                                        resize: 'vertical'
                                    }}
                                />
                            </div>
                            <div>
                                <h4 style={{ marginBottom: 12 }}>Chat</h4>
                                <div style={{
                                    height: 200,
                                    overflowY: 'auto',
                                    marginBottom: 12,
                                    padding: 12,
                                    background: '#f8f9fa',
                                    borderRadius: 8,
                                    border: '1px solid var(--border)'
                                }}>
                                    {chatMessages.map((msg, idx) => (
                                        <p key={idx} style={{ margin: '4px 0' }}>
                                            <strong style={{ color: msg.sender === 'You' ? 'var(--primary)' : '#333' }}>
                                                {msg.sender}:
                                            </strong> {msg.message}
                                        </p>
                                    ))}
                                </div>
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <input
                                        type="text"
                                        placeholder="Type your message..."
                                        value={chatInput}
                                        onChange={(e) => setChatInput(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                                        style={{
                                            flex: 1,
                                            padding: 10,
                                            borderRadius: 8,
                                            border: '1px solid var(--border)'
                                        }}
                                    />
                                    <button
                                        onClick={handleSendChat}
                                        style={{
                                            background: 'var(--primary)',
                                            color: 'white',
                                            border: 'none',
                                            padding: '10px 16px',
                                            borderRadius: 8,
                                            cursor: 'pointer',
                                            fontWeight: 600
                                        }}
                                    >
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleFinishWorkshop}
                            style={{
                                background: '#00C49F',
                                color: 'white',
                                border: 'none',
                                padding: '10px 24px',
                                borderRadius: 8,
                                cursor: 'pointer',
                                fontWeight: 600,
                                marginTop: 24,
                                width: '100%'
                            }}
                        >
                            Finish Workshop
                        </button>
                    </div>
                </div>
            )}

            {/* Feedback Popup */}
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

            {/* Certificate Popup */}
            {showCertificate && (
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
                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            background: '#f8f9fa',
                            borderRadius: 8,
                            padding: 24,
                            marginBottom: 24
                        }}>
                            <h3 style={{ color: 'var(--primary)', marginBottom: 16 }}>🎉 Congratulations!</h3>
                            <p>You've successfully completed the <strong>{activeLiveWorkshop?.name}</strong> workshop.</p>
                            <p>Your certificate is ready to download!</p>
                        </div>
                        
                        <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                            <button
                                onClick={handleDownloadCertificate}
                                style={{
                                    background: 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '12px 24px',
                                    borderRadius: 8,
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8
                                }}
                            >
                                <FiDownload /> Download Certificate
                            </button>
                            <button
                                onClick={handleCloseCertificate}
                                style={{
                                    background: 'transparent',
                                    color: '#666',
                                    border: '1px solid #666',
                                    padding: '12px 24px',
                                    borderRadius: 8,
                                    cursor: 'pointer',
                                    fontWeight: 600
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </ProstudentLayout>
    );
};

export default PROWorkshop;