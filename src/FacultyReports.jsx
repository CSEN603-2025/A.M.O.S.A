import React, { useState } from "react";
import './CSS/SCADOfficeDashboard.css';

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
    <div className="modal-overlay">
        <div className="modal-content">
            {children}
            <button className="close-button" onClick={onClose}>Close</button>
        </div>
    </div>
);

const FacultyReports = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [modalType, setModalType] = useState(null);
    const [studentsData, setStudentsData] = useState(mockData);
    const [currentComment, setCurrentComment] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [filters, setFilters] = useState({
        status: "",
        major: ""
    });

    // Get unique majors for filter dropdown
    const uniqueMajors = [...new Set(mockData.map(student => student.major))];

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

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetFilters = () => {
        setFilters({
            status: "",
            major: ""
        });
    };

    // Filter students based on selected filters
    const filteredStudents = studentsData.filter(student => {
        const statusMatch = filters.status === "" || student.internshipReport.status === filters.status;
        const majorMatch = filters.major === "" || student.major === filters.major;
        return statusMatch && majorMatch;
    });

    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">

                <div className="header-left">
                    <h1 className="dashboard-title">Faculty Member Dashboard</h1>
                </div>
                <div className="header-right">
                    <a href="/" className="signout-button">Sign Out</a>
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
                    <div className="filters-container">
                        <h2>Student Internship Reports</h2>
                        <div className="filter-controls">
                            <div className="filter-group">
                                <label htmlFor="status-filter">Filter by Status:</label>
                                <select
                                    id="status-filter"
                                    name="status"
                                    value={filters.status}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">All Statuses</option>
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="flagged">Flagged</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>
                            <div className="filter-group">
                                <label htmlFor="major-filter">Filter by Major:</label>
                                <select
                                    id="major-filter"
                                    name="major"
                                    value={filters.major}
                                    onChange={handleFilterChange}
                                >
                                    <option value="">All Majors</option>
                                    {uniqueMajors.map(major => (
                                        <option key={major} value={major}>{major}</option>
                                    ))}
                                </select>
                            </div>
                            <button className="reset-filters" onClick={resetFilters}>Reset Filters</button>
                        </div>
                    </div>

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
                            {filteredStudents.map(student => (
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
                                    <td>
                                        <button onClick={() => openModal(student, 'internship')}>Internship Report</button>
                                        <button onClick={() => openModal(student, 'evaluation')}>Evaluation Report</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {selectedStudent && modalType === 'internship' && (
                        <Modal onClose={closeModal}>
                            <br />
                        <br/>
                            <h3>Internship Report</h3>
                            <p><strong>Student:</strong> {selectedStudent.studentName}</p>
                            <p><strong>Major:</strong> {selectedStudent.major}</p>
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

                            <div className="action-buttons">
                                <button className="download-button">Download Report</button>
                                <button
                                    className="save-button"
                                    onClick={handleCommentSubmit}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </Modal>
                    )}

                    {selectedStudent && modalType === 'evaluation' && (
                        <Modal onClose={closeModal}>
                            <br />
                        <br/>
                            <h3>Evaluation Report</h3>
                            <p><strong>Student:</strong> {selectedStudent.studentName}</p>
                            <p><strong>Major:</strong> {selectedStudent.major}</p>
                            <p><strong>Company:</strong> {selectedStudent.company}</p>
                            <p><strong>Supervisor:</strong> {selectedStudent.evaluationReport.companySupervisor}</p>
                            <p><strong>Start Date:</strong> {selectedStudent.evaluationReport.startDate}</p>
                            <p><strong>End Date:</strong> {selectedStudent.evaluationReport.endDate}</p>
                            <button className="download-button">Download Report</button>
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

export default FacultyReports;