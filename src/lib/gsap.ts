import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/** Single GSAP entrypoint — ScrollTrigger registered exactly once, so every
 *  demo that needs it (stacking cards, etc.) shares the same instance. */
gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }
