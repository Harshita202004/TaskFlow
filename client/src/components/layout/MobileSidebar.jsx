import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBarChart2,
  FiBell,
  FiCalendar,
  FiCheckSquare,
  FiClock,
  FiHome,
  FiLogOut,
  FiSettings,
  FiX,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: <FiHome size={20} /> },
  { name: "Tasks", path: "/tasks", icon: <FiCheckSquare size={20} /> },
  { name: "Calendar", path: "/calendar", icon: <FiCalendar size={20} /> },
  { name: "Analytics", path: "/analytics", icon: <FiBarChart2 size={20} /> },
  { name: "Focus Timer", path: "/dashboard#focus-timer", icon: <FiClock size={20} /> },
  { name: "Notifications", path: "/dashboard#notifications", icon: <FiBell size={20} /> },
  { name: "Settings", path: "/settings", icon: <FiSettings size={20} /> },
];

const MobileSidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const initials = user?.name?.slice(0, 1).toUpperCase() || "U";

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out");
    onClose();
    navigate("/");
  };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <motion.button
            type="button"
            aria-label="Close navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="relative flex h-full w-[min(86vw,22rem)] flex-col bg-orange-500 text-white shadow-2xl"
          >
            <div className="flex h-20 items-center justify-between border-b border-orange-400 px-5">
              <h1 className="text-3xl font-bold">TaskFlow</h1>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 hover:bg-white/25"
              >
                <FiX size={24} />
              </button>
            </div>

            <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
              {menuItems.map((item) => (
                <NavLink key={item.name} to={item.path} onClick={onClose}>
                  {({ isActive }) => (
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-4 rounded-xl px-4 py-3 transition-all ${
                        isActive ? "bg-orange-700 shadow-lg" : "text-orange-50 hover:bg-orange-600"
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.name}</span>
                    </motion.div>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="border-t border-orange-400 p-4">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-700 font-bold">
                  {initials}
                </div>
                <div className="min-w-0">
                  <h3 className="truncate font-semibold">{user?.name || "User"}</h3>
                  <p className="truncate text-sm text-orange-100">{user?.email}</p>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 font-semibold text-orange-600 transition hover:bg-orange-100"
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileSidebar;
