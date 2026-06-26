import { motion } from "framer-motion";
import {
  FiFolder,
  FiArrowRight,
} from "react-icons/fi";

const projects = [
  {
    id: 1,
    name: "TaskFlow Dashboard",
    progress: 70,
    status: "In Progress",
    color: "bg-orange-500",
  },
  {
    id: 2,
    name: "Authentication Module",
    progress: 100,
    status: "Completed",
    color: "bg-green-500",
  },
  {
    id: 3,
    name: "Calendar Integration",
    progress: 40,
    status: "Pending",
    color: "bg-blue-500",
  },
];

const ActiveProjects = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl shadow-md p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Active Projects
        </h2>

        <button className="flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-600">
          View All
          <FiArrowRight />
        </button>
      </div>

      <div className="space-y-5">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            whileHover={{ y: -3 }}
            className="border border-gray-100 rounded-xl p-5"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                  <FiFolder className="text-orange-500 text-xl" />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    {project.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {project.status}
                  </p>
                </div>
              </div>

              <span className="font-bold text-gray-700">
                {project.progress}%
              </span>
            </div>

            <div className="mt-4 h-3 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ duration: 1 }}
                className={`h-full rounded-full ${project.color}`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ActiveProjects;