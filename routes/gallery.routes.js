const express = require("express");
const router = express.Router();
const imageController = require("../controllers/image.controller");
const videoController = require("../controllers/video.controller");
const commentNlike = require("../controllers/Comment.controller");

// image routes
router.post("/upload/image", imageController.uploadImage);
router.get("/images", imageController.getImages);
router.get("/artist/images/:artist", imageController.getArtistImages);
router.get("/image/:id", imageController.getImage);
router.delete("/remove/image/:id", imageController.deleteImage);
router.get("/image/url/:id", imageController.getImageUrl);
router.put("/edit/image/:id", imageController.updateImage);

// thumbnail router
router.post("/upload/thumbnail", imageController.uploadThumbnail);
router.get("/thumbnails", imageController.getThumbnails);
router.put("/edit/thumbnail/:id", imageController.updateThumbnail);

// video routes
router.post("/upload/video", videoController.uploadVideo);
router.get("/videos", videoController.getVideos);
router.get("/video/:id", videoController.getVideo);
router.delete("/remove/video/:id", videoController.deleteVideo);
router.put("/edit/video/:id", videoController.updateVideo);
// router.put("/edit/video/:id", videoController.updateVideo);

// like routes
router.post("/like/image/:imageId", commentNlike.likeImage);
router.post("/like/video/:videoId", commentNlike.likeVideo);
router.get("/image/likes/:imageId", commentNlike.getImageLikes);
router.get("/video/likes/:videoId", commentNlike.getVideoLikes);

// comment likes
// router.post("/comment/video", commentNlike.commentVideo);
router.post("/comment/video/:videoId", commentNlike.commentVideo);

router.post("/comment/image", commentNlike.commentImage);
router.get("/comments/image/:imageId", commentNlike.getImageComments);
router.get("/comments/video/:videoId", commentNlike.getVideoComments);
router.delete("/comment/:id", commentNlike.deleteComment);
router.delete("/comment/video/:videoId", commentNlike.deleteVideoComments);
router.delete("/comment/image/:imageId", commentNlike.deleteImageComments);

module.exports = router;
