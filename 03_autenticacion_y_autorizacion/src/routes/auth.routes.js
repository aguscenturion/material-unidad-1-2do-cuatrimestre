import { Router } from "express";
import { login, register } from "../controllers/auth.controllers.js";

export const authRoutes = Router();

authRoutes.post("/login", login);

authRoutes.post("/register", register);

// authRoutes.get("/profile", profile);

// authRoutes.post("/login", logout);
