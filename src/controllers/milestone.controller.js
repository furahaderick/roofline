import expressAsyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

import db from "../config/database.config.js";

export const markProjectMilestone = expressAsyncHandler(async (req, res) => {
	// Check errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { description } = req.body;

	const { projectId } = req.params;
	const userId = req.user.userId;

	await db.Milestone.create({
		description,
		projectId,
		userId,
	});

	res.status(201).json({
		message: "Milestone marked successfully!",
	});
});

export const getProjectMilestones = expressAsyncHandler(async (req, res) => {
	const { projectId } = req.params;
	const allMilestones = await db.Milestone.findAll({
		where: {
			projectId,
		},
	});

	res.status(200).json(allMilestones);
});
