import { useState } from "react";
import { Link } from "react-router-dom";
import { Linkedin, Twitter, Facebook, Instagram, Youtube } from "lucide-react";
import { joinNewsletter } from "../api.js";

const slugify = (label) =>
  label.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const aboutLinks = [
  { label: "Our story", to: "/about#story" },
  { label: "Why us", to: "/about#why-us" },
  { label: "How it works", to: "/about#how-it-works" },
  { label: "FAQ", to: "/#faq" },
];

const cabinGroups = [
  { heading: "North of London", links: ["Golden Hideaway", "Oak Treehouse", "Acacia Retreat", "Blue Lagoon"] },
  { heading: "South of London", links: ["Lavender Retreat", "Butterfly Treehouse", "Mahogany Hideaway"] },
];

const inspireGroups = [
  { heading: "Explore nature", links: ["Hiking trails", "Swimming", "Fishing", "Boating", "Cycling"] },
  { heading: "Rest, relax and re-set", links: ["Spa treatments", "Hot tubs", "Nature Trails"] },
  { heading: "Great food and drink", links: ["Pubs", "Resturants", "Food markets", "Picnics"] },
];

const forYouLinks = [
  { label: "Solo or a couple", to: "/cabins?sleeps=2" },
  { label: "Pet friendly", to: "/cabins?petFriendly=true" },
  { label: "Accessible cabins", to: "/cabins?accessible=true" },
];

const supportLinks = [
  { label: "Help", to: "/info/help" },
  { label: "Contact us", to: "/contact" },
  { label: "Privacy Policy", to: "/info/privacy-policy" },
  { label: "Terms of Service", to: "/info/terms-of-service" },
  { label: "Complaints Policy", to: "/info/complaints-policy" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await joinNewsletter(email);
      setStatus(res.message || "Subscribed!");
      setEmail("");
    } catch (err) {
      setStatus(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <footer className="bg-ink text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* About us */}
          <div>
            <h4 className="text-mint font-semibold mb-4">About us</h4>
            <ul className="space-y-2 text-white/80 text-sm">
              {aboutLinks.map((l) => (
                <li key={l.label}><Link to={l.to} className="hover:text-white">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Our cabins */}
          <div>
            <h4 className="text-mint font-semibold mb-4">Our cabins</h4>
            {cabinGroups.map((g) => (
              <div key={g.heading} className="mb-6">
                <p className="font-semibold text-white/90 mb-2">{g.heading}</p>
                <ul className="space-y-2 text-white/80 text-sm">
                  {g.links.map((l) => (
                    <li key={l}>
                      <Link to={`/cabins?search=${encodeURIComponent(l)}`} className="hover:text-white">
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Get inspired */}
          <div>
            <h4 className="text-mint font-semibold mb-4">Get inspired</h4>
            {inspireGroups.map((g) => (
              <div key={g.heading} className="mb-6">
                <p className="font-semibold text-white/90 mb-2">{g.heading}</p>
                <ul className="space-y-2 text-white/80 text-sm">
                  {g.links.map((l) => (
                    <li key={l}>
                      <Link to={`/activities/${slugify(l)}`} className="hover:text-white">
                        {l}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* For you and yours */}
          <div>
            <p className="font-semibold text-white/90 mb-2 invisible md:visible">&nbsp;</p>
            <p className="font-semibold text-white/90 mb-2">For you and yours</p>
            <ul className="space-y-2 text-white/80 text-sm">
              {forYouLinks.map((l) => (
                <li key={l.label}><Link to={l.to} className="hover:text-white">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-mint font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-white/80 text-sm">
              {supportLinks.map((l) => (
                <li key={l.label}><Link to={l.to} className="hover:text-white">{l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <h4 className="text-mint font-semibold text-lg">Sign up to our Newsletter</h4>
          <p className="text-white/70 mt-2 max-w-xl">
            For a weekly curated collection of 3 things you can watch, read or listen to
            switch off from the busy everyday.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mt-5 max-w-2xl">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="james@thegaintpeach.com"
              className="flex-1 rounded-md px-4 py-3 text-navy outline-none"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-gold text-navy font-medium px-6 py-3 rounded-md hover:bg-gold/90 transition-colors disabled:opacity-60"
            >
              {status === "loading" ? "Joining…" : "Join the mailing list"}
            </button>
          </form>
          {status && status !== "loading" && (
            <p className="text-mint text-sm mt-3">{status}</p>
          )}
        </div>

        <hr className="border-white/10 mt-12" />

        <div className="flex items-center justify-between flex-wrap gap-4 mt-6">
          <p className="font-display text-xl font-bold">
            <Link to="/">
              <span className="text-white">UNWIND</span>
              <span className="text-mint">CABINS</span>
            </Link>
          </p>
          <p className="text-white/60 text-sm">© 2026 UnwindCabins</p>
          <div className="flex items-center gap-4 text-white/70">
            <Linkedin size={18} />
            <Twitter size={18} />
            <Facebook size={18} />
            <Instagram size={18} />
            <Youtube size={18} />
          </div>
        </div>
      </div>
    </footer>
  );
}
