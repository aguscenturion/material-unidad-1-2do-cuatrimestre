import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("diagnostico_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: false });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
