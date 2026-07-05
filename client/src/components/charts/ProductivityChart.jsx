import { motion } from "framer-motion";

const ProductivityChart = ({ data }) => {
  const maxCount = Math.max(...data.map((item) => item.count), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-md p-6"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-6">Weekly Productivity</h2>

      <div className="flex items-end justify-between h-72 gap-3">
        {data.map((item) => (
          <div key={item.day} className="flex flex-col items-center gap-3 flex-1">
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
