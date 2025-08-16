import express from "express";

import { login, register } from "../controllers/auth.controller.js";

import {
	validateRegistration,
	validateLogin,
} from "../middleware/validator.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", validateRegistration, register);

authRouter.post("/login", validateLogin, login);

export default authRouter;
