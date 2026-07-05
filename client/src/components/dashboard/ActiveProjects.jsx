import { motion } from "framer-motion";
import { FiFolder } from "react-icons/fi";

const ActiveProjects = ({ categories }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl shadow-md p-6"
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
              className="border border-gray-100 rounded-xl p-5"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
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
