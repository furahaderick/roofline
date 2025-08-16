import express from "express";

import {
	createProject,
	getAllProjects,
	getProjectDetails,
} from "../controllers/project.controller.js";

import { bidOnProject } from "../controllers/bid.controller.js";
import {
	markProjectMilestone,
	getProjectMilestones,
} from "../controllers/milestone.controller.js";

import {
	validateProjectCreation,
	validateBid,
	validateMilestone,
} from "../middleware/validator.middleware.js";

import { authenticate } from "../middleware/authenticate.middleware.js";
import { authorize } from "../middleware/authorize.middleware.js";

const projectRouter = express.Router();

projectRouter
	.route("/")
	.post(
		authenticate,
		authorize(["home-owner"]),
		validateProjectCreation,
		createProject
	)
	.get(authenticate, getAllProjects);

projectRouter.route("/:projectId").get(authenticate, getProjectDetails);

projectRouter
	.route("/:projectId/bids")
	.post(authenticate, authorize(["contractor"]), validateBid, bidOnProject);

projectRouter
	.route("/:projectId/milestones")
	.post(authenticate, validateMilestone, markProjectMilestone)
	.get(authenticate, getProjectMilestones);

export default projectRouter;
