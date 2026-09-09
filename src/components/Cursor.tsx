import { useEffect, useRef } from 'react';

/**
 * Golden dot + interpolated outer ring. The ring lerps toward the pointer each
 * frame; hovering interactive elements expands it. Pointer-fine only.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...mouse };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    const loop = () => {
      pos.x += (mouse.x - pos.x) * 0.16;
      pos.y += (mouse.y - pos.y) * 0.16;
      if (ring.current) {
        ring.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    const hoverSelector =
      'a, button, [data-cursor="hover"], input, textarea, [role="button"]';
    const over = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest(hoverSelector)) ring.current?.classList.add('is-hover');
      if (t.closest('[data-cursor="dark"]')) ring.current?.classList.add('is-dark');
    };
    const out = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest(hoverSelector)) ring.current?.classList.remove('is-hover');
      if (t.closest('[data-cursor="dark"]')) ring.current?.classList.remove('is-dark');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" aria-hidden />
      <div ref={ring} className="cursor-ring" aria-hidden />
    </>
  );
}
