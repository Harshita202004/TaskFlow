import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiBell, FiUser } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import { taskApi } from "../../api/taskApi";
import { useAuth } from "../../context/AuthContext";
import { getDashboardMetrics } from "../../utils/taskMetrics";

const pageInfo = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Welcome back! Manage your work efficiently.",
  },
  "/tasks": {
    title: "Tasks",
    subtitle: "Create, organize and manage your daily tasks.",
  },
  "/calendar": {
    title: "Task Calendar",
    subtitle: "View your schedule, deadlines and upcoming tasks.",
  },
  "/analytics": {
    title: "Analytics",
    subtitle: "Track productivity and task performance.",
  },
  "/settings": {
    title: "Settings",
    subtitle: "Manage your profile and application preferences.",
  },
};

const Navbar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const [tasks, setTasks] = useState([]);

  const loadNotifications = useCallback(async () => {
    try {
      const allTasks = await taskApi.listAll();
      setTasks(allTasks);
    } catch {}
  }, []);

  useEffect(() => {
    loadNotifications();

    window.addEventListener("taskflow:tasks-changed", loadNotifications);

    return () => {
      window.removeEventListener("taskflow:tasks-changed", loadNotifications);
    };
  }, [loadNotifications]);

  const metrics = useMemo(() => getDashboardMetrics(tasks), [tasks]);

  const badgeCount =
    metrics.overdue.length + metrics.upcoming.slice(0, 5).length;

  const current =
    pageInfo[location.pathname] || {
      title: "TaskFlow",
      subtitle: "",
    };

  return (
    <motion.header
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="bg-white border-b border-orange-100 px-5 lg:px-8 py-5 flex items-center justify-between"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          {current.title}
        </h1>

        <p className="text-gray-500 mt-1">
          {location.pathname === "/dashboard"
            ? `Welcome back, ${user?.name || "there"}. Manage your work efficiently.`
            : current.subtitle}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-3 rounded-xl bg-orange-100 hover:bg-orange-200 transition">
          <FiBell size={20} />

          {badgeCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center px-1">
              {badgeCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-orange-500 text-white flex items-center justify-center">
            <FiUser />
          </div>

          <div className="hidden md:block">
            <h3 className="font-semibold text-gray-800">
              {user?.name || "User"}
            </h3>

            <p className="text-sm text-gray-500">
              {user?.role || "Member"}
            </p>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;