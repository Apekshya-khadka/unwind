import { Link, useNavigate, useLocation } from "react-router-dom";
import { clearToken } from "../auth.js";

const tabs = [
  { label: "Subscribers", to: "/admin/subscribers" },
  { label: "Bookings", to: "/admin/bookings" },
  { label: "Messages", to: "/admin/messages" },
];

export default function AdminNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    clearToken();
    navigate("/admin/login");
  };

  return (
    <div className="flex items-center gap-6 text-sm border-b border-black/10 pb-4 mb-8">
      {tabs.map((t) => (
        <Link
          key={t.to}
          to={t.to}
          className={`font-medium ${
            location.pathname === t.to ? "text-forest" : "text-slate hover:text-navy"
          }`}
        >
          {t.label}
        </Link>
      ))}
      <button onClick={logout} className="ml-auto text-red-600 hover:underline">
        Log out
      </button>
    </div>
  );
}
