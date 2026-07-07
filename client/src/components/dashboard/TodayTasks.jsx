import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiClipboard, FiPlus } from "react-icons/fi";
import { formatDate } from "../../utils/taskMetrics";

const TodayTasks = ({ tasks }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      className="h-full rounded-3xl border border-orange-100 bg-white p-4 shadow-sm sm:p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">Today's Tasks</h2>
          <p className="text-gray-500 mt-1">Tasks due today from MongoDB.</p>
        </div>

        <Link
          to="/tasks"
          className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl transition w-full sm:w-auto"
        >
          <FiPlus />
          Create Task
        </Link>
      </div>

      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-2 py-12 text-center sm:py-16">
          <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center mb-6">
            <FiClipboard size={42} className="text-orange-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 sm:text-2xl">No Tasks Due Today</h3>
          <p className="text-gray-500 mt-3 max-w-sm">
            Your tasks with today's due date will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {tasks.slice(0, 5).map((task) => (
            <div key={task._id} className="border border-orange-100 rounded-xl p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-800">{task.title}</h3>
                  <p className="text-sm text-gray-500">{formatDate(task.dueDate)}</p>
                </div>
                <span className="text-sm rounded-full bg-orange-100 text-orange-600 px-3 py-1">
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default TodayTasks;
