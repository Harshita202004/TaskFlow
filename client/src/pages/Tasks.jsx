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
      className="mx-auto max-w-7xl space-y-6 sm:space-y-8"
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

      <div className="flex justify-stretch sm:justify-end">
        <button
          onClick={() => setOpenForm(true)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-white hover:bg-orange-600 sm:w-auto"
        >
          <FiPlus />
          Create Task
        </button>
      </div>

      <div className="rounded-3xl border border-orange-100 bg-white p-4 shadow-sm sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
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
            className="w-full rounded-xl border border-orange-100 px-4 py-3"
          >
            <option>All Status</option>
            <option>To Do</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(event) => setPriorityFilter(event.target.value)}
            className="w-full rounded-xl border border-orange-100 px-4 py-3 sm:col-span-2 lg:col-span-1"
          >
            <option>All Priorities</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="rounded-3xl border border-orange-100 bg-white p-8 text-center text-gray-500 shadow-sm sm:p-10">
          Loading tasks...
        </div>
      ) : tasks.length === 0 ? (
        <div className="bg-white rounded-3xl border border-orange-100 shadow-sm">
          <div className="flex flex-col items-center justify-center px-5 py-16 text-center sm:px-6 sm:py-24">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 sm:h-24 sm:w-24">
              <FiCheckCircle size={45} className="text-orange-500" />
            </div>
            <h2 className="mt-8 text-2xl font-bold text-gray-800 sm:text-3xl">No Tasks Found</h2>
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
              className="min-w-0 rounded-3xl border border-orange-100 bg-white p-4 shadow-sm transition-all hover:shadow-lg sm:p-6"
            >
              <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="break-words text-lg font-bold text-gray-800 sm:text-xl">{task.title}</h2>
                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {task.priority}
                    </span>
                  </div>

                  <p className="mt-4 break-words leading-7 text-gray-500">
                    {task.description || "No description provided."}
                  </p>

                  <div className="mt-6 flex flex-col gap-3 text-sm text-gray-500 sm:flex-row sm:flex-wrap sm:gap-6">
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

                <div className="flex h-fit flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
                  <button
                    onClick={() => toggleComplete(task)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 px-5 py-3 text-white transition hover:bg-green-600 sm:w-auto"
                  >
                    <FiCheckCircle />
                    {task.status === "Completed" ? "Reopen" : "Complete"}
                  </button>
                  <button
                    onClick={() => {
                      setEditingTask(task);
                      setOpenForm(true);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-white transition hover:bg-blue-600 sm:w-auto"
                  >
                    <FiEdit2 />
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-white transition hover:bg-red-600 sm:w-auto"
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
        <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <button
            onClick={() => loadTasks(pagination.page - 1)}
            disabled={pagination.page === 1}
            className="rounded-xl border border-orange-100 bg-white px-4 py-2 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-center text-gray-600">
            Page {pagination.page} of {pagination.pages}
          </span>
          <button
            onClick={() => loadTasks(pagination.page + 1)}
            disabled={pagination.page === pagination.pages}
            className="rounded-xl border border-orange-100 bg-white px-4 py-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Tasks;
