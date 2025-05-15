import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaFileAlt, FaClipboardList } from "react-icons/fa";
import { FiBriefcase } from "react-icons/fi";
import './CSS/SCADOfficeDashboard.css';
import './CSS/browseInternships.css';
import DashboardLayout from './components/Layout';

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
        <div className="workshop-modal" style={{
            background: '#fff',
            borderRadius: 12,
            padding: 24,
            maxWidth: 800,
            width: '90%',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
            <div className="modal-buttons" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button
                    onClick={onClose}
                    style={{
                        background: '#FF6384',
                        color: 'white',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: 8,
                        cursor: 'pointer',
                        fontWeight: 600
                    }}
                >
                    Close
                </button>
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

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return '#FFB74D';
            case 'approved': return '#00C49F';
            case 'rejected': return '#FF6384';
            case 'flagged': return '#FFD700';
            default: return '#666';
        }
    };

    return (
        <DashboardLayout>
            <main className="main-content" aria-label="Main Content">
                <h1 className="main-welcome" style={{ marginTop: 0, marginBottom: 32 }}>Student Internship Reports</h1>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 24 }}>
                    <h2 className="section-title" style={{ margin: 0 }}>Reports Overview</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: '100%', marginBottom: 24 }}>
                    <div className="internship-item" style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(30,41,59,0.06)', padding: 24, border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                            <FiBriefcase style={{ color: 'var(--primary)', fontSize: 22 }} />
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Filters</span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                            <div style={{ display: 'grid', gap: 8 }}>
                                <label style={{ fontWeight: 600 }}>Major:</label>
                                <select
                                    value={majorFilter}
                                    onChange={(e) => setMajorFilter(e.target.value)}
                                    style={{
                                        width: '100%',
                                        height: 40,
                                        borderRadius: 8,
                                        border: '1px solid var(--border)',
                                        padding: '0 14px',
                                        fontSize: 16
                                    }}
                                >
                                    <option value="">All Majors</option>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Data Science">Data Science</option>
                                    <option value="UX Design">UX Design</option>
                                </select>
                            </div>

                            <div style={{ display: 'grid', gap: 8 }}>
                                <label style={{ fontWeight: 600 }}>Status:</label>
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    style={{
                                        width: '100%',
                                        height: 40,
                                        borderRadius: 8,
                                        border: '1px solid var(--border)',
                                        padding: '0 14px',
                                        fontSize: 16
                                    }}
                                >
                                    <option value="">All Statuses</option>
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                    <option value="flagged">Flagged</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="internship-item" style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(30,41,59,0.06)', padding: 24, border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                            <FiBriefcase style={{ color: 'var(--primary)', fontSize: 22 }} />
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Statistics</span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                            <div style={{ fontSize: 15 }}><strong>Total Reports:</strong> {studentsData.length}</div>
                            <div style={{ fontSize: 15 }}><strong>Pending:</strong> {studentsData.filter(s => s.internshipReport.status === 'pending').length}</div>
                            <div style={{ fontSize: 15 }}><strong>Approved:</strong> {studentsData.filter(s => s.internshipReport.status === 'approved').length}</div>
                            <div style={{ fontSize: 15 }}><strong>Flagged:</strong> {studentsData.filter(s => s.internshipReport.status === 'flagged').length}</div>
                        </div>
                    </div>
                </div>

                <div className="internship-item" style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(30,41,59,0.06)', padding: 24, border: '1px solid var(--border)' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Student Name</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Major</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Company</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Cycle</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Status</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600 }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.length > 0 ? (
                                    filteredStudents.map(student => (
                                        <tr key={student.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                            <td style={{ padding: '12px 16px' }}>{student.studentName}</td>
                                            <td style={{ padding: '12px 16px' }}>{student.major}</td>
                                            <td style={{ padding: '12px 16px' }}>{student.company}</td>
                                            <td style={{ padding: '12px 16px' }}>{student.cycle}</td>
                                            <td style={{ padding: '12px 16px' }}>
                                                <span style={{
                                                    background: getStatusColor(student.internshipReport.status),
                                                    color: ['flagged', 'pending'].includes(student.internshipReport.status) ? '#000' : '#fff',
                                                    padding: '4px 12px',
                                                    borderRadius: 20,
                                                    fontSize: 14,
                                                    fontWeight: 600
                                                }}>
                                                    {student.internshipReport.status.charAt(0).toUpperCase() + student.internshipReport.status.slice(1)}
                                                </span>
                                            </td>
                                            <td style={{ padding: '12px 16px', display: 'flex', gap: 8 }}>
                                                <button
                                                    onClick={() => openModal(student, 'internship')}
                                                    style={{
                                                        background: 'var(--primary)',
                                                        color: 'white',
                                                        border: 'none',
                                                        padding: '8px 12px',
                                                        borderRadius: 8,
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 8,
                                                        fontWeight: 600,
                                                        fontSize: 14
                                                    }}
                                                >
                                                    <FaFileAlt /> Report
                                                </button>
                                                <button
                                                    onClick={() => openModal(student, 'evaluation')}
                                                    style={{
                                                        background: '#00C49F',
                                                        color: 'white',
                                                        border: 'none',
                                                        padding: '8px 12px',
                                                        borderRadius: 8,
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 8,
                                                        fontWeight: 600,
                                                        fontSize: 14
                                                    }}
                                                >
                                                    <FaClipboardList /> Evaluation
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" style={{ padding: '24px 16px', textAlign: 'center' }}>
                                            No students match the selected filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {selectedStudent && modalType === 'internship' && (
                <Modal onClose={closeModal}>
                    <h2 style={{ marginBottom: 24 }}>Internship Report - {selectedStudent.studentName}</h2>
                    <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
                        <div style={{ background: '#f8f9fa', padding: 16, borderRadius: 8 }}>
                            <p style={{ margin: '8px 0' }}><strong>Title:</strong> {selectedStudent.internshipReport.title}</p>
                            <p style={{ margin: '8px 0' }}><strong>Introduction:</strong> {selectedStudent.internshipReport.introduction}</p>
                            <p style={{ margin: '8px 0' }}><strong>Body:</strong> {selectedStudent.internshipReport.body}</p>
                            <p style={{ margin: '8px 0' }}>
                                <strong>Status:</strong>
                                <span style={{
                                    background: getStatusColor(selectedStudent.internshipReport.status),
                                    color: ['flagged', 'pending'].includes(selectedStudent.internshipReport.status) ? '#000' : '#fff',
                                    padding: '4px 12px',
                                    borderRadius: 20,
                                    marginLeft: 8,
                                    fontSize: 14,
                                    fontWeight: 600,
                                    display: 'inline-block'
                                }}>
                                    {selectedStudent.internshipReport.status.charAt(0).toUpperCase() + selectedStudent.internshipReport.status.slice(1)}
                                </span>
                            </p>
                        </div>

                        {(selectedStudent.internshipReport.status === "flagged" ||
                            selectedStudent.internshipReport.status === "rejected") && (
                                <div style={{ background: '#f8f9fa', padding: 16, borderRadius: 8 }}>
                                    <strong style={{ display: 'block', marginBottom: 8 }}>Comments:</strong>
                                    {selectedStudent.internshipReport.commentSaved ? (
                                        <div style={{ padding: 12, background: '#fff', borderRadius: 8, border: '1px solid #eee' }}>
                                            {selectedStudent.internshipReport.comment || "No comment provided"}
                                        </div>
                                    ) : (
                                        <>
                                            <textarea
                                                value={currentComment}
                                                onChange={(e) => setCurrentComment(e.target.value)}
                                                placeholder="Enter your comments here..."
                                                style={{
                                                    width: '100%',
                                                    minHeight: 100,
                                                    padding: 12,
                                                    borderRadius: 8,
                                                    border: '1px solid #ddd',
                                                    marginBottom: 12
                                                }}
                                            />
                                            <button
                                                onClick={handleCommentSubmit}
                                                style={{
                                                    background: 'var(--primary)',
                                                    color: 'white',
                                                    border: 'none',
                                                    padding: '10px 24px',
                                                    borderRadius: 8,
                                                    cursor: 'pointer',
                                                    fontWeight: 600
                                                }}
                                            >
                                                Save Comment
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                        <button
                            onClick={() => downloadReport('internship')}
                            style={{
                                background: '#00C49F',
                                color: 'white',
                                border: 'none',
                                padding: '10px 24px',
                                borderRadius: 8,
                                cursor: 'pointer',
                                fontWeight: 600
                            }}
                        >
                            Download Report
                        </button>
                    </div>
                </Modal>
            )}

            {selectedStudent && modalType === 'evaluation' && (
                <Modal onClose={closeModal}>
                    <h2 style={{ marginBottom: 24 }}>Evaluation Report - {selectedStudent.studentName}</h2>
                    <div style={{ display: 'grid', gap: 16, marginBottom: 24 }}>
                        <div style={{ background: '#f8f9fa', padding: 16, borderRadius: 8 }}>
                            <p style={{ margin: '8px 0' }}><strong>Student:</strong> {selectedStudent.studentName}</p>
                            <p style={{ margin: '8px 0' }}><strong>Company:</strong> {selectedStudent.company}</p>
                            <p style={{ margin: '8px 0' }}><strong>Supervisor:</strong> {selectedStudent.evaluationReport.companySupervisor}</p>
                            <p style={{ margin: '8px 0' }}><strong>Start Date:</strong> {selectedStudent.evaluationReport.startDate}</p>
                            <p style={{ margin: '8px 0' }}><strong>End Date:</strong> {selectedStudent.evaluationReport.endDate}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                        <button
                            onClick={() => downloadReport('evaluation')}
                            style={{
                                background: '#00C49F',
                                color: 'white',
                                border: 'none',
                                padding: '10px 24px',
                                borderRadius: 8,
                                cursor: 'pointer',
                                fontWeight: 600
                            }}
                        >
                            Download Report
                        </button>
                    </div>
                </Modal>
            )}
        </DashboardLayout>
    );
};

export default SCADReports;