import express from "express";
import { login, newRegister } from "../controller/register.js";
import { auth } from "../middleware/auth.js";
const registerRouter = express.Router();
// registerRouter.use("/login",auth)
registerRouter.post("/register", newRegister).post("/login", login);

export default registerRouter;
