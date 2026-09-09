import { RefObject } from 'react';
import { gsap, useIsoLayoutEffect } from './gsap';

/**
 * Subtle vertical parallax tied to scroll. `amount` is the total travel in px
 * across the element's scroll pass (positive = moves up as you scroll down).
 */
export function useParallax(ref: RefObject<HTMLElement>, amount = 80) {
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: 0 },
        {
          y: -amount,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    });
    return () => ctx.revert();
  }, [amount]);
}
