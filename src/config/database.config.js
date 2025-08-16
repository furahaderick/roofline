import { DataTypes, Sequelize } from "sequelize";

import User from "../models/user.model.js";
import Project from "../models/project.model.js";

export const sequelize = new Sequelize(
	process.env.PG_DB_NAME,
	process.env.PG_USER,
	process.env.PG_PWD,
	{
		host: "localhost",
		dialect: "postgres",
		logging: false,
	}
);

export const startDB = async () => {
	try {
		await sequelize.authenticate();
		console.log("Postgres connected successfully.");

		// Automatically create tables
		await sequelize.sync({ alter: true });
		// use { force: true } ONLY in dev to drop/recreate tables
	} catch (err) {
		console.error("Unable to connect to DB Server:", err.message);
		process.exit(1);
	}
};

const db = {
	Sequelize,
	sequelize,
	User: User(sequelize, DataTypes),
	Project: Project(sequelize, DataTypes),
};

// Define all associations ie FK-PK relations
db.User.hasMany(db.Project, {
	foreignKey: "creatorId",
	sourceKey: "userId",
	as: "projects",
});

db.Project.belongsTo(db.User, {
	foreignKey: "creatorId",
	sourceKey: "userId",
	as: "creator",
});

export default db;
