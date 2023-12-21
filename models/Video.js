const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define(
    "video",
    {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      artist: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Video;
};
