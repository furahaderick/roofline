import express from "express";
import cookieParser from "cookie-parser";

const app = express();

// App-level middleware
app.use(express.json());
app.use(cookieParser());

app.use("/", (req, res) => {
	res.status(200).json({ message: "Server okay!" });
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Internal Server Error");
});

export default app;
