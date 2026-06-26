import { ChevronRight, Play, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

// Replace this URL with your actual video URL (YouTube embed, MP4, etc.)
const VIDEO_URL = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";

export default function VideoSection() {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold">Get ready to unwind</h2>
          <div className="w-14 h-1 bg-gold mt-2 mb-6" />
          <p className="text-slate leading-relaxed">
            A cabin getaway can be a wonderful way to relax and reconnect with nature. Many
            cabin rentals are located in beautiful, secluded areas, surrounded by trees and
            other natural beauty.
          </p>
          <p className="text-slate leading-relaxed mt-4">
            A cabin getaway can be a wonderful way to escape the hustle and bustle of daily
            life and reconnect with nature.
          </p>
          <Link to="/about#how-it-works" className="inline-flex items-center gap-1 mt-6 font-medium text-navy hover:text-forest">
            Learn more <ChevronRight size={16} />
          </Link>
        </div>

        <div className="relative rounded-xl overflow-hidden shadow-xl">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80"
            alt="Get ready to unwind"
            className="w-full h-[380px] object-cover"
          />
          {/* Clickable play button */}
          <button
            aria-label="Play video"
            onClick={() => setShowVideo(true)}
            className="absolute inset-0 flex items-center justify-center group"
          >
            <span className="w-16 h-16 rounded-full bg-white/30 backdrop-blur flex items-center justify-center group-hover:bg-white/50 transition-all group-hover:scale-110">
              <Play size={26} className="text-white fill-white" />
            </span>
          </button>
        </div>
      </section>

      {/* Video Modal */}
      {showVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors"
              aria-label="Close video"
            >
              <X size={20} />
            </button>
            <iframe
              src={VIDEO_URL}
              className="w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
              title="Unwind Cabins Video"
            />
          </div>
        </div>
      )}
    </>
  );
}
