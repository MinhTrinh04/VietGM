const express = require("express");
const router = express.Router();
const postController = require("../../controllers/VGM/post.controller");
const uploadMiddleware = require("../../middleware/VGM/upload.middleware");
const {
  protect,
  staffOrAdmin,

} = require("../../middleware/VGM/auth.middleware");

router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.get("/slug/:slug", postController.getPostBySlug);

router.use(protect, staffOrAdmin);

router.post("/", uploadMiddleware("post"), postController.createPost);

router.put("/:id", uploadMiddleware("post"), postController.updatePost);

router.delete("/:id", postController.deletePost);

module.exports = router;
