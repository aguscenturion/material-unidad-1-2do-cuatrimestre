import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const PersonModel = sequelize.define(
  "Person",
  {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
  },
  {
    paranoid: true,
    // timestamps: false
  }
);
