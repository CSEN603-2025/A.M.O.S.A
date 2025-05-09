import React, { useState } from "react";
import './CSS/MyApplications.css';

const MyApplications = ({ applications }) => {
    const [filter, setFilter] = useState("All");
    const [selectedApplication, setSelectedApplication] = useState(null);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const filteredApplications =
        filter === "All"
            ? applications
            : applications.filter((app) => app.status === filter);

    return (
        <div className="applications-wrapper">
            <header className="applications-header">
                <h1 className="applications-title">My Applications</h1>
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
                        {filteredApplications.map((app, index) => (
                            <li key={index} className="application-item">
                                <p><strong>Job Title:</strong> {app.jobTitle}</p>
                                <p><strong>Company:</strong> {app.companyName}</p>
                                <p><strong>Status:</strong> {app.status || "Pending"}</p>
                                <button
                                    onClick={() => setSelectedApplication(app)}
                                    className="view-button"
                                >
                                    View Details
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
            {selectedApplication && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Application Details</h2>
                        <p><strong>Job Title:</strong> {selectedApplication.jobTitle}</p>
                        <p><strong>Company:</strong> {selectedApplication.companyName}</p>
                        <p><strong>Status:</strong> {selectedApplication.status || "Pending"}</p>
                        <p><strong>Duration:</strong> {selectedApplication.duration}</p>
                        <p><strong>Paid:</strong> {selectedApplication.paid ? "Yes" : "No"}</p>
                        <p><strong>Salary:</strong> {selectedApplication.salary}</p>
                        <p><strong>Skills:</strong> {selectedApplication.skills}</p>
                        <p><strong>Description:</strong> {selectedApplication.description}</p>
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

export default MyApplications;


