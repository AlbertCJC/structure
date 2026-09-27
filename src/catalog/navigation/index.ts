import type { ComponentType } from 'react'
import { tag } from '../rawTag'
import { FloatingPillNav } from './FloatingPillNav'
import { SegmentedControl } from './SegmentedControl'
import { UnderlineMagneticNav } from './UnderlineMagneticNav'
import { BreadcrumbMorph } from './BreadcrumbMorph'
import { DockMagnifier } from './DockMagnifier'
import { BottomTabBar } from './BottomTabBar'
import { HoverMegaMenu } from './HoverMegaMenu'
import { TooltipRail } from './TooltipRail'
import { StepperNav } from './StepperNav'
import { PaginationMorph } from './PaginationMorph'
import { ScrollspyNav } from './ScrollspyNav'
import { CarouselDots } from './CarouselDots'
import { ContextMenuNav } from './ContextMenuNav'
// ── family files (3–8 demos each) ────────────────────────────────────────
import { HamburgerXButton, ArrowBackButton, PlusRotateFab, ChevronCycleButton } from './MenuButtons'
import { ArrowBackMorphButton, PlusCloseFabButton, KebabRailButton } from './NavMenuMorphs'
import { ElevatorFloorNav, GrowingDotTabs, ArrowChaseLink, BracketHoverNav } from './IndicatorNavs'
import { VerticalRailIndicator, BoxedHoverIndicator, ScrollDotIndicator } from './NavIndicators'
import { ChapterRailPlayer, ElevationStickyHeader, InnerScrollAnchors, BackToTopPill, BackToTopFabInner, ScrollProgressMini, NavbarShrinkMini, StickyChipMini } from './ScrollNavs'
import { VerticalMarkerTabs, FadeEdgeTabs, BadgeCountTabs, LayoutIdUnderlineTabs } from './TabsSet'
import { SlidingBoxTabs, BoxedIconTabs, ScrollEdgeTabs } from './TabsVariants'
import { ExternalLinkHover, CenterUnderlineLink, WipeRevealLink, HomeChevronBreadcrumb } from './LinkSet'
import { BracketHoverLink, ArrowSweepLink, WipeUnderlineLink, ExternalPopoverLink } from './LinkStyles'
import { RadialFanFab, ColumnStaggerFab, CornerExpandFab, BakeIntoBarFab, FanFabMenu, ColumnFabMenu, SelectActionBar } from './FabMenus'

import floatingPill from './FloatingPillNav.tsx?raw'
import segmented from './SegmentedControl.tsx?raw'
import underlineNav from './UnderlineMagneticNav.tsx?raw'
import breadcrumb from './BreadcrumbMorph.tsx?raw'
import dock from './DockMagnifier.tsx?raw'
import bottomTab from './BottomTabBar.tsx?raw'
import megaMenu from './HoverMegaMenu.tsx?raw'
import tooltipRail from './TooltipRail.tsx?raw'
import stepper from './StepperNav.tsx?raw'
import pagination from './PaginationMorph.tsx?raw'
import scrollspy from './ScrollspyNav.tsx?raw'
import carousel from './CarouselDots.tsx?raw'
import contextMenu from './ContextMenuNav.tsx?raw'
import menuButtons from './MenuButtons.tsx?raw'
import navMenuMorphs from './NavMenuMorphs.tsx?raw'
import indicatorNavs from './IndicatorNavs.tsx?raw'
import navIndicators from './NavIndicators.tsx?raw'
import scrollNavs from './ScrollNavs.tsx?raw'
import tabsSet from './TabsSet.tsx?raw'
import tabsVariants from './TabsVariants.tsx?raw'
import linkSet from './LinkSet.tsx?raw'
import linkStyles from './LinkStyles.tsx?raw'
import fabMenus from './FabMenus.tsx?raw'

export const navRenderers: Record<string, ComponentType> = {
  'floating-pill-nav': FloatingPillNav,
  'segmented-control': SegmentedControl,
  'underline-magnetic-nav': UnderlineMagneticNav,
  'breadcrumb-morph': BreadcrumbMorph,
  'dock-magnifier': DockMagnifier,
  'bottom-tab-bar': BottomTabBar,
  'hover-mega-menu': HoverMegaMenu,
  'tooltip-rail': TooltipRail,
  'stepper-nav': StepperNav,
  'pagination-morph': PaginationMorph,
  'scrollspy-nav': ScrollspyNav,
  'carousel-dots': CarouselDots,
  'context-menu': ContextMenuNav,
  // MenuButtons
  'hamburger-x-button': HamburgerXButton,
  'arrow-back-button': ArrowBackButton,
  'plus-rotate-fab': PlusRotateFab,
  'chevron-cycle-button': ChevronCycleButton,
  // NavMenuMorphs
  'arrow-back-morph-button': ArrowBackMorphButton,
  'plus-close-fab-button': PlusCloseFabButton,
  'kebab-rail-button': KebabRailButton,
  // IndicatorNavs
  'elevator-floor-nav': ElevatorFloorNav,
  'growing-dot-tabs': GrowingDotTabs,
  'arrow-chase-link': ArrowChaseLink,
  'bracket-hover-nav': BracketHoverNav,
  // NavIndicators
  'vertical-rail-indicator': VerticalRailIndicator,
  'boxed-hover-indicator': BoxedHoverIndicator,
  'scroll-dot-indicator': ScrollDotIndicator,
  // ScrollNavs
  'chapter-rail-player': ChapterRailPlayer,
  'elevation-sticky-header': ElevationStickyHeader,
  'inner-scroll-anchors': InnerScrollAnchors,
  'back-to-top-pill': BackToTopPill,
  'back-to-top-fab-inner': BackToTopFabInner,
  'scroll-progress-bar': ScrollProgressMini,
  'navbar-shrink-scroll': NavbarShrinkMini,
  'sticky-chip-nav': StickyChipMini,
  // TabsSet
  'vertical-marker-tabs': VerticalMarkerTabs,
  'fade-edge-tabs': FadeEdgeTabs,
  'badge-count-tabs': BadgeCountTabs,
  'layoutid-underline-tabs': LayoutIdUnderlineTabs,
  // TabsVariants
  'sliding-box-tabs': SlidingBoxTabs,
  'boxed-icon-tabs': BoxedIconTabs,
  'scroll-edge-tabs': ScrollEdgeTabs,
  // LinkSet
  'external-link-hover': ExternalLinkHover,
  'center-underline-link': CenterUnderlineLink,
  'wipe-reveal-link': WipeRevealLink,
  'home-chevron-breadcrumb': HomeChevronBreadcrumb,
  // LinkStyles
  'bracket-hover-link': BracketHoverLink,
  'arrow-sweep-link': ArrowSweepLink,
  'wipe-underline-link': WipeUnderlineLink,
  'external-popover-link': ExternalPopoverLink,
  // FabMenus
  'radial-fan-fab': RadialFanFab,
  'column-stagger-fab': ColumnStaggerFab,
  'corner-expand-fab': CornerExpandFab,
  'bake-into-bar-fab': BakeIntoBarFab,
  'fan-fab-menu': FanFabMenu,
  'column-fab-menu': ColumnFabMenu,
  'select-action-bar': SelectActionBar,
}

const MENU = 'hamburger-x · arrow-back · plus-rotate · chevron-cycle'
const MORPHS = 'arrow-back-morph · plus-close · kebab-rail'
const INDICATORS = 'elevator-floors · growing-dot · arrow-chase · bracket-hover'
const TAGS2 = 'vertical-rail · boxed-hover · scroll-dots'
const SCROLL = 'chapter-rail · elevated-header · inner-anchors · top-pill · top-fab · progress-bar · shrink-nav · sticky-chips'
const TABS = 'vertical-marker · fade-edge · badge-count · layoutid-underline'
const TABS2 = 'sliding-box · icon-tab · edge-fade'
const LINKS = 'external-hover · center-underline · wipe-reveal · home-breadcrumb'
const LINKS2 = 'bracket · arrow-sweep · wipe-underline · external-hint'
const FABS = 'radial-fan · column-stagger · corner-expand · bake-bar · fan-menu · column-menu · selection-bar'

export const navSources: Record<string, string> = {
  'floating-pill-nav': floatingPill,
  'segmented-control': segmented,
  'underline-magnetic-nav': underlineNav,
  'breadcrumb-morph': breadcrumb,
  'dock-magnifier': dock,
  'bottom-tab-bar': bottomTab,
  'hover-mega-menu': megaMenu,
  'tooltip-rail': tooltipRail,
  'stepper-nav': stepper,
  'pagination-morph': pagination,
  'scrollspy-nav': scrollspy,
  'carousel-dots': carousel,
  'context-menu': contextMenu,
  'hamburger-x-button': tag('MenuButtons.tsx', MENU, menuButtons),
  'arrow-back-button': tag('MenuButtons.tsx', MENU, menuButtons),
  'plus-rotate-fab': tag('MenuButtons.tsx', MENU, menuButtons),
  'chevron-cycle-button': tag('MenuButtons.tsx', MENU, menuButtons),
  'arrow-back-morph-button': tag('NavMenuMorphs.tsx', MORPHS, navMenuMorphs),
  'plus-close-fab-button': tag('NavMenuMorphs.tsx', MORPHS, navMenuMorphs),
  'kebab-rail-button': tag('NavMenuMorphs.tsx', MORPHS, navMenuMorphs),
  'elevator-floor-nav': tag('IndicatorNavs.tsx', INDICATORS, indicatorNavs),
  'growing-dot-tabs': tag('IndicatorNavs.tsx', INDICATORS, indicatorNavs),
  'arrow-chase-link': tag('IndicatorNavs.tsx', INDICATORS, indicatorNavs),
  'bracket-hover-nav': tag('IndicatorNavs.tsx', INDICATORS, indicatorNavs),
  'vertical-rail-indicator': tag('NavIndicators.tsx', TAGS2, navIndicators),
  'boxed-hover-indicator': tag('NavIndicators.tsx', TAGS2, navIndicators),
  'scroll-dot-indicator': tag('NavIndicators.tsx', TAGS2, navIndicators),
  'chapter-rail-player': tag('ScrollNavs.tsx', SCROLL, scrollNavs),
  'elevation-sticky-header': tag('ScrollNavs.tsx', SCROLL, scrollNavs),
  'inner-scroll-anchors': tag('ScrollNavs.tsx', SCROLL, scrollNavs),
  'back-to-top-pill': tag('ScrollNavs.tsx', SCROLL, scrollNavs),
  'back-to-top-fab-inner': tag('ScrollNavs.tsx', SCROLL, scrollNavs),
  'scroll-progress-bar': tag('ScrollNavs.tsx', SCROLL, scrollNavs),
  'navbar-shrink-scroll': tag('ScrollNavs.tsx', SCROLL, scrollNavs),
  'sticky-chip-nav': tag('ScrollNavs.tsx', SCROLL, scrollNavs),
  'vertical-marker-tabs': tag('TabsSet.tsx', TABS, tabsSet),
  'fade-edge-tabs': tag('TabsSet.tsx', TABS, tabsSet),
  'badge-count-tabs': tag('TabsSet.tsx', TABS, tabsSet),
  'layoutid-underline-tabs': tag('TabsSet.tsx', TABS, tabsSet),
  'sliding-box-tabs': tag('TabsVariants.tsx', TABS2, tabsVariants),
  'boxed-icon-tabs': tag('TabsVariants.tsx', TABS2, tabsVariants),
  'scroll-edge-tabs': tag('TabsVariants.tsx', TABS2, tabsVariants),
  'external-link-hover': tag('LinkSet.tsx', LINKS, linkSet),
  'center-underline-link': tag('LinkSet.tsx', LINKS, linkSet),
  'wipe-reveal-link': tag('LinkSet.tsx', LINKS, linkSet),
  'home-chevron-breadcrumb': tag('LinkSet.tsx', LINKS, linkSet),
  'bracket-hover-link': tag('LinkStyles.tsx', LINKS2, linkStyles),
  'arrow-sweep-link': tag('LinkStyles.tsx', LINKS2, linkStyles),
  'wipe-underline-link': tag('LinkStyles.tsx', LINKS2, linkStyles),
  'external-popover-link': tag('LinkStyles.tsx', LINKS2, linkStyles),
  'radial-fan-fab': tag('FabMenus.tsx', FABS, fabMenus),
  'column-stagger-fab': tag('FabMenus.tsx', FABS, fabMenus),
  'corner-expand-fab': tag('FabMenus.tsx', FABS, fabMenus),
  'bake-into-bar-fab': tag('FabMenus.tsx', FABS, fabMenus),
  'fan-fab-menu': tag('FabMenus.tsx', FABS, fabMenus),
  'column-fab-menu': tag('FabMenus.tsx', FABS, fabMenus),
  'select-action-bar': tag('FabMenus.tsx', FABS, fabMenus),
}
