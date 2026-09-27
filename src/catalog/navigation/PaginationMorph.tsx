import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Sliding Pagination — the active pill is one layoutId element gliding
 * between number buttons (spring 420/32). Prev/Next guard the bounds;
 * disabled state drops opacity instead of hiding (no layout shift).
 */
export function PaginationMorph() {
  const [page, setPage] = useState(3)
  const PAGES = [1, 2, 3, 4, 5]

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <div className="flex items-center gap-1 rounded-xl border border-line bg-panel p-1.5">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="grid h-8 w-8 place-items-center rounded-lg text-mist transition hover:text-white disabled:opacity-30"
          aria-label="Previous page"
        >
          ‹
        </button>
        {PAGES.map((n) => (
          <button key={n} onClick={() => setPage(n)} className="relative grid h-8 w-8 place-items-center rounded-lg text-xs">
            {page === n && (
              <motion.span
                layoutId="page-pill"
                className="absolute inset-0 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500"
                transition={{ type: 'spring', stiffness: 420, damping: 32 }}
              />
            )}
            <span className={`relative z-10 font-mono ${page === n ? 'font-bold text-white' : 'text-mist'}`}>{n}</span>
          </button>
        ))}
        <button
          onClick={() => setPage((p) => Math.min(5, p + 1))}
          disabled={page === 5}
          className="grid h-8 w-8 place-items-center rounded-lg text-mist transition hover:text-white disabled:opacity-30"
          aria-label="Next page"
        >
          ›
        </button>
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-fog">page {page} of 5</span>
    </div>
  )
}
