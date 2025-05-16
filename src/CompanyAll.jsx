import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiBriefcase } from "react-icons/fi";
import './CSS/CompanyDashboard.css';
import './CSS/browseInternships.css';
import CompanyLayout from "./components/CompanyLayout";

const dummyInternships = [
    {
        id: 1,
        companyName: "TechCorp",
        jobTitle: "Software Engineer Intern",
        duration: "3 months",
        durationMonths: 3,
        paid: true,
        salary: "$1500/month",
        industry: "Technology",
        skills: "JavaScript, React, Node.js",
        description: "Work on developing scalable web applications.",
        status: "Available"
    },
    {
        id: 2,
        companyName: "Marketify",
        jobTitle: "Marketing Intern",
        duration: "2 months",
        durationMonths: 2,
        paid: false,
        salary: "N/A",
        industry: "Marketing",
        skills: "SEO, Content Writing, Social Media",
        description: "Assist in creating marketing campaigns.",
        status: "Available"
    },
    {
        id: 3,
        companyName: "DataWorks",
        jobTitle: "Data Analyst Intern",
        duration: "4 months",
        durationMonths: 4,
        paid: true,
        salary: "$2000/month",
        industry: "Data Analytics",
        skills: "Python, SQL, Data Visualization",
        description: "Analyze and visualize large datasets.",
        status: "Available"
    }
];

const statusColors = {
    Available: "#00C49F",
    Applied: "#FFBB28",
    Closed: "#FF6384"
};

const durationOptions = [
    { value: "All", label: "All Durations" },
    { value: "1-3", label: "1-3 months" },
    { value: "3-6", label: "3-6 months" },
    { value: "6+", label: "6+ months" }
];

const CompanyAll = () => {
    const [internships] = useState(dummyInternships);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedIndustry, setSelectedIndustry] = useState("All Fields");
    const [selectedPay, setSelectedPay] = useState("All");
    const [selectedDuration, setSelectedDuration] = useState("All");
    const [selectedInternship, setSelectedInternship] = useState(null);
    const navigate = useNavigate();

    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleIndustryChange = (e) => setSelectedIndustry(e.target.value);
    const handlePayChange = (e) => setSelectedPay(e.target.value);
    const handleDurationChange = (e) => setSelectedDuration(e.target.value);

    const filteredInternships = internships.filter(internship =>
        (selectedIndustry === "All Fields" || internship.industry === selectedIndustry) &&
        (selectedPay === "All" ||
            (selectedPay === "Paid" && internship.paid) ||
            (selectedPay === "Unpaid" && !internship.paid)) &&
        (selectedDuration === "All" ||
            (selectedDuration === "1-3" && internship.durationMonths >= 1 && internship.durationMonths <= 3) ||
            (selectedDuration === "3-6" && internship.durationMonths >= 3 && internship.durationMonths <= 6) ||
            (selectedDuration === "6+" && internship.durationMonths >= 6)) &&
        (internship.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            internship.companyName.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const industryTypes = ["All Fields", ...new Set(dummyInternships.map(i => i.industry))];

    return (
        <CompanyLayout>
            <main className="main-content" aria-label="Main Content">
                <h1 className="main-welcome" style={{ marginTop: 0, marginBottom: 32 }}>Manage Internships</h1>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    marginBottom: 24
                }}>
                    <h2 className="section-title" style={{ margin: 0 }}>Available Internships</h2>
                    <div style={{ display: 'flex', gap: 12 }}>
                        <input
                            type="text"
                            placeholder="Search by job title or company"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="input"
                            style={{
                                width: 300,
                                height: 40,
                                borderRadius: 8,
                                border: '1px solid var(--border)',
                                padding: '0 14px',
                                fontSize: 16,
                                background: '#fff',
                                color: 'var(--text)'
                            }}
                        />
                        <select
                            value={selectedIndustry}
                            onChange={handleIndustryChange}
                            className="input"
                            style={{
                                width: 180,
                                height: 40,
                                borderRadius: 8,
                                border: '1px solid var(--border)',
                                padding: '0 14px',
                                fontSize: 16,
                                background: '#fff',
                                color: 'var(--text)'
                            }}
                        >
                            {industryTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
                            ))}
                        </select>
                        <select
                            value={selectedPay}
                            onChange={handlePayChange}
                            className="input"
                            style={{
                                width: 160,
                                height: 40,
                                borderRadius: 8,
                                border: '1px solid var(--border)',
                                padding: '0 14px',
                                fontSize: 16,
                                background: '#fff',
                                color: 'var(--text)'
                            }}
                        >
                            <option value="All">All Internships</option>
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
                        </select>
                        <select
                            value={selectedDuration}
                            onChange={handleDurationChange}
                            className="input"
                            style={{
                                width: 150,
                                height: 40,
                                borderRadius: 8,
                                border: '1px solid var(--border)',
                                padding: '0 14px',
                                fontSize: 16,
                                background: '#fff',
                                color: 'var(--text)'
                            }}
                        >
                            {durationOptions.map((option, index) => (
                                <option key={index} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: 24,
                    width: '100%'
                }}>
                    {filteredInternships.map((internship) => (
                        <div
                            key={internship.id}
                            className="internship-item"
                            style={{
                                background: '#fff',
                                borderRadius: 12,
                                boxShadow: '0 2px 8px rgba(30,41,59,0.06)',
                                padding: 24,
                                cursor: 'pointer',
                                border: '1px solid var(--border)',
                                height: '100%'
                            }}
                            onClick={() => setSelectedInternship(internship)}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                <FiBriefcase style={{ color: 'var(--primary)', fontSize: 22 }} />
                                <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{internship.jobTitle}</span>
                            </div>
                            <div style={{ fontSize: 14, marginBottom: 4 }}><strong>Company:</strong> {internship.companyName}</div>
                            <div style={{ fontSize: 14, marginBottom: 4 }}><strong>Duration:</strong> {internship.duration}</div>
                            <div style={{ fontSize: 14, marginBottom: 4 }}><strong>Paid:</strong> {internship.paid ? "Yes" : "No"}</div>
                            <div style={{ fontSize: 14, marginBottom: 4 }}><strong>Salary:</strong> {internship.salary}</div>
                            <div style={{ fontSize: 14, marginBottom: 4 }}><strong>Status:</strong> <span style={{ color: statusColors[internship.status], fontWeight: 600 }}>{internship.status}</span></div>
                            <div style={{ marginTop: 8, color: 'var(--text-light)', fontSize: 14 }}>
                                <strong>Skills:</strong> {internship.skills.substring(0, 60)}...
                            </div>
                        </div>
                    ))}
                </div>

                {selectedInternship && (
                    <div className="workshop-modal-backdrop">
                        <div className="workshop-modal" style={{
                            maxWidth: '500px',
                            width: '90%',
                            padding: '24px'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button
                                    onClick={() => setSelectedInternship(null)}
                                    style={{
                                        background: 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        padding: '8px 16px',
                                        borderRadius: 8,
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        marginBottom: '16px'
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                            <h2 style={{ marginBottom: 16 }}>{selectedInternship.jobTitle}</h2>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '12px',
                                marginBottom: '16px'
                            }}>
                                <div style={{ fontSize: 15 }}><strong>Company:</strong> {selectedInternship.companyName}</div>
                                <div style={{ fontSize: 15 }}><strong>Duration:</strong> {selectedInternship.duration}</div>
                                <div style={{ fontSize: 15 }}><strong>Paid:</strong> {selectedInternship.paid ? "Yes" : "No"}</div>
                                <div style={{ fontSize: 15 }}><strong>Salary:</strong> {selectedInternship.salary}</div>
                                <div style={{ fontSize: 15 }}><strong>Industry:</strong> {selectedInternship.industry}</div>
                                <div style={{ fontSize: 15 }}><strong>Status:</strong> <span style={{ color: statusColors[selectedInternship.status], fontWeight: 600 }}>{selectedInternship.status}</span></div>
                            </div>
                            <div style={{ fontSize: 15, marginBottom: 8 }}><strong>Skills:</strong> {selectedInternship.skills}</div>
                            <div style={{ fontSize: 15 }}><strong>Description:</strong> {selectedInternship.description}</div>
                        </div>
                    </div>
                )}
            </main>
        </CompanyLayout>
    );
};

export default CompanyAll;