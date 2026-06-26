import { motion } from "framer-motion";
import { FiSun, FiTarget } from "react-icons/fi";

const WelcomeBanner = () => {
  const today = new Date();

  const date = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-orange-300 via-orange-400 to-amber-300 rounded-3xl p-8 shadow-lg"
    >
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
              <FiSun className="text-white text-2xl" />
            </div>

            <div>
              <p className="text-white/90 text-sm">{date}</p>

              <h1 className="text-4xl font-bold text-white mt-1">
                Welcome Back 👋
              </h1>
            </div>
          </div>

          <p className="text-white/90 text-lg mt-4 max-w-xl">
            Stay focused, complete your tasks on time, and make today your
            most productive day.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 min-w-[260px] shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <FiTarget className="text-orange-500 text-2xl" />

            <h2 className="font-bold text-lg text-gray-800">
              Today's Goal
            </h2>
          </div>

          <div className="mb-3 flex justify-between text-sm text-gray-600">
            <span>Progress</span>
            <span>75%</span>
          </div>

          <div className="w-full h-3 rounded-full bg-orange-100 overflow-hidden">
            <div className="w-3/4 h-full bg-gradient-to-r from-orange-500 to-orange-400 rounded-full"></div>
          </div>

          <p className="mt-4 text-gray-600">
            Complete <strong>3 more tasks</strong> to reach today's goal.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default WelcomeBanner;