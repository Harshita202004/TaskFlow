import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowLeft, FiEye, FiEyeOff, FiUser } from "react-icons/fi";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { getErrorMessage } from "../api/http";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await register(form);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FFFDF9] px-4 py-6 sm:px-6 sm:py-10">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-orange-200/40 blur-[150px]" />

        <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-orange-100 blur-[150px]" />

        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[260px] w-[260px] rounded-full bg-orange-50 blur-[120px]" />

      </div>

      {/* Animated dots */}

      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ repeat: Infinity, duration: 5 }}
        className="absolute left-8 top-32 h-3 w-3 rounded-full bg-orange-400 sm:left-40 sm:top-40"
      />

      <motion.div
        animate={{ y: [0, 18, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute right-8 top-52 h-4 w-4 rounded-full bg-orange-300 sm:right-40 sm:top-60"
      />

      {/* Card */}

      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className="relative z-10 w-full max-w-md rounded-3xl border border-orange-100 bg-white/80 p-5 shadow-[0_20px_60px_rgba(249,115,22,.15)] backdrop-blur-xl sm:p-8"
      >

        <Link
          to="/"
          className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium mb-8"
        >
          <FiArrowLeft />
          Back to Home
        </Link>

        <div className="flex justify-center">

          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-400 flex items-center justify-center shadow-lg">

            <FiUser
              className="text-white"
              size={36}
            />

          </div>

        </div>

        <h1 className="mt-6 text-center text-3xl font-black text-slate-900 sm:text-4xl">
          Create Account
        </h1>

        <p className="text-center text-slate-500 mt-3 mb-8">
          Start organizing your work with TaskFlow
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block mb-2 font-medium text-slate-700">
              Full Name
            </label>

            <div className="relative">

              <FiUser className="absolute left-4 top-4 text-orange-400 text-xl" />

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="w-full rounded-2xl border border-orange-100 bg-orange-50/40 py-4 pl-12 pr-4 outline-none focus:border-orange-400 transition"
              />

            </div>

          </div>

          <div>

            <label className="block mb-2 font-medium text-slate-700">
              Email
            </label>

            <div className="relative">

              <MdEmail className="absolute left-4 top-4 text-orange-400 text-xl" />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="example@email.com"
                required
                className="w-full rounded-2xl border border-orange-100 bg-orange-50/40 py-4 pl-12 pr-4 outline-none focus:border-orange-400 transition"
              />

            </div>

          </div>

          <div>

            <label className="block mb-2 font-medium text-slate-700">
              Password
            </label>

            <div className="relative">

              <RiLockPasswordLine className="absolute left-4 top-4 text-orange-400 text-xl" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full rounded-2xl border border-orange-100 bg-orange-50/40 py-4 pl-12 pr-12 outline-none focus:border-orange-400 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-slate-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>

            </div>

          </div>
                    <motion.button
            whileHover={{
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-orange-600 to-yellow-400 py-4 text-lg font-semibold text-white shadow-[0_15px_40px_rgba(249,115,22,.30)] transition disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </motion.button>

        </form>

        <div className="mt-8 text-center">

          <p className="text-slate-600">
            Already have an account?
          </p>

          <Link
            to="/login"
            className="mt-2 inline-block font-semibold text-orange-600 hover:text-orange-700 transition"
          >
            Sign In
          </Link>

        </div>

      </motion.div>

      {/* Decorative Elements */}

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="absolute left-10 bottom-20 h-24 w-24 rounded-full bg-orange-200/30 blur-xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.25, 0.55, 0.25],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
        }}
        className="absolute right-10 top-24 h-28 w-28 rounded-full bg-orange-300/20 blur-xl"
      />

      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}
        className="absolute top-28 left-20 h-6 w-6 rounded-full border-2 border-dashed border-orange-300"
      />

      <motion.div
        animate={{
          rotate: [360, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 24,
          ease: "linear",
        }}
        className="absolute bottom-16 right-20 h-8 w-8 rounded-full border-2 border-dashed border-orange-200"
      />

      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="absolute left-12 top-1/2 text-orange-400 text-xl"
      >
        ✦
      </motion.div>

      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="absolute right-12 bottom-32 text-orange-300 text-2xl"
      >
        ✦
      </motion.div>

    </section>
  );
}

export default Register;
