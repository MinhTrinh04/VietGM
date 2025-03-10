import { getSession } from "next-auth/react";

const API_URL = 'http://localhost:3001/api/vgm';

export const categoryApi = {
  // Lấy tất cả categories
  getAllCategories: async () => {
    try {
      const res = await fetch(`${API_URL}/categories`);
      if (!res.ok) throw new Error('Failed to fetch categories');
      return await res.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  // Lấy category theo ID
  getCategoryById: async (id) => {
    try {
      const res = await fetch(`${API_URL}/categories/${id}`);
      if (!res.ok) throw new Error('Failed to fetch category');
      return await res.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  // Tạo category mới
  createCategory: async (categoryData) => {
    try {
      const session = await getSession();
      
      if (!session?.user?.accessToken) {
        throw new Error('Vui lòng đăng nhập để thực hiện thao tác này');
      }

      const res = await fetch(`${API_URL}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.accessToken}`
        },
        body: JSON.stringify(categoryData)
      });
      
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Bạn không có quyền thực hiện thao tác này');
        }
        const error = await res.json();
        throw new Error(error.message || 'Có lỗi xảy ra khi tạo thể loại');
      }
      
      return await res.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  // Cập nhật category
  updateCategory: async (id, categoryData) => {
    try {
      const session = await getSession();
      
      if (!session?.user?.accessToken) {
        throw new Error('Vui lòng đăng nhập để thực hiện thao tác này');
      }

      const res = await fetch(`${API_URL}/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.accessToken}`
        },
        body: JSON.stringify(categoryData)
      });
      
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Bạn không có quyền thực hiện thao tác này');
        }
        const error = await res.json();
        throw new Error(error.message || 'Có lỗi xảy ra khi cập nhật thể loại');
      }

      return await res.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  // Xóa category
  deleteCategory: async (id) => {
    try {
      const session = await getSession();
      
      if (!session?.user?.accessToken) {
        throw new Error('Vui lòng đăng nhập để thực hiện thao tác này');
      }

      const res = await fetch(`${API_URL}/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${session.user.accessToken}`
        }
      });
      
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Bạn không có quyền thực hiện thao tác này');
        }
        const error = await res.json();
        throw new Error(error.message || 'Có lỗi xảy ra khi xóa thể loại');
      }

      return await res.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};
