import { useState } from 'react'

/**
 * Inline edit — text that becomes an input on click; Enter or blur commits,
 * stable identity through the swap (same width bucket, no layout jump).
 */
export function InlineEditText() {
  const [v, setV] = useState('Weekly sync')
  const [editing, setEditing] = useState(false)
  return (
    <div className="p-6">
      {editing ? (
        <input
          autoFocus
          value={v}
          onChange={(e) => setV(e.target.value)}
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => e.key === 'Enter' && setEditing(false)}
          className="h-9 w-52 rounded-md border border-white/40 bg-transparent px-2 text-sm text-white focus:outline-none"
        />
      ) : (
        <button onClick={() => setEditing(true)} title="Click to edit" className="group flex h-9 items-center gap-2 rounded-md px-2 text-sm text-white hover:bg-white/5">
          {v || <span className="text-fog">Untitled</span>}
          <span className="text-[10px] text-fog opacity-0 transition-opacity group-hover:opacity-100">✎</span>
        </button>
      )}
    </div>
  )
}

/**
 * KBD search — the field wears its shortcut hint as jewelry; focusing sinks
 * the hint and warms the border.
 */
export function SearchKbdInput() {
  return (
    <div className="p-6">
      <div className="flex h-11 w-60 items-center rounded-xl border border-white/15 bg-panel px-3.5 transition-colors focus-within:border-white/50">
        <input placeholder="Jump to a file…" className="w-full bg-transparent text-sm text-white placeholder:text-fog focus:outline-none" />
        <span className="flex shrink-0 gap-1 opacity-70 focus-within:opacity-30">
          <kbd className="rounded border border-white/15 bg-white/5 px-1 font-mono text-[9px] text-mist">⌘</kbd>
          <kbd className="rounded border border-white/15 bg-white/5 px-1 font-mono text-[9px] text-mist">P</kbd>
        </span>
      </div>
    </div>
  )
}

/**
 * USD format — free typing while focused; on blur the value normalizes to
 * accounting format ($ + thousands separators + 2 decimals).
 */
export function UsdFormatInput() {
  const [v, setV] = useState('1250')
  const fmt = () => {
    const n = parseFloat(v.replace(/[^0-9.]/g, ''))
    if (!Number.isFinite(n)) return setV('')
    setV(n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
  }
  return (
    <div className="p-6">
      <div className="flex h-11 w-48 items-center rounded-lg border border-white/15 bg-panel transition-colors focus-within:border-white/50">
        <span className="pl-3.5 pr-1.5 text-sm text-fog">$</span>
        <input
          value={v}
          onChange={(e) => setV(e.target.value)}
          onBlur={fmt}
          inputMode="decimal"
          className="h-full w-full bg-transparent pr-3 text-sm text-white focus:outline-none"
        />
      </div>
      <p className="mt-1.5 text-[11px] text-fog">blur to format</p>
    </div>
  )
}

/**
 * Label-hint row — canonical trio: label on top, hint below, field that
 * warms the WHOLE row on focus-within (parents respond to child focus).
 */
export function LabelHintRow() {
  return (
    <div className="p-6">
      <div className="w-60 rounded-xl border border-white/10 p-3 transition-colors focus-within:border-white/40 focus-within:bg-white/[0.02]">
        <label htmlFor="lhr" className="text-xs font-semibold text-white">
          API key name
        </label>
        <input id="lhr" placeholder="production-server" className="mt-1.5 h-10 w-full rounded-lg border border-white/15 bg-panel px-3 text-sm text-white placeholder:text-fog focus:border-white/50 focus:outline-none" />
        <p className="mt-1.5 text-[11px] text-fog">Only used for display — never sent anywhere.</p>
      </div>
    </div>
  )
}
