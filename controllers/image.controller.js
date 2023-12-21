const entities = require("../models");

const Image = entities.image;
const Video = entities.video;
const Like = entities.like;
const Thumbnail = entities.thumbnail;

// upload image
exports.uploadImage = async (req, res) => {
  try {
    const { description, about, artist, url } = req.body;

    const image = await Image.create({
      description,
      about,
      artist,
      url,
    });

    res.status(201).json({ image: image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interner server error" });
  }
};

// upload image thumbnail
exports.uploadThumbnail = async (req, res) => {
  try {
    const { url, videoId } = req.body;

    const video = await entities.video.findOne({ where: { id: videoId } });

    if (!video) {
      return res.status(500).json({ msg: "Not found" });
    }

    const thumbnail = await Thumbnail.create({
      url,
      videoId: video.id,
      desc: video.description,
    });

    return res.status(201).json({ thumbnail: thumbnail });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interner server error" });
  }
};

// update thumbnail
exports.updateThumbnail = async (req, res) => {
  const { id } = req.params;
  const { url, videoId } = req.body;
  try {
    const existingThumbnail = await Thumbnail.findByPk(id);

    if (!existingThumbnail) {
      return res
        .status(404)
        .json({ error: "thumbnail with that ID not found" });
    }

    const video = await entities.video.findOne({ where: { id: videoId } });

    if (!video) {
      return res.status(500).json({ msg: "Not found" });
    }

    // Update the image properties
    existingThumbnail.videoId = videoId || existingThumbnail.videoId;
    existingThumbnail.url = url || existingThumbnail.url;

    // Save the updated image
    await existingThumbnail.save();

    return res.status(201).json({ thumbnail: existingThumbnail });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interner server error" });
  }
};

// get thumbnails
exports.getThumbnails = async (req, res) => {
  try {
    const thumbnails = await Thumbnail.findAll();

    res.status(200).json({ thumbnails: thumbnails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interner server error" });
  }
};
// upload video
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

// get images and  the likes they have
exports.getImages = async (req, res) => {
  try {
    const images = await Image.findAll();

    res.status(200).json({ images: images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interner server error" });
  }
};

// get image by id
exports.getImage = async (req, res) => {
  try {
    const { id } = req.params;
    const existingImage = await Image.findByPk(id);

    if (!existingImage) {
      return res.status(400).json({ error: "Image with that Id not found" });
    }

    // const likes = await Like.findAll({where : {imageId : id}})

    res.status(200).json({ image: existingImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interner server error" });
  }
};

// get image by id and retur the url
// get image URL by id
exports.getImageUrl = async (req, res) => {
  try {
    const { id } = req.params;
    const existingImage = await Image.findByPk(id);

    if (!existingImage) {
      return res.status(400).json({ error: "Image with that Id not found" });
    }

    res.status(200).json(existingImage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get all images by artist name
exports.getArtistImages = async (req, res) => {
  const { artist } = req.params;
  try {
    const images = await Image.findAll({
      where: { artist },
      include: [{ model: Like }, { model: entities.comment }],
    });

    res.status(200).json({ images: images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interner server error" });
  }
};

// delete image
exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const existingImage = await Image.findByPk(id);

    if (!existingImage) {
      return res.status(400).json({ error: "Image with that Id not found" });
    }

    // delete
    existingImage.destroy();

    res.status(200).json({ msg: "deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interner server error" });
  }
};

// update image by id
exports.updateImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, about } = req.body;

    const existingImage = await Image.findByPk(id);

    if (!existingImage) {
      return res.status(404).json({ error: "Image with that ID not found" });
    }

    // Update the image properties
    existingImage.description = description || existingImage.description;
    existingImage.about = about || existingImage.about;

    // Save the updated image
    await existingImage.save();

    res.status(200).json({ image: existingImage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
