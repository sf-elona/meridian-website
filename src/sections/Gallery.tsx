import { useRef } from 'react';
import { ASSETS } from '../data/content';
import SplitReveal from '../components/SplitReveal';
import { useInView } from '../lib/useInView';
import { gsap, useIsoLayoutEffect } from '../lib/gsap';

const SHOTS = [
  { src: ASSETS.skyscraper, label: 'The Tower', span: 'row-span-2', speed: -60 },
  { src: ASSETS.livingRoom, label: 'Interior 04', span: '', speed: 40 },
  { src: ASSETS.pool, label: 'Sky Pool', span: '', speed: -30 },
  { src: ASSETS.clubhouse, label: 'The Clubhouse', span: 'row-span-2', speed: 55 },
];

export default function Gallery() {
  const section = useRef<HTMLElement>(null);
  const { ref: gridRef, inView } = useInView<HTMLDivElement>({ threshold: 0.12 });

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-figure]').forEach((fig) => {
        const speed = Number(fig.dataset.speed);
        gsap.fromTo(
          fig.querySelector('img'),
          { yPercent: -speed / 6 },
          {
            yPercent: speed / 6,
            ease: 'none',
            scrollTrigger: {
              trigger: fig,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={section}
      id="gallery"
      className="mx-auto max-w-shell px-6 py-[16vh] md:px-12"
    >
      <div className="mb-16 flex items-end justify-between">
        <SplitReveal as="h2" by="lines" className="display-lg">
          A closer look.
        </SplitReveal>
        <p className="eyebrow hidden md:block">Gallery — 04 frames</p>
      </div>

      <div
        ref={gridRef}
        className={`stagger grid auto-rows-[38vh] grid-cols-2 gap-5 md:auto-rows-[46vh] md:gap-7 ${
          inView ? 'is-in' : ''
        }`}
      >
        {SHOTS.map((s) => (
          <figure
            key={s.label}
            data-figure
            data-speed={s.speed}
            data-cursor="hover"
            className={`group relative overflow-hidden rounded-[12px] hairline luxe-shadow ${s.span}`}
          >
            <img
              src={s.src}
              alt={s.label}
              className="absolute inset-x-0 top-[-10%] h-[120%] w-full object-cover transition-transform duration-[1200ms] ease-luxe group-hover:scale-110"
            />
            <figcaption className="absolute bottom-5 left-5 rounded-full bg-white/80 px-4 py-1.5 text-[0.68rem] uppercase tracking-[0.2em] text-ink backdrop-blur-glass">
              {s.label}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
