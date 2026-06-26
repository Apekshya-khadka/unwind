const mongoose = require("mongoose");

const cabinSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    region: { type: String, required: true },
    description: String,
    pricePerPerson: { type: Number, required: true },
    sleeps: { type: Number, default: 2 },
    bedrooms: { type: Number, default: 1 },
    amenities: [String],
    images: [String],
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 4.5 },
    reviewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cabin", cabinSchema);
