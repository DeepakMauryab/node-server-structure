import express, { Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import users from "./router/user";
import crud from "./controllers/crud";
import User from "./models/User";

const app: Express = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes

app.use("/api/v1/user", crud(User), users);

export default app;
