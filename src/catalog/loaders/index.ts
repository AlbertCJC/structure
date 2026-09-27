import type { ComponentType } from 'react'
import { tag } from '../rawTag'
import { KineticTypeLoader } from './KineticTypeLoader'
import { QuantumOrbitLoader } from './QuantumOrbitLoader'
import { GooeyLoader } from './GooeyLoader'
import { BlurRevealLoader } from './BlurRevealLoader'
import { ProgressRingLoader } from './ProgressRingLoader'
import { WaveDotsLoader } from './WaveDotsLoader'
import { EqualizerBarsLoader } from './EqualizerBarsLoader'
import { DualRingLoader } from './DualRingLoader'
import { InfinityLoader } from './InfinityLoader'
import { DnaHelixLoader } from './DnaHelixLoader'
import { TypingDotsLoader } from './TypingDotsLoader'
import { RadarSweepLoader } from './RadarSweepLoader'
import { HourglassFlipLoader } from './HourglassFlipLoader'
import { PacmanLoader } from './PacmanLoader'
import { SquashBounceLoader } from './SquashBounceLoader'
import { GradientRingLoader } from './GradientRingLoader'
import { GridPulseLoader } from './GridPulseLoader'
// ── family files (4 demos each) ──────────────────────────────────────────
import { DashRingLoader, CometTailLoader, TickTockLoader, SegmentFadeLoader } from './SpinnersSet'
import { FlippingSquareLoader, DualSquareSpinLoader, MorphSquareCircleLoader, SquarePathLoader } from './SquareLoaders'
import { BounceDotsLoader, DotsRingLoader, DotsToCheckLoader, ChasingDotsLoader } from './DotsLoaders'
import { BarcodeLoader, ShimmerLinesLoader, StripedProgressLoader, CapsuleWaveLoader } from './BarLoaders'
import { TriangleSpinLoader, HeartPulseLoader, HexRippleLoader, CubeRotateLoader } from './ShapeLoaders'
import { BatteryCellsLoader, LiquidFillLoader, SignalBarsLoader, MoonPhaseLoader } from './MiscLoaders'

import kineticType from './KineticTypeLoader.tsx?raw'
import quantumOrbit from './QuantumOrbitLoader.tsx?raw'
import gooey from './GooeyLoader.tsx?raw'
import blurReveal from './BlurRevealLoader.tsx?raw'
import progressRing from './ProgressRingLoader.tsx?raw'
import waveDots from './WaveDotsLoader.tsx?raw'
import equalizer from './EqualizerBarsLoader.tsx?raw'
import dualRing from './DualRingLoader.tsx?raw'
import infinity from './InfinityLoader.tsx?raw'
import dna from './DnaHelixLoader.tsx?raw'
import typingDots from './TypingDotsLoader.tsx?raw'
import radar from './RadarSweepLoader.tsx?raw'
import hourglass from './HourglassFlipLoader.tsx?raw'
import pacman from './PacmanLoader.tsx?raw'
import squash from './SquashBounceLoader.tsx?raw'
import gradientRing from './GradientRingLoader.tsx?raw'
import gridPulse from './GridPulseLoader.tsx?raw'
import spinnersSet from './SpinnersSet.tsx?raw'
import squareLoaders from './SquareLoaders.tsx?raw'
import dotsLoaders from './DotsLoaders.tsx?raw'
import barLoaders from './BarLoaders.tsx?raw'
import shapeLoaders from './ShapeLoaders.tsx?raw'
import miscLoaders from './MiscLoaders.tsx?raw'

export const loaderRenderers: Record<string, ComponentType> = {
  'kinetic-type-loader': KineticTypeLoader,
  'quantum-orbit-loader': QuantumOrbitLoader,
  'gooey-morph-loader': GooeyLoader,
  'blur-reveal-loader': BlurRevealLoader,
  'progress-ring-loader': ProgressRingLoader,
  'wave-dots-loader': WaveDotsLoader,
  'equalizer-bars-loader': EqualizerBarsLoader,
  'dual-ring-loader': DualRingLoader,
  'infinity-loader': InfinityLoader,
  'dna-helix-loader': DnaHelixLoader,
  'typing-dots-loader': TypingDotsLoader,
  'radar-sweep-loader': RadarSweepLoader,
  'hourglass-flip-loader': HourglassFlipLoader,
  'pacman-loader': PacmanLoader,
  'squash-bounce-loader': SquashBounceLoader,
  'gradient-ring-loader': GradientRingLoader,
  'grid-pulse-loader': GridPulseLoader,
  'dash-ring-loader': DashRingLoader,
  'comet-tail-loader': CometTailLoader,
  'tick-tock-loader': TickTockLoader,
  'segment-fade-loader': SegmentFadeLoader,
  'flipping-square-loader': FlippingSquareLoader,
  'dual-square-spin-loader': DualSquareSpinLoader,
  'morph-square-circle-loader': MorphSquareCircleLoader,
  'square-path-loader': SquarePathLoader,
  'bounce-dots-loader': BounceDotsLoader,
  'dots-ring-loader': DotsRingLoader,
  'dots-to-check-loader': DotsToCheckLoader,
  'chasing-dots-loader': ChasingDotsLoader,
  'barcode-loader': BarcodeLoader,
  'shimmer-lines-loader': ShimmerLinesLoader,
  'striped-progress-loader': StripedProgressLoader,
  'capsule-wave-loader': CapsuleWaveLoader,
  'triangle-spin-loader': TriangleSpinLoader,
  'heart-pulse-loader': HeartPulseLoader,
  'hex-ripple-loader': HexRippleLoader,
  'cube-rotate-loader': CubeRotateLoader,
  'battery-cells-loader': BatteryCellsLoader,
  'liquid-fill-loader': LiquidFillLoader,
  'signal-bars-loader': SignalBarsLoader,
  'moon-phase-loader': MoonPhaseLoader,
}

const SPINNERS = 'dash-ring · comet-tail · tick-tock · segment-fade'
const SQUARES = 'flipping · dual-spin · morph·circle · square-path'
const DOTS = 'bounce · ring · dots-to-check · chasing'
const BARS = 'barcode · shimmer-lines · striped-progress · capsule-wave'
const SHAPES = 'triangle · heart · hex-ripple · cube'
const MISC = 'battery · liquid · signal · moon'

export const loaderSources: Record<string, string> = {
  'kinetic-type-loader': kineticType,
  'quantum-orbit-loader': quantumOrbit,
  'gooey-morph-loader': gooey,
  'blur-reveal-loader': blurReveal,
  'progress-ring-loader': progressRing,
  'wave-dots-loader': waveDots,
  'equalizer-bars-loader': equalizer,
  'dual-ring-loader': dualRing,
  'infinity-loader': infinity,
  'dna-helix-loader': dna,
  'typing-dots-loader': typingDots,
  'radar-sweep-loader': radar,
  'hourglass-flip-loader': hourglass,
  'pacman-loader': pacman,
  'squash-bounce-loader': squash,
  'gradient-ring-loader': gradientRing,
  'grid-pulse-loader': gridPulse,
  'dash-ring-loader': tag('SpinnersSet.tsx', SPINNERS, spinnersSet),
  'comet-tail-loader': tag('SpinnersSet.tsx', SPINNERS, spinnersSet),
  'tick-tock-loader': tag('SpinnersSet.tsx', SPINNERS, spinnersSet),
  'segment-fade-loader': tag('SpinnersSet.tsx', SPINNERS, spinnersSet),
  'flipping-square-loader': tag('SquareLoaders.tsx', SQUARES, squareLoaders),
  'dual-square-spin-loader': tag('SquareLoaders.tsx', SQUARES, squareLoaders),
  'morph-square-circle-loader': tag('SquareLoaders.tsx', SQUARES, squareLoaders),
  'square-path-loader': tag('SquareLoaders.tsx', SQUARES, squareLoaders),
  'bounce-dots-loader': tag('DotsLoaders.tsx', DOTS, dotsLoaders),
  'dots-ring-loader': tag('DotsLoaders.tsx', DOTS, dotsLoaders),
  'dots-to-check-loader': tag('DotsLoaders.tsx', DOTS, dotsLoaders),
  'chasing-dots-loader': tag('DotsLoaders.tsx', DOTS, dotsLoaders),
  'barcode-loader': tag('BarLoaders.tsx', BARS, barLoaders),
  'shimmer-lines-loader': tag('BarLoaders.tsx', BARS, barLoaders),
  'striped-progress-loader': tag('BarLoaders.tsx', BARS, barLoaders),
  'capsule-wave-loader': tag('BarLoaders.tsx', BARS, barLoaders),
  'triangle-spin-loader': tag('ShapeLoaders.tsx', SHAPES, shapeLoaders),
  'heart-pulse-loader': tag('ShapeLoaders.tsx', SHAPES, shapeLoaders),
  'hex-ripple-loader': tag('ShapeLoaders.tsx', SHAPES, shapeLoaders),
  'cube-rotate-loader': tag('ShapeLoaders.tsx', SHAPES, shapeLoaders),
  'battery-cells-loader': tag('MiscLoaders.tsx', MISC, miscLoaders),
  'liquid-fill-loader': tag('MiscLoaders.tsx', MISC, miscLoaders),
  'signal-bars-loader': tag('MiscLoaders.tsx', MISC, miscLoaders),
  'moon-phase-loader': tag('MiscLoaders.tsx', MISC, miscLoaders),
}
