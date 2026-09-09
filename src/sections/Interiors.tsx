import { useRef } from 'react';
import { ASSETS, SMART_HOME } from '../data/content';
import SplitReveal from '../components/SplitReveal';
import Reveal from '../components/Reveal';
import LazyVideo from '../components/LazyVideo';
import { useParallax } from '../lib/useParallax';
import { useInView } from '../lib/useInView';

export default function Interiors() {
  const living = useRef<HTMLDivElement>(null);
  const bedroom = useRef<HTMLDivElement>(null);
  const { ref: cards, inView: cardsIn } = useInView<HTMLDivElement>();

  useParallax(living, 90);
  useParallax(bedroom, 140);

  return (
    <section
      id="interiors"
      className="relative mx-auto max-w-shell px-6 py-[16vh] md:px-12"
    >
      <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-24">
        {/* LEFT — sticky walkthrough */}
        <div className="lg:sticky lg:top-[12vh] lg:h-fit">
          <div className="relative overflow-hidden rounded-[8px] hairline luxe-shadow">
            <LazyVideo
              src={ASSETS.apartmentVideo}
              className="aspect-[4/5] w-full object-cover md:aspect-[3/4]"
            />
            <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/40" />
          </div>
          <p className="eyebrow mt-6">01 — Interiors / Walkthrough</p>
        </div>

        {/* RIGHT — content */}
        <div className="flex flex-col justify-center">
          <p className="eyebrow mb-8">Luxury Interiors</p>
          <SplitReveal as="h2" by="lines" className="display-xl" stagger={0.09}>
            Crafted Around Modern Living.
          </SplitReveal>
          <Reveal as="p" className="lead mt-8 max-w-lg" y={30}>
            Rooms are drawn around the way a day actually moves — morning light in
            the kitchen, a quiet western wall for evening. Materials are few and
            honest: stone, oak, brushed bronze, linen.
          </Reveal>

          {/* floating images */}
          <div className="mt-14 grid grid-cols-2 gap-5">
            <div ref={living} className="col-span-2">
              <img
                src={ASSETS.livingRoom}
                alt="Luxury living room with floor-to-ceiling glass"
                className="aspect-[16/10] w-full rounded-[8px] hairline object-cover luxe-shadow"
              />
              <p className="mt-3 text-[0.72rem] uppercase tracking-[0.2em] text-muted">
                The living room
              </p>
            </div>
            <div ref={bedroom} className="col-span-2 mt-2 grid grid-cols-2 gap-5">
              <img
                src={ASSETS.livingRoom}
                alt="Bedroom detail — textured plaster and warm light"
                className="aspect-square w-full rounded-[8px] hairline object-cover luxe-shadow"
                style={{ objectPosition: '20% 60%' }}
              />
              <img
                src={ASSETS.pool}
                alt="Bedroom detail — view toward the terrace"
                className="aspect-square w-full rounded-[8px] hairline object-cover luxe-shadow"
                style={{ objectPosition: '70% 40%' }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* smart-home cards — full-width band so the type has room to breathe */}
      <div className="mt-24 md:mt-32">
        <p className="eyebrow mb-8">Intelligence, quietly integrated</p>
        <div
          ref={cards}
          className={`stagger grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6 ${
            cardsIn ? 'is-in' : ''
          }`}
        >
          {SMART_HOME.map(({ icon: Icon, label, note }) => (
            <article
              key={label}
              data-cursor="hover"
              className="group flex min-h-[190px] flex-col justify-between rounded-[14px] border border-line bg-white/70 p-7 shadow-[0_10px_30px_-20px_rgba(17,17,17,0.12)] backdrop-blur-glass transition-transform duration-500 ease-luxe hover:-translate-y-1"
            >
              <Icon
                className="h-6 w-6 text-ink/75 transition-colors duration-500 group-hover:text-accent"
                strokeWidth={1.3}
              />
              <div>
                <p className="text-[0.95rem] font-medium leading-tight tracking-tightish text-ink">
                  {label}
                </p>
                <p className="mt-1.5 text-[0.78rem] leading-snug text-muted">{note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
