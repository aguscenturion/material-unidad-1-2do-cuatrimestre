import { body, param } from "express-validator";
import { PersonModel } from "../../models/person.model.js";

export const createPersonValidation = [
  body("name").notEmpty().withMessage("El campo name debe ser obligatorio"),
  body("lastname")
    .notEmpty()
    .withMessage("El campo lastname debe ser obligatorio"),
];

export const updatePersonValidation = [
  param("id")
    .isInt()
    .withMessage("El id debe ser un entero")
    .custom(async (value) => {
      const person = await PersonModel.findByPk(value);

      if (!person) {
        throw new Error("La persona no existe");
      }
    }),
  body("name")
    .optional()
    .isString()
    .withMessage("El campo name debe ser una cadena de caracteres")
    .isLength({ min: 2, max: 5 })
    .withMessage("El name debe ser entre 2 y 5 caracteres"),
  body("lastname")
    .optional()
    .notEmpty()
    .withMessage("El campo lastname debe ser obligatorio"),
];
