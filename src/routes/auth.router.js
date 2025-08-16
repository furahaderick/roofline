import express from "express";

import { register } from "../controllers/auth.controller.js";

import { validateRegistration } from "../middleware/validator.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", validateRegistration, register);

export default authRouter;
