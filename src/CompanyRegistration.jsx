import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
        setSuccessMessage('Registration successful!');
    };

    const handleLogoChange = (event) => {
        setLogo(event.target.files[0]);
    };

    const handleDocumentsChange = (event) => {
        setDocuments(event.target.files[0]);
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.container}>
                <h2 style={styles.title}>Company Registration</h2>
                {successMessage && (
                    <div style={styles.success}>{successMessage}</div>
                )}
                <form style={styles.form} onSubmit={handleSubmit}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Company Name</label>
                        <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Industry</label>
                        <select
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            style={styles.input}
                            required
                        >
                            <option value="">Select an industry</option>
                            <option value="tech">Tech</option>
                            <option value="finance">Finance</option>
                            <option value="healthcare">Healthcare</option>
                        </select>
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Company Size</label>
                        <div style={styles.radioGridCentered}>
                            {['small', 'medium', 'large', 'corporate'].map(size => (
                                <label key={size} style={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        value={size}
                                        checked={companySize === size}
                                        onChange={(e) => setCompanySize(e.target.value)}
                                    /> {size.charAt(0).toUpperCase() + size.slice(1)}
                                </label>
                            ))}
                        </div>
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Logo</label>
                        <input
                            type="file"
                            onChange={handleLogoChange}
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Tax Documents</label>
                        <input
                            type="file"
                            onChange={handleDocumentsChange}
                            style={styles.input}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button type="submit" style={styles.button}>Register</button>
                    </div>
                </form>
                <p style={styles.footerText}>Already have an account? <Link to="/" style={styles.link}>Login</Link></p>
            </div>
        </div>
    );
};

const styles = {
    wrapper: {
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px 20px',
        background: 'linear-gradient(135deg, #cbdaf0, #87a5d4, #3a5ba0)',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        boxSizing: 'border-box',
    },
    container: {
        backgroundColor: '#ffffffd9',
        padding: '40px 30px',
        borderRadius: '18px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        width: '100%',
        maxWidth: '500px',
        border: '2px solid #a0c4ff',
        animation: 'fadeIn 1s ease-out',
    },
    title: {
        fontSize: '28px',
        fontWeight: '700',
        color: '#1e3a8a',
        marginBottom: '24px',
        textAlign: 'center',
        letterSpacing: '1px',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
    },
    success: {
        color: 'green',
        fontSize: '14px',
        textAlign: 'center',
        marginBottom: '16px',
        fontWeight: '500',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        marginBottom: '6px',
        fontSize: '15px',
        fontWeight: '600',
        color: '#2c3e50',
    },
    input: {
        padding: '12px 14px',
        borderRadius: '8px',
        border: '1px solid #b0c4de',
        fontSize: '15px',
        backgroundColor: '#f8fbff',
        outline: 'none',
    },
    radioGridCentered: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '8px',
        textAlign: 'center',
    },
    radioLabel: {
        fontSize: '14px',
        color: '#2c3e50',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        justifyContent: 'center',
    },
    button: {
        marginTop: '12px',
        padding: '14px 40px',
        backgroundColor: '#1e40af',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        fontSize: '16px',
        fontWeight: '700',
        letterSpacing: '1px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
    footerText: {
        marginTop: '20px',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: '500',
    },
    link: {
        color: '#2b6cb0',
        textDecoration: 'none',
    },
};

export default CompanyRegistration;
