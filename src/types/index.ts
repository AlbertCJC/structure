/** Domain vocabulary for the whole library. Every facet the sidebar can
 *  filter on, and every field a catalog entry carries, lives here. */

export type Category =
  | 'buttons'
  | 'loaders'
  | 'toggles'
  | 'navigation'
  | 'forms'
  | 'feedback'
  | 'layout'
  | 'data'
  | 'overlay'
  | 'typography'

export type AnimationType = 'spring' | 'keyframe' | 'gsap' | 'css'

export type StyleApproach =
  | 'glassmorphism'
  | 'brutalism'
  | 'neumorphism'
  | 'cyberpunk'
  | 'minimal'
  | 'aurora'

export type SortOrder = 'popular' | 'az' | 'za'

export type CardSize = 'md' | 'featured'

export interface LibraryComponent {
  /** Stable id — keys the grid, the renderer registry and the raw sources. */
  id: string
  title: string
  description: string
  category: Category
  /** Motion engines used by the demo (searchable facet). */
  animations: AnimationType[]
  /** Style language (searchable facet). */
  styles: StyleApproach[]
  /** Free-form tags — indexed by fuzzy search. */
  tags: string[]
  /** 0–100 weight for the default "Popular" sort. */
  popularity: number
  /** 'featured' cards span two columns and get a taller sandbox (scroll demos). */
  size: CardSize
}
