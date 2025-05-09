import React, { useState } from "react";
import "./CSS/SCADOfficeDashboard.css";

const PROAssessment = () => {
    // Sample assessment data
    const assessments = [
        {
            id: 1,
            title: "Technical Skills Evaluation",
            duration: "30 minutes",
            skills: "JavaScript, React, Algorithms",
            description: "Test your coding skills with practical problems"
        },
        {
            id: 2,
            title: "Personality Assessment",
            duration: "15 minutes",
            skills: "Communication, Teamwork",
            description: "Evaluate your workplace personality traits"
        },
        {
            id: 3,
            title: "Design Challenge",
            duration: "45 minutes",
            skills: "UI/UX, Creativity",
            description: "Complete a design task for a mock client"
        }
    ];

    const [completedAssessment, setCompletedAssessment] = useState(null);
    const [scores, setScores] = useState({});

    const handleComplete = (id) => {
        // Generate a random score between 70-100 for demonstration
        const randomScore = Math.floor(Math.random() * 31) + 70;
        setScores({...scores, [id]: randomScore});
        setCompletedAssessment(completedAssessment === id ? null : id);
    };

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
                    <li className="nav-item"><a href="/student/recommendations" className="nav-link">Internship Recommendations</a></li>
                        <li className="nav-item"><a href="/student/current-internship" className="nav-link">Current Internship</a></li>
                        <li className="nav-item"><a href="/student/deadlines" className="nav-link">Upcoming Deadlines</a></li>
                        <li className="nav-item"><a href="/student/proprofile" className="nav-link">My Profile</a></li>
                        <li className="nav-item"><a href="/student/settings" className="nav-link">Settings</a></li>
                        <li className="nav-item"><a href="/student/appointments" className="nav-link">Appointments</a></li>

                        <li className="nav-item"><a href="/student/Calls" className="nav-link">Calls</a></li>
                        <li className="nav-item"><a href="/student/viewed" className="nav-link">Viewed my profile</a></li>
                        <li className="nav-item active">Online assessments</li>

                        <li className="nav-item"><a href="/student/workshop" className="nav-link">Workshop</a></li>
                    </ul>
                </aside>
                
                <main className="dashboard-main">
                    <h2>Available Assessments</h2>
                    
                    <ul className="assessment-list">
                        {assessments.map((assessment) => (
                            <li key={assessment.id} className="assessment-item">
                                <div className="assessment-header">
                                    <h3>{assessment.title}</h3>
                                    <button 
                                        className="complete-button"
                                        onClick={() => handleComplete(assessment.id)}
                                    >
                                        {completedAssessment === assessment.id ? "Hide Results" : "Complete"}
                                    </button>
                                </div>
                                <p className="assessment-meta">Duration: {assessment.duration} • Skills: {assessment.skills}</p>
                                <p className="assessment-desc">{assessment.description}</p>
                                
                                {completedAssessment === assessment.id && (
                                    <div className="assessment-results">
                                        <div className="score-display">
                                            <span>Your Score: {scores[assessment.id]}%</span>
                                            <button className="share-button">
                                                Share Grade on Profile
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </main>
            </div>
            
            <footer className="dashboard-footer">
                <p>&copy; 2025 SCAD System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default PROAssessment;