import { PersonModel } from "../models/person.model.js";
import { UserModel } from "../models/user.model.js";

export const getAllPeople = async (req, res) => {
  try {
    const people = await PersonModel.findAll({
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

export const deletePerson = async (req, res) => {
  const { id } = req.params;

  try {
    const person = await PersonModel.findByPk(id);

    await person.destroy();

    return res.status(200).json({ msg: "Persona eliminada correctamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
