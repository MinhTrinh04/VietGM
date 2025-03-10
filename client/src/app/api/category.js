const API_URL = "http://localhost:3001/api/vgm";

export const categoryApi = {
  // Lấy tất cả categories
  getAllCategories: async () => {
    try {
      const res = await fetch(`${API_URL}/categories`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      return await res.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  // Lấy category theo ID
  getCategoryById: async (id) => {
    try {
      const res = await fetch(`${API_URL}/categories/${id}`);
      if (!res.ok) throw new Error("Failed to fetch category");
      return await res.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};
