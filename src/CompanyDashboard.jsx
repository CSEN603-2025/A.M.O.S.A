import React from "react";
import './CSS/CompanyDashboard.css';
import { useNavigate } from 'react-router-dom';
import { FiBell } from 'react-icons/fi';
import CompanyLayout from "./components/CompanyLayout";

const CompanyDashboard = () => {
    const navigate = useNavigate();

    const handleBellClick = () => {
        navigate('/CompanyNotifications');
    };

    const handleLogout = () => {
        // Add logout logic here if needed
        navigate('/');
    };

    return (
        <CompanyLayout>
                <main className="dashboard-main">
                    <section className="stats-section">
                        <h2 className="section-title">Quick Stats</h2>
                        <p>Active Posts: 5</p>
                        <p>New Applications: 12</p>
                        <p>Current Interns: 8</p>
                    </section>
                    <section className="activity-section">
                        <h2 className="section-title">Recent Activity</h2>
                        <ul>
                            <li>New application for "Software Engineer Intern"</li>
                            <li>Post "Marketing Intern" updated</li>
                            <li>Application for "Data Analyst Intern" reviewed</li>
                        </ul>
                    </section>
                </main> 
        </CompanyLayout>
    );
};

export default CompanyDashboard;
