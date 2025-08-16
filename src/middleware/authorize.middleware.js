import expressAsyncHandler from "express-async-handler";

export const authorize = (acceptedRoles) =>
	expressAsyncHandler(async (req, res, next) => {
		if (!acceptedRoles.includes(req.user.role)) {
			return res
				.status(403)
				.json({ message: "Access denied. Insufficient roles" });
		}
		next();
	});
