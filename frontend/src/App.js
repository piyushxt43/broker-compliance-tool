
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Compliance from './components/Compliance';
import Surveillance from './components/Surveillance';
import Reports from './components/Reports';

function App() {
  const [view, setView] = useState("dashboard");

  let content;
  if (view === "dashboard") content = <Dashboard />;
  if (view === "compliance") content = <Compliance />;
  if (view === "surveillance") content = <Surveillance />;
  if (view === "reports") content = <Reports />;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar setView={setView} />
      <div style={{ flex: 1, padding: "20px", backgroundColor: "#181818" }}>
        {content}
      </div>
    </div>
  );
}

export default App;
