export default function Footer() {
  return (
    <footer className="mx-auto max-w-shell px-6 pb-12 pt-[10vh] md:px-12">
      <div className="h-px w-full bg-line" />
      <div className="flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="block h-2 w-2 rotate-45 bg-accent" />
            <span className="font-display text-xl tracking-tightish">MERIDIAN</span>
          </div>
          <p className="mt-4 max-w-xs text-[0.8rem] leading-relaxed text-muted">
            An architectural exhibition of a luxury skyscraper gated community.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-14 gap-y-3 text-[0.78rem] uppercase tracking-[0.16em] text-muted">
          <a href="#interiors" className="transition-colors hover:text-ink">Interiors</a>
          <a href="#amenities" className="transition-colors hover:text-ink">Amenities</a>
          <a href="#community" className="transition-colors hover:text-ink">Community</a>
          <a href="#gallery" className="transition-colors hover:text-ink">Gallery</a>
          <a href="#location" className="transition-colors hover:text-ink">Location</a>
          <a href="#cta" className="transition-colors hover:text-ink">Book Visit</a>
        </div>
      </div>
      <div className="flex flex-col gap-2 border-t border-line py-6 text-[0.7rem] uppercase tracking-[0.18em] text-muted md:flex-row md:justify-between">
        <span>© {new Date().getFullYear()} Meridian Residences</span>
        <span>Designed as an exhibition, not a brochure</span>
      </div>
    </footer>
  );
}
