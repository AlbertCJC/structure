# Structura — The Component Laboratory

A production-ready UI component library directory built on **Structural Minimalism with Component Maximalism**: a flat, **black-and-white** directory shell — no logo marks, no gradients, no glow — housing hyper-modern live components. The shell is strictly monochrome; the demo sandboxes are the color.

**408 live, interactive components** across **10 categories** — buttons (49), loaders (41), toggles (32), navigation (57), forms (43), feedback (41), layout & scroll (36), data & charts (40), overlays (31), typography (38). Demos are grouped into *family files* (3–8 related components per `.tsx`) with a `// family · …` header tag shown in the source modal.

**Design rules**
- Shell: white/gray on black only. Facet dots are grayscale, distinguished by lightness.
- All cards are one fixed, uniform size. Sandboxes stay fully interactive.
- **Click a card's metadata bar** (or its hover corner button) → modal with live demo + full source + copy.
- **MONO toggle** in the top bar applies CSS grayscale to everything — a strict B/W preview of the demos themselves.

**Stack:** React 18 · Vite · TypeScript (strict) · Tailwind CSS · Framer Motion · GSAP + ScrollTrigger · Zustand

---

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc --noEmit && vite build (strict gate)
```

## Architecture

```
structura/
├── index.html
├── tailwind.config.js              # dark design tokens (void/abyss/panel/surface/raise…)
├── vite.config.ts                  # 0.0.0.0 bind + allowedHosts for preview proxy
└── src/
    ├── main.tsx
    ├── App.tsx                     # shell: TopBar │ Sidebar │ main>ComponentGrid + CommandPalette
    ├── index.css                   # Tailwind layers + shared keyframes (orbit, glitch, marquee…)
    ├── vite-env.d.ts               # ?raw module declarations for Copy Code
    │
    ├── types/index.ts              # Category / AnimationType / StyleApproach / LibraryComponent
    │
    ├── data/
    │   ├── components.ts           # ★ assembles ALL_COMPONENTS from the domain modules
    │   └── domains/                # per-category metadata (128 rows total)
    │       ├── buttons.ts loaders.ts toggles.ts navigation.ts forms.ts
    │       └── feedback.ts layout.ts data.ts overlay.ts typography.ts
    │
    ├── lib/
    │   ├── constants.ts            # facet display metadata (labels, dots, swatches)
    │   ├── fuzzy.ts                # dependency-free fuzzy matcher (substring + subsequence scoring)
    │   ├── filtering.ts            # pure OR-within / AND-across pipeline + relevance re-sort
    │   ├── jump.ts                 # palette deep-link: reset-if-hidden → scroll → highlight pulse
    │   ├── clipboard.ts            # clipboard write w/ execCommand fallback
    │   └── gsap.ts                 # single GSAP entrypoint (ScrollTrigger registered once)
    │
    ├── store/
    │   └── useFilterStore.ts       # Zustand store: facets, query, sort, sidebar, palette, highlight
    │
    ├── components/
    │   ├── ui/Icons.tsx
    │   ├── layout/
    │   │   ├── TopBar.tsx          # text wordmark + ⌘K trigger + MONO toggle + count
    │   │   └── CommandPalette.tsx  # fuzzy search, keyboard nav, deep-link jump
    │   ├── filters/
    │   │   ├── Sidebar.tsx         # collapsible spring rail / mobile drawer
    │   │   └── Pill.tsx            # atomic filter toggle
    │   └── library/
    │       ├── ComponentGrid.tsx   # useShallow selector → applyFilters → AnimatePresence grid
    │       ├── ComponentCard.tsx   # uniform flat card: interactive sandbox + metadata expand bar
    │       └── ComponentModal.tsx  # expanded view: live demo + ?raw source + copy + ←/→ browse + ESC
    │
    └── catalog/                    # one folder per domain — each demo is a pure component
        ├── registry.tsx            # id → React.lazy component (domain chunk per category)
        ├── sources.ts              # id → async ?raw source loader (rides the same chunk)
        ├── buttons/    (21) + index.ts   # magnetic, glitch, ripple, hold-gates, confetti…
        ├── loaders/    (17) + index.ts   # orbits, gooey, radar, DNA, pacman, equalizer…
        ├── toggles/    (12) + index.ts   # elastic, day/night, lock, wifi arcs, power…
        ├── navigation/ (13) + index.ts   # dock magnifier, mega menu, context menu…
        ├── forms/      (15) + index.ts   # OTP, 3D credit card, sliders, chip input…
        ├── feedback/   (13) + index.ts   # toasts, morphing modal, reorder, accordion…
        ├── layout/     (12) + index.ts   # bento, kanban, split panes, flip cards…
        ├── scroll/     (3)               # GSAP: hijack, parallax, sticky stacking
        ├── surface/    (1)               # glass spotlight card
        ├── data/       (12) + index.ts   # donut draw, gauge, heatmap, leaderboard…
        ├── overlay/    ( 7) + index.ts   # lightbox, spotlight tour, snapping sheet…
        └── typography/ ( 6) + index.ts   # scramble, typewriter, rolling digits…
```

Each domain `index.ts` exports `…Renderers` (id → component) and `…Sources`
(id → Vite `?raw` file text) — the central registry lazily resolves them per
domain chunk, so domains stay fully self-contained.

## State management

One flat Zustand store (`useFilterStore`), deliberately facet-array based:

- **Facet semantics:** OR within a facet, AND across facets. Empty array = no constraint.
- **Selectors are narrow.** `ComponentGrid` reads exactly five fields through `useShallow`; the palette, sidebar width and highlight state never re-render the grid, and keystrokes only write `query`.
- **Filtering is pure.** `applyFilters` in `lib/filtering.ts` has zero React dependencies — the pipeline is trivially testable and memoized on the selected slice.
- When a query exists, results re-sort by fuzzy relevance (streak + word-boundary bonuses); otherwise the active SortOrder (Popular / A–Z / Z–A) applies.

## Grid animation model

- `AnimatePresence mode="popLayout"` + `layout` on every card → adds, removes and reorders all spring into place. (Card uses `forwardRef` so popLayout can measure it.)
- Columns come from `repeat(auto-fill, minmax(290px, 1fr))` — no breakpoint maintenance, one uniform size.
- Enter staggering is capped at `min(index * 30ms, 400ms)` so deep pages don't lag.

## Source viewing

Each demo is imported with Vite's `?raw` suffix inside its domain index —
the modal's code panel and the Copy Source button serve the **actual source
file text**, byte-identical to the running demo, loaded on demand with the
domain chunk. The modal mounts a second, independent
demo instance; the card's instance keeps running behind the backdrop.
ESC / backdrop click closes; body scroll locks while open.

## Quality gates

- `npx tsc --noEmit` + `npm run build` — strict compile gate.
- `npx vite-node scripts/smoke.tsx` — server-renders ALL 128 demos; fails if any id lacks a renderer or renders empty.
- `node scripts/spy.mjs` — real-browser audit (Playwright): per-card sandbox health, click-to-expand flow, deep-link hash sync, ←/→ sibling browsing, ESC close, MONO toggle, console cleanliness.
- Boot audit in `main.tsx` — console-verifies data↔registry parity on every load.

## Adding a component (3 steps)

1. Create `src/catalog/<domain>/MyComponent.tsx` (pure component, own cleanup on unmount).
2. Add a metadata row to `src/data/domains/<domain>.ts`.
3. Register it in the domain's `index.ts`: one renderer entry + one `?raw` import/source entry.

The central registry, sources map, sidebar facets, palette and grid all pick it up automatically.

## Performance notes at 400+ cards

- Card shells stay mounted by design (a directory, not a feed); their live
  demos mount only when approaching the viewport (see below). Heavy loops are
  CSS/compositor-driven so idle cost stays low.
- The two GSAP ScrollTrigger demos scope + revert via `gsap.context`, and all
  interval/RAF demos clean up on unmount, so filtering in and out is leak-free.
- Domains are code-split (one Vite chunk per category, ~15–42 kB gz each;
  initial entry ~16 kB gz + vendor), and grid demos mount lazily as they
  approach the viewport via `ViewportMount` (IntersectionObserver, one-screen
  prefetch, mount-once) — fetch and animation work stay below the fold until
  needed. Next step for even larger catalogs: per-demo chunks — the registry
  is already lazy-shaped for it.

## Interaction cheat-sheet

| Input | Effect |
|---|---|
| `⌘K` / `Ctrl+K` or `/` | Command palette (live fuzzy search, ↑↓ Enter to jump) |
| Sidebar pills | Facet filtering with animated grid diff |
| Click metadata bar / corner button | Expand modal: live demo + full source + Copy |
| `←` / `→` (in modal) | Browse siblings in the grid's current filter/sort order (wraps) |
| URL `#<id>` | Deep link — every expanded view is a shareable URL (restored on boot) |
| `esc` / backdrop click | Close modal (hash clears) |
| MONO button (top bar) | Grayscale-preview the entire app, demos included |
| Inside sandboxes | Fully interactive — expand never hijacks demo clicks |

## Accessibility

- `prefers-reduced-motion` is honoured app-wide: `MotionConfig reducedMotion="user"`
  flattens framer transforms to opacity fades, and a media-query block in
  `index.css` collapses every pure-CSS loop (loaders, marquees, glitch, pulses).
- Global shortcuts never fire while typing (shared `isTypingTarget` guard in
  `lib/hotkeys.ts`); modal close/browse keys include visible focus/hover targets.
