import express from "express";
import { SignUp, Login, Fill_Form } from "../Controller/Controller.js";
import authUser from "../middleware/MiddleWare.js";
import router from "./AdminRouter.js";
const authRouting = express.Router();

authRouting.post("/signup", SignUp);
authRouting.post("/login", Login);
authRouting.post("/fill-form", authUser, Fill_Form);

export default authRouting;
