import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CabinCard from "../components/CabinCard.jsx";
import { getCabins, getRegions } from "../api.js";

export default function CabinsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cabins, setCabins] = useState([]);
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const search = searchParams.get("search") || "";
  const region = searchParams.get("region") || "";
  const petFriendly = searchParams.get("petFriendly") || "";
  const accessible = searchParams.get("accessible") || "";
  const sleeps = searchParams.get("sleeps") || "";

  useEffect(() => {
    getRegions().then(setRegions).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getCabins({ search, region, petFriendly, accessible, maxSleeps: sleeps })
      .then(setCabins)
      .catch(() => setError("Could not load cabins. Is the backend running on port 5000?"))
      .finally(() => setLoading(false));
  }, [search, region, petFriendly, accessible, sleeps]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  };

  const clearFilters = () => setSearchParams({});

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
      <h1 className="text-4xl font-bold">Our cabins</h1>
      <div className="w-14 h-1 bg-gold mt-2 mb-8" />

      <div className="flex flex-col md:flex-row gap-3 md:items-center bg-sage rounded-xl p-4">
        <input
          type="text"
          placeholder="Search by name or location…"
          value={search}
          onChange={(e) => updateParam("search", e.target.value)}
          className="flex-1 rounded-md px-4 py-2.5 outline-none border border-black/10"
        />

        <select
          value={region}
          onChange={(e) => updateParam("region", e.target.value)}
          className="rounded-md px-4 py-2.5 border border-black/10 bg-white"
        >
          <option value="">All regions</option>
          {regions.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>

        <label className="flex items-center gap-2 text-sm bg-white rounded-md px-4 py-2.5 border border-black/10 cursor-pointer">
          <input
            type="checkbox"
            checked={petFriendly === "true"}
            onChange={(e) => updateParam("petFriendly", e.target.checked ? "true" : "")}
          />
          Pet friendly
        </label>

        <label className="flex items-center gap-2 text-sm bg-white rounded-md px-4 py-2.5 border border-black/10 cursor-pointer">
          <input
            type="checkbox"
            checked={accessible === "true"}
            onChange={(e) => updateParam("accessible", e.target.checked ? "true" : "")}
          />
          Accessible
        </label>

        {(search || region || petFriendly || accessible || sleeps) && (
          <button onClick={clearFilters} className="text-sm underline text-navy whitespace-nowrap">
            Clear filters
          </button>
        )}
      </div>

      <p className="text-slate mt-6">
        {loading ? "Searching…" : `${cabins.length} cabin${cabins.length === 1 ? "" : "s"} found`}
      </p>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {cabins.length === 0 && (
            <p className="text-slate col-span-full">No cabins match those filters.</p>
          )}
          {cabins.map((cabin) => (
            <CabinCard key={cabin._id} cabin={cabin} />
          ))}
        </div>
      )}
    </section>
  );
}
