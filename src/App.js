import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [peers, setPeers] = useState(["Alice", "Bob", "Charlie", "David"]);
  const [selectedPeer, setSelectedPeer] = useState(null);
  const [scheduledTime, setScheduledTime] = useState("");
  const [interviewStarted, setInterviewStarted] = useState(false);

  return (
    <div className="app-container">
      <h1>Mock Interview Platform</h1>
      {!interviewStarted ? (
        <>
          <div className="dashboard">
            <h2>Available Peers</h2>
            <ul>
              {peers.map((peer, index) => (
                <li key={index} onClick={() => setSelectedPeer(peer)}>
                  {peer}
                </li>
              ))}
            </ul>
          </div>

          {selectedPeer && (
            <div className="matching">
              <h2>Match with {selectedPeer}</h2>
              <label>Select Date & Time:</label>
              <input
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
              />
              <button
                onClick={() => {
                  if (scheduledTime) setInterviewStarted(true);
                }}
              >
                Schedule & Start Interview
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="interview-room">
          <h2>Interview with {selectedPeer}</h2>
          <div className="video-placeholder">
            <p>🎥 Video Call Placeholder</p>
          </div>
          <button className="end-btn" onClick={() => setInterviewStarted(false)}>
            End Interview
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
