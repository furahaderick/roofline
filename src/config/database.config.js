import { DataTypes, Sequelize } from "sequelize";

import User from "../models/user.model.js";
import Project from "../models/project.model.js";
import Bid from "../models/bid.model.js";
import Milestone from "../models/milestone.model.js";

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
	Bid: Bid(sequelize, DataTypes),
	Milestone: Milestone(sequelize, DataTypes),
};

// Define all associations ie FK-PK relations
// User-Project
db.User.hasMany(db.Project, {
	foreignKey: "creatorId",
	sourceKey: "userId",
	as: "projects",
});
db.Project.belongsTo(db.User, {
	foreignKey: "creatorId",
	targetKey: "userId",
	as: "creator",
});

// Bid-Project
db.Project.hasMany(db.Bid, {
	foreignKey: "projectId",
	sourceKey: "projectId",
	as: "bids",
});
db.Bid.belongsTo(db.Project, {
	foreignKey: "projectId",
	targetKey: "projectId",
	as: "project",
});
// Bid-User
db.User.hasMany(db.Bid, {
	foreignKey: "contractorId",
	sourceKey: "userId",
	as: "bids",
});
db.Bid.belongsTo(db.User, {
	foreignKey: "contractorId",
	targetKey: "userId",
	as: "contractor",
});

// Milestone-Project
db.Project.hasMany(db.Milestone, {
	foreignKey: "projectId",
	sourceKey: "projectId",
	as: "milestones",
});
db.Milestone.belongsTo(db.Project, {
	foreignKey: "projectId",
	targetKey: "projectId",
	as: "project",
});
// Milestone-User
db.User.hasMany(db.Milestone, {
	foreignKey: "userId",
	sourceKey: "userId",
	as: "milestones",
});
db.Milestone.belongsTo(db.User, {
	foreignKey: "userId",
	targetKey: "userId",
	as: "user",
});

export default db;
