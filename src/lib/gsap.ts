import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useEffect } from 'react';

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({ ease: 'power3.out', duration: 1.1 });

if (import.meta.env.DEV) {
  (window as unknown as Record<string, unknown>).gsap = gsap;
  (window as unknown as Record<string, unknown>).ScrollTrigger = ScrollTrigger;
}

export const useIsoLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export { gsap, ScrollTrigger };
