import { motion } from 'framer-motion'

/**
 * Barcode — mixed-width bars with an opacity shimmer traveling left→right.
 * Scans like a reader head passing the code.
 */
export function BarcodeLoader() {
  const bars = [3, 7, 2, 5, 3, 8, 2, 6, 3]
  return (
    <div className="flex h-full items-center justify-center gap-[3px] p-6">
      {bars.map((w, i) => (
        <motion.span
          key={i}
          className="h-10 rounded-[1px] bg-white"
          style={{ width: w }}
          initial={{ opacity: 0.25 }}
          animate={{ opacity: [0.25, 1, 0.25] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.09 }}
        />
      ))}
    </div>
  )
}

/**
 * Shimmer lines — three skeleton text lines of descending width using the
 * shared shimmer sweep. The universal "paragraph is loading" stand-in.
 */
export function ShimmerLinesLoader() {
  const lines = ['w-44', 'w-36', 'w-24']
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2.5 p-6">
      {lines.map((w) => (
        <div key={w} className={`h-2.5 rounded-full skeleton ${w}`} />
      ))}
    </div>
  )
}

/**
 * Striped progress — diagonal stripes inside a 62% fill, sliding via
 * background-position loop. Motion inside a static fill = "working".
 */
export function StripedProgressLoader() {
  return (
    <div className="grid h-full place-items-center p-6">
      <div className="relative h-3 w-48 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="absolute inset-y-0 left-0 w-[62%]"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #ffffff 0 7px, rgba(255,255,255,0.35) 7px 14px)' }}
          animate={{ backgroundPosition: ['0px 0px', '19.8px 0px'] }}
          transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </div>
  )
}

/**
 * Capsule wave — five capsules scaleY on a center-out ripple (delays are
 * symmetric around the middle), an equalizer freed from left-to-right.
 */
export function CapsuleWaveLoader() {
  return (
    <div className="flex h-full items-center justify-center gap-2 p-6">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.span
          key={i}
          className="h-10 w-2.5 origin-center rounded-full bg-white"
          animate={{ scaleY: [0.3, 1, 0.3] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: Math.abs(i - 2) * 0.13, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
