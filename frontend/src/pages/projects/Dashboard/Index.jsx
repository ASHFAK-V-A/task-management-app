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
import { Skeleton, Box, Typography } from "@mui/material"

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
  const [loading, setLoading] = useState(true)
  const authHeader = { Authorization: `Bearer ${token}` }

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(
          "https://task-management-app-dux.onrender.com/api/tasks/stats",
          {
            headers: authHeader,
          }
        )

        if (!res.ok) throw new Error("Failed to fetch stats")

        const data = await res.json()
        setStats(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  // ⏳ Skeleton Loading View
  if (loading) {
    return (
      <Box
        sx={{
          maxWidth: 800,
          margin: "30px auto",
          padding: 3,
          borderRadius: 3,
          bgcolor: "#f5f5f5",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{ mb: 3, color: "black", fontWeight: 600 }}
        >
          Dashboard
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            gap: 4,
          }}
        >
          {/* Skeleton 1 */}
          <Box sx={{ width: 350, textAlign: "center" }}>
            <Skeleton
              variant="text"
              width="70%"
              height={30}
              sx={{ mx: "auto" }}
            />
            <Skeleton
              variant="circular"
              width={250}
              height={250}
              sx={{ mx: "auto", mt: 2 }}
            />
          </Box>

          {/* Skeleton 2 */}
          <Box sx={{ width: 350, textAlign: "center" }}>
            <Skeleton
              variant="text"
              width="70%"
              height={30}
              sx={{ mx: "auto" }}
            />
            <Skeleton
              variant="rectangular"
              width={300}
              height={200}
              sx={{ mx: "auto", mt: 2 }}
            />
          </Box>
        </Box>
      </Box>
    )
  }

  // 🧮 Calculate total
  const totalTasks =
    stats.statusCounts.pending +
    stats.statusCounts["in-progress"] +
    stats.statusCounts.completed

  // 📊 If no data found
  if (totalTasks === 0) {
    return (
      <Box
        sx={{
          maxWidth: 800,
          margin: "30px auto",
          padding: 3,
          borderRadius: 3,
          textAlign: "center",
          bgcolor: "#f5f5f5",
          color: "#333",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Dashboard
        </Typography>
        <Typography sx={{ mt: 3 }}>
          Result not found. Create tasks to see statistics.
        </Typography>
      </Box>
    )
  }

  // 🍰 Pie chart data
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

  // 📊 Bar chart data
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
    <Box
      sx={{
        maxWidth: 800,
        margin: "30px auto",
        padding: 3,
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{ mb: 3, fontWeight: 600, color: "black" }}
      >
        Dashboard
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          gap: 4,
        }}
      >
        {/* Pie Chart */}
        <Box sx={{ width: 350, textAlign: "center" }}>
          <Typography sx={{ mb: 1, color: "black", fontWeight: 500 }}>
            Tasks by Status
          </Typography>
          <Pie data={pieData} />
        </Box>

        {/* Bar Chart */}
        <Box sx={{ width: 350, textAlign: "center" }}>
          <Typography sx={{ mb: 1, color: "black", fontWeight: 500 }}>
            Tasks Due Overview
          </Typography>
          <Bar
            data={barData}
            options={{
              responsive: true,
              plugins: { legend: { display: false } },
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}
