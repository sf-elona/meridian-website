import { useRef } from 'react';
import SplitType from 'split-type';
import { gsap, useIsoLayoutEffect } from '../lib/gsap';
import { ASSETS } from '../data/content';
import MagneticButton from '../components/MagneticButton';
import { getLenis } from '../lib/useSmoothScroll';

/**
 * Pinned hero. A full-bleed video of the tower plays on a loop behind the
 * typography; the headline reveals letter by letter, then as the section is
 * scrolled the copy lifts away, the frame pushes in slightly and the whole
 * thing dissolves into white for the next section.
 */
export default function Hero() {
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const headline = useRef<HTMLHeadingElement>(null);
  const sub = useRef<HTMLParagraphElement>(null);
  const cta = useRef<HTMLDivElement>(null);
  const scrollHint = useRef<HTMLDivElement>(null);
  const whiteout = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const vid = video.current!;
    const sec = section.current!;

    const split = new SplitType(headline.current!, { types: 'chars' });

    // --- intro on load: letters reveal individually -----------------------
    // CSS-transition driven (compositor, rAF-independent) so the first paint
    // is correct even if the tab loads in the background.
    split.chars?.forEach((c, i) => {
      (c as HTMLElement).style.setProperty('--i', String(i));
    });
    const reveal = () => pin.current?.classList.add('hero-in');
    const kick = requestAnimationFrame(reveal);
    const introTimer = window.setTimeout(reveal, 80);

    // --- keep the loop playing -------------------------------------------
    if (vid.readyState === 0) vid.load();
    const startPlayback = () => {
      vid.muted = true;
      const p = vid.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    };
    startPlayback();
    vid.addEventListener('canplay', startPlayback);
    vid.addEventListener('loadeddata', startPlayback);
    // browsers pause muted video when the tab is hidden — resume on return
    const onVisible = () => {
      if (!document.hidden) startPlayback();
    };
    document.addEventListener('visibilitychange', onVisible);

    const ctx = gsap.context(() => {
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: sec,
          start: 'top top',
          end: 'bottom bottom',
          pin: pin.current,
          scrub: 0.8,
        },
      });

      // keep the intro's CSS-driven visible state at progress 0
      const lines = headline.current!.querySelectorAll('.hl-inner');
      master.set([...lines, sub.current, cta.current, scrollHint.current], {
        clearProps: 'opacity,transform',
      });

      // hold on the playing hero for the first stretch of scroll
      master.to({}, { duration: 0.7 });

      // copy lifts away, line by line
      master.to(
        lines,
        { opacity: 0, yPercent: -70, duration: 0.5, stagger: 0.12, ease: 'power2.in' },
        0.6,
      );
      master.to(
        [sub.current, cta.current, scrollHint.current],
        { opacity: 0, y: -24, duration: 0.4, stagger: 0.06, ease: 'power2.in' },
        0.64,
      );
      // gentle camera push
      master.to(vid, { scale: 1.1, duration: 0.7, ease: 'power2.inOut' }, 0.72);
      // dissolve into white for the section-to-section morph
      master.to(whiteout.current, { opacity: 1, duration: 0.5, ease: 'power2.inOut' }, 0.85);
    }, sec);

    return () => {
      cancelAnimationFrame(kick);
      window.clearTimeout(introTimer);
      vid.removeEventListener('canplay', startPlayback);
      vid.removeEventListener('loadeddata', startPlayback);
      document.removeEventListener('visibilitychange', onVisible);
      ctx.revert();
      split.revert();
    };
  }, []);

  const scrollDown = () => {
    const lenis = getLenis();
    const y = window.innerHeight * 1.1;
    lenis ? lenis.scrollTo(y, { duration: 1.8 }) : window.scrollTo({ top: y });
  };

  return (
    <section ref={section} id="hero" className="relative h-[240vh]">
      <div
        ref={pin}
        className="hero-pin relative h-screen w-full overflow-hidden bg-ink"
      >
        {/* full-bleed autoplaying hero video */}
        <video
          ref={video}
          className="absolute inset-0 z-0 h-full w-full object-cover"
          style={{ objectPosition: '50% 45%' }}
          src={ASSETS.heroVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
        />

        {/* readability wash — light on the left where the copy sits, so the
            video stays clearly visible on the right */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-base/85 via-base/45 to-base/10" />
        <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-base/40 via-transparent to-base/45" />

        {/* text layer */}
        <div className="hero-fx pointer-events-none absolute inset-0 z-20 mx-auto flex max-w-shell flex-col justify-center px-6 md:px-12">
          <p className="hero-eyebrow eyebrow mb-6 md:mb-8">
            Meridian — An Architectural Exhibition
          </p>
          <h1 ref={headline} className="display-hero text-ink">
            <span className="hl-line">
              <span className="hl-inner">Not Just A Home.</span>
            </span>
            <span className="hl-line">
              <span className="hl-inner">A New Horizon.</span>
            </span>
          </h1>
          <p ref={sub} className="hero-sub lead mt-8 max-w-xl">
            Experience the next generation of luxury living.
          </p>
          <div ref={cta} className="hero-cta pointer-events-auto mt-10">
            <MagneticButton variant="solid" onClick={scrollDown}>
              Book Visit
            </MagneticButton>
          </div>
        </div>

        {/* scroll indicator */}
        <div
          ref={scrollHint}
          className="hero-hint absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3"
        >
          <span className="eyebrow !text-[0.62rem]">Scroll to explore</span>
          <span className="relative block h-12 w-px overflow-hidden bg-line">
            <span className="absolute inset-x-0 top-0 h-4 animate-[fall_1.8s_ease-in-out_infinite] bg-accent" />
          </span>
        </div>

        {/* whiteout for the section-to-section morph */}
        <div
          ref={whiteout}
          className="pointer-events-none absolute inset-0 z-30 bg-base opacity-0"
        />
      </div>

      <style>{`@keyframes fall{0%{transform:translateY(-100%)}60%,100%{transform:translateY(300%)}}`}</style>
    </section>
  );
}
