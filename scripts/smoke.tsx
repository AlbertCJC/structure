/**
 * Runtime smoke test — server-renders EVERY registered demo so any
 * component that crashes at render time (missing renderer, bad JSX,
 * browser-only API hit during render) is caught before the user sees it.
 *
 *   npx vite-node scripts/smoke.tsx
 *
 * (vite-node runs it through the real Vite pipeline, so `?raw` imports in
 * the domain index files resolve exactly as they do in the app. Domains
 * are code-split in the app — here we await each loader and render the
 * resolved components directly, bypassing the React.lazy wrappers.)
 */
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { loadDomain, type CatalogDomain } from '../src/catalog/registry'
import { ALL_COMPONENTS } from '../src/data/components'

// 1 — group catalog rows by domain, then await each domain chunk
const byDomain = new Map<string, string[]>()
for (const c of ALL_COMPONENTS) {
  byDomain.set(c.category, [...(byDomain.get(c.category) ?? []), c.id])
}

let failed = 0
let rendered = 0
let sourced = 0

for (const [domain, ids] of byDomain) {
  let mod
  try {
    mod = await loadDomain(domain as CatalogDomain)
  } catch (e) {
    console.error(`CRASH domain ${domain} — ${(e as Error).message}`)
    failed += ids.length
    continue
  }
  for (const id of ids) {
    const C = mod.renderers[id]
    if (!C) {
      failed++
      console.error(`MISSING ${id} — no renderer in ${domain} domain`)
      continue
    }
    try {
      const html = renderToString(createElement(C))
      if (!html || html.length < 10) {
        failed++
        console.error(`EMPTY ${id} — rendered suspiciously little markup`)
      } else {
        rendered++
        console.log(`OK    ${id}`)
      }
    } catch (e) {
      failed++
      console.error(`CRASH ${id} — ${(e as Error).message}`)
    }
    // 2 — every id must also offer its raw source
    if (mod.sources[id] && mod.sources[id].length > 40) {
      sourced++
    } else {
      failed++
      console.error(`NOSOURCE ${id} — missing raw source`)
    }
  }
}

console.log('')
console.log(
  `renderers: ${rendered} · catalog rows: ${ALL_COMPONENTS.length} · sources: ${sourced} · failures: ${failed}`,
)
process.exit(failed === 0 ? 0 : 1)
