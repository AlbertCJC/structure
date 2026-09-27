import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * Floating label — the peer + placeholder-shown duo: while the placeholder
 * is visible the label sits as a placeholder; focus or content floats it up.
 * Zero JS state.
 */
export function FloatingLabelInput() {
  return (
    <div className="p-6">
      <div className="relative w-56">
        <input id="fl" placeholder=" " className="peer h-11 w-full rounded-lg border border-white/20 bg-transparent px-3 pt-3 text-sm text-white focus:border-white/60 focus:outline-none" />
        <label
          htmlFor="fl"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-fog transition-all duration-200 peer-focus:top-2 peer-focus:text-[10px] peer-focus:uppercase peer-focus:tracking-widest peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:uppercase"
        >
          Workspace name
        </label>
      </div>
    </div>
  )
}

/**
 * Underline grow — the rule blooms from the center on focus and retracts
 * when the field empties and blurs. Sibling selector does the state wiring.
 */
export function UnderlineGrowInput() {
  return (
    <div className="p-6">
      <div className="relative w-56">
        <input placeholder="Project codename" className="peer h-10 w-full border-b border-white/20 bg-transparent text-sm text-white placeholder:text-fog focus:outline-none" />
        <span className="absolute bottom-0 left-1/2 h-0.5 w-full origin-center -translate-x-1/2 scale-x-0 bg-white transition-transform duration-300 peer-focus:scale-x-100" />
      </div>
    </div>
  )
}

/**
 * Border glow — focus pours a soft white ring (box-shadow) around the field
 * while the border brightens to match. Intensity tuned to feel like
 * lamplight, not a neon sign.
 */
export function BorderGlowFocusInput() {
  return (
    <div className="p-6">
      <input
        placeholder="Search the vault"
        className="h-11 w-56 rounded-xl border border-white/15 bg-panel px-3.5 text-sm text-white placeholder:text-fog transition-all duration-300 focus:border-white/50 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.08),0_0_38px_rgba(255,255,255,0.14)] focus:outline-none"
      />
    </div>
  )
}

/**
 * Shake invalid — blur with an empty required field fires the decaying
 * shake and a rose border; typing instantly restores calm.
 */
export function ShakeInvalidInput() {
  const [v, setV] = useState('')
  const [bad, setBad] = useState(false)
  return (
    <div className="p-6">
      <motion.input
        key={String(bad) + '-shake'}
        animate={bad ? { x: [0, -8, 8, -5, 5, -2, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
        value={v}
        onChange={(e) => {
          setV(e.target.value)
          setBad(false)
        }}
        onBlur={() => v.trim() === '' && setBad(true)}
        onFocus={() => setBad(false)}
        placeholder="Required — try blurring empty"
        className={`h-11 w-60 rounded-lg border bg-transparent px-3.5 text-sm text-white placeholder:text-fog focus:outline-none transition-colors ${
          bad ? 'border-rose-400/70' : 'border-white/15 focus:border-white/50'
        }`}
      />
      {bad && <p className="mt-1.5 text-[11px] text-rose-300">This field can’t be empty</p>}
    </div>
  )
}
