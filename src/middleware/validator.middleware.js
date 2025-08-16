import { body } from "express-validator";

const ALLOWED_ROLES = ["home-owner", "contractor", "project-manager"];

export const validateRegistration = [
	body("fullName").exists().withMessage("Your fullname is required"),
	body("username")
		.exists()
		.withMessage("Username is required")
		.isLength({ min: 3 })
		.withMessage("Username must be atleast 3 characters long"),
	body("email").isEmail().withMessage("Please enter a valid email address"),
	body("role")
		.exists()
		.withMessage("A role must be specified")
		.isIn(ALLOWED_ROLES)
		.withMessage(`Invalid role. Must be one of: ${ALLOWED_ROLES.join(", ")}`),
	body("password")
		.isLength({ min: 6 })
		.withMessage("Password must be atleast 6 characters"),
];

export const validateLogin = [
	body("email")
		.exists({ values: "falsy" })
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Please enter a valid email address"),
	body("password").exists().withMessage("Password is required"),
];
