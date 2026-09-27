/**
 * Infinity Flow — a dashed stroke flows around a lemniscate. The CSS loop
 * animates stroke-dashoffset by exactly one dash period (26 units), so
 * the flow is seamless. A soft under-glow path sits beneath.
 */
export function InfinityLoader() {
  const D = 'M30,50 C30,28 62,28 60,50 C58,72 90,72 90,50 C90,28 58,28 60,50 C62,72 30,72 30,50 Z'
  return (
    <div className="p-6">
      <svg viewBox="0 0 120 100" className="h-24 w-32">
        <defs>
          <linearGradient id="inf-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <path d={D} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" strokeLinecap="round" />
        <path
          d={D}
          fill="none"
          stroke="url(#inf-grad)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray="16 10"
          style={{ animation: 'infinity-flow 1.2s linear infinite' }}
        />
      </svg>
    </div>
  )
}
