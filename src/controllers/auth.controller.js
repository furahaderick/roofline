import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

import db from "../config/database.config.js";
import { generateTokenAndSetCookie } from "../helpers/cookies.helper.js";

export const register = expressAsyncHandler(async (req, res) => {
	// Check errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { fullName, username, email, role, password } = req.body;

	// Check if username already exists
	const existingUsername = await db.User.findOne({ where: { username } });
	if (existingUsername) {
		return res.status(400).json({ message: "Username is already taken" });
	}

	// Check if email already exists
	const existingEmail = await db.User.findOne({ where: { email } });
	if (existingEmail) {
		return res.status(400).json({ message: "Email is already registered" });
	}

	// Hash user password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create new user
	await db.User.create({
		fullName,
		email,
		username,
		role,
		password: hashedPassword,
	});

	res.status(201).json({
		message: "User registered successfully!",
	});
});

export const login = expressAsyncHandler(async (req, res) => {
	// Check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { email, password } = req.body;

	// Find user by email
	const existingEmail = await db.User.findOne({ where: { email } });
	if (!existingEmail) {
		return res.status(404).json({ message: "User not found" });
	}

	// Compare passwords
	const matchingPasswords = await bcrypt.compare(
		password,
		existingEmail.password
	);
	if (!matchingPasswords) {
		return res.status(401).json({ message: "Invalid credentials" });
	}

	// Generate token and set cookie
	generateTokenAndSetCookie(existingEmail, res);

	res.status(200).json({ message: "Logged in successfully!" });
});
