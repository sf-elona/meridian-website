# MERIDIAN — Scroll-Driven Architectural Exhibition

An Awwwards-tier, scroll-driven experience for a luxury skyscraper gated
community. Minimal-luxury design language (white-dominant, gold accent),
cinematic reveals, pinned storytelling, and a hero video whose playback is
driven **entirely by scroll** — the visitor builds the tower as they scroll.

## Stack

- React 18 + Vite 5 + TypeScript
- Tailwind CSS (custom luxury tokens)
- GSAP + ScrollTrigger (pinned storytelling, scroll-scrubbed video, parallax)
- Lenis smooth scroll (synced to the GSAP ticker)
- SplitType (kinetic per-line / per-character typography)
- Framer Motion, lucide-react, react-icons (available; used where they earn it)

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production bundle -> dist/
npm run preview  # serve the production build on :4173
```

> This machine had no Node.js — it was installed via `winget` (Node 24 LTS).
> `npm` lives next to that install; a normal terminal restart puts it on PATH.

## Structure

```
public/
  videos/   Skyscraper_constructs_itself.mp4  (portrait hero, scroll-scrubbed)
            Luxury_apartment_walkthrough.mp4
            Luxury_amenity_showcase.mp4
            Premium_facilities.mp4
  images/   Skyscraper.jpeg  Luxury_living_room.jpeg
            Infinity_pool.jpeg  Luxury_clubhouse.jpeg
  (original uploads are kept alongside, untouched)

src/
  components/  Preloader, Cursor, Navbar, MagneticButton,
               Reveal, SplitReveal, LazyVideo, Footer
  sections/    Hero, Interiors, Amenities, Community, Stats,
               Gallery, FloorPlan, Location, Testimonials, FinalCTA
  lib/         gsap, useSmoothScroll (Lenis), useParallax, useInView
  data/        content.ts  (all copy + asset paths + icon maps)
```

## Motion philosophy

Slow, confident, generously eased — restraint over flash. Reveals are
IntersectionObserver + CSS transitions (compositor-driven, resilient); GSAP is
reserved for the pinned scroll-storytelling where it is genuinely needed. Custom
golden cursor with an interpolated ring; magnetic buttons; glass panels.

## Asset note

The brief specified `public/videos` + `public/images` with canonical names; the
uploads arrived under `public/real state vedio` / `public/real state image` with
generated names, so they were copied into the expected layout. Image → name
mapping was done by eye (living room, infinity pool, clubhouse, tower).
