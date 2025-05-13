import React, { useState } from "react";
import { FaPhone } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import './CSS/SCADOfficeDashboard.css';

const SCADCalls = () => {
    const [incomingCalls, setIncomingCalls] = useState([
        { id: 1, name: "Ahmed" },
        { id: 2, name: "Ayman" },
        { id: 3, name: "Sarah" }
    ]);

    const [activeCall, setActiveCall] = useState(null);
    const [micOn, setMicOn] = useState(true);
    const [screenOn, setScreenOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);
    const [callerLeft, setCallerLeft] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const missedCalls = 0;
    const notifications = 3;

    const goToCalls = () => {
        navigate("/scad/Calls");
    };

    const goToNotifications = () => {
        navigate("/scad/noti", { state: { from: location.pathname } });
    };

    const acceptCall = (caller) => {
        setIncomingCalls(prev => prev.filter(call => call.id !== caller.id));
        setActiveCall(caller);
    };

    const rejectCall = (caller) => {
        setIncomingCalls(prev => prev.filter(call => call.id !== caller.id));
        if (activeCall?.id === caller.id) setActiveCall(null);
    };

    const endCall = () => {
        setActiveCall(null);
        setMicOn(true);
        setCameraOn(true);
        setScreenOn(true);
        setCallerLeft(false);
    };

    const toggleMic = () => setMicOn(prev => !prev);
    const toggleCamera = () => setCameraOn(prev => !prev);
    const toggleScreen = () => setScreenOn(prev => !prev);

    const simulateCallerLeft = () => {
        if (activeCall) setCallerLeft(true);
    };

    const closeCallerLeftPopup = () => {
        setCallerLeft(false);
        endCall();
    };

    return (
        <div className="dashboard-wrapper">
            {/* Header */}
            <header className="dashboard-header">
                <div className="header-left">
                    <h1 className="dashboard-title">SCAD Office Dashboard</h1>
                </div>
                <div className="header-right">
                    <div className="header-icons">
                        <button
                            onClick={location.pathname === "/scad/Calls" ? undefined : goToCalls}
                            className={`notification-bell ${location.pathname === "/scad/Calls" ? "disabled" : ""}`}
                            disabled={location.pathname === "/scad/Calls"}
                        >
                            <FaPhone />
                            {location.pathname !== "/scad/Calls" && (
                                <span className="call-badge">{missedCalls}</span>
                            )}
                        </button>
                        <button onClick={goToNotifications} className="notification-bell">
                            <FiBell size={24} />
                            <span className="notification-badge">{notifications}</span>
                        </button>
                        <a href="/" className="signout-button">Sign Out</a>
                    </div>
                </div>
            </header>

            <div className="dashboard-content">
                {/* Sidebar */}
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
                        <li className="nav-item"><a href="/scad/Appointmnets" className="nav-link">Appointments</a></li>
                        <li className="nav-item">Calls</li>
                        <li className="nav-item"><a href="/scad/Workshop" className="nav-link">Workshop</a></li>
                    </ul>
                </aside>

                {/* Main */}
                <main className="dashboard-main">
                    <div className="browser-wrapper">
                        {/* Page Title */}
                        <header className="browser-header">
                            <h1 className="browser-title">Incoming Calls</h1>
                        </header>
                        
                      
                        {/* Calls and Popups */}
                        <main className="browser-main">
                        <br/>
                            {incomingCalls.length === 0 && !activeCall && (
                                <p>No incoming calls.</p>
                            )}

                            <div className="calls-container">
                                {incomingCalls.map(caller => (
                                    <div key={caller.id} className="incoming-call-card ringing">
                                        <p><strong>{caller.name}</strong> is calling you...</p>
                                        <button onClick={() => acceptCall(caller)} className="btn accept">Accept</button>
                                        <button onClick={() => rejectCall(caller)} className="btn reject">Reject</button>
                                       
                                    </div>
                                ))}
                            </div>

                            {activeCall && (
                                <div className="call-popup">
                                    <div className="popup-content">
                                        <h2>In Call with {activeCall.name}</h2>
                                        <div className="call-controls">
                                            <button onClick={toggleMic} className="btn control">
                                                {micOn ? "Mute Mic" : "Unmute Mic"}
                                            </button>
                                            <button onClick={toggleCamera} className="btn control">
                                                {cameraOn ? "Turn Off Camera" : "Turn On Camera"}
                                            </button>
                                            <button onClick={toggleScreen} className="btn control">
                                                {screenOn ? "Stop Screen" : "Share Screen"}
                                            </button>
                                            <button onClick={simulateCallerLeft} className="btn control">
                                                Simulate Caller Left
                                            </button>
                                            <button onClick={endCall} className="btn leave">End Call</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </main>
                    </div>
                </main>
            </div>

            {/* Footer */}
            <footer className="dashboard-footer">
                <p>&copy; 2025 SCAD System. All rights reserved.</p>
            </footer>

            {/* Caller Left Popup */}
            {callerLeft && (
                <div className="popup-overlay">
                    <div className="caller-left-popup">
                        <h2>Call Ended</h2>
                        <p>{activeCall?.name} has left the call.</p>
                        <button onClick={closeCallerLeftPopup} className="btn close-popup">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SCADCalls;
