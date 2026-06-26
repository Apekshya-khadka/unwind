import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CabinCard from "./CabinCard.jsx";
import { getCabins } from "../api.js";

export default function CabinsSection({ search }) {
  const [cabins, setCabins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getCabins(search ? { search } : {})
      .then((data) => setCabins(data))
      .catch(() => setError("Could not load cabins. Is the backend running?"))
      .finally(() => setLoading(false));
  }, [search]);

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold">Discover our idyllic countryside cabins</h2>
          <div className="w-14 h-1 bg-gold mt-2 mb-4" />
          <p className="text-slate">
            Fully equipped kitchen and bathroom with plenty of walking and cycling routes to explore.
          </p>
        </div>
        <Link to="/cabins" className="text-navy underline font-medium whitespace-nowrap">
          View all cabins
        </Link>
      </div>

      {loading && <p className="text-slate mt-10">Loading cabins…</p>}
      {error && <p className="text-red-600 mt-10">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
          {cabins.length === 0 && (
            <p className="text-slate col-span-full">No cabins found. Try running the seed script.</p>
          )}
          {cabins.slice(0, 6).map((cabin) => (
            <CabinCard key={cabin._id} cabin={cabin} />
          ))}
        </div>
      )}
    </section>
  );
}
