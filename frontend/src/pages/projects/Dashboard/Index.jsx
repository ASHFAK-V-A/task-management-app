import React, { useEffect, useState } from "react"
import { Pie, Bar } from "react-chartjs-2"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js"

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
)

export default function Dashboard({ token }) {
  const [stats, setStats] = useState(null)
  const authHeader = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/tasks/stats", {
          headers: authHeader,
        })

        if (!res.ok) throw new Error("Failed to fetch stats")

        const data = await res.json()
        setStats(data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchStats()
  }, [])

  if (!stats) return <p>Loading...</p>

  const totalTasks =
    stats.statusCounts.pending +
    stats.statusCounts["in-progress"] +
    stats.statusCounts.completed

  // If no tasks, show message
  if (totalTasks === 0) {
    return (
      <div
        style={{
          maxWidth: "800px",
          margin: "30px auto",
          padding: "20px",
          borderRadius: "16px",
          textAlign: "center",
          background: "#f5f5f5",
          color: "#333",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h3>Dashboard</h3>
        <p style={{ marginTop: 30 }}>
          Result not found. Create tasks to see statistics.
        </p>
      </div>
    )
  }

  // Pie chart data
  const pieData = {
    labels: ["Pending", "In Progress", "Completed"],
    datasets: [
      {
        data: [
          stats.statusCounts.pending,
          stats.statusCounts["in-progress"],
          stats.statusCounts.completed,
        ],
        backgroundColor: ["#f39c12", "#3498db", "#2ecc71"],
      },
    ],
  }

  // Bar chart data
  const barData = {
    labels: ["Due Today", "Due This Week", "Total Tasks"],
    datasets: [
      {
        label: "Number of Tasks",
        data: [stats.dueToday, stats.dueThisWeek, totalTasks],
        backgroundColor: ["#e74c3c", "#3498db", "#2ecc71"],
      },
    ],
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "30px auto",
        padding: "20px",
        borderRadius: "16px",
        color: "#fff",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "1.3rem",
          fontWeight: "600",
          color: "black",
        }}
      >
        Dashboard
      </h3>

      {/* Charts side by side */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          gap: "30px",
        }}
      >
        {/* Pie Chart */}
        <div style={{ width: "350px" }}>
          <h4
            style={{
              textAlign: "center",
              marginBottom: "10px",
              color: "black",
            }}
          >
            Tasks by Status
          </h4>
          <Pie data={pieData} />
        </div>

        {/* Bar Chart */}
        <div style={{ width: "350px" }}>
          <h4
            style={{
              textAlign: "center",
              marginBottom: "10px",
              color: "black",
            }}
          >
            Tasks Due Overview
          </h4>
          <Bar
            data={barData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
          />
        </div>
      </div>
    </div>
  )
}
