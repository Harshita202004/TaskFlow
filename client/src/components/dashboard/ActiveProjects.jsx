import { motion } from "framer-motion";
import { FiFolder } from "react-icons/fi";

const ActiveProjects = ({ categories }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-2xl bg-white p-4 shadow-md sm:p-6"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-6">Category Progress</h2>

      {categories.length === 0 ? (
        <p className="text-gray-500">Create tasks to see category progress.</p>
      ) : (
        <div className="space-y-5">
          {categories.map((category) => (
            <motion.div
              key={category.name}
              whileHover={{ y: -3 }}
              className="rounded-xl border border-gray-100 p-4 sm:p-5"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 sm:h-12 sm:w-12">
                    <FiFolder className="text-orange-500 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{category.name}</h3>
                    <p className="text-sm text-gray-500">
                      {category.completed} of {category.total} completed
                    </p>
                  </div>
                </div>

                <span className="font-bold text-gray-700">{category.progress}%</span>
              </div>

              <div className="mt-4 h-3 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${category.progress}%` }}
                  transition={{ duration: 1 }}
                  className="h-full rounded-full bg-orange-500"
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ActiveProjects;
