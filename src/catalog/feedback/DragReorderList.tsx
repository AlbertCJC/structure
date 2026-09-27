import { useState } from 'react'
import { Reorder } from 'framer-motion'

const INITIAL = ['Design tokens', 'Grid system', 'Motion spec', 'Copy pass']

/**
 * Drag-to-Reorder List — Framer Motion's Reorder.Group measures every
 * item and springs the NON-dragged rows out of the way as you pass
 * through, then closes the gap when you drop. The dragging row lifts
 * (scale + shadow) via whileDrag. Values live in plain React state.
 */
export function DragReorderList() {
  const [items, setItems] = useState(INITIAL)

  return (
    <div className="w-full max-w-[220px] p-4">
      <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-2">
        {items.map((item) => (
          <Reorder.Item
            key={item}
            value={item}
            whileDrag={{ scale: 1.04, boxShadow: '0 12px 30px -8px rgba(0,0,0,0.7)', zIndex: 10 }}
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            className="flex cursor-grab items-center gap-2.5 rounded-xl border border-line bg-panel px-3.5 py-3 active:cursor-grabbing"
          >
            <span className="select-none text-fog">⠿</span>
            <span className="text-xs text-mist">{item}</span>
          </Reorder.Item>
        ))}
      </Reorder.Group>
      <p className="mt-3 text-center font-mono text-[10px] text-fog">drag rows to reorder</p>
    </div>
  )
}
