import React, { useState } from "react";
import '../CSS/ApplicationsReview.css';

const ApplicationsReview = () => {
    const [applications, setApplications] = useState([
        {
            id: 1,
            internshipId: 101,
            applicantName: "John Doe",
            status: "Pending",
            details: "John has 2 years of experience in software development.",
        },
        {
            id: 2,
            internshipId: 101,
            applicantName: "Jane Smith",
            status: "Finalized",
            details: "Jane is a recent graduate with a strong background in marketing.",
        },
        {
            id: 3,
            internshipId: 102,
            applicantName: "Alice Johnson",
            status: "Accepted",
            details: "Alice has completed multiple internships in data analysis.",
        },
    ]);
    const [filter, setFilter] = useState("All");
    const [selectedApplication, setSelectedApplication] = useState(null);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleStatusUpdate = (id, newStatus) => {
        setApplications(
            applications.map((app) =>
                app.id === id ? { ...app, status: newStatus } : app
            )
        );
    };

    const filteredApplications =
        filter === "All"
            ? applications
            : applications.filter((app) => app.status === filter);

    return (
        <div className="applications-wrapper">
            <header className="applications-header">
                <h1 className="applications-title">Applications Review</h1>
            </header>
            <main className="applications-main">
                <section className="filter-section">
                    <h2 className="section-title">Filter Applications</h2>
                    <select
                        value={filter}
                        onChange={handleFilterChange}
                        className="filter-select"
                    >
                        <option value="All">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Finalized">Finalized</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </section>
                <section className="list-section">
                    <h2 className="section-title">Applications</h2>
                    <ul className="applications-list">
                        {filteredApplications.map((app) => (
                            <li key={app.id} className="application-item">
                                <p><strong>Applicant:</strong> {app.applicantName}</p>
                                <p><strong>Status:</strong> {app.status}</p>
                                <button
                                    onClick={() => setSelectedApplication(app)}
                                    className="view-button"
                                >
                                    View Details
                                </button>
                                <div className="status-buttons">
                                    <button
                                        onClick={() => handleStatusUpdate(app.id, "Finalized")}
                                        className="status-button"
                                    >
                                        Finalize
                                    </button>
                                    <button
                                        onClick={() => handleStatusUpdate(app.id, "Accepted")}
                                        className="status-button"
                                    >
                                        Accept
                                    </button>
                                    <button
                                        onClick={() => handleStatusUpdate(app.id, "Rejected")}
                                        className="status-button"
                                    >
                                        Reject
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
            {selectedApplication && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Applicant Details</h2>
                        <p><strong>Name:</strong> {selectedApplication.applicantName}</p>
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
        </div>
    );
};

export default ApplicationsReview;

