import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaPhone, FaFileAlt, FaClipboardList } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import './CSS/SCADOfficeDashboard.css';
import './CSS/browseInternships.css';

const mockData = [
    {
        id: 1,
        studentName: "Ali Hassan",
        major: "Computer Science",
        cycle: "Spring 2025",
        company: "Tech Solutions Ltd",
        internshipReport: {
            title: "Web Development Internship",
            introduction: "Intro about frontend development.",
            body: "Worked with React.",
            status: "flagged",
            comment: "Needs more technical detail.",
            commentSaved: false
        },
        evaluationReport: {
            startDate: "2025-02-01",
            endDate: "2025-05-01",
            companySupervisor: "Sarah Malik"
        }
    },
    {
        id: 2,
        studentName: "Sara Ahmed",
        major: "Data Science",
        cycle: "Spring 2025",
        company: "Innovatech",
        internshipReport: {
            title: "Data Internship",
            introduction: "Intro about data analysis.",
            body: "Worked with pandas and matplotlib.",
            status: "rejected",
            comment: "",
            commentSaved: false
        },
        evaluationReport: {
            startDate: "2025-01-15",
            endDate: "2025-04-15",
            companySupervisor: "Omar Youssef"
        }
    },
    {
        id: 3,
        studentName: "Mohammed Khan",
        major: "UX Design",
        cycle: "Spring 2025",
        company: "Digital Solutions",
        internshipReport: {
            title: "UX Design Internship",
            introduction: "Intro about user experience design.",
            body: "Worked on wireframing and prototyping.",
            status: "pending",
            comment: "",
            commentSaved: false
        },
        evaluationReport: {
            startDate: "2025-03-01",
            endDate: "2025-06-01",
            companySupervisor: "Lisa Johnson"
        }
    }
];

const Modal = ({ onClose, children }) => (
    <div className="workshop-modal-backdrop">
        <div className="workshop-modal">
            <div className="modal-buttons">
                <button onClick={onClose}>Close</button>
            </div>
            {children}
        </div>
    </div>
);

const SCADReports = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [studentsData, setStudentsData] = useState(mockData);
    const [currentComment, setCurrentComment] = useState("");
    const [majorFilter, setMajorFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
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

    const openModal = (student, type) => {
        setSelectedStudent(student);
        setModalType(type);
        setCurrentComment(student.internshipReport?.comment || "");
    };

    const closeModal = () => {
        setSelectedStudent(null);
        setModalType(null);
        setCurrentComment("");
    };

    const handleCommentSubmit = () => {
        if (!selectedStudent) return;

        const updatedStudents = studentsData.map(student =>
            student.id === selectedStudent.id
                ? {
                    ...student,
                    internshipReport: {
                        ...student.internshipReport,
                        comment: currentComment,
                        commentSaved: true
                    }
                }
                : student
        );

        setStudentsData(updatedStudents);
        setSelectedStudent(prev => ({
            ...prev,
            internshipReport: {
                ...prev.internshipReport,
                comment: currentComment,
                commentSaved: true
            }
        }));
    };

    const filteredStudents = studentsData.filter(student => {
        const matchesMajor = majorFilter ? student.major === majorFilter : true;
        const matchesStatus = statusFilter ? student.internshipReport.status === statusFilter : true;
        return matchesMajor && matchesStatus;
    });

    const downloadReport = (type) => {
        if (!selectedStudent) return;

        let reportContent = "";

        if (type === "internship") {
            reportContent = `
                Internship Report:
                Title: ${selectedStudent.internshipReport.title}
                Introduction: ${selectedStudent.internshipReport.introduction}
                Body: ${selectedStudent.internshipReport.body}
                Status: ${selectedStudent.internshipReport.status}
                Comment: ${selectedStudent.internshipReport.comment || "No comment provided"}
            `;
        } else if (type === "evaluation") {
            reportContent = `
                Evaluation Report:
                Student: ${selectedStudent.studentName}
                Company: ${selectedStudent.company}
                Supervisor: ${selectedStudent.evaluationReport.companySupervisor}
                Start Date: ${selectedStudent.evaluationReport.startDate}
                End Date: ${selectedStudent.evaluationReport.endDate}
            `;
        }

        const blob = new Blob([reportContent], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${selectedStudent.studentName}_${type}_Report.txt`;
        link.click();
    };

    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                <div className="header-left">
                    <h1 className="dashboard-title">SCAD Office Dashboard</h1>
                </div>
                <div className="header-right">
                    <div className="header-icons">
                        <button onClick={goToCalls} className="notification-bell">
                            <FaPhone />
                            <span className="call-badge">{missedCalls}</span>
                        </button>

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
                        <li className="nav-item"><a href="/scadOfficeDashboard" className="nav-link">Home</a></li>
                        <li className="nav-item"><a href="/scad/companies" className="nav-link">Pending Company Applications</a></li>
                        <li className="nav-item"><a href="/scad/interns" className="nav-link">All Internships</a></li>
                        <li className="nav-item"><a href="/scad/cycle" className="nav-link">Current Cycle Information</a></li>
                        <li className="nav-item"><a href="/scad/students" className="nav-link">View Students</a></li>
                        <li className="nav-item">View Reports</li>
                        <li className="nav-item"><a href="/scad/Statistics" className="nav-link">Statistics</a></li>
                        <li className="nav-item"><a href="/scad/Appointments" className="nav-link">Appointments</a></li>
                        <li className="nav-item"><a href="/scad/calls" className="nav-link">Calls</a></li>
                        <li className="nav-item"><a href="/scad/Workshop" className="nav-link">Workshop</a></li>
                    </ul>
                </aside>

                <main className="dashboard-main">
                    <div className="browser-wrapper">
                        <header className="browser-header">
                            <h1 className="browser-title">Student Internship Reports</h1>
                        </header>

                        <main className="browser-main">
                            <section className="filter-section">
                                <h2 className="section-title">Filters</h2>
                                <div className="filter-row">
                                    <label>
                                        
                                        <select
                                            value={majorFilter}
                                            onChange={(e) => setMajorFilter(e.target.value)}
                                            className="filter-select"
                                        >
                                            <option value="">All Major</option>
                                            <option value="Computer Science">Computer Science</option>
                                            <option value="Data Science">Data Science</option>
                                            <option value="UX Design">UX Design</option>
                                        </select>
                                    </label>

                                    <label>
                                       
                                        <select
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                            className="filter-select"
                                        >
                                            <option value="">All Status</option>
                                            <option value="pending">Pending</option>
                                            <option value="approved">Approved</option>
                                            <option value="rejected">Rejected</option>
                                            <option value="flagged">Flagged</option>
                                        </select>
                                    </label>
                                </div>
                            </section>

                            <section className="list-section">
                                <div className="table-container">
                                    <table className="student-table">
                                        <thead>
                                            <tr>
                                                <th>Student Name</th>
                                                <th>Major</th>
                                                <th>Company</th>
                                                <th>Cycle</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredStudents.length > 0 ? (
                                                filteredStudents.map(student => (
                                                    <tr key={student.id}>
                                                        <td>{student.studentName}</td>
                                                        <td>{student.major}</td>
                                                        <td>{student.company}</td>
                                                        <td>{student.cycle}</td>
                                                        <td className="action-buttons">
                                                            <button
                                                                onClick={() => openModal(student, 'internship')}
                                                                className="table-button"
                                                            >
                                                                <FaFileAlt /> Internship Report
                                                            </button>
                                                            <button
                                                                onClick={() => openModal(student, 'evaluation')}
                                                                className="table-button"
                                                            >
                                                                <FaClipboardList /> Evaluation Report
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5">No students match the selected filters.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </section>
                        </main>
                    </div>
                </main>
            </div>

            {selectedStudent && modalType === 'internship' && (
                <Modal onClose={closeModal}>
                    <h2>Internship Report - {selectedStudent.studentName}</h2>
                    <div className="report-content">
                        <p><strong>Title:</strong> {selectedStudent.internshipReport.title}</p>
                        <p><strong>Introduction:</strong> {selectedStudent.internshipReport.introduction}</p>
                        <p><strong>Body:</strong> {selectedStudent.internshipReport.body}</p>
                        <p><strong>Status:</strong> {selectedStudent.internshipReport.status}</p>

                        {(selectedStudent.internshipReport.status === "flagged" ||
                            selectedStudent.internshipReport.status === "rejected") && (
                                <div className="comment-section">
                                    <strong>Comment:</strong>
                                    {selectedStudent.internshipReport.commentSaved ? (
                                        <div className="comment-display">
                                            {selectedStudent.internshipReport.comment || "No comment provided"}
                                        </div>
                                    ) : (
                                        <>
                                            <textarea
                                                value={currentComment}
                                                onChange={(e) => setCurrentComment(e.target.value)}
                                                placeholder="Enter your comments here..."
                                                className="comment-textarea"
                                            />
                                            <button
                                                className="save-comment-button"
                                                onClick={handleCommentSubmit}
                                            >
                                                Save Comment
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                    </div>
                    <button
                        className="download-button"
                        onClick={() => downloadReport('internship')}
                    >
                        Download Report
                    </button>
                </Modal>
            )}

            {selectedStudent && modalType === 'evaluation' && (
                <Modal onClose={closeModal}>
                    <h2>Evaluation Report - {selectedStudent.studentName}</h2>
                    <div className="report-content">
                        <p><strong>Student:</strong> {selectedStudent.studentName}</p>
                        <p><strong>Company:</strong> {selectedStudent.company}</p>
                        <p><strong>Supervisor:</strong> {selectedStudent.evaluationReport.companySupervisor}</p>
                        <p><strong>Start Date:</strong> {selectedStudent.evaluationReport.startDate}</p>
                        <p><strong>End Date:</strong> {selectedStudent.evaluationReport.endDate}</p>
                    </div>
                    <button
                        className="download-button"
                        onClick={() => downloadReport('evaluation')}
                    >
                        Download Report
                    </button>
                </Modal>
            )}

            <footer className="dashboard-footer">
                <p>&copy; 2025 SCAD System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default SCADReports;