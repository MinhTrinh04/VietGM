const markdownService = require("../../services/VGM/markdown.service");

const markdownController = {
  getAllMarkdown: async (req, res) => {
    try {
      const posts = await markdownService.getAllPostsAsMarkdown();
      res.json({ posts });
    } catch (error) {
      console.error("Error getting markdown posts:", error);
      res.status(500).json({ message: error.message });
    }
  },

  getMarkdownBySlug: async (req, res) => {
    try {
      const post = await markdownService.getPostMarkdownBySlug(req.params.slug);
      res.json(post);
    } catch (error) {
      console.error("Error getting markdown post by slug:", error);
      if (error.message === "Bài viết không tồn tại") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
    }
  },

  syncMarkdownFiles: async (req, res) => {
    try {
      await markdownService.syncFiles();
      res.json({ message: 'Đã đồng bộ files thành công' });
    } catch (error) {
      console.error('Error syncing files:', error);
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = markdownController;
