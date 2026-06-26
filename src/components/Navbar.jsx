import { User } from "lucide-react";
import { Link } from "react-router-dom";

const links = [
  { label: "Our cabins", to: "/cabins" },
  { label: "Get inspired", to: "/experiences" },
  { label: "Gift a stay", to: "/gift-a-stay" },
  { label: "About us", to: "/about" },
  { label: "Admin", to: "/admin/login" },
];

export default function Navbar() {
  return (
    <header className="w-full bg-white border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl font-bold tracking-tight">
          <span className="text-forest">UNWIND</span>
          <span className="text-navy">CABINS</span>
        </Link>

        <nav className="hidden md:flex items-center gap-9 text-[15px] text-navy/90">
          {links.map((l) => (
            <Link key={l.label} to={l.to} className="hover:text-forest transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/admin/login"
          aria-label="Admin login"
          className="w-10 h-10 rounded-full border border-navy/20 flex items-center justify-center text-navy/80 hover:bg-sage transition-colors"
        >
          <User size={18} />
        </Link>
      </div>
    </header>
  );
}
