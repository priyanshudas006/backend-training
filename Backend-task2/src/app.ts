import express, { Application } from "express";
import studentRoutes from "./routes/students";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running 🚀",
  });
});

app.use("/api/students", studentRoutes);

export default app;