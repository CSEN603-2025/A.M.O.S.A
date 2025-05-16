import React, { useState, useEffect } from "react";
import '../CSS/StudentProfile.css';
import { FiBell, FiUser, FiAward, FiBook, FiBriefcase, FiSave, FiEdit, FiBarChart2 } from 'react-icons/fi';
import ProstudentLayout from "../components/prostudentLayout";

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

    const [assessmentScores] = useState([
        { id: 1, assessment: "Technical Skills", score: 85, date: "2023-10-15", maxScore: 100 },
        { id: 2, assessment: "Communication", score: 78, date: "2023-10-20", maxScore: 100 },
        { id: 3, assessment: "Problem Solving", score: 92, date: "2023-11-05", maxScore: 100 },
        { id: 4, assessment: "Teamwork", score: 88, date: "2023-11-12", maxScore: 100 },
    ]);

    const [isEditing, setIsEditing] = useState(false);
    const [showMessage, setShowMessage] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSave = () => {
        setIsEditing(false);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
        // Add logic to save the updated profile information
    };

    return (
        <ProstudentLayout>
            <main className="main-content" aria-label="Main Content">
                <h1 className="main-welcome" style={{ marginTop: 0, marginBottom: 32 }}>Student Profile</h1>

                {/* Flash message */}
                {showMessage && (
                    <div style={{
                        marginBottom: 20,
                        padding: '10px 20px',
                        backgroundColor: '#00C49F',
                        color: 'white',
                        borderRadius: 8,
                        transition: 'opacity 0.5s ease'
                    }}>
                        Profile information saved!
                    </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: '100%' }}>
                    {/* Personal Information Section */}
                    <div className="profile-section" style={sectionStyle}>
                        <SectionHeader icon={<FiUser />} title="Personal Information" />

                        <ProfileInput label="Name" name="name" value={profile.name} onChange={handleInputChange} editable={isEditing} />
                        <ProfileInput label="Email" name="email" value={profile.email} onChange={handleInputChange} editable={isEditing} type="email" />
                        <ProfileInput label="Phone" name="phone" value={profile.phone} onChange={handleInputChange} editable={isEditing} />
                    </div>

                    {/* Academic Information Section */}
                    <div className="profile-section" style={sectionStyle}>
                        <SectionHeader icon={<FiBook />} title="Academic Information" />

                        <ProfileSelect label="Major" name="major" value={profile.major} onChange={handleInputChange} editable={isEditing} options={["Computer Science", "Business Administration", "Engineering", "Arts"]} />
                        <ProfileSelect label="Semester" name="semester" value={profile.semester} onChange={handleInputChange} editable={isEditing} options={["1","2","3","4","5","6","7","8"]} />
                    </div>

                    {/* Job Interests */}
                    <div className="profile-section" style={sectionStyle}>
                        <SectionHeader icon={<FiBriefcase />} title="Job Interests" />
                        <ProfileTextarea name="jobInterests" value={profile.jobInterests} onChange={handleInputChange} editable={isEditing} placeholder="Describe your job interests and career goals..." />
                    </div>

                    {/* Past Experiences */}
                    <div className="profile-section" style={sectionStyle}>
                        <SectionHeader icon={<FiAward />} title="Past Experiences" />
                        <ProfileTextarea name="pastExperiences" value={profile.pastExperiences} onChange={handleInputChange} editable={isEditing} placeholder="Describe your past work experiences, projects, or internships..." />
                    </div>
                </div>

                {/* Assessment Scores */}
                <div style={{ ...sectionStyle, marginTop: 24 }}>
                    <SectionHeader icon={<FiBarChart2 />} title="Assessment Scores" />
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                                    <th style={tableThStyle}>Assessment</th>
                                    <th style={tableThStyle}>Score</th>
                                    <th style={tableThStyle}>Date Taken</th>
                                    <th style={tableThStyle}>Percentage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assessmentScores.map((a) => (
                                    <tr key={a.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                        <td style={tableTdStyle}>{a.assessment}</td>
                                        <td style={tableTdStyle}>{a.score}/{a.maxScore}</td>
                                        <td style={tableTdStyle}>{a.date}</td>
                                        <td style={tableTdStyle}>
                                            <div style={{ width: '100%', backgroundColor: 'rgba(0, 196, 159, 0.1)', borderRadius: 4 }}>
                                                <div style={{
                                                    width: `${(a.score / a.maxScore) * 100}%`,
                                                    backgroundColor: '#00C49F',
                                                    height: 24,
                                                    borderRadius: 4,
                                                    color: 'white',
                                                    fontWeight: 600,
                                                    fontSize: 12,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'flex-end',
                                                    paddingRight: 8
                                                }}>
                                                    {Math.round((a.score / a.maxScore) * 100)}%
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* PRO Badge Section */}
                <div style={{ ...sectionStyle, marginTop: 24 }}>
                    <SectionHeader icon={<FiAward />} title="PRO Badge Status" />
                    {profile.proBadge ? (
                        <div style={badgeStyle('#00C49F', 'rgba(0, 196, 159, 0.1)')}>
                            <FiAward style={{ fontSize: 20 }} />
                            <span>Congratulations! You have earned the PRO badge.</span>
                        </div>
                    ) : (
                        <div style={badgeStyle('#FF6384', 'rgba(255, 99, 132, 0.1)')}>
                            <FiAward style={{ fontSize: 20 }} />
                            <span>You have not earned the PRO badge yet.</span>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div style={{ marginTop: 24 }}>
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            style={actionButtonStyle}
                        >
                            <FiEdit style={{ fontSize: 18 }} /> Edit Profile
                        </button>
                    ) : (
                        <button
                            onClick={handleSave}
                            style={actionButtonStyle}
                        >
                            <FiSave style={{ fontSize: 18 }} /> Save Profile
                        </button>
                    )}
                </div>
            </main>
        </ProstudentLayout>
    );
};

const SectionHeader = ({ icon, title }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
        {React.cloneElement(icon, { style: { color: 'var(--primary)', fontSize: 22 } })}
        <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{title}</span>
    </div>
);

const ProfileInput = ({ label, name, value, onChange, editable, type = "text" }) => (
    <div style={{ display: 'grid', gap: 8, marginBottom: 16 }}>
        <label style={{ fontWeight: 600, fontSize: 15 }}>{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            disabled={!editable}
            style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 8,
                border: '1px solid var(--border)',
                fontSize: 15,
                background: editable ? 'white' : '#f9f9f9',
                cursor: editable ? 'text' : 'not-allowed'
            }}
        />
    </div>
);

const ProfileSelect = ({ label, name, value, onChange, editable, options }) => (
    <div style={{ display: 'grid', gap: 8, marginBottom: 16 }}>
        <label style={{ fontWeight: 600, fontSize: 15 }}>{label}</label>
        <select
            name={name}
            value={value}
            onChange={onChange}
            disabled={!editable}
            style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 8,
                border: '1px solid var(--border)',
                fontSize: 15,
                background: editable ? 'white' : '#f9f9f9',
                cursor: editable ? 'pointer' : 'not-allowed'
            }}
        >
            <option value="">Select {label}</option>
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);

const ProfileTextarea = ({ name, value, onChange, editable, placeholder }) => (
    <textarea
        name={name}
        value={value}
        onChange={onChange}
        disabled={!editable}
        placeholder={placeholder}
        style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: 8,
            border: '1px solid var(--border)',
            fontSize: 15,
            minHeight: '120px',
            resize: 'vertical',
            background: editable ? 'white' : '#f9f9f9',
            cursor: editable ? 'text' : 'not-allowed'
        }}
    ></textarea>
);

const sectionStyle = {
    background: '#fff',
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(30,41,59,0.06)',
    padding: 24,
    border: '1px solid var(--border)'
};

const badgeStyle = (color, background) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '16px',
    background: background,
    borderRadius: 8,
    color: color,
    fontWeight: 600
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

const tableThStyle = {
    textAlign: 'left',
    padding: '12px 16px',
    fontWeight: 600
};

const tableTdStyle = {
    padding: '12px 16px'
};

export default PROStudentProfile;