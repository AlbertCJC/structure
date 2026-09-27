import { motion } from 'framer-motion'

/**
 * Battery cells — four cells scaleX-charge left to right on staggered
 * origin-left springs, hold full, then all reset together.
 */
export function BatteryCellsLoader() {
  return (
    <div className="grid h-full place-items-center p-6">
      <div className="relative flex h-8 w-16 items-stretch gap-1 rounded-md border-2 border-white/70 p-1">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="flex-1 origin-left rounded-[2px] bg-white"
            animate={{ scaleX: [0, 1, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.28, times: [0, 0.55, 1], ease: 'easeInOut' }}
          />
        ))}
        <span className="absolute -right-[7px] top-1/2 h-3 w-1 -translate-y-1/2 rounded-r bg-white/70" />
      </div>
    </div>
  )
}

/**
 * Liquid fill — a white tide rises and falls inside a circular rim; two
 * bubbles ride upward through it to sell the fluid.
 */
export function LiquidFillLoader() {
  return (
    <div className="grid h-full place-items-center p-6">
      <div className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-white/60">
        <motion.div
          className="absolute inset-x-0 bottom-0 bg-white/85"
          animate={{ height: ['12%', '74%', '12%'] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        {[0.35, 0.7].map((left, i) => (
          <motion.span
            key={i}
            className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-white/80"
            style={{ left: `${left * 100}%` }}
            animate={{ y: [0, -26], opacity: [0, 1, 0] }}
            transition={{ duration: 1.3, repeat: Infinity, delay: i * 0.65, ease: 'easeIn' }}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * Signal bars — climbing bar heights with an opacity wave running up the
 * set: the phone-signal "searching" pattern.
 */
export function SignalBarsLoader() {
  const heights = [10, 16, 22, 28]
  return (
    <div className="flex h-full items-end justify-center gap-1.5 p-6 pb-8">
      {heights.map((h, i) => (
        <motion.span
          key={h}
          className="w-2 rounded-sm bg-white"
          style={{ height: h }}
          initial={{ opacity: 0.2 }}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 1.15, repeat: Infinity, delay: i * 0.16 }}
        />
      ))}
    </div>
  )
}

/**
 * Moon phase — a dark disc slides across the lit moon inside a rim, cycling
 * crescents. Two layers, one translateX, genuinely phaselike.
 */
export function MoonPhaseLoader() {
  return (
    <div className="grid h-full place-items-center p-6">
      <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white/50">
        <span className="absolute inset-[3px] rounded-full bg-white" />
        <motion.span
          className="absolute inset-[3px] rounded-full bg-void"
          animate={{ x: ['-112%', '112%'] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  )
}
