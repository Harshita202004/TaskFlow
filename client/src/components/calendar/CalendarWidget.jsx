import { motion } from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const CalendarWidget = () => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];

  const dates = [
    "", 1, 2, 3, 4, 5, 6,
    7, 8, 9, 10, 11, 12, 13,
    14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27,
    28, 29, 30, 31,
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-2xl shadow-md p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          Calendar
        </h2>

        <div className="flex gap-2">
          <button className="w-9 h-9 rounded-lg bg-orange-100 hover:bg-orange-200 flex items-center justify-center transition">
            <FiChevronLeft />
          </button>

          <button className="w-9 h-9 rounded-lg bg-orange-100 hover:bg-orange-200 flex items-center justify-center transition">
            <FiChevronRight />
          </button>
        </div>
      </div>

      <p className="text-gray-500 mb-4 font-medium">
        June 2026
      </p>

      <div className="grid grid-cols-7 gap-2 mb-3">
        {days.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {dates.map((date, index) => (
          <motion.div
            whileHover={{ scale: 1.08 }}
            key={index}
            className={`h-10 rounded-lg flex items-center justify-center cursor-pointer transition
            ${
              date === 18
                ? "bg-orange-500 text-white font-bold"
                : date === ""
                ? ""
                : "hover:bg-orange-100 text-gray-700"
            }`}
          >
            {date}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-xl bg-orange-50 border border-orange-100">
        <h3 className="font-semibold text-gray-800">
          Upcoming
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          UI Design Review
        </p>

        <span className="inline-block mt-3 px-3 py-1 rounded-full bg-orange-500 text-white text-xs">
          Tomorrow • 11:00 AM
        </span>
      </div>
    </motion.div>
  );
};

export default CalendarWidget;