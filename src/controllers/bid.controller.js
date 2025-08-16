import expressAsyncHandler from "express-async-handler";
import { validationResult } from "express-validator";

import db from "../config/database.config.js";

export const bidOnProject = expressAsyncHandler(async (req, res) => {
	// Check errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

    const {price, estimated_duration} = req.body;

	const { projectId } = req.params;
	const contractorId = req.user.userId;

	await db.Bid.create({
		price,
		estimated_duration,
		projectId,
		contractorId,
	});

	res.status(201).json({
		message: "Bid made successfully!",
	});
});
