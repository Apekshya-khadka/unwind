require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ── Middleware 
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// ── Database 
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("  MongoDB connected"))
  .catch((err) => {
    console.error("  MongoDB connection error:", err.message);
    process.exit(1);
  });

// ── Routes 
app.use("/api/auth",        require("./routes/auth"));
app.use("/api/cabins",      require("./routes/cabins"));
app.use("/api/bookings",    require("./routes/bookings"));
app.use("/api/experiences", require("./routes/experiences"));
app.use("/api/faqs",        require("./routes/faqs"));
app.use("/api/newsletter",  require("./routes/newsletter"));
app.use("/api/contact",     require("./routes/contact"));

// ── Health check 
app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

// ── Start 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`  Server running on http://localhost:${PORT}`));
