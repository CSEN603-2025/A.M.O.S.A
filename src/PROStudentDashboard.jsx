import React from "react";
import './CSS/StudentDashboard.css';
import { FiBell, FiBriefcase } from 'react-icons/fi'; // Bell icon
import ProstudentLayout from "./components/prostudentLayout";

const PROStudentDashboard = () => {
    return (
        <ProstudentLayout>
            <main className="main-content" aria-label="Main Content">
                <h1 className="main-welcome" style={{ marginTop: 0, marginBottom: 32 }}>Student Dashboard</h1>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: '100%' }}>
                    {/* Recommendations Section */}
                    <div className="internship-item" style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(30,41,59,0.06)', padding: 24, border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                            <FiBriefcase style={{ color: 'var(--primary)', fontSize: 22 }} />
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Internship Recommendations</span>
                        </div>
                        <div style={{ display: 'grid', gap: 12 }}>
                            <div style={{
                                padding: '12px 16px',
                                background: 'rgba(0, 196, 159, 0.1)',
                                borderRadius: 8,
                                fontSize: 15
                            }}>
                                Software Engineer Intern at TechCorp
                            </div>
                            <div style={{
                                padding: '12px 16px',
                                background: 'transparent',
                                borderRadius: 8,
                                fontSize: 15
                            }}>
                                Marketing Intern at Marketify
                            </div>
                            <div style={{
                                padding: '12px 16px',
                                background: 'rgba(0, 196, 159, 0.1)',
                                borderRadius: 8,
                                fontSize: 15
                            }}>
                                Data Analyst Intern at DataWorks
                            </div>
                        </div>
                    </div>

                    {/* Video Section */}
                    <div className="internship-item" style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(30,41,59,0.06)', padding: 24, border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                            <FiBriefcase style={{ color: 'var(--primary)', fontSize: 22 }} />
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Introduction Video</span>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '200px',
                            background: 'rgba(0, 196, 159, 0.1)',
                            borderRadius: 8,
                            padding: 16
                        }}>
                            <iframe
                                width="100%"
                                height="200"
                                src="https://www.youtube.com/embed/01r-_IondVY?autoplay=1"
                                title="Introduction Video"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ borderRadius: 8, background: '#222', marginTop: 8 }}
                            />
                        </div>
                    </div>

                    {/* Current Internship Section */}
                    <div className="internship-item" style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(30,41,59,0.06)', padding: 24, border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                            <FiBriefcase style={{ color: 'var(--primary)', fontSize: 22 }} />
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Current Internship</span>
                        </div>
                        <div style={{ display: 'grid', gap: 12 }}>
                            <div style={{ fontSize: 15 }}><strong>Status:</strong> <span style={{ color: '#00C49F', fontWeight: 600 }}>Active</span></div>
                            <div style={{ fontSize: 15 }}><strong>Company:</strong> TechCorp</div>
                            <div style={{ fontSize: 15 }}><strong>Role:</strong> Software Engineer Intern</div>
                        </div>
                    </div>

                    {/* Deadlines Section */}
                    <div className="internship-item" style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(30,41,59,0.06)', padding: 24, border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                            <FiBriefcase style={{ color: 'var(--primary)', fontSize: 22 }} />
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Upcoming Deadlines</span>
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
                                <div style={{ fontSize: 15 }}>Submit Internship Report</div>
                                <div style={{ fontSize: 15, fontWeight: 600 }}>May 15, 2025</div>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: '12px 16px',
                                background: 'transparent',
                                borderRadius: 8
                            }}>
                                <div style={{ fontSize: 15 }}>Apply for Summer Internships</div>
                                <div style={{ fontSize: 15, fontWeight: 600 }}>June 1, 2025</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </ProstudentLayout>
    );
};

export default PROStudentDashboard;