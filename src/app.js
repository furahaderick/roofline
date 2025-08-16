import express from "express";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.router.js";
import projectRouter from "./routes/project.router.js";

const app = express();

// App-level middleware
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
	res.status(200).json({ message: "Haven v1.0.0" });
});

app.use("/auth", authRouter);
app.use("/projects", projectRouter);

app.use((err, req, res, next) => {
	console.error(err.message);
	res.status(500).send("Internal Server Error");
});

export default app;
