export const validateTaskPayload = (req, res, next) => {
  const allowedPriorities = ["High", "Medium", "Low"];
  const allowedStatuses = ["To Do", "In Progress", "Completed"];
  const errors = [];

  if (req.method === "POST" && !req.body.title?.trim()) {
    errors.push("Task title is required");
  }

  if (req.body.title && req.body.title.trim().length > 120) {
    errors.push("Task title cannot exceed 120 characters");
  }

  if (req.body.description && req.body.description.length > 1000) {
    errors.push("Description cannot exceed 1000 characters");
  }

  if (req.body.priority && !allowedPriorities.includes(req.body.priority)) {
    errors.push("Priority must be High, Medium, or Low");
  }

  if (req.body.status && !allowedStatuses.includes(req.body.status)) {
    errors.push("Status must be To Do, In Progress, or Completed");
  }

  if (req.body.dueDate && Number.isNaN(new Date(req.body.dueDate).getTime())) {
    errors.push("Due date must be valid");
  }

  if (errors.length) {
    res.status(400);
    return next(Object.assign(new Error("Validation failed"), { errors }));
  }

  return next();
};

export const validateAuthPayload = (req, res, next) => {
  const errors = [];
  const { email, password, name, newPassword } = req.body;

  if (email && !/^\S+@\S+\.\S+$/.test(email)) errors.push("Enter a valid email address");
  if (name && name.trim().length < 2) errors.push("Name must be at least 2 characters");
  if (password && password.length < 6) errors.push("Password must be at least 6 characters");
  if (newPassword && newPassword.length < 6) errors.push("New password must be at least 6 characters");

  if (errors.length) {
    res.status(400);
    return next(Object.assign(new Error("Validation failed"), { errors }));
  }

  return next();
};
