export default (sequelize, DataTypes) => {
	const Project = sequelize.define(
		"Project",
		{
			projectId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			location: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			creatorId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "users",
					key: "userId",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
		},
		{
			timestamps: true,
			tableName: "projects",
		}
	);

	return Project;
};
