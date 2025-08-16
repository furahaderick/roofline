export default (sequelize, DataTypes) => {
	const Milestone = sequelize.define(
		"Milestone",
		{
			milestoneId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			projectId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: "projects",
					key: "projectId",
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
			},
            userId: {
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
			tableName: "milestones",
		}
	);

	return Milestone;
};
