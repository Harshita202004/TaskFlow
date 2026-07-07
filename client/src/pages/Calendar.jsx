import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getErrorMessage } from "../api/http";
import { taskApi } from "../api/taskApi";
import CalendarWidget from "../components/calendar/CalendarWidget";
import TaskForm from "../components/task/TaskForm";

const Calendar = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadTasks = useCallback(async () => {
    const allTasks = await taskApi.listAll();
    setTasks(allTasks);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadTasks().catch((error) => toast.error(getErrorMessage(error)));
    }, 0);

    return () => clearTimeout(timeout);
  }, [loadTasks]);

  const saveTask = async (payload) => {
    setSaving(true);

    try {
      await taskApi.update(editingTask._id, payload);

      toast.success("Task updated");

      setEditingTask(null);

      await loadTasks();

      window.dispatchEvent(new Event("taskflow:tasks-changed"));
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <CalendarWidget
        tasks={tasks}
        onTaskClick={setEditingTask}
      />

      <TaskForm
        open={Boolean(editingTask)}
        editingTask={editingTask}
        onSave={saveTask}
        onClose={() => setEditingTask(null)}
        saving={saving}
      />
    </div>
  );
};

export default Calendar;
