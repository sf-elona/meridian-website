import { useEffect, useRef, useState } from 'react';
import { gsap } from '../lib/gsap';
import { ASSETS } from '../data/content';

/**
 * Luxury preloader: a skyscraper outline draws itself in gold while a counter
 * climbs to 100. The curtain lifts once the drawing is done AND the hero video
 * is buffered (hard-capped so it can never hang).
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const paths = useRef<SVGPathElement[]>([]);
  const [pct, setPct] = useState(0);
  const finished = useRef(false);

  useEffect(() => {
    paths.current.forEach((p) => {
      if (!p) return;
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    });

    const assetsReady = Promise.race([
      Promise.all([
        new Promise<void>((res) => {
          const v = document.createElement('video');
          v.muted = true;
          v.preload = 'auto';
          v.onloadeddata = () => res();
          v.oncanplaythrough = () => res();
          v.onerror = () => res();
          v.src = ASSETS.heroVideo;
        }),
        (document as unknown as { fonts?: { ready: Promise<unknown> } }).fonts
          ?.ready ?? Promise.resolve(),
      ]).then(() => undefined),
      new Promise<void>((res) => setTimeout(res, 5000)),
    ]);

    const counter = { v: 0 };
    const draw = gsap.timeline();
    draw.to(counter, {
      v: 92,
      duration: 2.4,
      ease: 'power1.inOut',
      onUpdate: () => setPct(Math.round(counter.v)),
    });
    draw.to(
      paths.current,
      { strokeDashoffset: 0, duration: 2.4, ease: 'power2.inOut', stagger: 0.12 },
      0,
    );

    const curtain = () => {
      if (finished.current) return;
      finished.current = true;
      gsap.killTweensOf(counter);
      gsap.to(counter, {
        v: 100,
        duration: 0.5,
        ease: 'power2.out',
        onUpdate: () => setPct(Math.round(counter.v)),
      });
      gsap.to(paths.current, { strokeDashoffset: 0, duration: 0.4 });
      gsap
        .timeline({ delay: 0.55 })
        .to('.pl-mark', { autoAlpha: 0, y: -16, duration: 0.5, ease: 'power2.in' })
        .to(
          '.pl-panel',
          { yPercent: -101, duration: 1.15, ease: 'expo.inOut', stagger: 0.08 },
          '-=0.15',
        )
        .set(root.current, { autoAlpha: 0, pointerEvents: 'none' });
      // hand off with a real timer so the page never waits on rAF
      window.setTimeout(onDone, 1650);
    };

    // curtain only after the draw has had time to be seen
    const minTime = new Promise<void>((res) => setTimeout(res, 2600));
    Promise.all([assetsReady, minTime]).then(curtain);

    // absolute failsafe — force both the curtain and the hand-off
    const hardCap = window.setTimeout(() => {
      curtain();
      onDone();
    }, 8000);

    return () => {
      draw.kill();
      window.clearTimeout(hardCap);
    };
  }, [onDone]);

  return (
    <div ref={root} className="fixed inset-0 z-[10000] overflow-hidden">
      {/* two-panel curtain */}
      <div className="pl-panel absolute inset-0 h-1/2 bg-base" />
      <div className="pl-panel absolute inset-x-0 bottom-0 top-1/2 bg-base" />

      <div className="pl-mark absolute inset-0 flex flex-col items-center justify-center gap-9">
        <svg width="120" height="210" viewBox="0 0 120 210" fill="none" className="overflow-visible">
          <path ref={(el) => el && (paths.current[0] = el)} d="M42 200 V64 L60 44 L78 64 V200" stroke="#D8B46A" strokeWidth="1.4" />
          <path ref={(el) => el && (paths.current[1] = el)} d="M42 96 H78 M42 124 H78 M42 152 H78 M42 178 H78" stroke="#D8B46A" strokeWidth="1" opacity="0.55" />
          <path ref={(el) => el && (paths.current[2] = el)} d="M60 44 V14 M52 22 H68" stroke="#D8B46A" strokeWidth="1.2" />
          <path ref={(el) => el && (paths.current[3] = el)} d="M18 200 H102" stroke="#111111" strokeWidth="1" />
        </svg>
        <div className="flex flex-col items-center gap-3">
          <span className="eyebrow">Constructing the horizon</span>
          <span className="num text-4xl tracking-tightish">
            {String(pct).padStart(3, '0')}
            <span className="text-accent">%</span>
          </span>
        </div>
      </div>
    </div>
  );
}
