import React, { useState } from "react";
import './CSS/SCADOfficeDashboard.css';

const SCADCalls = () => {
    const [incomingCalls, setIncomingCalls] = useState([
        { id: 1, name: "Ahmed" },
        { id: 2, name: "Ayman" },
        { id: 3, name: "Sarah" }
    ]);

    const [activeCall, setActiveCall] = useState(null);
    const [micOn, setMicOn] = useState(true);
    const [screenOn, setScreenOf] = useState(true);
    const [cameraOn, setCameraOn] = useState(true);
    const [callerLeft, setCallerLeft] = useState(false);  // NEW state for popup

    const acceptCall = (caller) => {
        setIncomingCalls(prev => prev.filter(call => call.id !== caller.id));
        setActiveCall(caller);
    };

    const rejectCall = (caller) => {
        setIncomingCalls(prev => prev.filter(call => call.id !== caller.id));
    };

    const endCall = () => {
        setActiveCall(null);
        setMicOn(true);
        setCameraOn(true);
        setCallerLeft(false); // Reset popup
    };

    const toggleMic = () => {
        setMicOn(prev => !prev);
    };

    const toggleCamera = () => {
        setCameraOn(prev => !prev);
    };

    const toggleScreen = () => {
        setScreenOf(prev => !prev);
    };

    const simulateCallerLeft = () => {
        if (activeCall) {
            setCallerLeft(true); // Instead of alert, open the nice popup
        }
    };

    const closeCallerLeftPopup = () => {
        setCallerLeft(false);
        endCall(); // Optionally, you can also end the call when caller leaves
    };

    return (
        <div className="dashboard-wrapper">
            {/* === Navigation Bar === */}
            <header className="dashboard-header">
                <div className="header-left">
                    <h1 className="dashboard-title">SCAD Office Dashboard</h1>
                </div>
                <div className="header-right">
                    <a href="/" className="signout-button">Sign Out</a>
                </div>
            </header>

            {/* === Page Content === */}
            <div className="dashboard-content">
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

                <main className="dashboard-main">
                    <h2>Incoming Calls</h2>

                    {incomingCalls.length === 0 && <p>No incoming calls.</p>}

                    {incomingCalls.map((caller) => (
                        <div key={caller.id} className="incoming-call-notification">
                            <p><strong>{caller.name}</strong> is calling you...</p>
                            <button onClick={() => acceptCall(caller)} className="btn accept">Accept</button>
                            <button onClick={() => rejectCall(caller)} className="btn reject">Reject</button>
                        </div>
                    ))}

                    {/* Active Call Popup */}
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
                                        {screenOn ? "Share Screen" : "Unshare Screen"}
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

            <footer className="dashboard-footer">
                <p>&copy; 2025 SCAD System. All rights reserved.</p>
            </footer>

            {/* === Caller Left Popup === */}
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
