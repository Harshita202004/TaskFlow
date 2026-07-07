import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { getErrorMessage } from "../api/http";
import { taskApi } from "../api/taskApi";
import ActiveProjects from "../components/dashboard/ActiveProjects";
import RecentActivity from "../components/dashboard/RecentActivity";
import StatsCards from "../components/dashboard/StatsCards";
import TodayTasks from "../components/dashboard/TodayTasks";
import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import ProductivityChart from "../components/charts/ProductivityChart";
import CalendarWidget from "../components/calendar/CalendarWidget";
import FocusTimer from "../components/timer/FocusTimer";

const emptyMetrics = {
  total: 0,
  completed: 0,
  inProgress: 0,
  pending: 0,
  completionRate: 0,
  todayTasks: [],
  upcoming: [],
  overdue: [],
  recentActivity: [],
  categoryProgress: [],
  weeklyProductivity: [],
};

const cardStyle =
  "bg-white/90 backdrop-blur-sm rounded-3xl border border-orange-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 sm:p-6 h-full min-w-0";

const Dashboard = () => {
  const [metrics, setMetrics] = useState(emptyMetrics);
  const [calendarTasks, setCalendarTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = useCallback(async () => {
    setLoading(true);

    try {
      const [
        dashboardResponse,
        productivityResponse,
        calendarResponse,
      ] = await Promise.all([
        taskApi.dashboard(),
        taskApi.productivity(),
        taskApi.calendar(),
      ]);

      setMetrics({
        ...dashboardResponse.data.stats,
        todayTasks: dashboardResponse.data.todayTasks,
        upcoming: dashboardResponse.data.upcoming,
        overdue: dashboardResponse.data.overdue,
        recentActivity: dashboardResponse.data.recentActivity,
        categoryProgress: dashboardResponse.data.categoryProgress,
        weeklyProductivity: productivityResponse.data.weeklyProductivity,
      });

      setCalendarTasks(calendarResponse.data.tasks);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(loadDashboard, 0);

    window.addEventListener("taskflow:tasks-changed", loadDashboard);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener(
        "taskflow:tasks-changed",
        loadDashboard
      );
    };
  }, [loadDashboard]);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-md border border-orange-100 p-12 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>

        <p className="mt-5 text-gray-500 font-medium">
          Loading your dashboard...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="space-y-6 pb-10 sm:space-y-8"
    >
      <WelcomeBanner metrics={metrics} />

      <StatsCards metrics={metrics} />

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-7">
          <div className={cardStyle}>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
                  Weekly Productivity
                </h2>

                <p className="text-gray-500 mt-1">
                  Completed tasks this week
                </p>
              </div>

              <span className="w-fit rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
                This Week
              </span>
            </div>

            <ProductivityChart
              data={metrics.weeklyProductivity}
            />
          </div>
        </div>

        <div className="xl:col-span-5">
          <div id="focus-timer" className={cardStyle}>
            <CalendarWidget tasks={calendarTasks} />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-7">
          <div id="notifications" className={cardStyle}>
            <TodayTasks tasks={metrics.todayTasks} />
          </div>
        </div>

        <div className="xl:col-span-5">
          <div className={cardStyle}>
            <FocusTimer />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-6">
          <div className={cardStyle}>
            <ActiveProjects
              categories={metrics.categoryProgress}
            />
          </div>
        </div>

        <div className="xl:col-span-6">
          <div className={cardStyle}>
            <RecentActivity
              tasks={metrics.recentActivity}
            />
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Dashboard;
