const Order = require("../../models/VGM/Order");
async function createOrder(req, res) {
  const { 
    customerName, 
    customerAddress, 
    customerTel, 
    customerEmail, 
    orderItems, 
    totalPrice, 
    paymentMethod, 
    note 
  } = req.body;

  try {
    if (!customerName || !customerAddress || !customerTel || !customerEmail || !orderItems || !totalPrice || !paymentMethod) {
      return res.status(400).json({ message: "Thiếu thông tin đơn hàng." });
    }
    const newOrder = new Order({
      customerName,
      customerAddress,
      customerTel,
      customerEmail,
      orderItems,
      totalPrice,
      paymentMethod,
      note,
    });

    await newOrder.save();

    return res.status(201).json({ message: "Đặt hàng thành công!", data: newOrder });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({ message: "Lỗi khi tạo đơn hàng" });
  }
}

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({ message: "Lỗi khi lấy danh sách đơn hàng" });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error retrieving order:", error);
    res.status(500).json({ message: "Lỗi khi lấy thông tin đơn hàng" });
  }
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body; 

  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }
    res.status(200).json({ message: "Cập nhật đơn hàng thành công", data: updatedOrder });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật đơn hàng" });
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
    }
    res.status(200).json({ message: "Xóa đơn hàng thành công", data: deletedOrder });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Lỗi khi xóa đơn hàng" });
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
};