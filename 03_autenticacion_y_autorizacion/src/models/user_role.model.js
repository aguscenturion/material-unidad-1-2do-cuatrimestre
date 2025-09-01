import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { RoleModel } from "./role.model.js";
import { UserModel } from "./user.model.js";

export const UserRoleModel = sequelize.define(
  "User_Role",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

//RELACIONES
UserModel.belongsToMany(RoleModel, {
  through: UserRoleModel,
  foreignKey: "user_id",
  as: "roles",
});

RoleModel.belongsToMany(UserModel, {
  through: UserRoleModel,
  foreignKey: "role_id",
  as: "users",
});
