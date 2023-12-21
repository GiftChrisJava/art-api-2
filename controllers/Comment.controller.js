const entities = require("../models");

const Like = entities.like;
const Comment = entities.comment;

// like a image
exports.likeImage = async (req, res) => {
  try {
    const { imageId } = req.params;

    const like = await Like.create({
      imageId,
    });

    if (!like) {
      return res.status(400).json("Not Found");
    }

    res.status(201).json(like);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interner server error" });
  }
};

// like a video
exports.likeVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    const like = await Like.create({
      videoId,
    });

    if (!like) {
      return res.status(400).json("Not Found");
    }

    res.status(201).json(like);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interner server error" });
  }
};

// get all image likes by image id
exports.getImageLikes = async (req, res) => {
  try {
    const { imageId } = req.params;

    const likes = await Like.findAll({
      where: { imageId },
    });

    res.status(200).json(likes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interner server error" });
  }
};

// get all video likes by video id
exports.getVideoLikes = async (req, res) => {
  try {
    const { videoId } = req.params;

    const likes = await Like.findAll({
      where: { videoId },
    });

    res.status(200).json(likes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interner server error" });
  }
};

// add comment to video
exports.commentVideo = async (req, res) => {
  const { comment, name } = req.body;
  const { videoId } = req.body;

  console.log("video ", videoId, " from website");

  try {
    const video = await entities.video.findOne({ where: { id: videoId } });

    if (!video) {
      return res.status(500).json({ msg: "Not found" });
    }

    const comments = await Comment.create({
      name,
      comment,
      videoId: video.id,
    });
    console.log("video ", videoId, " from website");

    res.status(201).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interner server error" });
  }
};

// add comment to image
exports.commentImage = async (req, res) => {
  const { comment, name, imageId } = req.body;

  try {
    const comments = await Comment.create({
      name,
      comment,
      imageId,
    });

    res.status(201).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interner server error" });
  }
};

// get all image comments by image id
exports.getImageComments = async (req, res) => {
  try {
    const { imageId } = req.params;

    const comments = await Comment.findAll({
      where: { imageId },
    });

    if (!comments) {
      return res.status(400).json("Not Found");
    }

    res.status(200).json({
      comments: comments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interner server error" });
  }
};

// get all video comments by vide id
exports.getVideoComments = async (req, res) => {
  try {
    const { videoId } = req.params;

    // const comments = await Comment.findAll();

    const comments = await Comment.findAll({
      where: { videoId },
    });

    if (!comments) {
      return res.status(400).json("Not Found");
    }

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interner server error" });
  }
};

// delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByPk(id);

    if (!comment) {
      return res.status(400).json("Not Found");
    }

    res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interner server error" });
  }
};

// delete image comments
exports.deleteImageComments = async (req, res) => {
  try {
    const { imageId } = req.params;

    const comments = await Comment.destroy({ where: { imageId } });

    if (!comments) {
      return res.status(400).json("Not Found");
    }
    res.status(200).json("deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interner server error" });
  }
};

// delete video comments
exports.deleteVideoComments = async (req, res) => {
  try {
    const { videoId } = req.params;

    const comments = await Comment.destroy({ where: { videoId } });

    if (!comments) {
      return res.status(400).json("Not Found");
    }
    res.status(200).json("deleted");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Interner server error" });
  }
};
