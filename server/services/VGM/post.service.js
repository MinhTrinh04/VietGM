const Post = require("../../models/VGM/Post");
const slugify = require("slugify");

const postService = {
  // Create
  create: async (postData) => {
    try {
      if (!postData.title) {
        throw new Error("Tiêu đề không được để trống");
      }
      console.log("postData:", postData);
      postData.slug = slugify(postData.title, {
        lower: true,
        strict: true,
        locale: "vi",
      });

      // Nếu introLayout và postLayout không được cung cấp, sử dụng giá trị mặc định
      postData.introLayout = postData.introLayout || 2;
      postData.postLayout = postData.postLayout || 2;
      const post = new Post(postData);
      await post.save();
      return post;
    } catch (error) {
      console.error("Error creating post:", error);
      throw new Error("Lỗi khi tạo bài viết");
    }
  },

  // Read all
  getAll: async () => {
    try {
      // Lấy danh sách bài viết, chỉ trả về các trường cần thiết
      return await Post.find()
        .select("title slug date category short author")
        .sort({ createdAt: -1 });
    } catch (error) {
      console.error("Error getting all posts:", error);
      throw new Error("Lỗi khi lấy danh sách bài viết");
    }
  },

  // Read one by ID
  getById: async (id) => {
    try {
      const post = await Post.findById(id);
      if (!post) {
        throw new Error("Bài viết không tồn tại");
      }
      return post;
    } catch (error) {
      console.error(`Error getting post by ID ${id}:`, error);
      throw new Error("Lỗi khi lấy bài viết");
    }
  },

  // Read one by slug
  getBySlug: async (slug) => {
    try {
      const post = await Post.findOne({ slug });
      if (!post) {
        throw new Error("Bài viết không tồn tại");
      }
      return post;
    } catch (error) {
      console.error(`Error getting post by slug ${slug}:`, error);
      throw new Error("Lỗi khi lấy bài viết");
    }
  },

  // Update
  update: async (id, updateData) => {
    try {
      console.log("cmm:", id);
      const post = await Post.findById(id);
      if (!post) {
        throw new Error("Bài viết không tồn tại");
      }
      console.log("updateData:", updateData);
      // Cập nhật slug nếu title thay đổi
      if (updateData.title) {
        updateData.slug = slugify(updateData.title, {
          lower: true,
          strict: true,
          locale: "vi",
        });
      }

      // Kiểm tra dữ liệu đầu vào nếu có thay đổi introLayout hoặc postLayout
      if (
        updateData.introLayout &&
        typeof updateData.introLayout !== "number"
      ) {
        throw new Error("introLayout phải là số");
      }
      if (updateData.postLayout && typeof updateData.postLayout !== "number") {
        throw new Error("postLayout phải là số");
      }

      const updatedPost = await Post.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      return updatedPost;
    } catch (error) {
      console.error(`Error updating post with ID ${id}:`, error);
      throw new Error("Lỗi khi cập nhật bài viết");
    }
  },

  // Delete
  delete: async (id) => {
    try {
      const post = await Post.findById(id);
      if (!post) {
        throw new Error("Bài viết không tồn tại");
      }
      await Post.findByIdAndDelete(id);
      return { message: "Bài viết đã được xóa" };
    } catch (error) {
      console.error(`Error deleting post with ID ${id}:`, error);
      throw new Error("Lỗi khi xóa bài viết");
    }
  },
};

module.exports = postService;
