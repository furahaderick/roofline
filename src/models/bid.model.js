export default (sequelize, DataTypes) => {
	const Bid = sequelize.define(
		"Bid",
		{
			bidId: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			price: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: false,
			},
			estimated_duration: {
				type: DataTypes.TIME,
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
			contractorId: {
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
			tableName: "bids",
		}
	);

	return Bid;
};
