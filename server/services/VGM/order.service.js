const Order = require("../../models/VGM/Order");

const orderService = {
  create: async (orderData) => {
    try {
      const order = new Order(orderData);
      return await order.save();
    } catch (error) {
      console.error("Error creating order:", error);
      throw new Error("Lỗi khi tạo đơn hàng");
    }
  },
  getAll: async (filters = {}) => {
    try {
      let query = Order.find().sort({ createdAt: -1 });

      if (filters.customerName) {
        query = query.where("customerName", new RegExp(filters.customerName, "i"));
      }
      if (filters.customerEmail) {
        query = query.where("customerEmail", new RegExp(filters.customerEmail, "i"));
      }
      if (filters.customerTel) {
        query = query.where("customerTel", new RegExp(filters.customerTel, "i"));
      }

      return await query.exec();
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw new Error("Lỗi khi lấy danh sách đơn hàng");
    }
  },

  getById: async (id) => {
    try {
      const order = await Order.findById(id);
      if (!order) {
        throw new Error("Đơn hàng không tồn tại");
      }
      return order;
    } catch (error) {
      console.error("Error fetching order by ID:", error);
      throw new Error("Lỗi khi lấy thông tin đơn hàng");
    }
  },

  update: async (id, updateData) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      if (!updatedOrder) {
        throw new Error("Đơn hàng không tồn tại");
      }
      return updatedOrder;
    } catch (error) {
      console.error("Error updating order:", error);
      throw new Error("Lỗi khi cập nhật đơn hàng");
    }
  },

  delete: async (id) => {
    try {
      const deletedOrder = await Order.findByIdAndDelete(id);
      if (!deletedOrder) {
        throw new Error("Đơn hàng không tồn tại");
      }
      return { message: "Đơn hàng đã được xóa" };
    } catch (error) {
      console.error("Error deleting order:", error);
      throw new Error("Lỗi khi xóa đơn hàng");
    }
  },
};

module.exports = orderService;