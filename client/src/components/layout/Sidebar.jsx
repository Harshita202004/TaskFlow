import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiBarChart2,
  FiCalendar,
  FiCheckSquare,
  FiHome,
  FiLogOut,
  FiSettings,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: <FiHome size={20} /> },
  { name: "Tasks", path: "/tasks", icon: <FiCheckSquare size={20} /> },
  { name: "Calendar", path: "/calendar", icon: <FiCalendar size={20} /> },
  { name: "Analytics", path: "/analytics", icon: <FiBarChart2 size={20} /> },
  { name: "Settings", path: "/settings", icon: <FiSettings size={20} /> },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const initials = user?.name?.slice(0, 1).toUpperCase() || "U";

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out");
    navigate("/");
  };

  return (
    <aside className="hidden lg:flex w-64 h-screen bg-orange-500 text-white flex-col shadow-xl sticky top-0">
      <div className="h-20 flex items-center justify-center border-b border-orange-400">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold"
        >
          TaskFlow
        </motion.h1>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => (
          <NavLink key={item.name} to={item.path}>
            {({ isActive }) => (
              <motion.div
                whileHover={{ x: 6 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                  isActive ? "bg-orange-700 shadow-lg" : "hover:bg-orange-600 text-orange-50"
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
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-full bg-orange-700 flex items-center justify-center font-bold">
            {initials}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold truncate">{user?.name || "User"}</h3>
            <p className="text-sm text-orange-100 truncate">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-orange-600 hover:bg-orange-100 transition font-semibold"
        >
          <FiLogOut />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
