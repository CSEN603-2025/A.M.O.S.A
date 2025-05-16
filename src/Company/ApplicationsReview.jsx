import React, { useState } from "react";
import '../CSS/ApplicationsReview.css';
import { useNavigate } from 'react-router-dom';
import { FiBell } from 'react-icons/fi';
import CompanyLayout from '../components/CompanyLayout';

const ApplicationsReview = () => {
    const [applications, setApplications] = useState([
          {
            id: 1,
            internshipId: 101,
            internshipTitle: "Software Engineer Intern",
            applicantName: "John Doe",
            status: "Pending",
            details: "John has 2 years of experience in software development.",
        },
        {
            id: 2,
            internshipId: 101,
            internshipTitle: "Software Engineer Intern",
            applicantName: "Jane Smith",
            status: "Finalized",
            details: "Jane is a recent graduate with a strong background in marketing.",
        },
        {
            id: 3,
            internshipId: 102,
            internshipTitle: "Data Analyst Intern",
            applicantName: "Alice Johnson",
            status: "Accepted",
            details: "Alice has completed multiple internships in data analysis.",
        },
        {
            id: 4,
            internshipId: 103,
            internshipTitle: "Marketing Intern",
            applicantName: "Bob Williams",
            status: "Current Intern",
            details: "Bob has hands-on experience with SEO and social media.",
        },
        {
            id: 5,
            internshipId: 103,
            internshipTitle: "Marketing Intern",
            applicantName: "Emily Clark",
            status: "Internship Complete",
            details: "Emily successfully completed her marketing internship.",
        }, 
    ]);

    const [filterStatus, setFilterStatus] = useState("All");
    const [filterInternshipId, setFilterInternshipId] = useState("All");
    const [selectedApplication, setSelectedApplication] = useState(null);

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

    const navigate = useNavigate();

    const handleBellClick = () => {
        navigate('/CompanyNotifications');
    };

    const handleLogout = () => {
        navigate('/');
    };


    const filteredApplications = applications.filter(app => {
        const matchesStatus = filterStatus === "All" || app.status === filterStatus;
        const matchesInternship = filterInternshipId === "All" || app.internshipId.toString() === filterInternshipId;
        return matchesStatus && matchesInternship;
    });

    return (
        <CompanyLayout>
            <main className="dashboard-main" style={{ padding: 32, fontFamily: "Inter, sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh" }}>
                {/* Filter Section */}
                <section className="filter-section" style={{ marginBottom: 32 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Filter Applications</h2>
                    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            style={{
                                padding: "8px 12px",
                                border: "1px solid #d1d5db",
                                borderRadius: 6,
                                backgroundColor: "#fff",
                                fontSize: 14
                            }}
                        >
                            <option value="All">All Statuses</option>
                            <option value="Pending">Pending</option>
                            <option value="Finalized">Finalized</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                            <option value="Current Intern">Current Intern</option>
                            <option value="Internship Complete">Internship Complete</option>
                        </select>

                        <select
                            value={filterInternshipId}
                            onChange={(e) => setFilterInternshipId(e.target.value)}
                            style={{
                                padding: "8px 12px",
                                border: "1px solid #d1d5db",
                                borderRadius: 6,
                                backgroundColor: "#fff",
                                fontSize: 14
                            }}
                        >
                            <option value="All">All Internship Posts</option>
                            {uniqueInternships.map((internship) => (
                                <option key={internship.id} value={internship.id}>
                                    {internship.title} (ID: {internship.id})
                                </option>
                            ))}
                        </select>
                    </div>
                </section>

                {/* Applications List */}
                <section className="list-section">
                    <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>Applications</h2>
                    <ul style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                        gap: 20
                    }}>
                        {filteredApplications.map((app) => (
                            <li key={app.id} style={{
                                backgroundColor: "#fff",
                                border: "1px solid #e5e7eb",
                                borderRadius: 8,
                                padding: 20,
                                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                                display: "flex",
                                flexDirection: "column",
                                gap: 8
                            }}>
                                <p><strong>Applicant:</strong> {app.applicantName}</p>
                                <p><strong>Internship:</strong> {app.internshipTitle}</p>
                                <p><strong>Status:</strong> {app.status}</p>

                                <button
                                    onClick={() => setSelectedApplication(app)}
                                    style={{
                                        marginTop: 8,
                                        backgroundColor: "#2563eb",
                                        color: "#fff",
                                        border: "none",
                                        padding: "6px 12px",
                                        fontSize: 14,
                                        fontWeight: 500,
                                        borderRadius: 6,
                                        cursor: "pointer"
                                    }}
                                >
                                    View Details
                                </button>

                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
                                    {["Finalized", "Accepted", "Rejected", "Current Intern", "Internship Complete"].map(status => (
                                        <button
                                            key={status}
                                            onClick={() => handleStatusUpdate(app.id, status)}
                                            style={{
                                                backgroundColor: "#f3f4f6",
                                                color: "#374151",
                                                padding: "6px 10px",
                                                border: "1px solid #d1d5db",
                                                borderRadius: 6,
                                                fontSize: 13,
                                                fontWeight: 500
                                            }}
                                        >
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Modal */}
                {selectedApplication && (
                    <div className="modal" style={{
                        position: "fixed",
                        top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 50
                    }}>
                        <div className="modal-content" style={{
                            backgroundColor: "#fff",
                            borderRadius: 10,
                            padding: 24,
                            width: "90%",
                            maxWidth: 480,
                            boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
                        }}>
                            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 16 }}>Application Details</h2>
                            <p><strong>Name:</strong> {selectedApplication.applicantName}</p>
                            <p><strong>Internship:</strong> {selectedApplication.internshipTitle}</p>
                            <p><strong>Status:</strong> {selectedApplication.status}</p>
                            <p><strong>Details:</strong> {selectedApplication.details}</p>
                            <div style={{ textAlign: "right", marginTop: 20 }}>
                                <button
                                    onClick={() => setSelectedApplication(null)}
                                    style={{
                                        backgroundColor: "#ef4444",
                                        color: "#fff",
                                        border: "none",
                                        padding: "8px 16px",
                                        fontSize: 14,
                                        fontWeight: 500,
                                        borderRadius: 6,
                                        cursor: "pointer"
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            </CompanyLayout>
    );
};

export default ApplicationsReview;
