import React, { useState, useEffect } from "react";
import './CSS/StudentDashboard.css';
import './CSS/browseInternships.css';
import { useNavigate } from 'react-router-dom';
import { FiBell } from 'react-icons/fi';


const StudentApplied = () => {
    const [appliedIds, setAppliedIds] = useState([]);
    const [internships, setInternships] = useState([]);
    const [selectedInternship, setSelectedInternship] = useState(null);

    useEffect(() => {
        const savedIds = JSON.parse(localStorage.getItem("StudentApplied")) || [];
        const savedInternships = JSON.parse(localStorage.getItem("internships")) || [];
        setAppliedIds(savedIds);
        setInternships(savedInternships);
    }, []);

    const getStatus = (id) => {
        const statusMap = {
            1: "Pending",
            2: "Finalized",
            3: "Accepted"
        };
        return statusMap[id] || "Rejected";
    };

    const appliedInternships = internships.filter((internship) => appliedIds.includes(internship.id));

    const navigate = useNavigate();

    const handleBellClick = () => {
        navigate('/StudentNotifications');
    };

    const handleLogout = () => {
        navigate('/');
    };



    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
            <h1 className="dashboard-title">View Applied Internships</h1>
            <div className="dashboard-actions">
                <button className="notification-bell" onClick={handleBellClick} title="Notifications">
                    <FiBell size={24} />
                    <span className="notification-count">4</span>
                </button>
                <button className="signout-button" onClick={handleLogout}>
                    Sign Out
                </button>
            </div>
        </header>


            <div className="dashboard-content">
                <aside className="dashboard-sidebar">
                    <h2 className="sidebar-title">Navigation</h2>
                    <ul className="nav-list">
                        <li className="nav-item"><a href="/StudentDashboard" className="nav-link">Home</a></li>
                        <li className="nav-item"><a href="/studentInternships" className="nav-link">Browse Internships</a></li>
                        <li className="nav-item">View Applied Internships</li>
                        <li className="nav-item"><a href="/student/profile" className="nav-link">My Profile</a></li>
                        <li className="nav-item"><a href="/MyInternships" className="nav-link">My Internships</a></li>
                    </ul>
                </aside>
                <main className="dashboard-main">
                    <div className="browser-wrapper">
                        <main className="browser-main">
                            <section className="list-section">
                                <h2 className="section-title">Applied Internships</h2>
                                <ul className="internship-list">
                                    {appliedInternships.map((internship) => (
                                        <li
                                            key={internship.id}
                                            className="internship-item"
                                            onClick={() => setSelectedInternship(internship)}
                                        >
                                            <p><strong>{internship.jobTitle}</strong> at {internship.companyName}</p>
                                            <p><strong>Status:</strong> {getStatus(internship.id)}</p>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </main>

                        {selectedInternship && (
                            <div className="modal">
                                <div className="modal-content">
                                    <h2>{selectedInternship.jobTitle}</h2>
                                    <p><strong>Company:</strong> {selectedInternship.companyName}</p>
                                    <p><strong>Duration:</strong> {selectedInternship.duration}</p>
                                    <p><strong>Paid:</strong> {selectedInternship.paid ? "Yes" : "No"}</p>
                                    <p><strong>Salary:</strong> {selectedInternship.salary}</p>
                                    <p><strong>Industry:</strong> {selectedInternship.industry}</p>
                                    <p><strong>Skills:</strong> {selectedInternship.skills}</p>
                                    <p><strong>Description:</strong> {selectedInternship.description}</p>
                                    <p><strong>Status:</strong> {getStatus(selectedInternship.id)}</p>

                                    <button
                                        onClick={() => setSelectedInternship(null)}
                                        className="close-button"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
            <footer className="dashboard-footer">
                <p>&copy; 2025 SCAD System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default StudentApplied;
