import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaFileAlt, FaClipboardList } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import './CSS/SCADOfficeDashboard.css';
import './CSS/browseInternships.css';

const mockData = [
    {
        id: 1,
        studentName: "Ali Hassan",
        cycle: "Spring 2025",
        major: "Computer Science",
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
        cycle: "Spring 2025",
        major: "Data Science",
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
        cycle: "Spring 2025",
        major: "Design",
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
    },
    {
        id: 4,
        studentName: "Fatima Al-Mansoori",
        cycle: "Spring 2025",
        major: "Computer Science",
        company: "AI Innovations",
        internshipReport: {
            title: "Machine Learning Internship",
            introduction: "Intro about ML models.",
            body: "Worked with TensorFlow and scikit-learn.",
            status: "approved",
            comment: "Excellent work on the project.",
            commentSaved: true
        },
        evaluationReport: {
            startDate: "2025-02-15",
            endDate: "2025-05-15",
            companySupervisor: "David Wilson"
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

const FacultyReports = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [studentsData, setStudentsData] = useState(mockData);
    const [currentComment, setCurrentComment] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [majorFilter, setMajorFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // Example numbers for notifications
    const notifications = 3;

    const goToNotifications = () => {
        navigate("/faculty/notifications", { state: { from: location.pathname } });
    };

    const openModal = (student, type) => {
        setSelectedStudent(student);
        setModalType(type);
        setCurrentComment(student.internshipReport?.comment || "");
        setSelectedStatus(student.internshipReport?.status || "");
    };

    const closeModal = () => {
        setSelectedStudent(null);
        setModalType(null);
        setCurrentComment("");
        setSelectedStatus("");
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
                        commentSaved: true,
                        status: selectedStatus
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
                commentSaved: true,
                status: selectedStatus
            }
        }));
    };

    const handleStatusChange = (e) => {
        setSelectedStatus(e.target.value);
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

    // Get unique majors for filter dropdown
    const uniqueMajors = [...new Set(mockData.map(student => student.major))];

    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                <div className="header-left">
                    <h1 className="dashboard-title">Faculty Member Dashboard</h1>
                </div>
                <div className="header-right">
                    <div className="header-icons">
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
                        <li className="nav-item"><a href="/Facultydashboard" className="nav-link">Home</a></li>
                        <li className="nav-item">Review Reports</li>
                        <li className="nav-item"><a href="/faculty/statistics" className="nav-link">Statistics</a></li>
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
                                            <option value="">All Majors</option>
                                            {uniqueMajors.map(major => (
                                                <option key={major} value={major}>{major}</option>
                                            ))}
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
                                                <th>Status</th>
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
                                                        <td>
                                                            <span className={`status-badge ${student.internshipReport.status}`}>
                                                                {student.internshipReport.status}
                                                            </span>
                                                        </td>
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
                                                    <td colSpan="6">No students match the selected filters.</td>
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

                        <div className="status-section">
                            <strong>Status:</strong>
                            <select
                                value={selectedStatus}
                                onChange={handleStatusChange}
                                className="status-select"
                            >
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="flagged">Flagged</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>

                        {(selectedStatus === "flagged" || selectedStatus === "rejected") && (
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
                    <button
                        className="save-button"
                        onClick={handleCommentSubmit}
                    >
                        Save Changes
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

export default FacultyReports;