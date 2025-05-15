import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaPhone, FaBell } from "react-icons/fa";
import { FiBell, FiBriefcase } from "react-icons/fi";
import { Pencil } from "lucide-react"; // edit icon
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CSS/SCADOfficeDashboard.css';
import './CSS/browseInternships.css';
import DashboardLayout from './components/Layout';

const SCADCurrentCycle = () => {
    const [editing, setEditing] = useState(false);
    const [startDate, setStartDate] = useState(new Date("2025-05-01"));
    const [endDate, setEndDate] = useState(new Date("2025-08-31"));
    const [tempStartDate, setTempStartDate] = useState(startDate);
    const [tempEndDate, setTempEndDate] = useState(endDate);
    const navigate = useNavigate();
    const location = useLocation();

    // Example numbers for calls and notifications
    const missedCalls = 5;
    const notifications = 3;

    const handleEditClick = () => {
        setEditing(true);
        setTempStartDate(startDate);
        setTempEndDate(endDate);
    };

    const handleSaveClick = () => {
        setStartDate(tempStartDate);
        setEndDate(tempEndDate);
        setEditing(false);
    };

    const handleCancelClick = () => {
        setEditing(false);
    };

    const goToCalls = () => {
        navigate("/scad/Calls", { state: { from: location.pathname } });
    };

    const goToNotifications = () => {
        navigate("/scad/noti", { state: { from: location.pathname } });
    };

    // Format dates for display
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const importantDeadlines = [
        {
            title: "Company Registration Deadline",
            date: "June 1, 2025"
        },
        {
            title: "Student Application Deadline",
            date: "June 15, 2025"
        },
        {
            title: "Interview Period",
            date: "June 20 - July 10, 2025"
        },
        {
            title: "Final Placement Notification",
            date: "July 15, 2025"
        }
    ];

    return (
        <DashboardLayout>
            <main className="main-content" aria-label="Main Content">
                <h1 className="main-welcome" style={{ marginTop: 0, marginBottom: 32 }}>Current Internship Cycle</h1>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 24 }}>
                    <h2 className="section-title" style={{ margin: 0 }}>Cycle Information</h2>
                   
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: '100%' }}>
                    <div className="internship-item" style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(30,41,59,0.06)', padding: 24, border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                            <FiBriefcase style={{ color: 'var(--primary)', fontSize: 22 }} />
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Current Cycle Details</span>
                        </div>

                        {editing ? (
                            <div className="edit-form-container">
                                <div className="date-picker-group" style={{ display: 'grid', gap: 16 }}>
                                    <div className="date-picker-section" style={{ display: 'grid', gap: 8 }}>
                                        <label style={{ fontWeight: 600 }}>Start Date:</label>
                                        <DatePicker
                                            selected={tempStartDate}
                                            onChange={(date) => setTempStartDate(date)}
                                            className="input"
                                            style={{ width: '100%', height: 40, borderRadius: 8, border: '1px solid var(--border)', padding: '0 14px', fontSize: 16 }}
                                        />
                                    </div>
                                    <div className="date-picker-section" style={{ display: 'grid', gap: 8 }}>
                                        <label style={{ fontWeight: 600 }}>End Date:</label>
                                        <DatePicker
                                            selected={tempEndDate}
                                            onChange={(date) => setTempEndDate(date)}
                                            className="input"
                                            style={{ width: '100%', height: 40, borderRadius: 8, border: '1px solid var(--border)', padding: '0 14px', fontSize: 16 }}
                                        />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: 12, marginTop: 24 ,justifyContent: 'center' }}>
                                    <button
                                        onClick={handleSaveClick}
                                        style={{
                                            background: '#00C49F',
                                            color: 'white',
                                            border: 'none',
                                            padding: '10px 24px',
                                            borderRadius: 8,
                                            cursor: 'pointer',
                                            fontWeight: 600
                                        }}
                                    >
                                        Save Changes
                                    </button>
                                    <button
                                        onClick={handleCancelClick}
                                        style={{
                                            background: '#FF6384',
                                            color: 'white',
                                            border: 'none',
                                            padding: '10px 24px',
                                            borderRadius: 8,
                                            cursor: 'pointer',
                                            fontWeight: 600
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: 'grid', gap: 12 }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                                    <div style={{ fontSize: 15 }}><strong>Start Date:</strong> {formatDate(startDate)}</div>
                                    <div style={{ fontSize: 15 }}><strong>End Date:</strong> {formatDate(endDate)}</div>
                                    <div style={{ fontSize: 15 }}><strong>Status:</strong> <span style={{ color: '#00C49F', fontWeight: 600 }}>Active</span></div>
                                    <div style={{ fontSize: 15 }}><strong>Duration:</strong> 4 months</div>
                                </div>
                                <button
                                    onClick={handleEditClick}
                                    style={{
                                        background: 'var(--primary)',
                                        color: 'white',
                                        border: 'none',
                                        padding: '10px 24px',
                                        borderRadius: 8,
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        fontWeight: 600,
                                        marginTop: 100,
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Pencil size={16} /> Edit Dates
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="internship-item" style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(30,41,59,0.06)', padding: 24, border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                            <FiBriefcase style={{ color: 'var(--primary)', fontSize: 22 }} />
                            <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Important Deadlines</span>
                        </div>

                        <div style={{ display: 'grid', gap: 16 }}>
                            {importantDeadlines.map((deadline, index) => (
                                <div key={index} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '12px 16px',
                                    background: index % 2 === 0 ? 'rgba(0, 196, 159, 0.1)' : 'transparent',
                                    borderRadius: 8
                                }}>
                                    <div style={{ fontSize: 15, fontWeight: 600 }}>{deadline.title}</div>
                                    <div style={{ fontSize: 15 }}>{deadline.date}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
};

export default SCADCurrentCycle;