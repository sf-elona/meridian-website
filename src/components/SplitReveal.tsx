import { useRef, ElementType, useEffect, useState } from 'react';
import SplitType from 'split-type';

type Props = {
  children: string;
  as?: ElementType;
  className?: string;
  by?: 'words' | 'chars' | 'lines';
  stagger?: number;
  delay?: number;
};

/**
 * Kinetic typography: each word / char / line masks in independently on scroll.
 * SplitType does the DOM split; the reveal is a CSS transition with a per-unit
 * delay, toggled by an IntersectionObserver plus a manual fallback check
 * (rAF-independent, always resolves to visible).
 */
export default function SplitReveal({
  children,
  as: Tag = 'div',
  className = '',
  by = 'words',
  stagger = 0.05,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const split = new SplitType(el, {
      types: by === 'chars' ? 'lines,chars' : by === 'lines' ? 'lines' : 'lines,words',
      lineClass: 'split-line',
    });
    const units = (
      by === 'chars' ? split.chars : by === 'lines' ? split.lines : split.words
    ) as HTMLElement[] | null;

    if (units && units.length) {
      units.forEach((u, i) => {
        u.style.display = 'inline-block';
        u.style.transform = 'translateY(110%)';
        u.style.transition = `transform 1.15s cubic-bezier(0.16,1,0.3,1) ${
          delay + i * stagger
        }s`;
        u.style.willChange = 'transform';
      });
    }

    const show = () => {
      (units || []).forEach((u) => (u.style.transform = 'translateY(0)'));
      setShown(true);
    };

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      show();
      io.disconnect();
      window.removeEventListener('scroll', check, true);
      window.clearInterval(poll);
      window.clearTimeout(failsafe);
    };
    const failsafe = window.setTimeout(finish, 4000);
    const check = () => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.9 && r.bottom > 0) finish();
    };
    const io = new IntersectionObserver(([e]) => e.isIntersecting && finish(), {
      threshold: 0.1,
      rootMargin: '0px 0px -6% 0px',
    });
    io.observe(el);
    window.addEventListener('scroll', check, true);
    const poll = window.setInterval(check, 400);
    check();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', check, true);
      window.clearInterval(poll);
      window.clearTimeout(failsafe);
      split.revert();
    };
  }, [children, by, stagger, delay]);

  return (
    <Tag ref={ref as never} className={className} data-shown={shown || undefined}>
      {children}
    </Tag>
  );
}
