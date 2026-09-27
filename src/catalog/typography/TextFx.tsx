import { motion } from 'framer-motion'

/**
 * Aurora flow — a wide three-stop gradient drifts behind the glyphs while
 * bg-clip holds it to the letterforms. Headline as a lava lamp.
 */
export function AuroraFlowHeadline() {
  return (
    <div className="p-6">
      <motion.h4
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        className="whitespace-nowrap bg-clip-text text-2xl font-black text-transparent"
        style={{ backgroundImage: 'linear-gradient(100deg,#7dd3fc,#c084fc,#f0abfc,#7dd3fc)', backgroundSize: '200% 100%' }}
      >
        northern type
      </motion.h4>
    </div>
  )
}

/**
 * Engraved mono — the illusion of carving is two hard text-shadows: a dark
 * bite up-right and a paper lift down-left. One color, real depth.
 */
export function EngravedMonoType() {
  return (
    <div className="p-6">
      <motion.p
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        className="text-3xl font-black uppercase tracking-tight text-[#23232b]"
        style={{ textShadow: '1px -1px 0 rgba(0,0,0,0.85), -1px 1px 0 rgba(255,255,255,0.28)' }}
      >
        sunken
      </motion.p>
      <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-fog">two shadows · zero images</p>
    </div>
  )
}

/**
 * Marching outline — SVG text-shape dashes run the outline on hover like a
 * stadium light chase (stroke-dashoffset loop).
 */
export function MarchOutlineText() {
  return (
    <div className="group p-6">
      <svg viewBox="0 0 200 44" className="h-11 w-52 cursor-default">
        <motion.text
          x="4"
          y="32"
          fill="none"
          stroke="#fff"
          strokeWidth="1.2"
          strokeDasharray="5 4"
          fontSize="30"
          fontWeight="800"
          fontFamily="ui-monospace, monospace"
          animate={{ strokeDashoffset: [0, -36] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
        >
          borders!
        </motion.text>
      </svg>
    </div>
  )
}

const ALT = 'contrast'

/**
 * Solid/outline alternation — odd glyphs solid white, even glyphs hairline
 * stroke; reading the same word through two rendering modes.
 */
export function SolidOutlineType() {
  return (
    <div className="p-6">
      <span className="text-3xl font-black uppercase">
        {[...ALT].map((c, i) =>
          i % 2 === 0 ? (
            <span key={i} className="text-white">
              {c}
            </span>
          ) : (
            <span key={i} style={{ WebkitTextStroke: '1.2px #fff', color: 'transparent' }}>
              {c}
            </span>
          ),
        )}
      </span>
      <p className="mt-1 font-mono text-[9px] uppercase tracking-widest text-fog">fill ⇄ stroke, letter by letter</p>
    </div>
  )
}
