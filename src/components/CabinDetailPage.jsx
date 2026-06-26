import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, ArrowLeft, Heart, PawPrint, Accessibility, Users } from "lucide-react";
import { getCabin } from "../api.js";
import BookingForm from "../components/BookingForm.jsx";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=900&q=80";

export default function CabinDetailPage() {
  const { id } = useParams();
  const [cabin, setCabin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setLoading(true);
    setActiveImg(0);
    getCabin(id)
      .then(setCabin)
      .catch(() => setError("We couldn't find that cabin."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="max-w-5xl mx-auto px-6 py-20 text-slate">Loading cabin…</p>;
  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-20">
        <p className="text-red-600">{error}</p>
        <Link to="/cabins" className="text-navy underline mt-4 inline-block">Back to all cabins</Link>
      </div>
    );
  }

  const images =
    Array.isArray(cabin.images) && cabin.images.length > 0
      ? cabin.images
      : [cabin.image || FALLBACK_IMG];

  return (
    <section className="max-w-5xl mx-auto px-6 lg:px-10 py-12">
      <Link to="/cabins" className="inline-flex items-center gap-1 text-navy hover:underline mb-6">
        <ArrowLeft size={16} /> Back to all cabins
      </Link>

      {/* Main image */}
      <div className="rounded-xl overflow-hidden h-[420px] bg-gray-100">
        <img
          src={images[activeImg]}
          alt={cabin.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = FALLBACK_IMG; }}
        />
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-3 mt-3">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              className={`rounded-lg overflow-hidden h-20 w-32 flex-shrink-0 border-2 transition-all ${
                activeImg === i ? "border-gold" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`View ${i + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = FALLBACK_IMG; }}
              />
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10 mt-8">
        <div>
          <p className="text-xs uppercase tracking-wide text-gold font-medium">
            {cabin.region || cabin.location}
          </p>
          <h1 className="text-4xl font-bold mt-1">{cabin.name}</h1>

          <div className="flex items-center gap-1 mt-3 text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.round(cabin.rating || 4) ? "fill-gold" : "text-slate/30"}
              />
            ))}
            <span className="text-slate text-sm ml-2">
              {cabin.reviewCount || cabin.reviews || 0} reviews
            </span>
          </div>

          <p className="text-slate leading-relaxed mt-6">{cabin.description}</p>

          <div className="flex flex-wrap gap-3 mt-6">
            <span className="flex items-center gap-1.5 text-sm bg-sage rounded-full px-3 py-1.5">
              <Users size={14} /> Sleeps {cabin.sleeps}
            </span>
            {(cabin.petFriendly || cabin.amenities?.includes("Dog Friendly")) && (
              <span className="flex items-center gap-1.5 text-sm bg-sage rounded-full px-3 py-1.5">
                <PawPrint size={14} /> Pet friendly
              </span>
            )}
            {(cabin.accessible || cabin.amenities?.includes("Accessible")) && (
              <span className="flex items-center gap-1.5 text-sm bg-sage rounded-full px-3 py-1.5">
                <Accessibility size={14} /> Accessible
              </span>
            )}
          </div>

          {cabin.amenities?.length > 0 && (
            <div className="mt-8">
              <h3 className="font-semibold text-lg">What this cabin offers</h3>
              <ul className="grid grid-cols-2 gap-2 mt-3 text-slate">
                {cabin.amenities.map((a) => (
                  <li key={a} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" /> {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="h-fit md:sticky md:top-6">
          {!showBooking ? (
            <div className="border border-black/10 rounded-xl p-6">
              <p className="text-2xl font-bold">
                £{cabin.pricePerPerson}
                <span className="text-base font-normal text-slate"> / person</span>
              </p>
              <p className="text-sm text-slate mt-1">
                Up to {cabin.sleeps} guests · {cabin.bedrooms} bedroom{cabin.bedrooms !== 1 ? "s" : ""}
              </p>
              <button
                onClick={() => setShowBooking(true)}
                className="w-full bg-gold text-navy font-medium px-6 py-3 rounded-md mt-5 hover:bg-gold/90 transition-colors"
              >
                Book a stay
              </button>
              <Link
                to="/gift-a-stay"
                state={{ cabinId: cabin._id }}
                className="w-full block text-center border border-black/10 rounded-md px-6 py-3 mt-3 hover:bg-sage transition-colors"
              >
                Gift this stay
              </Link>
              <button
                onClick={() => setSaved(!saved)}
                className="w-full flex items-center justify-center gap-2 border border-black/10 rounded-md px-6 py-3 mt-3 hover:bg-sage transition-colors"
              >
                <Heart size={16} className={saved ? "fill-gold text-gold" : ""} />
                {saved ? "Saved" : "Save for later"}
              </button>
            </div>
          ) : (
            <BookingForm cabin={cabin} onClose={() => setShowBooking(false)} />
          )}
        </div>
      </div>
    </section>
  );
}