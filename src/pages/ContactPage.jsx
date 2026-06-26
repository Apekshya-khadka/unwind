import { useState } from "react";
import { sendContactMessage } from "../api.js";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);
  const [confirmation, setConfirmation] = useState(null);

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await sendContactMessage(form);
      setConfirmation(res.message);
      setStatus("success");
    } catch (err) {
      setStatus(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <section className="max-w-xl mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-forest">Message sent!</h1>
        <p className="text-slate mt-4">{confirmation}</p>
      </section>
    );
  }

  return (
    <section className="max-w-xl mx-auto px-6 lg:px-10 py-16">
      <h1 className="text-4xl font-bold">Contact us</h1>
      <div className="w-14 h-1 bg-gold mt-2 mb-6" />
      <p className="text-slate">
        Got a question about a booking, a cabin, or just want to say hello? Drop us a
        message and a real person on our team will get back to you.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 mt-8">
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

        <label className="text-sm block">
          Subject
          <input
            type="text"
            placeholder="e.g. Question about Golden Hideaway"
            value={form.subject}
            onChange={update("subject")}
            className="w-full mt-1 border border-black/15 rounded-md px-3 py-2"
          />
        </label>

        <label className="text-sm block">
          Message
          <textarea
            rows={5}
            required
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
          {status === "loading" ? "Sending…" : "Send message"}
        </button>
      </form>
    </section>
  );
}
