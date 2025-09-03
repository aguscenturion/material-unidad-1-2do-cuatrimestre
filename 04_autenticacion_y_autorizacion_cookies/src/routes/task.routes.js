import { Router } from "express";
import { getAllTasks } from "../controllers/task.controllers.js";
import { authMiddleware } from "../middlewares/auth.js";
import { authAdminMiddleware } from "../middlewares/authAdmin.js";

export const taskRoutes = Router();

taskRoutes.get("/tasks", authMiddleware, authAdminMiddleware, getAllTasks);
