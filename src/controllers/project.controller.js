import expressAsyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

import db from "../config/database.config.js";

export const createProject = expressAsyncHandler(async (req, res) => {
	// Check errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { title, description, location } = req.body;

	await db.Project.create({
		title,
		description,
		location,
		creatorId: req.user.userId,
	});

	res.status(201).json({
		message: "Project created successfully!",
	});
});
