import React, { useState } from "react";
import './CSS/SCADOfficeDashboard.css';

const SCADPendingCompany = () => {
    // Dummy data for companies with types and details
    const dummyCompanies = [
        { name: "TechNova Solutions", type: "Technology", description: "A leading tech company specializing in AI solutions." },
        { name: "GreenFuture Inc.", type: "Environmental", description: "Promotes sustainable solutions for energy." },
        { name: "Skyline Technologies", type: "Technology", description: "Develops cutting-edge cloud infrastructure." },
        { name: "BrightMind Software", type: "Software", description: "Focuses on educational software for students." },
        { name: "FutureWave Systems", type: "Technology", description: "Innovative mobile technologies company." },
        { name: "EcoBuild Corp", type: "Construction", description: "Eco-friendly construction company." },
        { name: "Visionary Labs", type: "Research", description: "Research and development in biotechnology." },
        { name: "NextGen Innovations", type: "Technology", description: "Start-up specializing in robotics." },
        { name: "Apex Technologies", type: "Technology", description: "Enterprise IT services provider." },
        { name: "QuantumSoft Ltd.", type: "Software", description: "Software company specializing in finance applications." }
    ];

    const [companies, setCompanies] = useState(dummyCompanies);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("All");
    const [selectedCompany, setSelectedCompany] = useState(null);

    const handleAccept = () => {
        setCompanies(prev => prev.filter(company => company.name !== selectedCompany.name));
        setSelectedCompany(null);
    };

    const handleReject = () => {
        setCompanies(prev => prev.filter(company => company.name !== selectedCompany.name));
        setSelectedCompany(null);
    };

    const filteredCompanies = companies.filter(company =>
        (selectedType === "All" || company.type === selectedType) &&
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const companyTypes = ["All", ...new Set(dummyCompanies.map(company => company.type))];

    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                <div className="header-left">
                    <h1 className="dashboard-title">SCAD Office Dashboard</h1>
                </div>
                <div className="header-right">
                    <a href="/" className="signout-button">Sign Out</a>
                </div>
            </header>
            <div className="dashboard-content">
                <aside className="dashboard-sidebar">
                    <h2 className="sidebar-title">Navigation</h2>
                    <ul className="nav-list">
                        <li className="nav-item"><a href="/SCADOfficedashboard" className="nav-link">Home</a></li>
                        <li className="nav-item">Pending Company Applications</li>
                        <li className="nav-item"><a href="/scad/interns" className="nav-link">All Internships</a></li>
                        <li className="nav-item"><a href="/scad/cycle" className="nav-link">Current Cycle Information</a></li>
                        <li className="nav-item"><a href="/scad/students" className="nav-link">View Students</a></li>
                        <li className="nav-item"><a href="/scad/reports" className="nav-link">View Reports</a></li>
                        <li className="nav-item"><a href="/scad/Statistics" className="nav-link">Statistics</a></li>
                        <li className="nav-item"><a href="/scad/Appointmnets" className="nav-link">Appointments</a></li>
                        <li className="nav-item"><a href="/scad/Calls" className="nav-link">Calls</a></li>
                        <li className="nav-item"><a href="/scad/Workshop" className="nav-link">Workshop</a></li>
                    </ul>
                </aside>
                <main className="dashboard-main">
                    <div className="filters">
                        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} className="filter-select">
                            {companyTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Search companies..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    {selectedCompany ? (
                        <div className="company-details">
                            <h2>{selectedCompany.name}</h2>
                            <p><strong>Type:</strong> {selectedCompany.type}</p>
                            <p><strong>Description:</strong> {selectedCompany.description}</p>
                            <button onClick={handleAccept} className="accept-button">Accept</button>
                            <button onClick={handleReject} className="reject-button">Reject</button>
                        </div>
                    ) : (
                        <ul className="company-list">
                            {filteredCompanies.map((company, index) => (
                                <li
                                    key={index}
                                    className="company-item"
                                    onClick={() => setSelectedCompany(company)}
                                >
                                    {company.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </main>
            </div>
            <footer className="dashboard-footer">
                <p>&copy; 2025 SCAD System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default SCADPendingCompany;
