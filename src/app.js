import express from "express";
import "dotenv/config";

import UserRouter from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

app.use("/users", UserRouter);

export default app;
