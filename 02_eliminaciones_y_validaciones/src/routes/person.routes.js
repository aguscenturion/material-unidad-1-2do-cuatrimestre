import { Router } from "express";
import {
  createPerson,
  deletePerson,
  getAllPeople,
  updatePerson,
} from "../controllers/person.controllers.js";
import {
  createPersonValidation,
  updatePersonValidation,
} from "../middlewares/validations/person.validations.js";
import { validator } from "../middlewares/validator.js";

export const personRoutes = Router();

personRoutes.get("/people", getAllPeople);
personRoutes.post("/people", createPersonValidation, validator, createPerson);
personRoutes.put(
  "/people/:id",
  updatePersonValidation,
  validator,
  updatePerson
);
personRoutes.delete("/people/:id", deletePerson);
