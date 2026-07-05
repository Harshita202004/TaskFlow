const startOfDay = (date) => {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
};

const addDays = (date, days) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

export const buildTaskStats = (tasks) => {
  const today = startOfDay(new Date());
  const tomorrow = addDays(today, 1);
  const weekStart = addDays(today, -today.getDay());

  const total = tasks.length;
  const completed = tasks.filter((task) => task.status === "Completed").length;
  const inProgress = tasks.filter((task) => task.status === "In Progress").length;
  const pending = tasks.filter((task) => task.status === "To Do").length;
  const overdue = tasks
    .filter((task) => task.dueDate && task.dueDate < today && task.status !== "Completed")
    .sort((a, b) => a.dueDate - b.dueDate);
  const upcoming = tasks
    .filter((task) => task.dueDate && task.dueDate >= today && task.status !== "Completed")
    .sort((a, b) => a.dueDate - b.dueDate);
  const todayTasks = tasks.filter((task) => {
    if (!task.dueDate) return false;
    return task.dueDate >= today && task.dueDate < tomorrow;
  });

  const weeklyProductivity = Array.from({ length: 7 }, (_, index) => {
    const date = addDays(weekStart, index);
    const next = addDays(date, 1);
    const count = tasks.filter((task) => {
      if (!task.completedAt) return false;
      return task.completedAt >= date && task.completedAt < next;
    }).length;

    return {
      day: date.toLocaleDateString("en-US", { weekday: "short" }),
      count,
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

  const prioritySplit = ["High", "Medium", "Low"].map((priority) => ({
    priority,
    count: tasks.filter((task) => task.priority === priority).length,
  }));

  const recentActivity = [...tasks]
    .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt))
    .slice(0, 8);

  return {
    total,
    completed,
    inProgress,
    pending,
    completionRate: total ? Math.round((completed / total) * 100) : 0,
    overdue,
    upcoming,
    todayTasks,
    weeklyProductivity,
    categoryProgress,
    prioritySplit,
    recentActivity,
  };
};
