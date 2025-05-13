import React, { useState } from "react";
import './CSS/CompanyDashboard.css';
import './CSS/browseInternships.css';
import { useNavigate } from 'react-router-dom';
import { FiBell } from 'react-icons/fi';


const CompanyAll = () => {
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
    const [filter, setFilter] = useState({
        industry: "All",
        paid: "All",
        duration: "All"
    });
    const [selectedInternship, setSelectedInternship] = useState(null);
    const [applications, setApplications] = useState([]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
    };

    const navigate = useNavigate();

    const handleBellClick = () => {
        navigate('/CompanyNotifications');
    };

    const handleLogout = () => {
        navigate('/');
    };


    const handleApply = (internship) => {
        setApplications([...applications, internship]);
        alert('Applied');
        setSelectedInternship(null);
    };

    const filteredInternships = internships.filter((internship) => {
        const matchesSearch =
            internship.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            internship.companyName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesIndustry =
            filter.industry === "All" || internship.industry === filter.industry;
        const matchesPaid =
            filter.paid === "All" ||
            (filter.paid === "Paid" && internship.paid) ||
            (filter.paid === "Unpaid" && !internship.paid);
        const matchesDuration =
            filter.duration === "All" || internship.duration === filter.duration;

        return matchesSearch && matchesIndustry && matchesPaid && matchesDuration;
    });

    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
            <h1 className="dashboard-title">All Internships</h1>
            <div className="dashboard-actions">
                <button className="notification-bell" onClick={handleBellClick} title="Notifications">
                    <FiBell size={24} />
                    <span className="notification-count">3</span>
                </button>
                <button className="signout-button" onClick={handleLogout}>
                    Sign Out
                </button>
            </div>
        </header>

            <div className="dashboard-content">
                <aside className="dashboard-sidebar">
                    <h2 className="sidebar-title">Navigation</h2>
                    <ul className="nav-list">
                        <li className="nav-item"><a href="/CompanyDashboard" className="nav-link"> Home</a></li>
                        <li className="nav-item"><a href="/CompanyInternships" className="nav-link"> My Internship Posts</a></li>
                        <li className="nav-item"><a href="/company/applications" className="nav-link">Applications</a></li>
                        <li className="nav-item"><a href="/CompanyCurrentInterns" className="nav-link">Current Interns</a></li>
                        <li className="nav-item">All Internships</li>
                        <li className="nav-item"><a href="/CompanyDocs" className="nav-link">Reports and Documents</a></li>
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
                                    <option value="All">All</option>
                                    <option value="Paid">Paid</option>
                                    <option value="Unpaid">Unpaid</option>
                                </select>
                                <select
                                    name="duration"
                                    value={filter.duration}
                                    onChange={handleFilterChange}
                                    className="filter-select"
                                >
                                    <option value="All">All Durations</option>
                                    <option value="1 month">1 month</option>
                                    <option value="2 months">2 months</option>
                                    <option value="3 months">3 months</option>
                                    <option value="4 months">4 months</option>
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
                            <div className="modal">
                                <div className="modal-content">
                                    <h2>{selectedInternship.jobTitle}</h2>
                                    <p><strong>Company:</strong> {selectedInternship.companyName}</p>
                                    <p><strong>Duration:</strong> {selectedInternship.duration}</p>
                                    <p><strong>Paid:</strong> {selectedInternship.paid ? "Yes" : "No"}</p>
                                    <p><strong>Salary:</strong> {selectedInternship.salary}</p>
                                    <p><strong>Industry:</strong> {selectedInternship.industry}</p>
                                    <p><strong>Skills:</strong> {selectedInternship.skills}</p>
                                    <p><strong>Description:</strong> {selectedInternship.description}</p>
                                    <button
                                        onClick={() => setSelectedInternship(null)}
                                        className="close-button"
                                    >
                                        Close
                                    </button>
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

export default CompanyAll;
