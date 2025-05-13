import React, { useState } from "react";
import './CSS/CompanyDashboard.css';
import { useNavigate } from 'react-router-dom';
import { FiBell } from 'react-icons/fi';

const CompanyInternships = () => {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([
        {
            id: 1,
            name: "Frontend Developer Intern",
            duration: "3 months",
            paid: "paid",
            salary: "1000",
            skills: "React, JavaScript, HTML, CSS",
            description: "Build and maintain UI components for our web platform."
        },
        {
            id: 2,
            name: "Data Science Intern",
            duration: "6 months",
            paid: "unpaid",
            salary: "",
            skills: "Python, Pandas, Machine Learning",
            description: "Assist in analyzing large datasets and developing ML models."
        },
        {
            id: 3,
            name: "Digital Marketing Intern",
            duration: "2 months",
            paid: "paid",
            salary: "500",
            skills: "SEO, Social Media, Google Analytics",
            description: "Help create marketing campaigns and analyze their performance."
        }
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("all");
    const [showForm, setShowForm] = useState(false);
    const [editPostId, setEditPostId] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        duration: "",
        paid: "unpaid",
        salary: "",
        skills: "",
        description: ""
    });

    const dummyApplicationCounts = {
        1: 12,
        2: 5,
        3: 8
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCreateOrUpdate = () => {
        if (editPostId !== null) {
            setPosts(prev =>
                prev.map(post =>
                    post.id === editPostId ? { ...formData, id: editPostId } : post
                )
            );
        } else {
            const newPost = {
                ...formData,
                id: Date.now()
            };
            setPosts(prev => [...prev, newPost]);
        }

        setFormData({
            name: "",
            duration: "",
            paid: "unpaid",
            salary: "",
            skills: "",
            description: ""
        });
        setEditPostId(null);
        setShowForm(false);
    };

    const handleEdit = (post) => {
        setFormData(post);
        setEditPostId(post.id);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        setPosts(prev => prev.filter(post => post.id !== id));
    };

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter =
            filter === "all" ||
            (filter === "paid" && post.paid === "paid") ||
            (filter === "unpaid" && post.paid === "unpaid");

        return matchesSearch && matchesFilter;
    });

    const handleBellClick = () => {
        navigate('/CompanyNotifications');
    };

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                <h1 className="dashboard-title">Company Internships</h1>
                <div className="dashboard-actions">
                    <button className="notification-bell" onClick={handleBellClick} title="Notifications">
                        <FiBell size={24} />
                        <span className="notification-count">3</span>
                    </button>
                    <button className="signout-button" onClick={handleLogout}>
                        Sign Out
                    </button>
                </div>
            </header>

            <div className="dashboard-content">
                <aside className="dashboard-sidebar">
                    <h2 className="sidebar-title">Navigation</h2>
                    <ul className="nav-list">
                        <li className="nav-item"><a href="/CompanyDashboard" className="nav-link">Home</a></li>
                        <li className="nav-item">My Internship Posts</li>
                        <li className="nav-item"><a href="/company/applications" className="nav-link">Applications</a></li>
                        <li className="nav-item"><a href="/CompanyCurrentInterns" className="nav-link">Current Interns</a></li>
                        <li className="nav-item"><a href="/CompanyAll" className="nav-link">All Internships</a></li>
                        <li className="nav-item"><a href="/CompanyDocs" className="nav-link">Reports and Documents</a></li>
                    </ul>
                </aside>

                <main className="dashboard-main">
                    <div className="filter-bar" style={{ marginBottom: "20px", display: "flex", gap: "10px", alignItems: "center" }}>
                        <input
                            type="text"
                            placeholder="Search by internship name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                flex: 1,
                                padding: "10px",
                                borderRadius: "6px",
                                border: "1px solid #ccc",
                                fontSize: "16px"
                            }}
                        />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            style={{
                                padding: "10px",
                                borderRadius: "6px",
                                fontSize: "16px"
                            }}
                        >
                            <option value="all">All</option>
                            <option value="paid">Paid</option>
                            <option value="unpaid">Unpaid</option>
                        </select>
                        <button className="action-button" onClick={() => {
                            setFormData({
                                name: "",
                                duration: "",
                                paid: "unpaid",
                                salary: "",
                                skills: "",
                                description: ""
                            });
                            setEditPostId(null);
                            setShowForm(true);
                        }}>
                            Create Post
                        </button>
                    </div>

                    {showForm && (
                        <div style={{
                            background: "#f9f9f9",
                            border: "1px solid #ccc",
                            padding: "20px",
                            borderRadius: "8px",
                            marginBottom: "20px"
                        }}>
                            <h3>{editPostId ? "Edit Internship Post" : "Create Internship Post"}</h3>
                            <input type="text" name="name" placeholder="Internship Name" value={formData.name} onChange={handleInputChange} className="form-input" />
                            <input type="text" name="duration" placeholder="Duration" value={formData.duration} onChange={handleInputChange} className="form-input" />
                            <select name="paid" value={formData.paid} onChange={handleInputChange} className="form-input">
                                <option value="paid">Paid</option>
                                <option value="unpaid">Unpaid</option>
                            </select>
                            {formData.paid === "paid" && (
                                <input type="number" name="salary" placeholder="Expected Salary" value={formData.salary} onChange={handleInputChange} className="form-input" />
                            )}
                            <input type="text" name="skills" placeholder="Required Skills" value={formData.skills} onChange={handleInputChange} className="form-input" />
                            <textarea name="description" placeholder="Job Description" value={formData.description} onChange={handleInputChange} className="form-input" rows={4}></textarea>
                            <button className="action-button" onClick={handleCreateOrUpdate}>
                                {editPostId ? "Update" : "Create"}
                            </button>
                        </div>
                    )}

                    <h2 className="section-title">Internship Posts</h2>
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map(post => (
                            <div key={post.id} style={{
                                background: "#fff",
                                border: "1px solid #ccc",
                                padding: "15px",
                                borderRadius: "8px",
                                marginBottom: "10px",
                                boxShadow: "2px 2px 10px rgba(0,0,0,0.05)"
                            }}>
                                <h3>{post.name}</h3>
                                <p><strong>Duration:</strong> {post.duration}</p>
                                <p><strong>Type:</strong> {post.paid}</p>
                                {post.paid === "paid" && <p><strong>Salary:</strong> ${post.salary}</p>}
                                <p><strong>Skills:</strong> {post.skills}</p>
                                <p><strong>Description:</strong> {post.description}</p>
                                <p><strong>Applications:</strong> {dummyApplicationCounts[post.id] || 0}</p>
                                <button className="action-button" onClick={() => handleEdit(post)}>Edit</button>
                                <button className="action-button" style={{ marginLeft: "10px", backgroundColor: "#dc3545" }} onClick={() => handleDelete(post.id)}>Delete</button>
                            </div>
                        ))
                    ) : (
                        <p>No internship posts found.</p>
                    )}
                </main>
            </div>

            <footer className="dashboard-footer">
                <p>&copy; 2025 SCAD System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default CompanyInternships;
