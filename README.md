# 🚀 TaskFlow – Smart Daily Task & Productivity Tracker

TaskFlow is a full-stack MERN task and productivity application that helps users organize daily tasks, track productivity, and manage schedules through a modern, responsive interface.

## 🌐 Live Demo

👉 **[TaskFlow Live](https://taskflow-twlk.onrender.com)**

## 💻 GitHub Repository

👉 **[TaskFlow Repository](https://github.com/Harshita202004/TaskFlow)**

---

## ✨ Features

- 🔐 JWT Authentication
- 🛡️ Protected Routes
- ✅ Task CRUD Operations
- 📊 Dashboard with Statistics
- 🎯 Daily Goal Progress
- 📅 Calendar View
- 📈 Analytics Dashboard
- ⏱️ Focus Timer (Pomodoro)
- 🔔 Notification Badge
- ⚙️ Settings Page
- 📱 Responsive UI
- ☁️ MongoDB Persistence

## 🛠️ Tech Stack

- React + Vite
- Tailwind CSS
- Framer Motion
- Express.js
- MongoDB Atlas + Mongoose
- JWT Authentication
- Axios
- bcrypt
- Cookie Parser

## 📦 Setup

Install dependencies:

```bash
cd server
npm install

cd ../client
npm install
```

Create `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/taskflow?retryWrites=true&w=majority
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

Create `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run the backend:

```bash
cd server
npm run dev
```

Run the frontend:

```bash
cd client
npm run dev
```

Open:

```
http://localhost:5173
```

## ✅ Verification

```bash
cd client
npm run build

cd ../server
node -e "import('./src/app.js').then(() => console.log('Server running successfully'))"
```
