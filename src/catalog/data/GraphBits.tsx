import { useState } from 'react'
import { motion } from 'framer-motion'

const NODES = [
  { id: 'grid', x: 30, y: 40 },
  { id: 'modal', x: 100, y: 14 },
  { id: 'spy', x: 170, y: 44 },
  { id: 'mono', x: 66, y: 76 },
  { id: 'cmdk', x: 138, y: 84 },
]
const EDGES: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [0, 3],
  [2, 4],
  [3, 4],
]

/**
 * Neighbor graph — hovering a node illuminates its edges and direct
 * neighbors; everything else falls back. Topology through dimming.
 */
export function NeighborNodeGraph() {
  const [hover, setHover] = useState(-1)
  const linked = hover >= 0 ? new Set([hover, ...EDGES.filter(([a, b]) => a === hover || b === hover).flatMap((e) => e)]) : null
  return (
    <div className="p-6">
      <svg viewBox="0 0 200 100" className="h-28 w-56">
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke={linked && linked.has(a) && linked.has(b) ? '#fff' : '#ffffff22'}
            strokeWidth="1.2"
            style={{ transition: 'stroke 0.2s' }}
          />
        ))}
        {NODES.map((n, i) => (
          <g key={n.id} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(-1)} style={{ cursor: 'pointer', opacity: linked && !linked.has(i) ? 0.25 : 1, transition: 'opacity 0.2s' }}>
            <motion.circle cx={n.x} cy={n.y} r={hover === i ? 8 : 6} fill="#0a0a12" stroke="#fff" strokeWidth="1.4" />
            <text x={n.x} y={n.y + 16} textAnchor="middle" fontSize="7" fill={hover === i ? '#fff' : '#8d8d99'} fontFamily="ui-monospace, monospace">
              {n.id}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

/**
 * Flow dashes — dashed edges run continuously between three workers;
 * direction lives in the dashoffset sign.
 */
export function FlowDashGraph() {
  const boxes = [
    { label: 'ingest', x: 8 },
    { label: 'score', x: 92 },
    { label: 'serve', x: 176 },
  ]
  return (
    <div className="p-6">
      <svg viewBox="0 0 240 64" className="h-16 w-60">
        {[34, 118].map((x) => (
          <motion.line
            key={x}
            x1={x}
            y1="32"
            x2={x + 48}
            y2="32"
            stroke="#ffffff70"
            strokeWidth="1.6"
            strokeDasharray="5 5"
            animate={{ strokeDashoffset: [0, -20] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
          />
        ))}
        {boxes.map((b) => (
          <g key={b.label}>
            <rect x={b.x} y="16" width="56" height="32" rx="8" fill="#0a0a12" stroke="#fff" strokeWidth="1.2" />
            <text x={b.x + 28} y="35" textAnchor="middle" fontSize="9" fill="#fff" fontFamily="ui-monospace, monospace">
              {b.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

const TREE = [
  { name: 'src', lvl: 0, open: true },
  { name: 'catalog', lvl: 1, open: true },
  { name: 'buttons/', lvl: 2, open: false },
  { name: 'data', lvl: 1, open: false },
  { name: 'package.json', lvl: 0, open: false },
]

/**
 * Twisty tree — folder twisties rotate on toggle; the chevron is the whole
 * affordance and the indent is the whole layout.
 */
export function TwistyTreeList() {
  const [open, setOpen] = useState<Record<string, boolean>>({ src: true, catalog: true })
  return (
    <div className="p-6">
      {TREE.map((n) => {
        const isDir = !n.name.includes('.')
        return (
          <button
            key={n.name}
            onClick={() => isDir && setOpen((o) => ({ ...o, [n.name]: !o[n.name] }))}
            className={`flex w-44 items-center gap-1 rounded px-1 py-0.5 text-left font-mono text-[11px] hover:bg-white/5 ${isDir ? 'text-white' : 'text-fog'}`}
            style={{ paddingLeft: n.lvl * 16 + 4 }}
          >
            <motion.span animate={{ rotate: open[n.name] ? 90 : 0 }} transition={{ type: 'spring', stiffness: 450, damping: 26 }} className="inline-block text-[9px] text-fog">
              {isDir ? '▶' : '·'}
            </motion.span>
            {n.name}
          </button>
        )
      })}
    </div>
  )
}

/**
 * Org connectors — a parent card with elbow connectors to its children;
 * hovering a child lights its path back up.
 */
export function OrgConnectorChart() {
  const [hover, setHover] = useState(-1)
  const kids = ['render', 'audit']
  return (
    <div className="p-6">
      <svg viewBox="0 0 200 96" className="h-24 w-56">
        {[0, 1].map((i) => (
          <path key={i} d={`M100 26 V40 H${i === 0 ? 52 : 148} V56`} fill="none" stroke={hover === i ? '#fff' : '#ffffff30'} strokeWidth="1.4" style={{ transition: 'stroke 0.2s' }} />
        ))}
        <rect x="68" y="4" width="64" height="24" rx="7" fill="#fff" />
        <text x="100" y="19" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0a0a12" fontFamily="ui-monospace, monospace">catalog</text>
        {kids.map((k, i) => (
          <g key={k} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(-1)} style={{ cursor: 'pointer' }}>
            <rect x={i === 0 ? 22 : 118} y="56" width="60" height="24" rx="7" fill="#0a0a12" stroke={hover === i ? '#fff' : '#ffffff60'} strokeWidth="1.2" />
            <text x={i === 0 ? 52 : 148} y="71" textAnchor="middle" fontSize="8.5" fill="#fff" fontFamily="ui-monospace, monospace">
              {k}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}
