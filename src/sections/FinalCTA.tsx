import SplitReveal from '../components/SplitReveal';
import Reveal from '../components/Reveal';
import MagneticButton from '../components/MagneticButton';

export default function FinalCTA() {
  return (
    <section
      id="cta"
      className="flex min-h-[92vh] flex-col items-center justify-center px-6 py-[16vh] text-center"
    >
      <p className="eyebrow mb-10">Register your interest</p>
      <SplitReveal
        as="h2"
        by="chars"
        className="display-hero"
        stagger={0.03}
      >
        Own Tomorrow.
      </SplitReveal>
      <Reveal as="p" className="lead mt-10 max-w-md" y={24}>
        Private tours are held by appointment, in small groups, from the 41st
        floor sky lounge.
      </Reveal>
      <Reveal className="mt-12" y={20} delay={0.15}>
        <MagneticButton
          variant="solid"
          className="!bg-accent !text-ink hover:!bg-ink hover:!text-white"
          href="#cta"
        >
          Book a Private Tour
        </MagneticButton>
      </Reveal>
    </section>
  );
}
