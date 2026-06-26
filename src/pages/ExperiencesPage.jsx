import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getExperiences } from "../api.js";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80";

// ✅ FIX: category values must match exactly what's saved in MongoDB by seed.js
const categories = [
  { value: "", label: "All experiences" },
  { value: "Nature", label: "Explore nature" },
  { value: "Wellness", label: "Rest & re-set" },
  { value: "Pet friendly", label: "Pet friendly" },
  { value: "Food & drink", label: "Food & drink" },
  { value: "Adventure", label: "For you and yours" },
];

const FALLBACK_EXPERIENCES = [
  {
    _id: "1",
    title: "Guided Forest Bathing",
    category: "Wellness",
    description: "A mindful 3-hour immersion in ancient woodland. Leave your phone behind and reconnect with nature.",
    images: ["https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80"],
  },
  {
    _id: "2",
    title: "Wild Swimming & Foraging",
    category: "Adventure",
    description: "Discover secret swimming spots and forage for seasonal wild food. Ends with a fire-cooked meal.",
    images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80"],
  },
  {
    _id: "3",
    title: "Stargazing Evening",
    category: "Nature",
    description: "An astronomer-led evening under the dark skies. Telescope viewing and hot chocolate included.",
    images: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80"],
  },
];

export default function ExperiencesPage() {
  const [allExperiences, setAllExperiences] = useState(FALLBACK_EXPERIENCES);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    // ✅ Load ALL experiences once, filter on frontend
    getExperiences({})
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAllExperiences(data);
        }
      })
      .catch(() => {
        // silently use fallback data if backend is offline
        setError(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // ✅ FIX: filter on frontend so category buttons always work
  const filtered = category
    ? allExperiences.filter(
        (e) => (e.category || "").toLowerCase() === category.toLowerCase()
      )
    : allExperiences;

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
      <h1 className="text-4xl font-bold">Inspiration for your next getaway</h1>
      <div className="w-14 h-1 bg-gold mt-2 mb-8" />

      {/* Category filter buttons */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.value}
            onClick={() => setCategory(c.value)}
            className={`px-4 py-2 rounded-full text-sm border transition-colors ${
              category === c.value
                ? "bg-forest text-white border-forest"
                : "border-black/15 text-navy hover:bg-sage"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {loading && <p className="text-slate mt-10">Loading experiences…</p>}

      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {filtered.length === 0 && (
            <p className="text-slate col-span-full">
              No experiences found for this category.
            </p>
          )}
          {filtered.map((exp) => {
            // ✅ FIX: use images[] array not image string
            const imgSrc =
              (Array.isArray(exp.images) && exp.images[0]) ||
              exp.image ||
              FALLBACK_IMG;

            return (
              <Link
                to={`/experiences/${exp._id}`}
                key={exp._id}
                className="rounded-xl overflow-hidden group block shadow-md"
              >
                <div className="h-64 overflow-hidden bg-gray-100">
                  <img
                    src={imgSrc}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = FALLBACK_IMG; }}
                  />
                </div>
                <div className="bg-[#4d5760] text-white p-6">
                  {/* ✅ FIX: use category not eyebrow */}
                  <p className="text-xs uppercase tracking-wide text-mint">
                    {exp.category || exp.eyebrow}
                  </p>
                  <h3 className="text-xl font-semibold mt-1">{exp.title}</h3>
                  <p className="text-white/80 text-sm mt-3 leading-relaxed line-clamp-3">
                    {exp.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}