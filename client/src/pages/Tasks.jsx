import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import {
  FiCalendar,
  FiCheckCircle,
  FiEdit2,
  FiFlag,
  FiPlus,
  FiSearch,
  FiTrash2,
} from "react-icons/fi";
import { getErrorMessage } from "../api/http";
import { taskApi } from "../api/taskApi";
import TaskForm from "../components/task/TaskForm";
import { formatDate } from "../utils/taskMetrics";

const Tasks = () => {
  const [openForm, setOpenForm] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadTasks = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const { data } = await taskApi.list({
          page,
          limit: 8,
          search: search || undefined,
          status: statusFilter,
          priority: priorityFilter,
        });
        setTasks(data.tasks);
        setPagination(data.pagination);
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    },
    [priorityFilter, search, statusFilter]
  );

  useEffect(() => {
    const timeout = setTimeout(() => loadTasks(1), 250);
    return () => clearTimeout(timeout);
  }, [loadTasks]);

  const broadcastChange = () => {
    window.dispatchEvent(new Event("taskflow:tasks-changed"));
  };

  const saveTask = async (task) => {
    setSaving(true);
    try {
      if (editingTask) {
        await taskApi.update(editingTask._id, task);
        toast.success("Task updated");
      } else {
        await taskApi.create(task);
        toast.success("Task created");
      }
      setOpenForm(false);
      setEditingTask(null);
      await loadTasks(pagination.page);
      broadcastChange();
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  const deleteTask = async (task) => {
    try {
      await taskApi.remove(task._id);
      toast.success("Task deleted");
      await loadTasks(pagination.page);
      broadcastChange();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const toggleComplete = async (task) => {
    try {
      await taskApi.complete(task._id, task.status !== "Completed");
      toast.success(task.status === "Completed" ? "Task reopened" : "Task completed");
      await loadTasks(pagination.page);
      broadcastChange();
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto space-y-8"
    >
      <TaskForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setEditingTask(null);
        }}
        onSave={saveTask}
        editingTask={editingTask}
        saving={saving}
      />

      <div className="flex justify-end">
        <button
          onClick={() => setOpenForm(true)}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl flex items-center gap-2 justify-center"
        >
          <FiPlus />
          Create Task
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-orange-100 shadow-sm p-6">
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="relative">
            <FiSearch className="absolute left-4 top-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-orange-100 outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>


          
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="border border-orange-100 rounded-xl px-4 py-3"
          >
            <option>All Status</option>
            <option>To Do</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value)}
            className="border border-orange-100 rounded-xl px-4 py-3"
          >
            <option>All Priorities</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="bg-white rounded-3xl border border-orange-100 shadow-sm p-10 text-center text-gray-500">
          Loading tasks...
        </div>
      ) : tasks.length === 0 ? (
        <div className="bg-white rounded-3xl border border-orange-100 shadow-sm">
          <div className="flex flex-col items-center justify-center text-center py-24 px-6">
            <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center">
              <FiCheckCircle size={45} className="text-orange-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mt-8">No Tasks Found</h2>
            <p className="text-gray-500 mt-3 max-w-md">
              Create a task or adjust your filters to see your work list.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid gap-5">
          {tasks.map((task) => (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
              className="bg-white rounded-3xl border border-orange-100 shadow-sm hover:shadow-lg transition-all p-6"
            >
              <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-bold text-gray-800">{task.title}</h2>
                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {task.priority}
                    </span>
                  </div>

                  <p className="mt-4 text-gray-500 leading-7">
                    {task.description || "No description provided."}
                  </p>

                  <div className="flex flex-wrap gap-6 mt-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <FiCalendar />
                      {formatDate(task.dueDate)}
                    </div>
                    <div className="flex items-center gap-2">
                      <FiFlag />
                      {task.category}
                    </div>
                    <div className="flex items-center gap-2 text-green-600">
                      <FiCheckCircle />
                      {task.status}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 h-fit">
                  <button
                    onClick={() => toggleComplete(task)}
                    className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition"
                  >
                    <FiCheckCircle />
                    {task.status === "Completed" ? "Reopen" : "Complete"}
                  </button>
                  <button
                    onClick={() => {
                      setEditingTask(task);
                      setOpenForm(true);
                    }}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition"
                  >
                    <FiEdit2 />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task)}
                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition"
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {pagination.pages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => loadTasks(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="px-4 py-2 rounded-xl bg-white border border-orange-100 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-600">
            Page {pagination.page} of {pagination.pages}
          </span>
          <button
            onClick={() => loadTasks(pagination.page + 1)}
            disabled={pagination.page === pagination.pages}
            className="px-4 py-2 rounded-xl bg-white border border-orange-100 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Tasks;
