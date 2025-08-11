import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { PersonModel } from "./person.model.js";

export const UserModel = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

// RELACIONES UNO A UNO
UserModel.belongsTo(PersonModel, { foreignKey: "person_id", as: "person" });

PersonModel.hasOne(UserModel, { foreignKey: "person_id" });
