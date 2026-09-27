import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * Follow button — state-continuity morph: idle outline → filled "Following",
 * and hovering a Following state reveals "Unfollow". Labels swap on a
 * fixed-width pill so layout never jolts mid-transition.
 */
export function FollowToggleButton() {
  const [following, setFollowing] = useState(false)
  const [hover, setHover] = useState(false)
  const label = following ? (hover ? 'Unfollow' : 'Following') : 'Follow'
  return (
    <div className="p-6">
      <motion.button
        whileTap={{ scale: 0.94 }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => setFollowing((f) => !f)}
        animate={{
          backgroundColor: following ? '#ffffff' : 'rgba(255,255,255,0)',
          color: following ? '#0a0a12' : '#ffffff',
        }}
        className="h-10 w-32 rounded-full border border-white/25 text-sm font-semibold"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={label}
            initial={{ y: 9, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -9, opacity: 0 }}
            transition={{ duration: 0.14 }}
            className="block"
          >
            {label}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  )
}

/**
 * Like counter — the digit rolls vertically through AnimatePresence on every
 * +/-1 (popLayout lifts the old value out of flow), while the heart fires a
 * single scale-burst.
 */
export function LikeCountPopButton() {
  const [count, setCount] = useState(128)
  const [liked, setLiked] = useState(false)
  return (
    <div className="p-6">
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={() => {
          setLiked((l) => !l)
          setCount((c) => c + (liked ? -1 : 1))
        }}
        className="flex h-10 items-center gap-2 rounded-full border border-white/15 px-4 text-sm text-white"
      >
        <motion.span animate={{ scale: liked ? [1, 1.55, 1] : 1 }} transition={{ duration: 0.35 }}>
          {liked ? '♥' : '♡'}
        </motion.span>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={count}
            initial={{ y: -11, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 11, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            className="font-mono"
          >
            {count}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  )
}

const SHARE_TARGETS = ['𝕏', 'in', '↗']

/**
 * Share popover button — the bubble scales from the button origin; each
 * target pops in on its own stiff spring with a 50ms stagger.
 */
export function SharePopButton() {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative p-6">
      <motion.button
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen((o) => !o)}
        className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white"
      >
        Share
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 380, damping: 26 }}
            className="absolute left-1/2 top-full z-10 mt-2 flex -translate-x-1/2 gap-1.5 rounded-xl border border-line bg-panel p-1.5"
          >
            {SHARE_TARGETS.map((t, i) => (
              <motion.button
                key={t}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.05 + i * 0.05, type: 'spring', stiffness: 500, damping: 18 }}
                className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-xs text-white hover:bg-white/15"
              >
                {t}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/**
 * Copy-link button — writes a fake URL, then holds a check state for 1.5s.
 * Clipboard failures (sandboxed iframes) are swallowed: the micro-interaction
 * still completes so the pattern stays inspectable.
 */
export function LinkCopyButton() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText('https://structura.dev/x42')
    } catch {
      /* permission denied in sandbox */
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }
  return (
    <div className="p-6">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={copy}
        className="flex h-10 items-center gap-2 rounded-lg border border-white/15 px-4 text-sm text-white"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={String(copied)} initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }}>
            {copied ? '✓' : '🔗'}
          </motion.span>
        </AnimatePresence>
        {copied ? 'Copied link' : 'Copy link'}
      </motion.button>
    </div>
  )
}
