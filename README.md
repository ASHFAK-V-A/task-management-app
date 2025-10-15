# 📝 Task Management App

A full-stack **Task Management Application** built with **MongoDB, Express, React, and Node.js (MERN stack)**.

It allows users to manage tasks with CRUD operations, view dashboard statistics, and see tasks due today or this week. The app uses JWT authentication for secure login.

---

Live URL : https://task-management-app-dux.vercel.app/

## 📊 Screenshots

- Dashboard showing **task statistics**
- CRUD operations for tasks
- Charts for tasks per status and tasks due today/this week

Dashboard
![alt text](<Screenshot 2025-10-15 173522.png>)

Task Page
![alt text](<Screenshot 2025-10-15 173535.png>)

## 🚀 Features

- User authentication and JWT-based protected routes
- **Task Management:** Create, Read, Update, Delete tasks
- **Dashboard Analytics:**

  - Number of tasks per status (Pending, In Progress, Completed)
  - Tasks due today / this week
  - Charts (Pie & Bar) with **Chart.js**

- Persistent login with `localStorage`
- Modern **React frontend** using **MUI**
- Responsive UI with clean design

---

## 🛠️ Tech Stack

- **Frontend:** React, Material-UI (MUI), Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT + Bcrypt
- **Charts:** Chart.js

---

## 📂 Project Structure

```
task-management-app/
├── backend/         # Node.js + Express API
├── frontend/        # React frontend
├── .gitignore
├── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/ASHFAK-V-A/task-management-app.git
cd task-management-app
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run the server:

```bash
npm run dev
```

Your backend should now be running at `http://localhost:5000`.

---

### 3. Setup Frontend

```bash
cd ../frontend
npm install
npm start
```

Your frontend should now be running at `http://localhost:3000`.

> Make sure the frontend API requests point to your backend URL (e.g., `http://localhost:5000/api/...`).

---

## 🔗 Deployment

### Backend

- Recommended platforms: **Render**
- Use your `.env` for `MONGO_URI` and `JWT_SECRET` in the hosting dashboard.

### Frontend

- Recommended platforms: **Vercel**

---
