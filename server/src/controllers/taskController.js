import Task from "../models/Task.js";
import { buildTaskStats } from "../utils/taskStats.js";

const buildTaskQuery = (req) => {
  const { search, status, priority, category, from, to, due } = req.query;
  const query = { user: req.user._id };

  if (search) {
    query.$text = { $search: search };
  }
  if (status && status !== "All") query.status = status;
  if (priority && priority !== "All") query.priority = priority;
  if (category && category !== "All") query.category = category;
  if (from || to) {
    query.dueDate = {};
    if (from) query.dueDate.$gte = new Date(from);
    if (to) query.dueDate.$lte = new Date(to);
  }
  if (due === "overdue") {
    query.dueDate = { $lt: new Date() };
    query.status = { $ne: "Completed" };
  }
  if (due === "upcoming") {
    query.dueDate = { $gte: new Date() };
    query.status = { $ne: "Completed" };
  }

  return query;
};

export const getTasks = async (req, res, next) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(req.query.limit) || 50, 1), 100);
    const skip = (page - 1) * limit;
    const query = buildTaskQuery(req);

    const [tasks, total] = await Promise.all([
      Task.find(query).sort({ dueDate: 1, createdAt: -1 }).skip(skip).limit(limit),
      Task.countDocuments(query),
    ]);

    res.json({
      tasks,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit) || 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getDashboardStats = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ updatedAt: -1 });
    const stats = buildTaskStats(tasks);

    res.json({
      stats: {
        total: stats.total,
        completed: stats.completed,
        inProgress: stats.inProgress,
        pending: stats.pending,
        completionRate: stats.completionRate,
      },
      todayTasks: stats.todayTasks,
      upcoming: stats.upcoming.slice(0, 8),
      overdue: stats.overdue.slice(0, 8),
      recentActivity: stats.recentActivity,
      categoryProgress: stats.categoryProgress,
    });
  } catch (error) {
    next(error);
  }
};

export const getWeeklyProductivity = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id, status: "Completed" });
    const { weeklyProductivity } = buildTaskStats(tasks);
    res.json({ weeklyProductivity });
  } catch (error) {
    next(error);
  }
};

export const getAnalytics = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    const stats = buildTaskStats(tasks);

    res.json({
      analytics: {
        total: stats.total,
        completed: stats.completed,
        inProgress: stats.inProgress,
        pending: stats.pending,
        overdue: stats.overdue.length,
        completionRate: stats.completionRate,
        weeklyProductivity: stats.weeklyProductivity,
        prioritySplit: stats.prioritySplit,
        categoryProgress: stats.categoryProgress,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCalendarTasks = async (req, res, next) => {
  try {
    const { month, year } = req.query;
    const query = { user: req.user._id, dueDate: { $ne: null } };

    if (month && year) {
      const start = new Date(Number(year), Number(month) - 1, 1);
      const end = new Date(Number(year), Number(month), 1);
      query.dueDate = { $gte: start, $lt: end };
    }

    const tasks = await Task.find(query).sort({ dueDate: 1 });
    res.json({ tasks });
  } catch (error) {
    next(error);
  }
};

export const getNotifications = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    const stats = buildTaskStats(tasks);

    res.json({
      notifications: {
        overdue: stats.overdue,
        upcoming: stats.upcoming.slice(0, 10),
        count: stats.overdue.length + stats.upcoming.slice(0, 10).length,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const task = await Task.create({
      ...req.body,
      user: req.user._id,
      completedAt: req.body.status === "Completed" ? new Date() : null,
    });

    res.status(201).json({ task, message: "Task created" });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    const previousStatus = task.status;
    Object.assign(task, req.body);
    if (req.body.status === "Completed" && previousStatus !== "Completed") {
      task.completedAt = new Date();
    }
    if (req.body.status && req.body.status !== "Completed") {
      task.completedAt = null;
    }

    await task.save();
    res.json({ task, message: "Task updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    res.json({ message: "Task deleted", id: req.params.id });
  } catch (error) {
    next(error);
  }
};

export const completeTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) {
      res.status(404);
      throw new Error("Task not found");
    }

    const completed = req.body.completed ?? task.status !== "Completed";
    task.status = completed ? "Completed" : "To Do";
    task.completedAt = completed ? new Date() : null;
    await task.save();

    res.json({ task, message: completed ? "Task completed" : "Task reopened" });
  } catch (error) {
    next(error);
  }
};
