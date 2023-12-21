const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "comment",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      comment: {
        type: DataTypes.STRING,
      },

      videoId: {
        type: DataTypes.INTEGER,
      },

      imageId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: false,
    }
  );

  return Comment;
};
