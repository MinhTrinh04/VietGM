import { getSession } from "next-auth/react";

const API_URL = 'http://localhost:3001/api/vgm';

export const userApi = {
  // Lấy tất cả users
  getAllUsers: async () => {
    try {
      const session = await getSession();

      if (!session?.user?.accessToken) {
        throw new Error('Vui lòng đăng nhập để thực hiện thao tác này');
      }

      const res = await fetch(`${API_URL}/users`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.user.accessToken}`
        }
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Bạn không có quyền thực hiện thao tác này');
        }
        throw new Error('Failed to fetch users');
      }
      return await res.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  // Lấy user theo ID
  getUserById: async (id) => {
    try {
      const session = await getSession();

      if (!session?.user?.accessToken) {
        throw new Error('Vui lòng đăng nhập để thực hiện thao tác này');
      }

      const res = await fetch(`${API_URL}/users/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session.user.accessToken}`
        }
      });
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Bạn không có quyền thực hiện thao tác này');
        }
        throw new Error('Failed to fetch user');
      }
      return await res.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  // Tạo user mới
  createUser: async (userData) => {
    try {
      const session = await getSession();

      if (!session?.user?.accessToken) {
        throw new Error('Vui lòng đăng nhập để thực hiện thao tác này');
      }

      const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.accessToken}`
        },
        body: JSON.stringify(userData)
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Bạn không có quyền thực hiện thao tác này');
        }
        const error = await res.json();
        throw new Error(error.message || 'Có lỗi xảy ra khi tạo người dùng');
      }

      return await res.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  // Cập nhật user
  updateUser: async (id, userData) => {
    try {
      const session = await getSession();

      if (!session?.user?.accessToken) {
        throw new Error('Vui lòng đăng nhập để thực hiện thao tác này');
      }

      const res = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.user.accessToken}`
        },
        body: JSON.stringify(userData)
      });

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Bạn không có quyền thực hiện thao tác này');
        }
        const error = await res.json();
        throw new Error(error.message || 'Có lỗi xảy ra khi cập nhật người dùng');
      }

      return await res.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  // Xóa user
  deleteUser: async (id) => {
    try {
      const session = await getSession();

      if (!session?.user?.accessToken) {
        throw new Error('Vui lòng đăng nhập để thực hiện thao tác này');
      }

      const res = await fetch(`${API_URL}/users/${id}`, {
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
        throw new Error(error.message || 'Có lỗi xảy ra khi xóa người dùng');
      }

      return await res.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};