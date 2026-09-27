import { ALL_COMPONENTS } from '../data/components'
import { loadDomain, type CatalogDomain } from './registry'

/**
 * On-demand raw source for the modal's "source · typescript" panel and
 * "Copy source".
 *
 * Sources travel with the domain chunk (domain index files import each
 * demo with Vite's `?raw` suffix), so nothing is fetched here that the
 * card's live demo didn't already pull — the promise resolves from Vite's
 * module cache. Loading still goes through an async loader so the modal
 * can show a skeleton instead of blocking first paint for ~900 kB of
 * text it may never be asked to display.
 *
 * The clipboard always receives exactly the source you are looking at —
 * no hand-maintained snippet strings that drift from the live demo.
 */
export const SOURCE_LOADERS: Record<string, () => Promise<string>> = {}

for (const c of ALL_COMPONENTS) {
  const domain = c.category as CatalogDomain
  SOURCE_LOADERS[c.id] = async () => {
    try {
      const mod = await loadDomain(domain)
      return mod.sources[c.id] ?? `// source unavailable for "${c.id}"`
    } catch {
      return `// "${c.id}" source failed to load — check the browser console`
    }
  }
}

/** Fetch (and cache, via the domain promise) the raw source for one id. */
export function loadSource(id: string): Promise<string> {
  return SOURCE_LOADERS[id]?.() ?? Promise.resolve(`// no source loader for "${id}"`)
}
