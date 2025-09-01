import express from "express";
import { connectDB } from "./src/config/database.js";
import { personRoutes } from "./src/routes/person.routes.js";
import { userRoutes } from "./src/routes/user.routes.js";
import { authRoutes } from "./src/routes/auth.routes.js";
import { taskRoutes } from "./src/routes/task.routes.js";

const app = express();
const PORT = 3005;

app.use(express.json());

app.use("/api", personRoutes);
app.use("/api", userRoutes);
app.use("/api", taskRoutes);
app.use("/api", authRoutes);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`servidor corriendo en el puerto ${PORT}`);
});
