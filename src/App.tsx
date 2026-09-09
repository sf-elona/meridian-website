import { useEffect, useState } from 'react';
import { ScrollTrigger } from './lib/gsap';
import { useSmoothScroll } from './lib/useSmoothScroll';
import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Interiors from './sections/Interiors';
import Amenities from './sections/Amenities';
import Community from './sections/Community';
import Stats from './sections/Stats';
import Gallery from './sections/Gallery';
import FloorPlan from './sections/FloorPlan';
import Location from './sections/Location';
import Testimonials from './sections/Testimonials';
import FinalCTA from './sections/FinalCTA';

export default function App() {
  const [ready, setReady] = useState(false);

  useSmoothScroll(ready);

  useEffect(() => {
    if (!ready) {
      document.body.style.overflow = 'hidden';
      return;
    }
    document.body.style.overflow = '';
    // let layout settle, then recalculate every pinned trigger
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener('load', onLoad);
    };
  }, [ready]);

  return (
    <>
      {!ready && <Preloader onDone={() => setReady(true)} />}
      <Cursor />
      <Navbar />

      <main className="relative">
        {/* section-to-section background morph */}
        <div className="pointer-events-none fixed inset-0 -z-10 bg-base" />

        <Hero />

        <div className="relative bg-base">
          <Interiors />
        </div>

        <Amenities />

        <Community />

        <div className="relative bg-base">
          <Stats />
          <Gallery />
          <FloorPlan />
          <Location />
          <Testimonials />
          <FinalCTA />
          <Footer />
        </div>
      </main>
    </>
  );
}
