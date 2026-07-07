import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { toLocalDateKey } from "../../utils/taskMetrics";

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const priorityColor = {
  High: "bg-red-500",
  Medium: "bg-amber-500",
  Low: "bg-emerald-500",
};

export default function CalendarWidget({ tasks = [] }) {
  const today = new Date();

  const [view, setView] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [selected, setSelected] = useState(today.getDate());

  const year = view.getFullYear();
  const month = view.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const cells = [];

  for (let i = 0; i < firstDay; i++) cells.push(null);

  for (let d = 1; d <= totalDays; d++) cells.push(d);

  while (cells.length < 42) cells.push(null);

  const taskMap = useMemo(() => {
    const map = {};

    tasks.forEach((task) => {
      if (!task.dueDate) return;

      const key = toLocalDateKey(task.dueDate);

      if (!map[key]) map[key] = [];

      map[key].push(task);
    });

    return map;
  }, [tasks]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl overflow-hidden bg-white border border-orange-100 shadow-xl"
    >
      <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <FiCalendar size={28} />
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                {view.toLocaleString("default", {
                  month: "long",
                })}
              </h2>

              <p className="opacity-90">{year}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() =>
                setView(new Date(year, month - 1, 1))
              }
              className="w-11 h-11 rounded-xl bg-white/20 hover:bg-white/30 transition"
            >
              <FiChevronLeft className="mx-auto text-xl" />
            </button>

            <button
              onClick={() =>
                setView(new Date(year, month + 1, 1))
              }
              className="w-11 h-11 rounded-xl bg-white/20 hover:bg-white/30 transition"
            >
              <FiChevronRight className="mx-auto text-xl" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-7 gap-3">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center font-semibold text-gray-500"
            >
              {day}
            </div>
          ))}

          {cells.map((day, index) => {
            if (!day)
              return (
                <div
                  key={index}
                  className="aspect-square"
                />
              );

            const date = new Date(year, month, day);

            const key = toLocalDateKey(date);

            const list = taskMap[key] || [];

            const isToday =
              date.toDateString() === today.toDateString();

            const isSelected = selected === day;

            return (
              <button
                key={index}
                onClick={() => setSelected(day)}
                className={`aspect-square rounded-2xl border transition-all p-2
                ${
                  isSelected
                    ? "bg-orange-500 text-white border-orange-500 shadow-lg"
                    : isToday
                    ? "bg-orange-50 border-orange-300"
                    : "border-gray-100 hover:border-orange-200 hover:bg-orange-50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-semibold">
                    {day}
                  </span>

                  {list.length > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/80 text-orange-600">
                      {list.length}
                    </span>
                  )}
                </div>

                <div className="mt-2 flex flex-wrap gap-1">
                  {list.slice(0, 3).map((task) => (
                    <span
                      key={task._id}
                      className={`w-2.5 h-2.5 rounded-full ${
                        priorityColor[task.priority] ||
                        "bg-orange-400"
                      }`}
                    />
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 border-t border-orange-100 pt-5 flex justify-center gap-8">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="text-sm text-gray-600">
              High
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span className="text-sm text-gray-600">
              Medium
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-sm text-gray-600">
              Low
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}