import { motion } from "framer-motion";
import {
  FiCheckCircle,
  FiClock,
  FiFlag,
} from "react-icons/fi";

const tasks = [
  {
    id: 1,
    title: "Design Dashboard UI",
    priority: "High",
    status: "In Progress",
    color: "bg-red-100 text-red-600",
  },
  {
    id: 2,
    title: "Build Login API",
    priority: "Medium",
    status: "Pending",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 3,
    title: "Complete Sidebar",
    priority: "Low",
    status: "Completed",
    color: "bg-green-100 text-green-600",
  },
  {
    id: 4,
    title: "Connect MySQL Database",
    priority: "High",
    status: "Pending",
    color: "bg-red-100 text-red-600",
  },
];

const TodayTasks = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl shadow-md p-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Today's Tasks
        </h2>

        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
          {tasks.length} Tasks
        </span>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            whileHover={{ scale: 1.02 }}
            className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-800">
                  {task.title}
                </h3>

                <div className="flex gap-4 mt-2 text-sm text-gray-500">

                  <div className="flex items-center gap-1">
                    <FiFlag />
                    {task.priority}
                  </div>

                  <div className="flex items-center gap-1">
                    <FiClock />
                    Today
                  </div>

                </div>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${task.color}`}
              >
                {task.status}
              </span>
            </div>

            {task.status === "Completed" && (
              <div className="flex items-center gap-2 text-green-600 mt-3">
                <FiCheckCircle />
                Completed Successfully
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TodayTasks;