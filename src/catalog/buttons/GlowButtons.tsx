/**
 * Underglow — hover lifts the shell 2px and pours a wide soft shadow under
 * it; the lift + glow arrive together so depth reads instantly. Pure CSS.
 */
export function UnderglowButton() {
  return (
    <div className="p-6">
      <button className="rounded-xl border border-white/20 bg-white/5 px-7 py-2.5 text-sm text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_45px_-10px_rgba(255,255,255,0.4)]">
        Hover for lift
      </button>
    </div>
  )
}

/**
 * Scan label — a 250%-wide shine strip clipped to the text itself sweeps
 * left→right on an infinite loop (the base text stays readable underneath).
 */
export function ScanLabelButton() {
  return (
    <div className="p-6">
      <button className="relative rounded-xl border border-white/15 px-7 py-2.5">
        <span className="text-sm font-semibold text-white/45">PROCESSING</span>
        <span
          aria-hidden
          className="absolute inset-0 grid animate-[shimmer_2.4s_linear_infinite] place-items-center bg-clip-text text-sm font-semibold text-transparent"
          style={{
            backgroundImage: 'linear-gradient(100deg, transparent 42%, #ffffff 50%, transparent 58%)',
            backgroundSize: '250% 100%',
          }}
        >
          PROCESSING
        </span>
      </button>
    </div>
  )
}

/**
 * Gradient slide — the shell is a 200% grayscale gradient; hover slides its
 * position so the light passes across the face. One transition, no JS.
 */
export function GradientSlideButton() {
  return (
    <div className="p-6">
      <button
        className="rounded-xl px-7 py-2.5 text-sm font-bold text-black transition-[background-position] duration-500"
        style={{
          backgroundImage: 'linear-gradient(115deg, #737373, #ffffff 55%, #bfbfbf)',
          backgroundSize: '220% 100%',
          backgroundPosition: '0% 0%',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundPosition = '100% 0%')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundPosition = '0% 0%')}
      >
        Premium
      </button>
    </div>
  )
}

/**
 * Frost nudge — a translucent glass square that brightens its tint and
 * border on hover, and settles under the press (active translateY).
 */
export function FrostNudgeButton() {
  return (
    <div className="p-6">
      <button className="rounded-xl border border-white/10 bg-white/5 px-7 py-2.5 text-sm text-white backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10 active:translate-y-0">
        Glasshouse
      </button>
    </div>
  )
}
