import Hero from "../components/Hero.jsx";
import CabinsSection from "../components/CabinsSection.jsx";
import Inspiration from "../components/Inspiration.jsx";
import VideoSection from "../components/VideoSection.jsx";
import Testimonial from "../components/Testimonial.jsx";
import NourishCta from "../components/NourishCta.jsx";
import ZoomCta from "../components/ZoomCta.jsx";
import Faq from "../components/Faq.jsx";

export default function Home() {
  return (
    <>
      <Hero />
      <CabinsSection />
      <Inspiration />
      <VideoSection />
      <Testimonial />
      <NourishCta />
      <ZoomCta />
      <Faq />
    </>
  );
}
