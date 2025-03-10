const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerAddress: { type: String, required: true },
  customerTel: { type: String, required: true },
  customerEmail: { type: String, required: true },
  orderItems: [
    {
      productId: { type: String, required: true },
      title: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  paymentMethod: { type: Number, required: true },
  note: { type: String },
  orderStatus: { type: Number, default: 1 },
}, { timestamps: true });

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;