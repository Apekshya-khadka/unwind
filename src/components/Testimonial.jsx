export default function Testimonial() {
  return (
    <section
      className="relative bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(13,19,16,0.25) 0%, rgba(13,19,16,0.7) 60%), url('https://images.unsplash.com/photo-1483794344563-d27a8d18014e?w=1600&q=80')",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-28 grid grid-cols-1 md:grid-cols-2">
        <div />
        <div className="text-white">
          <h2 className="text-4xl font-bold leading-tight">A truly wonderful experience</h2>
          <p className="mt-6 leading-relaxed text-white/90">
            Brilliant for anyone looking to get away from the hustle and bustle of city
            life or detox from their tech for a few days. I could have stayed another
            week!
          </p>
          <p className="mt-4 leading-relaxed text-white/90">
            They really have thought about everything here down to the finest details.
          </p>
          <div className="flex items-center gap-3 mt-8">
            <span className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="w-6 h-6 bg-mint text-forest text-sm flex items-center justify-center"
                >
                  ★
                </span>
              ))}
            </span>
            <span className="text-sm text-white/80">01 Jan 2023</span>
          </div>
        </div>
      </div>
    </section>
  );
}
