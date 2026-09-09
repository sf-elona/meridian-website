import { useRef, MouseEvent } from 'react';
import SplitReveal from '../components/SplitReveal';
import Reveal from '../components/Reveal';

/**
 * Premium placeholder for the future interactive floor plan. Blueprint
 * aesthetic; a soft golden glow tracks the cursor across the drawing.
 */
export default function FloorPlan() {
  const surface = useRef<HTMLDivElement>(null);

  const move = (e: MouseEvent) => {
    const el = surface.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <section id="floorplan" className="mx-auto max-w-shell px-6 py-[14vh] md:px-12">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow mb-6">Interactive Floor Plan</p>
          <SplitReveal as="h2" by="lines" className="display-lg max-w-xl">
            Choose your altitude.
          </SplitReveal>
        </div>
        <Reveal as="p" className="lead max-w-sm" y={24}>
          A live plan explorer — residences, orientation and views — arrives with
          the sales gallery. A preview of the drawing language is below.
        </Reveal>
      </div>

      <div
        ref={surface}
        onMouseMove={move}
        data-cursor="hover"
        className="group relative aspect-[16/8] w-full overflow-hidden rounded-[14px] border border-line bg-[#0e0f10]"
        style={
          {
            '--mx': '50%',
            '--my': '50%',
          } as React.CSSProperties
        }
      >
        {/* grid */}
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(216,180,106,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(216,180,106,0.16) 1px, transparent 1px)',
            backgroundSize: '44px 44px',
          }}
        />
        {/* schematic */}
        <svg
          viewBox="0 0 800 400"
          className="absolute inset-0 h-full w-full"
          fill="none"
          stroke="#D8B46A"
        >
          <rect x="120" y="70" width="560" height="260" strokeWidth="1.2" opacity="0.7" />
          <rect x="120" y="70" width="240" height="150" strokeWidth="1" opacity="0.55" />
          <rect x="360" y="70" width="320" height="150" strokeWidth="1" opacity="0.55" />
          <rect x="120" y="220" width="180" height="110" strokeWidth="1" opacity="0.55" />
          <rect x="300" y="220" width="180" height="110" strokeWidth="1" opacity="0.55" />
          <rect x="480" y="220" width="200" height="110" strokeWidth="1" opacity="0.55" />
          <circle cx="400" cy="200" r="4" fill="#D8B46A" stroke="none" />
          <path d="M120 200 H80 M680 200 H720" strokeWidth="1" opacity="0.5" />
          <text x="132" y="96" fill="#D8B46A" fontSize="11" stroke="none" opacity="0.7">
            LIVING
          </text>
          <text x="372" y="96" fill="#D8B46A" fontSize="11" stroke="none" opacity="0.7">
            TERRACE
          </text>
          <text x="132" y="246" fill="#D8B46A" fontSize="11" stroke="none" opacity="0.7">
            SUITE 01
          </text>
          <text x="312" y="246" fill="#D8B46A" fontSize="11" stroke="none" opacity="0.7">
            SUITE 02
          </text>
          <text x="492" y="246" fill="#D8B46A" fontSize="11" stroke="none" opacity="0.7">
            STUDY
          </text>
        </svg>
        {/* cursor glow */}
        <div
          className="pointer-events-none absolute h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            left: 'var(--mx)',
            top: 'var(--my)',
            background:
              'radial-gradient(circle, rgba(216,180,106,0.28) 0%, rgba(216,180,106,0) 68%)',
          }}
        />
        <span className="absolute bottom-5 right-6 num text-[0.68rem] tracking-[0.24em] text-accent/80">
          FUTURE&nbsp;READY
        </span>
      </div>
    </section>
  );
}
