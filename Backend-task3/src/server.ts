/// <reference path="./types/express.d.ts" />

import dotenv from "dotenv";

dotenv.config();

const app = require("./app").default;
const { connectRedis } = require("./config/redis");

void connectRedis().catch((error: unknown) => {
  console.error("Redis connection failed. Continuing without cache:", error);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
