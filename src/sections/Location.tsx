import { LOCATION } from '../data/content';
import SplitReveal from '../components/SplitReveal';
import Reveal from '../components/Reveal';

export default function Location() {
  return (
    <section id="location" className="mx-auto max-w-shell px-6 py-[16vh] md:px-12">
      <p className="eyebrow mb-8">Location</p>
      <SplitReveal as="h2" by="lines" className="display-lg max-w-2xl" stagger={0.08}>
        Central, without the noise.
      </SplitReveal>

      <div className="mt-16 grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
        {/* minimal map */}
        <Reveal className="relative aspect-square w-full overflow-hidden rounded-[16px] border border-line bg-white" y={40}>
          <svg viewBox="0 0 500 500" className="absolute inset-0 h-full w-full" fill="none">
            {Array.from({ length: 9 }).map((_, i) => (
              <g key={i} stroke="rgba(17,17,17,0.06)" strokeWidth="1">
                <line x1={i * 62 + 10} y1="0" x2={i * 62 + 10} y2="500" />
                <line x1="0" y1={i * 62 + 10} x2="500" y2={i * 62 + 10} />
              </g>
            ))}
            <path
              d="M20 320 C 140 300, 180 180, 300 170 S 470 120, 490 60"
              stroke="rgba(17,17,17,0.18)"
              strokeWidth="2"
            />
            <path
              d="M60 40 C 120 160, 220 200, 250 260 S 320 420, 460 460"
              stroke="rgba(216,180,106,0.5)"
              strokeWidth="2"
            />
            <circle cx="250" cy="250" r="46" fill="rgba(216,180,106,0.10)" />
            <circle cx="250" cy="250" r="7" fill="#D8B46A" />
            <circle cx="250" cy="250" r="16" stroke="#D8B46A" strokeWidth="1.5" />
          </svg>
          <span className="absolute left-1/2 top-1/2 mt-8 -translate-x-1/2 text-[0.66rem] uppercase tracking-[0.24em] text-ink">
            MERIDIAN
          </span>
        </Reveal>

        {/* nearby */}
        <div className="flex flex-col justify-center">
          {LOCATION.map(({ label, meta, icon: Icon }) => (
            <div
              key={label}
              data-cursor="hover"
              className="group flex items-center justify-between border-b border-line py-7 transition-colors hover:border-accent"
            >
              <div className="flex items-center gap-5">
                <Icon
                  className="h-6 w-6 text-muted transition-colors duration-500 group-hover:text-accent"
                  strokeWidth={1.3}
                />
                <span className="text-[1.05rem] tracking-tightish">{label}</span>
              </div>
              <span className="num text-[0.95rem] text-muted">{meta}</span>
            </div>
          ))}
          <p className="lead mt-10 max-w-sm text-[0.95rem]">
            Set within three acres of landscaped ground, yet minutes from the
            city's core infrastructure.
          </p>
        </div>
      </div>
    </section>
  );
}
