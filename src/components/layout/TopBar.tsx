import { ALL_COMPONENTS } from '../../data/components'
import { useFilterStore } from '../../store/useFilterStore'
import { MenuIcon, SearchIcon } from '../ui/Icons'

/**
 * Top bar — typography-only identity, the ⌘K search trigger, the catalog
 * count, and the MONO toggle (grayscale preview across the whole app).
 * No logo mark, no avatar: decoration removed, structure only.
 */
export function TopBar() {
  const toggleSidebar = useFilterStore((s) => s.toggleSidebar)
  const setPaletteOpen = useFilterStore((s) => s.setPaletteOpen)
  const query = useFilterStore((s) => s.query)
  const mono = useFilterStore((s) => s.mono)
  const toggleMono = useFilterStore((s) => s.toggleMono)

  return (
    <header className="relative z-40 flex h-16 shrink-0 items-center gap-3 border-b border-line bg-abyss/85 px-4 backdrop-blur-md">
      <button
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        className="rounded-lg border border-line p-2 text-mist transition hover:border-white/25 hover:text-white"
      >
        <MenuIcon className="h-4 w-4" />
      </button>

      <div className="leading-tight">
        <p className="text-sm font-extrabold tracking-[0.22em] text-white">STRUCTURA</p>
        <p className="text-[9px] uppercase tracking-[0.34em] text-fog">component laboratory</p>
      </div>

      {/* Search trigger (desktop) — echoes the live query once you start typing */}
      <button
        onClick={() => setPaletteOpen(true)}
        className="group ml-2 hidden h-10 flex-1 items-center gap-3 rounded-xl border border-line bg-surface/60 px-4 text-left text-[13px] transition hover:border-white/20 hover:bg-surface md:flex lg:max-w-md"
      >
        <SearchIcon className="h-4 w-4 shrink-0 opacity-70 group-hover:opacity-100" />
        <span className={`truncate ${query.trim() ? 'text-white' : 'text-fog'}`}>
          {query.trim() ? `“${query.trim()}” — filtering live` : 'Search components, tags, patterns…'}
        </span>
        <span className="ml-auto flex shrink-0 gap-1">
          <kbd className="kbd">⌘</kbd>
          <kbd className="kbd">K</kbd>
        </span>
      </button>

      {/* Search trigger (mobile) */}
      <button
        onClick={() => setPaletteOpen(true)}
        aria-label="Search"
        className="rounded-lg border border-line p-2 text-mist transition hover:text-white md:hidden"
      >
        <SearchIcon className="h-4 w-4" />
      </button>

      <div className="ml-auto flex items-center gap-3 md:ml-0">
        <button
          onClick={toggleMono}
          aria-pressed={mono}
          title="Grayscale-preview every demo"
          className={`rounded-lg border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition ${
            mono ? 'border-white bg-white text-black' : 'border-line text-mist hover:border-white/25 hover:text-white'
          }`}
        >
          Mono
        </button>
        <span className="hidden rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[11px] text-mist sm:block">
          {ALL_COMPONENTS.length} components
        </span>
      </div>
    </header>
  )
}
