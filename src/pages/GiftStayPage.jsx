import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCabins, createBooking } from "../api.js";

export default function GiftStayPage() {
  const location = useLocation();
  const preselectedId = location.state?.cabinId || "";

  const [cabins, setCabins] = useState([]);
  const [form, setForm] = useState({
    cabin: preselectedId,
    checkIn: "",
    checkOut: "",
    travellers: 2,
    name: "",
    email: "",
    recipientName: "",
    recipientEmail: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [confirmation, setConfirmation] = useState(null);

  useEffect(() => {
    getCabins().then(setCabins).catch(() => {});
  }, []);

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await createBooking({ ...form, travellers: Number(form.travellers), isGift: true });
      setConfirmation(res.message);
      setStatus("success");
    } catch (err) {
      setStatus(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <section className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-forest">Gift sent! 🎁</h1>
        <p className="text-slate mt-4">{confirmation}</p>
      </section>
    );
  }

  return (
    <section className="max-w-2xl mx-auto px-6 lg:px-10 py-16">
      <h1 className="text-4xl font-bold">Gift a stay</h1>
      <div className="w-14 h-1 bg-gold mt-2 mb-6" />
      <p className="text-slate">
        Surprise someone with a getaway. Pick a cabin, choose the dates, and we'll send a
        confirmation to your recipient.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 mt-8">
        <label className="text-sm block">
          Choose a cabin
          <select
            required
            value={form.cabin}
            onChange={update("cabin")}
            className="w-full mt-1 border border-black/15 rounded-md px-3 py-2 bg-white"
          >
            <option value="">Select a cabin…</option>
            {cabins.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name} — {c.location} (£{c.pricePerPerson}pp)
              </option>
            ))}
          </select>
        </label>

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
              min={form.checkIn || undefined}
              value={form.checkOut}
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
            required
            value={form.travellers}
            onChange={update("travellers")}
            className="w-full mt-1 border border-black/15 rounded-md px-3 py-2"
          />
        </label>

        <hr className="border-black/10" />
        <p className="font-semibold text-sm text-navy">Your details</p>

        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm">
            Your name
            <input
              type="text"
              required
              value={form.name}
              onChange={update("name")}
              className="w-full mt-1 border border-black/15 rounded-md px-3 py-2"
            />
          </label>
          <label className="text-sm">
            Your email
            <input
              type="email"
              required
              value={form.email}
              onChange={update("email")}
              className="w-full mt-1 border border-black/15 rounded-md px-3 py-2"
            />
          </label>
        </div>

        <hr className="border-black/10" />
        <p className="font-semibold text-sm text-navy">Recipient details</p>

        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm">
            Recipient name
            <input
              type="text"
              required
              value={form.recipientName}
              onChange={update("recipientName")}
              className="w-full mt-1 border border-black/15 rounded-md px-3 py-2"
            />
          </label>
          <label className="text-sm">
            Recipient email
            <input
              type="email"
              required
              value={form.recipientEmail}
              onChange={update("recipientEmail")}
              className="w-full mt-1 border border-black/15 rounded-md px-3 py-2"
            />
          </label>
        </div>

        <label className="text-sm block">
          Gift message (optional)
          <textarea
            rows={3}
            value={form.message}
            onChange={update("message")}
            className="w-full mt-1 border border-black/15 rounded-md px-3 py-2"
          />
        </label>

        {typeof status === "string" && status !== "loading" && (
          <p className="text-red-600 text-sm">{status}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-gold text-navy font-medium px-6 py-3 rounded-md hover:bg-gold/90 transition-colors disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : "Send this gift"}
        </button>
      </form>
    </section>
  );
}
