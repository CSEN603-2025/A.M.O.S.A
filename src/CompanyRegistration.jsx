
/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CSS/CompanyRegistration.css'; // Importing the CSS file for majestic styling

const CompanyRegistration = () => {
    const [companyName, setCompanyName] = useState('');
    const [industry, setIndustry] = useState('');
    const [companySize, setCompanySize] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [logo, setLogo] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [documents, setDocuments] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        // TO DO: implement actual registration logic here
        setSuccessMessage('Registration successful!');
    };

    const handleLogoChange = (event) => {
        setLogo(event.target.files[0]);
    };
    const handledocumentsChange = (event) => {
        setDocuments(event.target.files[0]);

 };

    return (
        <div className="registration-container">
            <h1 className="registration-title">Company Registration</h1>
            <form className="registration-form" onSubmit={handleSubmit}>
                <label className="form-label">
                    Company Name:
                    <input
                        className="form-input"
                        type="text"
                        value={companyName}
                        onChange={(event) => setCompanyName(event.target.value)}
                    />
                </label>
                <label className="form-label">
                    Industry:
                    <select
                        className="form-select"
                        value={industry}
                        onChange={(event) => setIndustry(event.target.value)}
                    >
                        <option value="">Select an industry</option>
                        <option value="tech">Tech</option>
                        <option value="finance">Finance</option>
                        <option value="healthcare">Healthcare</option>
                    </select>
                </label>
                <label className="form-label">
                    Company Size:
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                value="small"
                                checked={companySize === 'small'}
                                onChange={(event) => setCompanySize(event.target.value)}
                            />
                            Small
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="medium"
                                checked={companySize === 'medium'}
                                onChange={(event) => setCompanySize(event.target.value)}
                            />
                            Medium
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="large"
                                checked={companySize === 'large'}
                                onChange={(event) => setCompanySize(event.target.value)}
                            />
                            Large
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="corporate"
                                checked={companySize === 'corporate'}
                                onChange={(event) => setCompanySize(event.target.value)}
                            />
                            Corporate
                        </label>
                    </div>
                </label>
                <label className="form-label">
                    Email:
                    <input
                        className="form-input"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </label>
                <label className="form-label">
                    Password:
                    <input
                        className="form-input"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </label>
                <label className="form-label">
                    Logo:
                    <input
                        className="form-input"
                        type="file"
                        onChange={handleLogoChange}
                    />
                </label>
                <label className="form-label">
                    Tax documents:
                    <input
                        className="form-input"
                        type="file"
                        onChange={handleLogoChange}
                    />
                </label>
                <button className="form-button" type="submit">
                    Register
                </button>
                {successMessage && <p className="success-message">{successMessage}</p>}
            </form>
            <p className="login-link">
                Already have an account? <Link to="/">Login</Link>
            </p>
        </div>
    );
};

export default CompanyRegistration;