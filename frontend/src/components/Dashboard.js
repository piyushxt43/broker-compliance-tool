
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const initialData = [
  { name: 'Mon', trades: 200, alerts: 2 },
  { name: 'Tue', trades: 300, alerts: 1 },
  { name: 'Wed', trades: 250, alerts: 3 },
  { name: 'Thu', trades: 400, alerts: 2 },
  { name: 'Fri', trades: 350, alerts: 4 }
];

function Dashboard() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/metrics").then(res => {
      if (Array.isArray(res.data) && res.data.length) {
        setData(res.data);
      }
    }).catch(() => {
      // keep initial fallback data on error
    });
  }, []);
  return (
    <div>
      <h1>Command Center</h1>
      <p>System Online | Monitoring Brokers</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          <Line type="monotone" dataKey="trades" stroke="#ff6600" />
          <Line type="monotone" dataKey="alerts" stroke="#00ffcc" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Dashboard;
