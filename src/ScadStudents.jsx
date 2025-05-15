import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPhone } from "react-icons/fa";
import { FiBell, FiHome, FiBriefcase, FiList, FiInfo, FiUsers, FiFileText, FiBarChart2, FiCalendar, FiPhone as FiPhoneIcon, FiTool } from "react-icons/fi";
import './CSS/SCADOfficeDashboard.css';
import DashboardLayout from './components/Layout';

const navItems = [
  { label: "Home", icon: <FiHome />, link: "/scad" },
  { label: "Pending Company Applications", icon: <FiBriefcase />, link: "/scad/companies" },
  { label: "All Internships", icon: <FiList />, link: "/scad/interns" },
  { label: "Current Cycle Information", icon: <FiInfo />, link: "/scad/cycle" },
  { label: "View Students", icon: <FiUsers />, link: "/scad/students" },
  { label: "View Reports", icon: <FiFileText />, link: "/scad/reports" },
  { label: "Statistics", icon: <FiBarChart2 />, link: "/scad/Statistics" },
  { label: "Appointments", icon: <FiCalendar />, link: "/scad/Appointmnets" },
  { label: "Calls", icon: <FiPhoneIcon />, link: "/scad/Calls" },
  { label: "Workshop", icon: <FiTool />, link: "/scad/Workshop" },
];

const students = [
    {
        id: 1,
        name: "Sara Ahmed",
        major: "Computer Science",
        email: "sara@guc.edu.eg",
        phone: "01012345678",
        jobInterests: "Backend Development, Cloud Engineering",
        experience: "Interned at Microsoft Egypt",
        semester: 7,
        internshipStatus: "Accepted",
        hasProBadge: true,
    },
    {
        id: 2,
        name: "Mohamed Tarek",
        major: "Medicine",
        email: "mohamed@guc.edu.eg",
        phone: "01098765432",
        jobInterests: "Dermatology",
        experience: "Interned at KAUH",
        semester: 6,
        internshipStatus: "Pending",
        hasProBadge: false,
    },
    {
        id: 3,
        name: "Layla Nasser",
        major: "Media Engineering",
        email: "layla@guc.edu.eg",
        phone: "01123456789",
        jobInterests: "UI/UX Design, Frontend Development",
        experience: "Freelance projects",
        semester: 8,
        internshipStatus: "Rejected",
        hasProBadge: true,
    },
];

const statusColors = {
    Accepted: "#00C49F",
    Pending: "#FFBB28",
    Rejected: "#FF6384"
};

const SCADStudent = () => {
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [filterStatus, setFilterStatus] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const missedCalls = 5;
    const notifications = 3;

    const goToCalls = () => {
        navigate("/scad/Calls");
    };
    const goToNotifications = () => {
        navigate("/scad/noti");
    };
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
    };
    const filteredStudents = students.filter((student) => {
        return (filterStatus === "All" || student.internshipStatus === filterStatus) &&
            (student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.major.toLowerCase().includes(searchTerm.toLowerCase()));
    });
    return (
        <DashboardLayout>
                <main className="main-content" aria-label="Main Content">
                    {/* Unique content for Students page starts here */}
                    <h1 className="main-welcome" style={{ marginTop: 0, marginBottom: 32 }}>Students Directory</h1>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 24 }}>
                        <h2 className="section-title" style={{ margin: 0 }}>Browse Students</h2>
                        <div style={{ display: 'flex', gap: 12 }}>
                            <input
                                type="text"
                                placeholder="Search by name or major"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="input"
                                style={{ maxWidth: 220, height: 40, borderRadius: 8, border: '1px solid var(--border)', padding: '0 14px', fontSize: 16, background: '#fff', color: 'var(--text)' }}
                            />
                            <select
                                name="status"
                                value={filterStatus}
                                onChange={handleFilterChange}
                                className="input"
                                style={{ maxWidth: 180, height: 40, borderRadius: 8, border: '1px solid var(--border)', padding: '0 14px', fontSize: 16, background: '#fff', color: 'var(--text)' }}
                            >
                                <option value="All">All Students Status</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Pending">Pending</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, width: '100%' }}>
                        {filteredStudents.map((student) => (
                            <div
                                key={student.id}
                                className="internship-item"
                                style={{
                                    minWidth: 340,
                                    maxWidth: 400,
                                    background: '#fff',
                                    borderRadius: 12,
                                    boxShadow: '0 2px 8px rgba(30,41,59,0.06)',
                                    padding: 28,
                                    marginBottom: 24,
                                    cursor: 'pointer',
                                    position: 'relative',
                                    border: '1px solid var(--border)'
                                }}
                                onClick={() => setSelectedStudent(student)}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                    <FiUsers style={{ color: 'var(--primary)', fontSize: 22 }} />
                                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{student.name}</span>
                                    {student.hasProBadge && (
                                        <span style={{ background: '#2563eb', color: '#fff', borderRadius: 8, padding: '2px 10px', fontSize: 12, fontWeight: 600, marginLeft: 8 }}>PRO</span>
                                    )}
                                </div>
                                <div style={{ fontSize: 14, marginBottom: 4 }}><strong>Major:</strong> {student.major}</div>
                                <div style={{ fontSize: 14, marginBottom: 4 }}><strong>Semester:</strong> {student.semester}</div>
                                <div style={{ fontSize: 14, marginBottom: 4 }}><strong>Status:</strong> <span style={{ color: statusColors[student.internshipStatus], fontWeight: 600 }}>{student.internshipStatus}</span></div>
                                <div style={{ marginTop: 8, color: 'var(--text-light)', fontSize: 14 }}>
                                    <strong>Interests:</strong> {student.jobInterests}
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Student Details Modal */}
                    {selectedStudent && (
                        <div className="workshop-modal-backdrop">
                            <div className="workshop-modal">
                                <div className="modal-buttons">
                                    <button onClick={() => setSelectedStudent(null)} className="signout-btn" style={{ background: 'var(--primary)' }}>Close</button>
                                </div>
                                <h2 style={{ marginBottom: 8 }}>{selectedStudent.name}</h2>
                                <div style={{ fontSize: 15, marginBottom: 8 }}><strong>Email:</strong> {selectedStudent.email}</div>
                                <div style={{ fontSize: 15, marginBottom: 8 }}><strong>Phone:</strong> {selectedStudent.phone}</div>
                                <div style={{ fontSize: 15, marginBottom: 8 }}><strong>Major:</strong> {selectedStudent.major}</div>
                                <div style={{ fontSize: 15, marginBottom: 8 }}><strong>Semester:</strong> {selectedStudent.semester}</div>
                                <div style={{ fontSize: 15, marginBottom: 8 }}><strong>Job Interests:</strong> {selectedStudent.jobInterests}</div>
                                <div style={{ fontSize: 15, marginBottom: 8 }}><strong>Past Experience:</strong> {selectedStudent.experience}</div>
                                <div style={{ fontSize: 15, marginBottom: 8 }}><strong>Internship Status:</strong> <span style={{ color: statusColors[selectedStudent.internshipStatus], fontWeight: 600 }}>{selectedStudent.internshipStatus}</span></div>
                                <div style={{ fontSize: 15, marginBottom: 8 }}><strong>Pro Badge:</strong> {selectedStudent.hasProBadge ? "Yes" : "No"}</div>
                            </div>
                        </div>
                    )}
                    {/* Unique content for Students page ends here */}
                </main>
               </DashboardLayout>
    );
};

export default SCADStudent;