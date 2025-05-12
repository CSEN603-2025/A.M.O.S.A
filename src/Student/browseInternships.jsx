/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import '../CSS/browseInternships.css';

const InternshipBrowser = () => {
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
    const [filter, setFilter] = useState({ industry: "All", paid: "All" });
    const [selectedInternship, setSelectedInternship] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [applications, setApplications] = useState( );


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
        return matchesSearch && matchesIndustry && matchesPaid;
    });

    return (
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
                        <button
                            onClick={() => handleApply(selectedInternship)}
                            className="apply-button"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InternshipBrowser;

