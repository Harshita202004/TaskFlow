import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
} from "react-icons/fi";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const CalendarWidget = () => {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  const firstDay = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const totalCells = 42;

  const calendar = useMemo(() => {
    const arr = [];

    for (let i = 0; i < firstDay; i++) {
      arr.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      arr.push(i);
    }

    while (arr.length < totalCells) {
      arr.push(null);
    }

    return arr;
  }, [firstDay, daysInMonth]);

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl border border-orange-100 shadow-sm p-5 h-full"
    >
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
            <FiCalendar className="text-orange-500 text-xl" />
          </div>

          <div>

            <h2 className="font-bold text-gray-800 text-lg">
              Calendar
            </h2>

            <p className="text-sm text-gray-500">
              {monthName} {year}
            </p>

          </div>

        </div>

        <div className="flex gap-2">

          <button
            onClick={previousMonth}
            className="w-10 h-10 rounded-xl bg-orange-100 hover:bg-orange-200 transition"
          >
            <FiChevronLeft className="mx-auto" />
          </button>

          <button
            onClick={nextMonth}
            className="w-10 h-10 rounded-xl bg-orange-100 hover:bg-orange-200 transition"
          >
            <FiChevronRight className="mx-auto" />
          </button>

        </div>

      </div>

      <div className="grid grid-cols-7 gap-2 mt-6">

        {weekDays.map((day) => (
          <div
            key={day}
            className="text-center text-xs sm:text-sm font-semibold text-gray-500"
          >
            {day}
          </div>
        ))}

        {calendar.map((day, index) => {

          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          return (
            <motion.button
              key={index}
              whileHover={day ? { scale: 1.08 } : {}}
              whileTap={day ? { scale: 0.95 } : {}}
              className={`
                aspect-square rounded-xl
                flex items-center justify-center
                text-sm transition-all
                                ${
                  !day
                    ? "cursor-default"
                    : isToday
                    ? "bg-orange-500 text-white shadow-lg font-bold"
                    : "text-gray-700 hover:bg-orange-100"
                }
              `}
            >
              {day}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-6 border-t border-orange-100 pt-5">

  <div className="flex items-center justify-between">

    <div>
      <h3 className="font-bold text-gray-800">
        {today.toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        Task Progress
      </p>
    </div>

    <button
      onClick={() =>
        setCurrentDate(
          new Date(
            today.getFullYear(),
            today.getMonth(),
            1
          )
        )
      }
      className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition"
    >
      Today
    </button>

  </div>

  <div className="mt-5 flex items-center gap-3">

    <div className="w-7 h-7 rounded-md border-2 border-orange-400 flex items-center justify-center cursor-pointer hover:bg-orange-100 transition">

    </div>

    <div>
      <p className="font-medium text-gray-700">
        No task completed
      </p>

      <p className="text-sm text-gray-500">
        Complete a task to earn today's check.
      </p>
    </div>

  </div>

</div>

    </motion.div>
  );
};

export default CalendarWidget;