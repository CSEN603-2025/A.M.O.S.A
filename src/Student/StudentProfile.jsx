import React, { useState } from "react";
import '../CSS/StudentProfile.css';
import { FiBell, FiUser, FiAward, FiBook, FiBriefcase, FiSave, FiEdit3 } from 'react-icons/fi';
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

    const [isEditing, setIsEditing] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSave = () => {
        setIsEditing(false);
        setSaveMessage("Profile saved");
    };

    const renderInput = (name, type = "text") => (
        <input
            type={type}
            name={name}
            value={profile[name]}
            onChange={handleInputChange}
            disabled={!isEditing}
            style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 8,
                border: '1px solid var(--border)',
                fontSize: 15,
                backgroundColor: isEditing ? 'white' : '#f9fafb'
            }}
        />
    );

    const renderTextarea = (name, placeholder) => (
        <textarea
            name={name}
            value={profile[name]}
            onChange={handleInputChange}
            disabled={!isEditing}
            style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 8,
                border: '1px solid var(--border)',
                fontSize: 15,
                minHeight: '120px',
                resize: 'vertical',
                backgroundColor: isEditing ? 'white' : '#f9fafb'
            }}
            placeholder={placeholder}
        />
    );

    return (
        <StudentLayout>
            <main className="main-content" aria-label="Main Content">
                <h1 className="main-welcome" style={{ marginTop: 0, marginBottom: 32 }}>Student Profile</h1>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: '100%' }}>
                    {/* Personal Information Section */}
                    <div className="profile-section" style={sectionStyle}>
                        <SectionHeader icon={<FiUser />} title="Personal Information" />

                        <div style={{ display: 'grid', gap: 16 }}>
                            <div style={{ display: 'grid', gap: 8 }}>
                                <label style={labelStyle}>Name</label>
                                {renderInput("name")}
                            </div>

                            <div style={{ display: 'grid', gap: 8 }}>
                                <label style={labelStyle}>Email</label>
                                {renderInput("email", "email")}
                            </div>

                            <div style={{ display: 'grid', gap: 8 }}>
                                <label style={labelStyle}>Phone</label>
                                {renderInput("phone")}
                            </div>
                        </div>
                    </div>

                    {/* Academic Information Section */}
                    <div className="profile-section" style={sectionStyle}>
                        <SectionHeader icon={<FiBook />} title="Academic Information" />

                        <div style={{ display: 'grid', gap: 16 }}>
                            <div style={{ display: 'grid', gap: 8 }}>
                                <label style={labelStyle}>Major</label>
                                <select
                                    name="major"
                                    value={profile.major}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    style={selectStyle(isEditing)}
                                >
                                    <option value="">Select Major</option>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Business Administration">Business Administration</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Arts">Arts</option>
                                </select>
                            </div>

                            <div style={{ display: 'grid', gap: 8 }}>
                                <label style={labelStyle}>Semester</label>
                                <select
                                    name="semester"
                                    value={profile.semester}
                                    onChange={handleInputChange}
                                    disabled={!isEditing}
                                    style={selectStyle(isEditing)}
                                >
                                    <option value="">Select Semester</option>
                                    {[...Array(8)].map((_, i) => (
                                        <option key={i} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Job Interests Section */}
                    <div className="profile-section" style={sectionStyle}>
                        <SectionHeader icon={<FiBriefcase />} title="Job Interests" />
                        {renderTextarea("jobInterests", "Describe your job interests and career goals...")}
                    </div>

                    {/* Past Experiences Section */}
                    <div className="profile-section" style={sectionStyle}>
                        <SectionHeader icon={<FiAward />} title="Past Experiences" />
                        {renderTextarea("pastExperiences", "Describe your past work experiences, projects, or internships...")}
                    </div>
                </div>

                {/* PRO Badge Section */}
                <div style={{ ...sectionStyle, marginTop: 24 }}>
                    <SectionHeader icon={<FiAward />} title="PRO Badge Status" />
                    {profile.proBadge ? (
                        <Badge message="Congratulations! You have earned the PRO badge." color="#00C49F" />
                    ) : (
                        <Badge message="You have not earned the PRO badge yet." color="#FF6384" />
                    )}
                </div>

                {/* Edit / Save Button */}
                <div style={{ marginTop: 24 }}>
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSave}
                                style={actionButtonStyle}
                            >
                                <FiSave style={{ fontSize: 18 }} />
                                Save Profile
                            </button>
                            {saveMessage && (
                                <div style={{ marginTop: 12, fontWeight: 600, color: 'var(--primary)' }}>
                                    {saveMessage}
                                </div>
                            )}
                        </>
                    ) : (
                        <button
                            onClick={() => { setIsEditing(true); setSaveMessage(""); }}
                            style={actionButtonStyle}
                        >
                            <FiEdit3 style={{ fontSize: 18 }} />
                            Edit Profile
                        </button>
                    )}
                </div>
            </main>
        </StudentLayout>
    );
};

// Reusable components and styles
const SectionHeader = ({ icon, title }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        {React.cloneElement(icon, { style: { color: 'var(--primary)', fontSize: 22 } })}
        <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{title}</span>
    </div>
);

const Badge = ({ message, color }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '16px',
        background: `${color}1A`,
        borderRadius: 8,
        color,
        fontWeight: 600
    }}>
        <FiAward style={{ fontSize: 20 }} />
        <span>{message}</span>
    </div>
);

const sectionStyle = {
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(30,41,59,0.06)',
    padding: 24,
    border: '1px solid var(--border)'
};

const labelStyle = {
    fontWeight: 600,
    fontSize: 15
};

const selectStyle = (enabled) => ({
    width: '100%',
    padding: '12px 16px',
    borderRadius: 8,
    border: '1px solid var(--border)',
    fontSize: 15,
    backgroundColor: enabled ? 'white' : '#f9fafb'
});

const actionButtonStyle = {
    background: 'var(--primary)',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: 8,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontWeight: 600,
    fontSize: 16
};

export default StudentProfile;
