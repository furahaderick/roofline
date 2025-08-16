import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import db from "../config/database.config.js";

export const authenticate = expressAsyncHandler(async (req, res, next) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		const token = req.headers.authorization.split(" ")[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = await db.User.findByPk(decoded.id, {
			attributes: { exclude: ["password"] },
		});
		next();
	} else {
		return res
			.status(401)
			.json({ message: "Authentication failed. No token provided" });
	}
});
