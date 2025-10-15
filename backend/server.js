import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import TaskRoutes from "./routes/TaskRoutes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// ✅ Configure CORS
const allowedOrigins = [
  "http://localhost:3000",
  "https://task-management-app-dux.onrender.com",
  "https://task-management-app-dux.vercel.app"
]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin)) {
        return callback(null, true)
      } else {
        return callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
  })
)

// Middleware
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/tasks", TaskRoutes)

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server error" })
})

// Start server + connect DB
async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("✅ Connected to MongoDB")
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
  } catch (err) {
    console.error("❌ Failed to start server", err)
    process.exit(1)
  }
}


start()
