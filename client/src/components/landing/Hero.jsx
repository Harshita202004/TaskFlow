import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCheckSquare } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

const floating = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const Hero = () => {
  return (
    <section className="relative h-screen overflow-hidden bg-[#FFFDF9] flex items-center justify-center">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute -left-48 top-20 h-[420px] w-[420px] rounded-full bg-orange-200/40 blur-[150px]" />

        <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-orange-100/50 blur-[150px]" />

        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[260px] w-[260px] rounded-full bg-orange-50 blur-[120px]" />

      </div>

      {/* Animated SVG */}

      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40 -z-10"
        viewBox="0 0 1600 900"
        fill="none"
      >
        <path
          d="M120 250
             C350 120 550 420 820 250
             S1200 120 1450 320"
          stroke="#FDBA74"
          strokeWidth="2"
          strokeDasharray="8 10"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="8s"
            repeatCount="indefinite"
          />
        </path>

        <path
          d="M180 720
             C420 620 700 800 980 650
             S1320 520 1500 760"
          stroke="#FDBA74"
          strokeWidth="2"
          strokeDasharray="8 10"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="10s"
            repeatCount="indefinite"
          />
        </path>
      </svg>

      {/* Floating Dots */}

      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-36 left-40 w-3 h-3 rounded-full bg-orange-400"
      />

      <motion.div
        animate={{ y: [0, 18, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-52 right-40 w-3 h-3 rounded-full bg-orange-300"
      />

      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute bottom-32 left-1/4 w-4 h-4 rounded-full bg-orange-200"
      />

      <div className="relative z-20 max-w-5xl mx-auto px-6 pt-20 pb-10 text-center">

        <motion.div
          variants={floating}
          animate="animate"
          className="inline-flex mb-6"
        >
          <div className="w-24 h-24 rounded-[28px] bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-400 flex items-center justify-center shadow-[0_20px_60px_rgba(249,115,22,.35)]">

            <FiCheckSquare
              size={46}
              className="text-white"
            />

          </div>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
          className="text-5xl md:text-6xl font-black tracking-tight"
        >
          <span className="text-slate-900">Task</span>
          <span className="text-orange-500">Flow</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
          className="mt-4 text-lg md:text-xl text-slate-500"
        >
          Smart Daily Task & Productivity Tracker
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.6}
          className="mt-8 text-5xl md:text-6xl font-black leading-tight"
        >
          <span className="block text-slate-900">
            Organize your day,
          </span>

          <motion.span
            animate={{
              backgroundPosition: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
            }}
            style={{
              backgroundSize: "250%",
            }}
            className="block bg-gradient-to-r from-orange-600 via-orange-400 to-yellow-400 bg-clip-text text-transparent"
          >
            Achieve more.
          </motion.span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.8}
          className="max-w-2xl mx-auto mt-6 text-lg md:text-xl text-slate-600 leading-9"
        >
          Plan tasks, track progress, stay focused and organize every day
          with a clean productivity workspace built for students,
          developers and professionals.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="mt-8 flex flex-wrap justify-center gap-5"
        >
          <Link
            to="/register"
            className="group px-10 py-4 rounded-2xl bg-gradient-to-r from-orange-600 to-yellow-400 text-white font-semibold text-lg shadow-xl flex items-center gap-3 hover:scale-105 transition duration-300"
          >
            Get Started
            <FiArrowRight className="group-hover:translate-x-1 transition" />
          </Link>

          <Link
            to="/login"
            className="px-10 py-4 rounded-2xl bg-white border border-orange-100 shadow-lg text-slate-800 font-semibold text-lg hover:border-orange-300 hover:shadow-xl transition duration-300"
          >
            Sign In
          </Link>
        </motion.div>
                <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1.2}
         className="flex flex-wrap justify-center gap-4 mt-10 mb-16"
        >
          {[
            "Task Management",
            "Pomodoro Timer",
            "Analytics",
            "Calendar",
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-md border border-orange-100 px-5 py-3 shadow-md hover:shadow-lg transition"
            >
              <FaCheckCircle className="text-orange-500" />
              <span className="text-sm md:text-base font-medium text-slate-700">
                {item}
              </span>
            </div>
          ))}
        </motion.div>

      </div>

      {/* Decorative Elements */}

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="absolute left-12 top-1/2 w-24 h-24 rounded-full bg-orange-200/30 blur-xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.55, 0.25],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute right-16 top-36 w-28 h-28 rounded-full bg-orange-300/20 blur-xl"
      />

      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-32 left-24 w-6 h-6 rounded-full border-2 border-dashed border-orange-300"
      />

      <motion.div
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-20 right-24 w-8 h-8 rounded-full border-2 border-dashed border-orange-200"
      />

      <motion.div
        animate={{
          y: [0, -12, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
        }}
        className="absolute left-10 bottom-16 text-orange-400 text-xl"
      >
        ✦
      </motion.div>

      <motion.div
        animate={{
          y: [0, 12, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        }}
        className="absolute right-14 bottom-28 text-orange-300 text-2xl"
      >
        ✦
      </motion.div>

    </section>
  );
};

export default Hero;