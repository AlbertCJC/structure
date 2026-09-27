import type { ComponentType } from 'react'
import { tag } from '../rawTag'
import { ToastQueue } from './ToastQueue'
import { SkeletonShimmer } from './SkeletonShimmer'
import { LiveStatusBadge } from './LiveStatusBadge'
import { MorphModal } from './MorphModal'
import { SlideDrawer } from './SlideDrawer'
import { TooltipCollection } from './TooltipCollection'
import { PopoverMenu } from './PopoverMenu'
import { InlineAlert } from './InlineAlert'
import { ProgressSteps } from './ProgressSteps'
import { UploadDropzone } from './UploadDropzone'
import { EmptyState } from './EmptyState'
import { DragReorderList } from './DragReorderList'
import { AccordionFaq } from './AccordionFaq'
// ── family files (4 demos each) ──────────────────────────────────────────
import { UndoToastBar, QueueCountToasts, PersistentReviewToasts, ConfettiSuccessToast } from './ToastBits'
import { StickyAnnounceBar, OfflineWarningBanner, PromoEntryBanner, CookieAcceptBanner } from './BannerBits'
import { SyncingStatusChip, BuildStageChip, PresenceDotUser, BatteryFillChip } from './StatusChips'
import { MultiBarProgress, CheckpointProgress, CountdownStartChip, IndeterminateThinkingChip } from './ProgressBits'
import { DestructiveConfirmInline, CollapsibleNoteCard, WarningTiltCard, SuccessMorphCard } from './AlertCards2'
import { TypingDotsBubble, ReadReceiptBubble, AutosaveStatusChip, PresenceCursorsArea } from './DraftBits'
import { MonoConfettiBurst, RingCountupProgress, SparkleTitleEntry, NewPulseBadge } from './CelebrationBits'

import toastQueue from './ToastQueue.tsx?raw'
import skeleton from './SkeletonShimmer.tsx?raw'
import liveStatus from './LiveStatusBadge.tsx?raw'
import morphModal from './MorphModal.tsx?raw'
import drawer from './SlideDrawer.tsx?raw'
import tooltips from './TooltipCollection.tsx?raw'
import popover from './PopoverMenu.tsx?raw'
import alert from './InlineAlert.tsx?raw'
import steps from './ProgressSteps.tsx?raw'
import dropzone from './UploadDropzone.tsx?raw'
import emptyState from './EmptyState.tsx?raw'
import reorder from './DragReorderList.tsx?raw'
import accordion from './AccordionFaq.tsx?raw'
import toastBits from './ToastBits.tsx?raw'
import bannerBits from './BannerBits.tsx?raw'
import statusChips from './StatusChips.tsx?raw'
import progressBits from './ProgressBits.tsx?raw'
import alertCards2 from './AlertCards2.tsx?raw'
import draftBits from './DraftBits.tsx?raw'
import celebrationBits from './CelebrationBits.tsx?raw'

export const feedbackRenderers: Record<string, ComponentType> = {
  'toast-queue': ToastQueue,
  'skeleton-shimmer': SkeletonShimmer,
  'live-status-badge': LiveStatusBadge,
  'morph-modal': MorphModal,
  'slide-drawer': SlideDrawer,
  'tooltip-collection': TooltipCollection,
  'popover-menu': PopoverMenu,
  'inline-alert': InlineAlert,
  'progress-steps': ProgressSteps,
  'upload-dropzone': UploadDropzone,
  'empty-state': EmptyState,
  'drag-reorder-list': DragReorderList,
  'accordion-faq': AccordionFaq,
  'undo-toast-bar': UndoToastBar,
  'queue-count-toasts': QueueCountToasts,
  'persistent-review-toasts': PersistentReviewToasts,
  'confetti-success-toast': ConfettiSuccessToast,
  'sticky-announce-bar': StickyAnnounceBar,
  'offline-warning-banner': OfflineWarningBanner,
  'promo-entry-banner': PromoEntryBanner,
  'cookie-accept-banner': CookieAcceptBanner,
  'syncing-status-chip': SyncingStatusChip,
  'build-stage-chip': BuildStageChip,
  'presence-dot-user': PresenceDotUser,
  'battery-fill-chip': BatteryFillChip,
  'multi-bar-progress': MultiBarProgress,
  'checkpoint-progress': CheckpointProgress,
  'countdown-start-chip': CountdownStartChip,
  'indeterminate-thinking-chip': IndeterminateThinkingChip,
  'destructive-confirm-inline': DestructiveConfirmInline,
  'collapsible-note-card': CollapsibleNoteCard,
  'warning-tilt-card': WarningTiltCard,
  'success-morph-card': SuccessMorphCard,
  'typing-dots-bubble': TypingDotsBubble,
  'read-receipt-bubble': ReadReceiptBubble,
  'autosave-status-chip': AutosaveStatusChip,
  'presence-cursors-area': PresenceCursorsArea,
  'mono-confetti-burst': MonoConfettiBurst,
  'ring-countup-progress': RingCountupProgress,
  'sparkle-title-entry': SparkleTitleEntry,
  'new-pulse-badge': NewPulseBadge,
}

const TOASTS = 'undo · queue-cap · fan-stack · confetti-success'
const BANNERS = 'announce-sticky · offline · promo-marquee · cookie-mini'
const STATUSES = 'syncing · build-stages · presence-dot · battery'
const PROGRESS = 'multi-bar · checkpoints · countdown · indeterminate'
const ALERTS = 'destructive-confirm · collapsing-note · warning-tilt · success-morph'
const DRAFT = 'typing-dots · read-receipt · autosave · presence-cursors'
const CELEBRATE = 'mono-confetti · ring-countup · sparkle-title · new-pulse'

export const feedbackSources: Record<string, string> = {
  'toast-queue': toastQueue,
  'skeleton-shimmer': skeleton,
  'live-status-badge': liveStatus,
  'morph-modal': morphModal,
  'slide-drawer': drawer,
  'tooltip-collection': tooltips,
  'popover-menu': popover,
  'inline-alert': alert,
  'progress-steps': steps,
  'upload-dropzone': dropzone,
  'empty-state': emptyState,
  'drag-reorder-list': reorder,
  'accordion-faq': accordion,
  'undo-toast-bar': tag('ToastBits.tsx', TOASTS, toastBits),
  'queue-count-toasts': tag('ToastBits.tsx', TOASTS, toastBits),
  'persistent-review-toasts': tag('ToastBits.tsx', TOASTS, toastBits),
  'confetti-success-toast': tag('ToastBits.tsx', TOASTS, toastBits),
  'sticky-announce-bar': tag('BannerBits.tsx', BANNERS, bannerBits),
  'offline-warning-banner': tag('BannerBits.tsx', BANNERS, bannerBits),
  'promo-entry-banner': tag('BannerBits.tsx', BANNERS, bannerBits),
  'cookie-accept-banner': tag('BannerBits.tsx', BANNERS, bannerBits),
  'syncing-status-chip': tag('StatusChips.tsx', STATUSES, statusChips),
  'build-stage-chip': tag('StatusChips.tsx', STATUSES, statusChips),
  'presence-dot-user': tag('StatusChips.tsx', STATUSES, statusChips),
  'battery-fill-chip': tag('StatusChips.tsx', STATUSES, statusChips),
  'multi-bar-progress': tag('ProgressBits.tsx', PROGRESS, progressBits),
  'checkpoint-progress': tag('ProgressBits.tsx', PROGRESS, progressBits),
  'countdown-start-chip': tag('ProgressBits.tsx', PROGRESS, progressBits),
  'indeterminate-thinking-chip': tag('ProgressBits.tsx', PROGRESS, progressBits),
  'destructive-confirm-inline': tag('AlertCards2.tsx', ALERTS, alertCards2),
  'collapsible-note-card': tag('AlertCards2.tsx', ALERTS, alertCards2),
  'warning-tilt-card': tag('AlertCards2.tsx', ALERTS, alertCards2),
  'success-morph-card': tag('AlertCards2.tsx', ALERTS, alertCards2),
  'typing-dots-bubble': tag('DraftBits.tsx', DRAFT, draftBits),
  'read-receipt-bubble': tag('DraftBits.tsx', DRAFT, draftBits),
  'autosave-status-chip': tag('DraftBits.tsx', DRAFT, draftBits),
  'presence-cursors-area': tag('DraftBits.tsx', DRAFT, draftBits),
  'mono-confetti-burst': tag('CelebrationBits.tsx', CELEBRATE, celebrationBits),
  'ring-countup-progress': tag('CelebrationBits.tsx', CELEBRATE, celebrationBits),
  'sparkle-title-entry': tag('CelebrationBits.tsx', CELEBRATE, celebrationBits),
  'new-pulse-badge': tag('CelebrationBits.tsx', CELEBRATE, celebrationBits),
}
