import React, { useState } from 'react';
import './CSS/CompanyDashboard.css';
import { useNavigate } from 'react-router-dom';
import { FiBell } from 'react-icons/fi';
import CompanyLayout from "./components/CompanyLayout";


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

                <main className="dashboard-main">
                    <div className="search-filter-section">
                        <input
                            type="text"
                            placeholder="Search by name"
                            className="search-bar"
                            value={searchnTerm}
                            onChange={handlenSearch}
                        />
                        <input
                            type="text"
                            placeholder="Search by title"
                            className="search-bar"
                            value={searchtTerm}
                            onChange={handletSearch}
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

            </CompanyLayout>
    );
};

export default CompanyCurrentInterns;
