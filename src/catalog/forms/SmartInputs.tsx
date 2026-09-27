import { useEffect, useRef, useState } from 'react'

const DOMAINS = ['gmail.com', 'proton.me', 'outlook.com', 'yahoo.com', 'structura.dev']

/**
 * URL prefix — a fixed https:// chip rides INSIDE the field's left padding,
 * so the user only types the interesting part.
 */
export function UrlPrefixInput() {
  return (
    <div className="p-6">
      <div className="flex h-11 w-60 items-center rounded-lg border border-white/15 bg-panel focus-within:border-white/50">
        <span className="shrink-0 border-r border-white/10 px-2.5 font-mono text-[11px] text-fog">https://</span>
        <input placeholder="your-site.dev" className="h-full w-full bg-transparent px-2.5 text-sm text-white placeholder:text-fog focus:outline-none" />
      </div>
    </div>
  )
}

/**
 * Email ghost-suggestion — after the @, the best matching domain renders as
 * ghost text directly behind the caret; Tab accepts the completion.
 */
export function EmailSuggestionInput() {
  const [v, setV] = useState('')
  const at = v.indexOf('@')
  const partial = at >= 0 ? v.slice(at + 1) : ''
  const hit = at >= 0 && partial.length < 12 ? DOMAINS.find((d) => d.startsWith(partial) && d !== partial) : undefined
  const suggestion = hit ? v + hit.slice(partial.length) : ''

  return (
    <div className="p-6">
      <div className="relative w-64">
        {/* ghost layer mirrors the value + completion */}
        <span aria-hidden className="pointer-events-none absolute inset-0 flex items-center rounded-lg border border-transparent px-3.5 font-mono text-sm text-fog/60">
          {suggestion}
        </span>
        <input
          value={v}
          onChange={(e) => setV(e.target.value)}
          onKeyDown={(e) => e.key === 'Tab' && suggestion && (e.preventDefault(), setV(suggestion))}
          placeholder="you@gmail.com — try gm…"
          className="relative h-11 w-full rounded-lg border border-white/15 bg-transparent px-3.5 font-mono text-sm text-white placeholder:text-fog/80 focus:border-white/50 focus:outline-none"
        />
        {suggestion && <span className="absolute -bottom-5 right-0 font-mono text-[9px] uppercase tracking-widest text-fog">tab to accept</span>}
      </div>
    </div>
  )
}

/**
 * Username availability — debounced 450ms after typing stops: spinner, then
 * a deterministic verdict (reserved names taken, others free). Mirrors the
 * real async UX without a backend.
 */
export function UsernameCheckInput() {
  const [v, setV] = useState('')
  const [state, setState] = useState<'idle' | 'checking' | 'ok' | 'taken'>('idle')
  const TAKEN = ['admin', 'root', 'test', 'demo']

  useEffect(() => {
    if (v.length < 3) {
      setState('idle')
      return
    }
    setState('checking')
    const t = window.setTimeout(() => setState(TAKEN.includes(v.toLowerCase()) ? 'taken' : 'ok'), 450)
    return () => window.clearTimeout(t)
  }, [v])

  return (
    <div className="p-6">
      <div className="relative w-60">
        <input
          value={v}
          onChange={(e) => setV(e.target.value.replace(/[^a-z0-9_]/gi, ''))}
          placeholder="pick a username"
          className="h-11 w-full rounded-lg border border-white/15 bg-panel px-3.5 pr-9 text-sm text-white placeholder:text-fog focus:border-white/50 focus:outline-none"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm">
          {state === 'checking' && <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border border-white/25 border-t-white" />}
          {state === 'ok' && <span className="text-white">✓</span>}
          {state === 'taken' && <span className="text-rose-300">✕</span>}
        </span>
      </div>
      <p className="mt-1.5 h-4 text-[11px]">
        {state === 'ok' && <span className="text-mist">@{v} is available</span>}
        {state === 'taken' && <span className="text-rose-300/90">@{v} is taken</span>}
      </p>
    </div>
  )
}

/**
 * Clearable input — the × appears once there's text; clicking clears and
 * hands focus straight back to the field.
 */
export function ClearableInput() {
  const [v, setV] = useState('try editing me')
  const ref = useRef<HTMLInputElement>(null)
  return (
    <div className="p-6">
      <div className="relative w-56">
        <input
          ref={ref}
          value={v}
          onChange={(e) => setV(e.target.value)}
          className="h-11 w-full rounded-lg border border-white/15 bg-panel px-3.5 pr-9 text-sm text-white placeholder:text-fog focus:border-white/50 focus:outline-none"
          placeholder="Type something"
        />
        {v && (
          <button
            aria-label="Clear"
            onClick={() => {
              setV('')
              ref.current?.focus()
            }}
            className="absolute right-2 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-md text-fog transition hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  )
}
