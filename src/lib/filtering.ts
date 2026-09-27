import { ALL_COMPONENTS } from '../data/components'
import type { AnimationType, Category, LibraryComponent, SortOrder, StyleApproach } from '../types'
import { CATEGORY_META } from './constants'
import { fuzzyMatchAll } from './fuzzy'

/** The exact slice of store state the grid pipeline consumes. */
export interface FilterSlice {
  query: string
  categories: Category[]
  animations: AnimationType[]
  styles: StyleApproach[]
  sort: SortOrder
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Pure filter pipeline — no React, no store access, trivially unit-testable.
 *
 *  Semantics:
 *   • Within a facet → OR.  (categories: [buttons, loaders] keeps both)
 *   • Across facets  → AND. (buttons AND spring AND glassmorphism)
 *   • A facet with zero selections imposes no constraint.
 *   • The query is fuzzy: it scores title, tags, description and the
 *     category label. When a query is present, results are re-sorted by
 *     relevance (score desc); otherwise the active SortOrder applies.
 *
 *  Returns a NEW array every call; the grid memoizes it against the
 *  selected slice so unrelated store changes (palette open, sidebar width)
 *  never re-run the pipeline.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function applyFilters(f: FilterSlice): LibraryComponent[] {
  const q = f.query.trim()

  const scored = ALL_COMPONENTS.flatMap((item) => {
    // 1 — fuzzy relevance gate (only when a query exists)
    let score = 0
    if (q) {
      score = fuzzyMatchAll(q, [
        item.title,
        item.tags.join(' '),
        item.description,
        CATEGORY_META[item.category].label,
      ])
      if (score < 0) return [] // hard miss
    }
    // 2 — facet gates (OR within, AND across)
    if (f.categories.length > 0 && !f.categories.includes(item.category)) return []
    if (f.animations.length > 0 && !f.animations.some((a) => item.animations.includes(a))) return []
    if (f.styles.length > 0 && !f.styles.some((s) => item.styles.includes(s))) return []
    return [{ item, score }]
  })

  // 3 — ordering
  if (q) {
    scored.sort((a, b) => b.score - a.score || b.item.popularity - a.item.popularity)
  } else if (f.sort === 'az') {
    scored.sort((a, b) => a.item.title.localeCompare(b.item.title))
  } else if (f.sort === 'za') {
    scored.sort((a, b) => b.item.title.localeCompare(a.item.title))
  } else {
    scored.sort((a, b) => b.item.popularity - a.item.popularity)
  }

  return scored.map((r) => r.item)
}
