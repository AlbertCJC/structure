import type { AnimationType, Category, StyleApproach } from '../types'

/**
 * Display metadata for every facet value — one place to tweak labels/colors.
 * Monochrome system: facet dots/swatches are shades of gray, distinguished
 * by lightness, so the shell never competes with the demo sandboxes.
 */

export const CATEGORY_META: Record<Category, { label: string; dot: string }> = {
  buttons: { label: 'Buttons', dot: '#ffffff' },
  loaders: { label: 'Loaders', dot: '#e5e5e5' },
  toggles: { label: 'Toggles', dot: '#d4d4d4' },
  navigation: { label: 'Navigation', dot: '#a3a3a3' },
  forms: { label: 'Forms', dot: '#8a8a8a' },
  feedback: { label: 'Feedback', dot: '#737373' },
  layout: { label: 'Layout & Scroll', dot: '#c9c9c9' },
  data: { label: 'Data & Charts', dot: '#b0b0b0' },
  overlay: { label: 'Overlays', dot: '#949494' },
  typography: { label: 'Typography', dot: '#606060' },
}

export const ANIMATION_META: Record<AnimationType, { label: string; color: string }> = {
  spring: { label: 'Spring', color: '#f5f5f5' },
  keyframe: { label: 'Keyframe', color: '#d4d4d4' },
  gsap: { label: 'GSAP', color: '#a3a3a3' },
  css: { label: 'CSS', color: '#737373' },
}

export const STYLE_META: Record<StyleApproach, { label: string; swatch: string }> = {
  glassmorphism: {
    label: 'Glassmorphism',
    swatch: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.3))',
  },
  brutalism: { label: 'Brutalism', swatch: 'linear-gradient(135deg, #fafafa 50%, #0a0a12 50%)' },
  neumorphism: { label: 'Neumorphism', swatch: 'linear-gradient(135deg, #3a3a3a, #161616)' },
  cyberpunk: { label: 'Cyberpunk', swatch: 'linear-gradient(135deg, #ffffff, #4d4d4d)' },
  minimal: { label: 'Minimal', swatch: 'linear-gradient(135deg, #e5e5e5, #9c9c9c)' },
  aurora: { label: 'Aurora', swatch: 'conic-gradient(#ffffff, #8a8a8a, #d4d4d4, #525252, #ffffff)' },
}

/** Stable iteration order for the sidebar facet lists. */
export const CATEGORY_ORDER: Category[] = [
  'buttons',
  'loaders',
  'toggles',
  'navigation',
  'forms',
  'feedback',
  'layout',
  'data',
  'overlay',
  'typography',
]
export const ANIMATION_ORDER: AnimationType[] = ['spring', 'keyframe', 'gsap', 'css']
export const STYLE_ORDER: StyleApproach[] = [
  'glassmorphism',
  'brutalism',
  'neumorphism',
  'cyberpunk',
  'minimal',
  'aurora',
]
