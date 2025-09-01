import { PersonModel } from "../models/person.model.js";
import { UserModel } from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      include: {
        model: PersonModel,
        as: "person",
        paranoid: false,
      },
    });

    res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
