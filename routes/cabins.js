const router = require("express").Router();
const Cabin = require("../models/Cabin");

// GET /api/cabins  – supports ?search=, ?region=, ?featured=true
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.search) filter.name = { $regex: req.query.search, $options: "i" };
    if (req.query.region) filter.region = req.query.region;
    if (req.query.featured) filter.featured = true;
    const cabins = await Cabin.find(filter).sort({ createdAt: -1 });
    res.json(cabins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/cabins/meta/regions
router.get("/meta/regions", async (_req, res) => {
  try {
    const regions = await Cabin.distinct("region");
    res.json(regions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/cabins/:id
router.get("/:id", async (req, res) => {
  try {
    const cabin = await Cabin.findById(req.params.id);
    if (!cabin) return res.status(404).json({ message: "Cabin not found" });
    res.json(cabin);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
