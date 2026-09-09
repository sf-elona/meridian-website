import { useRef, ReactNode, MouseEvent } from 'react';
import { gsap } from '../lib/gsap';

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'solid' | 'ghost' | 'light';
  className?: string;
  strength?: number;
};

/**
 * Magnetic pull toward the cursor with a soft spring back. Restrained — a few
 * pixels of travel, generous easing.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  variant = 'solid',
  className = '',
  strength = 0.32,
}: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const inner = useRef<HTMLSpanElement>(null);

  const move = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.9, ease: 'power3.out' });
    gsap.to(inner.current, {
      x: x * strength * 0.35,
      y: y * strength * 0.35,
      duration: 0.9,
      ease: 'power3.out',
    });
  };

  const leave = () => {
    gsap.to([ref.current, inner.current], {
      x: 0,
      y: 0,
      duration: 1.1,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  const base =
    'relative inline-flex items-center justify-center rounded-full px-8 py-4 text-[0.78rem] font-medium tracking-[0.22em] uppercase transition-colors duration-500 ease-luxe will-change-transform';
  const styles = {
    solid: 'bg-ink text-white hover:bg-accent hover:text-ink',
    light: 'bg-white text-ink hairline hover:bg-ink hover:text-white',
    ghost: 'text-ink hairline hover:border-accent hover:text-accent',
  }[variant];

  const content = <span ref={inner} className="inline-block will-change-transform">{children}</span>;

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        onMouseMove={move}
        onMouseLeave={leave}
        className={`${base} ${styles} ${className}`}
      >
        {content}
      </a>
    );
  }
  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={move}
      onMouseLeave={leave}
      className={`${base} ${styles} ${className}`}
    >
      {content}
    </button>
  );
}
