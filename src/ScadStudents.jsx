import React, { useState } from "react";
import { FaPhone, FaBell } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import './CSS/SCADOfficeDashboard.css';
import './CSS/browseInternships.css';

const SCADStudent = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [filterStatus, setFilterStatus] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
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

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
    };

    const filteredStudents = students.filter((student) => {
        return (filterStatus === "All" || student.internshipStatus === filterStatus) &&
            (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.major.toLowerCase().includes(searchTerm.toLowerCase()));
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
                        <button onClick={goToCalls} className="notification-bell">
                            <FaPhone />
                            <span className="call-badge">{missedCalls}</span>
                        </button>

                        {/* Notifications Button with Badge */}
                        <button onClick={goToNotifications} className="notification-bell">
                            <FiBell size={24} />
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
                        <li className="nav-item"><a href="/scad/Appointmnets" className="nav-link">Appointments</a></li>
                        <li className="nav-item"><a href="/scad/Calls" className="nav-link">Calls</a></li>
                        <li className="nav-item"><a href="/scad/Workshop" className="nav-link">Workshop</a></li>
                    </ul>
                </aside>

                <main className="dashboard-main">
                    <div className="browser-wrapper">
                        <header className="browser-header">
                            <h1 className="browser-title">Students Directory</h1>
                        </header>
                        <main className="browser-main">
                            <section className="filter-section">
                                <h2 className="section-title">Search and Filter</h2>
                                <input
                                    type="text"
                                    placeholder="Search by name or major"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="search-input"
                                />
                                <select
                                    name="status"
                                    value={filterStatus}
                                    onChange={handleFilterChange}
                                    className="filter-select"
                                >
                                    <option value="All">All Students Status</option>
                                    <option value="Accepted">Accepted</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </section>
                            <section className="list-section">
                                <h2 className="section-title">Student List</h2>
                                <ul className="internship-list">
                                    {filteredStudents.map((student) => (
                                        <li
                                            key={student.id}
                                            className="internship-item"
                                            onClick={() => setSelectedStudent(student)}
                                        >
                                            <p><strong>{student.name}</strong></p>
                                            <p><strong>Major:</strong> {student.major}</p>
                                            <p><strong>Status:</strong>
                                                <span className={`status-${student.internshipStatus.toLowerCase()}`}>
                                                    {student.internshipStatus}
                                                </span>
                                            </p>
                                            {student.hasProBadge && (
                                                <span className="pro-badge">PRO</span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </main>
                        {selectedStudent && (
                            <div className="workshop-modal-backdrop">
                                <div className="workshop-modal">
                                    <div className="modal-buttons">
                                    <button
                                        onClick={() => setSelectedStudent(null)}
                                       
                                    >
                                        Close
                                        </button>
                                    </div>
                                    <h2>{selectedStudent.name}</h2>
                                    <p><strong>Email:</strong> {selectedStudent.email}</p>
                                    <p><strong>Phone:</strong> {selectedStudent.phone}</p>
                                    <p><strong>Major:</strong> {selectedStudent.major}</p>
                                    <p><strong>Semester:</strong> {selectedStudent.semester}</p>
                                    <p><strong>Job Interests:</strong> {selectedStudent.jobInterests}</p>
                                    <p><strong>Past Experience:</strong> {selectedStudent.experience}</p>
                                    <p><strong>Internship Status:</strong> {selectedStudent.internshipStatus}</p>
                                    <p><strong>Pro Badge:</strong> {selectedStudent.hasProBadge ? "Yes" : "No"}</p>
                                    
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