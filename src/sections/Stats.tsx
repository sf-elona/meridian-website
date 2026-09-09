import { useEffect, useRef } from 'react';
import { STATS } from '../data/content';
import SplitReveal from '../components/SplitReveal';
import { useInView } from '../lib/useInView';
import { gsap } from '../lib/gsap';

export default function Stats() {
  const { ref: grid, inView } = useInView<HTMLDivElement>({ threshold: 0.3 });
  const done = useRef(false);

  useEffect(() => {
    if (!inView || done.current) return;
    done.current = true;
    grid.current?.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
      const end = Number(el.dataset.count);
      const obj = { v: 0 };
      const tween = gsap.to(obj, {
        v: end,
        duration: 2.4,
        ease: 'power2.out',
        onUpdate: () => {
          el.firstChild!.textContent = String(Math.round(obj.v));
        },
      });
      // guarantee the final value even if the ticker was starved
      window.setTimeout(() => {
        if (!tween.progress || tween.progress() < 1) {
          el.firstChild!.textContent = String(end);
        }
      }, 3200);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <section className="mx-auto max-w-shell px-6 py-[18vh] md:px-12">
      <SplitReveal as="p" by="words" className="eyebrow mb-14">
        The project in numbers
      </SplitReveal>
      <div
        ref={grid}
        className={`stagger grid grid-cols-2 gap-x-10 gap-y-14 md:grid-cols-4 md:gap-x-8 ${
          inView ? 'is-in' : ''
        }`}
      >
        {STATS.map((s) => (
          <div key={s.label} className="border-t border-line pt-7">
            <p className="num flex items-baseline leading-none tracking-tightish text-[clamp(2.5rem,5.4vw,4.75rem)] text-ink">
              <span data-count={s.value}>{inView ? s.value : 0}</span>
              <span
                className={
                  s.unitKind === 'word'
                    ? 'ml-2.5 text-[0.26em] font-medium uppercase tracking-[0.18em] text-accent'
                    : 'text-[0.5em] text-accent'
                }
              >
                {s.unit}
              </span>
            </p>
            <p className="mt-4 text-[0.72rem] uppercase tracking-[0.22em] text-muted">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
