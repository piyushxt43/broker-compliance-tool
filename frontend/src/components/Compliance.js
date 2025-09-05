
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Compliance() {
  const [checks, setChecks] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/compliance").then(res => {
      setChecks(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Compliance Checks</h1>
      <ul>
        {checks.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </div>
  );
}

export default Compliance;
