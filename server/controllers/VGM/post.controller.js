const postService = require("../../services/VGM/post.service");
const markdownService = require("../../services/VGM/markdown.service");

const postController = {
  createPost: async (req, res) => {
    try {
      const { author } = req.body;
      const parsedAuthor = author ? JSON.parse(author) : null;
      console.log("parsedAuthor:", parsedAuthor);
      const newPost = await postService.create({
        ...req.body,
        author: parsedAuthor,
      });

      // Sync markdown files
      await markdownService.syncFiles();

      res.status(201).json(newPost);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(400).json({ message: error.message });
    }
  },

  // Lấy danh sách tất cả bài viết
  getAllPosts: async (req, res) => {
    try {
      const posts = await postService.getAll();
      res.json(posts);
    } catch (error) {
      console.error("Error getting all posts:", error);
      res.status(500).json({ message: "Lỗi khi lấy danh sách bài viết" });
    }
  },

  // Lấy bài viết theo ID
  getPostById: async (req, res) => {
    try {
      const post = await postService.getById(req.params.id);
      res.json(post);
    } catch (error) {
      console.error("Error getting post by ID:", error);
      if (error.message === "Bài viết không tồn tại") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Lỗi khi lấy bài viết" });
      }
    }
  },

  // Lấy bài viết theo slug
  getPostBySlug: async (req, res) => {
    try {
      const post = await postService.getBySlug(req.params.slug);
      res.json(post);
    } catch (error) {
      console.error("Error getting post by slug:", error);
      if (error.message === "Bài viết không tồn tại") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Lỗi khi lấy bài viết" });
      }
    }
  },

  // Cập nhật bài viết
  updatePost: async (req, res) => {
    try {
      const { author } = req.body;

      // Parse author nếu là chuỗi JSON
      const parsedAuthor = author ? JSON.parse(author) : null;

      if (!parsedAuthor || !parsedAuthor.title) {
        return res
          .status(400)
          .json({ message: "Tác giả không hợp lệ hoặc bị thiếu thông tin" });
      }

      // Gắn parsedAuthor vào req.body
      req.body.author = parsedAuthor;

      console.log("check xem ổn ko:", req.body);

      // Gọi service để cập nhật bài viết
      const updatedPost = await postService.update(req.params.id, req.body);

      // Sync markdown files
      await markdownService.syncFiles();

      res.json(updatedPost);
    } catch (error) {
      console.error("Error updating post:", error);

      if (error.message === "Bài viết không tồn tại") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(400).json({ message: error.message }); // 400 cho lỗi dữ liệu đầu vào
      }
    }
  },

  // Xóa bài viết
  deletePost: async (req, res) => {
    try {
      const result = await postService.delete(req.params.id);
      res.json(result);
    } catch (error) {
      console.error("Error deleting post:", error);
      if (error.message === "Bài viết không tồn tại") {
        res.status(404).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Lỗi khi xóa bài viết" });
      }
    }
  },
};

module.exports = postController;
