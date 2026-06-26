import { useEffect, useState } from "react";
import { getBookings } from "../api.js";
import AdminNav from "../components/AdminNav.jsx";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getBookings()
      .then(setBookings)
      .catch(() => setError("Could not load bookings. Is the backend running?"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 lg:px-10 py-16">
      <AdminNav />
      <h1 className="text-3xl font-bold">Bookings & gift stays</h1>
      <div className="w-14 h-1 bg-gold mt-2 mb-6" />

      {loading && <p className="text-slate">Loading…</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto border border-black/10 rounded-xl">
          <table className="w-full text-sm">
            <thead className="bg-sage text-left">
              <tr>
                <th className="px-4 py-3">Cabin</th>
                <th className="px-4 py-3">Dates</th>
                <th className="px-4 py-3">Travellers</th>
                <th className="px-4 py-3">Booked by</th>
                <th className="px-4 py-3">Gift?</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Booked on</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/10">
              {bookings.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-slate" colSpan={7}>No bookings yet.</td>
                </tr>
              )}
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td className="px-4 py-3 font-medium">{b.cabinName}</td>
                  <td className="px-4 py-3 text-slate">
                    {new Date(b.checkIn).toLocaleDateString()} → {new Date(b.checkOut).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-slate">{b.travellers}</td>
                  <td className="px-4 py-3 text-slate">
                    {b.name}
                    <div className="text-xs text-slate/70">{b.email}</div>
                  </td>
                  <td className="px-4 py-3 text-slate">
                    {b.isGift ? (
                      <span>
                        Yes → {b.recipientName}
                        <div className="text-xs text-slate/70">{b.recipientEmail}</div>
                      </span>
                    ) : (
                      "No"
                    )}
                  </td>
                  <td className="px-4 py-3 capitalize text-slate">{b.status}</td>
                  <td className="px-4 py-3 text-slate">{new Date(b.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
