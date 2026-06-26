import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiPlay, FiPause, FiRotateCcw } from "react-icons/fi";

const TOTAL_TIME = 25 * 60;

const FocusTimer = () => {
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
  if (!isRunning) return;

  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(timer);

        setTimeout(() => {
          alert("🎉 Focus Session Completed!");
        }, 0);

        return 0;
      }

      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [isRunning]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const progress = (timeLeft / TOTAL_TIME) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-md p-6"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-6">
        Focus Timer
      </h2>

      <div className="flex flex-col items-center">

        <div className="relative w-48 h-48">

          <svg
            className="absolute inset-0"
            width="192"
            height="192"
          >
            <circle
              cx="96"
              cy="96"
              r="80"
              stroke="#FED7AA"
              strokeWidth="12"
              fill="none"
            />

            <circle
              cx="96"
              cy="96"
              r="80"
              stroke="#F97316"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={503}
              strokeDashoffset={503 - (503 * progress) / 100}
              transform="rotate(-90 96 96)"
            />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center">

            <div className="text-center">
              <h1 className="text-5xl font-bold text-gray-800">
                {minutes}:{seconds}
              </h1>

              <p className="text-gray-500 mt-2">
                Pomodoro
              </p>
            </div>

          </div>

        </div>

        <div className="flex gap-4 mt-8">

          <button
            onClick={() => {
            if (timeLeft > 0) {
                    setIsRunning(true);
                    }
                }}
            className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-xl transition"
          >
            <FiPlay size={20} />
          </button>

          <button
            onClick={() => setIsRunning(false)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded-xl transition"
          >
            <FiPause size={20} />
          </button>

          <button
            onClick={() => {
              setTimeLeft(TOTAL_TIME);
              setIsRunning(false);
            }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-4 rounded-xl transition"
          >
            <FiRotateCcw size={20} />
          </button>

        </div>

        <div className="mt-8 bg-orange-50 rounded-xl p-4 w-full">

          <h3 className="font-semibold text-gray-800">
            Today's Focus
          </h3>

          <p className="text-gray-500 mt-1">
            3 Sessions Completed
          </p>

        </div>

      </div>
    </motion.div>
  );
};

export default FocusTimer;