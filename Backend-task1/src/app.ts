import express, { Application } from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import studentRoutes from "./routes/student.routes";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Backend Training API is running 🚀",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

export default app;