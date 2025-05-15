import React, { useState } from "react";
import '../CSS/StudentProfile.css';
import { FiBell, FiUser, FiAward, FiBook, FiBriefcase, FiSave } from 'react-icons/fi';
import StudentLayout from '../components/StudentLayout';

const StudentProfile = () => {
    const [profile, setProfile] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "123-456-7890",
        jobInterests: "",
        pastExperiences: "",
        major: "",
        semester: "",
        proBadge: false,
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
        <StudentLayout>
            <main className="main-content" aria-label="Main Content">
                <h1 className="main-welcome" style={{ marginTop: 0, marginBottom: 32 }}>Student Profile</h1>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: '100%' }}>
                    {/* Personal Information Section */}
                    <div className="profile-section" style={{
                        background: '#fff',
                        borderRadius: 12,
                        boxShadow: '0 2px 8px rgba(30,41,59,0.06)',
                        padding: 24,
                        border: '1px solid var(--border)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                            <FiUser style={{ color: 'var(--primary)', fontSize: 22 }} />
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Personal Information</span>
                        </div>

                        <div style={{ display: 'grid', gap: 16 }}>
                            <div style={{ display: 'grid', gap: 8 }}>
                                <label style={{ fontWeight: 600, fontSize: 15 }}>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: 8,
                                        border: '1px solid var(--border)',
                                        fontSize: 15
                                    }}
                                />
                            </div>

                            <div style={{ display: 'grid', gap: 8 }}>
                                <label style={{ fontWeight: 600, fontSize: 15 }}>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profile.email}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: 8,
                                        border: '1px solid var(--border)',
                                        fontSize: 15
                                    }}
                                />
                            </div>

                            <div style={{ display: 'grid', gap: 8 }}>
                                <label style={{ fontWeight: 600, fontSize: 15 }}>Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: 8,
                                        border: '1px solid var(--border)',
                                        fontSize: 15
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Academic Information Section */}
                    <div className="profile-section" style={{
                        background: '#fff',
                        borderRadius: 12,
                        boxShadow: '0 2px 8px rgba(30,41,59,0.06)',
                        padding: 24,
                        border: '1px solid var(--border)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                            <FiBook style={{ color: 'var(--primary)', fontSize: 22 }} />
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Academic Information</span>
                        </div>

                        <div style={{ display: 'grid', gap: 16 }}>
                            <div style={{ display: 'grid', gap: 8 }}>
                                <label style={{ fontWeight: 600, fontSize: 15 }}>Major</label>
                                <select
                                    name="major"
                                    value={profile.major}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: 8,
                                        border: '1px solid var(--border)',
                                        fontSize: 15,
                                        background: 'white'
                                    }}
                                >
                                    <option value="">Select Major</option>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Business Administration">Business Administration</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Arts">Arts</option>
                                </select>
                            </div>

                            <div style={{ display: 'grid', gap: 8 }}>
                                <label style={{ fontWeight: 600, fontSize: 15 }}>Semester</label>
                                <select
                                    name="semester"
                                    value={profile.semester}
                                    onChange={handleInputChange}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: 8,
                                        border: '1px solid var(--border)',
                                        fontSize: 15,
                                        background: 'white'
                                    }}
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
                            </div>
                        </div>
                    </div>

                    {/* Job Interests Section */}
                    <div className="profile-section" style={{
                        background: '#fff',
                        borderRadius: 12,
                        boxShadow: '0 2px 8px rgba(30,41,59,0.06)',
                        padding: 24,
                        border: '1px solid var(--border)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                            <FiBriefcase style={{ color: 'var(--primary)', fontSize: 22 }} />
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Job Interests</span>
                        </div>

                        <div style={{ display: 'grid', gap: 8 }}>
                            <textarea
                                name="jobInterests"
                                value={profile.jobInterests}
                                onChange={handleInputChange}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: 8,
                                    border: '1px solid var(--border)',
                                    fontSize: 15,
                                    minHeight: '120px',
                                    resize: 'vertical'
                                }}
                                placeholder="Describe your job interests and career goals..."
                            ></textarea>
                        </div>
                    </div>

                    {/* Past Experiences Section */}
                    <div className="profile-section" style={{
                        background: '#fff',
                        borderRadius: 12,
                        boxShadow: '0 2px 8px rgba(30,41,59,0.06)',
                        padding: 24,
                        border: '1px solid var(--border)'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                            <FiAward style={{ color: 'var(--primary)', fontSize: 22 }} />
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Past Experiences</span>
                        </div>

                        <div style={{ display: 'grid', gap: 8 }}>
                            <textarea
                                name="pastExperiences"
                                value={profile.pastExperiences}
                                onChange={handleInputChange}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    borderRadius: 8,
                                    border: '1px solid var(--border)',
                                    fontSize: 15,
                                    minHeight: '120px',
                                    resize: 'vertical'
                                }}
                                placeholder="Describe your past work experiences, projects, or internships..."
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* PRO Badge Section */}
                <div style={{
                    marginTop: 24,
                    background: '#fff',
                    borderRadius: 12,
                    boxShadow: '0 2px 8px rgba(30,41,59,0.06)',
                    padding: 24,
                    border: '1px solid var(--border)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                        <FiAward style={{ color: 'var(--primary)', fontSize: 22 }} />
                        <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>PRO Badge Status</span>
                    </div>

                    {profile.proBadge ? (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            padding: '16px',
                            background: 'rgba(0, 196, 159, 0.1)',
                            borderRadius: 8,
                            color: '#00C49F',
                            fontWeight: 600
                        }}>
                            <FiAward style={{ fontSize: 20 }} />
                            <span>Congratulations! You have earned the PRO badge.</span>
                        </div>
                    ) : (
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                            padding: '16px',
                            background: 'rgba(255, 99, 132, 0.1)',
                            borderRadius: 8,
                            color: '#FF6384',
                            fontWeight: 600
                        }}>
                            <FiAward style={{ fontSize: 20 }} />
                            <span>You have not earned the PRO badge yet.</span>
                        </div>
                    )}
                </div>

                {/* Save Button */}
                <button
                    onClick={handleSave}
                    style={{
                        marginTop: 24,
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        padding: '12px 32px',
                        borderRadius: 8,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        fontWeight: 600,
                        fontSize: 16
                    }}
                >
                    <FiSave style={{ fontSize: 18 }} />
                    Save Profile
                </button>
            </main>
        </StudentLayout>
    );
};

export default StudentProfile;