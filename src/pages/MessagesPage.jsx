import { useEffect, useState } from "react";
import { getContactMessages } from "../api.js";
import AdminNav from "../components/AdminNav.jsx";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getContactMessages()
      .then(setMessages)
      .catch(() => setError("Could not load messages. Is the backend running?"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-4xl mx-auto px-6 lg:px-10 py-16">
      <AdminNav />
      <h1 className="text-3xl font-bold">Contact messages</h1>
      <div className="w-14 h-1 bg-gold mt-2 mb-6" />

      {loading && <p className="text-slate">Loading…</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="space-y-4">
          {messages.length === 0 && <p className="text-slate">No messages yet.</p>}
          {messages.map((m) => (
            <div key={m._id} className="border border-black/10 rounded-xl p-5">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <p className="font-semibold">{m.subject}</p>
                <span className="text-xs text-slate">{new Date(m.createdAt).toLocaleString()}</span>
              </div>
              <p className="text-sm text-slate mt-1">
                {m.name} · <a href={`mailto:${m.email}`} className="underline">{m.email}</a>
              </p>
              <p className="text-navy mt-3 leading-relaxed">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
