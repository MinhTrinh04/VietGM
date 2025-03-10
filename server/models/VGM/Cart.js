const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [cartItemSchema],
    totalPrice: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      default: "VNĐ",
    },
    status: {
      type: String,
      enum: ["active", "completed", "abandoned"],
      default: "active",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

cartSchema.pre("save", function (next) {
  this.totalPrice = this.items.reduce((total, item) => total + item.totalPrice, 0);
  next();
});

cartSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.items) {
    update.totalPrice = update.items.reduce((total, item) => total + item.totalPrice, 0);
  }
  next();
});

module.exports = mongoose.model("Cart", cartSchema);
