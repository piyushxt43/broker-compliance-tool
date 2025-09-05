
import React from 'react';

function Sidebar({ setView }) {
  return (
    <div style={{
      width: "250px",
      backgroundColor: "#000",
      color: "#ff6600",
      padding: "20px"
    }}>
      <h2>TACTICAL OPS</h2>
      <div style={{marginTop: "20px"}}>
        <button onClick={() => setView("dashboard")} style={btnStyle}>Dashboard</button>
        <button onClick={() => setView("compliance")} style={btnStyle}>Compliance</button>
        <button onClick={() => setView("surveillance")} style={btnStyle}>Surveillance</button>
        <button onClick={() => setView("reports")} style={btnStyle}>Reports</button>
      </div>
    </div>
  );
}

const btnStyle = {
  display: "block",
  width: "100%",
  background: "transparent",
  border: "none",
  color: "#eee",
  padding: "10px",
  textAlign: "left",
  cursor: "pointer",
  fontFamily: "'Courier New', monospace"
};

export default Sidebar;
