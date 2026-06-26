import { useParams, Link } from "react-router-dom";
import activities from "../data/activities.js";

export default function ActivityPage() {
  const { slug } = useParams();
  const activity = activities[slug];

  if (!activity) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-20">
        <p className="text-slate">We couldn't find that experience.</p>
        <Link to="/cabins" className="text-navy underline mt-4 inline-block">Browse all cabins</Link>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-6 lg:px-10 py-12">
      <div className="rounded-xl overflow-hidden h-[340px]">
        <img src={activity.image} alt={activity.title} className="w-full h-full object-cover" />
      </div>

      <h1 className="text-4xl font-bold mt-8">{activity.title}</h1>
      <p className="text-slate leading-relaxed mt-4 text-lg">{activity.description}</p>

      <Link
        to="/cabins"
        className="inline-block bg-gold text-navy font-medium px-6 py-3 rounded-md mt-8 hover:bg-gold/90 transition-colors"
      >
        Find a cabin near this
      </Link>
    </section>
  );
}
