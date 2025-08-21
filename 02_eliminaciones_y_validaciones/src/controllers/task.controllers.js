import { PersonModel } from "../models/person.model.js";
import { TaskModel } from "../models/task.model.js";
import { UserModel } from "../models/user.model.js";

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.findAll({
      include: [
        {
          model: UserModel,
          as: "author",
          attributes: {
            exclude: ["password", "person_id"],
          },
          include: [
            {
              model: PersonModel,
              as: "person",
            },
          ],
        },
      ],
    });

    res.json(tasks);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
