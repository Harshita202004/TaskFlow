import { motion } from "framer-motion";

import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import StatsCards from "../components/dashboard/StatsCards";
import TodayTasks from "../components/dashboard/TodayTasks";
import ActiveProjects from "../components/dashboard/ActiveProjects";
import RecentActivity from "../components/dashboard/RecentActivity";

import ProductivityChart from "../components/charts/ProductivityChart";
import CalendarWidget from "../components/calendar/CalendarWidget";
import FocusTimer from "../components/timer/FocusTimer";

const Dashboard = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 pb-8"
    >
      {/* Hero Banner */}
      <WelcomeBanner />

      {/* KPI Cards */}
      <StatsCards />

      {/* Chart + Calendar */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">

        <div className="xl:col-span-8">
          <div className="bg-white rounded-3xl shadow-sm border border-orange-100 p-6 h-full">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  Weekly Productivity
                </h2>

                <p className="text-gray-500 mt-1">
                  Track your work throughout the week.
                </p>

              </div>

              <div className="px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-semibold">
                This Week
              </div>

            </div>

            <ProductivityChart />

          </div>
        </div>

        <div className="xl:col-span-4">

          <div className="bg-white rounded-3xl shadow-sm border border-orange-100 p-6 h-full">

            <CalendarWidget />

          </div>

        </div>

      </section>

      {/* Tasks + Timer */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">

        <div className="xl:col-span-7">

          <div className="bg-white rounded-3xl shadow-sm border border-orange-100 p-6 h-full">

            <TodayTasks />

          </div>

        </div>

        <div className="xl:col-span-5">

          <div className="bg-white rounded-3xl shadow-sm border border-orange-100 p-6 h-full">

            <FocusTimer />

          </div>

        </div>

      </section>
            {/* Projects + Activity */}
      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">

        {/* Active Projects */}
        <div className="xl:col-span-6">

          <div className="bg-white rounded-3xl shadow-sm border border-orange-100 p-6 h-full">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  Active Projects
                </h2>

                <p className="text-gray-500 mt-1">
                  Monitor your ongoing work.
                </p>

              </div>

              <button className="px-4 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition">
                View All
              </button>

            </div>

            <ActiveProjects />

          </div>

        </div>

        {/* Recent Activity */}
        <div className="xl:col-span-6">

          <div className="bg-white rounded-3xl shadow-sm border border-orange-100 p-6 h-full">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-2xl font-bold text-gray-800">
                  Recent Activity
                </h2>

                <p className="text-gray-500 mt-1">
                  Latest updates from your workspace.
                </p>

              </div>

            </div>

            <RecentActivity />

          </div>

        </div>

      </section>

    </motion.div>
  );
};

export default Dashboard;