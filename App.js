import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function App() {
  const [summary, setSummary] = useState(null);
  const [statusData, setStatusData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState(30);

  useEffect(() => {
    setLoading(true);

    Promise.all([
      fetch(`http://localhost:5000/api/dashboard/summary?range=${range}`).then(
        (res) => res.json()
      ),
      fetch(`http://localhost:5000/api/dashboard/status-summary`).then((res) =>
        res.json()
      ),
      fetch(`http://localhost:5000/api/dashboard/sales-trend`).then((res) =>
        res.json()
      ),
    ]).then(([summaryData, statusSummary, trend]) => {
      setSummary(summaryData);
      setStatusData(statusSummary);
      setTrendData(trend);
      setLoading(false);
    });
  }, [range]);

  if (loading) {
    return <h2 style={{ padding: "30px" }}>Loading...</h2>;
  }

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial",
        backgroundColor: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <h1>Sales Dashboard</h1>

      {/* Date Filter */}
      <div style={{ marginTop: "15px" }}>
        <label>Select Date Range: </label>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          style={{ padding: "5px" }}
        >
          <option value={7}>Last 7 Days</option>
          <option value={30}>Last 30 Days</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "25px",
          flexWrap: "wrap",
        }}
      >
        {[
          { title: "Total Leads", value: summary.totalLeads },
          { title: "Contacted Leads", value: summary.contacted },
          { title: "Sales Closed", value: summary.closed },
          { title: "Total Revenue", value: summary.revenue },
        ].map((card, index) => (
          <div
            key={index}
            style={{
              padding: "20px",
              borderRadius: "10px",
              backgroundColor: "white",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              width: "220px",
              textAlign: "center",
            }}
          >
            <h3>{card.title}</h3>
            <p style={{ fontSize: "22px", fontWeight: "bold" }}>
              {card.value}
            </p>
          </div>
        ))}
      </div>

      {/* Status Table */}
      <h2 style={{ marginTop: "40px" }}>Lead Status Summary</h2>
      <table
        border="1"
        cellPadding="10"
        style={{
          marginTop: "10px",
          backgroundColor: "white",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Status</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {statusData.map((item, index) => (
            <tr key={index}>
              <td>{item.status}</td>
              <td>{item.count}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Sales Trend Line Chart */}
      <h2 style={{ marginTop: "40px" }}>Sales Trend</h2>
      <LineChart
        width={700}
        height={300}
        data={trendData}
        style={{ backgroundColor: "white", padding: "20px" }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
      </LineChart>

      {/* Pie Chart */}
      <h2 style={{ marginTop: "40px" }}>Lead Distribution</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={statusData}
          dataKey="count"
          nameKey="status"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {statusData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default App;


