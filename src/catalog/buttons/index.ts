import type { ComponentType } from 'react'
import { tag } from '../rawTag'
import { MagneticButton } from './MagneticButton'
import { LiquidFillButton } from './LiquidFillButton'
import { GlitchButton } from './GlitchButton'
import { GradientTraceButton } from './GradientTraceButton'
import { BrutalistPressButton } from './BrutalistPressButton'
import { NeonGlowButton } from './NeonGlowButton'
import { RippleButton } from './RippleButton'
import { ShineSweepButton } from './ShineSweepButton'
import { IconMorphButton } from './IconMorphButton'
import { ExpandHoverButton } from './ExpandHoverButton'
import { BorderDrawButton } from './BorderDrawButton'
import { TiltPressButton } from './TiltPressButton'
import { DoubleTapLikeButton } from './DoubleTapLikeButton'
import { HoldToConfirmButton } from './HoldToConfirmButton'
import { SplitHoverButton } from './SplitHoverButton'
import { CornerFoldButton } from './CornerFoldButton'
import { DotLoadingButton } from './DotLoadingButton'
import { DownloadProgressButton } from './DownloadProgressButton'
import { DestructiveHoldButton } from './DestructiveHoldButton'
import { ConfettiBurstButton } from './ConfettiBurstButton'
import { KbdShortcutButton } from './KbdShortcutButton'
// ── family files (4 demos each) ──────────────────────────────────────────
import { FollowToggleButton, LikeCountPopButton, SharePopButton, LinkCopyButton } from './SocialButtons'
import { BorderBeamButton, OrbitDotButton, PulseRingButton, PingDotButton } from './BeamButtons'
import { RollLabelButton, SwapCharsButton, SlideArrowButton, CountdownReleaseButton } from './TextMorphButtons'
import { PlayToggleButton, BookmarkPopButton, BellShakeButton, SendPlaneButton } from './IconStateButtons'
import { UnderglowButton, ScanLabelButton, GradientSlideButton, FrostNudgeButton } from './GlowButtons'
import { DenyShakeButton, ApprovePulseButton, UnlockSlideButton, ErrorFlashButton } from './DangerButtons'
import { RunawayButton, DoubleFaceButton, ElasticDragButton, PressKeyButton } from './PlayButtons'

import magnetic from './MagneticButton.tsx?raw'
import liquidFill from './LiquidFillButton.tsx?raw'
import glitch from './GlitchButton.tsx?raw'
import gradientTrace from './GradientTraceButton.tsx?raw'
import brutalist from './BrutalistPressButton.tsx?raw'
import neon from './NeonGlowButton.tsx?raw'
import ripple from './RippleButton.tsx?raw'
import shine from './ShineSweepButton.tsx?raw'
import iconMorph from './IconMorphButton.tsx?raw'
import expandHover from './ExpandHoverButton.tsx?raw'
import borderDraw from './BorderDrawButton.tsx?raw'
import tiltPress from './TiltPressButton.tsx?raw'
import doubleTap from './DoubleTapLikeButton.tsx?raw'
import holdConfirm from './HoldToConfirmButton.tsx?raw'
import splitHover from './SplitHoverButton.tsx?raw'
import cornerFold from './CornerFoldButton.tsx?raw'
import dotLoading from './DotLoadingButton.tsx?raw'
import downloadProgress from './DownloadProgressButton.tsx?raw'
import destructiveHold from './DestructiveHoldButton.tsx?raw'
import confetti from './ConfettiBurstButton.tsx?raw'
import kbdShortcut from './KbdShortcutButton.tsx?raw'
import socialButtons from './SocialButtons.tsx?raw'
import beamButtons from './BeamButtons.tsx?raw'
import textMorphButtons from './TextMorphButtons.tsx?raw'
import iconStateButtons from './IconStateButtons.tsx?raw'
import glowButtons from './GlowButtons.tsx?raw'
import dangerButtons from './DangerButtons.tsx?raw'
import playButtons from './PlayButtons.tsx?raw'

/** Buttons domain module: live renderers + raw sources for the source modal. */
export const buttonRenderers: Record<string, ComponentType> = {
  'magnetic-button': MagneticButton,
  'liquid-fill-button': LiquidFillButton,
  'glitch-button': GlitchButton,
  'gradient-trace-button': GradientTraceButton,
  'brutalist-press-button': BrutalistPressButton,
  'neon-glow-button': NeonGlowButton,
  'ripple-button': RippleButton,
  'shine-sweep-button': ShineSweepButton,
  'icon-morph-button': IconMorphButton,
  'expand-hover-button': ExpandHoverButton,
  'border-draw-button': BorderDrawButton,
  'tilt-press-button': TiltPressButton,
  'double-tap-like-button': DoubleTapLikeButton,
  'hold-to-confirm-button': HoldToConfirmButton,
  'split-hover-button': SplitHoverButton,
  'corner-fold-button': CornerFoldButton,
  'dot-loading-button': DotLoadingButton,
  'download-progress-button': DownloadProgressButton,
  'destructive-hold-button': DestructiveHoldButton,
  'confetti-burst-button': ConfettiBurstButton,
  'kbd-shortcut-button': KbdShortcutButton,
  'follow-toggle-button': FollowToggleButton,
  'like-count-pop-button': LikeCountPopButton,
  'share-pop-button': SharePopButton,
  'link-copy-button': LinkCopyButton,
  'border-beam-button': BorderBeamButton,
  'orbit-dot-button': OrbitDotButton,
  'pulse-ring-button': PulseRingButton,
  'ping-dot-button': PingDotButton,
  'roll-label-button': RollLabelButton,
  'swap-chars-button': SwapCharsButton,
  'slide-arrow-button': SlideArrowButton,
  'countdown-release-button': CountdownReleaseButton,
  'play-toggle-button': PlayToggleButton,
  'bookmark-pop-button': BookmarkPopButton,
  'bell-shake-button': BellShakeButton,
  'send-plane-button': SendPlaneButton,
  'underglow-button': UnderglowButton,
  'scan-label-button': ScanLabelButton,
  'gradient-slide-button': GradientSlideButton,
  'frost-nudge-button': FrostNudgeButton,
  'deny-shake-button': DenyShakeButton,
  'approve-pulse-button': ApprovePulseButton,
  'unlock-slide-button': UnlockSlideButton,
  'error-flash-button': ErrorFlashButton,
  'runaway-button': RunawayButton,
  'double-face-button': DoubleFaceButton,
  'elastic-drag-button': ElasticDragButton,
  'press-key-button': PressKeyButton,
}

const SOCIAL = 'follow-toggle · like-count · share-pop · link-copy'
const BEAM = 'border-beam · orbit-dot · pulse-ring · ping-dot'
const TEXT_MORPH = 'roll-label · swap-chars · slide-arrow · countdown-release'
const ICON_STATE = 'play-toggle · bookmark-pop · bell-shake · send-plane'
const GLOW = 'underglow · scan-label · gradient-slide · frost-nudge'
const DANGER = 'deny-shake · approve-pulse · unlock-slide · error-flash'
const PLAY = 'runaway · double-face · elastic-drag · press-key'

export const buttonSources: Record<string, string> = {
  'magnetic-button': magnetic,
  'liquid-fill-button': liquidFill,
  'glitch-button': glitch,
  'gradient-trace-button': gradientTrace,
  'brutalist-press-button': brutalist,
  'neon-glow-button': neon,
  'ripple-button': ripple,
  'shine-sweep-button': shine,
  'icon-morph-button': iconMorph,
  'expand-hover-button': expandHover,
  'border-draw-button': borderDraw,
  'tilt-press-button': tiltPress,
  'double-tap-like-button': doubleTap,
  'hold-to-confirm-button': holdConfirm,
  'split-hover-button': splitHover,
  'corner-fold-button': cornerFold,
  'dot-loading-button': dotLoading,
  'download-progress-button': downloadProgress,
  'destructive-hold-button': destructiveHold,
  'confetti-burst-button': confetti,
  'kbd-shortcut-button': kbdShortcut,
  'follow-toggle-button': tag('SocialButtons.tsx', SOCIAL, socialButtons),
  'like-count-pop-button': tag('SocialButtons.tsx', SOCIAL, socialButtons),
  'share-pop-button': tag('SocialButtons.tsx', SOCIAL, socialButtons),
  'link-copy-button': tag('SocialButtons.tsx', SOCIAL, socialButtons),
  'border-beam-button': tag('BeamButtons.tsx', BEAM, beamButtons),
  'orbit-dot-button': tag('BeamButtons.tsx', BEAM, beamButtons),
  'pulse-ring-button': tag('BeamButtons.tsx', BEAM, beamButtons),
  'ping-dot-button': tag('BeamButtons.tsx', BEAM, beamButtons),
  'roll-label-button': tag('TextMorphButtons.tsx', TEXT_MORPH, textMorphButtons),
  'swap-chars-button': tag('TextMorphButtons.tsx', TEXT_MORPH, textMorphButtons),
  'slide-arrow-button': tag('TextMorphButtons.tsx', TEXT_MORPH, textMorphButtons),
  'countdown-release-button': tag('TextMorphButtons.tsx', TEXT_MORPH, textMorphButtons),
  'play-toggle-button': tag('IconStateButtons.tsx', ICON_STATE, iconStateButtons),
  'bookmark-pop-button': tag('IconStateButtons.tsx', ICON_STATE, iconStateButtons),
  'bell-shake-button': tag('IconStateButtons.tsx', ICON_STATE, iconStateButtons),
  'send-plane-button': tag('IconStateButtons.tsx', ICON_STATE, iconStateButtons),
  'underglow-button': tag('GlowButtons.tsx', GLOW, glowButtons),
  'scan-label-button': tag('GlowButtons.tsx', GLOW, glowButtons),
  'gradient-slide-button': tag('GlowButtons.tsx', GLOW, glowButtons),
  'frost-nudge-button': tag('GlowButtons.tsx', GLOW, glowButtons),
  'deny-shake-button': tag('DangerButtons.tsx', DANGER, dangerButtons),
  'approve-pulse-button': tag('DangerButtons.tsx', DANGER, dangerButtons),
  'unlock-slide-button': tag('DangerButtons.tsx', DANGER, dangerButtons),
  'error-flash-button': tag('DangerButtons.tsx', DANGER, dangerButtons),
  'runaway-button': tag('PlayButtons.tsx', PLAY, playButtons),
  'double-face-button': tag('PlayButtons.tsx', PLAY, playButtons),
  'elastic-drag-button': tag('PlayButtons.tsx', PLAY, playButtons),
  'press-key-button': tag('PlayButtons.tsx', PLAY, playButtons),
}
