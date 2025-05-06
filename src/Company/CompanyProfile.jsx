import React, { useState } from "react";
import '../CSS/CompanyProfile.css';

const CompanyProfile = () => {
    const [companyInfo, setCompanyInfo] = useState({
        name: "TechCorp",
        industry: "Technology",
        size: "Medium",
        email: "contact@techcorp.com",
        logo: null,
    });

    const [verificationStatus, setVerificationStatus] = useState("Pending");
    const [documents, setDocuments] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCompanyInfo({ ...companyInfo, [name]: value });
    };

    const handleFileUpload = (e) => {
        setDocuments([...documents, ...e.target.files]);
    };

    const handleSave = () => {
        alert("Company information saved!");
        // Add logic to save the updated company information
    };

    return (
        <div className="profile-wrapper">
            <header className="profile-header">
                <h1 className="profile-title">Company Profile</h1>
            </header>
            <main className="profile-main">
                <section className="info-section">
                    <h2 className="section-title">Company Information</h2>
                    <form className="info-form">
                        <label className="form-label">Company Name</label>
                        <input
                            type="text"
                            name="name"
                            value={companyInfo.name}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                        <label className="form-label">Industry</label>
                        <input
                            type="text"
                            name="industry"
                            value={companyInfo.industry}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                        <label className="form-label">Company Size</label>
                        <select
                            name="size"
                            value={companyInfo.size}
                            onChange={handleInputChange}
                            className="form-select"
                        >
                            <option value="Small">Small (≤50 employees)</option>
                            <option value="Medium">Medium (51-100 employees)</option>
                            <option value="Large">Large (101-500 employees)</option>
                            <option value="Corporate">Corporate (>500 employees)</option>
                        </select>
                        <label className="form-label">Official Email</label>
                        <input
                            type="email"
                            name="email"
                            value={companyInfo.email}
                            onChange={handleInputChange}
                            className="form-input"
                        />
                        <label className="form-label">Company Logo</label>
                        <input
                            type="file"
                            name="logo"
                            onChange={(e) => setCompanyInfo({ ...companyInfo, logo: e.target.files[0] })}
                            className="form-input"
                        />
                        <button type="button" onClick={handleSave} className="action-button">
                            Save Changes
                        </button>
                    </form>
                </section>
                <section className="upload-section">
                    <h2 className="section-title">Upload Documents</h2>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="form-input"
                    />
                    <ul className="documents-list">
                        {documents.map((doc, index) => (
                            <li key={index}>{doc.name}</li>
                        ))}
                    </ul>
                </section>
                <section className="verification-section">
                    <h2 className="section-title">Verification Status</h2>
                    <p className={`status ${verificationStatus.toLowerCase()}`}>
                        {verificationStatus}
                    </p>
                </section>
            </main>
        </div>
    );
};

export default CompanyProfile;

