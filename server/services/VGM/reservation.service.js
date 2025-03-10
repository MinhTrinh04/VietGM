const Reservation = require("../../models/VGM/Reservation");

const reservationService = {
  create: async (reservationData) => {
    try {
      const reservation = new Reservation(reservationData);
      return await reservation.save();
    } catch (error) {
      console.error("Error creating reservation:", error);
      throw new Error("Lỗi khi tạo đơn đặt bàn");
    }
  },

  getAll: async (filters = {}) => {
    try {
      let query = Reservation.find().sort({ createdAt: -1 });

      if (filters.name) query = query.where("name", new RegExp(filters.name, "i"));
      if (filters.email) query = query.where("email", new RegExp(filters.email, "i"));
      if (filters.tel) query = query.where("tel", new RegExp(filters.tel, "i"));
      if (filters.time) query = query.where("time", filters.time);

      return await query.exec();
    } catch (error) {
      console.error("Error fetching reservations:", error);
      throw new Error("Lỗi khi lấy danh sách đơn đặt bàn");
    }
  },

  getById: async (id) => {
    try {
      const reservation = await Reservation.findById(id);
      if (!reservation) {
        throw new Error("Đơn đặt bàn không tồn tại");
      }
      return reservation;
    } catch (error) {
      console.error("Error fetching reservation by ID:", error);
      throw new Error("Lỗi khi lấy thông tin đơn đặt bàn");
    }
  },

  update: async (id, updateData) => {
    try {
      const updatedReservation = await Reservation.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      if (!updatedReservation) {
        throw new Error("Đơn đặt bàn không tồn tại");
      }
      return updatedReservation;
    } catch (error) {
      console.error("Error updating reservation:", error);
      throw new Error("Lỗi khi cập nhật đơn đặt bàn");
    }
  },

  delete: async (id) => {
    try {
      const deletedReservation = await Reservation.findByIdAndDelete(id);
      if (!deletedReservation) {
        throw new Error("Đơn đặt bàn không tồn tại");
      }
      return { message: "Đơn đặt bàn đã được xóa" };
    } catch (error) {
      console.error("Error deleting reservation:", error);
      throw new Error("Lỗi khi xóa đơn đặt bàn");
    }
  },
};

module.exports = reservationService;
