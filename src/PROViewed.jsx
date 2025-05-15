import React from "react";
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
        if (seconds < 3600) return `${Math.floor(seconds/60)} minutes ago`;
        if (seconds < 86400) return `${Math.floor(seconds/3600)} hours ago`;
        return `${Math.floor(seconds/86400)} days ago`;
    };

    return (
       <ProstudentLayout>
                
                <main className="dashboard-main">
                    <h2>Companies That Viewed Your Profile</h2>
                    
                    <ul className="company-list">
                        {companies.map((company) => (
                            <li key={company.id} className="company-item">
                                <div className="company-info">
                                    <h3>{company.name}</h3>
                                    <p className="view-time">Viewed {getTimePassed(company.viewedAt)}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </main>
</ProstudentLayout>
            
            
    );
};

export default PROViewed;