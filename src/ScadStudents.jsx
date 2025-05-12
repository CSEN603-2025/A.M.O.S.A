import React, { useState } from "react";
import { FaPhone, FaBell } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import './CSS/SCADOfficeDashboard.css';

const SCADStudent = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [filterStatus, setFilterStatus] = useState("All");
    const navigate = useNavigate();
    const location = useLocation();

    // Example numbers for calls and notifications
    const missedCalls = 5;
    const notifications = 3;

    const goToCalls = () => {
        navigate("/scad/Calls", { state: { from: location.pathname } });
    };

    const goToNotifications = () => {
        navigate("/scad/noti", { state: { from: location.pathname } });
    };

    const students = [
        {
            id: 1,
            name: "Sara Ahmed",
            major: "Computer Science",
            email: "sara@guc.edu.eg",
            phone: "01012345678",
            jobInterests: "Backend Development, Cloud Engineering",
            experience: "Interned at Microsoft Egypt",
            semester: 7,
            internshipStatus: "Accepted",
            hasProBadge: true,
        },
        {
            id: 2,
            name: "Mohamed Tarek",
            major: "Medicine",
            email: "mohamed@guc.edu.eg",
            phone: "01098765432",
            jobInterests: "Dermatology",
            experience: "Interned at KAUH",
            semester: 6,
            internshipStatus: "Pending",
            hasProBadge: false,
        },
        {
            id: 3,
            name: "Layla Nasser",
            major: "Media Engineering",
            email: "layla@guc.edu.eg",
            phone: "01123456789",
            jobInterests: "UI/UX Design, Frontend Development",
            experience: "Freelance projects",
            semester: 8,
            internshipStatus: "Rejected",
            hasProBadge: true,
        },
    ];

    const filteredStudents = students.filter((student) => {
        return filterStatus === "All" || student.internshipStatus === filterStatus;
    });

    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                <div className="header-left">
                    <h1 className="dashboard-title">SCAD Office Dashboard</h1>
                </div>
                <div className="header-right">
                    <div className="header-icons">
                        {/* Calls Button with Badge */}
                        <button onClick={goToCalls} className="icon-button call-button">
                            <FaPhone />
                            <span className="call-badge">{missedCalls}</span>
                        </button>

                        {/* Notifications Button with Badge */}
                        <button onClick={goToNotifications} className="icon-button notification-button">
                            <FaBell />
                            <span className="notification-badge">{notifications}</span>
                        </button>

                        <a href="/" className="signout-button">Sign Out</a>
                    </div>
                </div>
            </header>

            <div className="dashboard-content">
                <aside className="dashboard-sidebar">
                    <h2 className="sidebar-title">Navigation</h2>
                    <ul className="nav-list">
                        <li className="nav-item"><a href="/SCADOfficedashboard" className="nav-link">Home</a></li>
                        <li className="nav-item"><a href="/scad/companies" className="nav-link">Pending Company Applications</a></li>
                        <li className="nav-item"><a href="/scad/interns" className="nav-link">All Internships</a></li>
                        <li className="nav-item"><a href="/scad/cycle" className="nav-link">Current Cycle Information</a></li>
                        <li className="nav-item">View Students</li>
                        <li className="nav-item"><a href="/scad/reports" className="nav-link">View Reports</a></li>
                        <li className="nav-item"><a href="/scad/Statistics" className="nav-link">Statistics</a></li>
                        <li className="nav-item"><a href="/scad/Appointments" className="nav-link">Appointments</a></li>
                        <li className="nav-item"><a href="/scad/Calls" className="nav-link">Calls</a></li>
                        <li className="nav-item"><a href="/scad/Workshop" className="nav-link">Workshop</a></li>
                    </ul>
                </aside>

                <main className="dashboard-main">
                    <div className="students-container">
                        <div className="filter-section">
                            <label htmlFor="filter">Filter by Internship Status: </label>
                            <select
                                id="filter"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="All">All</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Pending">Pending</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>

                        <ul className="student-list">
                            {filteredStudents.map((student) => (
                                <li
                                    key={student.id}
                                    className="student-item"
                                    onClick={() => setSelectedStudent(student)}
                                >
                                    <strong>{student.name}</strong>  {student.major}
                                </li>
                            ))}
                        </ul>

                        {selectedStudent && (
                            <div className="student-popup">
                                <div className="popup-content">
                                    <button className="close-button" onClick={() => setSelectedStudent(null)}>
                                        X
                                    </button>
                                    <h2>{selectedStudent.name}</h2>
                                    <p><strong>Email:</strong> {selectedStudent.email}</p>
                                    <p><strong>Phone:</strong> {selectedStudent.phone}</p>
                                    <p><strong>Job Interests:</strong> {selectedStudent.jobInterests}</p>
                                    <p><strong>Past Experience:</strong> {selectedStudent.experience}</p>
                                    <p><strong>Major:</strong> {selectedStudent.major}</p>
                                    <p><strong>Semester:</strong> {selectedStudent.semester}</p>
                                    <p><strong>Pro Badge:</strong> {selectedStudent.hasProBadge ? " Yes" : " No"}</p>
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

export default SCADStudent;