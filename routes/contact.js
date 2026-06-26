const router = require("express").Router();
const { Contact } = require("../models/misc");
const auth = require("../middleware/auth");

router.post("/", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ message: "Name, email and message are required" });
    await Contact.create({ name, email, subject, message });
    res.status(201).json({ message: "Thanks! We'll be in touch soon." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", auth, async (_req, res) => {
  try { res.json(await Contact.find().sort({ createdAt: -1 })); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
