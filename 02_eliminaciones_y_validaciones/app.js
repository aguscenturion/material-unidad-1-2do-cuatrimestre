import express from "express";
import { connectDB } from "./src/config/database.js";
import { personRoutes } from "./src/routes/person.routes.js";
import { userRoutes } from "./src/routes/user.routes.js";

const app = express();
const PORT = 3005;

app.use(express.json());

app.use("/api", personRoutes);
app.use("/api", userRoutes);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`servidor corriendo en el puerto ${PORT}`);
});
