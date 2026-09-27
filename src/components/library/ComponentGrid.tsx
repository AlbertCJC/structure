import { useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useShallow } from 'zustand/react/shallow'
import { ALL_COMPONENTS } from '../../data/components'
import { ANIMATION_META, CATEGORY_META, STYLE_META } from '../../lib/constants'
import { applyFilters } from '../../lib/filtering'
import { useFilterStore } from '../../store/useFilterStore'
import { XIcon } from '../ui/Icons'
import { ComponentCard } from './ComponentCard'

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  The dynamic grid.
 *
 *  State flow:
 *   1. One `useShallow` selector pulls exactly the five fields the filter
 *      pipeline reads — nothing else. Toggling the sidebar or opening the
 *      palette does NOT re-render this component.
 *   2. `applyFilters` (pure, memoized on that slice) produces the visible
 *      list, re-sorted by fuzzy relevance when a query is present.
 *   3. AnimatePresence (popLayout) + `layout` on each card turns every
 *      diff into spring-driven repositioning — add, remove and reorder all
 *      animate, including the masonry-ish reflow when featured (2-col)
 *      cards enter or leave.
 *
 *  Grid: CSS auto-fill minmax — the column count solves itself from the
 *  available width (290px min). No breakpoints to maintain.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function ComponentGrid() {
  const filters = useFilterStore(
    useShallow((s) => ({
      query: s.query,
      categories: s.categories,
      animations: s.animations,
      styles: s.styles,
      sort: s.sort,
    })),
  )

  const setQuery = useFilterStore((s) => s.setQuery)
  const categories = useFilterStore((s) => s.categories)
  const toggleCategory = useFilterStore((s) => s.toggleCategory)
  const animations = useFilterStore((s) => s.animations)
  const toggleAnimation = useFilterStore((s) => s.toggleAnimation)
  const styles = useFilterStore((s) => s.styles)
  const toggleStyle = useFilterStore((s) => s.toggleStyle)
  const resetFilters = useFilterStore((s) => s.resetFilters)

  const items = useMemo(() => applyFilters(filters), [filters])

  const hasActive =
    filters.query.trim().length > 0 || categories.length > 0 || animations.length > 0 || styles.length > 0

  return (
    <div className="px-5 py-6 lg:px-8">
      {/* Header: count + removable active-filter chips */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <h2 className="text-lg font-bold text-white">Components</h2>
        <span className="rounded-full border border-line bg-surface px-2.5 py-0.5 font-mono text-[11px] text-mist">
          {items.length} / {ALL_COMPONENTS.length}
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {filters.query.trim() && <FilterChip label={`“${filters.query.trim()}”`} onClear={() => setQuery('')} />}
          {categories.map((c) => (
            <FilterChip key={c} label={CATEGORY_META[c].label} onClear={() => toggleCategory(c)} />
          ))}
          {animations.map((a) => (
            <FilterChip key={a} label={ANIMATION_META[a].label} onClear={() => toggleAnimation(a)} />
          ))}
          {styles.map((s) => (
            <FilterChip key={s} label={STYLE_META[s].label} onClear={() => toggleStyle(s)} />
          ))}
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 py-24 text-center">
          <p className="text-sm text-mist">No components match the current filters.</p>
          <button
            onClick={resetFilters}
            className="rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/10"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid gap-5 [grid-template-columns:repeat(auto-fill,minmax(290px,1fr))]">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <ComponentCard key={item.id} item={item} index={i} />
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Faint divider footer lives in App; this is the grid's own tail. */}
      {hasActive && items.length > 0 && (
        <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
          {items.length} of {ALL_COMPONENTS.length} patterns shown
        </p>
      )}
    </div>
  )
}

/** Small removable chip for an active constraint (query or facet value). */
function FilterChip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <button
      onClick={onClear}
      className="group/chip flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 py-1 pl-3 pr-2 text-[11px] font-medium text-white transition hover:bg-white/10"
    >
      {label}
      <XIcon className="h-3 w-3 opacity-60 transition group-hover/chip:opacity-100" />
    </button>
  )
}
