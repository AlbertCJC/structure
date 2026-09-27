import { Component, Suspense, lazy, type ComponentType, type ErrorInfo, type ReactNode } from 'react'
import { ALL_COMPONENTS } from '../data/components'

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Domain code-splitting
 *
 *  Every domain (buttons, loaders, …) is its own Vite chunk, fetched on
 *  demand. Each catalog id gets a `React.lazy` wrapper whose dynamic
 *  import resolves to that id's demo inside its DOMAIN chunk — Vite
 *  dedupes import() calls by path, so 49 buttons ride in a single
 *  `buttons/*.js` request, not 49.
 *
 *  Shape contract each domain index fulfils: two records keyed by id —
 *  `<domain>Renderers` (live components) and `<domain>Sources` (?raw text).
 *  Adding a component = one entry in its domain index + one metadata row
 *  in the matching src/data/domains file.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export interface DomainModule {
  renderers: Record<string, ComponentType>
  sources: Record<string, string>
}

const DOMAIN_LOADERS = {
  buttons: () => import('./buttons').then((m) => ({ renderers: m.buttonRenderers, sources: m.buttonSources })),
  loaders: () => import('./loaders').then((m) => ({ renderers: m.loaderRenderers, sources: m.loaderSources })),
  toggles: () => import('./toggles').then((m) => ({ renderers: m.toggleRenderers, sources: m.toggleSources })),
  navigation: () => import('./navigation').then((m) => ({ renderers: m.navRenderers, sources: m.navSources })),
  forms: () => import('./forms').then((m) => ({ renderers: m.formRenderers, sources: m.formSources })),
  feedback: () => import('./feedback').then((m) => ({ renderers: m.feedbackRenderers, sources: m.feedbackSources })),
  layout: () => import('./layout').then((m) => ({ renderers: m.layoutRenderers, sources: m.layoutSources })),
  data: () => import('./data').then((m) => ({ renderers: m.dataRenderers, sources: m.dataSources })),
  overlay: () => import('./overlay').then((m) => ({ renderers: m.overlayRenderers, sources: m.overlaySources })),
  typography: () => import('./typography').then((m) => ({ renderers: m.typographyRenderers, sources: m.typographySources })),
} satisfies Record<string, () => Promise<DomainModule>>

export type CatalogDomain = keyof typeof DOMAIN_LOADERS

/**
 * Shared per-domain promise — Vite's import() already fetches each chunk
 * once, but caching the *normalized* promise also skips re-running the
 * shape adapter for every card and every source lookup.
 */
const domainPromises = {} as Partial<Record<CatalogDomain, Promise<DomainModule>>>
export function loadDomain(domain: CatalogDomain): Promise<DomainModule> {
  const cached = domainPromises[domain]
  if (cached) return cached
  const pending = DOMAIN_LOADERS[domain]()
  domainPromises[domain] = pending
  return pending
}

/**
 * id → lazy renderer, derived from the catalog rows themselves so the map
 * can never drift: a row whose category has no domain simply gets no entry
 * (the boot audit in main.tsx will name it).
 */
export const RENDERERS: Record<string, ComponentType> = {}
for (const c of ALL_COMPONENTS) {
  const domain = c.category as CatalogDomain
  if (!DOMAIN_LOADERS[domain]) continue
  RENDERERS[c.id] = lazy(async () => {
    const mod = await loadDomain(domain)
    const demo = mod.renderers[c.id]
    if (!demo) throw new Error(`no renderer for "${c.id}" in the ${domain} domain`)
    return { default: demo }
  }) as ComponentType
}

export function CatalogRenderer({ id }: { id: string }) {
  const C = RENDERERS[id]
  if (!C) {
    return (
      <div className="flex flex-col items-center gap-3 p-6 text-center">
        <p className="max-w-[26ch] text-xs leading-relaxed text-fog">
          “{id}” isn’t in the catalog — a catalog row is missing its category mapping.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg border border-line bg-raise/80 px-3 py-1.5 text-[11px] font-medium text-white transition hover:border-white/25 hover:bg-raise active:scale-95"
        >
          ⟳ Reload app
        </button>
      </div>
    )
  }
  return (
    <DemoBoundary id={id}>
      <Suspense fallback={<DemoSkeleton />}>
        <C />
      </Suspense>
    </DemoBoundary>
  )
}

/** Placeholder while a domain chunk is in flight — three quiet pulses.
 *  Also used by the grid as the IntersectionObserver pre-mount fallback. */
export function DemoSkeleton() {
  return (
    <div className="grid h-full min-h-[72px] place-items-center p-6" aria-label="Loading demo">
      <span className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-pulse rounded-full bg-white/25"
            style={{ animationDelay: `${i * 140}ms` }}
          />
        ))}
      </span>
    </div>
  )
}

/**
 * Per-demo error boundary — if a live component throws at runtime (e.g. a
 * browser-only API) or its chunk fails, only ITS sandbox shows the
 * fallback; the rest of the grid keeps running.
 */
class DemoBoundary extends Component<{ id: string; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(`[structura] demo "${this.props.id}" crashed:`, error, info.componentStack)
  }
  render() {
    if (this.state.failed) {
      return (
        <div className="p-6 text-center text-xs text-fog">
          ⚠ demo “{this.props.id}” errored — check console
        </div>
      )
    }
    return this.props.children
  }
}
