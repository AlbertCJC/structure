import type { ComponentType } from 'react'
import { tag } from '../rawTag'
import { ScrambleDecode } from './ScrambleDecode'
import { GradientShineText } from './GradientShineText'
import { TypewriterCaret } from './TypewriterCaret'
import { WaveText } from './WaveText'
import { StrokeFillText } from './StrokeFillText'
import { FlipCounter } from './FlipCounter'
// ── family files (4 demos each) ──────────────────────────────────────────
import { BlurInHeading, MaskRiseHeadline, ClipWipeWords, ScatterGatherText } from './TextReveals'
import { VerbSwapLoop, KaraokeSweepLine, BreathingTagline, TrackingPulseText } from './TextLoops'
import { SplitFlapTitle, ProximityCharGlow, JitterGlitchWord, SquiggleUnderlineDraw } from './HoverText'
import { AuroraFlowHeadline, EngravedMonoType, MarchOutlineText, SolidOutlineType } from './TextFx'
import { SpringStatNumber, DeltaTickCounter, UnitCycleCounter, PercentFillWord } from './CountText'
import { MarkerSwoopHighlight, TodoStrikeText, KbdInlineCopy, PullQuoteMark } from './DecorText'
import { BaselineGridHero, CroppedDisplayLoop, SyntaxMonoHero, StackLayoutEntrance } from './RhythmText'
import { ShuffleResolveWord, BlurSwapLabel, MarchingDashUnderline, ChevronMarchLink } from './StatusText'

import scramble from './ScrambleDecode.tsx?raw'
import shineText from './GradientShineText.tsx?raw'
import typewriter from './TypewriterCaret.tsx?raw'
import wave from './WaveText.tsx?raw'
import strokeFill from './StrokeFillText.tsx?raw'
import flipCounter from './FlipCounter.tsx?raw'
import textReveals from './TextReveals.tsx?raw'
import textLoops from './TextLoops.tsx?raw'
import hoverText from './HoverText.tsx?raw'
import textFx from './TextFx.tsx?raw'
import countText from './CountText.tsx?raw'
import decorText from './DecorText.tsx?raw'
import rhythmText from './RhythmText.tsx?raw'
import statusText from './StatusText.tsx?raw'

export const typographyRenderers: Record<string, ComponentType> = {
  'scramble-decode': ScrambleDecode,
  'gradient-shine-text': GradientShineText,
  'typewriter-caret': TypewriterCaret,
  'wave-text': WaveText,
  'stroke-fill-text': StrokeFillText,
  'flip-counter': FlipCounter,
  'blur-in-heading': BlurInHeading,
  'mask-rise-headline': MaskRiseHeadline,
  'clip-wipe-words': ClipWipeWords,
  'scatter-gather-text': ScatterGatherText,
  'verb-swap-loop': VerbSwapLoop,
  'karaoke-sweep-line': KaraokeSweepLine,
  'breathing-tagline': BreathingTagline,
  'tracking-pulse-text': TrackingPulseText,
  'split-flap-title': SplitFlapTitle,
  'proximity-char-glow': ProximityCharGlow,
  'jitter-glitch-word': JitterGlitchWord,
  'squiggle-underline-draw': SquiggleUnderlineDraw,
  'aurora-flow-headline': AuroraFlowHeadline,
  'engraved-mono-type': EngravedMonoType,
  'march-outline-text': MarchOutlineText,
  'solid-outline-type': SolidOutlineType,
  'spring-stat-number': SpringStatNumber,
  'delta-tick-counter': DeltaTickCounter,
  'unit-cycle-counter': UnitCycleCounter,
  'percent-fill-word': PercentFillWord,
  'marker-swoop-highlight': MarkerSwoopHighlight,
  'todo-strike-text': TodoStrikeText,
  'kbd-inline-copy': KbdInlineCopy,
  'pull-quote-mark': PullQuoteMark,
  'baseline-grid-hero': BaselineGridHero,
  'cropped-display-loop': CroppedDisplayLoop,
  'syntax-mono-hero': SyntaxMonoHero,
  'stack-layout-entrance': StackLayoutEntrance,
  'shuffle-resolve-word': ShuffleResolveWord,
  'blur-swap-label': BlurSwapLabel,
  'marching-dash-underline': MarchingDashUnderline,
  'chevron-march-link': ChevronMarchLink,
}

const REVEALS = 'blur-in · mask-rise · clip-wipe · scatter-gather'
const LOOPS = 'verb-swap · karaoke · breathing · tracking-pulse'
const HOVERS = 'split-flap · proximity-glow · jitter · squiggle-draw'
const FX = 'aurora-flow · engraved · marching-outline · solid-outline'
const COUNT = 'spring-stat · delta-tick · unit-cycler · percent-fill'
const DECOR = 'marker-swoop · todo-strike · kbd-inline · pull-quote'
const RHYTHM = 'baseline-grid · cropped-display · syntax-hero · stack-entrance'
const STATUS = 'shuffle-resolve · blur-swap · marching-dash · chevron-march'

export const typographySources: Record<string, string> = {
  'scramble-decode': scramble,
  'gradient-shine-text': shineText,
  'typewriter-caret': typewriter,
  'wave-text': wave,
  'stroke-fill-text': strokeFill,
  'flip-counter': flipCounter,
  'blur-in-heading': tag('TextReveals.tsx', REVEALS, textReveals),
  'mask-rise-headline': tag('TextReveals.tsx', REVEALS, textReveals),
  'clip-wipe-words': tag('TextReveals.tsx', REVEALS, textReveals),
  'scatter-gather-text': tag('TextReveals.tsx', REVEALS, textReveals),
  'verb-swap-loop': tag('TextLoops.tsx', LOOPS, textLoops),
  'karaoke-sweep-line': tag('TextLoops.tsx', LOOPS, textLoops),
  'breathing-tagline': tag('TextLoops.tsx', LOOPS, textLoops),
  'tracking-pulse-text': tag('TextLoops.tsx', LOOPS, textLoops),
  'split-flap-title': tag('HoverText.tsx', HOVERS, hoverText),
  'proximity-char-glow': tag('HoverText.tsx', HOVERS, hoverText),
  'jitter-glitch-word': tag('HoverText.tsx', HOVERS, hoverText),
  'squiggle-underline-draw': tag('HoverText.tsx', HOVERS, hoverText),
  'aurora-flow-headline': tag('TextFx.tsx', FX, textFx),
  'engraved-mono-type': tag('TextFx.tsx', FX, textFx),
  'march-outline-text': tag('TextFx.tsx', FX, textFx),
  'solid-outline-type': tag('TextFx.tsx', FX, textFx),
  'spring-stat-number': tag('CountText.tsx', COUNT, countText),
  'delta-tick-counter': tag('CountText.tsx', COUNT, countText),
  'unit-cycle-counter': tag('CountText.tsx', COUNT, countText),
  'percent-fill-word': tag('CountText.tsx', COUNT, countText),
  'marker-swoop-highlight': tag('DecorText.tsx', DECOR, decorText),
  'todo-strike-text': tag('DecorText.tsx', DECOR, decorText),
  'kbd-inline-copy': tag('DecorText.tsx', DECOR, decorText),
  'pull-quote-mark': tag('DecorText.tsx', DECOR, decorText),
  'baseline-grid-hero': tag('RhythmText.tsx', RHYTHM, rhythmText),
  'cropped-display-loop': tag('RhythmText.tsx', RHYTHM, rhythmText),
  'syntax-mono-hero': tag('RhythmText.tsx', RHYTHM, rhythmText),
  'stack-layout-entrance': tag('RhythmText.tsx', RHYTHM, rhythmText),
  'shuffle-resolve-word': tag('StatusText.tsx', STATUS, statusText),
  'blur-swap-label': tag('StatusText.tsx', STATUS, statusText),
  'marching-dash-underline': tag('StatusText.tsx', STATUS, statusText),
  'chevron-march-link': tag('StatusText.tsx', STATUS, statusText),
}
