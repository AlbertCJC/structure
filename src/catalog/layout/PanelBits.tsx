import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Lift + shadow — hover lifts the panel 4px and deepens the shadow with it
 * (shadow follows the same lift, selling physicality).
 */
export function LiftShadowPanel() {
  return (
    <div className="p-6">
      <div className="h-28 w-44 rounded-xl border border-white/12 bg-panel p-3.5 shadow-[0_4px_14px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-white/30 hover:shadow-[0_18px_40px_rgba(0,0,0,0.55)]">
        <p className="text-[12px] font-semibold text-white">Hover me</p>
        <p className="mt-1 text-[10px] leading-snug text-fog">Shadow depth tracks the lift — the cheapest 3D money can’t even buy.</p>
      </div>
    </div>
  )
}

/**
 * Border draw — four hairlines grow from the corners on hover, tracing the
 * panel's perimeter with pure transform origins.
 */
export function BorderDrawPanel() {
  const edges = [
    'top-0 left-0 h-px w-full origin-left scale-x-0 group-hover:scale-x-100',
    'top-0 right-0 w-px h-full origin-top scale-y-0 group-hover:scale-y-100',
    'bottom-0 right-0 h-px w-full origin-right scale-x-0 group-hover:scale-x-100',
    'bottom-0 left-0 w-px h-full origin-bottom scale-y-0 group-hover:scale-y-100',
  ]
  return (
    <div className="p-6">
      <div className="group relative grid h-28 w-44 cursor-pointer place-items-center bg-panel">
        {edges.map((e) => (
          <span key={e} className={`absolute bg-white transition-transform duration-300 ${e}`} />
        ))}
        <span className="text-[11px] text-fog transition-colors group-hover:text-white">drawn on hover</span>
      </div>
    </div>
  )
}

/**
 * Swinging note — a tilted sticky note that straightens and then settles
 * on hover; origin at the pin so it swings like real paper.
 */
export function SwingingNotePanel() {
  return (
    <div className="grid h-32 place-items-center p-4">
      <div className="relative h-20 w-32 -rotate-3 rounded-lg bg-white p-2.5 shadow-xl transition-transform duration-300 ease-out hover:rotate-0" style={{ transformOrigin: '50% -8px' }}>
        <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-white/70 shadow" />
        <p className="text-[10px] font-medium text-black">remember: ship beats perfect.</p>
        <p className="text-[8px] text-black/50">— the team</p>
      </div>
    </div>
  )
}

/**
 * Cursor shadow — the panel's shadow leans AWAY from the pointer, as if
 * the cursor were a light source. Pointer coords → offset, lerp-free CSS.
 */
export function CursorShadowPanel() {
  const ref = useRef<HTMLDivElement>(null)
  const [sh, setSh] = useState('0px 14px 40px rgba(0,0,0,0.5)')
  return (
    <div className="p-6">
      <div
        ref={ref}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          const dx = (e.clientX - (r.left + r.width / 2)) / r.width
          const dy = (e.clientY - (r.top + r.height / 2)) / r.height
          setSh(`${-dx * 24}px ${-dy * 24 + 10}px 40px rgba(0,0,0,0.55)`)
        }}
        onPointerLeave={() => setSh('0px 14px 40px rgba(0,0,0,0.5)')}
        className="grid h-28 w-44 place-items-center rounded-xl border border-white/12 bg-panel transition-shadow duration-150"
        style={{ boxShadow: sh }}
      >
        <span className="pointer-events-none text-[11px] text-fog">light follows you ⇆</span>
      </div>
    </div>
  )
}
