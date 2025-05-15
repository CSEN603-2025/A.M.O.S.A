import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiBriefcase, FiX, FiCheck } from "react-icons/fi";
import './CSS/SCADOfficeDashboard.css';
import DashboardLayout from './components/Layout';

const dummyCompanies = [
    {
        id: 1,
        name: "TechNova Solutions",
        type: "Technology",
        description: "A leading tech company specializing in AI solutions.",
        contactEmail: "contact@technova.com",
        contactPhone: "+201234567890",
        established: "2015",
        employees: "250",
        status: "Pending"
    },
    {
        id: 2,
        name: "GreenFuture Inc.",
        type: "Environmental",
        description: "Promotes sustainable solutions for energy.",
        contactEmail: "info@greenfuture.com",
        contactPhone: "+201112345678",
        established: "2018",
        employees: "120",
        status: "Pending"
    },
    {
        id: 3,
        name: "Skyline Technologies",
        type: "Technology",
        description: "Develops cutting-edge cloud infrastructure.",
        contactEmail: "hr@skyline.tech",
        contactPhone: "+201001234567",
        established: "2012",
        employees: "500",
        status: "Pending"
    },
    {
        id: 4,
        name: "BrightMind Software",
        type: "Software",
        description: "Focuses on educational software for students.",
        contactEmail: "support@brightmind.com",
        contactPhone: "+201554321098",
        established: "2016",
        employees: "180",
        status: "Pending"
    },
    {
        id: 5,
        name: "FutureWave Systems",
        type: "Technology",
        description: "Innovative mobile technologies company.",
        contactEmail: "careers@futurewave.com",
        contactPhone: "+201664455332",
        established: "2019",
        employees: "75",
        status: "Pending"
    },
    {
        id: 6,
        name: "QuantumSoft Ltd.",
        type: "Software",
        description: "Software company specializing in finance applications.",
        contactEmail: "info@quantumsoft.com",
        contactPhone: "+201778899001",
        established: "2017",
        employees: "200",
        status: "Pending"
    }
];

const statusColors = {
    Pending: "#FFBB28",
    Accepted: "#00C49F",
    Rejected: "#FF6384"
};

const SCADPendingCompany = () => {
    const [companies, setCompanies] = useState(dummyCompanies);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedType, setSelectedType] = useState("All");
    const [selectedCompany, setSelectedCompany] = useState(null);
    const navigate = useNavigate();

    const handleAccept = () => {
        setCompanies(prev => prev.filter(company => company.id !== selectedCompany.id));
        setSelectedCompany(null);
    };

    const handleReject = () => {
        setCompanies(prev => prev.filter(company => company.id !== selectedCompany.id));
        setSelectedCompany(null);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    const filteredCompanies = companies.filter(company =>
        (selectedType === "All" || company.type === selectedType) &&
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const companyTypes = ["All", ...new Set(dummyCompanies.map(company => company.type))];

    return (
        <DashboardLayout>
            <main className="main-content" aria-label="Main Content">
                <h1 className="main-welcome" style={{ marginTop: 0, marginBottom: 32 }}>Pending Company Applications</h1>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 24 }}>
                    <h2 className="section-title" style={{ margin: 0 }}>Review Applications</h2>
                    <div style={{ display: 'flex', gap: 12 }}>
                        <input
                            type="text"
                            placeholder="Search by company name"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="input"
                            style={{
                                width: 300,  // Wider search bar
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
                            name="type"
                            value={selectedType}
                            onChange={handleTypeChange}
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
                            {companyTypes.map((type, index) => (
                                <option key={index} value={type}>{type}</option>
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
                    {filteredCompanies.map((company) => (
                        <div
                            key={company.id}
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
                            onClick={() => setSelectedCompany(company)}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                <FiBriefcase style={{ color: 'var(--primary)', fontSize: 22 }} />
                                <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{company.name}</span>
                            </div>
                            <div style={{ fontSize: 14, marginBottom: 4 }}><strong>Industry:</strong> {company.type}</div>
                            <div style={{ fontSize: 14, marginBottom: 4 }}><strong>Established:</strong> {company.established}</div>
                            <div style={{ fontSize: 14, marginBottom: 4 }}><strong>Employees:</strong> {company.employees}</div>
                            <div style={{ fontSize: 14, marginBottom: 4 }}><strong>Status:</strong> <span style={{ color: statusColors[company.status], fontWeight: 600 }}>{company.status}</span></div>
                            <div style={{ marginTop: 8, color: 'var(--text-light)', fontSize: 14 }}>
                                <strong>Description:</strong> {company.description.substring(0, 60)}...
                            </div>
                        </div>
                    ))}
                </div>
                {selectedCompany && (
                    <div className="workshop-modal-backdrop">
                        <div className="workshop-modal" style={{
                            maxWidth: '500px',  // Smaller modal width
                            width: '90%',
                            padding: '24px'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button
                                    onClick={() => setSelectedCompany(null)}
                                    className="signout-btn"
                                    style={{
                                        background: 'var(--primary)',
                                        marginBottom: '16px'
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                            <h2 style={{ marginBottom: 16 }}>{selectedCompany.name}</h2>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '12px',
                                marginBottom: '16px'
                            }}>
                                <div style={{ fontSize: 15 }}><strong>Industry:</strong> {selectedCompany.type}</div>
                                <div style={{ fontSize: 15 }}><strong>Established:</strong> {selectedCompany.established}</div>
                                <div style={{ fontSize: 15 }}><strong>Contact Email:</strong> {selectedCompany.contactEmail}</div>
                                <div style={{ fontSize: 15 }}><strong>Employees:</strong> {selectedCompany.employees}</div>
                                <div style={{ fontSize: 15 }}><strong>Contact Phone:</strong> {selectedCompany.contactPhone}</div>
                                <div style={{ fontSize: 15 }}><strong>Status:</strong> <span style={{ color: statusColors[selectedCompany.status], fontWeight: 600 }}>{selectedCompany.status}</span></div>
                            </div>
                            <div style={{ fontSize: 15, marginBottom: 16 }}>
                                <strong>Description:</strong> {selectedCompany.description}
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',  // Centered buttons
                                gap: 16,
                                marginTop: 24
                            }}>
                                <button
                                    onClick={handleAccept}
                                    style={{
                                        background: '#00C49F',
                                        color: 'white',
                                        border: 'none',
                                        padding: '10px 24px',
                                        borderRadius: 8,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        fontWeight: 600,
                                        width: '120px',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <FiCheck /> Accept
                                </button>
                                <button
                                    onClick={handleReject}
                                    style={{
                                        background: '#FF6384',
                                        color: 'white',
                                        border: 'none',
                                        padding: '10px 24px',
                                        borderRadius: 8,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        fontWeight: 600,
                                        width: '120px',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <FiX /> Reject
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </DashboardLayout>
    );
};

export default SCADPendingCompany;