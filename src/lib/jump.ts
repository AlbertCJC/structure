import { useFilterStore } from '../store/useFilterStore'
import { applyFilters } from './filtering'

/**
 * Deep-link to a card from the Command Palette:
 *  1. If the current filter set would hide the target, reset filters first
 *     (never jump to a card that isn't rendered).
 *  2. Double rAF: let React commit the (possibly reset) grid before we
 *     measure the DOM.
 *  3. Smooth-scroll the card into the center of the viewport, then pulse a
 *     highlight ring for ~1.8s via `highlightId`.
 */
export function jumpToCard(id: string) {
  const store = useFilterStore.getState()
  const visible = applyFilters({
    query: store.query,
    categories: store.categories,
    animations: store.animations,
    styles: store.styles,
    sort: store.sort,
  })
  if (!visible.some((v) => v.id === id)) store.resetFilters()

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.querySelector(`[data-card-id="${id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      store.setHighlight(id)
      window.setTimeout(() => useFilterStore.getState().setHighlight(null), 1800)
    })
  })
}
