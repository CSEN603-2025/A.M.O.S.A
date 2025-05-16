import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (email && password) {
            switch (email) {
                case "Company@gmail.com":
                    navigate('/Companydashboard'); break;
                case "Student@gmail.com":
                    navigate('/Studentdashboard'); break;
                case "PROstudent@gmail.com":
                    navigate('/PROStudentDashboard'); break;
                case "SCADOffice@gmail.com":
                    navigate('/SCADOfficedashboard'); break;
                case "FacultyMember@gmail.com":
                    navigate('/Facultydashboard'); break;
                default:
                    setError("Invalid credentials. Please check your email.");
            }
        } else {
            setError("Please enter both email and password.");
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.container}>
                <h2 style={styles.title}>GUC Internship Portal</h2>
                {error && (
                    <div style={{ color: 'red', textAlign: 'center', marginBottom: '16px', fontWeight: 'bold' }}>
                        {error}
                    </div>
                )}
                <form onSubmit={handleLogin} style={styles.form}>
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
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button type="submit" style={styles.button}>Login</button>
                    </div>
                </form>
                <div style={styles.linksContainer}>
                    <a href="/Companyregistration" style={styles.link}>Don't have an account? (if you are a company)</a>
                </div>
            </div>
        </div>
    );
};

const styles = {
    wrapper: {
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #cbdaf0, #87a5d4, #3a5ba0)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
    },
    container: {
        backgroundColor: "#ffffffd9",
        padding: "48px 40px",
        borderRadius: "18px",
        boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        width: "100%",
        maxWidth: "440px",
        border: "2px solid #a0c4ff",
        animation: "fadeIn 1s ease-out",
    },
    title: {
        fontSize: "28px",
        fontWeight: "700",
        color: "#1e3a8a",
        marginBottom: "30px",
        textAlign: "center",
        letterSpacing: "1px",
        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "18px"
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
    },
    label: {
        marginBottom: "6px",
        fontSize: "15px",
        fontWeight: "600",
        color: "#2c3e50"
    },
    input: {
        padding: "12px 14px",
        borderRadius: "8px",
        border: "1px solid #b0c4de",
        fontSize: "15px",
        outline: "none",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
        backgroundColor: "#f8fbff",
        boxShadow: "inset 0 1px 4px rgba(0, 0, 0, 0.08)",
    },
    button: {
        marginTop: "12px",
        padding: "14px 40px",
        backgroundColor: "#1e40af",
        color: "white",
        border: "none",
        borderRadius: "10px",
        fontSize: "16px",
        fontWeight: "700",
        letterSpacing: "1px",
        cursor: "pointer",
        transition: "background-color 0.3s ease, transform 0.2s ease",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    },
    linksContainer: {
        marginTop: "26px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    link: {
        color: "#2b6cb0",
        textDecoration: "none",
        fontSize: "14px",
        fontWeight: "500",
        transition: "color 0.2s ease, text-shadow 0.2s ease",
    }
};

export default LoginPage;
