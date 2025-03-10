"use client";
const API_URL = 'http://localhost:3001/api/vgm';

export const orderApi = {
  getAllOrders: async (filters = {}) => {
    try {
      let queryString = new URLSearchParams();

      if (filters.customerName) queryString.append('customerName', filters.customerName);
      if (filters.customerEmail) queryString.append('customerEmail', filters.customerEmail);
      if (filters.customerTel) queryString.append('customerTel', filters.customerTel);

      const res = await fetch(`${API_URL}/orders?${queryString}`);
      if (!res.ok) {
        throw new Error("Không thể tải danh sách đơn hàng");
      }
      return await res.json();
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw new Error('Lỗi khi lấy danh sách đơn hàng: ' + error.message);
    }
  },

  getOrderById: async (id) => {
    try {
      const res = await fetch(`${API_URL}/orders/${id}`);
      if (!res.ok) {
        throw new Error('Không thể tải thông tin đơn hàng');
      }
      return await res.json();
    } catch (error) {
      console.error('Error fetching order by ID:', error);
      throw new Error('Lỗi khi lấy thông tin đơn hàng: ' + error.message);
    }
  },

  createOrder: async (orderData) => {
    try {
      const res = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Có lỗi xảy ra khi tạo đơn hàng');
      }

      return await res.json();
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Lỗi khi tạo đơn hàng: ' + error.message);
    }
  },

  updateOrder: async (id, orderData) => {
    try {
      const res = await fetch(`${API_URL}/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Có lỗi xảy ra khi cập nhật đơn hàng');
      }

      return await res.json();
    } catch (error) {
      console.error('Error updating order:', error);
      throw new Error('Lỗi khi cập nhật đơn hàng: ' + error.message);
    }
  },

  deleteOrder: async (id) => {
    try {
      const res = await fetch(`${API_URL}/orders/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Có lỗi xảy ra khi xóa đơn hàng');
      }

      return await res.json();
    } catch (error) {
      console.error('Error deleting order:', error);
      throw new Error('Lỗi khi xóa đơn hàng: ' + error.message);
    }
  },
};