const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  tel: { type: String, required: true },
  time: { type: String, required: true },
  person: { type: Number, required: true },
  note: { type: String, default: "" },
  check: { type: Boolean, default: false }
}, { timestamps: true });

const Reservation = mongoose.model("Reservation", ReservationSchema);

module.exports = Reservation;
