import express from "express";
import {
  completeTask,
  createTask,
  deleteTask,
  getAnalytics,
  getCalendarTasks,
  getDashboardStats,
  getNotifications,
  getTasks,
  getWeeklyProductivity,
  updateTask,
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateTaskPayload } from "../middleware/validateMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/dashboard", getDashboardStats);
router.get("/productivity", getWeeklyProductivity);
router.get("/analytics", getAnalytics);
router.get("/calendar", getCalendarTasks);
router.get("/notifications", getNotifications);
router.route("/").get(getTasks).post(validateTaskPayload, createTask);
router.route("/:id").put(validateTaskPayload, updateTask).delete(deleteTask);
router.patch("/:id/complete", completeTask);

export default router;
