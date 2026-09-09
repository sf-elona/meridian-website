import { useEffect, useRef, useState } from 'react';
import { TESTIMONIALS } from '../data/content';
import { gsap } from '../lib/gsap';

export default function Testimonials() {
  const [i, setI] = useState(0);
  const quote = useRef<HTMLQuoteElement>(null);
  const timer = useRef<number>();

  const move = (dir: number) => {
    setI((p) => (p + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    gsap.fromTo(
      quote.current,
      { autoAlpha: 0, y: 30, filter: 'blur(8px)' },
      { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
    );
  }, [i]);

  useEffect(() => {
    timer.current = window.setInterval(() => move(1), 7000);
    return () => window.clearInterval(timer.current);
  }, []);

  const t = TESTIMONIALS[i];

  return (
    <section className="mx-auto max-w-shell px-6 py-[18vh] md:px-12">
      <p className="eyebrow mb-14">In residents' words</p>

      <div className="glass rounded-[20px] p-10 md:p-16">
        <span className="font-display block text-[6rem] leading-[0.5] text-accent md:text-[9rem]">
          &ldquo;
        </span>
        <blockquote ref={quote} className="mt-6">
          <p className="font-display text-[clamp(1.6rem,3.4vw,3rem)] leading-[1.18] tracking-tightish">
            {t.quote}
          </p>
          <footer className="mt-10 flex items-center gap-4">
            <span className="h-px w-12 bg-accent" />
            <span className="text-[0.82rem] uppercase tracking-[0.2em]">{t.name}</span>
            <span className="text-[0.82rem] text-muted">— {t.role}</span>
          </footer>
        </blockquote>

        <div className="mt-12 flex items-center gap-3">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Testimonial ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                idx === i ? 'w-10 bg-accent' : 'w-1.5 bg-ink/20 hover:bg-ink/40'
              }`}
            />
          ))}
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => move(-1)}
              data-cursor="hover"
              className="grid h-11 w-11 place-items-center rounded-full hairline transition-colors hover:border-accent hover:text-accent"
            >
              ←
            </button>
            <button
              onClick={() => move(1)}
              data-cursor="hover"
              className="grid h-11 w-11 place-items-center rounded-full hairline transition-colors hover:border-accent hover:text-accent"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
