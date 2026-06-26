import { useParams, Link } from "react-router-dom";
import infoPages from "../data/infoContent.js";

export default function InfoPage() {
  const { slug } = useParams();
  const page = infoPages[slug];

  if (!page) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-20">
        <p className="text-slate">We couldn't find that page.</p>
        <Link to="/" className="text-navy underline mt-4 inline-block">Back to home</Link>
      </section>
    );
  }

  return (
    <section className="max-w-3xl mx-auto px-6 lg:px-10 py-16">
      <h1 className="text-4xl font-bold">{page.title}</h1>
      <div className="w-14 h-1 bg-gold mt-2 mb-8" />

      <div className="space-y-8">
        {page.sections.map((s) => (
          <div key={s.heading}>
            <h2 className="font-semibold text-lg">{s.heading}</h2>
            <p className="text-slate leading-relaxed mt-2">{s.body}</p>
          </div>
        ))}
      </div>

      <p className="text-slate mt-10">
        Still need help?{" "}
        <Link to="/contact" className="underline text-navy font-medium">
          Contact us
        </Link>{" "}
        and we'll get back to you.
      </p>
    </section>
  );
}
