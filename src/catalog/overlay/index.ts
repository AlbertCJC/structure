import type { ComponentType } from 'react'
import { tag } from '../rawTag'
import { ShareSheet } from './ShareSheet'
import { ConfirmDialog } from './ConfirmDialog'
import { NotificationPanel } from './NotificationPanel'
import { ImageLightbox } from './ImageLightbox'
import { TourSpotlight } from './TourSpotlight'
import { BottomSheet } from './BottomSheet'
import { CookieBanner } from './CookieBanner'
// ── family files (4 demos each) ──────────────────────────────────────────
import { AvatarDetailPopover, AnchorConfirmPop, ZoomChipOverlay, HoverDelayPreview } from './DialogBits'
import { HandleHeightSheet, SidePeekPanel, StaggerChipsPanel, EscHintDialog } from './SheetBits'
import { WobbleArrowTooltip, PinnedTipToggle, CursorFollowTip, HoldHintDot } from './TipBits'
import { SubmenuSlideMenu, MiniCommandScale, AvatarMenuStagger, MenuDotTravel } from './MenuBits'
import { GlassBackdropBanner, SpotlightHoleMask, StagedChoreoOverlay, OutsideCommitPill } from './BackdropBits'
import { ChainStepPopover, ReactionFlyPicker, ShareCopyAnchor, TourRingTip } from './ChainBits'

import shareSheet from './ShareSheet.tsx?raw'
import confirmDialog from './ConfirmDialog.tsx?raw'
import notificationPanel from './NotificationPanel.tsx?raw'
import lightbox from './ImageLightbox.tsx?raw'
import tour from './TourSpotlight.tsx?raw'
import bottomSheet from './BottomSheet.tsx?raw'
import cookie from './CookieBanner.tsx?raw'
import dialogBits from './DialogBits.tsx?raw'
import sheetBits from './SheetBits.tsx?raw'
import tipBits from './TipBits.tsx?raw'
import menuBits from './MenuBits.tsx?raw'
import backdropBits from './BackdropBits.tsx?raw'
import chainBits from './ChainBits.tsx?raw'

export const overlayRenderers: Record<string, ComponentType> = {
  'share-sheet': ShareSheet,
  'confirm-dialog': ConfirmDialog,
  'notification-panel': NotificationPanel,
  'image-lightbox': ImageLightbox,
  'tour-spotlight': TourSpotlight,
  'bottom-sheet': BottomSheet,
  'cookie-banner': CookieBanner,
  'avatar-detail-popover': AvatarDetailPopover,
  'anchor-confirm-pop': AnchorConfirmPop,
  'zoom-chip-overlay': ZoomChipOverlay,
  'hover-delay-preview': HoverDelayPreview,
  'handle-height-sheet': HandleHeightSheet,
  'side-peek-panel': SidePeekPanel,
  'stagger-chips-panel': StaggerChipsPanel,
  'esc-hint-dialog': EscHintDialog,
  'wobble-arrow-tooltip': WobbleArrowTooltip,
  'pinned-tip-toggle': PinnedTipToggle,
  'cursor-follow-tip': CursorFollowTip,
  'hold-hint-dot': HoldHintDot,
  'submenu-slide-menu': SubmenuSlideMenu,
  'mini-command-scale': MiniCommandScale,
  'avatar-menu-stagger': AvatarMenuStagger,
  'menu-dot-travel': MenuDotTravel,
  'glass-backdrop-banner': GlassBackdropBanner,
  'spotlight-hole-mask': SpotlightHoleMask,
  'staged-choreo-overlay': StagedChoreoOverlay,
  'outside-commit-pill': OutsideCommitPill,
  'chain-step-popover': ChainStepPopover,
  'reaction-fly-picker': ReactionFlyPicker,
  'share-copy-anchor': ShareCopyAnchor,
  'tour-ring-tip': TourRingTip,
}

const DIALOGS = 'avatar-detail · anchor-confirm · zoom-chip · hover-preview'
const SHEETS = 'handle-height · side-peek · stagger-chips · esc-dialog'
const TIPS = 'wobble-arrow · pinned-tip · cursor-follow · hold-hint'
const MENUS = 'submenu-slide · mini-command · avatar-stagger · menu-dot'
const BACKDROPS = 'glass-banner · spotlight-hole · staged-overlay · outside-commit'
const CHAINS = 'chain-steps · reaction-fly · share-anchor · tour-ring'

export const overlaySources: Record<string, string> = {
  'share-sheet': shareSheet,
  'confirm-dialog': confirmDialog,
  'notification-panel': notificationPanel,
  'image-lightbox': lightbox,
  'tour-spotlight': tour,
  'bottom-sheet': bottomSheet,
  'cookie-banner': cookie,
  'avatar-detail-popover': tag('DialogBits.tsx', DIALOGS, dialogBits),
  'anchor-confirm-pop': tag('DialogBits.tsx', DIALOGS, dialogBits),
  'zoom-chip-overlay': tag('DialogBits.tsx', DIALOGS, dialogBits),
  'hover-delay-preview': tag('DialogBits.tsx', DIALOGS, dialogBits),
  'handle-height-sheet': tag('SheetBits.tsx', SHEETS, sheetBits),
  'side-peek-panel': tag('SheetBits.tsx', SHEETS, sheetBits),
  'stagger-chips-panel': tag('SheetBits.tsx', SHEETS, sheetBits),
  'esc-hint-dialog': tag('SheetBits.tsx', SHEETS, sheetBits),
  'wobble-arrow-tooltip': tag('TipBits.tsx', TIPS, tipBits),
  'pinned-tip-toggle': tag('TipBits.tsx', TIPS, tipBits),
  'cursor-follow-tip': tag('TipBits.tsx', TIPS, tipBits),
  'hold-hint-dot': tag('TipBits.tsx', TIPS, tipBits),
  'submenu-slide-menu': tag('MenuBits.tsx', MENUS, menuBits),
  'mini-command-scale': tag('MenuBits.tsx', MENUS, menuBits),
  'avatar-menu-stagger': tag('MenuBits.tsx', MENUS, menuBits),
  'menu-dot-travel': tag('MenuBits.tsx', MENUS, menuBits),
  'glass-backdrop-banner': tag('BackdropBits.tsx', BACKDROPS, backdropBits),
  'spotlight-hole-mask': tag('BackdropBits.tsx', BACKDROPS, backdropBits),
  'staged-choreo-overlay': tag('BackdropBits.tsx', BACKDROPS, backdropBits),
  'outside-commit-pill': tag('BackdropBits.tsx', BACKDROPS, backdropBits),
  'chain-step-popover': tag('ChainBits.tsx', CHAINS, chainBits),
  'reaction-fly-picker': tag('ChainBits.tsx', CHAINS, chainBits),
  'share-copy-anchor': tag('ChainBits.tsx', CHAINS, chainBits),
  'tour-ring-tip': tag('ChainBits.tsx', CHAINS, chainBits),
}
