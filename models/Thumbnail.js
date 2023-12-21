const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Thumbnail = sequelize.define(
    "thumbnail",
    {
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      desc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      videoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Thumbnail;
};
