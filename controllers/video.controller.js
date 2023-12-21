const entities = require("../models");

const Video = entities.video;
const Like = entities.like;

// upload image
exports.uploadVideo = async (req, res) => {
  try {
    const { description, artist, url } = req.body;

    const video = await Video.create({
      description,
      artist,
      url,
    });

    res.status(201).json({ video: video });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interner server error" });
  }
};

// get videos and  the likes they have
exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.findAll();

    res.status(200).json({ videos: videos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interner server error" });
  }
};

// get video by id
exports.getVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const existingVideo = await Video.findByPk(id);

    if (!existingVideo) {
      return res.status(400).json({ error: "Video with that Id not found" });
    }

    res.status(200).json({ video: existingVideo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interner server error" });
  }
};

// delete image
exports.deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const existingVideo = await Video.findByPk(id);

    if (!existingVideo) {
      return res.status(400).json({ error: "Video with that Id not found" });
    }

    // delete
    existingVideo.destroy();

    res.status(200).json({ msg: "deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interner server error" });
  }
};

exports.updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, artist, url } = req.body;

    const existingVideo = await Video.findByPk(id);

    if (!existingVideo) {
      return res.status(404).json({ error: "Image with that ID not found" });
    }

    // Update the image properties
    existingVideo.description = description || existingVideo.description;
    existingVideo.artist = artist || existingVideo.artist;
    existingVideo.url = url || existingVideo.url;

    // Save the updated image
    await existingVideo.save();

    res.status(200).json({ video: existingVideo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
