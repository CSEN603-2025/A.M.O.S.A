import React, { useState } from "react";
import { FiBriefcase } from "react-icons/fi";
import '../CSS/StudentDashboard.css';
import '../CSS/browseInternships.css';
import StudentLayout from "../components/StudentLayout";

const StudentInternships = () => {
    const [internships] = useState([
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
        },
    ]);

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

    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState({
        industry: "All Fields",
        paid: "All",
        duration: "All"
    });
    const [selectedInternship, setSelectedInternship] = useState(null);
    const [applications, setApplications] = useState(() => {
        const saved = localStorage.getItem("StudentApplied");
        return saved ? JSON.parse(saved) : [];
    });
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
    };

    const handleApply = (internship) => {
        const updatedApps = [...applications, internship.id];
        setApplications(updatedApps);
        setSelectedInternship(null);
        setUploadedFiles([]);

        localStorage.setItem("StudentApplied", JSON.stringify(updatedApps));
        localStorage.setItem("internships", JSON.stringify(internships));
    };

    const filteredInternships = internships.filter((internship) => {
        const matchesSearch =
            internship.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            internship.companyName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesIndustry =
            filter.industry === "All Fields" || internship.industry === filter.industry;
        const matchesPaid =
            filter.paid === "All" ||
            (filter.paid === "Paid" && internship.paid) ||
            (filter.paid === "Unpaid" && !internship.paid);
        const matchesDuration =
            filter.duration === "All" ||
            (filter.duration === "1-3" && internship.durationMonths >= 1 && internship.durationMonths <= 3) ||
            (filter.duration === "3-6" && internship.durationMonths >= 3 && internship.durationMonths <= 6) ||
            (filter.duration === "6+" && internship.durationMonths >= 6);

        return matchesSearch && matchesIndustry && matchesPaid && matchesDuration;
    });

    const industryTypes = ["All Fields", ...new Set(internships.map(internship => internship.industry))];

    return (
        <StudentLayout>
            <main className="main-content" aria-label="Main Content">
                <h1 className="main-welcome" style={{ marginTop: 0, marginBottom: 32 }}>Browse Internships</h1>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 24 }}>
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
                            name="industry"
                            value={filter.industry}
                            onChange={handleFilterChange}
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
                            name="paid"
                            value={filter.paid}
                            onChange={handleFilterChange}
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
                            name="duration"
                            value={filter.duration}
                            onChange={handleFilterChange}
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
                    <div className="modal">
                        <div className="modal-content">
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button
                                    onClick={() => setSelectedInternship(null)}
                                    className="signout-btn"
                                    style={{
                                        background: 'var(--primary)',
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
                            <div style={{ fontSize: 15, marginBottom: 8 }}>
                                <strong>Skills:</strong> {selectedInternship.skills}
                            </div>
                            <div style={{ fontSize: 15, marginBottom: 16 }}>
                                <strong>Description:</strong> {selectedInternship.description}
                            </div>

                            <div className="upload-section">
                                <label htmlFor="doc-upload" className="upload-label">
                                    Upload Documents (CV, Certificates, etc.):
                                </label>
                                <input
                                    type="file"
                                    id="doc-upload"
                                    multiple
                                    onChange={(e) => setUploadedFiles(Array.from(e.target.files))}
                                    className="upload-input"
                                    style={{
                                        margin: '20px 0',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        width: '100%'
                                    }}
                                />
                                {uploadedFiles.length > 0 && (
                                    <ul className="file-list">
                                        {uploadedFiles.map((file, index) => (
                                            <li key={index} className="file-name">
                                                📎 {file.name}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {applications.includes(selectedInternship.id) ? (
                                <p className="applied-message" style={{ color: statusColors.Applied, fontWeight: 600 }}>✅ Applied</p>
                            ) : (
                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                                <button
                                    onClick={handleApply}
                                    className="apply-btn"
                                    style={{ padding: '10px 24px', borderRadius: '8px', backgroundColor: '#003366', color: 'white', border: 'none' }}
                                >
                                    Apply
                                </button>
                                </div>

                            )}
                        </div>
                    </div>
                )}
            </main>
        </StudentLayout>
    );
};

export default StudentInternships;