import React, { useState } from "react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("Company");

    const handleLogin = (e) => {
        e.preventDefault();
        // Dummy authentication logic
        if (email && password) {
            switch (role) {
                case "Company":
                    alert("Redirecting to Company Dashboard...");
                    break;
                case "Student":
                    alert("Redirecting to Student Dashboard...");
                    break;
                case "PRO Student":
                    alert("Redirecting to PRO Student Dashboard...");
                    break;
                case "SCAD Office":
                    alert("Redirecting to SCAD Office Dashboard...");
                    break;
                case "Faculty Member":
                    alert("Redirecting to Faculty Member Dashboard...");
                    break;
                default:
                    alert("Invalid role selected.");
            }
        } else {
            alert("Please enter both email and password.");
        }
    };

    return (
        <div style={styles.container}>
                   <h1 style={styles.title}>Login</h1>
                   <form onSubmit={handleLogin} style={styles.form}>
                       <div style={styles.inputGroup}>
                           <label style={styles.label}>Email</label>
                           <input
                               type="email"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               style={{ ...styles.input, ...styles.inputFocus }}
                               required
                           />
                       </div>
                       <div style={styles.inputGroup}>
                           <label style={styles.label}>Password</label>
                           <input
                               type="password"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               style={{ ...styles.input, ...styles.inputFocus }}
                               required
                           />
                       </div>
                       <div style={styles.inputGroup}>
                           <label style={styles.label}>Role</label>
                           <select
                               value={role}
                               onChange={(e) => setRole(e.target.value)}
                               style={{ ...styles.select, ...styles.inputFocus }}
                           >
                               <option value="Company">Company</option>
                               <option value="Student">Student</option>
                               <option value="PRO Student">PRO Student</option>
                               <option value="SCAD Office">SCAD Office</option>
                               <option value="Faculty Member">Faculty Member</option>
                           </select>
                       </div>
                       <button
                           type="submit"
                           style={{ ...styles.button, ...styles.buttonHover }}
                           onMouseEnter={(e) => (e.target.style.transform = "translateY(-3px)")}
                           onMouseLeave={(e) => (e.target.style.transform = "translateY(0)")}
                           onClick={() => {
                               switch (role) {
                                   case "Company":
                                       navigate('/company/dashboard');
                                       break;
                                   case "Student":
                                       navigate('/student/dashboard');
                                       break;
                                   case "PRO Student":
                                       navigate('/pro-student/dashboard');
                                       break;
                                   case "SCAD Office":
                                       navigate('/scad-office/dashboard');
                                       break;
                                   case "Faculty Member":
                                       navigate('/faculty-member/dashboard');
                                       break;
                                   default:
                                       alert("Invalid role selected.");
                               }
                           }}
                       >
                           Login
                       </button>
                   </form>
                   <a
                       href="#"
                       style={{ ...styles.forgotPassword, ...styles.forgotPasswordLink }}
                       onMouseEnter={(e) => {
                           e.target.style.textShadow = "0 0 5px rgba(30, 144, 255, 0.8)";
                           e.target.style.color = "#add8e6";
                       }}
                       onMouseLeave={(e) => {
                           e.target.style.textShadow = "none";
                           e.target.style.color = "#4682b4";
                       }}
                   >
                       Forgot password?
            </a>
            <br/>
            <a
                href="Companyregistration"
                style={{ ...styles.forgotPassword, ...styles.forgotPasswordLink }}
                onMouseEnter={(e) => {
                    e.target.style.textShadow = "0 0 5px rgba(30, 144, 255, 0.8)";
                    e.target.style.color = "#add8e6";
                }}
                onMouseLeave={(e) => {
                    e.target.style.textShadow = "none";
                    e.target.style.color = "#4682b4";
                }}
            >
Don't have an account?
            </a>
               </div>
    );
};

const styles = {  
  body: {  
      backgroundImage: "url('./assets/ims-chart.png')",
      backgroundSize: "cover",  
      backgroundRepeat: "no-repeat",  
      backgroundPosition: "center",  
      height: "100vh",  
      margin: "0",  
      fontFamily: "'Courier New', Courier, monospace",  
  },  
  container: {  
      width: "500px",  
      margin: "0 auto",  
      padding: "25px",  
      background: "linear-gradient(135deg, #add8e6, #e0ffff)",  
      borderRadius: "15px",  
      boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",  
      fontFamily: "'Courier New', Courier, monospace",  
      border: "2px solid #4682b4",  
      animation: "fadeIn 1.5s ease-in-out",  
  },  
  title: {  
      textAlign: "center",  
      color: "#1e90ff",  
      marginBottom: "25px",  
      fontSize: "28px",  
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",  
      letterSpacing: "2px",  
  },  
  form: {  
      display: "flex",  
      flexDirection: "column",  
      gap: "20px",  
      background: "rgba(255, 255, 255, 0.8)",  
      padding: "20px",  
      borderRadius: "10px",  
      boxShadow: "inset 0 4px 6px rgba(0, 0, 0, 0.1)",  
  },  
  inputGroup: {  
      marginBottom: "15px",  
      display: "flex",  
      flexDirection: "column",  
  },  
  label: {  
      fontWeight: "bold",  
      color: "#00008b",  
      fontSize: "16px",  
      textTransform: "uppercase",  
      letterSpacing: "1px",  
  },  
  input: {  
      width: "95%",  
      padding: "12px",  
      border: "2px solid #4682b4",  
      borderRadius: "8px",  
      fontSize: "15px",  
      background: "rgba(255, 255, 255, 0.9)",  
      transition: "transform 0.3s ease, box-shadow 0.3s ease",  
  },  
  inputFocus: {  
      transform: "scale(1.05)",  
      boxShadow: "0 0 10px rgba(30, 144, 255, 0.5)",  
      outline: "none",  
  },  
  select: {  
      width: "100%",  
      padding: "12px",  
      border: "2px solid #4682b4",  
      borderRadius: "8px",  
      fontSize: "15px",  
      background: "rgba(255, 255, 255, 0.9)",  
      transition: "transform 0.3s ease, box-shadow 0.3s ease",  
  },  
  button: {  
      background: "linear-gradient(135deg, #4682b4, #add8e6)",  
      color: "white",  
      padding: "12px 20px",  
      border: "none",  
      borderRadius: "8px",  
      cursor: "pointer",  
      fontSize: "18px",  
      fontWeight: "bold",  
      textTransform: "uppercase",  
      letterSpacing: "1px",  
      transition: "background 0.3s ease, transform 0.3s ease",  
  },  
  buttonHover: {  
      background: "linear-gradient(135deg, #add8e6, #4682b4)",  
      transform: "translateY(-3px)",  
  },  
  forgotPassword: {  
      textAlign: "center",  
      marginTop: "25px",  
      color: "#1e90ff",  
      fontSize: "16px",  
      fontWeight: "bold",  
  },  
  forgotPasswordLink: {  
      textDecoration: "none",  
      color: "inherit",  
      transition: "color 0.3s ease, text-shadow 0.3s ease",  
  },  
  forgotPasswordLinkHover: {  
      textShadow: "0 0 5px rgba(30, 144, 255, 0.8)",  
      color: "#add8e6",  
  },  
  "@keyframes fadeIn": {  
      from: {  
          opacity: 0,  
          transform: "translateY(-10px)",  
      },  
      to: {  
          opacity: 1,  
          transform: "translateY(0)",  
      },  
  },  
};
export default LoginPage;