import { useRef } from 'react'

/**
 * Glass Spotlight Card.
 *
 * Same zero-re-render trick as SpotlightInput: cursor position → CSS custom
 * properties → a radial-gradient highlight that follows the pointer across
 * the frosted panel. The highlight layer sits BEHIND the content (first
 * child, content is `relative`), so the glass tints the background, never
 * the text.
 */
export function GlassSpotlightCard() {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--mx', `${e.clientX - r.left}px`)
    el.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className="relative w-full max-w-[250px] overflow-hidden rounded-2xl border border-white/12 bg-white/[0.05] p-5 backdrop-blur-md"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), rgba(139,92,246,0.25), transparent 55%)',
        }}
      />
      <div className="relative flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-400 to-cyan-300" />
        <div>
          <p className="text-sm font-semibold text-white">Kai Nakamura</p>
          <p className="text-[11px] text-mist">Principal Engineer</p>
        </div>
      </div>
      <div className="relative mt-4 flex gap-2">
        <div className="h-8 flex-1 rounded-lg bg-white/[0.06]" />
        <div className="h-8 flex-1 rounded-lg bg-white/[0.06]" />
      </div>
    </div>
  )
}
