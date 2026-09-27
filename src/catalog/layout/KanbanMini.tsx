import { useState } from 'react'
import { Reorder } from 'framer-motion'

/**
 * Mini Kanban Column — Reorder.Group on the "In progress" lane. Cards
 * carry priority chips; the Done lane is static to show the two-lane
 * board shape. Reorder's layout springs handle gap-making on drag.
 */
export function KanbanMini() {
  const [tasks, setTasks] = useState(['Ship the grid', 'Review motion spec', 'Write changelog'])

  return (
    <div className="flex h-full w-full gap-2.5 p-4">
      <div className="flex-1">
        <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-fog">In progress · {tasks.length}</p>
        <Reorder.Group axis="y" values={tasks} onReorder={setTasks} className="space-y-2">
          {tasks.map((t) => (
            <Reorder.Item
              key={t}
              value={t}
              whileDrag={{ scale: 1.05, zIndex: 10, boxShadow: '0 10px 24px -6px rgba(0,0,0,0.8)' }}
              className="cursor-grab rounded-lg border border-white/10 bg-panel p-2.5 active:cursor-grabbing"
            >
              <p className="text-[11px] font-medium text-white">{t}</p>
              <div className="mt-1.5 flex gap-1.5">
                <span className="rounded bg-violet-500/15 px-1.5 py-0.5 text-[8px] font-bold uppercase text-violet-300">motion</span>
                <span className="rounded bg-white/5 px-1.5 py-0.5 text-[8px] font-bold uppercase text-fog">P1</span>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>

      <div className="w-px bg-white/[0.06]" />

      <div className="flex-1">
        <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-fog">Done · 2</p>
        {['Design tokens', 'Sidebar v2'].map((t) => (
          <div key={t} className="mb-2 rounded-lg border border-white/[0.06] bg-panel/60 p-2.5 opacity-60">
            <p className="text-[11px] text-mist line-through">{t}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
