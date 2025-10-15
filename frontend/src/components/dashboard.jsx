// src/components/DashboardSidebar.jsx
import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
  Avatar,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Tooltip,
} from "@mui/material"
import { Link, useLocation, matchPath, Outlet } from "react-router-dom"
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined"
import TaskIcon from "@mui/icons-material/Task"
import Navbar from "./Navbar"
import { Navigate, useNavigate } from "react-router-dom"
import ProtectedRoute from "../ProtectedRoutes/index.js"
// Sidebar items
const items = [
  {
    icon: DashboardCustomizeOutlinedIcon,
    title: "Dashboard",
    href: "/dashboard",
  },
  { icon: TaskIcon, title: "Tasks", href: "/dashboard/task" },
]

export const DashboardSidebar = ({ pinned = true }) => {
  const { pathname } = useLocation()
  const [activeItem, setActiveItem] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    items.forEach((item) => {
      const active = !!matchPath({ path: item.href, end: true }, pathname)
      if (active) setActiveItem(item)
    })
  }, [pathname])

  const sidebarWidth = pinned ? 230 : 60

  const logout = () => {
    setToken(null)
    setUser(null)
    navigate("/login")
  }
  const storageUser = () => {
    const s = localStorage.getItem("user")
    return s ? JSON.parse(s) : null
  }
  const [user, setUser] = useState(storageUser())
  const [token, setToken] = useState(localStorage.getItem("token") || null)

  // Persist user & token
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      localStorage.removeItem("user")
    }
  }, [user])

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* <Navbar user={user} logout={logout} /> */}

      <Drawer
        open
        variant="permanent"
        PaperProps={{
          sx: {
            width: sidebarWidth,
            backgroundColor: "white",
            overflowX: "hidden",
          },
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            margin: 20,
            paddingLeft: 5,
          }}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <Avatar
              sx={{
                backgroundColor: "#49b8f7",
                color: "white",
                width: 26,
                height: 26,
              }}
            >
              T
            </Avatar>
          </Link>
          <Typography
            variant="body1"
            sx={{ marginLeft: 1, fontWeight: 600, fontSize: 15 }}
          >
            Task Management
          </Typography>
        </div>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            p: 2,
          }}
        >
          <List disablePadding>
            {items.map((item) => (
              <Link
                to={item.href}
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem
                  sx={{
                    backgroundColor:
                      activeItem?.title === item.title ? "#49b8f7" : "",
                    borderRadius: 2,
                    marginBottom: 1,
                    width: "90%",
                  }}
                >
                  <ListItemIcon>
                    <item.icon
                      sx={{
                        color:
                          activeItem?.title === item.title
                            ? "white"
                            : "rgb(84,84,84)",
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: 15,

                          color:
                            activeItem?.title === item.title
                              ? "white"
                              : "rgb(103,123,133)",
                        }}
                      >
                        {item.title}
                      </Typography>
                    }
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>
      {/* Main Content */}
      <div
        style={{
          flex: 1,
          marginLeft: sidebarWidth,
          padding: 20,
          minHeight: "100vh",
          marginTop: 40,
        }}
      >
        <Outlet />
      </div>
    </div>
  )
}

DashboardSidebar.propTypes = {
  pinned: PropTypes.bool,
}
