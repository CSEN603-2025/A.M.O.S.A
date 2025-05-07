import React, { useState } from "react";
import "./CSS/SCADOfficeDashboard.css";

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
                    <a href="/" className="signout-button">Sign Out</a>
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
                        <li className="nav-item"><a href="/scad/Appointments" className="nav-link">Appointments</a></li>
                        <li className="nav-item"><a href="/scad/Calls" className="nav-link">Calls</a></li>
                        <li className="nav-item"> Workshops</li>
                    </ul>
                </aside>
                <main className="dashboard-main">
                    <h2>Manage Workshops</h2>
                    <button onClick={() => setShowModal(true)} className="create-btn">+ Create Workshop</button>

                    <ul className="workshop-list">
                        {workshops.map((workshop) => (
                            <li key={workshop.id} className="workshop-item">
                                <h3>{workshop.name}</h3>
                                <p><strong>Time:</strong> {workshop.startDate} to {workshop.endDate}</p>
                                <p><strong>Description:</strong> {workshop.description}</p>
                                <p><strong>Speaker:</strong> {workshop.speakerBio}</p>
                                <p><strong>Agenda:</strong> {workshop.agenda}</p>
                                <button onClick={() => handleEdit(workshop.id)} className="button-workshop-alo"> Edit</button>
                                <button onClick={() => handleDelete(workshop.id)} className="button-workshop-alop"> Delete</button>
                            </li>
                        ))}
                    </ul>
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
