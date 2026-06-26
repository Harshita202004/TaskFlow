import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiPlus,
  FiSearch,
  FiCalendar,
  FiFlag,
  FiCheckCircle,
  FiTrash2,
  FiEdit2,
} from "react-icons/fi";

import TaskForm from "../components/task/TaskForm";

const Tasks = () => {
  const [openForm, setOpenForm] = useState(false);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [priorityFilter, setPriorityFilter] = useState("All");
  const [editingTask, setEditingTask] = useState(null);
const [editingIndex, setEditingIndex] = useState(null);

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("taskflow-tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "taskflow-tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

 const saveTask = (task) => {
  if (editingTask !== null) {
    const updated = [...tasks];
    updated[editingIndex] = task;
    setTasks(updated);

    setEditingTask(null);
    setEditingIndex(null);
  } else {
    setTasks((prev) => [...prev, task]);
  }

  setOpenForm(false);
};

  const deleteTask = (index) => {
    const updated = [...tasks];
    updated.splice(index, 1);
    setTasks(updated);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" ||
      task.priority === priorityFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });

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
    setEditingIndex(null);
  }}
  onSave={saveTask}
  editingTask={editingTask}
/>

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Tasks
          </h1>

          <p className="text-gray-500 mt-1">
            Organize and manage your daily work.
          </p>

        </div>

        {tasks.length > 0 && (
          <button
            onClick={() => setOpenForm(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <FiPlus />
            Create Task
          </button>
        )}

      </div>

      {/* Search & Filters */}

      <div className="bg-white rounded-3xl border border-orange-100 shadow-sm p-6">

        <div className="grid lg:grid-cols-3 gap-5">

          <div className="relative">

            <FiSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-orange-100 outline-none focus:ring-2 focus:ring-orange-400"
            />

          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="border border-orange-100 rounded-xl px-4 py-3"
          >
            <option>All</option>
            <option>To Do</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) =>
              setPriorityFilter(e.target.value)
            }
            className="border border-orange-100 rounded-xl px-4 py-3"
          >
            <option>All</option>
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

        </div>

      </div>

      {/* Empty State / Task List */}
            {tasks.length === 0 ? (

        <div className="bg-white rounded-3xl border border-orange-100 shadow-sm">

          <div className="flex flex-col items-center justify-center text-center py-24 px-6">

            <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center">

              <FiCheckCircle
                size={45}
                className="text-orange-500"
              />

            </div>

            <h2 className="text-3xl font-bold text-gray-800 mt-8">
              No Tasks Yet
            </h2>

            <p className="text-gray-500 mt-3 max-w-md">
              Create your first task and start organizing your work like a pro.
            </p>

            <button
              onClick={() => setOpenForm(true)}
              className="mt-8 bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl flex items-center gap-2 transition"
            >

              <FiPlus />

              Create First Task

            </button>

          </div>

        </div>

      ) : (

        <div className="grid gap-5">

          {filteredTasks.map((task, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -2 }}
              className="bg-white rounded-3xl border border-orange-100 shadow-sm hover:shadow-lg transition-all p-6"
            >

              <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

                <div className="flex-1">

                  <div className="flex flex-wrap items-center gap-3">

                    <h2 className="text-xl font-bold text-gray-800">
                      {task.title}
                    </h2>

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

                      {task.dueDate || "No Due Date"}

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
                     onClick={() => {
                    setEditingTask(task);
                         setEditingIndex(index);
                                     setOpenForm(true);
                                 }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 transition"
                    >
                 <FiEdit2 />
                     Edit
                            </button>

                  <button
                    onClick={() => deleteTask(index)}
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
            {/* No Results after Search */}

      {tasks.length > 0 && filteredTasks.length === 0 && (

        <div className="bg-white rounded-3xl border border-orange-100 shadow-sm py-20">

          <div className="text-center">

            <FiSearch
              size={45}
              className="mx-auto text-orange-400"
            />

            <h2 className="text-2xl font-bold mt-6 text-gray-800">
              No Matching Tasks
            </h2>

            <p className="text-gray-500 mt-2">
              Try changing your search or filters.
            </p>

          </div>

        </div>

      )}

    </motion.div>
  );
};

export default Tasks;