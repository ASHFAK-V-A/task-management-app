// src/App.js
import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, href } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { DashboardSidebar } from "./components/dashboard";
import ProtectedRoute from "./ProtectedRoutes";
import TaskManagment from "./pages/projects/TaskManagment/Tasks";
import Dashboard from "./pages/projects/Dashboard/Index";


// Helper to get user from localStorage
const getUserFromStorage = () => {
  const s = localStorage.getItem("user");
  return s ? JSON.parse(s) : null;
};


function App() {
  const [user, setUser] = useState(getUserFromStorage());
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Persist user & token
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const login = ({ token, user }) => {
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const routes = [
    { href: "/", component: <Navigate to="/dashboard" replace /> },
    { href: "/dashboard", component: <Dashboard /> },
    { href: "/dashboard/task", component: <TaskManagment /> },
  ];

  return (
    <BrowserRouter>
      {user && <Navbar user={user} logout={logout} />}
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : <Login onLogin={login} />}
        />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute user={user}>
              <DashboardSidebar />
            </ProtectedRoute>
          }
        >
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.href}
              element={React.cloneElement(route.component, { token })}
            />
          ))}

          {/* Catch-all invalid routes to dashboard*/}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>


      </Routes>

    </BrowserRouter>
  );
}

export default App;
