import React from "react";
import { jsPDF } from "jspdf";
import './CSS/CompanyDashboard.css';
import { useNavigate } from 'react-router-dom';
import { FiBell } from 'react-icons/fi';
import CompanyLayout from ".//components/CompanyLayout";

const dummyDocuments = [
    {
        id: 1,
        title: "Internship Evaluation Report",
        content: "This report evaluates the performance of the intern during their tenure at the company..."
    },
    {
        id: 2,
        title: "Monthly Progress Document",
        content: "This document contains the progress made on the assigned project throughout the month of April..."
    },
    {
        id: 3,
        title: "Final Submission Report",
        content: "The final submission includes the outcomes of the intern’s work, achievements, and recommendations..."
    }
];

const downloadPDF = (title, content) => {
    const doc = new jsPDF();
    doc.setFont("courier", "normal");
    doc.setFontSize(14);
    doc.text(title, 10, 10);
    doc.setFontSize(12);
    doc.text(content, 10, 20);
    doc.save(`${title.replace(/\s+/g, "_")}.pdf`);
};

const CompanyDocs = () => {
    const navigate = useNavigate();

    const handleBellClick = () => {
        navigate('/CompanyNotifications');
    };

    const handleLogout = () => {
        navigate('/');
    };

    return (
       <CompanyLayout>
                <main className="dashboard-main">
                    <section className="stats-section">
                        <h2 className="section-title">Downloadable Reports</h2>
                        <ul className="posts-list">
                            {dummyDocuments.map((doc) => (
                                <li key={doc.id} className="internship-post">
                                    <h3>{doc.title}</h3>
                                    <p>{doc.content.slice(0, 100)}...</p>
                                    <button
                                        className="action-button"
                                        onClick={() => downloadPDF(doc.title, doc.content)}
                                    >
                                        Download PDF
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </section>
                </main>
        </CompanyLayout>
    );
};

export default CompanyDocs;
