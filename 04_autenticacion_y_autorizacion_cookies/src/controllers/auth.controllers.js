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

    // generar un token forma 1 con helpers (RECOMENDADA)
    // const token = generateToken(user);

    // generar un token forma 2
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

    // Enviar token como cookie
    res.cookie("token", token, {
      httpOnly: true, // No accesible desde JavaScript
      maxAge: 1000 * 60 * 60, // 1 hora
    });

    return res.status(200).json({
      msg: "Logueado correctamente",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token"); // Eliminar cookie del navegador
  return res.json({ message: "Logout exitoso" });
};

export const profile = async (req, res) => {
  const user = req.userLogged;

  try {
    res.status(200).json({
      name: user.name,
      lastname: user.lastname,
    });
  } catch (error) {}
};
