import type { ComponentType } from 'react'
import { tag } from '../rawTag'
import { HorizontalScrollHijack } from '../scroll/HorizontalScrollHijack'
import { ParallaxDepthLayers } from '../scroll/ParallaxDepthLayers'
import { StackingCardsDemo } from '../scroll/StackingCardsDemo'
import { GlassSpotlightCard } from '../surface/GlassSpotlightCard'
import { BentoHoverGrid } from './BentoHoverGrid'
import { MasonryReveal } from './MasonryReveal'
import { KanbanMini } from './KanbanMini'
import { SplitPaneResizer } from './SplitPaneResizer'
import { MarqueeBand } from './MarqueeBand'
import { StockTicker } from './StockTicker'
import { FlipCardGrid } from './FlipCardGrid'
import { ExpandingGallery } from './ExpandingGallery'
// ── family files (4 demos each) ──────────────────────────────────────────
import { ExpandableCellGrid, MosaicDimGrid, FlexProportionSlices, CrosshairGuideTile } from './GridPatterns'
import { DeckCarouselCards, FanSpreadStack, IncomingMessageStack, PanelFocusSwap } from './StackPatterns'
import { ScrollGrowDivider, SweepingEdgeDivider, OrChipDivider, TimelineDotDivider } from './DividerBits'
import { SlowZoomTile, BottomCaptionTile, PlayThumbTile, RatioCycleTile } from './MediaTiles'
import { LiftShadowPanel, BorderDrawPanel, SwingingNotePanel, CursorShadowPanel } from './PanelBits'
import { DualCounterMarquee, VerticalChipMarquee, PauseHoverAutoscroll, FloatingChipCloud } from './ScrollShowcase'

import horizontalScroll from '../scroll/HorizontalScrollHijack.tsx?raw'
import parallax from '../scroll/ParallaxDepthLayers.tsx?raw'
import stacking from '../scroll/StackingCardsDemo.tsx?raw'
import glassCard from '../surface/GlassSpotlightCard.tsx?raw'
import bento from './BentoHoverGrid.tsx?raw'
import masonry from './MasonryReveal.tsx?raw'
import kanban from './KanbanMini.tsx?raw'
import splitPane from './SplitPaneResizer.tsx?raw'
import marquee from './MarqueeBand.tsx?raw'
import ticker from './StockTicker.tsx?raw'
import flipCards from './FlipCardGrid.tsx?raw'
import gallery from './ExpandingGallery.tsx?raw'
import gridPatterns from './GridPatterns.tsx?raw'
import stackPatterns from './StackPatterns.tsx?raw'
import dividerBits from './DividerBits.tsx?raw'
import mediaTiles from './MediaTiles.tsx?raw'
import panelBits from './PanelBits.tsx?raw'
import scrollShowcase from './ScrollShowcase.tsx?raw'

/** Layout domain: scroll demos + surfaces + spatial patterns. */
export const layoutRenderers: Record<string, ComponentType> = {
  'horizontal-scroll-hijack': HorizontalScrollHijack,
  'parallax-depth-layers': ParallaxDepthLayers,
  'sticky-stacking-cards': StackingCardsDemo,
  'glass-spotlight-card': GlassSpotlightCard,
  'bento-hover-grid': BentoHoverGrid,
  'masonry-reveal': MasonryReveal,
  'kanban-mini': KanbanMini,
  'split-pane-resizer': SplitPaneResizer,
  'marquee-band': MarqueeBand,
  'stock-ticker': StockTicker,
  'flip-card-grid': FlipCardGrid,
  'expanding-gallery': ExpandingGallery,
  'expandable-cell-grid': ExpandableCellGrid,
  'mosaic-dim-grid': MosaicDimGrid,
  'flex-proportion-slices': FlexProportionSlices,
  'crosshair-guide-tile': CrosshairGuideTile,
  'deck-carousel-cards': DeckCarouselCards,
  'fan-spread-stack': FanSpreadStack,
  'incoming-message-stack': IncomingMessageStack,
  'panel-focus-swap': PanelFocusSwap,
  'scroll-grow-divider': ScrollGrowDivider,
  'sweeping-edge-divider': SweepingEdgeDivider,
  'or-chip-divider': OrChipDivider,
  'timeline-dot-divider': TimelineDotDivider,
  'slow-zoom-tile': SlowZoomTile,
  'bottom-caption-tile': BottomCaptionTile,
  'play-thumb-tile': PlayThumbTile,
  'ratio-cycle-tile': RatioCycleTile,
  'lift-shadow-panel': LiftShadowPanel,
  'border-draw-panel': BorderDrawPanel,
  'swinging-note-panel': SwingingNotePanel,
  'cursor-shadow-panel': CursorShadowPanel,
  'dual-counter-marquee': DualCounterMarquee,
  'vertical-chip-marquee': VerticalChipMarquee,
  'pause-hover-autoscroll': PauseHoverAutoscroll,
  'floating-chip-cloud': FloatingChipCloud,
}

const GRIDS = 'expandable-cell · mosaic-dim · proportion-slices · crosshair'
const STACKS = 'deck-carousel · fan-spread · incoming-stack · panel-swap'
const DIVIDERS = 'grow-on-view · sweeping-edge · or-chip · timeline-dot'
const TILES = 'slow-zoom · corner-caption · play-thumb · ratio-cycle'
const PANELS = 'lift-shadow · border-draw · swinging-note · cursor-shadow'
const SCROLLS = 'counter-marquee · vertical-marquee · hover-pause · chip-cloud'

export const layoutSources: Record<string, string> = {
  'horizontal-scroll-hijack': horizontalScroll,
  'parallax-depth-layers': parallax,
  'sticky-stacking-cards': stacking,
  'glass-spotlight-card': glassCard,
  'bento-hover-grid': bento,
  'masonry-reveal': masonry,
  'kanban-mini': kanban,
  'split-pane-resizer': splitPane,
  'marquee-band': marquee,
  'stock-ticker': ticker,
  'flip-card-grid': flipCards,
  'expanding-gallery': gallery,
  'expandable-cell-grid': tag('GridPatterns.tsx', GRIDS, gridPatterns),
  'mosaic-dim-grid': tag('GridPatterns.tsx', GRIDS, gridPatterns),
  'flex-proportion-slices': tag('GridPatterns.tsx', GRIDS, gridPatterns),
  'crosshair-guide-tile': tag('GridPatterns.tsx', GRIDS, gridPatterns),
  'deck-carousel-cards': tag('StackPatterns.tsx', STACKS, stackPatterns),
  'fan-spread-stack': tag('StackPatterns.tsx', STACKS, stackPatterns),
  'incoming-message-stack': tag('StackPatterns.tsx', STACKS, stackPatterns),
  'panel-focus-swap': tag('StackPatterns.tsx', STACKS, stackPatterns),
  'scroll-grow-divider': tag('DividerBits.tsx', DIVIDERS, dividerBits),
  'sweeping-edge-divider': tag('DividerBits.tsx', DIVIDERS, dividerBits),
  'or-chip-divider': tag('DividerBits.tsx', DIVIDERS, dividerBits),
  'timeline-dot-divider': tag('DividerBits.tsx', DIVIDERS, dividerBits),
  'slow-zoom-tile': tag('MediaTiles.tsx', TILES, mediaTiles),
  'bottom-caption-tile': tag('MediaTiles.tsx', TILES, mediaTiles),
  'play-thumb-tile': tag('MediaTiles.tsx', TILES, mediaTiles),
  'ratio-cycle-tile': tag('MediaTiles.tsx', TILES, mediaTiles),
  'lift-shadow-panel': tag('PanelBits.tsx', PANELS, panelBits),
  'border-draw-panel': tag('PanelBits.tsx', PANELS, panelBits),
  'swinging-note-panel': tag('PanelBits.tsx', PANELS, panelBits),
  'cursor-shadow-panel': tag('PanelBits.tsx', PANELS, panelBits),
  'dual-counter-marquee': tag('ScrollShowcase.tsx', SCROLLS, scrollShowcase),
  'vertical-chip-marquee': tag('ScrollShowcase.tsx', SCROLLS, scrollShowcase),
  'pause-hover-autoscroll': tag('ScrollShowcase.tsx', SCROLLS, scrollShowcase),
  'floating-chip-cloud': tag('ScrollShowcase.tsx', SCROLLS, scrollShowcase),
}
