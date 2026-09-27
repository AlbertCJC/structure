import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const FAQ = [
  { q: 'What is Structura?', a: 'A directory of 128 live, motion-rich UI patterns.' },
  { q: 'Can I copy the code?', a: 'Yes — the copy button grabs the real source file via Vite ?raw.' },
  { q: 'Which engines power it?', a: 'Framer Motion, GSAP, and pure CSS keyframes.' },
]

/**
 * Spring Accordion — height: 0 → 'auto' on springs (Framer measures the
 * content at mount). One panel open at a time; the chevron rotates 45°
 * (× becomes +, reads as "close").
 */
export function AccordionFaq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div className="w-full max-w-[240px] p-4">
      <div className="divide-y divide-white/[0.06] rounded-xl border border-line bg-panel">
        {FAQ.map((f, i) => (
          <div key={f.q}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between px-4 py-3 text-left"
            >
              <span className={`text-xs transition-colors ${open === i ? 'font-semibold text-white' : 'text-mist'}`}>{f.q}</span>
              <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ type: 'spring', stiffness: 320, damping: 22 }} className="text-fog">
                ＋
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className="overflow-hidden"
                >
                  <p className="px-4 pb-3.5 text-[11px] leading-relaxed text-fog">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}
