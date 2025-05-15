import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FiUsers, FiBriefcase } from 'react-icons/fi';
import CompanyLayout from '../components/CompanyLayout';

const ApplicationsReview = () => {
    const [applications, setApplications] = useState([
        {
            id: 1, internshipId: 101, internshipTitle: "Software Engineer Intern", applicantName: "John Doe", status: "Pending",
            details: "John has 2 years of experience in software development.",
        },
        {
            id: 2, internshipId: 101, internshipTitle: "Software Engineer Intern", applicantName: "Jane Smith", status: "Finalized",
            details: "Jane is a recent graduate with a strong background in marketing.",
        },
        {
            id: 3, internshipId: 102, internshipTitle: "Data Analyst Intern", applicantName: "Alice Johnson", status: "Accepted",
            details: "Alice has completed multiple internships in data analysis.",
        },
        {
            id: 4, internshipId: 103, internshipTitle: "Marketing Intern", applicantName: "Bob Williams", status: "Current Intern",
            details: "Bob has hands-on experience with SEO and social media.",
        },
        {
            id: 5, internshipId: 103, internshipTitle: "Marketing Intern", applicantName: "Emily Clark", status: "Internship Complete",
            details: "Emily successfully completed her marketing internship.",
        },
    ]);

    const [filterStatus, setFilterStatus] = useState("All");
    const [filterInternshipId, setFilterInternshipId] = useState("All");
    const [selectedApplication, setSelectedApplication] = useState(null);
    const navigate = useNavigate();

    const uniqueInternships = Array.from(new Set(applications.map(app => app.internshipId)))
        .map(id => {
            const internship = applications.find(app => app.internshipId === id);
            return { id, title: internship.internshipTitle };
        });

    const handleStatusUpdate = (id, newStatus) => {
        setApplications(applications.map(app =>
            app.id === id ? { ...app, status: newStatus } : app
        ));
    };

    const filteredApplications = applications.filter(app => {
        const matchesStatus = filterStatus === "All" || app.status === filterStatus;
        const matchesInternship = filterInternshipId === "All" || app.internshipId.toString() === filterInternshipId;
        return matchesStatus && matchesInternship;
    });

    const statusColors = {
        "Pending": "#FFBB28",
        "Finalized": "#00B8D9",
        "Accepted": "#00C49F",
        "Rejected": "#FF6384",
        "Current Intern": "#6554C0",
        "Internship Complete": "#00C49F"
    };

    return (
        <CompanyLayout>
            <main className="main-content" aria-label="Main Content">
                <h1 className="main-welcome" style={{ marginTop: 0, marginBottom: 32 }}>Review Applications</h1>

                <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="input"
                        style={{
                            width: 200,
                            height: 40,
                            borderRadius: 8,
                            border: '1px solid var(--border)',
                            padding: '0 14px',
                            fontSize: 16
                        }}
                    >
                        <option value="All">All Statuses</option>
                        {Object.keys(statusColors).map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>

                    <select
                        value={filterInternshipId}
                        onChange={(e) => setFilterInternshipId(e.target.value)}
                        className="input"
                        style={{
                            width: 260,
                            height: 40,
                            borderRadius: 8,
                            border: '1px solid var(--border)',
                            padding: '0 14px',
                            fontSize: 16
                        }}
                    >
                        <option value="All">All Internship Posts</option>
                        {uniqueInternships.map(internship => (
                            <option key={internship.id} value={internship.id}>
                                {internship.title} (ID: {internship.id})
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: '100%' }}>
                    {filteredApplications.map(app => (
                        <div
                            key={app.id}
                            className="internship-item"
                            style={{
                                background: '#fff',
                                borderRadius: 12,
                                boxShadow: '0 2px 8px rgba(30,41,59,0.06)',
                                padding: 24,
                                border: '1px solid var(--border)'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                <FiUsers style={{ color: 'var(--primary)', fontSize: 22 }} />
                                <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{app.applicantName}</span>
                            </div>

                            <div style={{ display: 'grid', gap: 12 }}>
                                <div style={{ fontSize: 15 }}><strong>Internship:</strong> {app.internshipTitle}</div>
                                <div style={{ fontSize: 15 }}>
                                    <strong>Status:</strong>{' '}
                                    <span style={{ color: statusColors[app.status], fontWeight: 600 }}>{app.status}</span>
                                </div>
                                <div style={{ fontSize: 15 }}><strong>Details:</strong> {app.details.substring(0, 60)}...</div>
                            </div>

                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 8,
                                marginTop: 24,
                                justifyContent: 'center'
                            }}>
                                <button
                                    onClick={() => setSelectedApplication(app)}
                                    style={{
                                        background: 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        padding: '8px 16px',
                                        borderRadius: 8,
                                        cursor: 'pointer',
                                        fontWeight: 600
                                    }}
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate(app.id, "Finalized")}
                                    style={{
                                        background: '#00B8D9',
                                        color: 'white',
                                        border: 'none',
                                        padding: '8px 16px',
                                        borderRadius: 8,
                                        cursor: 'pointer',
                                        fontWeight: 600
                                    }}
                                >
                                    Finalize
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate(app.id, "Accepted")}
                                    style={{
                                        background: '#00C49F',
                                        color: 'white',
                                        border: 'none',
                                        padding: '8px 16px',
                                        borderRadius: 8,
                                        cursor: 'pointer',
                                        fontWeight: 600
                                    }}
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate(app.id, "Rejected")}
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
                                    Reject
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate(app.id, "Current Intern")}
                                    style={{
                                        background: '#6554C0',
                                        color: 'white',
                                        border: 'none',
                                        padding: '8px 16px',
                                        borderRadius: 8,
                                        cursor: 'pointer',
                                        fontWeight: 600
                                    }}
                                >
                                    Start
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate(app.id, "Internship Complete")}
                                    style={{
                                        background: '#00C49F',
                                        color: 'white',
                                        border: 'none',
                                        padding: '8px 16px',
                                        borderRadius: 8,
                                        cursor: 'pointer',
                                        fontWeight: 600
                                    }}
                                >
                                    Complete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {selectedApplication && (
                    <div className="workshop-modal-backdrop">
                        <div className="workshop-modal" style={{ maxWidth: '500px', width: '90%', padding: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button
                                    onClick={() => setSelectedApplication(null)}
                                    style={{
                                        background: 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        padding: '8px 16px',
                                        borderRadius: 8,
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        marginBottom: '16px'
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                            <h2 style={{ marginBottom: 16 }}>{selectedApplication.applicantName}</h2>
                            <div style={{ fontSize: 15, marginBottom: 12 }}>
                                <strong>Internship:</strong> {selectedApplication.internshipTitle}
                            </div>
                            <div style={{ fontSize: 15, marginBottom: 12 }}>
                                <strong>Status:</strong>{' '}
                                <span style={{ color: statusColors[selectedApplication.status], fontWeight: 600 }}>
                                    {selectedApplication.status}
                                </span>
                            </div>
                            <div style={{ fontSize: 15, marginBottom: 12 }}>
                                <strong>Details:</strong> {selectedApplication.details}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </CompanyLayout>
    );
};

export default ApplicationsReview;