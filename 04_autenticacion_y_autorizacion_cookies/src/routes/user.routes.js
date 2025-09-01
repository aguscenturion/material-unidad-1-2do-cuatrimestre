import { Router } from "express";
import { getAllUsers } from "../controllers/user.controllers.js";

export const userRoutes = Router();

userRoutes.get("/users", getAllUsers);
