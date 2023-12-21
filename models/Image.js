const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "image",
    {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      about: {
        type: DataTypes.STRING,
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

  return Image;
};
