const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    cabin: { type: mongoose.Schema.Types.ObjectId, ref: "Cabin", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    travellers: { type: Number, required: true, min: 1 },
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "confirmed" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
