import { create } from 'zustand'
import type { AnimationType, Category, SortOrder, StyleApproach } from '../types'

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  useFilterStore — single source of truth for the directory's filter state.
 *
 *  Design notes:
 *   • Multi-select facets (categories / animations / styles) are plain arrays.
 *     An empty facet array means "no constraint" — see lib/filtering.ts for
 *     the OR-within / AND-across semantics.
 *   • `query` is raw text written on every keystroke from the Command
 *     Palette. Scoring is done at read time (lib/fuzzy.ts) so typing only
 *     ever causes ONE store write per keystroke.
 *   • The store is deliberately FLAT. Components subscribe with narrow
 *     selectors (useShallow for object slices), so e.g. toggling the sidebar
 *     never re-renders the grid, and typing never re-renders the palette's
 *     backdrop.
 *   • `highlightId` is transient UI state (palette deep-link pulse).
 *   • `selectedId` is the click-expanded component (source modal) — stored
 *     here so ANY card can open the modal regardless of where it renders.
 *   • `mono` applies a CSS grayscale filter over the whole app: the strict
 *     black-and-white preview for the demo sandboxes.
 * ─────────────────────────────────────────────────────────────────────────────
 */
interface FilterStore {
  // ── state ─────────────────────────────────────────────
  query: string
  categories: Category[]
  animations: AnimationType[]
  styles: StyleApproach[]
  sort: SortOrder
  sidebarOpen: boolean
  paletteOpen: boolean
  highlightId: string | null
  selectedId: string | null
  mono: boolean

  // ── actions ────────────────────────────────────────────
  setQuery: (query: string) => void
  toggleCategory: (value: Category) => void
  toggleAnimation: (value: AnimationType) => void
  toggleStyle: (value: StyleApproach) => void
  setSort: (sort: SortOrder) => void
  toggleSidebar: () => void
  setPaletteOpen: (open: boolean) => void
  setHighlight: (id: string | null) => void
  selectComponent: (id: string | null) => void
  toggleMono: () => void
  resetFilters: () => void
}

/** Immutable add/remove of one value inside a facet array. */
const toggleValue = <T,>(list: readonly T[], value: T): T[] =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value]

export const useFilterStore = create<FilterStore>((set) => ({
  query: '',
  categories: [],
  animations: [],
  styles: [],
  sort: 'popular',
  // Default: open on desktop, collapsed on mobile (overlay drawer there).
  sidebarOpen: typeof window === 'undefined' ? true : window.innerWidth >= 1024,
  paletteOpen: false,
  highlightId: null,
  selectedId: null,
  mono: false,

  setQuery: (query) => set({ query }),

  // Each toggle is a pure swap: add if absent, remove if present.
  toggleCategory: (value) => set((s) => ({ categories: toggleValue(s.categories, value) })),
  toggleAnimation: (value) => set((s) => ({ animations: toggleValue(s.animations, value) })),
  toggleStyle: (value) => set((s) => ({ styles: toggleValue(s.styles, value) })),

  setSort: (sort) => set({ sort }),
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setPaletteOpen: (open) => set({ paletteOpen: open }),
  setHighlight: (id) => set({ highlightId: id }),
  selectComponent: (id) => set({ selectedId: id }),
  toggleMono: () => set((s) => ({ mono: !s.mono })),

  // Sort is preserved on purpose — resetting *what* you see, not *how*.
  resetFilters: () => set({ query: '', categories: [], animations: [], styles: [] }),
}))

/** Count of active constraints — drives the "Reset (n)" affordance. */
export const selectActiveFilterCount = (s: FilterStore): number =>
  s.categories.length + s.animations.length + s.styles.length + (s.query.trim() ? 1 : 0)
