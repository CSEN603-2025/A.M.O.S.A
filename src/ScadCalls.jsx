import React, { useState, useRef } from "react";
import { FaPhone, FaBell } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
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
            <main className="dashboard-main">
                <h2>Incoming Calls</h2>

                {incomingCalls.length === 0 && !activeCall && <p>No incoming calls.</p>}

                <div className="calls-container">
                    {incomingCalls.map((caller) => (
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
                                <button onClick={toggleMic} className="btn control">{micOn ? "Mute Mic" : "Unmute Mic"}</button>
                                <button onClick={toggleCamera} className="btn control">{cameraOn ? "Turn Off Camera" : "Turn On Camera"}</button>
                                <button onClick={toggleScreen} className="btn control">{screenOn ? "Stop Screen" : "Share Screen"}</button>
                                <button onClick={simulateCallerLeft} className="btn control">Simulate Caller Left</button>
                                <button onClick={endCall} className="btn leave">End Call</button>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                    gap: "1rem",
                                    marginTop: "1rem"
                                }}
                            >
                                <div style={{ textAlign: "center" }}>
                                    <div
                                        style={{
                                            width: "300px",
                                            height: "200px",
                                            backgroundColor: cameraOn ? "transparent" : "black",
                                            border: "1px solid #ccc"
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
                                                display: cameraOn ? "block" : "none"
                                            }}
                                        />
                                    </div>
                                    <p style={{ marginTop: "0.5rem" }}>Camera</p>
                                </div>

                                <div style={{ textAlign: "center" }}>
                                    <div
                                        style={{
                                            width: "300px",
                                            height: "200px",
                                            backgroundColor: screenOn ? "transparent" : "black",
                                            border: "1px solid #ccc"
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
                                                display: screenOn ? "block" : "none"
                                            }}
                                        />
                                    </div>
                                    <p style={{ marginTop: "0.5rem" }}>Shared Screen</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {callerLeft && (
                <div className="popup-overlay">
                    <div className="caller-left-popup">
                        <h2>Call Ended</h2>
                        <p>{activeCall?.name} has left the call.</p>
                        <button onClick={closeCallerLeftPopup} className="btn close-popup">Close</button>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default SCADCalls;
