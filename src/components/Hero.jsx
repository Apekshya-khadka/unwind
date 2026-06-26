import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";

const avatars = [
  "https://i.pravatar.cc/64?img=12",
  "https://i.pravatar.cc/64?img=47",
  "https://i.pravatar.cc/64?img=33",
  "https://i.pravatar.cc/64?img=15",
  "https://i.pravatar.cc/64?img=51",
];

export default function Hero() {
  const navigate = useNavigate();
  const handleSearch = (destination) => {
    navigate(`/cabins${destination ? `?search=${encodeURIComponent(destination)}` : ""}`);
  };

  return (
    <section className="relative">
      <div
        className="relative h-[640px] bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(13,19,16,0.92) 0%, rgba(13,19,16,0.45) 45%, rgba(13,19,16,0.05) 70%), url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80')",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-full flex flex-col justify-center">
          <div className="max-w-xl">
            <h1 className="text-white text-5xl md:text-6xl font-bold leading-tight">
              Leave the office behind and <span className="text-gold">unwind</span>
            </h1>
            <p className="text-white/85 mt-6 text-lg leading-relaxed">
              Welcome to our cozy cabin nestled in the heart of the mountains! Our cabin is
              the perfect getaway for those seeking peace and relaxation in a natural setting.
            </p>

            <div className="flex items-center gap-4 mt-8">
              <div className="flex -space-x-3">
                {avatars.map((a, i) => (
                  <img
                    key={i}
                    src={a}
                    alt=""
                    className="w-10 h-10 rounded-full border-2 border-ink object-cover"
                  />
                ))}
              </div>
              <div className="flex items-center gap-2 text-white">
                <span className="text-mint">★ Trustpilot</span>
                <span className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="w-5 h-5 bg-mint text-forest text-xs flex items-center justify-center">★</span>
                  ))}
                </span>
                <span className="text-sm">4.5 / 5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-10 -mt-10 relative z-10">
        <SearchBar onSearch={handleSearch} />
      </div>
    </section>
  );
}