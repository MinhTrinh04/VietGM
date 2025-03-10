"use client";
const API_URL = 'http://localhost:3001/api/vgm';

export const reservationApi = {
    getAllReservations: async (filters = {}) => {
        try {
          let queryString = new URLSearchParams();
    
          // Thêm các filter vào query string (nếu cần)
          if (filters.name) queryString.append('name', filters.name);
          if (filters.email) queryString.append('email', filters.email);
          if (filters.tel) queryString.append('tel', filters.tel);
          if (filters.time) queryString.append('time', filters.time);
          if (filters.person) queryString.append('person', filters.person.toString()); // Chuyển đổi số thành chuỗi
          if (filters.note) queryString.append('note', filters.note);
          if (filters.check !== undefined) queryString.append('check', filters.check.toString()); // Chuyển đổi boolean thành chuỗi
          // ... thêm các filter khác nếu cần
    
          const res = await fetch(`${API_URL}/reservations?${queryString}`);
          if (!res.ok) {
            throw new Error("Không thể tải danh sách đặt bàn");
          }
          return await res.json();; // Luôn trả về mảng
        } catch (error) {
          console.error("Error fetching reservations:", error);
          throw new Error('Lỗi khi lấy danh sách đặt bàn: ' + error.message);
        }
      },
    

  getReservationById: async (id) => {
    try {
      const res = await fetch(`${API_URL}/reservations/${id}`);  // Sửa để sử dụng API_URL
      if (!res.ok) {
        throw new Error('Không thể tải thông tin đặt bàn');
      }
      return await res.json();
    } catch (error) {
      console.error('Error fetching reservation by ID:', error);
      throw new Error('Lỗi khi lấy thông tin đặt bàn: ' + error.message); // Thêm chi tiết lỗi
    }
  },

  createReservation: async (reservationData) => {
    try {
      const res = await fetch(`${API_URL}/reservations`, {  // Sửa để sử dụng API_URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Có lỗi xảy ra khi tạo đặt bàn');
      }

      return await res.json();
    } catch (error) {
      console.error('Error creating reservation:', error);
      throw new Error('Lỗi khi tạo đặt bàn: ' + error.message); // Thêm chi tiết lỗi
    }
  },

  updateReservation: async (id, reservationData) => {
    try {
      const res = await fetch(`${API_URL}/reservations/${id}`, {  // Sửa để sử dụng API_URL
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Có lỗi xảy ra khi cập nhật đặt bàn');
      }

      return await res.json();
    } catch (error) {
      console.error('Error updating reservation:', error);
      throw new Error('Lỗi khi cập nhật đặt bàn: ' + error.message); // Thêm chi tiết lỗi
    }
  },

  deleteReservation: async (id) => {
    try {
      const res = await fetch(`${API_URL}/reservations/${id}`, {  // Sửa để sử dụng API_URL
        method: 'DELETE',
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Có lỗi xảy ra khi xóa đặt bàn');
      }

      return await res.json();
    } catch (error) {
      console.error('Error deleting reservation:', error);
      throw new Error('Lỗi khi xóa đặt bàn: ' + error.message); // Thêm chi tiết lỗi
    }
  },
};
