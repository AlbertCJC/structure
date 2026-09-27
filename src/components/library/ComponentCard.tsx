import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { CatalogRenderer, DemoSkeleton } from '../../catalog/registry'
import { CATEGORY_META } from '../../lib/constants'
import { useFilterStore } from '../../store/useFilterStore'
import { ViewportMount } from '../ui/ViewportMount'
import type { LibraryComponent } from '../../types'
import { ExpandIcon } from '../ui/Icons'

interface ComponentCardProps {
  item: LibraryComponent
  /** Position in the CURRENTLY filtered list — drives the enter stagger. */
  index: number
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Uniform directory card — flat, monochrome, ONE fixed size for all items.
 *
 *  Interaction contract (important):
 *   • The sandbox stays fully INTERACTIVE — demos need clicks (OTP inputs,
 *     toggles, hold buttons), so the card body is never a modal trigger.
 *   • Expansion lives on the METADATA BAR (whole bottom strip is a click /
 *     Enter target) and on the hover-only corner button in the sandbox.
 *     Either opens ComponentModal with the demo + full source.
 *
 *  Motion: layout-driven spring reposition unchanged — filters still make
 *  cards glide between grid slots. Tilt + cursor-gradient-ring removed for
 *  the flat system.
 *
 *  forwardRef is REQUIRED: the grid's AnimatePresence popLayout measures
 *  its direct child via a ref.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const ComponentCard = forwardRef<HTMLElement, ComponentCardProps>(function ComponentCard({ item, index }, ref) {
  const highlighted = useFilterStore((s) => s.highlightId === item.id)
  const selectComponent = useFilterStore((s) => s.selectComponent)
  const cat = CATEGORY_META[item.category]
  const open = () => selectComponent(item.id)

  return (
    <motion.article
      ref={ref}
      layout
      data-card-id={item.id}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.14, ease: 'easeIn' } }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, delay: Math.min(index * 0.03, 0.4) }}
      // cv-auto: content-visibility render-culling — at 300+ cards this is
      // what keeps the grid at 60fps (see index.css).
      className="group cv-auto"
    >
      <div
        className={`relative flex h-full flex-col overflow-hidden rounded-xl border bg-surface transition-colors duration-200 ${
          highlighted ? 'border-white/70 shadow-[0_0_0_3px_rgba(255,255,255,0.12)]' : 'border-line hover:border-white/25'
        }`}
      >
        {/* ── Live sandbox — interactive; NOT a modal trigger ─────────── */}
        <div className="sandbox-grid relative flex h-52 items-center justify-center overflow-hidden">
          {/* Demos mount on approach to the viewport (fetching their domain
              chunk then) — first paint stays light at 400+ live sandboxes. */}
          <ViewportMount fallback={<DemoSkeleton />}>
            <CatalogRenderer id={item.id} />
          </ViewportMount>
          <span className="pointer-events-none absolute left-3 top-3 rounded-md border border-white/10 bg-void/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-mist backdrop-blur">
            {cat.label}
          </span>
          <button
            onClick={open}
            aria-label={`Expand ${item.title}`}
            className="absolute right-3 top-3 rounded-md border border-white/15 bg-void/70 p-1.5 text-mist opacity-0 backdrop-blur transition hover:border-white/40 hover:text-white focus:opacity-100 group-focus-within:opacity-100 group-hover:opacity-100"
          >
            <ExpandIcon className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* ── Metadata bar — the click-to-expand target ───────────────── */}
        <div
          role="button"
          tabIndex={0}
          onClick={open}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              open()
            }
          }}
          aria-label={`View source for ${item.title}`}
          className="flex flex-1 cursor-pointer flex-col gap-1.5 border-t border-line p-4 transition-colors hover:bg-raise/40 focus:outline-none focus-visible:bg-raise/40"
        >
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="truncate text-[15px] font-semibold text-white">{item.title}</h3>
            <span className="shrink-0 font-mono text-[10px] text-fog transition-colors group-hover:text-mist">&lt;/&gt;</span>
          </div>
          <p className="line-clamp-2 text-xs leading-relaxed text-mist">{item.description}</p>

          {/* Auto-generated tags: category chip + motion engines */}
          <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-1.5">
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-medium text-white"
              style={{ background: `${cat.dot}1f`, border: `1px solid ${cat.dot}40` }}
            >
              {cat.label}
            </span>
            {item.animations.map((a) => (
              <span key={a} className="rounded-full border border-line bg-raise/70 px-2 py-0.5 font-mono text-[10px] text-fog">
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  )
})
