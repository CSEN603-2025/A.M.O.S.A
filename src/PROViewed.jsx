import React from "react";
import { FiBriefcase } from "react-icons/fi";
import "./CSS/SCADOfficeDashboard.css";
import ProstudentLayout from "./components/ProstudentLayout";

const PROViewed = () => {
    // Sample company data with view timestamps
    const companies = [
        {
            id: 1,
            name: "Orange",
            viewedAt: new Date(Date.now() - 3600000 * 3), // 3 hours ago
        },
        {
            id: 2,
            name: "Siemens",
            viewedAt: new Date(Date.now() - 3600000 * 24), // 1 day ago
        },
        {
            id: 3,
            name: "GlobalFinance",
            viewedAt: new Date(Date.now() - 3600000 * 72), // 3 days ago
        }
    ];

    // Function to calculate time passed
    const getTimePassed = (date) => {
        const seconds = Math.floor((new Date() - date) / 1000);

        if (seconds < 60) return "Just now";
        if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
        return `${Math.floor(seconds / 86400)} days ago`;
    };

    return (
        <ProstudentLayout>
            <main className="main-content" aria-label="Main Content">
                <h1 className="main-welcome" style={{ marginTop: 0, marginBottom: 32 }}>
                    Companies That Viewed Your Profile
                </h1>

                <div className="internship-item" style={{
                    background: '#fff',
                    borderRadius: 12,
                    boxShadow: '0 2px 8px rgba(30,41,59,0.06)',
                    padding: 24,
                    border: '1px solid var(--border)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                        <FiBriefcase style={{ color: 'var(--primary)', fontSize: 22 }} />
                        <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Recent Profile Views</span>
                    </div>

                    <div style={{ display: 'grid', gap: 16 }}>
                        {companies.map((company) => (
                            <div key={company.id} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '12px 16px',
                                background: company.id % 2 === 0 ? 'rgba(0, 196, 159, 0.1)' : 'transparent',
                                borderRadius: 8
                            }}>
                                <div style={{ fontSize: 15, fontWeight: 600 }}>{company.name}</div>
                                <div style={{ fontSize: 15 }}>Viewed {getTimePassed(company.viewedAt)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </ProstudentLayout>
    );
};

export default PROViewed;