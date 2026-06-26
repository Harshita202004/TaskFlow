import { Routes, Route } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Tasks from "../pages/Tasks";

// Temporary Pages
const Calendar = () => (
  <div className="p-8 text-2xl font-bold text-gray-700">
    Calendar Page (Coming Soon)
  </div>
);

const Analytics = () => (
  <div className="p-8 text-2xl font-bold text-gray-700">
    Analytics Page (Coming Soon)
  </div>
);

const Settings = () => (
  <div className="p-8 text-2xl font-bold text-gray-700">
    Settings Page (Coming Soon)
  </div>
);

function AppRoutes() {
  return (
    <Routes>

      {/* Authentication */}

      <Route path="/" element={<Login />} />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* Dashboard Layout */}

      <Route element={<MainLayout />}>

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/tasks"
          element={<Tasks />}
        />

        <Route
          path="/calendar"
          element={<Calendar />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Route>

    </Routes>
  );
}

export default AppRoutes;