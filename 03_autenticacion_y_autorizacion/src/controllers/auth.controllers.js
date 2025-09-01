import jwt from "jsonwebtoken";
import { PersonModel } from "../models/person.model.js";
import { UserModel } from "../models/user.model.js";

export const register = async (req, res) => {
  const { name, lastname, username, email, password } = req.body;
  try {
    const person = await PersonModel.create({
      name: name,
      lastname: lastname,
    });

    await UserModel.create({
      username: username,
      email: email,
      password: password,
      person_id: person.id,
    });

    res.status(201).json({
      msg: "usuario creado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({
      where: {
        username: username,
        password: password,
      },
      include: {
        model: PersonModel,
        as: "person",
      },
    });

    if (!user) {
      return res.status(404).json({
        msg: "Credenciales Incorrectas",
      });
    }

    // generar un token

    const token = jwt.sign(
      {
        id: user.id,
        name: user.person.name,
        lastname: user.person.lastname,
      },
      "s3cr3t",
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      msg: "Logueado correctamente",
      token,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};
