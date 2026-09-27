import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const ROWS = [
  { name: 'grid-audit', n: 388 },
  { name: 'modal-flow', n: 129 },
  { name: 'mono-mode', n: 44 },
  { name: 'family-files', n: 66 },
]

/**
 * Stagger mount — table rows rise in sequential 60ms hops on entry; the
 * header holds still so the hop reads as content loading, not layout jumping.
 */
export function StaggerMountTable() {
  return (
    <div className="p-6">
      <table className="w-60 text-left text-[11px]">
        <thead>
          <tr className="text-fog">
            <th className="pb-1.5 font-medium">module</th>
            <th className="pb-1.5 text-right font-medium">checks</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r, i) => (
            <motion.tr
              key={r.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 300, damping: 26 }}
              className="border-t border-white/10"
            >
              <td className="py-1.5 text-white">{r.name}</td>
              <td className="py-1.5 text-right font-mono text-mist">{r.n}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const PLAYERS = [
  { name: 'June', score: 91 },
  { name: 'Ravi', score: 74 },
  { name: 'Aya', score: 83 },
  { name: 'Mika', score: 67 },
]

/**
 * Sort header — clicking "score" toggles direction: the arrow flips and
 * rows re-layout on springs to their new families.
 */
export function SortHeaderTable() {
  const [desc, setDesc] = useState(true)
  const rows = [...PLAYERS].sort((a, b) => (desc ? b.score - a.score : a.score - b.score))
  return (
    <div className="p-6">
      <div className="grid w-56 grid-cols-[1fr_auto] items-baseline gap-2 border-b border-white/15 pb-1.5 text-[10px] uppercase tracking-widest text-fog">
        <span>player</span>
        <button onClick={() => setDesc((d) => !d)} className="flex items-center gap-1 font-semibold text-white">
          score
          <motion.span animate={{ rotate: desc ? 0 : 180 }} transition={{ type: 'spring', stiffness: 400, damping: 24 }}>↓</motion.span>
        </button>
      </div>
      {rows.map((p) => (
        <motion.div key={p.name} layout transition={{ type: 'spring', stiffness: 320, damping: 28 }} className="grid grid-cols-[1fr_auto] gap-2 border-b border-white/8 py-1.5 text-[11px]">
          <span className="text-mist">{p.name}</span>
          <span className="font-mono text-white">{p.score}</span>
        </motion.div>
      ))}
    </div>
  )
}

const FILES = ['hero.tsx', 'navbar.tsx', 'footer.tsx']

/**
 * Select rows — checking any row raises the bulk bar; unchecking collapses
 * it. Selection state lives with the rows, actions live above.
 */
export function SelectActionsTable() {
  const [sel, setSel] = useState<string[]>([])
  const toggle = (f: string) => setSel((s) => (s.includes(f) ? s.filter((x) => x !== f) : [...s, f]))
  return (
    <div className="relative p-6">
      <AnimatePresence>
        {sel.length > 0 && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="absolute left-6 right-2 top-4 flex items-center justify-between rounded-lg border border-white/15 bg-raised px-3 py-1.5 text-[10px] text-white shadow-xl">
            {sel.length} selected
            <button onClick={() => setSel([])} className="font-bold underline underline-offset-2">clear</button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="mt-8 w-56">
        {FILES.map((f) => (
          <label key={f} className={`flex cursor-pointer items-center gap-2.5 border-b border-white/8 py-1.5 text-[11px] ${sel.includes(f) ? 'text-white' : 'text-mist'}`}>
            <input type="checkbox" checked={sel.includes(f)} onChange={() => toggle(f)} className="h-3.5 w-3.5 accent-white" />
            <span className="font-mono">{f}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

const CELLS = [
  { k: 'throughput', v: 420 },
  { k: 'latency', v: 86 },
  { k: 'errors', v: 2 },
]

/**
 * Flash cell — values tick on a timer; only the altered cell flashes its
 * background, the others hold still. Attention goes to CHANGE, not data.
 */
export function FlashCellTable() {
  const [vals, setVals] = useState([420, 86, 2])
  const [flash, setFlash] = useState(-1)
  useEffect(() => {
    const t = window.setInterval(() => {
      const i = Math.floor(Math.random() * 3)
      setVals((v) => v.map((x, j) => (j === i ? x + (Math.random() > 0.5 ? 12 : -9) : x)))
      setFlash(i)
      const t2 = window.setTimeout(() => setFlash(-1), 700)
      return () => window.clearTimeout(t2)
    }, 1800)
    return () => window.clearInterval(t)
  }, [])
  return (
    <div className="w-52 p-6">
      {CELLS.map((c, i) => (
        <div key={c.k} className={`flex justify-between rounded-md px-2 py-1.5 text-[11px] transition-colors duration-500 ${flash === i ? 'bg-white/15' : ''}`}>
          <span className="text-fog">{c.k}</span>
          <motion.span key={vals[i]} initial={flash === i ? { scale: 1.2 } : false} animate={{ scale: 1 }} className="font-mono text-white">
            {vals[i]}
          </motion.span>
        </div>
      ))}
      <p className="mt-1 text-center font-mono text-[8px] uppercase tracking-widest text-fog">live · updates every 1.8s</p>
    </div>
  )
}
