// get database configurations
const config = require("../config/dbConfig");

// get sequelize
const { Sequelize, DataTypes } = require("sequelize");

// create a new Sequelize object
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
});

// authenticate
sequelize
  .authenticate()
  .then(() => {
    console.log("connectes");
  })
  .catch(console.error());

// create an empty db array
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const comment = require("../models/Comment")(sequelize, DataTypes);
const image = require("../models/Image")(sequelize, DataTypes);
const video = require("../models/Video")(sequelize, DataTypes);
const like = require("../models/Like")(sequelize, DataTypes);
const thumbnail = require("../models/Thumbnail")(sequelize, DataTypes);

// // an image can has many comments and many likes
image.hasMany(comment, { foreignKey: "imageId" });
comment.belongsTo(image, { foreignKey: "imageId" });

image.hasMany(like, { foreignKey: "imageId" });
like.belongsTo(image, { foreignKey: "imageId" });

// // a video can has many comments and many likes
// video.hasMany(comment, { foreignKey: "videoId" });
// comment.belongsTo(video, { foreignKey: "videoId" });

// video.hasMany(like, { foreignKey: "videoId" });
// like.belongsTo(video, { foreignKey: "videoId" });

db.comment = comment;
db.image = image;
db.video = video;
db.like = like;
db.thumbnail = thumbnail;

// run the database
db.sequelize.sync({ force: false }).then(() => {
  console.log("re-sync...");
});

module.exports = db;
