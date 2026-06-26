const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({ question: String, answer: String, order: Number });
const newsletterSchema = new mongoose.Schema(
  { email: { type: String, required: true, unique: true } },
  { timestamps: true }
);
const contactSchema = new mongoose.Schema(
  { name: String, email: String, subject: String, message: String, read: { type: Boolean, default: false } },
  { timestamps: true }
);

module.exports = {
  Faq: mongoose.model("Faq", faqSchema),
  Newsletter: mongoose.model("Newsletter", newsletterSchema),
  Contact: mongoose.model("Contact", contactSchema),
};
