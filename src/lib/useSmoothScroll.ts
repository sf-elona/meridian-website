import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap, ScrollTrigger } from './gsap';

let lenisSingleton: Lenis | null = null;

export function getLenis() {
  return lenisSingleton;
}

/**
 * Wires Lenis smooth scrolling into GSAP's ticker so ScrollTrigger stays
 * perfectly synchronised with the eased scroll position. One instance only.
 */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !prefersReduced,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
      lerp: prefersReduced ? 1 : 0.1,
    });
    lenisSingleton = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisSingleton = null;
    };
  }, [enabled]);
}
