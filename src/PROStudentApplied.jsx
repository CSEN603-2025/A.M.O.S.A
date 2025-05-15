import React, { useState, useEffect } from "react";
import './CSS/StudentDashboard.css';
import './CSS/browseInternships.css';
import ProstudentLayout from "./components/prostudentLayout";

const PROStudentApplied = () => {
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

    const appliedInternships = internships.filter((internship) => appliedIds.includes(internship.id));

    return (
       <ProstudentLayout>
                <main className="dashboard-main">
                    <div className="browser-wrapper">
                        <header className="browser-header">
                            <h1 className="browser-title">My Applications</h1>
                        </header>
                        <main className="browser-main">
                            <section className="list-section">
                                <h2 className="section-title">Applied Internships</h2>
                                <ul className="internship-list">
                                    {appliedInternships.map((internship) => (
                                        <li
                                            key={internship.id}
                                            className="internship-item"
                                            onClick={() => setSelectedInternship(internship)}
                                        >
                                            <p><strong>{internship.jobTitle}</strong> at {internship.companyName}</p>
                                            <p><strong>Status:</strong> {getStatus(internship.id)}</p>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </main>

                        {selectedInternship && (
                            <div className="modal">
                                <div className="modal-content">
                                    <h2>{selectedInternship.jobTitle}</h2>
                                    <p><strong>Company:</strong> {selectedInternship.companyName}</p>
                                    <p><strong>Duration:</strong> {selectedInternship.duration}</p>
                                    <p><strong>Paid:</strong> {selectedInternship.paid ? "Yes" : "No"}</p>
                                    <p><strong>Salary:</strong> {selectedInternship.salary}</p>
                                    <p><strong>Industry:</strong> {selectedInternship.industry}</p>
                                    <p><strong>Skills:</strong> {selectedInternship.skills}</p>
                                    <p><strong>Description:</strong> {selectedInternship.description}</p>
                                    <p><strong>Status:</strong> {getStatus(selectedInternship.id)}</p>

                                    <button
                                        onClick={() => setSelectedInternship(null)}
                                        className="close-button"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
        </ProstudentLayout>
    );
};

export default PROStudentApplied;
