import React, { useState } from 'react';
import './CSS/CompanyDashboard.css';

const sampleInterns = [
    { id: 1, name: 'Alice Johnson', title: 'Frontend Developer', status: 'Current', evaluation: '' },
    { id: 2, name: 'Bob Smith', title: 'Data Analyst', status: 'Completed', evaluation: '' },
    { id: 3, name: 'Charlie Brown', title: 'UI/UX Designer', status: 'Current', evaluation: '' },
];

const CompanyCurrentInterns = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [interns, setInterns] = useState(sampleInterns);
    const [selectedIntern, setSelectedIntern] = useState(null);
    const [evaluationText, setEvaluationText] = useState('');

    const handleSearch = (e) => setSearchTerm(e.target.value);
    const handleFilter = (e) => setFilterStatus(e.target.value);

    const filteredInterns = interns.filter((intern) => {
        const matchesSearch =
            intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            intern.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter =
            filterStatus === 'All' || intern.status === filterStatus;
        return matchesSearch && matchesFilter;
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
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                <h1 className="dashboard-title">Current Interns</h1>
            </header>

            <div className="dashboard-content wide">
                <aside className="dashboard-sidebar">
                    <h2 className="sidebar-title">Navigation</h2>
                    <ul className="nav-list">
                        <li className="nav-item"><a href="/CompanyDashboard" className="nav-link">Home</a></li>
                        <li className="nav-item"><a href="/CompanyInternships" className="nav-link">My Internship Posts</a></li>
                        <li className="nav-item"><a href="/company/applications" className="nav-link">Applications</a></li>
                        <li className="nav-item">Current Interns</li>
                        <li className="nav-item"><a href="/CompanyAll" className="nav-link">All Internships</a></li>
                        <li className="nav-item"><a href="/CompanyDocs" className="nav-link">Reports and Documents</a></li>
                    </ul>
                </aside>

                <main className="dashboard-main">
                    <div className="search-filter-section">
                        <input
                            type="text"
                            placeholder="Search by name or title"
                            className="search-bar"
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <select className="filter-dropdown" value={filterStatus} onChange={handleFilter}>
                            <option value="All">All</option>
                            <option value="Current">Current</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <ul className="internship-list">
                        {filteredInterns.map(intern => (
                            <li key={intern.id} className="internship-card">
                                <h3>{intern.name}</h3>
                                <p><strong>Title:</strong> {intern.title}</p>
                                <p><strong>Status:</strong> {intern.status}</p>
                                {intern.status === 'Completed' && (
                                    <>
                                        {!intern.evaluation ? (
                                            <button className="action-button" onClick={() => openEvaluation(intern)}>Evaluate</button>
                                        ) : (
                                            <>
                                                <p><strong>Evaluation:</strong> {intern.evaluation}</p>
                                                <button className="action-button" onClick={() => openEvaluation(intern)}>Edit Evaluation</button>
                                                <button className="action-button" onClick={() => deleteEvaluation(intern.id)}>Delete Evaluation</button>
                                            </>
                                        )}
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </main>
            </div>

            {selectedIntern && (
                <div className="modal">
                    <div className="modal-content evaluation-modal">
                        <h2>Evaluate {selectedIntern.name}</h2>
                        <textarea
                            className="styled-textarea"
                            value={evaluationText}
                            onChange={(e) => setEvaluationText(e.target.value)}
                            placeholder="Write your evaluation..."
                        />
                        <div className="form-buttons">
                            <button className="action-button" onClick={saveEvaluation}>Save</button>
                            <button className="action-button" onClick={() => setSelectedIntern(null)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <footer className="dashboard-footer">
                <p>&copy; 2025 SCAD System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default CompanyCurrentInterns;
