import { getSession } from "next-auth/react";

const API_URL = 'http://localhost:3001/api/vgm';

export const productApi = {
  // Public APIs
  getAllProducts: async (filters = {}) => {
    try {
      let queryString = new URLSearchParams();

      // Thêm các filter vào query string
      if (filters.categoryId) queryString.append('categoryId', filters.categoryId);
      if (filters.minPrice) queryString.append('minPrice', filters.minPrice);
      if (filters.maxPrice) queryString.append('maxPrice', filters.maxPrice);
      if (filters.rating) queryString.append('rating', filters.rating);
      if (filters.isPopular) queryString.append('isPopular', filters.isPopular);
      if (filters.isBestSeller) queryString.append('isBestSeller', filters.isBestSeller);
      if (filters.isActive !== undefined) queryString.append('isActive', filters.isActive);

      const res = await fetch(`${API_URL}/products?${queryString}`);
      if (!res.ok) {
        throw new Error('Không thể tải danh sách sản phẩm');
      }
      return await res.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  getProductById: async (id) => {
    try {
      const res = await fetch(`${API_URL}/products/${id}`);
      if (!res.ok) {
        throw new Error('Không thể tải thông tin sản phẩm');
      }
      return await res.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  getProductBySlug: async (slug) => {
    try {
      const res = await fetch(`${API_URL}/products/slug/${slug}`);
      if (!res.ok) {
        throw new Error('Không thể tải thông tin sản phẩm');
      }
      return await res.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  searchProducts: async (query) => {
    try {
      const res = await fetch(`${API_URL}/products/search?q=${encodeURIComponent(query)}`);
      if (!res.ok) {
        throw new Error('Không thể tìm kiếm sản phẩm');
      }
      return await res.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  // Protected APIs (require authentication)
  createProduct: async (productData) => {
    try {
      const session = await getSession();
      if (!session?.user?.accessToken) {
        throw new Error('Vui lòng đăng nhập để thực hiện thao tác này');
      }

      const formData = new FormData();

      // Append text fields
      formData.append('title', productData.title);
      formData.append('price', productData.price.toString());
      formData.append('description', productData.description);
      formData.append('categoryId', productData.categoryId);
      formData.append('isActive', productData.isActive ? 'true' : 'false');
      formData.append('isPopular', productData.isPopular ? 'true' : 'false');
      formData.append('isBestSeller', productData.isBestSeller ? 'true' : 'false');

      // Append image
      if (productData.image instanceof File) {
        formData.append('image', productData.image);
      }
      console.log("FormData content:");
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
      const res = await fetch(`${API_URL}/products`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.user.accessToken}`
        },
        body: formData
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Có lỗi xảy ra khi tạo sản phẩm');
      }

      return await res.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  updateProduct: async (id, productData) => {
    try {
      const session = await getSession();
      if (!session?.user?.accessToken) {
        throw new Error('Vui lòng đăng nhập để thực hiện thao tác này');
      }

      const formData = new FormData();

      // Append text fields
      formData.append('title', productData.title);
      formData.append('price', productData.price.toString());
      formData.append('description', productData.description);
      formData.append('categoryId', productData.categoryId);
      formData.append('isActive', productData.isActive ? 'true' : 'false');
      formData.append('isPopular', productData.isPopular ? 'true' : 'false');
      formData.append('isBestSeller', productData.isBestSeller ? 'true' : 'false');

      // Append image if updated
      if (productData.image instanceof File) {
        formData.append('image', productData.image);
      }

      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${session.user.accessToken}`
        },
        body: formData
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Có lỗi xảy ra khi cập nhật sản phẩm');
      }

      return await res.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  deleteProduct: async (id) => {
    try {
      const session = await getSession();
      if (!session?.user?.accessToken) {
        throw new Error('Vui lòng đăng nhập để thực hiện thao tác này');
      }

      const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.user.accessToken}`
        }
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Có lỗi xảy ra khi xóa sản phẩm');
      }

      return await res.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};
