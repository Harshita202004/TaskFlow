import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiClock,
  FiList,
  FiTrendingUp,
} from "react-icons/fi";

const stats = [
  {
    title: "Total Tasks",
    value: 24,
    change: "+8%",
    icon: FiList,
    bg: "bg-orange-100",
    color: "text-orange-600",
  },
  {
    title: "Completed",
    value: 18,
    change: "+15%",
    icon: FiCheckCircle,
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    title: "In Progress",
    value: 4,
    change: "+3%",
    icon: FiTrendingUp,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    title: "Pending",
    value: 2,
    change: "-2%",
    icon: FiClock,
    bg: "bg-red-100",
    color: "text-red-600",
  },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              y: -6,
              scale: 1.02,
            }}
            className="bg-white rounded-2xl p-6 shadow-md border border-gray-100"
          >
            <div className="flex justify-between items-center">
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${item.bg}`}
              >
                <Icon className={`text-2xl ${item.color}`} />
              </div>

              <span className="text-green-500 text-sm font-semibold">
                {item.change}
              </span>
            </div>

            <h3 className="mt-5 text-gray-500 font-medium">
              {item.title}
            </h3>

            <h2 className="text-4xl font-bold text-gray-800 mt-1">
              {item.value}
            </h2>

            <div className="mt-5 w-full h-2 rounded-full bg-gray-100 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${(item.value / 24) * 100}%`,
                }}
                transition={{
                  duration: 1,
                  delay: index * 0.2,
                }}
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