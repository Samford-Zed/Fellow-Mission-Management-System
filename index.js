import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import ConnectMB from "./Config/Mongodb_Config.js";

import userRouting from "./Router/UserRouter.js";
import adminRouter from "./Router/AdminRouter.js";

const app = express();

// Connect MongoDB
ConnectMB();

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Test Route
app.get("/", (req, res) => {
  res.send("HI There — Backend is running!");
});

// Routes
app.use("/api/auth", userRouting);
app.use("/api/admin", adminRouter);

// Port
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is listening at ${PORT}`);
});
