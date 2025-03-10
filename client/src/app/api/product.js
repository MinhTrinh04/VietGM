const API_URL = "http://localhost:3001/api/vgm";

export const productApi = {
  getAllProducts: async (filters = {}) => {
    try {
      let queryString = new URLSearchParams();

      if (filters.categoryId)
        queryString.append("categoryId", filters.categoryId);
      if (filters.minPrice) queryString.append("minPrice", filters.minPrice);
      if (filters.maxPrice) queryString.append("maxPrice", filters.maxPrice);
      if (filters.rating) queryString.append("rating", filters.rating);
      if (filters.isPopular) queryString.append("isPopular", filters.isPopular);
      if (filters.isBestSeller)
        queryString.append("isBestSeller", filters.isBestSeller);
      if (filters.isActive !== undefined)
        queryString.append("isActive", filters.isActive);

      const res = await fetch(`${API_URL}/products?${queryString}`);
      if (!res.ok) {
        throw new Error("Không thể tải danh sách sản phẩm");
      }
      return await res.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  getProductById: async (id) => {
    try {
      const res = await fetch(`${API_URL}/products/${id}`);
      if (!res.ok) {
        throw new Error("Không thể tải thông tin sản phẩm");
      }
      return await res.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  getProductBySlug: async (slug) => {
    try {
      const res = await fetch(`${API_URL}/products/slug/${slug}`);
      if (!res.ok) {
        throw new Error("Không thể tải thông tin sản phẩm");
      }
      return await res.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },

  searchProducts: async (query) => {
    try {
      const res = await fetch(
        `${API_URL}/products/search?q=${encodeURIComponent(query)}`
      );
      if (!res.ok) {
        throw new Error("Không thể tìm kiếm sản phẩm");
      }
      return await res.json();
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  },
};
