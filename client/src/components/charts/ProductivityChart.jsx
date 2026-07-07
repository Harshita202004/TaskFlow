import { motion } from "framer-motion";

const ProductivityChart = ({ data }) => {
  const maxCount = Math.max(...data.map((item) => item.count), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-w-0 rounded-2xl bg-white p-4 shadow-md sm:p-6"
    >
      <h2 className="mb-6 text-lg font-bold text-gray-800 sm:text-xl">Weekly Productivity</h2>

      <div className="flex h-56 items-end justify-between gap-2 sm:h-72 sm:gap-3 lg:hidden">
        {data.map((item) => (
          <div key={item.day} className="flex min-w-0 flex-1 flex-col items-center gap-2 sm:gap-3">
            <span className="text-xs text-gray-500">{item.count}</span>
            <div className="flex h-40 w-full items-end justify-center sm:h-56">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${Math.max((item.count / maxCount) * 100, item.count ? 9 : 2)}%` }}
                transition={{ duration: 0.7 }}
                className="w-full max-w-8 rounded-t-xl bg-gradient-to-t from-orange-500 to-amber-300 sm:max-w-10"
              />
            </div>
            <span className="truncate text-xs text-gray-600 sm:text-sm">{item.day}</span>
          </div>
        ))}
      </div>

      <div className="hidden h-72 items-end justify-between gap-3 lg:flex">
        {data.map((item) => (
          <div key={item.day} className="flex flex-1 flex-col items-center gap-3">
            <span className="text-xs text-gray-500">{item.count}</span>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${Math.max((item.count / maxCount) * 220, item.count ? 20 : 4)}px` }}
              transition={{ duration: 0.7 }}
              className="w-full max-w-10 rounded-t-xl bg-gradient-to-t from-orange-500 to-amber-300"
            />
            <span className="text-sm text-gray-600">{item.day}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProductivityChart;
