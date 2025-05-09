import React, { useState } from "react";
import '../CSS/InternshipManagement.css';

const InternshipManagement = () => {
    const [internships, setInternships] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        duration: "",
        paid: false,
        salary: "",
        skills: "",
        description: "",
    });
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            setInternships(
                internships.map((internship) =>
                    internship.id === formData.id ? formData : internship
                )
            );
            setIsEditing(false);
        } else {
            setInternships([
                ...internships,
                { ...formData, id: Date.now() },
            ]);
        }
        setFormData({
            id: null,
            duration: "",
            paid: false,
            salary: "",
            skills: "",
            description: "",
        });
    };

    const handleEdit = (id) => {
        const internship = internships.find((internship) => internship.id === id);
        setFormData(internship);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        setInternships(internships.filter((internship) => internship.id !== id));
    };

    return (
        <div className="management-wrapper">
            <header className="management-header">
                <h1 className="management-title">Internship Management</h1>
            </header>
            <main className="management-main">
                <section className="form-section">
                    <h2 className="section-title">{isEditing ? "Edit Internship" : "Create Internship"}</h2>
                    <form onSubmit={handleSubmit} className="form">
                        <label className="form-label">Duration</label>
                        <input
                            type="text"
                            name="duration"
                            value={formData.duration}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                        />
                        <label className="form-label">Paid</label>
                        <input
                            type="checkbox"
                            name="paid"
                            checked={formData.paid}
                            onChange={handleInputChange}
                            className="form-checkbox"
                        />
                        <label className="form-label">Salary</label>
                        <input
                            type="text"
                            name="salary"
                            value={formData.salary}
                            onChange={handleInputChange}
                            className="form-input"
                            disabled={!formData.paid}
                        />
                        <label className="form-label">Skills Required</label>
                        <input
                            type="text"
                            name="skills"
                            value={formData.skills}
                            onChange={handleInputChange}
                            className="form-input"
                            required
                        />
                        <label className="form-label">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            className="form-textarea"
                            required
                        ></textarea>
                        <button type="submit" className="action-button">
                            {isEditing ? "Update Internship" : "Create Internship"}
                        </button>
                    </form>
                </section>
                <section className="list-section">
                    <h2 className="section-title">All Internships</h2>
                    <ul className="internship-list">
                        {internships.map((internship) => (
                            <li key={internship.id} className="internship-item">
                                <p><strong>Duration:</strong> {internship.duration}</p>
                                <p><strong>Paid:</strong> {internship.paid ? "Yes" : "No"}</p>
                                <p><strong>Salary:</strong> {internship.paid ? internship.salary : "N/A"}</p>
                                <p><strong>Skills:</strong> {internship.skills}</p>
                                <p><strong>Description:</strong> {internship.description}</p>
                                <button onClick={() => handleEdit(internship.id)} className="action-button">Edit</button>
                                <button onClick={() => handleDelete(internship.id)} className="delete-button">Delete</button>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
};

export default InternshipManagement;
