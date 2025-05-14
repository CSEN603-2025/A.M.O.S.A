import React, { useState, useRef } from "react";
import { FaPhone, FaBell } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import './CSS/PROStudentDashboard.css';

const PROCalls = () => {
    const [incomingCalls, setIncomingCalls] = useState([
        { id: 1, name: "Ahmed" },
        { id: 2, name: "Ayman" },
        { id: 3, name: "Sarah" }
    ]);

    const [activeCall, setActiveCall] = useState(null);
    const [micOn, setMicOn] = useState(true);
    const [screenOn, setScreenOn] = useState(false);
    const [cameraOn, setCameraOn] = useState(true);
    const [callerLeft, setCallerLeft] = useState(false);
    const [mediaStream, setMediaStream] = useState(null);
    const [screenStream, setScreenStream] = useState(null);

    const videoRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const missedCalls = 0;
    const notifications = 5;

    const goToNotifications = () => {
        navigate("/PROStudentNotifications", { state: { from: location.pathname } });
    };

    const acceptCall = (caller) => {
        setIncomingCalls(prev => prev.filter(call => call.id !== caller.id));
        setActiveCall(caller);
        startCamera();
    };

    const rejectCall = (caller) => {
        setIncomingCalls(prev => prev.filter(call => call.id !== caller.id));
        if (activeCall && activeCall.id === caller.id) {
            setActiveCall(null);
        }
    };

    const endCall = () => {
        setActiveCall(null);
        setMicOn(true);
        setCameraOn(true);
        setScreenOn(false);
        setCallerLeft(false);
        stopCamera();
        stopScreenShare();
    };

    const toggleMic = () => setMicOn(prev => !prev);

    const toggleCamera = () => {
        if (cameraOn) {
            stopCamera();
        } else {
            startCamera();
        }
        setCameraOn(prev => !prev);
    };

    const toggleScreen = async () => {
        if (screenOn) {
            stopScreenShare();
        } else {
            try {
                const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
                setScreenStream(stream);
            } catch (err) {
                console.error("Failed to share screen:", err);
            }
        }
        setScreenOn(prev => !prev);
    };

    const stopScreenShare = () => {
        if (screenStream) {
            screenStream.getTracks().forEach(track => track.stop());
            setScreenStream(null);
        }
    };

    const simulateCallerLeft = () => {
        if (activeCall) {
            setCallerLeft(true);
        }
    };

    const closeCallerLeftPopup = () => {
        setCallerLeft(false);
        endCall();
    };

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            setMediaStream(stream);
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error("Failed to access camera:", err);
        }
    };

    const stopCamera = () => {
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
            setMediaStream(null);
        }
    };

    return (
        <div className="dashboard-wrapper">
            <header className="dashboard-header">
                <div className="header-left">
                    <h1 className="dashboard-title">PRO Student Dashboard</h1>
                </div>
                <div className="header-right">
                    <div className="header-icons">
                        {/* Calls Button with Badge - always shown with badge */}
                        <button className="notification-bell">
                            <FaPhone />
                            {/*<span className="call-badge">{missedCalls}</span>*/}
                        </button>

                        {/* Notifications Button with Badge */}
                        <button onClick={goToNotifications} className="notification-bell">
                            <FiBell size={24} />
                            <span className="notification-badge">{notifications}</span>
                        </button>

                        <a href="/" className="signout-button">Sign Out</a>
                    </div>
                </div>
            </header>

            <div className="dashboard-content">
                <aside className="dashboard-sidebar">
                    <h2 className="sidebar-title">Navigation</h2>
                    <ul className="nav-list">
                        <li className="nav-item"><a href="/PROStudentDashboard" className="nav-link">Home</a></li>
                        <li className="nav-item"><a href="/PROStudentinternship" className="nav-link">Browse Internships</a></li>
                        <li className="nav-item"><a href="/PROStudentApplied" className="nav-link">View Applied Internships</a></li>
                        <li className="nav-item"><a href="/student/proprofile" className="nav-link">My Profile</a></li>
                        <li className="nav-item"><a href="/PROMyInternships" className="nav-link">My Internships</a></li>
                        <li className="nav-item"><a href="/student/appointments" className="nav-link">Appointments</a></li>
                        <li className="nav-item">Calls</li>
                        <li className="nav-item"><a href="/student/viewed" className="nav-link">Viewed my profile</a></li>
                        <li className="nav-item"><a href="/student/assessment" className="nav-link">Online assessments</a></li>
                        <li className="nav-item"><a href="/student/workshop" className="nav-link">Workshop</a></li>
                        <li className="nav-item"><a href="/PreRecord" className="nav-link">Pre-recorded workshops</a></li>
                    </ul>
                </aside>

                <main className="dashboard-main">
                    <div className="browser-wrapper">
                        <header className="browser-header">
                            <h1 className="browser-title">Incoming Calls</h1>
                        </header>

                        <main className="browser-main">
                            {incomingCalls.length === 0 && !activeCall && <p>No incoming calls.</p>}

                            <div className="calls-container">
                                {incomingCalls.map((caller) => (
                                    <div key={caller.id} className="incoming-call-card ringing">
                                        <p><strong>{caller.name}</strong> is calling you...</p>
                                        <div className="call-buttons">
                                            <button onClick={() => acceptCall(caller)} className="accept-button">Accept</button>
                                            <button onClick={() => rejectCall(caller)} className="reject-button">Reject</button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {activeCall && (
                                <div className="call-popup">
                                    <div className="popup-content">
                                        <h2>In Call with {activeCall.name}</h2>
                                        <div className="call-controls">
                                            <button onClick={toggleMic} className="control-button">{micOn ? "Mute Mic" : "Unmute Mic"}</button>
                                            <button onClick={toggleCamera} className="control-button">{cameraOn ? "Turn Off Camera" : "Turn On Camera"}</button>
                                            <button onClick={toggleScreen} className="control-button">{screenOn ? "Stop Screen" : "Share Screen"}</button>
                                            <button onClick={simulateCallerLeft} className="control-button">Simulate Caller Left</button>
                                            <button onClick={endCall} className="leave-button">End Call</button>
                                        </div>
                                        <div className="video-container">
                                            <div className="video-wrapper">
                                                <video ref={videoRef} autoPlay playsInline muted className="video-element" />
                                                <p className="video-label">Camera</p>
                                            </div>
                                            <div className="video-wrapper">
                                                <video
                                                    autoPlay
                                                    playsInline
                                                    muted
                                                    className="video-element"
                                                    ref={el => {
                                                        if (el && screenStream) el.srcObject = screenStream;
                                                    }}
                                                />
                                                <p className="video-label">Shared Screen</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </main>
                    </div>
                </main>
            </div>

            <footer className="dashboard-footer">
                <p>&copy; 2025 SCAD System. All rights reserved.</p>
            </footer>

            {callerLeft && (
                <div className="popup-overlay">
                    <div className="caller-left-popup">
                        <h2>Call Ended</h2>
                        <p>{activeCall?.name} has left the call.</p>
                        <button onClick={closeCallerLeftPopup} className="close-popup-button">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PROCalls;