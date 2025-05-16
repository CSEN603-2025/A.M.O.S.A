import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaPhone } from "react-icons/fa";
import {
    FiBell,
    FiHome,
    FiBriefcase,
    FiList,
    FiInfo,
    FiUsers,
    FiFileText,
    FiBarChart2,
    FiCalendar,
    FiPhone as FiPhoneIcon,
    FiTool,
    FiMic,
    FiMicOff,
    FiVideo,
    FiVideoOff,
    FiMonitor,
    FiX,
} from "react-icons/fi";
import "./CSS/SCADOfficeDashboard.css";
import ProstudentLayout from "./components/prostudentLayout";

const PROCalls = () => {
    const [incomingCalls, setIncomingCalls] = useState([
        { id: 1, name: "Ahmed" },
        { id: 2, name: "Ayman" },
        { id: 3, name: "Sarah" },
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
        setCallerLeft(false);
        setIncomingCalls((prev) => prev.filter((call) => call.id !== caller.id));
        setActiveCall(caller);
        startCamera();
    };

    const rejectCall = (caller) => {
        setIncomingCalls((prev) => prev.filter((call) => call.id !== caller.id));
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

    const toggleMic = () => setMicOn((prev) => !prev);

    const toggleCamera = () => {
        if (cameraOn) {
            stopCamera();
        } else {
            startCamera();
        }
        setCameraOn((prev) => !prev);
    };

    const toggleScreen = async () => {
        if (screenOn) {
            stopScreenShare();
        } else {
            try {
                const stream = await navigator.mediaDevices.getDisplayMedia({
                    video: true,
                });
                setScreenStream(stream);
            } catch (err) {
                console.error("Failed to share screen:", err);
            }
        }
        setScreenOn((prev) => !prev);
    };

    const stopScreenShare = () => {
        if (screenStream) {
            screenStream.getTracks().forEach((track) => track.stop());
            setScreenStream(null);
        }
    };

    const simulateCallerLeft = useCallback(() => {
        if (activeCall) {
            setCallerLeft(true);
        }
    }, [activeCall]);

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
            mediaStream.getTracks().forEach((track) => track.stop());
            setMediaStream(null);
        }
    };

    // This useEffect runs a 15-second timer once a call is active and callerLeft is false
    useEffect(() => {
        let timer;
        if (activeCall && !callerLeft) {
            timer = setTimeout(() => {
                simulateCallerLeft();
            }, 10000); // 15 seconds
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [activeCall, callerLeft, simulateCallerLeft]);

    return (
        <ProstudentLayout>
            <style>{`
                @keyframes fadeInModal {
                    from { opacity: 0; transform: translateY(40px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                @keyframes fadeInBackdrop {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: "0 32px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <h1 className="main-welcome" style={{ marginTop: 0, marginBottom: 32 }}>
                    Calls
                </h1>

                {/* Active Call Section */}
                {activeCall && (
                    <div
                        style={{
                            background: "#fff",
                            borderRadius: 12,
                            boxShadow: "0 2px 8px rgba(30,41,59,0.12)",
                            padding: 28,
                            marginBottom: 24,
                            border: "1px solid var(--border)",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: 16,
                            }}
                        >
                            <h2 style={{ margin: 0 }}>Call with {activeCall.name}</h2>
                            <button
                                onClick={endCall}
                                className="icon-btn"
                                style={{ background: "var(--badge-bg)", color: "#fff" }}
                            >
                                <FiX size={20} />
                            </button>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "center",
                                gap: "1rem",
                                marginBottom: "1.5rem",
                            }}
                        >
                            <div style={{ textAlign: "center" }}>
                                <div
                                    style={{
                                        width: "300px",
                                        height: "200px",
                                        backgroundColor: cameraOn ? "transparent" : "var(--bg-dark)",
                                        border: "1px solid var(--border)",
                                        borderRadius: 8,
                                        overflow: "hidden",
                                    }}
                                >
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        playsInline
                                        muted
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            display: cameraOn ? "block" : "none",
                                            objectFit: "cover",
                                        }}
                                    />
                                    {!cameraOn && (
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "#fff",
                                            }}
                                        >
                                            Camera is off
                                        </div>
                                    )}
                                </div>
                                <p style={{ marginTop: "0.5rem", fontSize: 14 }}>Your Camera</p>
                            </div>

                            <div style={{ textAlign: "center" }}>
                                <div
                                    style={{
                                        width: "300px",
                                        height: "200px",
                                        backgroundColor: screenOn ? "transparent" : "var(--bg-dark)",
                                        border: "1px solid var(--border)",
                                        borderRadius: 8,
                                        overflow: "hidden",
                                    }}
                                >
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
                                            objectFit: "contain",
                                        }}
                                    />
                                    {!screenOn && (
                                        <div
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                color: "#fff",
                                            }}
                                        >
                                            Screen not shared
                                        </div>
                                    )}
                                </div>
                                <p style={{ marginTop: "0.5rem", fontSize: 14 }}>Shared Screen</p>
                            </div>
                        </div>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: 16,
                                marginTop: 16,
                            }}
                        >
                            <button
                                onClick={toggleMic}
                                className="icon-btn"
                                style={{
                                    background: micOn ? "var(--primary)" : "var(--badge-bg)",
                                    color: "#fff",
                                    width: 44,
                                    height: 44,
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {micOn ? <FiMic size={20} /> : <FiMicOff size={20} />}
                            </button>
                            <button
                                onClick={toggleCamera}
                                className="icon-btn"
                                style={{
                                    background: cameraOn ? "var(--primary)" : "var(--badge-bg)",
                                    color: "#fff",
                                    width: 44,
                                    height: 44,
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {cameraOn ? <FiVideo size={20} /> : <FiVideoOff size={20} />}
                            </button>
                            <button
                                onClick={toggleScreen}
                                className="icon-btn"
                                style={{
                                    background: screenOn ? "var(--primary)" : "var(--badge-bg)",
                                    color: "#fff",
                                    width: 44,
                                    height: 44,
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <FiMonitor size={20} />
                            </button>
                        </div>
                    </div>
                )}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        marginBottom: 24,
                    }}
                >
                    <h2 className="section-title" style={{ margin: 0 }}>
                        Incoming Calls
                    </h2>
                </div>

                {incomingCalls.length === 0 && !activeCall && (
                    <div
                        style={{
                            background: "#fff",
                            borderRadius: 12,
                            boxShadow: "0 2px 8px rgba(30,41,59,0.06)",
                            padding: 28,
                            marginBottom: 24,
                            border: "1px solid var(--border)",
                            textAlign: "center",
                        }}
                    >
                        <p>No incoming calls at the moment</p>
                    </div>
                )}

                <div style={{ display: "flex", flexWrap: "wrap", gap: 32, width: "100%" }}>
                    {incomingCalls.map((caller) => (
                        <div
                            key={caller.id}
                            style={{
                                minWidth: 340,
                                maxWidth: 400,
                                background: "#fff",
                                borderRadius: 12,
                                boxShadow: "0 2px 8px rgba(30,41,59,0.06)",
                                padding: 28,
                                marginBottom: 24,
                                border: "1px solid var(--border)",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                                <FiPhoneIcon style={{ color: "var(--primary)", fontSize: 22 }} />
                                <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>{caller.name}</span>
                            </div>
                            <p style={{ marginBottom: 16 }}>Incoming call...</p>
                            <div style={{ display: "flex", gap: 12 }}>
                                <button
                                    onClick={() => acceptCall(caller)}
                                    className="signout-btn"
                                    style={{ background: "var(--primary)", fontWeight: 600 }}
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => rejectCall(caller)}
                                    className="signout-btn"
                                    style={{ background: "var(--badge-bg)", fontWeight: 600 }}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Popup for caller left notification */}
                {callerLeft && (
                    <div style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        background: "rgba(0,0,0,0.45)",
                        zIndex: 10000,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "background 0.2s",
                        animation: "fadeInBackdrop 0.4s"
                    }}>
                        <div style={{
                            background: "#fff",
                            borderRadius: 16,
                            boxShadow: "0 8px 32px rgba(30,41,59,0.18)",
                            padding: 36,
                            minWidth: 320,
                            maxWidth: 400,
                            width: "90%",
                            textAlign: "center",
                            border: "1px solid var(--border)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            fontFamily: "Segoe UI, Roboto, Helvetica Neue, Arial, Liberation Sans, sans-serif",
                            animation: "fadeInModal 0.5s cubic-bezier(.4,0,.2,1)"
                        }}>
                            <h2 style={{ marginBottom: 16, fontSize: 26, color: "var(--primary)", fontWeight: 700, letterSpacing: 0.2, fontFamily: 'inherit' }}>Call Ended</h2>
                            <p style={{ marginBottom: 32, fontSize: 18, color: "#222", fontWeight: 400, fontFamily: 'inherit', letterSpacing: 0.1 }}>{activeCall?.name} has left the call.</p>
                            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                                <button
                                    onClick={closeCallerLeftPopup}
                                    className="signout-btn"
                                    style={{
                                        background: "var(--primary)",
                                        color: "#fff",
                                        fontWeight: 600,
                                        fontSize: 16,
                                        borderRadius: 8,
                                        padding: "12px 0",
                                        border: "none",
                                        cursor: "pointer",
                                        boxShadow: "0 2px 8px rgba(30,41,59,0.10)",
                                        width: 180,
                                        fontFamily: 'inherit',
                                        transition: "background 0.2s, box-shadow 0.2s",
                                        outline: "none",
                                        display: "block",
                                        margin: "0 auto"
                                    }}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </ProstudentLayout>
    );
};

export default PROCalls;