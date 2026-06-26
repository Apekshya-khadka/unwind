import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { adminLogin } from "../api.js";
import { setToken } from "../auth.js";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState(null);

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await adminLogin(form.email, form.password);
      setToken(res.token);
      const redirectTo = location.state?.from || "/admin/subscribers";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setStatus(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <section className="max-w-md mx-auto px-6 py-24">
      <h1 className="text-3xl font-bold">Admin login</h1>
      <p className="text-slate mt-2">
        This area is only for the UnwindCabins team — booking and subscriber details aren't
        visible to regular visitors.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 mt-8">
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
        <label className="text-sm block">
          Password
          <input
            type="password"
            required
            value={form.password}
            onChange={update("password")}
            className="w-full mt-1 border border-black/15 rounded-md px-3 py-2"
          />
        </label>

        {typeof status === "string" && status !== "loading" && (
          <p className="text-red-600 text-sm">{status}</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-forest text-white font-medium px-6 py-3 rounded-md hover:bg-forest/90 transition-colors disabled:opacity-60"
        >
          {status === "loading" ? "Signing in…" : "Log in"}
        </button>
      </form>
    </section>
  );
}
