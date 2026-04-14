import express from "express";
import teacherRoutes from "./routes/teacherRoutes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running successfully");
});

app.use("/api", teacherRoutes);

export default app;