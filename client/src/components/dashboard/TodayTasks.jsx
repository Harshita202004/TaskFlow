import { motion } from "framer-motion";
import { FiClipboard, FiPlus } from "react-icons/fi";

const TodayTasks = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-3xl border border-orange-100 shadow-sm p-6 h-full"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Today's Tasks
          </h2>

          <p className="text-gray-500 mt-1">
            Your daily task list will appear here.
          </p>
        </div>

        <button
          className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl transition w-full sm:w-auto"
        >
          <FiPlus />
          Create Task
        </button>

      </div>

      {/* Empty State */}

      <div className="flex flex-col items-center justify-center text-center py-16">

        <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center mb-6">

          <FiClipboard
            size={42}
            className="text-orange-500"
          />

        </div>

        <h3 className="text-2xl font-bold text-gray-800">
          No Tasks Yet
        </h3>

        <p className="text-gray-500 mt-3 max-w-sm">

          You haven't created any tasks yet.

          <br />

          Click the button above to create your first task.

        </p>

        <button
          className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl transition flex items-center gap-2"
        >
          <FiPlus />

          Create Your First Task

        </button>

      </div>

    </motion.div>
  );
};

export default TodayTasks;