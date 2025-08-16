import express from "express";

import { createProject } from "../controllers/project.controller.js";

import { validateProjectCreation } from "../middleware/validator.middleware.js";
import { authenticate } from "../middleware/authenticate.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

const projectRouter = express.Router();

projectRouter.post(
	"/",
	authenticate,
	authorize(["home-owner"]),
	validateProjectCreation,
	createProject
);

export default projectRouter;
