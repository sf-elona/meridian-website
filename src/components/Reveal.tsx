import { ReactNode, ElementType } from 'react';
import { useInView } from '../lib/useInView';

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  y?: number;
  blur?: number;
  delay?: number;
};

/**
 * Generic cinematic reveal: fade + rise + de-blur. Driven by an
 * IntersectionObserver (with a manual fallback) toggling CSS transitions, so it
 * is rAF-independent and always ends in the visible state.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  y = 44,
  blur = 10,
  delay = 0,
}: Props) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : `translateY(${y}px)`,
        filter: inView ? 'blur(0px)' : `blur(${blur}px)`,
        transition: `opacity 1s ease ${delay}s, transform 1.3s cubic-bezier(0.16,1,0.3,1) ${delay}s, filter 1s ease ${delay}s`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Tag>
  );
}
