import React from "react";
import { jsPDF } from "jspdf";
import { useNavigate } from 'react-router-dom';
import { FiBriefcase } from 'react-icons/fi';
import CompanyLayout from "./components/CompanyLayout";

const dummyDocuments = [
    {
        id: 1,
        title: "Internship Evaluation Report",
        content: "This report evaluates the performance of the intern during their tenure at the company so that scad can grade him"
    },
    {
        id: 2,
        title: "Monthly Progress Document",
        content: "This document contains the progress made on the assigned project throughout the month of April..."
    },
    {
        id: 3,
        title: "Final Submission Report",
        content: "The final submission includes the outcomes of the intern's work, achievements, and recommendations..."
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

    return (
        <CompanyLayout>
            <main className="main-content" aria-label="Main Content">
                <h1 className="main-welcome" style={{ marginTop: 0, marginBottom: 32 }}>Company Documents</h1>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 24 }}>
                    <h2 className="section-title" style={{ margin: 0 }}>Downloadable Reports</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24, width: '100%' }}>
                    {dummyDocuments.map((doc) => (
                        <div
                            key={doc.id}
                            className="internship-item"
                            style={{
                                background: '#fff',
                                borderRadius: 12,
                                boxShadow: '0 2px 8px rgba(30,41,59,0.06)',
                                padding: 24,
                                border: '1px solid var(--border)',
                                height: '100%'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                <FiBriefcase style={{ color: 'var(--primary)', fontSize: 22 }} />
                                <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{doc.title}</span>
                            </div>

                            <div style={{ display: 'grid', gap: 12 }}>
                                <div style={{ fontSize: 15 }}>{doc.content.slice(0, 100)}...</div>
                            </div>

                            <button
                                onClick={() => downloadPDF(doc.title, doc.content)}
                                style={{
                                    background: 'var(--primary)',
                                    color: 'white',
                                    border: 'none',
                                    padding: '10px 24px',
                                    borderRadius: 8,
                                    cursor: 'pointer',
                                    fontWeight: 600,
                                    marginTop: 24,
                                    width: '100%'
                                }}
                            >
                                Download PDF
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </CompanyLayout>
    );
};

export default CompanyDocs;