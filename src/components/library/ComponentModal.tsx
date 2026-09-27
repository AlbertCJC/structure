import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useShallow } from 'zustand/react/shallow'
import { CatalogRenderer } from '../../catalog/registry'
import { loadSource } from '../../catalog/sources'
import { ALL_COMPONENTS } from '../../data/components'
import { CATEGORY_META } from '../../lib/constants'
import { applyFilters, type FilterSlice } from '../../lib/filtering'
import { isTypingTarget } from '../../lib/hotkeys'
import { copyText } from '../../lib/clipboard'
import { useFilterStore } from '../../store/useFilterStore'
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, CopyIcon, XIcon } from '../ui/Icons'

/** Canonical hash form for a deep-linked component. */
const hashFor = (id: string) => `#${id}`

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ComponentModal — the click-to-expand source viewer.
 *
 *  Behaviour contract:
 *   • Open state = `selectedId` in the filter store, so any card can open
 *     it; the modal looks up the full catalog row itself.
 *   • BROWSING: while open, ←/→ (or the header chevrons, always visible)
 *     step through the CURRENT filter pipeline result — exactly the card
 *     order the grid shows. Wraps at both ends, and an "n / total" counter
 *     keeps you oriented.
 *   • DEEP LINKS: the open component is mirrored to `location.hash` so any
 *     view is a shareable URL (App restores it on boot). replaceState, not
 *     pushState — browsing siblings must not pollute the back stack.
 *   • ESC and backdrop clicks close; body scroll locks while open.
 *   • The code panel is the ACTUAL source (Vite ?raw — byte-identical to
 *     the running demo), loaded lazily with the domain chunk; Copy writes
 *     the same payload to the clipboard once loaded.
 *   • The live stage mounts a SECOND independent instance of the demo —
 *     the card's instance keeps running untouched behind the backdrop.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export function ComponentModal() {
  const selectedId = useFilterStore((s) => s.selectedId)
  const selectComponent = useFilterStore((s) => s.selectComponent)
  // Same five-field slice the grid consumes → siblings mirror the grid order.
  const filters = useFilterStore(
    useShallow((s): FilterSlice => ({
      query: s.query,
      categories: s.categories,
      animations: s.animations,
      styles: s.styles,
      sort: s.sort,
    })),
  )
  const item = ALL_COMPONENTS.find((c) => c.id === selectedId)
  const id = item?.id ?? null

  const siblings = useMemo(() => applyFilters(filters), [filters])
  const index = item ? siblings.findIndex((s) => s.id === item.id) : -1
  const total = siblings.length
  const step = (dir: 1 | -1) => {
    if (total === 0) return
    const next = index === -1 ? 0 : (index + dir + total) % total
    selectComponent(siblings[next].id)
  }

  // Source arrives with the (already-cached) domain chunk; keep it in state.
  const [source, setSource] = useState<string | null>(null)
  useEffect(() => {
    if (!id) {
      setSource(null)
      return
    }
    let live = true
    setSource(null)
    void loadSource(id).then((s) => {
      if (live) setSource(s)
    })
    return () => {
      live = false
    }
  }, [id])

  // Deep-link sync: keep `#<id>` in the address bar while open, clear on close.
  useEffect(() => {
    if (!id) return
    if (window.location.hash !== hashFor(id)) {
      history.replaceState(null, '', hashFor(id))
    }
    return () => {
      if (window.location.hash === hashFor(id)) {
        history.replaceState(null, '', window.location.pathname + window.location.search)
      }
    }
  }, [id])

  // ESC close + ←/→ sibling stepping + scroll lock, active only while open.
  useEffect(() => {
    if (!selectedId) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        selectComponent(null)
        return
      }
      if (isTypingTarget(e.target)) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        step(-1)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        step(1)
      }
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
    // step closes over siblings/index — the deps below keep it fresh.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, selectComponent, index, total])

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="component-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16 }}
        >
          <div className="absolute inset-0 bg-void/85 backdrop-blur-sm" onClick={() => selectComponent(null)} />

          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 340, damping: 30 }}
            className="relative flex max-h-[86vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/12 bg-panel"
          >
            {/* ── Header: identity + browse/copy/close ────────────────── */}
            <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
              <div className="min-w-0">
                <h2 className="truncate text-base font-bold text-white">{item.title}</h2>
                <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-mist">{item.description}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {/* ← / n / → — walking the filtered grid order */}
                <div className="flex items-center gap-0.5 rounded-lg border border-line px-1 py-1">
                  <button
                    onClick={() => step(-1)}
                    disabled={total < 2}
                    aria-label="Previous component"
                    title="Previous (←)"
                    className="rounded-md p-1 text-mist transition hover:bg-raise hover:text-white disabled:opacity-30"
                  >
                    <ChevronLeftIcon className="h-3.5 w-3.5" />
                  </button>
                  <span className="min-w-[3.5rem] text-center font-mono text-[10px] tabular-nums text-fog">
                    {index === -1 ? '—' : `${index + 1} / ${total}`}
                  </span>
                  <button
                    onClick={() => step(1)}
                    disabled={total < 2}
                    aria-label="Next component"
                    title="Next (→)"
                    className="rounded-md p-1 text-mist transition hover:bg-raise hover:text-white disabled:opacity-30"
                  >
                    <ChevronRightIcon className="h-3.5 w-3.5" />
                  </button>
                </div>
                <CopyButton source={source} />
                <button
                  onClick={() => selectComponent(null)}
                  aria-label="Close"
                  className="rounded-lg border border-line p-2 text-mist transition hover:border-white/30 hover:text-white"
                >
                  <XIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* ── Body: live demo (left) · source (right) ─────────────── */}
            <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
              <div className="border-b border-line lg:border-b-0 lg:border-r">
                <div className="sandbox-grid relative flex h-64 items-center justify-center lg:h-full lg:min-h-[340px]">
                  <CatalogRenderer id={item.id} />
                  <span className="pointer-events-none absolute left-3 top-3 rounded-md border border-white/10 bg-void/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-mist backdrop-blur">
                    live
                  </span>
                </div>
              </div>
              <div className="flex min-h-0 flex-col">
                <div className="flex items-center justify-between border-b border-line px-4 py-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog">source · typescript</span>
                  <span className="font-mono text-[10px] text-fog">
                    {source === null ? 'loading…' : `${source.split('\n').length} lines`}
                  </span>
                </div>
                <pre className="max-h-[48vh] flex-1 overflow-auto p-4 font-mono text-[11px] leading-relaxed text-slate-300 lg:max-h-[52vh]">
                  {source === null ? (
                    <span className="block animate-pulse text-fog">// loading source…</span>
                  ) : (
                    <code>{source}</code>
                  )}
                </pre>
              </div>
            </div>

            {/* ── Footer: tags + hints ────────────────────────────────── */}
            <div className="flex flex-wrap items-center gap-2 border-t border-line px-5 py-2.5 font-mono text-[10px] text-fog">
              <span
                className="rounded-full px-2 py-0.5 font-medium text-white"
                style={{
                  background: `${CATEGORY_META[item.category].dot}1f`,
                  border: `1px solid ${CATEGORY_META[item.category].dot}40`,
                }}
              >
                {CATEGORY_META[item.category].label}
              </span>
              {item.animations.map((a) => (
                <span key={a} className="rounded-full border border-line px-2 py-0.5">
                  {a}
                </span>
              ))}
              <span className="ml-auto hidden items-center gap-1.5 sm:flex">
                <kbd className="kbd">←</kbd>
                <kbd className="kbd">→</kbd> browse · <kbd className="kbd">esc</kbd> close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** Clipboard action with a brief check success state. Receives the
 *  already-loaded source text — disabled until the chunk resolves. */
function CopyButton({ source }: { source: string | null }) {
  const [copied, setCopied] = useState(false)
  const onCopy = async () => {
    if (!source) return
    const ok = await copyText(source)
    if (ok) {
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    }
  }
  return (
    <button
      onClick={onCopy}
      disabled={!source}
      className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-[11px] font-semibold text-black transition hover:bg-white/85 active:scale-95 disabled:opacity-60"
    >
      {copied ? <CheckIcon className="h-3.5 w-3.5" /> : <CopyIcon className="h-3.5 w-3.5" />}
      {copied ? 'Copied' : 'Copy source'}
    </button>
  )
}
