import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaPhone, FaBell } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import './CSS/SCADOfficeDashboard.css';
import './CSS/browseInternships.css';

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
    const [selectedType, setSelectedType] = useState("Filter by Type");
    const [selectedCompany, setSelectedCompany] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // Example: numbers
    const missedCalls = 5;
    const notifications = 3;

    const handleAccept = () => {
        setCompanies(prev => prev.filter(company => company.name !== selectedCompany.name));
        setSelectedCompany(null);
    };

    const handleReject = () => {
        setCompanies(prev => prev.filter(company => company.name !== selectedCompany.name));
        setSelectedCompany(null);
    };

    const goToCalls = () => {
        navigate("/scad/Calls", { state: { from: location.pathname } });
    };

    const goToNotifications = () => {
        navigate("/scad/noti", { state: { from: location.pathname } });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    const filteredCompanies = companies.filter(company =>
        (selectedType === "Filter by Type" || company.type === selectedType) &&
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const companyTypes = ["Filter by Type", ...new Set(dummyCompanies.map(company => company.type))];

    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                <div className="header-left">
                    <h1 className="dashboard-title">SCAD Office Dashboard</h1>
                </div>
                <div className="header-right">
                    <div className="header-icons">
                        {/* Calls Button with Badge */}
                        <button onClick={goToCalls} className="notification-bell">
                            <FaPhone />
                            <span className="call-badge">{missedCalls}</span>
                        </button>

                        {/* Notifications Button with Badge */}
                        <button onClick={goToNotifications} className="notification-bell">
                            <FiBell size={24} />
                            <span className="notification-badge">{notifications}</span>
                        </button>

                        <a href="/" className="signout-button">Sign Out</a>
                    </div>
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
                    <div className="browser-wrapper">
                        <header className="browser-header">
                            <h1 className="browser-title">Pending Company Requests</h1>
                        </header>
                        <main className="browser-main">
                            <section className="filter-section">
                                <h2 className="section-title">Search and Filter</h2>
                                <input
                                    type="text"
                                    placeholder="Search companies..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="search-input"
                                />
                                <select
                                    name="type"
                                    value={selectedType}
                                    onChange={handleTypeChange}
                                    className="filter-select"
                                >
                                    {companyTypes.map((type, index) => (
                                        <option key={index} value={type}>{type}</option>
                                    ))}
                                </select>
                            </section>
                            <section className="list-section">
                                <h2 className="section-title">Available Companies</h2>
                                <ul className="internship-list">
                                    {filteredCompanies.map((company, index) => (
                                        <li
                                            key={index}
                                            className="internship-item"
                                            onClick={() => setSelectedCompany(company)}
                                        >
                                            <p><strong>{company.name}</strong></p>
                                            <p><strong>Type:</strong> {company.type}</p>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </main>
                        {selectedCompany && (
                            <div className="workshop-modal-backdrop">
                                
                                <div className="workshop-modal">
                                    <div className="modal-buttons">
                                    <button
                                        onClick={() => setSelectedCompany(null)}
                                        
                                    >
                                        Close
                                        </button>
                                    </div>
                                    <h2>{selectedCompany.name}</h2>
                                    <p><strong>Type:</strong> {selectedCompany.type}</p>
                                    <p><strong>Description:</strong> {selectedCompany.description}</p>
                                    <div className="modal-buttons">
                                        <button onClick={handleAccept} className="accept-button">Accept</button>
                                        <button onClick={handleReject} className="reject-button">Reject</button>
                                      
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
            <footer className="dashboard-footer">
                <p>&copy; 2025 SCAD System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default SCADPendingCompany;