import React, { useState } from "react";
import './CSS/SCADOfficeDashboard.css';

const mockData = [
    {
        id: 1,
        studentName: "Ali Hassan",
        cycle: "Spring 2025",
        company: "Tech Solutions Ltd",
        internshipReport: {
            title: "Web Development Internship",
            introduction: "Intro about frontend development.",
            body: "Worked with React.",
            status: "flagged",
            comment: "Needs more technical detail.",
            commentSaved: true
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
        company: "Innovatech",
        internshipReport: {
            title: "Data Internship",
            introduction: "Intro about data analysis.",
            body: "Worked with pandas and matplotlib.",
            status: "rejected",
            comment: "",
            commentSaved: false  // This comment hasn't been saved yet
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

    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                <div className="header-left">
                    <h1 className="dashboard-title">SCAD Office Dashboard</h1>
                </div>
                <div className="header-right">
                    <a href="/" className="signout-button">Sign Out</a>
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
                    <table className="student-table">
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Company</th>
                                <th>Cycle</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentsData.map(student => (
                                <tr key={student.id}>
                                    <td>{student.studentName}</td>
                                    <td>{student.company}</td>
                                    <td>{student.cycle}</td>
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
                            <button className="download-button">Download Report</button>

                        </Modal>
                    )}

                    {selectedStudent && modalType === 'evaluation' && (
                        <Modal onClose={closeModal}>
                            <h3>Evaluation Report</h3>
                            <p><strong>Student:</strong> {selectedStudent.studentName}</p>
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

export default SCADReports;