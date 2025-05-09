import React, { useState } from "react";
import "./CSS/PROStudentDashboard.css";
import { useLocation } from 'react-router-dom';

const PROWorkshop = () => {
    const workshops = [
        {
            id: 1,
            name: "Resume Writing 101",
            startDate: "2025-06-01T10:00",
            endDate: "2025-06-01T12:00",
            description: "Learn to craft a compelling resume.",
            speakerBio: "Jane Doe, Career Coach",
            agenda: "Intro > Tips > Q&A",
            details: "This workshop will cover all aspects of resume writing including formatting, content selection, and tailoring your resume for specific job applications. Bring your current resume for review!"
        },
        {
            id: 2,
            name: "Portfolio Presentation",
            startDate: "2025-06-05T14:00",
            endDate: "2025-06-05T16:00",
            description: "Showcasing your work like a pro.",
            speakerBio: "John Smith, Industry Expert",
            agenda: "Presentation Skills > Demo > Review",
            details: "Learn how to present your portfolio effectively to potential employers. We'll cover presentation techniques, what to include, and how to handle Q&A sessions."
        }
    ];

    const [expandedWorkshop, setExpandedWorkshop] = useState(null);

    const toggleWorkshop = (id) => {
        setExpandedWorkshop(expandedWorkshop === id ? null : id);
    };

    const handleRegister = (e, workshopId) => {
        e.stopPropagation();
        console.log(`Registering for workshop ${workshopId}`);
        // Registration logic would go here
    };
    const location = useLocation();
    const currentPath = location.pathname;

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
                        <li className="nav-item"><a href="/student/profile" className="nav-link">My Profile</a></li>
                        <li className="nav-item"><a href="/student/settings" className="nav-link">Settings</a></li>
                        <li className="nav-item"><a href="/student/appointments" className="nav-link">Appointments</a></li>
                        <li className="nav-item"><a href="/student/Calls" className="nav-link">Calls</a></li>
                        <li className="nav-item"><a href="/student/viewed" className="nav-link">Viewed my profile</a></li>
                        <li className="nav-item"><a href="/student/assessment" className="nav-link">Online assessments</a></li>
                        <li className="nav-item">
    {currentPath === "/student/workshop" ? (
        <span className="nav-link active">Workshop</span>
    ) : (
        <a href="/student/workshop" className="nav-link">Workshop</a>
    )}
</li>



                    </ul>
                </aside>
                <main className="dashboard-main">
                    <h2>Available Workshops</h2>
                    
                    <ul className="workshop-list">
                        {workshops.map((workshop) => (
                            <li key={workshop.id} className="workshop-item">
                                <div className="workshop-summary">
                                    <h3>{workshop.name}</h3>
                                    <p><strong>Time:</strong> {new Date(workshop.startDate).toLocaleString()} to {new Date(workshop.endDate).toLocaleString()}</p>
                                    <p><strong>Description:</strong> {workshop.description}</p>
                                    <button 
                                        className="learn-more-button"
                                        onClick={() => toggleWorkshop(workshop.id)}
                                    >
                                        {expandedWorkshop === workshop.id ? "Show Less" : "Learn More"}
                                    </button>
                                </div>
                                
                                {expandedWorkshop === workshop.id && (
                                    <div className="workshop-details">
                                        <p><strong>Speaker:</strong> {workshop.speakerBio}</p>
                                        <p><strong>Agenda:</strong> {workshop.agenda}</p>
                                        <p><strong>Full Details:</strong> {workshop.details}</p>
                                        <button 
                                            className="register-button"
                                            onClick={(e) => handleRegister(e, workshop.id)}
                                        >
                                            Register
                                        </button>
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

export default PROWorkshop;