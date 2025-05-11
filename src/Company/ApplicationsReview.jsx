import React, { useState } from "react";
import '../CSS/ApplicationsReview.css';

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

    const filteredApplications = applications.filter(app => {
        const matchesStatus = filterStatus === "All" || app.status === filterStatus;
        const matchesInternship = filterInternshipId === "All" || app.internshipId.toString() === filterInternshipId;
        return matchesStatus && matchesInternship;
    });

    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                <h1 className="dashboard-title">Applications Review</h1>
            </header>

            <div className="dashboard-content">
                <aside className="dashboard-sidebar">
                    <h3 className="sidebar-title">Navigation</h3>
                    <ul className="nav-list">
                        <li className="nav-item"><a href="/CompanyDashboard" className="nav-link">Home</a></li>
                        <li className="nav-item"><a href="/CompanyInternships" className="nav-link">My Internship Posts</a></li>
                        <li className="nav-item">Applications</li>
                        <li className="nav-item"><a href="/CompanyCurrentInterns" className="nav-link">Current Interns</a></li>
                        <li className="nav-item"><a href="/CompanyAll" className="nav-link">All Internships</a></li>
                        <li className="nav-item"><a href="/CompanyDocs" className="nav-link">Reports and Documents</a></li>
                    </ul>
                </aside>

                <main className="dashboard-main">
                    <section className="filter-section">
                        <h2 className="section-title">Filter Applications</h2>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="filter-select"
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
                            className="filter-select"
                        >
                            <option value="All">All Internship Posts</option>
                            {uniqueInternships.map((internship) => (
                                <option key={internship.id} value={internship.id}>
                                    {internship.title} (ID: {internship.id})
                                </option>
                            ))}
                        </select>
                    </section>

                    <section className="list-section">
                        <h2 className="section-title">Applications</h2>
                        <ul className="applications-list">
                            {filteredApplications.map((app) => (
                                <li key={app.id} className="application-item">
                                    <p><strong>Applicant:</strong> {app.applicantName}</p>
                                    <p><strong>Internship:</strong> {app.internshipTitle}</p>
                                    <p><strong>Status:</strong> {app.status}</p>
                                    <button
                                        onClick={() => setSelectedApplication(app)}
                                        className="view-button"
                                    >
                                        View Details
                                    </button>
                                    <div className="status-buttons">
                                        <button onClick={() => handleStatusUpdate(app.id, "Finalized")} className="status-button">Finalize</button>
                                        <button onClick={() => handleStatusUpdate(app.id, "Accepted")} className="status-button">Accept</button>
                                        <button onClick={() => handleStatusUpdate(app.id, "Rejected")} className="status-button">Reject</button>
                                        <button onClick={() => handleStatusUpdate(app.id, "Current Intern")} className="status-button">Start Internship</button>
                                        <button onClick={() => handleStatusUpdate(app.id, "Internship Complete")} className="status-button">Complete Internship</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                </main>
            </div>

            {selectedApplication && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Applicant Details</h2>
                        <p><strong>Name:</strong> {selectedApplication.applicantName}</p>
                        <p><strong>Internship:</strong> {selectedApplication.internshipTitle}</p>
                        <p><strong>Status:</strong> {selectedApplication.status}</p>
                        <p><strong>Details:</strong> {selectedApplication.details}</p>
                        <button
                            onClick={() => setSelectedApplication(null)}
                            className="close-button"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            <footer className="dashboard-footer">
                &copy; 2025 Internship Management System
            </footer>
        </div>
    );
};

export default ApplicationsReview;
