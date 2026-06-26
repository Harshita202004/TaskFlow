import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiPlusCircle,
  FiClock,
  FiEdit,
} from "react-icons/fi";

const activities = [
  {
    id: 1,
    icon: <FiPlusCircle />,
    title: "Created a new task",
    description: "Finish TaskFlow Dashboard",
    time: "5 min ago",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    icon: <FiEdit />,
    title: "Updated task",
    description: "Login page improvements",
    time: "25 min ago",
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: 3,
    icon: <FiCheckCircle />,
    title: "Completed task",
    description: "Register Page",
    time: "1 hour ago",
    color: "bg-green-100 text-green-600",
  },
  {
    id: 4,
    icon: <FiClock />,
    title: "Deadline Reminder",
    description: "Backend API due tomorrow",
    time: "2 hours ago",
    color: "bg-red-100 text-red-600",
  },
];

const RecentActivity = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl shadow-md p-6"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Recent Activity
      </h2>

      <div className="space-y-5">
        {activities.map((activity) => (
          <motion.div
            key={activity.id}
            whileHover={{ x: 5 }}
            className="flex gap-4"
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${activity.color}`}
            >
              {activity.icon}
            </div>

            <div className="flex-1 border-b border-gray-100 pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {activity.title}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1">
                    {activity.description}
                  </p>
                </div>

                <span className="text-xs text-gray-400">
                  {activity.time}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentActivity;