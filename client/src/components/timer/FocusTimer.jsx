import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiPlay,
  FiPause,
  FiRotateCcw,
  FiClock,
} from "react-icons/fi";

const FocusTimer = () => {
  const [seconds, setSeconds] = useState(() => {
    const saved = localStorage.getItem("focus-seconds");
    return saved ? Number(saved) : 0;
  });

  const [running, setRunning] = useState(false);

  useEffect(() => {
    localStorage.setItem("focus-seconds", seconds);
  }, [seconds]);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);

  }, [running]);

  const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");

  const mins = String(
    Math.floor((seconds % 3600) / 60)
  ).padStart(2, "0");

  const secs = String(seconds % 60).padStart(2, "0");

  const progress = seconds % 3600;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-3xl border border-orange-100 shadow-sm p-6"
    >

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold text-gray-800">
          Focus Tracker
        </h2>

        <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">

          <FiClock className="text-orange-500 text-xl" />

        </div>

      </div>

      <div className="flex justify-center mt-8">

        <div className="relative w-56 h-56">

          <svg
            className="absolute inset-0"
            width="224"
            height="224"
          >

            <circle
              cx="112"
              cy="112"
              r="94"
              stroke="#FFE7D6"
              strokeWidth="12"
              fill="none"
            />

            <circle
              cx="112"
              cy="112"
              r="94"
              stroke="#F97316"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={590}
              strokeDashoffset={
                590 - (590 * progress) / 3600
              }
              transform="rotate(-90 112 112)"
            />

          </svg>

          <div className="absolute inset-0 flex items-center justify-center">

            <div className="text-center">

              <h1 className="text-5xl font-bold text-gray-800">

                {hrs}:{mins}:{secs}

              </h1>

            </div>

          </div>

        </div>

      </div>
            <div className="mt-10 flex flex-wrap justify-center gap-4">

        <button
          onClick={() => setRunning(true)}
          className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl transition w-full sm:w-auto"
        >
          <FiPlay />
          Start
        </button>

        <button
          onClick={() => setRunning(false)}
          className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl transition w-full sm:w-auto"
        >
          <FiPause />
          Pause
        </button>

        <button
          onClick={() => {
            setRunning(false);
            setSeconds(0);
            localStorage.removeItem("focus-seconds");
          }}
          className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl transition w-full sm:w-auto"
        >
          <FiRotateCcw />
          Reset
        </button>

      </div>

      <div className="mt-8 bg-orange-50 border border-orange-100 rounded-2xl p-5">

        <h3 className="text-lg font-semibold text-gray-800">
          Today's Focus Time
        </h3>

        <div className="mt-3 flex items-center justify-between">

          <span className="text-gray-500">
            Time Focused
          </span>

          <span className="text-2xl font-bold text-orange-500">
            {hrs}h {mins}m
          </span>

        </div>

      </div>

    </motion.div>
  );
};

export default FocusTimer; 