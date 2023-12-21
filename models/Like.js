const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    "like",
    {
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

  return Like;
};
