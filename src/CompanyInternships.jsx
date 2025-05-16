import React, { useState } from "react";
import './CSS/CompanyDashboard.css';
import { useNavigate } from 'react-router-dom';
import { FiBell } from 'react-icons/fi';
import CompanyLayout from "./components/CompanyLayout";

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
        <CompanyLayout>

            <main className="main-content" aria-label="Main Content">
                <h1 className="main-welcome" style={{ marginTop: 0, marginBottom: 32 }}>Manage Internships</h1>

                {/* Top Filter Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <h2 className="section-title" style={{ margin: 0 }}>Your Internship Posts</h2>
                    <div style={{ display: 'flex', gap: 12 }}>
                        <input
                            type="text"
                            placeholder="Search by internship name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                width: 280,
                                height: 40,
                                borderRadius: 8,
                                border: '1px solid var(--border)',
                                padding: '0 14px',
                                fontSize: 16
                            }}
                        />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            style={{
                                width: 140,
                                height: 40,
                                borderRadius: 8,
                                border: '1px solid var(--border)',
                                padding: '0 14px',
                                fontSize: 16
                            }}
                        >
                            <option value="all">All</option>
                            <option value="paid">Paid</option>
                            <option value="unpaid">Unpaid</option>
                        </select>
                        <button
                            className="action-button"
                            onClick={() => {
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
                            }}
                            style={{
                                height: 40,
                                padding: "0 16px",
                                borderRadius: 8,
                                backgroundColor: "var(--primary)",
                                color: "#fff",
                                fontSize: 16,
                                border: "none"
                            }}
                        >
                            + Create Post
                        </button>
                    </div>
                </div>

                {/* Internship Form */}
                {showForm && (
                    <div style={{
                        background: "#fff",
                        border: "1px solid var(--border)",
                        padding: "24px",
                        borderRadius: "12px",
                        marginBottom: "24px",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.08)"
                    }}>
                        <h3 style={{ marginBottom: 16 }}>{editPostId ? "Edit Internship Post" : "Create Internship Post"}</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
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
                        </div>
                        <textarea name="description" placeholder="Job Description" value={formData.description} onChange={handleInputChange} className="form-input" rows={4} style={{ width: '100%', marginBottom: 16 }}></textarea>
                        <button className="action-button" onClick={handleCreateOrUpdate} style={{ backgroundColor: "var(--primary)", color: "#fff", padding: "10px 16px", borderRadius: 8, fontSize: 16 }}>
                            {editPostId ? "Update" : "Create"}
                        </button>
                    </div>
                )}

                {/* Internship Cards */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: 24
                }}>
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map(post => (
                            <div key={post.id} style={{
                                background: "#fff",
                                border: "1px solid var(--border)",
                                borderRadius: "12px",
                                boxShadow: "0 2px 8px rgba(30,41,59,0.06)",
                                padding: 24,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between'
                            }}>
                                <div>
                                    <h3 style={{ marginBottom: 8 }}>{post.name}</h3>
                                    <p><strong>Duration:</strong> {post.duration}</p>
                                    <p><strong>Type:</strong> {post.paid}</p>
                                    {post.paid === "paid" && <p><strong>Salary:</strong> ${post.salary}</p>}
                                    <p><strong>Skills:</strong> {post.skills}</p>
                                    <p><strong>Description:</strong> {post.description}</p>
                                    <p><strong>Applications:</strong> {dummyApplicationCounts[post.id] || 0}</p>
                                </div>
                                <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                                    <button className="action-button" onClick={() => handleEdit(post)} style={{ padding: "8px 12px", borderRadius: 6 }}>Edit</button>
                                    <button className="action-button" onClick={() => handleDelete(post.id)} style={{ padding: "8px 12px", backgroundColor: "#dc3545", color: "#fff", borderRadius: 6 }}>Delete</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No internship posts found.</p>
                    )}
                </div>
            </main>

            </CompanyLayout>
    );
};

export default CompanyInternships;
