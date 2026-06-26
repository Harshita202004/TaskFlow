import { motion } from "framer-motion";

const data = [
  { day: "Mon", value: 45 },
  { day: "Tue", value: 70 },
  { day: "Wed", value: 55 },
  { day: "Thu", value: 85 },
  { day: "Fri", value: 65 },
  { day: "Sat", value: 90 },
  { day: "Sun", value: 75 },
];

const ProductivityChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-md p-6"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Weekly Productivity
      </h2>

      <div className="flex items-end justify-between h-72">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-3"
          >
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${item.value * 2}px` }}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="w-10 rounded-t-xl bg-gradient-to-t from-orange-500 to-amber-300"
            />

            <span className="text-sm text-gray-600">
              {item.day}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProductivityChart;