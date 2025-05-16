import React from "react";
import './CSS/CompanyDashboard.css';
import { useNavigate } from 'react-router-dom';
import { FiBell, FiBriefcase } from 'react-icons/fi';
import CompanyLayout from "./components/CompanyLayout";

const CompanyDashboard = () => {
    const navigate = useNavigate();

    const handleBellClick = () => {
        navigate('/CompanyNotifications');
    };

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <CompanyLayout>
            <main className="main-content" aria-label="Main Content">
                <h1 className="main-welcome" style={{ marginTop: 0, marginBottom: 32 }}>Company Dashboard</h1>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: '100%' }}>
                    {/* Quick Stats Section */}
                    <div className="internship-item" style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(30,41,59,0.06)', padding: 24, border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                            <FiBriefcase style={{ color: 'var(--primary)', fontSize: 22 }} />
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Quick Stats</span>
                        </div>
                        <div style={{ display: 'grid', gap: 12 }}>
                            <div style={{
                                padding: '12px 16px',
                                background: 'rgba(0, 196, 159, 0.1)',
                                borderRadius: 8,
                                fontSize: 15
                            }}>
                                <strong>Active Posts:</strong> 5
                            </div>
                            <div style={{
                                padding: '12px 16px',
                                background: 'transparent',
                                borderRadius: 8,
                                fontSize: 15
                            }}>
                                <strong>New Applications:</strong> 12
                            </div>
                            <div style={{
                                padding: '12px 16px',
                                background: 'rgba(0, 196, 159, 0.1)',
                                borderRadius: 8,
                                fontSize: 15
                            }}>
                                <strong>Current Interns:</strong> 8
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity Section */}
                    <div className="internship-item" style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(30,41,59,0.06)', padding: 24, border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                            <FiBriefcase style={{ color: 'var(--primary)', fontSize: 22 }} />
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Recent Activity</span>
                        </div>
                        <div style={{ display: 'grid', gap: 12 }}>
                            <div style={{
                                padding: '12px 16px',
                                background: 'rgba(0, 196, 159, 0.1)',
                                borderRadius: 8,
                                fontSize: 15
                            }}>
                                New application for "Software Engineer Intern"
                            </div>
                            <div style={{
                                padding: '12px 16px',
                                background: 'transparent',
                                borderRadius: 8,
                                fontSize: 15
                            }}>
                                Post "Marketing Intern" updated
                            </div>
                            <div style={{
                                padding: '12px 16px',
                                background: 'rgba(0, 196, 159, 0.1)',
                                borderRadius: 8,
                                fontSize: 15
                            }}>
                                Application for "Data Analyst Intern" reviewed
                            </div>
                        </div>
                    </div>

                    {/* Open Positions Section */}
                    <div className="internship-item" style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(30,41,59,0.06)', padding: 24, border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                            <FiBriefcase style={{ color: 'var(--primary)', fontSize: 22 }} />
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Open Positions</span>
                        </div>
                        <div style={{ display: 'grid', gap: 12 }}>
                            <div style={{ fontSize: 15 }}><strong>Software Engineer Intern:</strong> <span style={{ color: '#00C49F', fontWeight: 600 }}>3 openings</span></div>
                            <div style={{ fontSize: 15 }}><strong>Marketing Intern:</strong> <span style={{ color: '#00C49F', fontWeight: 600 }}>2 openings</span></div>
                            <div style={{ fontSize: 15 }}><strong>Data Analyst Intern:</strong> <span style={{ color: '#00C49F', fontWeight: 600 }}>1 opening</span></div>
                        </div>
                    </div>

                    {/* Application Status Section */}
                    <div className="internship-item" style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(30,41,59,0.06)', padding: 24, border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                            <FiBriefcase style={{ color: 'var(--primary)', fontSize: 22 }} />
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Application Status</span>
                        </div>
                        <div style={{ display: 'grid', gap: 16 }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '12px 16px',
                                background: 'rgba(0, 196, 159, 0.1)',
                                borderRadius: 8
                            }}>
                                <div style={{ fontSize: 15 }}>Pending Reviews</div>
                                <div style={{ fontSize: 15, fontWeight: 600 }}>8 applications</div>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '12px 16px',
                                background: 'transparent',
                                borderRadius: 8
                            }}>
                                <div style={{ fontSize: 15 }}>Interview Scheduled</div>
                                <div style={{ fontSize: 15, fontWeight: 600 }}>4 candidates</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </CompanyLayout>
    );
};

export default CompanyDashboard;
