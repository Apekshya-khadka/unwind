const router = require("express").Router();
const { Faq } = require("../models/misc");
router.get("/", async (_req, res) => {
  try { res.json(await Faq.find().sort({ order: 1 })); }
  catch (err) { res.status(500).json({ message: err.message }); }
});
module.exports = router;
