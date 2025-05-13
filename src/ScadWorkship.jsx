import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaPhone, FaBell } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import "./CSS/SCADOfficeDashboard.css";
import "./CSS/browseInternships.css";

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
    const location = useLocation();

    // Example numbers for calls and notifications
    const missedCalls = 5;
    const notifications = 3;

    const goToCalls = () => {
        navigate("/scad/Calls");
    };

    const goToNotifications = () => {
        navigate("/scad/noti", { state: { from: location.pathname } });
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

    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                <div className="header-left">
                    <h1 className="dashboard-title">SCAD Office Dashboard</h1>
                </div>
                <div className="header-right">
                    <div className="header-icons">
                        {/* Calls Button with Badge */}
                        <button onClick={goToCalls} className="notification-bell">
                            <FaPhone />
                            <span className="call-badge">{missedCalls}</span>
                        </button>

                        {/* Notifications Button with Badge */}
                        <button onClick={goToNotifications} className="notification-bell">
                            <FiBell size={24} />
                            <span className="notification-badge">{notifications}</span>
                        </button>

                        <a href="/" className="signout-button">Sign Out</a>
                    </div>
                </div>
            </header>
            <div className="dashboard-content">
                <aside className="dashboard-sidebar">
                    <h2 className="sidebar-title">Navigation</h2>
                    <ul className="nav-list">
                        <li className="nav-item"><a href="/scadOfficeDashboard" className="nav-link">Home</a></li>
                        <li className="nav-item"><a href="/scad/companies" className="nav-link">Pending Company Applications</a></li>
                        <li className="nav-item"><a href="/scad/interns" className="nav-link">All Internships</a></li>
                        <li className="nav-item"><a href="/scad/cycle" className="nav-link">Current Cycle Information</a></li>
                        <li className="nav-item"><a href="/scad/students" className="nav-link">View Students</a></li>
                        <li className="nav-item"><a href="/scad/reports" className="nav-link">View Reports</a></li>
                        <li className="nav-item"><a href="/scad/Statistics" className="nav-link">Statistics</a></li>
                        <li className="nav-item"><a href="/scad/Appointmnets" className="nav-link">Appointments</a></li>
                        <li className="nav-item"><a href="/scad/Calls" className="nav-link">Calls</a></li>
                        <li className="nav-item">Workshops</li>
                    </ul>
                </aside>
                <main className="dashboard-main">
                    <div className="browser-wrapper">
                        <header className="browser-header">
                            <h1 className="browser-title">Manage Workshops</h1>
                        </header>
                        <main className="browser-main">
                            <section className="filter-section">
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="create-btn"
                                    style={{ marginBottom: '20px' }}
                                >
                                    + Create Workshop
                                </button>
                            </section>
                            <section className="list-section">
                                <h2 className="section-title">Available Workshops</h2>
                                <ul className="internship-list">
                                    {workshops.map((workshop) => (
                                        <li
                                            key={workshop.id}
                                            className="internship-item"
                                            onClick={() => setSelectedWorkshop(workshop)}
                                        >
                                            <p><strong>{workshop.name}</strong></p>
                                            <p><strong>Time:</strong> {new Date(workshop.startDate).toLocaleString()} to {new Date(workshop.endDate).toLocaleString()}</p>
                                            <p><strong>Speaker:</strong> {workshop.speakerBio}</p>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        </main>
                        {selectedWorkshop && (
                            <div className="workshop-modal-backdrop">
                                <div className="workshop-modal">
                                    <div className="modal-buttons">
                                        <button onClick={() => setSelectedWorkshop(null)}>
                                            Close
                                        </button>
                                    </div>
                                    <h2>{selectedWorkshop.name}</h2>
                                    <p><strong>Time:</strong> {new Date(selectedWorkshop.startDate).toLocaleString()} to {new Date(selectedWorkshop.endDate).toLocaleString()}</p>
                                    <p><strong>Description:</strong> {selectedWorkshop.description}</p>
                                    <p><strong>Speaker:</strong> {selectedWorkshop.speakerBio}</p>
                                    <p><strong>Agenda:</strong> {selectedWorkshop.agenda}</p>
                                    <div className="modal-buttons" style={{ marginTop: '20px' }}>
                                        <button
                                            onClick={() => {
                                                handleEdit(selectedWorkshop.id);
                                                setSelectedWorkshop(null);
                                            }}
                                            className="button-workshop-alo"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleDelete(selectedWorkshop.id);
                                                setSelectedWorkshop(null);
                                            }}
                                            className="button-workshop-alop"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {showModal && (
                <div className="workshop-modal-backdrop">
                    <div className="workshop-modal">
                        <h3>{editingId ? "Edit" : "Create"} Workshop</h3>
                        <form onSubmit={handleSubmit} className="workshop-modal-form">
                            <input type="text" name="name" placeholder="Workshop Name" value={formData.name} onChange={handleChange} required />
                            <input type="datetime-local" name="startDate" value={formData.startDate} onChange={handleChange} required />
                            <input type="datetime-local" name="endDate" value={formData.endDate} onChange={handleChange} required />
                            <textarea name="description" placeholder="Short Description" value={formData.description} onChange={handleChange} required />
                            <textarea name="speakerBio" placeholder="Speaker Bio" value={formData.speakerBio} onChange={handleChange} required />
                            <textarea name="agenda" placeholder="Workshop Agenda" value={formData.agenda} onChange={handleChange} required />
                            <div className="modal-buttons">
                                <button type="submit">{editingId ? "Update" : "Add"} Workshop</button>
                                <button type="button" onClick={() => { setShowModal(false); setEditingId(null); }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <footer className="dashboard-footer">
                <p>&copy; 2025 SCAD System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default SCADWorkshop;