import React from "react";
import './CSS/StudentDashboard.css';
import { FiBell } from 'react-icons/fi'; // Bell icon
import StudentLayout from './components/StudentLayout';

const StudentDashboard = () => {
    return (
       <StudentLayout>
                <main className="dashboard-main">
                    <section className="recommendations-section">
                        <h2 className="section-title">Internship Recommendations</h2>
                        <ul>
                            <li>Software Engineer Intern at TechCorp</li>
                            <li>Marketing Intern at Marketify</li>
                            <li>Data Analyst Intern at DataWorks</li>
                        </ul>
                    </section>

                    <section className="video-section">
                        <h2 className="section-title">Introduction Video</h2>
                        <div className="video-placeholder">
                            <p>Video cannot be played. No video link provided.</p>
                            <button className="play-button" disabled>Play</button>
                        </div>
                    </section>

                    <section className="status-section">
                        <h2 className="section-title">Current Internship</h2>
                        <p>Status: Active</p>
                        <p>Company: TechCorp</p>
                        <p>Role: Software Engineer Intern</p>
                    </section>

                    <section className="deadlines-section">
                        <h2 className="section-title">Upcoming Deadlines</h2>
                        <ul>
                            <li>Submit Internship Report - May 15, 2025</li>
                            <li>Apply for Summer Internships - June 1, 2025</li>
                        </ul>
                    </section>
                </main>
           </StudentLayout>
    );
};

export default StudentDashboard;
