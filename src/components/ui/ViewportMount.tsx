import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Mounts its children only once they scroll NEAR the viewport — and keeps
 * them mounted afterwards (state- and animation-safe, like image lazy
 * loading). With 400+ live animated demos, gating everything below the
 * fold is what keeps first paint fast; `rootMargin` prefetches one screen
 * ahead so demos are alive before they enter the frame.
 *
 * If IntersectionObserver is unavailable (very old engines / tests), it
 * mounts immediately — gates nothing, breaks nothing.
 */
export function ViewportMount({
  children,
  rootMargin = '400px 0px',
  fallback = null,
}: {
  children: ReactNode
  rootMargin?: string
  fallback?: ReactNode
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (mounted) return
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setMounted(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setMounted(true)
          io.disconnect()
        }
      },
      { rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [mounted, rootMargin])

  if (mounted) return children
  return (
    <span ref={ref} className="grid h-full w-full place-items-center" aria-hidden>
      {fallback}
    </span>
  )
}
