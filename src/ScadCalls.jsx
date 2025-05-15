import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaPhone } from "react-icons/fa";
import { FiBell, FiHome, FiBriefcase, FiList, FiInfo, FiUsers, FiFileText, FiBarChart2, FiCalendar, FiPhone as FiPhoneIcon, FiTool, FiMic, FiMicOff, FiVideo, FiVideoOff, FiMonitor, FiX } from "react-icons/fi";
import './CSS/SCADOfficeDashboard.css';
import DashboardLayout from './components/Layout';

const SCADCalls = () => {
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
        <DashboardLayout>
            <div style={{
                maxWidth: 1200,
                margin: "0 auto",
                padding: "0 32px",
                width: "100%",
                display: "flex",
                flexDirection: "column"
            }}>
                <h1 className="main-welcome" style={{ marginTop: 0, marginBottom: 32 }}>Calls</h1>

                {/* Active Call Section - Now shows inline instead of as a modal */}
                {activeCall && (
                    <div style={{
                        background: '#fff',
                        borderRadius: 12,
                        boxShadow: '0 2px 8px rgba(30,41,59,0.12)',
                        padding: 28,
                        marginBottom: 24,
                        border: '1px solid var(--border)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                            <h2 style={{ margin: 0 }}>Call with {activeCall.name}</h2>
                            <button onClick={endCall} className="icon-btn" style={{ background: 'var(--badge-bg)', color: '#fff' }}>
                                <FiX size={20} />
                            </button>
                        </div>

                        <div style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            gap: "1rem",
                            marginBottom: "1.5rem"
                        }}>
                            <div style={{ textAlign: "center" }}>
                                <div style={{
                                    width: "300px",
                                    height: "200px",
                                    backgroundColor: cameraOn ? "transparent" : "var(--bg-dark)",
                                    border: "1px solid var(--border)",
                                    borderRadius: 8,
                                    overflow: 'hidden'
                                }}>
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        muted
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            display: cameraOn ? "block" : "none",
                                            objectFit: 'cover'
                                        }}
                                    />
                                    {!cameraOn && (
                                        <div style={{
                                            width: "100%",
                                            height: "100%",
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#fff'
                                        }}>
                                            Camera is off
                                        </div>
                                    )}
                                </div>
                                <p style={{ marginTop: "0.5rem", fontSize: 14 }}>Your Camera</p>
                            </div>

                            <div style={{ textAlign: "center" }}>
                                <div style={{
                                    width: "300px",
                                    height: "200px",
                                    backgroundColor: screenOn ? "transparent" : "var(--bg-dark)",
                                    border: "1px solid var(--border)",
                                    borderRadius: 8,
                                    overflow: 'hidden'
                                }}>
                                    <video
                                        autoPlay
                                        playsInline
                                        muted
                                        ref={(el) => {
                                            if (el && screenStream) el.srcObject = screenStream;
                                        }}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            display: screenOn ? "block" : "none",
                                            objectFit: 'contain'
                                        }}
                                    />
                                    {!screenOn && (
                                        <div style={{
                                            width: "100%",
                                            height: "100%",
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#fff'
                                        }}>
                                            Screen not shared
                                        </div>
                                    )}
                                </div>
                                <p style={{ marginTop: "0.5rem", fontSize: 14 }}>Shared Screen</p>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: 16,
                            marginTop: 16
                        }}>
                            <button
                                onClick={toggleMic}
                                className="icon-btn"
                                style={{
                                    background: micOn ? 'var(--primary)' : 'var(--badge-bg)',
                                    color: '#fff',
                                    width: 44,
                                    height: 44,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {micOn ? <FiMic size={20} /> : <FiMicOff size={20} />}
                            </button>
                            <button
                                onClick={toggleCamera}
                                className="icon-btn"
                                style={{
                                    background: cameraOn ? 'var(--primary)' : 'var(--badge-bg)',
                                    color: '#fff',
                                    width: 44,
                                    height: 44,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {cameraOn ? <FiVideo size={20} /> : <FiVideoOff size={20} />}
                            </button>
                            <button
                                onClick={toggleScreen}
                                className="icon-btn"
                                style={{
                                    background: screenOn ? 'var(--primary)' : 'var(--badge-bg)',
                                    color: '#fff',
                                    width: 44,
                                    height: 44,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <FiMonitor size={20} />
                            </button>
                        </div>
                    </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 24 }}>
                    <h2 className="section-title" style={{ margin: 0 }}>Incoming Calls</h2>
                </div>

                {incomingCalls.length === 0 && !activeCall && (
                    <div style={{
                        background: '#fff',
                        borderRadius: 12,
                        boxShadow: '0 2px 8px rgba(30,41,59,0.06)',
                        padding: 28,
                        marginBottom: 24,
                        border: '1px solid var(--border)',
                        textAlign: 'center'
                    }}>
                        <p>No incoming calls at the moment</p>
                    </div>
                )}

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, width: '100%' }}>
                    {incomingCalls.map((caller) => (
                        <div
                            key={caller.id}
                            style={{
                                minWidth: 340,
                                maxWidth: 400,
                                background: '#fff',
                                borderRadius: 12,
                                boxShadow: '0 2px 8px rgba(30,41,59,0.06)',
                                padding: 28,
                                marginBottom: 24,
                                border: '1px solid var(--border)'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                <FiPhoneIcon style={{ color: 'var(--primary)', fontSize: 22 }} />
                                <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{caller.name}</span>
                            </div>
                            <p style={{ marginBottom: 16 }}>Incoming call...</p>
                            <div style={{ display: 'flex', gap: 12 }}>
                                <button
                                    onClick={() => acceptCall(caller)}
                                    className="signout-btn"
                                    style={{ background: 'var(--primary)', fontWeight: 600 }}
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => rejectCall(caller)}
                                    className="signout-btn"
                                    style={{ background: 'var(--badge-bg)', fontWeight: 600 }}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Popup for caller left notification */}
                {callerLeft && (
                    <div className="call-modal-backdrop">
                        <div className="call-modal" style={{ maxWidth: 400 }}>
                            <h2 style={{ marginBottom: 16 }}>Call Ended</h2>
                            <p style={{ marginBottom: 24 }}>{activeCall?.name} has left the call.</p>
                            <button
                                onClick={closeCallerLeftPopup}
                                className="signout-btn"
                                style={{ background: 'var(--primary)', width: '100%' }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default SCADCalls;