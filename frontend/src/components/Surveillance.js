
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Surveillance() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/surveillance").then(res => {
      setAlerts(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Surveillance Alerts</h1>
      <ul>
        {alerts.map((a, i) => (
          <li key={i}>{a}</li>
        ))}
      </ul>
    </div>
  );
}

export default Surveillance;
