require("dotenv").config();
const mongoose = require("mongoose");
const Cabin = require("./models/Cabin");
const Experience = require("./models/Experience");
const { Faq } = require("./models/misc");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB...");

  // Clear existing data
  await Cabin.deleteMany({});
  await Experience.deleteMany({});
  await Faq.deleteMany({});

  // ── Cabins ──────────────────────────────────────────────────
  await Cabin.insertMany([
    {
      name: "Golden Hideaway",
      slug: "golden-hideaway",
      region: "Lake District",
      description: "A stunning golden-hued cabin nestled between ancient oaks with panoramic lake views. Perfect for couples seeking a romantic retreat.",
      pricePerPerson: 120,
      sleeps: 2,
      bedrooms: 1,
      amenities: ["WiFi", "Hot Tub", "Log Fire", "Full Kitchen", "Dog Friendly"],
      images: [
        "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=900&q=80",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80",
      ],
      featured: true,
      rating: 4.9,
      reviewCount: 42,
    },
    {
      name: "Pine Ridge Retreat",
      slug: "pine-ridge-retreat",
      region: "Scottish Highlands",
      description: "Surrounded by towering Scots pines with a private stream. A peaceful hideaway with rustic charm and modern comforts.",
      pricePerPerson: 95,
      sleeps: 4,
      bedrooms: 2,
      amenities: ["WiFi", "Log Fire", "Full Kitchen", "Fishing Rights", "Bike Hire"],
      images: [
        "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=900&q=80",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80",
      ],
      featured: true,
      rating: 4.7,
      reviewCount: 28,
    },
    {
      name: "Moorland Lodge",
      slug: "moorland-lodge",
      region: "Yorkshire Dales",
      description: "A spacious lodge on the open moors with floor-to-ceiling windows framing breathtaking heather landscapes.",
      pricePerPerson: 110,
      sleeps: 6,
      bedrooms: 3,
      amenities: ["WiFi", "Hot Tub", "Log Fire", "Full Kitchen", "Garden"],
      images: [
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80",
      ],
      featured: false,
      rating: 4.6,
      reviewCount: 19,
    },
    {
      name: "Forest Canopy Cabin",
      slug: "forest-canopy-cabin",
      region: "New Forest",
      description: "Perched among ancient beech trees, this treehouse-style cabin offers an unforgettable elevated forest experience.",
      pricePerPerson: 140,
      sleeps: 2,
      bedrooms: 1,
      amenities: ["WiFi", "Hot Tub", "Deck", "Outdoor Shower", "Hammock"],
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80",
        "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=900&q=80",
      ],
      featured: true,
      rating: 5.0,
      reviewCount: 61,
    },
    {
      name: "Loch View Bothy",
      slug: "loch-view-bothy",
      region: "Scottish Highlands",
      description: "An authentically restored highland bothy with uninterrupted views of the loch. Off-grid living at its finest.",
      pricePerPerson: 85,
      sleeps: 2,
      bedrooms: 1,
      amenities: ["Wood Burner", "Outdoor Kitchen", "Rowing Boat", "Solar Power"],
      images: [
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=900&q=80",
        "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=900&q=80",
      ],
      featured: false,
      rating: 4.8,
      reviewCount: 33,
    },
    {
      name: "Meadow View Cabin",
      slug: "meadow-view-cabin",
      region: "Cotswolds",
      description: "A charming stone cabin on the edge of a wildflower meadow. Classic Cotswolds beauty with a contemporary interior.",
      pricePerPerson: 130,
      sleeps: 4,
      bedrooms: 2,
      amenities: ["WiFi", "Log Fire", "Full Kitchen", "Private Garden", "Parking"],
      images: [
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80",
      ],
      featured: false,
      rating: 4.5,
      reviewCount: 14,
    },
  ]);
  console.log("✅ Cabins seeded");

  // ── Experiences ─────────────────────────────────────────────
  await Experience.insertMany([
    {
      title: "Guided Forest Bathing",
      slug: "guided-forest-bathing",
      category: "Wellness",
      description: "A mindful 3-hour immersion in ancient woodland led by a certified forest therapy guide. Leave your phone behind and reconnect with nature.",
      duration: "3 hours",
      price: 45,
      images: ["https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80"],
      featured: true,
    },
    {
      title: "Wild Swimming & Foraging",
      slug: "wild-swimming-foraging",
      category: "Adventure",
      description: "Discover secret swimming spots and forage for seasonal wild food with our expert guides. Ends with a fire-cooked meal.",
      duration: "Full day",
      price: 80,
      images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80"],
      featured: true,
    },
    {
      title: "Stargazing Evening",
      slug: "stargazing-evening",
      category: "Nature",
      description: "An astronomer-led evening under the dark skies. Telescope viewing, constellation stories, and hot chocolate included.",
      duration: "2.5 hours",
      price: 35,
      images: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80"],
      featured: true,
    },
  ]);
  console.log("✅ Experiences seeded");

  // ── FAQs ─────────────────────────────────────────────────────
  await Faq.insertMany([
    { question: "What time is check-in and check-out?", answer: "Check-in is from 3pm and check-out is by 11am. Early or late arrangements can sometimes be made — just contact us.", order: 1 },
    { question: "Are pets allowed?", answer: "Some cabins are dog-friendly, shown on each listing. We ask that pets stay off furniture and are never left alone in the cabin.", order: 2 },
    { question: "Is there WiFi in the cabins?", answer: "Most cabins have WiFi, though speeds vary in remote locations. Check the amenities list on each cabin's page.", order: 3 },
    { question: "What is your cancellation policy?", answer: "Free cancellation up to 7 days before check-in. After that, a 50% fee applies. Full charge for no-shows.", order: 4 },
    { question: "Do I need to bring bedding and towels?", answer: "All cabins come fully equipped with fresh linen and towels. Just bring yourself!", order: 5 },
    { question: "Is there parking at the cabins?", answer: "Most cabins have on-site parking. Details are listed in each cabin's amenities. Some remote locations are walk-in only.", order: 6 },
  ]);
  console.log("✅ FAQs seeded");

  console.log("\n🎉 Database seeded successfully!");
  console.log("Admin login → email: admin@unwindcabins.com  |  password: admin123");
  process.exit(0);
}

seed().catch((err) => { console.error(err); process.exit(1); });
