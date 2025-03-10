import { getSession } from "next-auth/react";

const API_URL = "http://localhost:3001/api/vgm/posts";
const SYNC_URL = "http://localhost:3001/api/vgm/markdown/sync";

export const postApi = {
  getAllPosts: async () => {
    try {
      const res = await fetch(`${API_URL}`);
      if (!res.ok) throw new Error("Không thể tải danh sách bài viết");
      return await res.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  getPostById: async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error("Không thể tải bài viết");
      return await res.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  createPost: async (postData) => {
    try {
      const session = await getSession();
      if (!session?.user?.accessToken) {
        throw new Error("Vui lòng đăng nhập để thực hiện thao tác này");
      }
      const formData = new FormData();
      formData.append("title", postData.title);
      formData.append("content", postData.content);
      formData.append("short", postData.short);
      formData.append("category", postData.category);
      formData.append("tag", postData.tag);
      formData.append("author", JSON.stringify(postData.author));

      if (postData.image instanceof File) {
        formData.append("image", postData.image);
      }
      console.log("FormData content:");
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
      const res = await fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Có lỗi xảy ra khi tạo bài viết");
      }

      await fetch(SYNC_URL, { method: "POST" });

      return await res.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  updatePost: async (id, postData) => {
    try {
      const session = await getSession();
      if (!session?.user?.accessToken) {
        throw new Error("Vui lòng đăng nhập để thực hiện thao tác này");
      }
      const formData = new FormData();
      formData.append("title", postData.title);
      formData.append("content", postData.content);
      formData.append("short", postData.short);
      formData.append("category", postData.category);
      formData.append("tag", postData.tag);
      formData.append("author", JSON.stringify(postData.author));

      if (postData.image instanceof File) {
        formData.append("image", postData.image);
      }

      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Có lỗi xảy ra khi cập nhật bài viết");
      }

      await fetch(SYNC_URL, { method: "POST" });

      return await res.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  deletePost: async (id) => {
    try {
      const session = await getSession();
      if (!session?.user?.accessToken) {
        throw new Error("Vui lòng đăng nhập để thực hiện thao tác này");
      }

      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Có lỗi xảy ra khi xóa bài viết");
      }

      await fetch(SYNC_URL, { method: "POST" });

      return await res.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};
