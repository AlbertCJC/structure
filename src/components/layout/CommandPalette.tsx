import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ALL_COMPONENTS } from '../../data/components'
import { CATEGORY_META } from '../../lib/constants'
import { fuzzyMatchAll } from '../../lib/fuzzy'
import { isTypingTarget } from '../../lib/hotkeys'
import { jumpToCard } from '../../lib/jump'
import { useFilterStore } from '../../store/useFilterStore'
import type { Category } from '../../types'
import { SearchIcon } from '../ui/Icons'

interface Result {
  id: string
  title: string
  category: Category
  tags: string[]
  score: number
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Command Palette (⌘K / Ctrl+K, plus "/" when not typing in a field).
 *
 *  State logic:
 *   • The input is bound DIRECTLY to `query` in the filter store — so every
 *     keystroke re-runs the grid's pipeline in real time (visible through
 *     the blurred backdrop). The palette only owns `active` (cursor row),
 *     which is transient and local.
 *   • Results are ranked by fuzzyMatchAll across title / tags / description
 *     / category label; an empty query shows the top of the catalog.
 *   • Enter (or click) closes the palette and calls jumpToCard, which resets
 *     filters if they would hide the target, scrolls it into view, and
 *     pulses a highlight ring.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function CommandPalette() {
  const open = useFilterStore((s) => s.paletteOpen)
  const setOpen = useFilterStore((s) => s.setPaletteOpen)
  const query = useFilterStore((s) => s.query)
  const setQuery = useFilterStore((s) => s.setQuery)
  const [active, setActive] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)

  // Global keyboard binding — reads the store via getState() inside the
  // handler so the listener itself never needs re-attaching.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const st = useFilterStore.getState()
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        st.setPaletteOpen(!st.paletteOpen)
        // Never let the source modal stack with the palette.
        st.selectComponent(null)
      } else if (e.key === '/' && !isTypingTarget(e.target) && !st.paletteOpen) {
        e.preventDefault()
        st.setPaletteOpen(true)
      } else if (e.key === 'Escape' && st.paletteOpen) {
        st.setPaletteOpen(false)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Fresh, empty query every time the palette opens.
  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
    }
  }, [open, setQuery])

  const results = useMemo<Result[]>(() => {
    const withScore = ALL_COMPONENTS.map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      tags: item.tags,
      score: query.trim()
        ? fuzzyMatchAll(query, [
            item.title,
            item.tags.join(' '),
            item.description,
            CATEGORY_META[item.category].label,
          ])
        : 1,
    }))
    return withScore.filter((r) => r.score > 0).sort((a, b) => b.score - a.score).slice(0, 8)
  }, [query])

  // New query → cursor back to the top hit.
  useEffect(() => {
    setActive(0)
  }, [results])

  // Keep the active row inside the visible list area.
  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${active}"]`)?.scrollIntoView({ block: 'nearest' })
  }, [active])

  const select = (id: string) => {
    setOpen(false)
    jumpToCard(id)
  }

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter' && results[active]) {
      select(results[active].id)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="palette"
          className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="absolute inset-0 bg-void/70 backdrop-blur-sm" onClick={() => setOpen(false)} />

          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-panel shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)]"
          >
            <div className="flex items-center gap-3 border-b border-line px-4">
              <SearchIcon className="h-4 w-4 shrink-0 text-fog" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Fuzzy-search the catalog — try “glitch”, “gsap scroll”, “toast swipe”…"
                className="h-14 w-full bg-transparent text-sm text-white placeholder:text-fog focus:outline-none"
              />
              <kbd className="kbd shrink-0">esc</kbd>
            </div>

            <div ref={listRef} className="max-h-[340px] overflow-y-auto p-2">
              {results.length === 0 && (
                <p className="px-4 py-10 text-center text-sm text-fog">Nothing matches “{query}”. Try a broader term.</p>
              )}
              {results.map((r, i) => {
                const meta = CATEGORY_META[r.category]
                return (
                  <button
                    key={r.id}
                    data-idx={i}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => select(r.id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                      i === active ? 'bg-white/10' : 'hover:bg-white/5'
                    }`}
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: meta.dot }} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-white">{r.title}</span>
                      <span className="block truncate text-[11px] text-fog">{r.tags.join(' · ')}</span>
                    </span>
                    <span className="shrink-0 rounded-md border border-line bg-surface px-2 py-0.5 text-[10px] text-mist">
                      {meta.label}
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 text-[10px] text-fog">
              <span className="flex items-center gap-1.5">
                <kbd className="kbd">↑</kbd>
                <kbd className="kbd">↓</kbd> navigate
              </span>
              <span className="flex items-center gap-1.5">
                <kbd className="kbd">↵</kbd> jump to card
              </span>
              <span className="ml-auto font-mono">
                {results.length} / {ALL_COMPONENTS.length}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
