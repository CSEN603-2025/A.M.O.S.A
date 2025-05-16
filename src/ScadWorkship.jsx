import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPhone } from "react-icons/fa";
import { FiBell, FiHome, FiBriefcase, FiList, FiInfo, FiUsers, FiFileText, FiBarChart2, FiCalendar, FiPhone as FiPhoneIcon, FiTool, FiEdit2, FiTrash2, FiUser, FiCalendar as FiCalendarIcon } from "react-icons/fi";
import './CSS/SCADOfficeDashboard.css';

import DashboardLayout from "./components/Layout";

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

const SCADWorkshop = () => {
    const [workshops, setWorkshops] = useState([
        {
            id: 1,
            name: "Resume Writing 101",
            startDate: "2025-06-01T10:00",
            endDate: "2025-06-01T12:00",
            description: "Learn to craft a compelling resume.",
            speakerBio: "Jane Doe, Career Coach",
            agenda: "Intro > Tips > Q&A"
        },
        {
            id: 2,
            name: "Portfolio Presentation",
            startDate: "2025-06-05T14:00",
            endDate: "2025-06-05T16:00",
            description: "Showcasing your work like a pro.",
            speakerBio: "John Smith, Industry Expert",
            agenda: "Presentation Skills > Demo > Review"
        }
    ]);

    const [formData, setFormData] = useState({
        name: "",
        startDate: "",
        endDate: "",
        description: "",
        speakerBio: "",
        agenda: ""
    });

    const [editingId, setEditingId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedWorkshop, setSelectedWorkshop] = useState(null);
    const navigate = useNavigate();
    const missedCalls = 5;
    const notifications = 3;

    const goToCalls = () => {
        navigate("/scad/Calls");
    };
    const goToNotifications = () => {
        navigate("/scad/noti");
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingId !== null) {
            setWorkshops((prev) =>
                prev.map((w) =>
                    w.id === editingId ? { ...formData, id: editingId } : w
                )
            );
            setEditingId(null);
        } else {
            setWorkshops([...workshops, { ...formData, id: Date.now() }]);
        }
        setFormData({
            name: "",
            startDate: "",
            endDate: "",
            description: "",
            speakerBio: "",
            agenda: ""
        });
        setShowModal(false);
    };
    const handleEdit = (id) => {
        const workshop = workshops.find((w) => w.id === id);
        setFormData(workshop);
        setEditingId(id);
        setShowModal(true);
    };
    const handleDelete = (id) => {
        setWorkshops((prev) => prev.filter((w) => w.id !== id));
    };
    const formatDateTime = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });
    };
    return (
        <DashboardLayout>
        <div style={{
    maxWidth: 1200,
    margin: "0 auto",
    padding: "0 32px",
    width: "100%",
    display: "flex",
    flexDirection: "column"
  }}>
                
                    <h1 className="main-welcome" style={{ marginTop: 0, marginBottom: 32 }}>Workshops</h1>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 24 }}>
                        <h2 className="section-title" style={{ margin: 0 }}>Upcoming & Past Workshops</h2>
                        <button
                            onClick={() => setShowModal(true)}
                            className="create-btn"
                            style={{ fontWeight: 600, fontSize: '1rem', padding: '0.5rem 1.2rem', background: 'var(--primary)'}}
                        >
                            + Create Workshop
                        </button>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, width: '100%' }}>
                        {workshops.map((workshop) => (
                            <div
                                key={workshop.id}
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
                                onClick={() => setSelectedWorkshop(workshop)}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                    <FiTool style={{ color: 'var(--primary)', fontSize: 22 }} />
                                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{workshop.name}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                    <FiCalendarIcon style={{ color: 'var(--accent)' }} />
                                    <span style={{ fontSize: 14 }}>{formatDateTime(workshop.startDate)} - {formatDateTime(workshop.endDate)}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                                    <FiUser style={{ color: 'var(--primary-dark)' }} />
                                    <span style={{ fontSize: 14 }}>{workshop.speakerBio}</span>
                                </div>
                                <div style={{ marginTop: 8, color: 'var(--text-light)', fontSize: 14 }}>
                                    {workshop.description}
                                </div>
                                <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                    {workshop.agenda.split('>').map((item, idx) => (
                                        <span key={idx} style={{ background: 'var(--accent)', color: '#fff', borderRadius: 8, padding: '2px 10px', fontSize: 12, fontWeight: 600 }}>{item.trim()}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
            {/* Workshop Details Modal */}
            {selectedWorkshop && (
                <div className="workshop-modal-backdrop">
                    <div className="workshop-modal">
                        <div className="modal-buttons">
                            <button onClick={() => setSelectedWorkshop(null)} className="signout-btn" style={{ background: 'var(--primary)' }}>Close</button>
                        </div>
                        <h2 style={{ marginBottom: 8 }}>{selectedWorkshop.name}</h2>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            <FiCalendarIcon style={{ color: 'var(--accent)' }} />
                            <span>{formatDateTime(selectedWorkshop.startDate)} - {formatDateTime(selectedWorkshop.endDate)}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                            <FiUser style={{ color: 'var(--primary-dark)' }} />
                            <span>{selectedWorkshop.speakerBio}</span>
                        </div>
                        <div style={{ marginBottom: 8 }}><strong>Description:</strong> {selectedWorkshop.description}</div>
                        <div style={{ marginBottom: 8 }}><strong>Agenda:</strong> {selectedWorkshop.agenda}</div>
                        <div className="modal-buttons" style={{ marginTop: 20, display: 'flex', gap: 12 }}>
                            <button
                                onClick={() => {
                                    handleEdit(selectedWorkshop.id);
                                    setSelectedWorkshop(null);
                                }}
                                className="icon-btn"
                                style={{ background: 'var(--primary)', color: '#fff', fontWeight: 600 }}
                            >
                                <FiEdit2 style={{ marginRight: 6 }} /> Edit
                            </button>
                            <button
                                onClick={() => {
                                    handleDelete(selectedWorkshop.id);
                                    setSelectedWorkshop(null);
                                }}
                                className="icon-btn"
                                style={{ background: 'var(--badge-bg)', color: '#fff', fontWeight: 600 }}
                            >
                                <FiTrash2 style={{ marginRight: 6 }} /> Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Create/Edit Modal */}
            {showModal && (
                <div className="workshop-modal-backdrop">
                    <div className="workshop-modal">
                        <h3 style={{ marginBottom: 16 }}>{editingId ? "Edit" : "Create"} Workshop</h3>
                        <form onSubmit={handleSubmit} className="workshop-modal-form" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                            <input type="text" name="name" placeholder="Workshop Name" value={formData.name} onChange={handleChange} required className="input" />
                            <input type="datetime-local" name="startDate" value={formData.startDate} onChange={handleChange} required className="input" />
                            <input type="datetime-local" name="endDate" value={formData.endDate} onChange={handleChange} required className="input" />
                            <textarea name="description" placeholder="Short Description" value={formData.description} onChange={handleChange} required className="input" />
                            <textarea name="speakerBio" placeholder="Speaker Bio" value={formData.speakerBio} onChange={handleChange} required className="input" />
                            <textarea name="agenda" placeholder="Workshop Agenda (use '>' to separate steps)" value={formData.agenda} onChange={handleChange} required className="input" />
                            <div className="modal-buttons" style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                                <button type="submit" className="signout-btn" style={{ background: 'var(--primary)' }}>{editingId ? "Update" : "Add"} Workshop</button>
                                <button type="button" onClick={() => { setShowModal(false); setEditingId(null); }} className="signout-btn" style={{ background: 'var(--badge-bg)' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default SCADWorkshop;