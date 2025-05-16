import React, { useState } from "react";
import { FiBriefcase, FiCheckCircle, FiClock, FiDownload, FiEdit2, FiTrash2, FiSave, FiPlus, FiMinus } from "react-icons/fi";
import './CSS/StudentDashboard.css';
import StudentLayout from './components/StudentLayout';

const internshipsData = [
    { id: 1, company: "TechCorp", status: "Completed", duration: "Jan 2023 - Jun 2023", title: "Software Engineer Intern", current: false },
    { id: 2, company: "Marketify", status: "Completed", duration: "Jul 2023 - Dec 2023", title: "Marketing Intern", current: false },
    { id: 3, company: "DataWorks", status: "Current", duration: "Jan 2025 - Present", title: "Data Analyst Intern", current: true }
];

const courses = ["Software Engineering", "Database", "Management", "Computer System Architecture", "Operating Systems"];

const NewMyInternships = () => {
    const [selectedInternship, setSelectedInternship] = useState(null);
    const [evaluations, setEvaluations] = useState({});
    const [reports, setReports] = useState({});
    const [recommendations, setRecommendations] = useState({});
    const [submitted, setSubmitted] = useState({});
    const [editable, setEditable] = useState({});
    const [helpfulCourses, setHelpfulCourses] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [expandedSection, setExpandedSection] = useState(null);

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
            `Title:\n${report.conclusion || ""}\n\n` +
            `Introduction:\n${report.introduction || ""}\n\n` +
            `Body:\n${report.body || ""}\n\n` +
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
        const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            internship.company.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterStatus === "All" ||
            (filterStatus === "Current" && internship.current) ||
            (filterStatus === "Completed" && !internship.current);
        return matchesSearch && matchesFilter;
    });

    const getStatusIcon = (status) => {
        switch (status) {
            case "Current":
                return <FiClock style={{ color: "#FFBB28" }} />;
            case "Completed":
                return <FiCheckCircle style={{ color: "#00C49F" }} />;
            default:
                return <FiBriefcase style={{ color: "var(--primary)" }} />;
        }
    };

    const toggleSection = (section) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    return (
        <StudentLayout>
            <main className="main-content" aria-label="Main Content">
                <h1 className="main-welcome" style={{ marginTop: 0, marginBottom: 32 }}>My Internships</h1>

                <div style={{
                    display: 'flex',
                    gap: 16,
                    marginBottom: 24,
                    flexWrap: 'wrap'
                }}>
                    <input
                        type="text"
                        placeholder="Search by title or company..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        style={{
                            padding: '10px 16px',
                            borderRadius: 8,
                            border: '1px solid var(--border)',
                            flex: 1,
                            minWidth: '200px',
                            maxWidth: '400px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}
                    />
                    <select
                        onChange={e => setFilterStatus(e.target.value)}
                        value={filterStatus}
                        style={{
                            padding: '10px 16px',
                            borderRadius: 8,
                            border: '1px solid var(--border)',
                            background: 'white',
                            cursor: 'pointer',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                        }}
                    >
                        <option value="All">All Internships</option>
                        <option value="Current">Current</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: 24,
                    width: '100%'
                }}>
                    {filteredInternships.map(internship => (
                        <div
                            key={internship.id}
                            className="internship-item"
                            style={{
                                background: '#fff',
                                borderRadius: 12,
                                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                                padding: 24,
                                border: '1px solid var(--border)',
                                height: '100%',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                ':hover': {
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 6px 16px rgba(0,0,0,0.12)'
                                }
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                <FiBriefcase style={{ color: 'var(--primary)', fontSize: 22 }} />
                                <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{internship.title}</span>
                            </div>
                            <div style={{ fontSize: 14, marginBottom: 4 }}><strong>Company:</strong> {internship.company}</div>
                            <div style={{ fontSize: 14, marginBottom: 4 }}><strong>Duration:</strong> {internship.duration}</div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 6,
                                marginTop: 8,
                                fontSize: 14,
                                fontWeight: 600
                            }}>
                                {getStatusIcon(internship.status)}
                                <span>Status: {internship.status}</span>
                            </div>

                            {!internship.current && (
                                <button
                                    onClick={() => setSelectedInternship(selectedInternship === internship.id ? null : internship.id)}
                                    style={{
                                        marginTop: 16,
                                        width: '100%',
                                        padding: '8px 16px',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: 8,
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        transition: 'background 0.2s',
                                        ':hover': {
                                            background: 'var(--primary-dark)'
                                        }
                                    }}
                                >
                                    {selectedInternship === internship.id ? "Hide Details" : "View Details"}
                                </button>
                            )}

                            {selectedInternship === internship.id && !internship.current && (
                                <div style={{ marginTop: 16, borderTop: '1px solid var(--border)', paddingTop: 16 }}>
                                    <div
                                        style={{
                                            marginBottom: 24,
                                            background: '#f8f9fa',
                                            borderRadius: 8,
                                            padding: 16,
                                            border: '1px solid var(--border)'
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                                marginBottom: expandedSection === 'evaluation' ? 12 : 0
                                            }}
                                            onClick={() => toggleSection('evaluation')}
                                        >
                                            <h3 style={{ fontSize: '1rem', margin: 0 }}>Evaluation</h3>
                                            {expandedSection === 'evaluation' ? <FiMinus /> : <FiPlus />}
                                        </div>

                                        {expandedSection === 'evaluation' && (
                                            <>
                                                <textarea
                                                    placeholder="Write your evaluation of this internship..."
                                                    value={evaluations[internship.id] || ""}
                                                    onChange={e => setEvaluations({ ...evaluations, [internship.id]: e.target.value })}
                                                    readOnly={!isEvalEditable(internship.id)}
                                                    style={{
                                                        width: '100%',
                                                        padding: 12,
                                                        borderRadius: 8,
                                                        border: '1px solid var(--border)',
                                                        minHeight: '100px',
                                                        marginBottom: 12,
                                                        resize: 'vertical',
                                                        background: isEvalEditable(internship.id) ? '#fff' : '#f8f9fa'
                                                    }}
                                                />
                                                <label style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 8,
                                                    marginBottom: 16,
                                                    padding: '8px 12px',
                                                    background: '#f0f4f8',
                                                    borderRadius: 8
                                                }}>
                                                    <input
                                                        type="checkbox"
                                                        checked={recommendations[internship.id] || false}
                                                        onChange={e => setRecommendations({ ...recommendations, [internship.id]: e.target.checked })}
                                                        disabled={!isEvalEditable(internship.id)}
                                                        style={{
                                                            width: 18,
                                                            height: 18,
                                                            cursor: isEvalEditable(internship.id) ? 'pointer' : 'default'
                                                        }}
                                                    />
                                                    Would you recommend this internship to others?
                                                </label>
                                                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                                    {!submitted[internship.id]?.evaluation ? (
                                                        <button
                                                            onClick={() => handleSubmitEvaluation(internship.id)}
                                                            style={{
                                                                padding: '8px 16px',
                                                                background: '#00C49F',
                                                                color: 'white',
                                                                border: 'none',
                                                                borderRadius: 8,
                                                                cursor: 'pointer',
                                                                fontWeight: 600,
                                                                transition: 'background 0.2s',
                                                                ':hover': {
                                                                    background: '#00a386'
                                                                }
                                                            }}
                                                        >
                                                            Submit Evaluation
                                                        </button>
                                                    ) : editable[internship.id]?.evaluation ? (
                                                        <button
                                                            onClick={() => handleSaveEvaluation(internship.id)}
                                                            style={{
                                                                padding: '8px 16px',
                                                                background: '#00C49F',
                                                                color: 'white',
                                                                border: 'none',
                                                                borderRadius: 8,
                                                                cursor: 'pointer',
                                                                fontWeight: 600,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 8,
                                                                transition: 'background 0.2s',
                                                                ':hover': {
                                                                    background: '#00a386'
                                                                }
                                                            }}
                                                        >
                                                            <FiSave /> Save
                                                        </button>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => handleEditEvaluation(internship.id)}
                                                                style={{
                                                                    padding: '8px 16px',
                                                                    background: '#FFBB28',
                                                                    color: 'white',
                                                                    border: 'none',
                                                                    borderRadius: 8,
                                                                    cursor: 'pointer',
                                                                    fontWeight: 600,
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: 8,
                                                                    transition: 'background 0.2s',
                                                                    ':hover': {
                                                                        background: '#e6a824'
                                                                    }
                                                                }}
                                                            >
                                                                <FiEdit2 /> Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteEvaluation(internship.id)}
                                                                style={{
                                                                    padding: '8px 16px',
                                                                    background: '#FF6384',
                                                                    color: 'white',
                                                                    border: 'none',
                                                                    borderRadius: 8,
                                                                    cursor: 'pointer',
                                                                    fontWeight: 600,
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: 8,
                                                                    transition: 'background 0.2s',
                                                                    ':hover': {
                                                                        background: '#e64c6f'
                                                                    }
                                                                }}
                                                            >
                                                                <FiTrash2 /> Delete
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>

                                    <div style={{
                                        background: '#f8f9fa',
                                        borderRadius: 8,
                                        padding: 16,
                                        border: '1px solid var(--border)'
                                    }}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                                marginBottom: expandedSection === 'report' ? 12 : 0
                                            }}
                                            onClick={() => toggleSection('report')}
                                        >
                                            <h3 style={{ fontSize: '1rem', margin: 0 }}>Final Report</h3>
                                            {expandedSection === 'report' ? <FiMinus /> : <FiPlus />}
                                        </div>

                                        {expandedSection === 'report' && (
                                            <>
                                                <div style={{ marginBottom: 16 }}>
                                                    <label style={{
                                                        display: 'block',
                                                        marginBottom: 8,
                                                        fontWeight: 600,
                                                        color: 'var(--text-dark)'
                                                    }}>Title</label>
                                                    <textarea
                                                        placeholder="Report title..."
                                                        value={reports[internship.id]?.conclusion || ""}
                                                        onChange={e => setReports(prev => ({
                                                            ...prev,
                                                            [internship.id]: { ...prev[internship.id], conclusion: e.target.value }
                                                        }))}
                                                        readOnly={!isReportEditable(internship.id)}
                                                        style={{
                                                            width: '100%',
                                                            padding: 12,
                                                            borderRadius: 8,
                                                            border: '1px solid var(--border)',
                                                            marginBottom: 12,
                                                            resize: 'vertical',
                                                            background: isReportEditable(internship.id) ? '#fff' : '#f8f9fa'
                                                        }}
                                                    />
                                                </div>
                                                <div style={{ marginBottom: 16 }}>
                                                    <label style={{
                                                        display: 'block',
                                                        marginBottom: 8,
                                                        fontWeight: 600,
                                                        color: 'var(--text-dark)'
                                                    }}>Introduction</label>
                                                    <textarea
                                                        placeholder="Introduction to your report..."
                                                        value={reports[internship.id]?.introduction || ""}
                                                        onChange={e => setReports(prev => ({
                                                            ...prev,
                                                            [internship.id]: { ...prev[internship.id], introduction: e.target.value }
                                                        }))}
                                                        readOnly={!isReportEditable(internship.id)}
                                                        style={{
                                                            width: '100%',
                                                            padding: 12,
                                                            borderRadius: 8,
                                                            border: '1px solid var(--border)',
                                                            minHeight: '80px',
                                                            marginBottom: 12,
                                                            resize: 'vertical',
                                                            background: isReportEditable(internship.id) ? '#fff' : '#f8f9fa'
                                                        }}
                                                    />
                                                </div>
                                                <div style={{ marginBottom: 16 }}>
                                                    <label style={{
                                                        display: 'block',
                                                        marginBottom: 8,
                                                        fontWeight: 600,
                                                        color: 'var(--text-dark)'
                                                    }}>Body</label>
                                                    <textarea
                                                        placeholder="Main content of your report..."
                                                        value={reports[internship.id]?.body || ""}
                                                        onChange={e => setReports(prev => ({
                                                            ...prev,
                                                            [internship.id]: { ...prev[internship.id], body: e.target.value }
                                                        }))}
                                                        readOnly={!isReportEditable(internship.id)}
                                                        style={{
                                                            width: '100%',
                                                            padding: 12,
                                                            borderRadius: 8,
                                                            border: '1px solid var(--border)',
                                                            minHeight: '120px',
                                                            marginBottom: 12,
                                                            resize: 'vertical',
                                                            background: isReportEditable(internship.id) ? '#fff' : '#f8f9fa'
                                                        }}
                                                    />
                                                </div>

                                                <div style={{
                                                    marginBottom: 16,
                                                    background: '#f0f4f8',
                                                    borderRadius: 8,
                                                    padding: 16
                                                }}>
                                                    <h4 style={{
                                                        marginBottom: 12,
                                                        fontWeight: 600,
                                                        color: 'var(--text-dark)'
                                                    }}>Courses that helped:</h4>
                                                    <div style={{
                                                        display: 'grid',
                                                        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                                                        gap: 12
                                                    }}>
                                                        {courses.map(course => (
                                                            <label
                                                                key={course}
                                                                style={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: 8,
                                                                    cursor: isReportEditable(internship.id) ? 'pointer' : 'default',
                                                                    padding: '8px 12px',
                                                                    background: helpfulCourses[internship.id]?.includes(course) ? '#e3f2fd' : '#fff',
                                                                    borderRadius: 8,
                                                                    border: '1px solid var(--border)',
                                                                    transition: 'background 0.2s'
                                                                }}
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    checked={helpfulCourses[internship.id]?.includes(course) || false}
                                                                    onChange={() => handleCourseToggle(course, internship.id)}
                                                                    disabled={!isReportEditable(internship.id)}
                                                                    style={{
                                                                        width: 18,
                                                                        height: 18,
                                                                        cursor: isReportEditable(internship.id) ? 'pointer' : 'default'
                                                                    }}
                                                                />
                                                                {course}
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                                    {!submitted[internship.id]?.report ? (
                                                        <button
                                                            onClick={() => handleSubmitReport(internship.id)}
                                                            style={{
                                                                padding: '8px 16px',
                                                                background: '#00C49F',
                                                                color: 'white',
                                                                border: 'none',
                                                                borderRadius: 8,
                                                                cursor: 'pointer',
                                                                fontWeight: 600,
                                                                transition: 'background 0.2s',
                                                                ':hover': {
                                                                    background: '#00a386'
                                                                }
                                                            }}
                                                        >
                                                            Submit Report
                                                        </button>
                                                    ) : editable[internship.id]?.report ? (
                                                        <button
                                                            onClick={() => handleSaveReport(internship.id)}
                                                            style={{
                                                                padding: '8px 16px',
                                                                background: '#00C49F',
                                                                color: 'white',
                                                                border: 'none',
                                                                borderRadius: 8,
                                                                cursor: 'pointer',
                                                                fontWeight: 600,
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                gap: 8,
                                                                transition: 'background 0.2s',
                                                                ':hover': {
                                                                    background: '#00a386'
                                                                }
                                                            }}
                                                        >
                                                            <FiSave /> Save
                                                        </button>
                                                    ) : (
                                                        <>
                                                            <button
                                                                onClick={() => handleEditReport(internship.id)}
                                                                style={{
                                                                    padding: '8px 16px',
                                                                    background: '#FFBB28',
                                                                    color: 'white',
                                                                    border: 'none',
                                                                    borderRadius: 8,
                                                                    cursor: 'pointer',
                                                                    fontWeight: 600,
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: 8,
                                                                    transition: 'background 0.2s',
                                                                    ':hover': {
                                                                        background: '#e6a824'
                                                                    }
                                                                }}
                                                            >
                                                                <FiEdit2 /> Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteReport(internship.id)}
                                                                style={{
                                                                    padding: '8px 16px',
                                                                    background: '#FF6384',
                                                                    color: 'white',
                                                                    border: 'none',
                                                                    borderRadius: 8,
                                                                    cursor: 'pointer',
                                                                    fontWeight: 600,
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: 8,
                                                                    transition: 'background 0.2s',
                                                                    ':hover': {
                                                                        background: '#e64c6f'
                                                                    }
                                                                }}
                                                            >
                                                                <FiTrash2 /> Delete
                                                            </button>
                                                            <button
                                                                onClick={() => downloadReport(internship.id)}
                                                                style={{
                                                                    padding: '8px 16px',
                                                                    background: '#0088FE',
                                                                    color: 'white',
                                                                    border: 'none',
                                                                    borderRadius: 8,
                                                                    cursor: 'pointer',
                                                                    fontWeight: 600,
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    gap: 8,
                                                                    transition: 'background 0.2s',
                                                                    ':hover': {
                                                                        background: '#0077e6'
                                                                    }
                                                                }}
                                                            >
                                                                <FiDownload /> Download
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </StudentLayout>
    );
};

export default NewMyInternships;