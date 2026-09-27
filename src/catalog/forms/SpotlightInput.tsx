import { useRef } from 'react'

/**
 * Spotlight Field.
 *
 * Zero React re-renders on mouse-move: the cursor position is written
 * straight to CSS custom properties (--sx/--sy) on the wrapper, and the
 * .spot-input background radial-gradient reads them. The browser recomputes
 * one background on the compositor-cheap path; React never re-renders.
 * The floating label is pure CSS (peer-focus + :placeholder-shown).
 */
export function SpotlightInput() {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--sx', `${e.clientX - r.left}px`)
    el.style.setProperty('--sy', `${e.clientY - r.top}px`)
  }

  return (
    <div ref={ref} onMouseMove={onMove} className="spot-input w-full max-w-[250px] rounded-xl">
      <input
        id="spot-input"
        type="text"
        placeholder=" "
        autoComplete="off"
        className="peer h-12 w-full rounded-xl bg-transparent pl-4 pr-3 text-sm text-white outline-none"
      />
      <label
        htmlFor="spot-input"
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xs text-fog transition-all duration-200 peer-focus:top-2.5 peer-focus:text-[9px] peer-focus:uppercase peer-focus:tracking-[0.2em] peer-focus:text-violet-300 peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:tracking-[0.2em]"
      >
        API key
      </label>
    </div>
  )
}
