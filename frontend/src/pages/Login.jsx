import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"

export default function Login({ onLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" })
  const nav = useNavigate()
  const [serverError, setServerError] = useState(null)

  // handles submit in login form
  const onSubmit = async (data) => {
    setServerError(null)
    try {
      const res = await fetch(
        "https://task-management-app-dux.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      )
      const resData = await res.json()
      if (!res.ok) throw new Error(resData.message || "Login failed")
      onLogin({ token: resData.token, user: resData.user })
      nav("/dashboard")
    } catch (err) {
      setServerError(err.message)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-400 to-green-300">
      <div className="w-full max-w-lg bg-white p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">
          Welcome to Task Management
        </h1>
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
          Login
        </h2>

        {serverError && (
          <div className="text-red-600 mb-4 text-center">{serverError}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters",
                },
                maxLength: {
                  value: 20,
                  message: "Password cannot exceed 20 characters",
                },
              })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg transition"
            >
              Login
            </button>
          </div>
          <div className="text-center mt-4 text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
