const router = require("express").Router();
const { Newsletter } = require("../models/misc");
const auth = require("../middleware/auth");

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });
    await Newsletter.create({ email });
    res.status(201).json({ message: "Thanks for subscribing!" });
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ message: "Already subscribed!" });
    res.status(500).json({ message: err.message });
  }
});

router.get("/", auth, async (_req, res) => {
  try { res.json(await Newsletter.find().sort({ createdAt: -1 })); }
  catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;
