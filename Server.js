import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import "dotenv/config";
import userDataRoutes from "./Router/UserDataRouter.js";

import ConnectMB from "./Config/Mongodb_Config.js";
import userRouting from "./Router/UserRouter.js";
import adminRouting from "./Router/AdminRouter.js";

const app = express();
const PORT = 7000;

// ===============================
// CONNECT DATABASE
// ===============================
ConnectMB();

// ===============================
// MIDDLEWARE
// ===============================
app.use(
  cors({
    origin: "http://localhost:5173", // FRONTEND URL
    credentials: true, // allow cookies, tokens
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// ===============================
// ROUTES
// ===============================
app.get("/", (req, res) => {
  res.send("HI There");
});
app.use("/api/auth", userRouting);
app.use("/api/admin", adminRouting);
app.use("/api/user", userDataRoutes);

// ===============================
// START SERVER
// ===============================
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
