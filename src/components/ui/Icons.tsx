import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
}

export function SearchIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

export function MenuIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

export function CopyIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

export function CheckIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

export function XIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  )
}

export function ChevronDownIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function ChevronLeftIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

export function ChevronRightIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}

/** Expand / fullscreen corners — card "view source" affordance. */
export function ExpandIcon(p: P) {
  return (
    <svg {...base} {...p}>
      <path d="M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3m0 5v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3" />
    </svg>
  )
}
