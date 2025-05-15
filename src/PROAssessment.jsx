import React, { useState } from "react";
import { FiClipboard, FiAward } from "react-icons/fi";
import "./CSS/SCADOfficeDashboard.css";
import ProstudentLayout from "./components/ProstudentLayout";

const PROAssessment = () => {
    const assessments = [
        {
            id: 1,
            title: "Technical Skills Evaluation",
            duration: "30 minutes",
            skills: "JavaScript, React, Algorithms",
            description: "Test your coding skills with practical problems",
            questions: [
                {
                    question: "What does '===' mean in JavaScript?",
                    options: ["Assignment", "Equality", "Strict equality", "Not equal"],
                    answer: "Strict equality"
                },
                {
                    question: "React is mainly used for?",
                    options: ["Database", "API", "UI", "Security"],
                    answer: "UI"
                }
            ]
        },
        {
            id: 2,
            title: "Personality Assessment",
            duration: "15 minutes",
            skills: "Communication, Teamwork",
            description: "Evaluate your workplace personality traits",
            questions: [
                {
                    question: "You prefer to work:",
                    options: ["Alone", "In a team", "With close supervision", "Not sure"],
                    answer: "In a team"
                },
                {
                    question: "You handle conflict by:",
                    options: ["Avoiding it", "Aggression", "Communication", "Ignoring"],
                    answer: "Communication"
                }
            ]
        },
        {
            id: 3,
            title: "Design Challenge",
            duration: "45 minutes",
            skills: "UI/UX, Creativity",
            description: "Complete a design task for a mock client",
            questions: [
                {
                    question: "What does UI stand for?",
                    options: ["User Interaction", "User Interface", "Universal Interface", "None"],
                    answer: "User Interface"
                },
                {
                    question: "What tool is commonly used for prototyping?",
                    options: ["Photoshop", "Figma", "Excel", "Word"],
                    answer: "Figma"
                }
            ]
        }
    ];

    const [openModal, setOpenModal] = useState(null);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [scores, setScores] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const handleOptionChange = (qIndex, value) => {
        setSelectedAnswers({ ...selectedAnswers, [qIndex]: value });
    };

    const handleSubmit = (assessmentId) => {
        const assessment = assessments.find(a => a.id === assessmentId);
        const total = assessment.questions.length;
        const correct = assessment.questions.filter((q, index) => selectedAnswers[index] === q.answer).length;
        const score = Math.round((correct / total) * 100);
        setScores({ ...scores, [assessmentId]: score });
        setOpenModal(null);
        setSelectedAnswers({});
    };

    const handleShareGrade = (assessmentTitle) => {
        setAlertMessage(`"${assessmentTitle}" grade has been shared on your profile.`);
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 3000);
    };

    return (
        <ProstudentLayout>
            <main className="main-content" aria-label="Main Content">
                <h1 className="main-welcome" style={{ marginTop: 0, marginBottom: 32 }}>Available Assessments</h1>

                <div className="internship-item" style={{
                    background: '#fff',
                    borderRadius: 12,
                    boxShadow: '0 2px 8px rgba(30,41,59,0.06)',
                    padding: 24,
                    border: '1px solid var(--border)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                        <FiClipboard style={{ color: 'var(--primary)', fontSize: 22 }} />
                        <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Skill Assessments</span>
                    </div>

                    <div style={{ display: 'grid', gap: 16 }}>
                        {assessments.map((assessment) => (
                            <div key={assessment.id} style={{
                                background: '#fff',
                                borderRadius: 8,
                                border: '1px solid var(--border)',
                                padding: 16,
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--primary)' }}>
                                        {assessment.title}
                                    </h3>
                                    <button
                                        onClick={() => setOpenModal(assessment.id)}
                                        style={{
                                            background: 'var(--primary)',
                                            color: 'white',
                                            border: 'none',
                                            padding: '8px 16px',
                                            borderRadius: 6,
                                            cursor: 'pointer',
                                            fontWeight: 600
                                        }}
                                    >
                                        Take Assessment
                                    </button>
                                </div>
                                <p style={{ margin: '8px 0', color: '#666' }}>{assessment.description}</p>
                                <div style={{ display: 'flex', gap: 16, fontSize: 14 }}>
                                    <span><strong>Duration:</strong> {assessment.duration}</span>
                                    <span><strong>Skills:</strong> {assessment.skills}</span>
                                </div>

                                {scores[assessment.id] !== undefined && (
                                    <div style={{
                                        marginTop: 16,
                                        paddingTop: 16,
                                        borderTop: '1px solid var(--border)',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <FiAward style={{ color: '#FFD700' }} />
                                            <span style={{ fontWeight: 600 }}>
                                                Your Score: <span style={{ color: '#00C49F' }}>{scores[assessment.id]}%</span>
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => handleShareGrade(assessment.title)}
                                            style={{
                                                background: 'transparent',
                                                color: 'var(--primary)',
                                                border: '1px solid var(--primary)',
                                                padding: '6px 12px',
                                                borderRadius: 6,
                                                cursor: 'pointer',
                                                fontWeight: 600
                                            }}
                                        >
                                            Share Grade
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {openModal !== null && (
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
                        maxWidth: 800,
                        maxHeight: '90vh',
                        overflow: 'auto',
                        padding: 24,
                        boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <h3 style={{ margin: 0, color: 'var(--primary)' }}>
                                {assessments.find(a => a.id === openModal)?.title}
                            </h3>
                            <button
                                onClick={() => setOpenModal(null)}
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

                        <div style={{ display: 'grid', gap: 24 }}>
                            {assessments.find(a => a.id === openModal)?.questions.map((q, index) => (
                                <div key={index} style={{
                                    padding: 16,
                                    background: '#f8f9fa',
                                    borderRadius: 8,
                                    border: '1px solid var(--border)'
                                }}>
                                    <p style={{ fontWeight: 600, marginBottom: 12 }}>Q{index + 1}: {q.question}</p>
                                    <div style={{ display: 'grid', gap: 8 }}>
                                        {q.options.map((opt, i) => (
                                            <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <input
                                                    type="radio"
                                                    name={`q-${index}`}
                                                    value={opt}
                                                    checked={selectedAnswers[index] === opt}
                                                    onChange={() => handleOptionChange(index, opt)}
                                                    style={{ width: 16, height: 16 }}
                                                />
                                                {opt}
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                            <button
                                onClick={() => handleSubmit(openModal)}
                                style={{
                                    flex: 1,
                                    background: 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '12px',
                                    borderRadius: 8,
                                    cursor: 'pointer',
                                    fontWeight: 600
                                }}
                            >
                                Submit Assessment
                            </button>
                            <button
                                onClick={() => setOpenModal(null)}
                                style={{
                                    flex: 1,
                                    background: '#FF6384',
                                    color: 'white',
                                    border: 'none',
                                    padding: '12px',
                                    borderRadius: 8,
                                    cursor: 'pointer',
                                    fontWeight: 600
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showAlert && (
                <div style={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20,
                    background: '#00C49F',
                    color: 'white',
                    padding: '12px 24px',
                    borderRadius: 8,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    zIndex: 1000,
                    animation: 'fadeIn 0.3s ease-in-out'
                }}>
                    <p style={{ margin: 0 }}>{alertMessage}</p>
                </div>
            )}
        </ProstudentLayout>
    );
};

export default PROAssessment;