import { Heart, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const FALLBACK_IMG = "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=900&q=80";

export default function CabinCard({ cabin }) {
  const [liked, setLiked] = useState(false);

  const toggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLiked(!liked);
  };

  const imgSrc =
    (Array.isArray(cabin.images) && cabin.images[0]) ||
    cabin.image ||
    FALLBACK_IMG;

  return (
    <Link to={`/cabins/${cabin._id}`} className="group block">
      <div className="relative rounded-xl overflow-hidden h-72">
        <img
          src={imgSrc}
          alt={cabin.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = FALLBACK_IMG; }}
        />
        <button
          onClick={toggleLike}
          aria-label="Save cabin"
          className="absolute top-4 right-4 w-9 h-9 bg-black/60 rounded-md flex items-center justify-center"
        >
          <Heart size={16} className={liked ? "fill-gold text-gold" : "text-white"} />
        </button>
      </div>

      <div className="bg-forest text-white p-6 rounded-b-none -mt-2 relative z-10 rounded-xl pt-8">
        <p className="text-xs uppercase tracking-wide text-mint/80">
          {cabin.region || cabin.location}
        </p>
        <div className="flex items-center justify-between mt-1">
          <h3 className="text-lg font-semibold">{cabin.name}</h3>
          <span className="text-sm font-semibold whitespace-nowrap ml-3">
            £{cabin.pricePerPerson}
            <sup className="text-xs ml-0.5">PP</sup>
          </span>
        </div>
        <p className="text-sm text-white/75 mt-3 leading-relaxed line-clamp-3">
          {cabin.description}
        </p>
        <div className="flex items-center gap-1 mt-4 text-mint">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < Math.round(cabin.rating || 4) ? "fill-mint" : "text-white/30"}
            />
          ))}
          <span className="text-white/70 text-sm ml-1">
            {cabin.reviewCount || cabin.reviews || 0} reviews
          </span>
        </div>
      </div>
    </Link>
  );
}