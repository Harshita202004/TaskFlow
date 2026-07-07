import { motion } from "framer-motion";
import { FiSun, FiTarget } from "react-icons/fi";

const WelcomeBanner = ({ metrics }) => {
  const today = new Date();

  const date = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const total = metrics?.total || 0;
  const completed = metrics?.completed || 0;

  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
  const remaining = Math.max(total - completed, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 via-orange-400 to-amber-300 p-5 shadow-xl sm:p-8"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/10" />

      {/* Floating Background */}
      <motion.div
        animate={{
          x: [0, 20, -10, 0],
          y: [0, -15, 10, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-20 -left-20 h-56 w-56 rounded-full bg-white/20 blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, -20, 10, 0],
          y: [0, 20, -10, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-yellow-100/20 blur-3xl"
      />

      {/* Shine */}
      <motion.div
        animate={{ x: ["-120%", "180%"] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "linear",
        }}
        className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12"
      />

      <div className="relative z-10 flex flex-col items-stretch justify-between gap-6 lg:flex-row lg:items-center lg:gap-8">
        {/* Left */}
        <div className="min-w-0 flex-1">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center">
            <motion.div
              animate={{
                y: [0, -5, 0],
                rotate: [0, 8, -8, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/25 shadow-lg backdrop-blur-md sm:h-14 sm:w-14"
            >
              <FiSun className="text-2xl text-yellow-200 sm:text-3xl" />
            </motion.div>

            <div>
              <p className="text-sm font-medium text-orange-50">{date}</p>

              <motion.h1
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-1 text-3xl font-extrabold text-white drop-shadow-md sm:text-4xl lg:text-5xl"
              >
                Welcome Back 👋
              </motion.h1>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="max-w-2xl text-base leading-relaxed text-orange-50 sm:text-lg"
          >
            Stay focused, complete your tasks on time, and make today your most
            productive day.
          </motion.p>
        </div>

        {/* Right Card */}
        <motion.div
          whileHover={{
            y: -5,
            scale: 1.02,
          }}
          transition={{
            type: "spring",
            stiffness: 250,
          }}
          className="w-full rounded-3xl bg-white/90 p-5 shadow-2xl backdrop-blur-xl sm:max-w-sm sm:p-6"
        >
          <div className="mb-5 flex items-center gap-3">
            <motion.div
              animate={{
                rotate: [0, 8, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            >
              <FiTarget className="text-2xl text-orange-500" />
            </motion.div>

            <h2 className="text-xl font-bold text-gray-800">
              Today's Goal
            </h2>
          </div>

          <div className="mb-2 flex items-center justify-between text-sm text-gray-600">
            <span>Progress</span>

            <span className="font-semibold text-orange-500">
              {progress}%
            </span>
          </div>

          <div className="h-3 w-full overflow-hidden rounded-full bg-orange-100">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
              }}
              className="h-full rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400"
            />
          </div>

          {total === 0 ? (
            <p className="mt-5 text-sm text-gray-500">
              Create your first task to start tracking your daily progress.
            </p>
          ) : (
            <p className="mt-5 text-sm text-gray-600">
              Complete{" "}
              <span className="font-bold text-orange-500">
                {remaining}
              </span>{" "}
              more {remaining === 1 ? "task" : "tasks"} to reach today's goal.
            </p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeBanner;
