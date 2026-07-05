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

const Dashboard = () => {
  const [metrics, setMetrics] = useState(emptyMetrics);
  const [calendarTasks, setCalendarTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    try {
      const [dashboardResponse, productivityResponse, calendarResponse] = await Promise.all([
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
      window.removeEventListener("taskflow:tasks-changed", loadDashboard);
    };
  }, [loadDashboard]);

  if (loading) {
    return <div className="bg-white rounded-3xl p-10 text-gray-500">Loading dashboard...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 pb-8"
    >
      <WelcomeBanner />
      <StatsCards metrics={metrics} />

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-8">
          <div className="bg-white rounded-3xl shadow-sm border border-orange-100 p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Weekly Productivity</h2>
                <p className="text-gray-500 mt-1">Completed tasks this week.</p>
              </div>
              <div className="px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-semibold">
                This Week
              </div>
            </div>
            <ProductivityChart data={metrics.weeklyProductivity} />
          </div>
        </div>

        <div className="xl:col-span-4">
          <div className="bg-white rounded-3xl shadow-sm border border-orange-100 p-6 h-full">
            <CalendarWidget tasks={calendarTasks} />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-7">
          <div className="bg-white rounded-3xl shadow-sm border border-orange-100 p-6 h-full">
            <TodayTasks tasks={metrics.todayTasks} />
          </div>
        </div>

        <div className="xl:col-span-5">
          <div className="bg-white rounded-3xl shadow-sm border border-orange-100 p-6 h-full">
            <FocusTimer />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        <div className="xl:col-span-6">
          <div className="bg-white rounded-3xl shadow-sm border border-orange-100 p-6 h-full">
            <ActiveProjects categories={metrics.categoryProgress} />
          </div>
        </div>

        <div className="xl:col-span-6">
          <div className="bg-white rounded-3xl shadow-sm border border-orange-100 p-6 h-full">
            <RecentActivity tasks={metrics.recentActivity} />
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Dashboard;
