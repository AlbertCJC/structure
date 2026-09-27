import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sidebar } from './components/filters/Sidebar'
import { CommandPalette } from './components/layout/CommandPalette'
import { TopBar } from './components/layout/TopBar'
import { ComponentGrid } from './components/library/ComponentGrid'
import { ComponentModal } from './components/library/ComponentModal'
import { ALL_COMPONENTS } from './data/components'
import { useFilterStore } from './store/useFilterStore'

/**
 * App shell — flat, monochrome structure. No ambient glows, no gradients:
 * the layout is the directory, the live components are the only content.
 *
 *   ┌───────────────────── TopBar (wordmark, ⌘K, mono toggle) ──────────┐
 *   │ Sidebar (filters) │  Main scroll region (grid + footer)            │
 *   └───────────────────┴────────────────────────────────────────────────┘
 *   + CommandPalette (⌘K) + ComponentModal (click-to-expand source view)
 *   + mobile sidebar backdrop
 *
 * `mono` wraps the whole app in a CSS grayscale filter — the strict
 * black-and-white preview for the demo sandboxes.
 */
export default function App() {
  const sidebarOpen = useFilterStore((s) => s.sidebarOpen)
  const toggleSidebar = useFilterStore((s) => s.toggleSidebar)
  const mono = useFilterStore((s) => s.mono)

  /**
   * Deep-link boot: `#<component-id>` opens that component's source modal.
   * One-shot on mount; the modal keeps the hash in sync from there.
   */
  useEffect(() => {
    const id = window.location.hash.slice(1)
    if (id && ALL_COMPONENTS.some((c) => c.id === id)) {
      useFilterStore.getState().selectComponent(id)
    }
  }, [])

  return (
    <div className={`flex h-screen flex-col overflow-hidden bg-void text-slate-200 ${mono ? 'grayscale' : ''}`}>
      <TopBar />

      {/* NOTE: no z-index here — the mobile drawer (z-40) and its blur
          backdrop (z-30) must resolve against the ROOT stacking context so
          the drawer paints above the backdrop. A z on this wrapper would
          trap drawer's z-40 below the backdrop. */}
      <div className="relative flex min-h-0 flex-1">
        <Sidebar />
        <main className="relative min-w-0 flex-1 overflow-y-auto">
          <ComponentGrid />
          <footer className="mt-4 border-t border-line px-6 py-5 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-fog">
            Structura — React 18 · Framer Motion · GSAP · Zustand · Tailwind
          </footer>
        </main>
      </div>

      {/* Mobile backdrop — the sidebar is a fixed drawer below lg */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            key="sb-backdrop"
            className="fixed inset-0 z-30 bg-void/70 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      <CommandPalette />
      <ComponentModal />
    </div>
  )
}
