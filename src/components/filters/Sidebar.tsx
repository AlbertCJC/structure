import { useId, useMemo, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ALL_COMPONENTS } from '../../data/components'
import { ANIMATION_META, ANIMATION_ORDER, CATEGORY_META, CATEGORY_ORDER, STYLE_META, STYLE_ORDER } from '../../lib/constants'
import type { SortOrder } from '../../types'
import { selectActiveFilterCount, useFilterStore } from '../../store/useFilterStore'
import { ChevronDownIcon } from '../ui/Icons'
import { Pill } from './Pill'

const SORT_OPTIONS: { id: SortOrder; label: string }[] = [
  { id: 'popular', label: 'Popular' },
  { id: 'az', label: 'A–Z' },
  { id: 'za', label: 'Z–A' },
]

/**
 * Collapsible filter rail.
 *  • Desktop: animates its WIDTH (spring 240/30) — content stays a fixed
 *    288px so text never reflows mid-collapse.
 *  • Mobile (<lg): becomes a fixed overlay drawer under the top bar; the
 *    backdrop (rendered in App) closes it.
 * Every pill writes one store toggle; the grid re-renders independently via
 * its own selector — the sidebar never re-renders on grid-only changes.
 */
export function Sidebar() {
  const open = useFilterStore((s) => s.sidebarOpen)
  const categories = useFilterStore((s) => s.categories)
  const animations = useFilterStore((s) => s.animations)
  const styles = useFilterStore((s) => s.styles)
  const sort = useFilterStore((s) => s.sort)
  const activeCount = useFilterStore(selectActiveFilterCount)

  const toggleCategory = useFilterStore((s) => s.toggleCategory)
  const toggleAnimation = useFilterStore((s) => s.toggleAnimation)
  const toggleStyle = useFilterStore((s) => s.toggleStyle)
  const setSort = useFilterStore((s) => s.setSort)
  const resetFilters = useFilterStore((s) => s.resetFilters)

  // Per-category counts, computed once (the data set is static).
  const categoryCounts = useMemo(() => {
    const m = new Map<string, number>()
    for (const item of ALL_COMPONENTS) m.set(item.category, (m.get(item.category) ?? 0) + 1)
    return m
  }, [])

  return (
    <motion.aside
      initial={false}
      animate={{ width: open ? 288 : 0 }}
      transition={{ type: 'spring', stiffness: 240, damping: 30 }}
      className="relative z-30 shrink-0 overflow-hidden border-r border-line bg-panel/70 max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:top-16 max-lg:z-40 max-lg:shadow-[30px_0_60px_-30px_rgba(0,0,0,0.8)]"
    >
      <div className="flex h-full w-72 flex-col overflow-y-auto px-4 py-5">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.25em] text-fog">Refine</h2>
          <AnimatePresence>
            {activeCount > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={resetFilters}
                className="rounded-md border border-white/15 bg-white/5 px-2 py-1 text-[10px] font-semibold text-white transition hover:bg-white/10"
              >
                Reset ({activeCount})
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <SidebarSection title="Category" defaultOpen activeCount={categories.length}>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_ORDER.map((c) => (
              <Pill
                key={c}
                label={CATEGORY_META[c].label}
                active={categories.includes(c)}
                onClick={() => toggleCategory(c)}
                count={categoryCounts.get(c) ?? 0}
                dot={CATEGORY_META[c].dot}
              />
            ))}
          </div>
        </SidebarSection>

        <SidebarSection title="Motion engine" activeCount={animations.length}>
          <div className="flex flex-wrap gap-2">
            {ANIMATION_ORDER.map((a) => (
              <Pill
                key={a}
                mono
                label={ANIMATION_META[a].label}
                active={animations.includes(a)}
                onClick={() => toggleAnimation(a)}
                dot={ANIMATION_META[a].color}
              />
            ))}
          </div>
        </SidebarSection>

        <SidebarSection title="Style language" activeCount={styles.length}>
          <div className="flex flex-wrap gap-2">
            {STYLE_ORDER.map((s) => (
              <Pill
                key={s}
                label={STYLE_META[s].label}
                active={styles.includes(s)}
                onClick={() => toggleStyle(s)}
                dot={STYLE_META[s].swatch}
              />
            ))}
          </div>
        </SidebarSection>

        <SidebarSection title="Sort by" activeCount={sort === 'popular' ? 0 : 1}>
          <div className="grid grid-cols-3 gap-1 rounded-xl border border-line bg-surface/80 p-1">
            {SORT_OPTIONS.map((o) => (
              <button
                key={o.id}
                onClick={() => setSort(o.id)}
                className={`rounded-lg py-1.5 text-[11px] font-medium transition ${
                  sort === o.id ? 'bg-raise text-white shadow-sm' : 'text-fog hover:text-mist'
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </SidebarSection>

        <div className="mt-auto pt-6">
          <div className="rounded-xl border border-line bg-surface/60 p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">System</p>
            <p className="mt-2 text-[11px] leading-relaxed text-mist">
              {ALL_COMPONENTS.length} patterns indexed. Motion engines: Framer Motion, GSAP, CSS.
              Press <kbd className="kbd">⌘K</kbd> to jump anywhere.
            </p>
          </div>
        </div>
      </div>
    </motion.aside>
  )
}

/**
 * Accordion filter group — one section is open at a time by choice, not by
 * enforcement (each manages its own state). A collapsed group with active
 * selections shows a small count chip so filter state stays scannable
 * without expanding anything.
 */
function SidebarSection({
  title,
  children,
  defaultOpen = false,
  activeCount = 0,
}: {
  title: string
  children: ReactNode
  defaultOpen?: boolean
  activeCount?: number
}) {
  const [open, setOpen] = useState(defaultOpen)
  const panelId = useId()

  return (
    <div className="mb-4 border-t border-white/5 pt-4 first:mb-5 first:border-0 first:pt-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group flex w-full items-center justify-between py-0.5 text-left"
      >
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fog transition-colors group-hover:text-mist">
          {title}
        </h3>
        <span className="flex items-center gap-2">
          {activeCount > 0 && !open && (
            <span className="rounded-full border border-white/25 bg-white/10 px-1.5 py-px font-mono text-[9px] font-bold leading-none text-white">
              {activeCount}
            </span>
          )}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="text-fog transition-colors group-hover:text-mist"
          >
            <ChevronDownIcon className="h-3 w-3" />
          </motion.span>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
