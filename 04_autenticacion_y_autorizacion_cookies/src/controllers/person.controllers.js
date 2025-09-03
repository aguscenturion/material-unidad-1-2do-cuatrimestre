import { matchedData, validationResult } from "express-validator";
import { PersonModel } from "../models/person.model.js";
import { UserModel } from "../models/user.model.js";

export const getAllPeople = async (req, res) => {
  try {
    // const token = req.cookies.token;
    // const decoded = jwt.verify(token, "s3cr3t");

    // req.userLogged = decoded;

    // next();

    const people = await PersonModel.findAll({
      // paranoid: false,
      include: {
        model: UserModel,
        as: "user",
      },
    });

    return res.status(200).json(people);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createPerson = async (req, res) => {
  // const { name, lastname } = req.body;
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, "s3cr3t");
    // const person = await PersonModel.create(req.body);

    return res.status(200).json({ msg: "creado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updatePerson = async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, "s3cr3t");
    // if (typeof req.body === "object") {
    //   return res.status(404).json({ message: "Debe mandar algo" });
    // }

    const data = matchedData(req, { locations: ["body"] });

    if (Object.keys(data).length === 0) {
      return res
        .status(404)
        .json({ message: "La data tiene que ser correcta" });
    }

    await PersonModel.update(data, {
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({ msg: "actualizado correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deletePerson = async (req, res) => {
  const { id } = req.params;

  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, "s3cr3t");
    const person = await PersonModel.findByPk(id);

    await person.destroy();

    return res.status(200).json({ msg: "Persona eliminada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
