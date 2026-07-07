import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
} from "react-icons/fi";
import { getErrorMessage } from "../api/http";
import { taskApi } from "../api/taskApi";
import ProductivityChart from "../components/charts/ProductivityChart";

const emptyAnalytics = {
  total: 0,
  completed: 0,
  inProgress: 0,
  pending: 0,
  overdue: 0,
  completionRate: 0,
  weeklyProductivity: [],
  prioritySplit: [],
  categoryProgress: [],
};

const Analytics = () => {
  const [analytics, setAnalytics] = useState(emptyAnalytics);
  const [loading, setLoading] = useState(true);

  const loadAnalytics = useCallback(async () => {
    setLoading(true);

    try {
      const { data } = await taskApi.analytics();
      setAnalytics(data.analytics);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(loadAnalytics, 0);

    window.addEventListener("taskflow:tasks-changed", loadAnalytics);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("taskflow:tasks-changed", loadAnalytics);
    };
  }, [loadAnalytics]);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl border border-orange-100 shadow-sm p-10 text-center text-gray-500">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
        {[
          ["Completion Rate", `${analytics.completionRate}%`, FiTrendingUp],
          ["Completed", analytics.completed, FiCheckCircle],
          ["Open", analytics.pending + analytics.inProgress, FiClock],
          ["Overdue", analytics.overdue, FiAlertCircle],
        ].map(([label, value, Icon]) => (
          <div
            key={label}
            className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
          >
            <Icon className="text-orange-500 text-2xl" />

            <p className="mt-4 text-gray-500">
              {label}
            </p>

            <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              {value}
            </h2>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">

        <div className="min-w-0 rounded-3xl border border-orange-100 bg-white p-4 shadow-sm sm:p-6 xl:col-span-8">
          <ProductivityChart
            data={analytics.weeklyProductivity}
          />
        </div>

        <div className="min-w-0 rounded-3xl border border-orange-100 bg-white p-4 shadow-sm sm:p-6 xl:col-span-4">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Priority Split
          </h2>

          {analytics.prioritySplit.length === 0 ? (
            <p className="text-gray-500">
              No priority data available.
            </p>
          ) : (
            analytics.prioritySplit.map(({ priority, count }) => {
              const width = analytics.total
                ? Math.round((count / analytics.total) * 100)
                : 0;

              return (
                <div key={priority} className="mb-5">
                  <div className="flex justify-between mb-2 text-sm text-gray-600">
                    <span>{priority}</span>
                    <span>{count}</span>
                  </div>

                  <div className="h-3 rounded-full bg-orange-100 overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full transition-all duration-500"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

    </div>
  );
};

export default Analytics;
