import express from "express";
import { connectDB } from "./src/config/database.js";
// import "./src/models/user.model.js";
// import "./src/models/person.model.js";
// import "./src/models/role.model.js";
// import "./src/models/user_role.model.js";
import { TaskModel } from "./src/models/task.model.js";
import { UserModel } from "./src/models/user.model.js";
import { PersonModel } from "./src/models/person.model.js";
import { RoleModel } from "./src/models/role.model.js";

const app = express();
const PORT = 3005;

app.get("/tasks", async (req, res) => {
  const tasks = await TaskModel.findAll({
    // attributes: ["title", "description"],
    attributes: {
      exclude: ["user_id"],
    },
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
});

app.get("/users", async (req, res) => {
  const users = await UserModel.findAll({
    attributes: {
      exclude: ["password", "person_id"],
    },
    include: [
      {
        model: RoleModel,
        as: "roles",
        through: {
          attributes: [],
        },
      },
    ],
  });

  res.json(users);
});

app.listen(PORT, async () => {
  await connectDB();
  console.log(`servidor corriendo en el puerto ${PORT}`);
});
