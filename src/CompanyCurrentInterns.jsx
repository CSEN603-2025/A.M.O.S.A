import React, { useState } from 'react';
import './CSS/CompanyDashboard.css';
import { useNavigate } from 'react-router-dom';
import { FiBell } from 'react-icons/fi';
import CompanyLayout from "./components/CompanyLayout";

const actionButtonStyle = {
    padding: "8px 14px",
    backgroundColor: "#3b82f6",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer"
};


const sampleInterns = [
    { id: 1, name: 'Alice Johnson', title: 'Frontend Developer', status: 'Current', evaluation: '' },
    { id: 2, name: 'Bob Smith', title: 'Data Analyst', status: 'Completed', evaluation: '' },
    { id: 3, name: 'Charlie Brown', title: 'UI/UX Designer', status: 'Current', evaluation: '' },
];

const CompanyCurrentInterns = () => {
    const [searchnTerm, setSearchTerm] = useState('');
    const [searchtTerm, setSearchtTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [interns, setInterns] = useState(sampleInterns);
    const [selectedIntern, setSelectedIntern] = useState(null);
    const [evaluationText, setEvaluationText] = useState('');

    const handlenSearch = (e) => setSearchTerm(e.target.value);
    const handletSearch = (e) => setSearchtTerm(e.target.value);
    const handleFilter = (e) => setFilterStatus(e.target.value);

    const filteredInterns = interns.filter((intern) => {
        const nameMatch = searchnTerm === '' || intern.name.toLowerCase().includes(searchnTerm.toLowerCase());
        const titleMatch = searchtTerm === '' || intern.title.toLowerCase().includes(searchtTerm.toLowerCase());
        const statusMatch = filterStatus === 'All' || intern.status === filterStatus;

        return nameMatch && titleMatch && statusMatch;
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

    const navigate = useNavigate();

    const handleBellClick = () => {
        navigate('/CompanyNotifications');
    };

    const handleLogout = () => {
        navigate('/');
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
            <main style={{ padding: 32, fontFamily: "Inter, sans-serif", backgroundColor: "#f9fafb", minHeight: "100vh" }}>
                {/* Filter + Search Section */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 32 }}>
                    <input
                        type="text"
                        placeholder="Search by name"
                        value={searchnTerm}
                        onChange={handlenSearch}
                        style={{
                            padding: "10px 14px",
                            borderRadius: 6,
                            border: "1px solid #d1d5db",
                            fontSize: 14,
                            backgroundColor: "#fff",
                            flex: "1 1 200px"
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Search by title"
                        value={searchtTerm}
                        onChange={handletSearch}
                        style={{
                            padding: "10px 14px",
                            borderRadius: 6,
                            border: "1px solid #d1d5db",
                            fontSize: 14,
                            backgroundColor: "#fff",
                            flex: "1 1 200px"
                        }}
                    />
                    <select
                        value={filterStatus}
                        onChange={handleFilter}
                        style={{
                            padding: "10px 14px",
                            borderRadius: 6,
                            border: "1px solid #d1d5db",
                            fontSize: 14,
                            backgroundColor: "#fff",
                            flex: "1 1 150px"
                        }}
                    >
                        <option value="All">All</option>
                        <option value="Current">Current</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>

                {/* Intern Cards */}
                <ul style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: 20
                }}>
                    {filteredInterns.map(intern => (
                        <li key={intern.id} style={{
                            backgroundColor: "#fff",
                            border: "1px solid #e5e7eb",
                            borderRadius: 8,
                            padding: 20,
                            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                            display: "flex",
                            flexDirection: "column",
                            gap: 8
                        }}>
                            <h3 style={{ fontSize: 18, fontWeight: 600 }}>{intern.name}</h3>
                            <p><strong>Title:</strong> {intern.title}</p>
                            <p><strong>Status:</strong> {intern.status}</p>

                            {intern.status === "Completed" && (
                                <>
                                    {!intern.evaluation ? (
                                        <button
                                            style={actionButtonStyle}
                                            onClick={() => openEvaluation(intern)}
                                        >
                                            Evaluate
                                        </button>
                                    ) : (
                                        <>
                                            <p><strong>Evaluation:</strong> {intern.evaluation}</p>
                                            <button
                                                style={actionButtonStyle}
                                                onClick={() => openEvaluation(intern)}
                                            >
                                                Edit Evaluation
                                            </button>
                                            <button
                                                style={{ ...actionButtonStyle, backgroundColor: "#f87171", color: "#fff" }}
                                                onClick={() => deleteEvaluation(intern.id)}
                                            >
                                                Delete Evaluation
                                            </button>
                                        </>
                                    )}
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </main>

            {/* Evaluation Modal */}
            {selectedIntern && (
                <div style={{
                    position: "fixed",
                    top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 50
                }}>
                    <div style={{
                        backgroundColor: "#fff",
                        borderRadius: 10,
                        padding: 24,
                        width: "90%",
                        maxWidth: 500,
                        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                        display: "flex",
                        flexDirection: "column",
                        gap: 16
                    }}>
                        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Evaluate {selectedIntern.name}</h2>
                        <textarea
                            placeholder="Write your evaluation..."
                            value={evaluationText}
                            onChange={(e) => setEvaluationText(e.target.value)}
                            style={{
                                padding: 12,
                                border: "1px solid #d1d5db",
                                borderRadius: 6,
                                minHeight: 100,
                                fontSize: 14,
                                resize: "vertical",
                                width: "100%"
                            }}
                        />
                        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                            <button
                                onClick={saveEvaluation}
                                style={{ ...actionButtonStyle, backgroundColor: "#10b981", color: "#fff" }}
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setSelectedIntern(null)}
                                style={{ ...actionButtonStyle, backgroundColor: "#d1d5db", color: "#111827" }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}


            </CompanyLayout>
    );
};

export default CompanyCurrentInterns;
