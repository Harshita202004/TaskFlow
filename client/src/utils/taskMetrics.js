const startOfDay = (date) => {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
};

export const toInputDate = (value) => {
  if (!value) return "";
  return new Date(value).toISOString().slice(0, 10);
};

export const toLocalDateKey = (value) => {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatDate = (value) => {
  if (!value) return "No due date";
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const getDashboardMetrics = (tasks) => {
  const today = startOfDay(new Date());
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());

  const total = tasks.length;
  const completed = tasks.filter((task) => task.status === "Completed").length;
  const inProgress = tasks.filter((task) => task.status === "In Progress").length;
  const pending = tasks.filter((task) => task.status === "To Do").length;
  const overdue = tasks.filter(
    (task) => task.dueDate && new Date(task.dueDate) < today && task.status !== "Completed"
  );
  const upcoming = tasks
    .filter((task) => task.dueDate && new Date(task.dueDate) >= today && task.status !== "Completed")
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  const todayTasks = tasks.filter((task) => {
    if (!task.dueDate) return false;
    const due = new Date(task.dueDate);
    return due >= today && due < tomorrow;
  });

  const weeklyProductivity = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    const next = new Date(date);
    next.setDate(date.getDate() + 1);
    const count = tasks.filter((task) => {
      const completedAt = task.completedAt ? new Date(task.completedAt) : null;
      return completedAt && completedAt >= date && completedAt < next;
    }).length;

    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      count,
      value: total ? Math.round((count / Math.max(completed, 1)) * 100) : 0,
    };
  });

  const categories = tasks.reduce((acc, task) => {
    const category = task.category || "Uncategorized";
    acc[category] = acc[category] || { name: category, total: 0, completed: 0 };
    acc[category].total += 1;
    if (task.status === "Completed") acc[category].completed += 1;
    return acc;
  }, {});

  const categoryProgress = Object.values(categories)
    .map((category) => ({
      ...category,
      progress: Math.round((category.completed / category.total) * 100),
      status: category.completed === category.total ? "Completed" : "In Progress",
    }))
    .sort((a, b) => b.total - a.total);

  const recentActivity = [...tasks]
    .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
    .slice(0, 6);

  return {
    total,
    completed,
    inProgress,
    pending,
    overdue,
    upcoming,
    todayTasks,
    weeklyProductivity,
    categoryProgress,
    recentActivity,
  };
};
