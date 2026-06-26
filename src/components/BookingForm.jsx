import { useState } from "react";
import { createBooking } from "../api.js";

export default function BookingForm({ cabin, onClose }) {
  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    travellers: 2,
    name: "",
    email: "",
  });
  const [status, setStatus] = useState(null);
  const [confirmation, setConfirmation] = useState(null);

  const nights =
    form.checkIn && form.checkOut
      ? Math.max(0, Math.round((new Date(form.checkOut) - new Date(form.checkIn)) / 86400000))
      : 0;
  const total = nights * cabin.pricePerPerson * Number(form.travellers || 1);

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await createBooking({
        cabin: cabin._id,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        travellers: Number(form.travellers),
        name: form.name,
        email: form.email,
      });
      setConfirmation(res.message);
      setStatus("success");
    } catch (err) {
      setStatus(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="border border-black/10 rounded-xl p-6 bg-sage">
        <h3 className="font-semibold text-lg text-forest">Booking confirmed!</h3>
        <p className="text-slate mt-2">{confirmation}</p>
        <p className="text-slate text-sm mt-2">
          {nights} night{nights === 1 ? "" : "s"} · {form.travellers} traveller
          {form.travellers === "1" ? "" : "s"} · £{total} total
        </p>
        <button onClick={onClose} className="mt-4 text-navy underline text-sm">
          Close
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-black/10 rounded-xl p-6 space-y-4">
      <h3 className="font-semibold text-lg">Book your stay</h3>

      <div className="grid grid-cols-2 gap-3">
        <label className="text-sm">
          Check in
          <input
            type="date"
            required
            value={form.checkIn}
            onChange={update("checkIn")}
            className="w-full mt-1 border border-black/15 rounded-md px-3 py-2"
          />
        </label>
        <label className="text-sm">
          Check out
          <input
            type="date"
            required
            value={form.checkOut}
            min={form.checkIn || undefined}
            onChange={update("checkOut")}
            className="w-full mt-1 border border-black/15 rounded-md px-3 py-2"
          />
        </label>
      </div>

      <label className="text-sm block">
        Travellers
        <input
          type="number"
          min="1"
          max={cabin.sleeps || 10}
          required
          value={form.travellers}
          onChange={update("travellers")}
          className="w-full mt-1 border border-black/15 rounded-md px-3 py-2"
        />
      </label>

      <label className="text-sm block">
        Your name
        <input
          type="text"
          required
          value={form.name}
          onChange={update("name")}
          className="w-full mt-1 border border-black/15 rounded-md px-3 py-2"
        />
      </label>

      <label className="text-sm block">
        Email
        <input
          type="email"
          required
          value={form.email}
          onChange={update("email")}
          className="w-full mt-1 border border-black/15 rounded-md px-3 py-2"
        />
      </label>

      {nights > 0 && (
        <p className="text-sm text-slate">
          {nights} night{nights === 1 ? "" : "s"} × £{cabin.pricePerPerson} ×{" "}
          {form.travellers || 1} traveller{form.travellers === "1" ? "" : "s"} ={" "}
          <span className="font-semibold text-navy">£{total}</span>
        </p>
      )}

      {typeof status === "string" && status !== "loading" && (
        <p className="text-red-600 text-sm">{status}</p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={status === "loading"}
          className="flex-1 bg-gold text-navy font-medium px-6 py-3 rounded-md hover:bg-gold/90 transition-colors disabled:opacity-60"
        >
          {status === "loading" ? "Booking…" : "Confirm booking"}
        </button>
        <button type="button" onClick={onClose} className="px-6 py-3 rounded-md border border-black/10">
          Cancel
        </button>
      </div>
    </form>
  );
}