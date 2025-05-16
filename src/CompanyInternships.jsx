import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FiBriefcase } from 'react-icons/fi';
import CompanyLayout from "./components/CompanyLayout";
import './CSS/CompanyDashboard.css';

const CompanyInternships = () => {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([
        {
            id: 1,
            name: "Frontend Developer Intern",
            duration: "3 months",
            paid: true,
            salary: "$1000/month",
            skills: "React, JavaScript, HTML, CSS",
            description: "Build and maintain UI components for our web platform.",
            status: "Available"
        },
        {
            id: 2,
            name: "Data Science Intern",
            duration: "6 months",
            paid: false,
            salary: "N/A",
            skills: "Python, Pandas, Machine Learning",
            description: "Assist in analyzing large datasets and developing ML models.",
            status: "Available"
        },
        {
            id: 3,
            name: "Digital Marketing Intern",
            duration: "2 months",
            paid: true,
            salary: "$500/month",
            skills: "SEO, Social Media, Google Analytics",
            description: "Help create marketing campaigns and analyze their performance.",
            status: "Available"
        }
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("All");
    const [showForm, setShowForm] = useState(false);
    const [editPostId, setEditPostId] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        duration: "",
        paid: false,
        salary: "",
        skills: "",
        description: ""
    });

    const statusColors = {
        Available: "#00C49F",
        Closed: "#FF6384"
    };

    const dummyApplicationCounts = {
        1: 12,
        2: 5,
        3: 8
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCreateOrUpdate = () => {
        const postData = {
            ...formData,
            salary: formData.paid ? `$${formData.salary}/month` : "N/A",
            status: "Available"
        };

        if (editPostId !== null) {
            setPosts(prev =>
                prev.map(post =>
                    post.id === editPostId ? { ...postData, id: editPostId } : post
                )
            );
        } else {
            const newPost = {
                ...postData,
                id: Date.now()
            };
            setPosts(prev => [...prev, newPost]);
        }

        resetForm();
    };

    const resetForm = () => {
        setFormData({
            name: "",
            duration: "",
            paid: false,
            salary: "",
            skills: "",
            description: ""
        });
        setEditPostId(null);
        setShowForm(false);
    };

    const handleEdit = (post) => {
        setFormData({
            ...post,
            paid: post.salary !== "N/A",
            salary: post.salary !== "N/A" ? post.salary.replace(/\D/g, '') : ""
        });
        setEditPostId(post.id);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        setPosts(prev => prev.filter(post => post.id !== id));
    };

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter =
            filter === "All" ||
            (filter === "Paid" && post.paid) ||
            (filter === "Unpaid" && !post.paid);

        return matchesSearch && matchesFilter;
    });

    return (
        <CompanyLayout>
            <main className="main-content" aria-label="Main Content">
                <h1 className="main-welcome" style={{ marginTop: 0, marginBottom: 32 }}>Internship Posts</h1>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 24 }}>
                    <h2 className="section-title" style={{ margin: 0 }}>Manage Your Internship Posts</h2>
                    <div style={{ display: 'flex', gap: 12 }}>
                        <input
                            type="text"
                            placeholder="Search by internship name"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input"
                            style={{
                                width: 280,
                                height: 40,
                                borderRadius: 8,
                                border: '1px solid var(--border)',
                                padding: '0 14px',
                                fontSize: 16,
                                background: '#fff',
                                color: 'var(--text)'
                            }}
                        />
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="input"
                            style={{
                                width: 160,
                                height: 40,
                                borderRadius: 8,
                                border: '1px solid var(--border)',
                                padding: '0 14px',
                                fontSize: 16,
                                background: '#fff',
                                color: 'var(--text)'
                            }}
                        >
                            <option value="All">All Internships</option>
                            <option value="Paid">Paid</option>
                            <option value="Unpaid">Unpaid</option>
                        </select>
                        <button
                            className="action-button"
                            style={{
                                background: 'var(--primary)',
                                color: 'white',
                                border: 'none',
                                padding: '0 24px',
                                borderRadius: 8,
                                cursor: 'pointer',
                                fontWeight: 600,
                                fontSize: 14,
                                height: 40
                            }}
                            onClick={() => {
                                resetForm();
                                setShowForm(true);
                            }}
                        >
                            Create Post
                        </button>
                    </div>
                </div>

                {showForm && (
                    <div className="internship-item" style={{
                        background: '#fff',
                        borderRadius: 12,
                        boxShadow: '0 2px 8px rgba(30,41,59,0.06)',
                        padding: 24,
                        border: '1px solid var(--border)',
                        marginBottom: 24
                    }}>
                        <h3 style={{ marginBottom: 16 }}>{editPostId ? "Edit Internship Post" : "Create New Internship Post"}</h3>
                        <div style={{ display: 'grid', gap: 16 }}>
                            <input
                                type="text"
                                name="name"
                                placeholder="Internship Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                style={{
                                    padding: '12px 16px',
                                    borderRadius: 8,
                                    border: '1px solid var(--border)',
                                    fontSize: 15
                                }}
                            />
                            <input
                                type="text"
                                name="duration"
                                placeholder="Duration (e.g., 3 months)"
                                value={formData.duration}
                                onChange={handleInputChange}
                                style={{
                                    padding: '12px 16px',
                                    borderRadius: 8,
                                    border: '1px solid var(--border)',
                                    fontSize: 15
                                }}
                            />
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <input
                                    type="checkbox"
                                    id="paid"
                                    name="paid"
                                    checked={formData.paid}
                                    onChange={handleInputChange}
                                />
                                <label htmlFor="paid">Paid Internship</label>
                            </div>
                            {formData.paid && (
                                <input
                                    type="number"
                                    name="salary"
                                    placeholder="Monthly Salary Amount"
                                    value={formData.salary}
                                    onChange={handleInputChange}
                                    style={{
                                        padding: '12px 16px',
                                        borderRadius: 8,
                                        border: '1px solid var(--border)',
                                        fontSize: 15
                                    }}
                                />
                            )}
                            <input
                                type="text"
                                name="skills"
                                placeholder="Required Skills (comma separated)"
                                value={formData.skills}
                                onChange={handleInputChange}
                                style={{
                                    padding: '12px 16px',
                                    borderRadius: 8,
                                    border: '1px solid var(--border)',
                                    fontSize: 15
                                }}
                            />
                            <textarea
                                name="description"
                                placeholder="Detailed Job Description"
                                value={formData.description}
                                onChange={handleInputChange}
                                rows={4}
                                style={{
                                    padding: '12px 16px',
                                    borderRadius: 8,
                                    border: '1px solid var(--border)',
                                    fontSize: 15,
                                    resize: 'vertical'
                                }}
                            />
                            <div style={{ display: 'flex', gap: 12 }}>
                                <button
                                    className="action-button"
                                    style={{
                                        background: 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        padding: '12px 24px',
                                        borderRadius: 8,
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        fontSize: 14
                                    }}
                                    onClick={handleCreateOrUpdate}
                                >
                                    {editPostId ? "Update Post" : "Create Post"}
                                </button>
                                <button
                                    className="action-button"
                                    style={{
                                        background: '#FF6384',
                                        color: 'white',
                                        border: 'none',
                                        padding: '12px 24px',
                                        borderRadius: 8,
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        fontSize: 14
                                    }}
                                    onClick={resetForm}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: 24,
                    width: '100%'
                }}>
                    {filteredPosts.map(post => (
                        <div
                            key={post.id}
                            className="internship-item"
                            style={{
                                background: '#fff',
                                borderRadius: 12,
                                boxShadow: '0 2px 8px rgba(30,41,59,0.06)',
                                padding: 24,
                                border: '1px solid var(--border)',
                                height: '100%'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                <FiBriefcase style={{ color: 'var(--primary)', fontSize: 22 }} />
                                <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{post.name}</span>
                            </div>
                            <div style={{ fontSize: 14, marginBottom: 4 }}><strong>Duration:</strong> {post.duration}</div>
                            <div style={{ fontSize: 14, marginBottom: 4 }}><strong>Paid:</strong> {post.paid ? "Yes" : "No"}</div>
                            <div style={{ fontSize: 14, marginBottom: 4 }}><strong>Salary:</strong> {post.salary}</div>
                            <div style={{ fontSize: 14, marginBottom: 4 }}><strong>Status:</strong> <span style={{ color: statusColors[post.status], fontWeight: 600 }}>{post.status}</span></div>
                            <div style={{ fontSize: 14, marginBottom: 4 }}><strong>Applications:</strong> {dummyApplicationCounts[post.id] || 0}</div>
                            <div style={{ marginTop: 8, color: 'var(--text-light)', fontSize: 14 }}>
                                <strong>Skills:</strong> {post.skills.substring(0, 60)}...
                            </div>
                            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                                <button
                                    className="action-button"
                                    style={{
                                        background: 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        padding: '8px 16px',
                                        borderRadius: 8,
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        fontSize: 14,
                                        flex: 1
                                    }}
                                    onClick={() => handleEdit(post)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="action-button"
                                    style={{
                                        background: '#FF6384',
                                        color: 'white',
                                        border: 'none',
                                        padding: '8px 16px',
                                        borderRadius: 8,
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        fontSize: 14,
                                        flex: 1
                                    }}
                                    onClick={() => handleDelete(post.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </CompanyLayout>
    );
};

export default CompanyInternships;