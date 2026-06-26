import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { getFaqs } from "../api.js";

const FALLBACK_FAQS = [
  {
    question: "What time is check-in and check-out?",
    answer: "Check-in is from 3pm and check-out is by 11am. Early or late arrangements can sometimes be made — just contact us.",
  },
  {
    question: "Are pets allowed?",
    answer: "Some cabins are dog-friendly, shown on each listing. We ask that pets stay off furniture and are never left alone in the cabin.",
  },
  {
    question: "Is there WiFi in the cabins?",
    answer: "Most cabins have WiFi, though speeds vary in remote locations. Check the amenities list on each cabin's page.",
  },
  {
    question: "What is your cancellation policy?",
    answer: "Free cancellation up to 7 days before check-in. After that, a 50% fee applies. Full charge for no-shows.",
  },
  {
    question: "Do I need to bring bedding and towels?",
    answer: "All cabins come fully equipped with fresh linen and towels. Just bring yourself!",
  },
  {
    question: "Is there parking at the cabins?",
    answer: "Most cabins have on-site parking. Details are listed in each cabin's amenities. Some remote locations are walk-in only.",
  },
];

export default function Faq() {
  const [faqs, setFaqs] = useState(FALLBACK_FAQS);
  const [active, setActive] = useState(null);

  useEffect(() => {
    getFaqs()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0 && data[0].question) {
          setFaqs(data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="faq" className="max-w-7xl mx-auto px-6 lg:px-10 py-20">
      <h2 className="text-4xl font-bold">Frequently asked questions</h2>
      <div className="w-14 h-1 bg-gold mt-2 mb-10" />

      <div className="space-y-3 max-w-3xl">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-black/10 rounded-xl overflow-hidden">
            <button
              onClick={() => setActive(active === i ? null : i)}
              className="w-full flex items-center justify-between px-6 py-4 text-left font-medium text-navy hover:bg-sage/40 transition-colors"
            >
              <span>{faq.question}</span>
              {active === i ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
            {active === i && (
              <div className="px-6 py-4 text-slate bg-sage/30 border-t border-black/5 leading-relaxed">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h4 className="font-semibold">Still have a question?</h4>
        <p className="text-slate mt-1">
          If you still have questions, contact a member of the team on{" "}
          <a href="/contact" className="underline font-medium text-navy">
            live chat
          </a>{" "}
          and we'd be more than happy to help.
        </p>
      </div>
    </section>
  );
}