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

export const getProjectDetails = expressAsyncHandler(async (req, res) => {
	const { projectId } = req.params;
	const project = await db.Project.findOne({
		where: { projectId, creatorId: req.user.userId },
	});

	if (!project) {
		return res.status(404).json({ message: "Project not found" });
	}
	res.status(200).json(project);
});

export const getAllProjects = expressAsyncHandler(async (req, res) => {
	const projects = await db.Project.findAll({
		where: { creatorId: req.user.userId },
		include: [{ model: db.Bid, as: "bids" }],
	});
	res.status(200).json(projects);
});
