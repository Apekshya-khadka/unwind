import { MapPin, Calendar, Users } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ onSearch }) {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [travellers, setTravellers] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(destination);
    } else {
      const params = new URLSearchParams();
      if (destination) params.set("search", destination);
      if (checkIn) params.set("checkIn", checkIn);
      if (checkOut) params.set("checkOut", checkOut);
      if (travellers) params.set("travellers", travellers);
      navigate(`/cabins?${params.toString()}`);
    }
  };

  // Today's date in YYYY-MM-DD for min attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-black/10 overflow-hidden"
    >
      {/* I want to go */}
      <label className="flex items-center gap-3 px-5 py-5 flex-1 bg-[#f4f4f4] md:bg-transparent cursor-pointer">
        <span className="text-navy/60"><MapPin size={18} /></span>
        <input
          type="text"
          placeholder="I want to go"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="bg-transparent outline-none text-sm text-navy placeholder:text-navy/60 w-full"
        />
      </label>

      {/* Check in */}
      <label className="flex items-center gap-3 px-5 py-5 flex-1 bg-[#f4f4f4] md:bg-transparent cursor-pointer">
        <span className="text-navy/60"><Calendar size={18} /></span>
        <input
          type="date"
          placeholder="Check in"
          value={checkIn}
          min={today}
          onChange={(e) => {
            setCheckIn(e.target.value);
            // Reset checkout if it's before new checkin
            if (checkOut && e.target.value > checkOut) setCheckOut("");
          }}
          className="bg-transparent outline-none text-sm text-navy placeholder:text-navy/60 w-full cursor-pointer"
        />
      </label>

      {/* Check out */}
      <label className="flex items-center gap-3 px-5 py-5 flex-1 bg-[#f4f4f4] md:bg-transparent cursor-pointer">
        <span className="text-navy/60"><Calendar size={18} /></span>
        <input
          type="date"
          placeholder="Check out"
          value={checkOut}
          min={checkIn || today}
          onChange={(e) => setCheckOut(e.target.value)}
          className="bg-transparent outline-none text-sm text-navy placeholder:text-navy/60 w-full cursor-pointer"
        />
      </label>

      {/* Travellers */}
      <label className="flex items-center gap-3 px-5 py-5 flex-1 bg-[#f4f4f4] md:bg-transparent cursor-pointer">
        <span className="text-navy/60"><Users size={18} /></span>
        <input
          type="number"
          placeholder="Travellers"
          value={travellers}
          min="1"
          max="20"
          onChange={(e) => setTravellers(e.target.value)}
          className="bg-transparent outline-none text-sm text-navy placeholder:text-navy/60 w-full"
        />
      </label>

      <button
        type="submit"
        className="bg-forest hover:bg-forest/90 transition-colors text-white font-medium px-8 py-5 whitespace-nowrap"
      >
        Find available cabins
      </button>
    </form>
  );
}
