import { motion } from "framer-motion";
import { FiCheckCircle, FiClock, FiList, FiTrendingUp } from "react-icons/fi";

const StatsCards = ({ metrics }) => {
  const total = Math.max(metrics.total, 1);
  const stats = [
    {
      title: "Total Tasks",
      value: metrics.total,
      icon: FiList,
      bg: "bg-orange-100",
      color: "text-orange-600",
    },
    {
      title: "Completed",
      value: metrics.completed,
      icon: FiCheckCircle,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "In Progress",
      value: metrics.inProgress,
      icon: FiTrendingUp,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "Pending",
      value: metrics.pending,
      icon: FiClock,
      bg: "bg-red-100",
      color: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-md sm:p-6"
          >
            <div className="flex justify-between items-center">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${item.bg}`}>
                <Icon className={`text-2xl ${item.color}`} />
              </div>

              <span className="text-gray-500 text-sm font-semibold">
                {Math.round((item.value / total) * 100)}%
              </span>
            </div>

            <h3 className="mt-5 text-gray-500 font-medium">{item.title}</h3>
            <h2 className="mt-1 text-3xl font-bold text-gray-800 sm:text-4xl">{item.value}</h2>

            <div className="mt-5 w-full h-2 rounded-full bg-gray-100 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(item.value / total) * 100}%` }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400"
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default StatsCards;
