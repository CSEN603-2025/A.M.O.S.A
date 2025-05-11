import React, { useState } from "react";
import './CSS/StudentDashboard.css';
import { FiBell } from 'react-icons/fi';

const internshipsData = [
    { id: 1, company: "TechCorp", status: "Completed", duration: "Jan 2023 - Jun 2023", title: "Software Engineer Intern", current: false },
    { id: 2, company: "Marketify", status: "Completed", duration: "Jul 2023 - Dec 2023", title: "Marketing Intern", current: false },
    { id: 3, company: "DataWorks", status: "Current", duration: "Jan 2025 - Present", title: "Data Analyst Intern", current: true }
];

const courses = ["Intro to Software Engineering", "Data Structures", "Marketing Fundamentals", "Database Systems"];



const MyInternships = () => {
    const [selectedInternship, setSelectedInternship] = useState(null);
    const [evaluations, setEvaluations] = useState({});
    const [reports, setReports] = useState({});
    const [recommendations, setRecommendations] = useState({});
    const [submitted, setSubmitted] = useState({});
    const [editable, setEditable] = useState({});
    const [helpfulCourses, setHelpfulCourses] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    const isEvalEditable = (id) => !submitted[id]?.evaluation || editable[id]?.evaluation;
    const isReportEditable = (id) => !submitted[id]?.report || editable[id]?.report;

    const handleCourseToggle = (course, internshipId) => {
        setHelpfulCourses(prev => ({
            ...prev,
            [internshipId]: prev[internshipId]?.includes(course)
                ? prev[internshipId].filter(c => c !== course)
                : [...(prev[internshipId] || []), course]
        }));
    };

    const handleSubmitEvaluation = (id) => {
        setSubmitted(prev => ({ ...prev, [id]: { ...prev[id], evaluation: true } }));
        setEditable(prev => ({ ...prev, [id]: { ...prev[id], evaluation: false } }));
    };

    const handleEditEvaluation = (id) => {
        setEditable(prev => ({ ...prev, [id]: { ...prev[id], evaluation: true } }));
    };

    const handleSaveEvaluation = (id) => {
        setEditable(prev => ({ ...prev, [id]: { ...prev[id], evaluation: false } }));
    };

    const handleDeleteEvaluation = (id) => {
        setEvaluations(prev => ({ ...prev, [id]: "" }));
        setRecommendations(prev => ({ ...prev, [id]: false }));
        setSubmitted(prev => ({ ...prev, [id]: { ...prev[id], evaluation: false } }));
        setEditable(prev => ({ ...prev, [id]: { ...prev[id], evaluation: true } }));
    };

    const handleSubmitReport = (id) => {
        setSubmitted(prev => ({ ...prev, [id]: { ...prev[id], report: true } }));
        setEditable(prev => ({ ...prev, [id]: { ...prev[id], report: false } }));
    };

    const handleEditReport = (id) => {
        setEditable(prev => ({ ...prev, [id]: { ...prev[id], report: true } }));
    };

    const handleSaveReport = (id) => {
        setEditable(prev => ({ ...prev, [id]: { ...prev[id], report: false } }));
    };

    const handleDeleteReport = (id) => {
        setReports(prev => ({ ...prev, [id]: { introduction: "", body: "", conclusion: "" } }));
        setHelpfulCourses(prev => ({ ...prev, [id]: [] }));
        setSubmitted(prev => ({ ...prev, [id]: { ...prev[id], report: false } }));
        setEditable(prev => ({ ...prev, [id]: { ...prev[id], report: true } }));
    };

    const downloadReport = (id) => {
        const report = reports[id];
        if (!report) return;

        const content =
            `Introduction:\n${report.introduction || ""}\n\n` +
            `Body:\n${report.body || ""}\n\n` +
            `Title:\n${report.conclusion || ""}\n\n` +
            `Helpful Courses:\n${(helpfulCourses[id] || []).join(", ")}`;

        const blob = new Blob([content], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `Report_${id}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };


    const filteredInternships = internshipsData.filter(internship => {
        const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) || internship.company.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === "All" || (filterStatus === "Current" && internship.current) || (filterStatus === "Completed" && !internship.current);
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                <div className="header-left">
                    <h1 className="dashboard-title">My Internships</h1>
                </div>
                <div className="header-right">
                    <a href="/" className="signout-button">Sign Out</a>
                </div>
            </header>

            <div className="dashboard-content">
                <aside className="dashboard-sidebar">
                    <div className="notification-widget">
                        <a href="/StudentNotifications" className="notification-link">
                            <FiBell size={18} className="bell-icon" />
                            <span>Notifications</span>
                        </a>
                    </div>
                    <h2 className="sidebar-title">Navigation</h2>
                    <ul className="nav-list">
                        <li className="nav-item"><a href="/StudentDashboard" className="nav-link">Home</a></li>
                        <li className="nav-item"><a href="/studentInternships" className="nav-link">Browse Internships</a></li>
                        <li className="nav-item"><a href="/StudentApplied" className="nav-link">View Applied Internships</a></li>
                        <li className="nav-item"><a href="/student/profile" className="nav-link">My Profile</a></li>
                        <li className="nav-item">My Internships</li>
                    </ul>
                </aside>

                <main className="dashboard-main">
                    <div className="search-filter-section">
                        <input
                            type="text"
                            placeholder="Search by title or company..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                        <select onChange={e => setFilterStatus(e.target.value)} value={filterStatus}>
                            <option value="All">All</option>
                            <option value="Current">Current</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className="internships-list">
                        {filteredInternships.map(internship => (
                            <div key={internship.id} className="internship-card">
                                <div className="internship-header">
                                    <strong>{internship.title}</strong> at {internship.company}
                                    <div>Status: {internship.status}</div>
                                    <div>Duration: {internship.duration}</div>
                                </div>
                                {!internship.current && (
                                    <button onClick={() => setSelectedInternship(selectedInternship === internship.id ? null : internship.id)}>
                                        {selectedInternship === internship.id ? "Hide Details" : "View Details"}
                                    </button>
                                )}

                                {selectedInternship === internship.id && !internship.current && (
                                    <div className="internship-details">
                                        <div className="evaluation-section">
                                            <textarea
                                                placeholder="Write evaluation..."
                                                value={evaluations[internship.id] || ""}
                                                onChange={e => setEvaluations({ ...evaluations, [internship.id]: e.target.value })}
                                                readOnly={!isEvalEditable(internship.id)}
                                            />
                                            <label>
                                                Recommend to others
                                                <input
                                                    type="checkbox"
                                                    checked={recommendations[internship.id] || false}
                                                    onChange={e => setRecommendations({ ...recommendations, [internship.id]: e.target.checked })}
                                                    disabled={!isEvalEditable(internship.id)}
                                                />
                                            </label>
                                            {!submitted[internship.id]?.evaluation ? (
                                                <button onClick={() => handleSubmitEvaluation(internship.id)}>Submit Evaluation</button>
                                            ) : editable[internship.id]?.evaluation ? (
                                                <button onClick={() => handleSaveEvaluation(internship.id)}>Save</button>
                                            ) : (
                                                <>
                                                    <button onClick={() => handleEditEvaluation(internship.id)}>Edit</button>
                                                    <button onClick={() => handleDeleteEvaluation(internship.id)}>Delete</button>
                                                </>
                                            )}
                                        </div>

                                        <div className="report-section">
                                            <h3>Report</h3>
                                            <label>Introduction</label>
                                            <textarea
                                                placeholder="Introduction"
                                                value={reports[internship.id]?.introduction || ""}
                                                onChange={e => setReports(prev => ({
                                                    ...prev,
                                                    [internship.id]: { ...prev[internship.id], introduction: e.target.value }
                                                }))}
                                                readOnly={!isReportEditable(internship.id)}
                                            />
                                            <label>Body</label>
                                            <textarea
                                                placeholder="Body"
                                                value={reports[internship.id]?.body || ""}
                                                onChange={e => setReports(prev => ({
                                                    ...prev,
                                                    [internship.id]: { ...prev[internship.id], body: e.target.value }
                                                }))}
                                                readOnly={!isReportEditable(internship.id)}
                                            />
                                            <label>Title</label>
                                            <textarea
                                                placeholder="Title"
                                                value={reports[internship.id]?.conclusion || ""}
                                                onChange={e => setReports(prev => ({
                                                    ...prev,
                                                    [internship.id]: { ...prev[internship.id], conclusion: e.target.value }
                                                }))}
                                                readOnly={!isReportEditable(internship.id)}
                                            />

                                            <div className="course-selection">
                                                <h4>Courses that helped:</h4>
                                                {courses.map(course => (
                                                    <div key={course}>
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                checked={helpfulCourses[internship.id]?.includes(course) || false}
                                                                onChange={() => handleCourseToggle(course, internship.id)}
                                                                disabled={!isReportEditable(internship.id)}
                                                            />
                                                            {course}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>

                                            {!submitted[internship.id]?.report ? (
                                                <button onClick={() => handleSubmitReport(internship.id)}>Submit Report</button>
                                            ) : editable[internship.id]?.report ? (
                                                <button onClick={() => handleSaveReport(internship.id)}>Save</button>
                                            ) : (
                                                <>
                                                    <button onClick={() => handleEditReport(internship.id)}>Edit</button>
                                                            <button onClick={() => handleDeleteReport(internship.id)}>Delete</button>
                                                            <button onClick={() => downloadReport(internship.id)}>Download Report</button>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </main>
            </div>

            <footer className="dashboard-footer">
                <p>&copy; 2025 SCAD System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default MyInternships;
