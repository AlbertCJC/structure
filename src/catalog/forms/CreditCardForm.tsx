import { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * 3D Card Form — the preview card is a preserve-3d sandwich:
 * front face (number/name/expiry) and back face (CVC strip), rotated 180°
 * apart with backface-hidden. Focusing the CVC input flips the whole
 * sandwich; the other fields write into the front face live as you type.
 */
export function CreditCardForm() {
  const [number, setNumber] = useState('4242 8080 1337 0042')
  const [name, setName] = useState('AVA NAKAMURA')
  const [expiry, setExpiry] = useState('09/29')
  const [cvc, setCvc] = useState('')
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="flex w-full max-w-[260px] flex-col items-center gap-4 p-2 [perspective:900px]">
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 24 }}
        className="relative h-36 w-56 [transform-style:preserve-3d]"
      >
        {/* front */}
        <div className="absolute inset-0 flex flex-col justify-between rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-500 p-4 shadow-xl [backface-visibility:hidden]">
          <div className="flex items-center justify-between">
            <span className="h-6 w-9 rounded-md bg-gradient-to-br from-amber-200 to-amber-400" />
            <span className="font-mono text-[10px] tracking-[0.2em] text-white/80">VISA</span>
          </div>
          <p className="font-mono text-sm tracking-[0.12em] text-white">{number || '•••• •••• •••• ••••'}</p>
          <div className="flex justify-between font-mono text-[10px] uppercase text-white/90">
            <span>{name || 'YOUR NAME'}</span>
            <span>{expiry || 'MM/YY'}</span>
          </div>
        </div>
        {/* back */}
        <div className="absolute inset-0 overflow-hidden rounded-xl bg-gradient-to-br from-[#2b2b45] to-[#15151f] shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="mt-5 h-8 bg-black/70" />
          <div className="mx-4 mt-4 flex items-center gap-2">
            <div className="h-7 flex-1 rounded bg-white/90" />
            <span className="rounded bg-white/10 px-2 py-1.5 font-mono text-xs text-white">{cvc || '•••'}</span>
          </div>
          <p className="mx-4 mt-3 font-mono text-[9px] text-white/40">AUTHORIZED SIGNATURE — NOT VALID UNLESS SIGNED</p>
        </div>
      </motion.div>

      <div className="grid w-full grid-cols-2 gap-2">
        <input
          value={number}
          onChange={(e) => setNumber(e.target.value.slice(0, 19))}
          className="col-span-2 rounded-lg border border-line bg-panel px-3 py-2 font-mono text-xs text-white focus:border-violet-400/60 focus:outline-none"
          placeholder="Card number"
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value.toUpperCase().slice(0, 18))}
          className="rounded-lg border border-line bg-panel px-3 py-2 font-mono text-[10px] text-white focus:border-violet-400/60 focus:outline-none"
          placeholder="NAME"
        />
        <div className="flex gap-2">
          <input
            value={expiry}
            onChange={(e) => setExpiry(e.target.value.slice(0, 5))}
            className="w-16 rounded-lg border border-line bg-panel px-2 py-2 font-mono text-[10px] text-white focus:border-violet-400/60 focus:outline-none"
            placeholder="MM/YY"
          />
          <input
            value={cvc}
            onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
            onFocus={() => setFlipped(true)}
            onBlur={() => setFlipped(false)}
            className="w-14 rounded-lg border border-line bg-panel px-2 py-2 text-center font-mono text-[10px] text-white focus:border-fuchsia-400/60 focus:outline-none"
            placeholder="CVC"
          />
        </div>
      </div>
    </div>
  )
}
