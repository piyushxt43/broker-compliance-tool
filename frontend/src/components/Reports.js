
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Reports() {
  const [report, setReport] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/report").then(res => {
      setReport(res.data);
    });
  }, []);

  return (
    <div>
      <h1>Reports</h1>
      <pre>{report}</pre>
    </div>
  );
}

export default Reports;
