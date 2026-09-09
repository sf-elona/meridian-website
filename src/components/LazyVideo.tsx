import { useEffect, useRef } from 'react';

type Props = {
  src: string;
  className?: string;
  poster?: string;
  /** play only while on screen (still buffers a first frame regardless) */
  autoPlayInView?: boolean;
};

/**
 * Autoplaying muted background video. The source is attached on mount so a
 * frame is always decoded and visible; playback pauses while off-screen to
 * spare the frame budget, and resumes on scroll-in.
 */
export default function LazyVideo({
  src,
  className = '',
  poster,
  autoPlayInView = true,
}: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    // attach + buffer immediately — never leave a visible <video> blank
    if (!v.src) {
      v.src = src;
      v.load();
    }
    const kick = () => v.play().catch(() => {});
    kick();
    v.addEventListener('loadeddata', kick);
    v.addEventListener('canplay', kick);

    let io: IntersectionObserver | null = null;
    if (autoPlayInView) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) v.play().catch(() => {});
            else v.pause();
          });
        },
        { threshold: 0.12 },
      );
      io.observe(v);
    }

    const onVisible = () => {
      if (!document.hidden) v.play().catch(() => {});
    };
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      v.removeEventListener('loadeddata', kick);
      v.removeEventListener('canplay', kick);
      document.removeEventListener('visibilitychange', onVisible);
      io?.disconnect();
    };
  }, [src, autoPlayInView]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      disablePictureInPicture
    />
  );
}
