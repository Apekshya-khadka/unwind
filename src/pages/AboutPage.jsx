import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div>
      <section
        className="relative bg-cover bg-center h-[360px] flex items-center"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(13,19,16,0.85) 0%, rgba(13,19,16,0.4) 100%), url('https://images.unsplash.com/photo-1518602164578-cd0074062767?w=1600&q=80')",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <h1 className="text-white text-5xl font-bold">About UnwindCabins</h1>
          <p className="text-white/85 mt-4 max-w-xl">
            We help people swap their screens for skylines — one cabin at a time.
          </p>
        </div>
      </section>

      <section id="story" className="max-w-4xl mx-auto px-6 lg:px-10 py-16">
        <h2 className="text-3xl font-bold">Our story</h2>
        <div className="w-14 h-1 bg-gold mt-2 mb-6" />
        <p className="text-slate leading-relaxed">
          UnwindCabins started in 2019 after our founders spent one too many weekends still
          glued to their laptops. What began as a single borrowed cabin in Hampshire turned
          into a small collection of hideaways across the south of England, each one picked
          for the same reason: nowhere to plug in, and nothing to do but switch off.
        </p>
        <p className="text-slate leading-relaxed mt-4">
          Today, we work with independent cabin owners who care as much about the details —
          a stocked kitchen, a working fireplace, an honest description — as we do.
        </p>
      </section>

      <section id="why-us" className="bg-sage py-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <h2 className="text-3xl font-bold">Why us</h2>
          <div className="w-14 h-1 bg-gold mt-2 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-lg">Real, vetted cabins</h3>
              <p className="text-slate mt-2 text-sm leading-relaxed">
                Every cabin is visited and checked before it goes live — what you see is
                what you get.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">No hidden fees</h3>
              <p className="text-slate mt-2 text-sm leading-relaxed">
                The price per person you see is the price you pay. No surprise cleaning
                charges at checkout.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Real people, real help</h3>
              <p className="text-slate mt-2 text-sm leading-relaxed">
                Our small team answers live chat and email ourselves — no call centres, no
                chatbots pretending to be human.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="max-w-4xl mx-auto px-6 lg:px-10 py-16">
        <h2 className="text-3xl font-bold">How it works</h2>
        <div className="w-14 h-1 bg-gold mt-2 mb-6" />
        <ol className="space-y-6">
          <li className="flex gap-4">
            <span className="font-display text-2xl text-gold">1</span>
            <div>
              <h3 className="font-semibold">Find your cabin</h3>
              <p className="text-slate text-sm mt-1">
                Search by location, dates, or what you're after — pet friendly, accessible,
                a hot tub, the lot.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="font-display text-2xl text-gold">2</span>
            <div>
              <h3 className="font-semibold">Book in minutes</h3>
              <p className="text-slate text-sm mt-1">
                Pick your dates, confirm your details, and you're booked — no account
                needed.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="font-display text-2xl text-gold">3</span>
            <div>
              <h3 className="font-semibold">Switch off</h3>
              <p className="text-slate text-sm mt-1">
                We'll send directions and check-in details by email. After that, it's just
                you, the cabin, and a lot of quiet.
              </p>
            </div>
          </li>
        </ol>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/cabins"
            className="bg-gold text-navy font-medium px-6 py-3 rounded-md hover:bg-gold/90 transition-colors"
          >
            Find a cabin
          </Link>
          <Link to="/#faq" className="border border-black/10 px-6 py-3 rounded-md hover:bg-sage transition-colors">
            Read our FAQ
          </Link>
        </div>
      </section>
    </div>
  );
}
