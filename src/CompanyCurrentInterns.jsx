import React, { useState } from 'react';
import './CSS/CompanyDashboard.css';
import { useNavigate } from 'react-router-dom';
import { FiBell, FiUsers } from 'react-icons/fi';
import CompanyLayout from "./components/CompanyLayout";

const sampleInterns = [
    { id: 1, name: 'Alice Johnson', title: 'Frontend Developer', status: 'Current', evaluation: '' },
    { id: 2, name: 'Bob Smith', title: 'Data Analyst', status: 'Completed', evaluation: '' },
    { id: 3, name: 'Charlie Brown', title: 'UI/UX Designer', status: 'Current', evaluation: '' },
];

const statusColors = {
    Current: "#00C49F",
    Completed: "#FFBB28"
};

const CompanyCurrentInterns = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [interns, setInterns] = useState(sampleInterns);
    const [selectedIntern, setSelectedIntern] = useState(null);
    const [evaluationText, setEvaluationText] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => setSearchTerm(e.target.value);
    const handleFilter = (e) => setFilterStatus(e.target.value);

    const filteredInterns = interns.filter((intern) => {
        const nameMatch = searchTerm === '' ||
            intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            intern.title.toLowerCase().includes(searchTerm.toLowerCase());
        const statusMatch = filterStatus === 'All' || intern.status === filterStatus;

        return nameMatch && statusMatch;
    });

    const openEvaluation = (intern) => {
        setSelectedIntern(intern);
        setEvaluationText(intern.evaluation || '');
    };

    const saveEvaluation = () => {
        setInterns(prev =>
            prev.map(intern =>
                intern.id === selectedIntern.id
                    ? { ...intern, evaluation: evaluationText }
                    : intern
            )
        );
        setSelectedIntern(null);
        setEvaluationText('');
    };

    const deleteEvaluation = (internId) => {
        setInterns(prev =>
            prev.map(intern =>
                intern.id === internId
                    ? { ...intern, evaluation: '' }
                    : intern
            )
        );
    };

    return (
        <CompanyLayout>
            <main className="main-content" aria-label="Main Content">
                <h1 className="main-welcome" style={{ marginTop: 0, marginBottom: 32 }}>Current Interns</h1>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 24 }}>
                    <h2 className="section-title" style={{ margin: 0 }}>Manage Interns</h2>
                    <div style={{ display: 'flex', gap: 16 }}>
                        <input
                            type="text"
                            placeholder="Search by name or title"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="input"
                            style={{
                                width: 280,
                                height: 48,
                                borderRadius: 8,
                                border: '1px solid var(--border)',
                                padding: '0 16px',
                                fontSize: 16,
                                background: '#fff',
                                color: 'var(--text)',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                            }}
                        />
                        <select
                            name="status"
                            value={filterStatus}
                            onChange={handleFilter}
                            className="input"
                            style={{
                                width: 220,
                                height: 48,
                                borderRadius: 8,
                                border: '1px solid var(--border)',
                                padding: '0 16px',
                                fontSize: 16,
                                background: '#fff',
                                color: 'var(--text)',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                            }}
                        >
                            <option value="All">All Statuses</option>
                            <option value="Current">Current</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
                    gap: 24,
                    width: '100%'
                }}>
                    {filteredInterns.map((intern) => (
                        <div
                            key={intern.id}
                            className="internship-item"
                            style={{
                                background: '#fff',
                                borderRadius: 12,
                                boxShadow: '0 2px 12px rgba(30,41,59,0.08)',
                                padding: 28,
                                cursor: 'pointer',
                                position: 'relative',
                                border: '1px solid var(--border)',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                height: '100%',
                                ':hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: '0 4px 16px rgba(30,41,59,0.12)'
                                }
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                                <FiUsers style={{ color: 'var(--primary)', fontSize: 22 }} />
                                <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>{intern.name}</span>
                            </div>
                            <div style={{ fontSize: 15, marginBottom: 8 }}><strong>Title:</strong> {intern.title}</div>
                            <div style={{ fontSize: 15, marginBottom: 8 }}><strong>Status:</strong>
                                <span style={{ color: statusColors[intern.status], fontWeight: 600 }}> {intern.status}</span>
                            </div>

                            {intern.status === 'Completed' && (
                                <div style={{ marginTop: 16 }}>
                                {intern.evaluation ? (
                                    <>
                                    <div style={{ marginBottom: 12 }}>
                                        <strong>Evaluation:</strong>
                                        <p style={{ marginTop: 4 }}>{intern.evaluation}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
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
                                            fontSize: 14
                                        }}
                                        onClick={() => openEvaluation(intern)}
                                        >
                                        Edit Evaluation
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
                                            fontSize: 14
                                        }}
                                        onClick={() => deleteEvaluation(intern.id)}
                                        >
                                        Delete Evaluation
                                        </button>
                                    </div>
                                    </>
                                ) : (
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
                                        width: '100%'
                                    }}
                                    onClick={() => openEvaluation(intern)}
                                    >
                                    Add Evaluation
                                    </button>
                                )}
                                </div>

                            )}
                        </div>
                    ))}
                </div>

                {selectedIntern && (
                    <div className="workshop-modal-backdrop">
                        <div className="workshop-modal">
                            <div className="modal-buttons">
                                <button
                                    onClick={() => setSelectedIntern(null)}
                                    className="signout-btn"
                                    style={{ background: 'var(--primary)' }}
                                >
                                    Close
                                </button>
                            </div>
                            <h2 style={{ marginBottom: 16 }}>Evaluate {selectedIntern.name}</h2>
                            <div style={{ marginBottom: 16 }}>
                                <strong>Position:</strong> {selectedIntern.title}
                            </div>
                            <div style={{ marginBottom: 16 }}>
                                <strong>Status: </strong>
                                <span style={{ color: statusColors[selectedIntern.status], fontWeight: 600 }}>
                                    {selectedIntern.status}
                                </span>
                            </div>
                            <textarea
                                value={evaluationText}
                                onChange={(e) => setEvaluationText(e.target.value)}
                                placeholder="Write your evaluation here..."
                                style={{
                                    width: '100%',
                                    minHeight: '200px',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid var(--border)',
                                    marginBottom: '16px',
                                    fontSize: '15px'
                                }}
                            />
                            <div style={{ display: 'flex', gap: '12px', textAlign: 'center',justifyContent: 'center' }}>
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
                                    onClick={saveEvaluation}
                                >
                                    Save Evaluation
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
                                    onClick={() => setSelectedIntern(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </CompanyLayout>
    );
};

export default CompanyCurrentInterns;