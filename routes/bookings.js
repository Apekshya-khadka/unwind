const router = require("express").Router();
const Booking = require("../models/Booking");
const auth = require("../middleware/auth");

// POST /api/bookings  – create booking (public)
router.post("/", async (req, res) => {
  try {
    const { cabin, checkIn, checkOut, travellers, name, email } = req.body;
    if (!cabin || !checkIn || !checkOut || !travellers || !name || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const booking = await Booking.create({ cabin, checkIn, checkOut, travellers, name, email });
    res.status(201).json({
      message: `Thanks ${name}! Your booking is confirmed. We'll email you at ${email}.`,
      booking,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/bookings  – admin only
router.get("/", auth, async (_req, res) => {
  try {
    const bookings = await Booking.find().populate("cabin", "name region").sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
