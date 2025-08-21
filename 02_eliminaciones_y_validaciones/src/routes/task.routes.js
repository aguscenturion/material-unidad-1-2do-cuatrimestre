import { Router } from "express";
import { getAllTasks } from "../controllers/task.controllers.js";

export const taskRoutes = Router();

taskRoutes.get("/tasks", getAllTasks);
