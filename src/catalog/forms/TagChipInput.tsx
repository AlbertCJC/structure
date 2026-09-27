import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Tag Chip Input — Enter commits the draft as a chip (scale pop via
 * AnimatePresence initial), Backspace on an EMPTY input deletes the last
 * chip (the standard token-field behavior), and each chip's × removes it.
 * Duplicates are rejected with a shake on the input border.
 */
export function TagChipInput() {
  const [tags, setTags] = useState(['react', 'framer-motion'])
  const [draft, setDraft] = useState('')
  const [shake, setShake] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const commit = () => {
    const t = draft.trim().toLowerCase().replace(/\s+/g, '-')
    if (!t) return
    if (tags.includes(t)) {
      setShake(true)
      window.setTimeout(() => setShake(false), 400)
      return
    }
    setTags((prev) => [...prev, t])
    setDraft('')
  }

  return (
    <div className="w-full max-w-[250px] p-4">
      <motion.div
        animate={shake ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.35 }}
        onClick={() => inputRef.current?.focus()}
        className="flex min-h-12 cursor-text flex-wrap items-center gap-1.5 rounded-xl border border-line bg-panel p-2"
      >
        <AnimatePresence initial={false}>
          {tags.map((t) => (
            <motion.span
              key={t}
              layout
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 28 }}
              className="flex items-center gap-1 rounded-lg bg-violet-500/15 py-1 pl-2.5 pr-1.5 text-[11px] font-medium text-violet-200 ring-1 ring-violet-400/30"
            >
              {t}
              <button onClick={() => setTags((prev) => prev.filter((x) => x !== t))} className="grid h-4 w-4 place-items-center rounded-full text-violet-300/70 transition hover:bg-white/10 hover:text-white">
                ×
              </button>
            </motion.span>
          ))}
        </AnimatePresence>
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              commit()
            } else if (e.key === 'Backspace' && !draft && tags.length > 0) {
              setTags((prev) => prev.slice(0, -1))
            }
          }}
          placeholder={tags.length ? '' : 'add tag…'}
          className="min-w-16 flex-1 bg-transparent px-1 py-1 text-xs text-white placeholder:text-fog focus:outline-none"
        />
      </motion.div>
      <p className="mt-2.5 text-center font-mono text-[10px] text-fog">enter to add · backspace to pop</p>
    </div>
  )
}
