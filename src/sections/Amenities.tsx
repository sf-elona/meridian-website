import { useRef, useState } from 'react';
import { ASSETS, AMENITIES } from '../data/content';
import LazyVideo from '../components/LazyVideo';
import SplitReveal from '../components/SplitReveal';
import { gsap, useIsoLayoutEffect } from '../lib/gsap';

const SPOTS = [
  { x: '26%', y: '30%' },
  { x: '72%', y: '32%' },
  { x: '34%', y: '68%' },
  { x: '76%', y: '64%' },
];

/**
 * Pinned. The lifestyle footage runs full-bleed; as the visitor scrolls, glass
 * panels advance one at a time and a soft highlight travels to the matching
 * quadrant of the video. Panel state is React-driven so the content is always
 * visible; GSAP only handles the pin + scrub timing.
 */
export default function Amenities() {
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: section.current,
            start: 'top top',
            end: () => `+=${AMENITIES.length * 80}%`,
            pin: pin.current,
            scrub: true,
            onUpdate: (self) => {
              const idx = Math.min(
                AMENITIES.length - 1,
                Math.floor(self.progress * AMENITIES.length * 0.999),
              );
              setActive(idx);
            },
          },
        },
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} id="amenities" className="relative">
      <div ref={pin} className="relative h-screen w-full overflow-hidden bg-ink">
        <LazyVideo
          src={ASSETS.amenityVideo}
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-ink/45" />

        {/* travelling brightener */}
        <div
          className="pointer-events-none absolute h-[46vh] w-[46vh] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-[900ms] ease-luxe"
          style={{
            left: SPOTS[active].x,
            top: SPOTS[active].y,
            background:
              'radial-gradient(circle, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0) 70%)',
            mixBlendMode: 'screen',
          }}
        />

        <div className="relative z-10 mx-auto flex h-full max-w-shell flex-col justify-between px-6 py-[12vh] md:px-12">
          <div className="max-w-3xl text-white">
            <p className="eyebrow !text-white/60">Lifestyle Amenities</p>
            <SplitReveal
              as="h2"
              by="lines"
              className="display-lg mt-6 max-w-[20ch] text-white [text-wrap:balance]"
              stagger={0.08}
            >
              Eighty ways to spend an afternoon.
            </SplitReveal>
          </div>

          {/* stacked glass panels — the active one lifts forward */}
          <div className="relative h-[260px] max-w-md">
            {AMENITIES.map((a, i) => {
              const offset = i - active;
              return (
                <div
                  key={a.label}
                  className="glass absolute inset-x-0 bottom-0 rounded-[14px] p-7 transition-all duration-[800ms] ease-luxe"
                  style={{
                    zIndex: 10 - Math.abs(offset),
                    opacity: offset < 0 ? 0 : offset === 0 ? 1 : 0.28,
                    transform: `translateY(${offset <= 0 ? 0 : offset * 14}px) scale(${
                      offset === 0 ? 1 : 0.96
                    })`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <a.icon className="h-6 w-6 text-ink" strokeWidth={1.3} />
                    <span className="num text-[0.7rem] tracking-[0.2em] text-muted">
                      0{i + 1} / 0{AMENITIES.length}
                    </span>
                  </div>
                  <h3 className="font-display mt-6 text-2xl tracking-tightish">{a.label}</h3>
                  <p className="mt-2 text-[0.85rem] leading-relaxed text-muted">{a.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="flex gap-2">
            {AMENITIES.map((_, i) => (
              <span
                key={i}
                className={`h-px flex-1 transition-colors duration-500 ${
                  i <= active ? 'bg-accent' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
