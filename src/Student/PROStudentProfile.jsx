import React, { useState } from "react";
import '../CSS/StudentProfile.css';
import { FiBell } from 'react-icons/fi'; // Bell icon

const PROStudentProfile = () => {
    const [profile, setProfile] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "123-456-7890",
        jobInterests: "",
        pastExperiences: "",
        major: "",
        semester: "",
        proBadge: true,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSave = () => {
        alert("Profile information saved!");
        // Add logic to save the updated profile information
    };

    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                <div className="header-left">
                    <h1 className="dashboard-title">PRO Student Profile</h1>
                </div>
                <div className="header-right">
                    <a href="/" className="signout-button">Sign Out</a>
                </div>
            </header>

            <div className="dashboard-content">
                <aside className="dashboard-sidebar">
                    <div className="notification-widget">
                        <a href="/PROStudentNotifications" className="notification-link">
                            <FiBell size={18} className="bell-icon" />
                            <span>Notifications</span>
                        </a>
                    </div>

                    <h2 className="sidebar-title">Navigation</h2>
                    <ul className="nav-list">
                        <li className="nav-item"><a href="/PROStudentDashboard" className="nav-link">Home</a></li>
                        <li className="nav-item"><a href="/PROStudentinternship" className="nav-link">Browse Internships</a></li>
                        <li className="nav-item"><a href="/PROStudentApplied" className="nav-link">View Applied Internships</a></li>
                        <li className="nav-item">My Profile</li>
                        <li className="nav-item"><a href="/PROMyInternships" className="nav-link">My Internships</a></li>
                        <li className="nav-item"><a href="/student/appointments" className="nav-link">Appointments</a></li>

                        <li className="nav-item"><a href="/student/Calls" className="nav-link">Calls</a></li>
                        <li className="nav-item"><a href="/student/viewed" className="nav-link">Viewed my profile</a></li>
                        <li className="nav-item"><a href="/student/assessment" className="nav-link">Online assessments</a></li>

                        <li className="nav-item"><a href="/student/workshop" className="nav-link">Workshop</a></li>
                        <li className="nav-item"><a href="/PreRecord" className="nav-link">Pre-recorded workshops</a></li>
                    </ul>
                </aside>

                <main className="dashboard-main">
                    <section className="info-section">
                        <h2 className="section-title">Personal Information</h2>
                        <form className="info-form">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                            <label className="form-label">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={profile.phone}
                                onChange={handleInputChange}
                                className="form-input"
                            />
                        </form>
                    </section>

                    <section className="interests-section">
                        <h2 className="section-title">Job Interests and Past Experiences</h2>
                        <label className="form-label">Job Interests</label>
                        <textarea
                            name="jobInterests"
                            value={profile.jobInterests}
                            onChange={handleInputChange}
                            className="form-textarea"
                        ></textarea>
                        <label className="form-label">Past Experiences</label>
                        <textarea
                            name="pastExperiences"
                            value={profile.pastExperiences}
                            onChange={handleInputChange}
                            className="form-textarea"
                        ></textarea>
                    </section>

                    <section className="academic-section">
                        <h2 className="section-title">Academic Information</h2>
                        <label className="form-label">Major</label>
                        <select
                            name="major"
                            value={profile.major}
                            onChange={handleInputChange}
                            className="form-select"
                        >
                            <option value="">Select Major</option>
                            <option value="Computer Science">Computer Science</option>
                            <option value="Business Administration">Business Administration</option>
                            <option value="Engineering">Engineering</option>
                            <option value="Arts">Arts</option>
                        </select>
                        <label className="form-label">Semester</label>
                        <select
                            name="semester"
                            value={profile.semester}
                            onChange={handleInputChange}
                            className="form-select"
                        >
                            <option value="">Select Semester</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>
                    </section>

                    <section className="badge-section">
                        <h2 className="section-title">PRO Badge</h2>
                        {profile.proBadge ? (
                            <p className="badge-earned">Congratulations! You have earned the PRO badge.</p>
                        ) : (
                            <p className="badge-not-earned">You have not earned the PRO badge yet.</p>
                        )}
                    </section>

                    <button onClick={handleSave} className="action-button">Save Profile</button>
                </main>
            </div>

            <footer className="dashboard-footer">
                <p>&copy; 2025 SCAD System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default PROStudentProfile;
