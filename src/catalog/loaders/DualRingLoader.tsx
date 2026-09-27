/**
 * Dual Counter-Rings — two border-top rings spinning in opposite
 * directions at different speeds (conic-spin keyframes). Pure CSS, so it
 * runs on the compositor even while the rest of the grid is busy.
 */
export function DualRingLoader() {
  return (
    <div className="relative h-20 w-20">
      <div
        className="absolute inset-0 rounded-full border-2 border-white/10 border-t-violet-400"
        style={{ animation: 'conic-spin 1.1s linear infinite' }}
      />
      <div
        className="absolute inset-3 rounded-full border-2 border-white/10 border-t-cyan-300"
        style={{ animation: 'conic-spin 1.7s linear infinite reverse' }}
      />
      <div className="absolute inset-0 m-auto h-2 w-2 rounded-full bg-white/70" style={{ animation: 'twinkle 1.4s ease-in-out infinite' }} />
    </div>
  )
}
