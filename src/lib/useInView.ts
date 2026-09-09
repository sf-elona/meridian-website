import { useEffect, useRef, useState } from 'react';

/**
 * Minimal IntersectionObserver hook with a manual fallback check, so reveals
 * always resolve to their visible state even if IO delivery is throttled (e.g.
 * a backgrounded tab). rAF-independent.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  opts: IntersectionObserverInit = { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
  once = true,
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => {
      setInView(true);
      io.disconnect();
      window.removeEventListener('scroll', check, true);
      window.clearInterval(poll);
      window.clearTimeout(failsafe);
    };
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92 && r.bottom > 0) reveal();
    };
    // last resort: never leave content permanently hidden (fast full-page
    // captures / missed scroll events / throttled tabs)
    const failsafe = window.setTimeout(reveal, 4000);

    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (once) reveal();
        else setInView(true);
      } else if (!once) {
        setInView(false);
      }
    }, opts);
    io.observe(el);

    // fallbacks: a scroll listener + a short poll covering throttled IO
    window.addEventListener('scroll', check, true);
    const poll = window.setInterval(check, 400);
    check();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', check, true);
      window.clearInterval(poll);
      window.clearTimeout(failsafe);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [once]);

  return { ref, inView };
}
