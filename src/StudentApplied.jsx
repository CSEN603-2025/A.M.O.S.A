import React, { useState, useEffect } from "react";
import { FiBriefcase, FiClock, FiCheckCircle, FiXCircle } from "react-icons/fi";
import './CSS/StudentDashboard.css';
import './CSS/browseInternships.css';
import StudentLayout from './components/StudentLayout';

const StudentApplied = () => {
    const [appliedIds, setAppliedIds] = useState([]);
    const [internships, setInternships] = useState([]);
    const [selectedInternship, setSelectedInternship] = useState(null);

    useEffect(() => {
        const savedIds = JSON.parse(localStorage.getItem("StudentApplied")) || [];
        const savedInternships = JSON.parse(localStorage.getItem("internships")) || [];
        setAppliedIds(savedIds);
        setInternships(savedInternships);
    }, []);

    const getStatus = (id) => {
        const statusMap = {
            1: "Pending",
            2: "Finalized",
            3: "Accepted"
        };
        return statusMap[id] || "Rejected";
    };

    const getStatusIcon = (id) => {
        const status = getStatus(id);
        switch (status) {
            case "Pending":
                return <FiClock style={{ color: "#FFBB28" }} />;
            case "Accepted":
                return <FiCheckCircle style={{ color: "#00C49F" }} />;
            case "Rejected":
                return <FiXCircle style={{ color: "#FF6384" }} />;
            case "Finalized":
                return <FiCheckCircle style={{ color: "#0088FE" }} />;
            default:
                return <FiClock style={{ color: "#FFBB28" }} />;
        }
    };

    const appliedInternships = internships.filter((internship) =>
        appliedIds.includes(internship.id)
    );

    return (
        <StudentLayout>
            <main className="main-content" aria-label="Main Content">
                <h1 className="main-welcome" style={{ marginTop: 0, marginBottom: 32 }}>My Applications</h1>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: 24,
                    width: '100%'
                }}>
                    {appliedInternships.length > 0 ? (
                        appliedInternships.map((internship) => (
                            <div
                                key={internship.id}
                                className="internship-item"
                                style={{
                                    background: '#fff',
                                    borderRadius: 12,
                                    boxShadow: '0 2px 8px rgba(30,41,59,0.06)',
                                    padding: 24,
                                    cursor: 'pointer',
                                    border: '1px solid var(--border)',
                                    height: '100%'
                                }}
                                onClick={() => setSelectedInternship(internship)}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                    <FiBriefcase style={{ color: 'var(--primary)', fontSize: 22 }} />
                                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{internship.jobTitle}</span>
                                </div>
                                <div style={{ fontSize: 14, marginBottom: 4 }}><strong>Company:</strong> {internship.companyName}</div>
                                <div style={{ fontSize: 14, marginBottom: 4 }}><strong>Duration:</strong> {internship.duration}</div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 6,
                                    marginTop: 8,
                                    fontSize: 14,
                                    fontWeight: 600
                                }}>
                                    {getStatusIcon(internship.id)}
                                    <span>Status: {getStatus(internship.id)}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div style={{
                            gridColumn: '1 / -1',
                            textAlign: 'center',
                            padding: '40px 0',
                            color: 'var(--text-light)'
                        }}>
                            <p style={{ fontSize: '1.2rem' }}>You haven't applied to any internships yet.</p>
                        </div>
                    )}
                </div>

                {selectedInternship && (
                    <div className="modal">
                        <div className="modal-content" style={{
                            maxWidth: '500px',
                            width: '90%',
                            padding: '24px'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button
                                    onClick={() => setSelectedInternship(null)}
                                    className="signout-btn"
                                    style={{
                                        background: 'var(--primary)',
                                        marginBottom: '16px'
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                            <h2 style={{ marginBottom: 16 }}>{selectedInternship.jobTitle}</h2>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '12px',
                                marginBottom: '16px'
                            }}>
                                <div style={{ fontSize: 15 }}><strong>Company:</strong> {selectedInternship.companyName}</div>
                                <div style={{ fontSize: 15 }}><strong>Duration:</strong> {selectedInternship.duration}</div>
                                <div style={{ fontSize: 15 }}><strong>Paid:</strong> {selectedInternship.paid ? "Yes" : "No"}</div>
                                <div style={{ fontSize: 15 }}><strong>Salary:</strong> {selectedInternship.salary}</div>
                                <div style={{ fontSize: 15 }}><strong>Industry:</strong> {selectedInternship.industry}</div>
                                <div style={{
                                    fontSize: 15,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 6
                                }}>
                                    <strong>Status:</strong>
                                    {getStatusIcon(selectedInternship.id)}
                                    <span>{getStatus(selectedInternship.id)}</span>
                                </div>
                            </div>
                            <div style={{ fontSize: 15, marginBottom: 8 }}>
                                <strong>Skills:</strong> {selectedInternship.skills}
                            </div>
                            <div style={{ fontSize: 15, marginBottom: 16 }}>
                                <strong>Description:</strong> {selectedInternship.description}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </StudentLayout>
    );
};

export default StudentApplied;