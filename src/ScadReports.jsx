import React, { useState } from "react";
import { FaPhone, FaBell, FaFileAlt, FaClipboardList } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import './CSS/SCADOfficeDashboard.css';

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
    <div className="modal-overlay">
        <div className="modal-content">
            {children}
            <button className="close-button" onClick={onClose}>Close</button>
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

    // Function to download the internship or evaluation report as a text file
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
                        <li className="nav-item"><a href="/scadOfficeDashboard" className="nav-link">Home</a></li>
                        <li className="nav-item"><a href="/scad/companies" className="nav-link">Pending Company Applications</a></li>
                        <li className="nav-item"><a href="/scad/interns" className="nav-link">All Internships</a></li>
                        <li className="nav-item"><a href="/scad/cycle" className="nav-link">Current Cycle Information</a></li>
                        <li className="nav-item"><a href="/scad/students" className="nav-link">View Students</a></li>
                        <li className="nav-item">View Reports</li>
                        <li className="nav-item"><a href="/scad/Statistics" className="nav-link">Statistics</a></li>
                        <li className="nav-item"><a href="/scad/Appointmnets" className="nav-link">Appointments</a></li>
                        <li className="nav-item"><a href="/scad/calls" className="nav-link">Calls</a></li>
                        <li className="nav-item"><a href="/scad/Workshop" className="nav-link">Workshop</a></li>
                    </ul>
                </aside>

                <main className="dashboard-main">
                    <h2>Student Internship Reports</h2>

                    <div className="filters">
                        <label>
                            <p className="filters-title"> Filter by Major:</p>
                            <select value={majorFilter} onChange={(e) => setMajorFilter(e.target.value)}>
                                <option value="">All</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Data Science">Data Science</option>
                                <option value="UX Design">UX Design</option>
                            </select>
                        </label>

                        <label>
                            <p className="filters-title"> Filter by Status:</p>
                            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                                <option value="">All</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                                <option value="flagged">Flagged</option>
                            </select>
                        </label>
                    </div>

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
                                            <button onClick={() => openModal(student, 'internship')}>
                                                <FaFileAlt /> Internship Report
                                            </button>
                                            <button onClick={() => openModal(student, 'evaluation')}>
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

                    {selectedStudent && modalType === 'internship' && (
                        <Modal onClose={closeModal}>
                            <br />
                            <br />
                            <h3>Internship Report</h3>
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
                            <button className="download-button" onClick={() => downloadReport('internship')}>Download Report</button>
                        </Modal>
                    )}

                    {selectedStudent && modalType === 'evaluation' && (
                        <Modal onClose={closeModal}>
                            <br />
                            <br />
                            <h3>Evaluation Report</h3>
                            <p><strong>Student:</strong> {selectedStudent.studentName}</p>
                            <p><strong>Company:</strong> {selectedStudent.company}</p>
                            <p><strong>Supervisor:</strong> {selectedStudent.evaluationReport.companySupervisor}</p>
                            <p><strong>Start Date:</strong> {selectedStudent.evaluationReport.startDate}</p>
                            <p><strong>End Date:</strong> {selectedStudent.evaluationReport.endDate}</p>
                            <button className="download-button" onClick={() => downloadReport('evaluation')}>Download Report</button>
                        </Modal>
                    )}
                </main>
            </div>

            <footer className="dashboard-footer">
                <p>&copy; 2025 SCAD System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default SCADReports;