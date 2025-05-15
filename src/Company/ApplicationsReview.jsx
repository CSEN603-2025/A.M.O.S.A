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
            

            {selectedApplication && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Details</h2>
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

            </CompanyLayout>
    );
};

export default ApplicationsReview;
