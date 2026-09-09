import { useRef } from 'react';
import { ASSETS, COMMUNITY } from '../data/content';
import LazyVideo from '../components/LazyVideo';
import SplitReveal from '../components/SplitReveal';
import { gsap, useIsoLayoutEffect } from '../lib/gsap';

export default function Community() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth + 120;

      gsap.to(el, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={section} id="community" className="relative overflow-hidden bg-base">
      <div className="flex h-screen flex-col justify-center">
        <div className="mx-auto w-full max-w-shell px-6 md:px-12">
          <p className="eyebrow mb-6">Community Living</p>
          <SplitReveal as="h2" by="lines" className="display-lg max-w-2xl" stagger={0.08}>
            A neighbourhood, vertically arranged.
          </SplitReveal>
        </div>

        <div
          ref={track}
          className="mt-14 flex items-stretch gap-6 pl-6 will-change-transform md:pl-12"
        >
          {/* lead media card */}
          <article className="relative w-[70vw] shrink-0 overflow-hidden rounded-[16px] hairline luxe-shadow sm:w-[440px]">
            <LazyVideo
              src={ASSETS.facilitiesVideo}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
            <p className="absolute bottom-6 left-6 font-display text-2xl text-white">
              Premium Facilities
            </p>
          </article>

          {COMMUNITY.map(({ label, icon: Icon }, i) => (
            <article
              key={label}
              data-ccard
              data-cursor="hover"
              className="group flex w-[64vw] shrink-0 flex-col justify-between rounded-[16px] bg-card p-8 hairline transition-all duration-500 ease-luxe hover:-translate-y-2 hover:shadow-[0_50px_100px_-40px_rgba(17,17,17,0.4)] sm:w-[320px]"
              style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * 1.6}deg)` }}
            >
              <div className="flex items-center justify-between">
                <Icon
                  className="h-6 w-6 text-ink transition-colors duration-500 group-hover:text-accent"
                  strokeWidth={1.3}
                />
                <span className="num text-[0.7rem] tracking-[0.2em] text-muted">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div>
                <h3 className="font-display text-[1.7rem] leading-tight tracking-tightish">
                  {label}
                </h3>
                <span className="mt-4 block h-px w-10 bg-accent transition-all duration-500 ease-luxe group-hover:w-20" />
              </div>
            </article>
          ))}
          <div className="w-6 shrink-0 md:w-12" />
        </div>
      </div>
    </section>
  );
}
