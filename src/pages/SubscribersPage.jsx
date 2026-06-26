import { useEffect, useState } from "react";
import { getSubscribers } from "../api.js";
import AdminNav from "../components/AdminNav.jsx";

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getSubscribers()
      .then(setSubscribers)
      .catch(() => setError("Could not load subscribers. Is the backend running?"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-3xl mx-auto px-6 lg:px-10 py-16">
      <AdminNav />
      <h1 className="text-3xl font-bold">Newsletter subscribers</h1>
      <div className="w-14 h-1 bg-gold mt-2 mb-6" />
      <p className="text-slate">
        Everyone who has joined the mailing list from the footer signup form, newest first.
      </p>

      {loading && <p className="text-slate mt-8">Loading…</p>}
      {error && <p className="text-red-600 mt-8">{error}</p>}

      {!loading && !error && (
        <div className="mt-8 border border-black/10 rounded-xl divide-y divide-black/10">
          {subscribers.length === 0 && (
            <p className="text-slate p-6">No one has signed up yet.</p>
          )}
          {subscribers.map((s) => (
            <div key={s._id} className="flex items-center justify-between px-6 py-4">
              <span className="text-navy">{s.email}</span>
              <span className="text-slate text-sm">
                {new Date(s.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
