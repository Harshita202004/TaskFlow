import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FiBell, FiMenu, FiUser } from "react-icons/fi";
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

const Navbar = ({ onMenuClick }) => {
  const { user } = useAuth();
  const location = useLocation();

  const [tasks, setTasks] = useState([]);


useEffect(() => {
  let isMounted = true;

  const fetchNotifications = async () => {
    try {
      const allTasks = await taskApi.listAll();

      if (isMounted) {
        setTasks(allTasks);
      }
    } catch (error) {
      console.error(error);
    }
  };

  fetchNotifications();

  const handleTasksChanged = () => {
    fetchNotifications();
  };

  window.addEventListener(
    "taskflow:tasks-changed",
    handleTasksChanged
  );

  return () => {
    isMounted = false;
    window.removeEventListener(
      "taskflow:tasks-changed",
      handleTasksChanged
    );
  };
}, []);

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
      className="flex items-center justify-between gap-3 border-b border-orange-100 bg-white px-4 py-4 sm:px-6 lg:px-8 lg:py-5"
    >
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600 transition hover:bg-orange-200 lg:hidden"
        >
          <FiMenu size={22} />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold text-gray-800 sm:text-3xl lg:overflow-visible lg:whitespace-normal">
            {current.title}
          </h1>

          <p className="mt-1 hidden text-sm text-gray-500 sm:block lg:text-base">
            {location.pathname === "/dashboard"
              ? `Welcome back, ${user?.name || "there"}. Manage your work efficiently.`
              : current.subtitle}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <button className="relative rounded-xl bg-orange-100 p-3 transition hover:bg-orange-200">
          <FiBell size={20} />

          {badgeCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center px-1">
              {badgeCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 text-white">
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
