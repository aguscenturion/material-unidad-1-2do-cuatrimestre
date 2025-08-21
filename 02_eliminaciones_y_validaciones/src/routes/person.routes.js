import { Router } from "express";
import {
  deletePerson,
  getAllPeople,
} from "../controllers/person.controllers.js";

export const personRoutes = Router();

personRoutes.get("/people", getAllPeople);
personRoutes.delete("/people/:id", deletePerson);
