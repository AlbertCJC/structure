import React from 'react'
import ReactDOM from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import App from './App'
import './index.css'
import { ALL_COMPONENTS } from './data/components'
import { loadDomain, type CatalogDomain } from './catalog/registry'

/**
 * Boot audit — proves that every catalog row maps to a live renderer.
 * Renderers are code-split per domain now, so each domain chunk is
 * resolved and its renderer keys checked; if a row is orphaned the
 * console names it instead of leaving you guessing which card is blank.
 */
async function auditRegistry() {
  const byDomain = new Map<CatalogDomain, string[]>()
  for (const c of ALL_COMPONENTS) {
    const dom = c.category as CatalogDomain
    byDomain.set(dom, [...(byDomain.get(dom) ?? []), c.id])
  }
  const unresolved: string[] = []
  await Promise.all(
    [...byDomain].map(async ([domain, ids]) => {
      try {
        const mod = await loadDomain(domain)
        for (const id of ids) if (!mod.renderers[id]) unresolved.push(id)
      } catch {
        unresolved.push(...ids)
      }
    }),
  )
  if (unresolved.length > 0) {
    console.error(
      `[structura] ${unresolved.length} catalog item(s) have no renderer in this session — reload the page to pull the current module graph:`,
      unresolved,
    )
  } else {
    console.info(`[structura] ✓ ${ALL_COMPONENTS.length} catalog items — all renderers resolved`)
  }
}
void auditRegistry()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* reducedMotion="user": honour the OS-level prefers-reduced-motion
        setting app-wide — framer flattens transform motion to opacity
        fades for users who ask for it. CSS keyframes are handled by the
        media-query block at the tail of index.css. */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </React.StrictMode>,
)
