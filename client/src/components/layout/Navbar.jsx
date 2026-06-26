import { FiBell, FiSearch, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="h-20 bg-white border-b border-orange-100 flex items-center justify-between px-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome back! Manage your work efficiently.
        </p>
      </div>

      <div className="flex items-center gap-5">

        <div className="relative">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />

          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-64 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <button className="relative p-3 rounded-xl bg-orange-100 hover:bg-orange-200 transition">
          <FiBell size={20} />

          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-orange-500"></span>
        </button>

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-full bg-orange-500 flex items-center justify-center text-white">
            <FiUser />
          </div>

          <div className="hidden md:block">
            <h3 className="font-semibold text-gray-800">
              User
            </h3>

            <p className="text-sm text-gray-500">
              Administrator
            </p>
          </div>

        </div>

      </div>

    </motion.header>
  );
};

export default Navbar;