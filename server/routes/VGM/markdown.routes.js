const express = require("express");
const router = express.Router();
const markdownController = require("../../controllers/VGM/markdown.controller");

router.get("/", markdownController.getAllMarkdown);

router.get("/:slug", markdownController.getMarkdownBySlug);

router.post("/sync", markdownController.syncMarkdownFiles);

module.exports = router;
