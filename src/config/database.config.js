import { Sequelize } from "sequelize";

const sequelize = new Sequelize("haven", "postgres", "4ve5", {
	host: "localhost",
	dialect: "postgres",
});

export const startDB = async () => {
	try {
		await sequelize.authenticate();
		console.log("Postgres connected successfully.");
	} catch (err) {
		console.error("Unable to connect to DB Server:", err);
	}
};
