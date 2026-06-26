import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

const TaskForm = ({ open, onClose, onSave, editingTask }) => {

  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "To Do",
    dueDate: "",
    category: "Personal",
  });
useEffect(() => {
  if (!open) return;

  queueMicrotask(() => {
    setTask(
      editingTask ?? {
        title: "",
        description: "",
        priority: "Medium",
        status: "To Do",
        dueDate: "",
        category: "Personal",
      }
    );
  });
}, [editingTask, open]);
  if (!open) return null;

  const handleChange = (e) => {
    setTask((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.title.trim()) {
      alert("Please enter a task title.");
      return;
    }

    onSave(task);

    setTask({
      title: "",
      description: "",
      priority: "Medium",
      status: "To Do",
      dueDate: "",
      category: "Personal",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden"
      >

        <div className="flex items-center justify-between p-6 border-b">

         <h2 className="text-2xl font-bold text-gray-800">
  {editingTask ? "Edit Task" : "Create Task"}
</h2>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center"
          >
            <FiX size={22} />
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >

          <div>

            <label className="font-medium text-gray-700">
              Task Title
            </label>

            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className="mt-2 w-full border border-orange-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
              required
            />

          </div>

          <div>

            <label className="font-medium text-gray-700">
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              value={task.description}
              onChange={handleChange}
              placeholder="Task description..."
              className="mt-2 w-full border border-orange-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            />

          </div>

          <div className="grid md:grid-cols-2 gap-5">
                      <div>
            <label className="font-medium text-gray-700">
              Priority
            </label>

            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
              className="mt-2 w-full border border-orange-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

        

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className="font-medium text-gray-700">
              Due Date
            </label>

            <input
              type="date"
              name="dueDate"
              value={task.dueDate}
              onChange={handleChange}
              className="mt-2 w-full border border-orange-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">
              Category
            </label>

            <select
              name="category"
              value={task.category}
              onChange={handleChange}
              className="mt-2 w-full border border-orange-100 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option>Personal</option>
              <option>Work</option>
              <option>Study</option>
              <option>Shopping</option>
              <option>Health</option>
            </select>
          </div>

        </div>

        <div className="flex justify-end gap-4 pt-4">

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white transition"
          >
           {editingTask ? "Save Changes" : "Create Task"}
          </button>

        </div>

      </form>

    </motion.div>

  </div>
  );
};

export default TaskForm;