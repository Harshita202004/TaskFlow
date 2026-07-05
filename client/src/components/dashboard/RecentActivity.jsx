import { motion } from "framer-motion";
import { FiCheckCircle, FiClock, FiEdit } from "react-icons/fi";

const timeAgo = (value) => {
  const diff = Date.now() - new Date(value).getTime();
  const minutes = Math.max(Math.floor(diff / 60000), 0);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  return `${Math.floor(hours / 24)} day ago`;
};

const RecentActivity = ({ tasks }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl shadow-md p-6"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h2>

      {tasks.length === 0 ? (
        <p className="text-gray-500">Task updates will appear here.</p>
      ) : (
        <div className="space-y-5">
          {tasks.map((task) => {
            const completed = task.status === "Completed";
            const Icon = completed ? FiCheckCircle : task.status === "In Progress" ? FiClock : FiEdit;

            return (
              <motion.div key={task._id} whileHover={{ x: 5 }} className="flex gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-orange-100 text-orange-600">
                  <Icon />
                </div>

                <div className="flex-1 border-b border-gray-100 pb-4">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {completed ? "Completed task" : "Updated task"}
                      </h3>
                      <p className="text-gray-500 text-sm mt-1">{task.title}</p>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">
                      {timeAgo(task.updatedAt || task.createdAt)}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default RecentActivity;
