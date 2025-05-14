import React, { useState } from "react";
import "./CSS/SCADOfficeDashboard.css";
import "./CSS/AssessmentModal.css";
import { FiBell } from 'react-icons/fi';
import { FaPhone } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const PROAssessment = () => {
    const navigate = useNavigate();

    const goToCalls = () => {
        navigate("/student/Calls");
    };

    const goToNotifications = () => {
        navigate("/PROStudentNotifications");
    };

    const missedCalls = 5;
    const notifications = 3;

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
        setTimeout(() => setShowAlert(false), 3000);
    };

    return (
        <div className="dashboard-wrapper">
            {/* Header */}
            <header className="dashboard-header">
                <div className="header-left">
                    <h1 className="dashboard-title">PRO Student Dashboard</h1>
                </div>
                <div className="header-right">
                    <div className="header-icons">
                        <button onClick={goToCalls} className="notification-bell">
                            <FaPhone />
                            <span className="call-badge">{missedCalls}</span>
                        </button>
                        <button onClick={goToNotifications} className="notification-bell">
                            <FiBell size={24} />
                            <span className="notification-count">{notifications}</span>
                        </button>
                        <a href="/" className="signout-button">Sign Out</a>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="dashboard-content">
                {/* Sidebar */}
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
                        <li className="nav-item">Online assessments</li>
                        <li className="nav-item"><a href="/student/workshop" className="nav-link">Workshop</a></li>
                        <li className="nav-item"><a href="/PreRecord" className="nav-link">Pre-recorded workshops</a></li>
                    </ul>
                </aside>

                {/* Assessments */}
                <main className="dashboard-main">
                    <h2>Available Assessments</h2>
                    <ul className="assessment-list">
                        {assessments.map((assessment) => (
                            <li key={assessment.id} className="assessment-item">
                                <div className="assessment-header">
                                    <h3>{assessment.title}</h3>
                                    <button
                                        className="complete-button"
                                        onClick={() => setOpenModal(assessment.id)}
                                    >
                                        Take Assessment
                                    </button>
                                </div>
                                <p className="assessment-meta">Duration: {assessment.duration} • Skills: {assessment.skills}</p>
                                <p className="assessment-desc">{assessment.description}</p>

                                {scores[assessment.id] !== undefined && (
                                    <div className="assessment-results">
                                        <div className="score-display">
                                            <span>Your Score: {scores[assessment.id]}%</span>
                                            <button
                                                className="share-button"
                                                onClick={() => handleShareGrade(assessment.title)}
                                            >
                                                Share Grade on Profile
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Modal */}
                                {openModal === assessment.id && (
                                    <div className="modal-overlay">
                                        <div className="modal-content">
                                            <h3>{assessment.title} - MCQ</h3>
                                            {assessment.questions.map((q, index) => (
                                                <div key={index} className="question-block">
                                                    <p><strong>Q{index + 1}:</strong> {q.question}</p>
                                                    {q.options.map((opt, i) => (
                                                        <label key={i} className="option-label">
                                                            <input
                                                                type="radio"
                                                                name={`q-${index}`}
                                                                value={opt}
                                                                checked={selectedAnswers[index] === opt}
                                                                onChange={() => handleOptionChange(index, opt)}
                                                            />
                                                            {opt}
                                                        </label>
                                                    ))}
                                                </div>
                                            ))}
                                            <div className="modal-actions">
                                                <button onClick={() => handleSubmit(assessment.id)}>Submit</button>
                                                <button onClick={() => setOpenModal(null)}>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </main>
            </div>

            {/* Alert */}
            {showAlert && (
                <div className="custom-alert">
                    <p>{alertMessage}</p>
                </div>
            )}

            {/* Footer */}
            <footer className="dashboard-footer">
                <p>&copy; 2025 SCAD System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default PROAssessment;
