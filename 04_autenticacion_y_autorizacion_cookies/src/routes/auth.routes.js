import { Router } from "express";
import {
  login,
  logout,
  profile,
  register,
} from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middlewares/auth.js";

export const authRoutes = Router();

authRoutes.post("/login", login);

authRoutes.post("/register", register);

authRoutes.post("/logout", logout);

// rutas publica
authRoutes.get("/profile", authMiddleware, profile);
