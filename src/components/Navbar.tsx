import { useEffect, useState } from 'react';
import MagneticButton from './MagneticButton';
import { getLenis } from '../lib/useSmoothScroll';

const LINKS = [
  { label: 'Interiors', id: 'interiors' },
  { label: 'Amenities', id: 'amenities' },
  { label: 'Community', id: 'community' },
  { label: 'Gallery', id: 'gallery' },
  { label: 'Location', id: 'location' },
];

export default function Navbar() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(el, { offset: -40, duration: 1.6 });
    else el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[900] transition-all duration-700 ease-luxe ${
        solid
          ? 'bg-white/80 backdrop-blur-glass border-b border-line py-4'
          : 'bg-transparent py-7'
      }`}
    >
      <nav className="mx-auto flex max-w-shell items-center justify-between px-6 md:px-12">
        <button
          onClick={() => {
            const lenis = getLenis();
            lenis ? lenis.scrollTo(0, { duration: 1.6 }) : window.scrollTo({ top: 0 });
          }}
          className="flex items-center gap-2"
          aria-label="Back to top"
        >
          <span className="block h-2 w-2 rotate-45 bg-accent" />
          <span className="font-display text-lg tracking-tightish">MERIDIAN</span>
        </button>

        <div className="hidden items-center gap-9 lg:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className="group relative text-[0.72rem] font-medium uppercase tracking-[0.22em] text-muted transition-colors hover:text-ink"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-500 ease-luxe group-hover:w-full" />
            </button>
          ))}
        </div>

        <MagneticButton
          variant={solid ? 'solid' : 'ghost'}
          className="!px-6 !py-3 !text-[0.68rem]"
          onClick={() => go('cta')}
        >
          Book Visit
        </MagneticButton>
      </nav>
    </header>
  );
}
