/**
 * Cyber Glitch Button — pure CSS (see .glitch-btn in index.css).
 *
 * Technique: two pseudo-element copies of the label (via attr(data-text))
 * in cyan and magenta, blended with `mix-blend-mode: screen`, each driven
 * by a different clip-path keyframe sequence (glitch-a / glitch-b). The
 * steps() timing function makes the slices JUMP instead of interpolate —
 * the difference between "smooth" and "corrupted". Hover halves the
 * animation duration so the jitter tightens under attention.
 */
export function GlitchButton() {
  return (
    <div className="relative flex flex-col items-center gap-4">
      {/* faint scanline wash behind the button for extra CRT feel */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 opacity-30"
        style={{ background: 'repeating-linear-gradient(0deg, transparent 0 3px, rgba(34,211,238,0.05) 3px 4px)' }}
      />
      <button className="glitch-btn" data-text="ENTER THE GRID">
        ENTER THE GRID
      </button>
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300/40">
        signal unstable · hover to intensify
      </span>
    </div>
  )
}
