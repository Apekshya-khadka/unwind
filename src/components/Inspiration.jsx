import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getExperiences } from "../api.js";

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

const FALLBACK_IMG = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80";

export default function Inspiration() {
  const [experiences, setExperiences] = useState(FALLBACK_EXPERIENCES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExperiences()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setExperiences(data.slice(0, 3));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="inspiration" className="bg-sage py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold">Inspiration for your next getaway</h2>
            <div className="w-14 h-1 bg-gold mt-2 mb-4" />
            <p className="text-slate">We've curated some amazing experiences to help you find your next getaway.</p>
          </div>
          <Link to="/experiences" className="text-navy underline font-medium whitespace-nowrap">
            View all experiences
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
          {experiences.map((c) => {
            const imgSrc =
              (Array.isArray(c.images) && c.images[0]) ||
              c.image ||
              FALLBACK_IMG;

            return (
              <Link to={`/experiences/${c._id}`} key={c._id} className="rounded-xl overflow-hidden group block shadow-md">
                <div className="h-72 overflow-hidden">
                  <img
                    src={imgSrc}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = FALLBACK_IMG; }}
                  />
                </div>
                <div className="bg-[#4d5760] text-white p-6">
                  <p className="text-xs uppercase tracking-wide text-mint">{c.category || c.eyebrow}</p>
                  <h3 className="text-xl font-semibold mt-1">{c.title}</h3>
                  <p className="text-white/80 text-sm mt-3 leading-relaxed line-clamp-3">{c.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}