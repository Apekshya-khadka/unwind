import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getExperience } from "../api.js";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80";

export default function ExperienceDetailPage() {
  const { id } = useParams();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getExperience(id)
      .then(setExperience)
      .catch(() => setError("We couldn't find that experience."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="max-w-4xl mx-auto px-6 py-20 text-slate">Loading experience…</p>;
  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20">
        <p className="text-red-600">{error}</p>
        <Link to="/experiences" className="text-navy underline mt-4 inline-block">
          Back to all experiences
        </Link>
      </div>
    );
  }

  const images =
    Array.isArray(experience.images) && experience.images.length > 0
      ? experience.images
      : [experience.image || FALLBACK_IMG];

  return (
    <section className="max-w-4xl mx-auto px-6 lg:px-10 py-12">
      <Link to="/experiences" className="inline-flex items-center gap-1 text-navy hover:underline mb-6">
        <ArrowLeft size={16} /> Back to all experiences
      </Link>

      <div className="rounded-xl overflow-hidden h-[380px] bg-gray-100">
        <img
          src={images[0]}
          alt={experience.title}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = FALLBACK_IMG; }}
        />
      </div>

      <p className="text-xs uppercase tracking-wide text-gold font-medium mt-8">
        {experience.category || experience.eyebrow}
      </p>
      <h1 className="text-4xl font-bold mt-1">{experience.title}</h1>

      {experience.duration && (
        <p className="text-sm text-slate mt-2">
          ⏱ {experience.duration}
          {experience.price && <span className="ml-3">· £{experience.price} per person</span>}
        </p>
      )}

      <p className="text-slate leading-relaxed mt-6 text-lg">{experience.description}</p>
      {experience.longDescription && (
        <p className="text-slate leading-relaxed mt-4">{experience.longDescription}</p>
      )}

      <Link
        to="/cabins"
        className="inline-block bg-gold text-navy font-medium px-6 py-3 rounded-md mt-8 hover:bg-gold/90 transition-colors"
      >
        Find a cabin for this experience
      </Link>
    </section>
  );
}