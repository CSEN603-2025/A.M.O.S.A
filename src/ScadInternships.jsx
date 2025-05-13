import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaPhone, FaBell } from "react-icons/fa";
import {  FiBell } from "react-icons/fi";
import './CSS/SCADOfficeDashboard.css';
import './CSS/browseInternships.css';

const SCADInternships = () => {
    const [internships, setInternships] = useState([
        {
            id: 1,
            companyName: "TechCorp",
            jobTitle: "Software Engineer Intern",
            duration: "3 months",
            paid: true,
            salary: "$1500/month",
            industry: "Technology",
            skills: "JavaScript, React, Node.js",
            description: "Work on developing scalable web applications.",
        },
        {
            id: 2,
            companyName: "Marketify",
            jobTitle: "Marketing Intern",
            duration: "2 months",
            paid: false,
            salary: "N/A",
            industry: "Marketing",
            skills: "SEO, Content Writing, Social Media",
            description: "Assist in creating marketing campaigns.",
        },
        {
            id: 3,
            companyName: "DataWorks",
            jobTitle: "Data Analyst Intern",
            duration: "4 months",
            paid: true,
            salary: "$2000/month",
            industry: "Data Analytics",
            skills: "Python, SQL, Data Visualization",
            description: "Analyze and visualize large datasets.",
        },
    ]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState({ industry: "All", paid: "Filter by pay" });
    const [selectedInternship, setSelectedInternship] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [applications, setApplications] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    // Example numbers for calls and notifications
    const missedCalls = 5;
    const notifications = 3;

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
    };

    const handleApply = (internship) => {
        setApplications([...applications, internship]);
        alert('Applied');
        setSelectedInternship(null);
    };

    const goToCalls = () => {
        navigate("/scad/Calls", { state: { from: location.pathname } });
    };

    const goToNotifications = () => {
        navigate("/scad/noti", { state: { from: location.pathname } });
    };

    const filteredInternships = internships.filter((internship) => {
        const matchesSearch =
            internship.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            internship.companyName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesIndustry =
            filter.industry === "All" || internship.industry === filter.industry;
        const matchesPaid =
            filter.paid === "Filter by pay" ||
            (filter.paid === "Paid" && internship.paid) ||
            (filter.paid === "Unpaid" && !internship.paid);
        return matchesSearch && matchesIndustry && matchesPaid;
    });

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
                        <li className="nav-item"><a href="/scadOfficeDashboard" className="nav-link">Home</a></li>
                        <li className="nav-item"><a href="/scad/companies" className="nav-link">Pending Company Applications</a></li>
                        <li className="nav-item">All Internships</li>
                        <li className="nav-item"><a href="/scad/cycle" className="nav-link">Current Cycle Information</a></li>
                        <li className="nav-item"><a href="/scad/students" className="nav-link">View Students</a></li>
                        <li className="nav-item"><a href="/scad/reports" className="nav-link">View Reports</a></li>
                        <li className="nav-item"><a href="/scad/Statistics" className="nav-link">Statistics</a></li>
                        <li className="nav-item"><a href="/scad/Appointmnets" className="nav-link">Appointmnets</a></li>
                        <li className="nav-item"><a href="/scad/Calls" className="nav-link">Calls</a></li>
                        <li className="nav-item"><a href="/scad/Workshop" className="nav-link">Worshop</a></li>
                    </ul>
                </aside>
                <main className="dashboard-main">
                    <div className="browser-wrapper">
                        <header className="browser-header">
                            <h1 className="browser-title">Browse Internships</h1>
                        </header>
                        <main className="browser-main">
                            <section className="filter-section">
                                <h2 className="section-title">Search and Filter</h2>
                                <input
                                    type="text"
                                    placeholder="Search by job title or company name"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="search-input"
                                />
                                <select
                                    name="industry"
                                    value={filter.industry}
                                    onChange={handleFilterChange}
                                    className="filter-select"
                                >
                                    <option value="All">All Industries</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Data Analytics">Data Analytics</option>
                                </select>
                                <select
                                    name="paid"
                                    value={filter.paid}
                                    onChange={handleFilterChange}
                                    className="filter-select"
                                >
                                    <option value="Filter by pay">Filter by Pay</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Unpaid">Unpaid</option>
                                </select>
                            </section>
                            <section className="list-section">
                                <h2 className="section-title">Available Internships</h2>
                                <ul className="internship-list">
                                    {filteredInternships.map((internship) => (
                                        <li
                                            key={internship.id}
                                            className="internship-item"
                                            onClick={() => setSelectedInternship(internship)}
                                        >
                                            <p><strong>{internship.jobTitle}</strong> at {internship.companyName}</p>
                                            <p><strong>Duration:</strong> {internship.duration}</p>
                                            <p><strong>Paid:</strong> {internship.paid ? "Yes" : "No"}</p>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </main>
                        {selectedInternship && (
                            <div className="workshop-modal-backdrop">
                                <div className="workshop-modal">
                                    <div className="modal-buttons">
                                        <button
                                            onClick={() => setSelectedInternship(null)}
                                            
                                        >
                                            Close
                                        </button>
                                    </div>
                                    <h2>{selectedInternship.jobTitle}</h2>
                                    <p><strong>Company:</strong> {selectedInternship.companyName}</p>
                                    <p><strong>Duration:</strong> {selectedInternship.duration}</p>
                                    <p><strong>Paid:</strong> {selectedInternship.paid ? "Yes" : "No"}</p>
                                    <p><strong>Salary:</strong> {selectedInternship.salary}</p>
                                    <p><strong>Industry:</strong> {selectedInternship.industry}</p>
                                    <p><strong>Skills:</strong> {selectedInternship.skills}</p>
                                    <p><strong>Description:</strong> {selectedInternship.description}</p>
                                   
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

export default SCADInternships;