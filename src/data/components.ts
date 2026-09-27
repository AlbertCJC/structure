import type { LibraryComponent } from '../types'
import { BUTTONS } from './domains/buttons'
import { DATA } from './domains/data'
import { FEEDBACK } from './domains/feedback'
import { FORMS } from './domains/forms'
import { LAYOUT } from './domains/layout'
import { LOADERS } from './domains/loaders'
import { NAVIGATION } from './domains/navigation'
import { OVERLAY } from './domains/overlay'
import { TOGGLES } from './domains/toggles'
import { TYPOGRAPHY } from './domains/typography'

/**
 * The catalog — 128 components, assembled from per-domain data modules.
 *
 *  • `id` keys three things: the live renderer (catalog/registry.tsx), the
 *    raw source used by "Copy Code" (catalog/sources.ts), and the DOM
 *    scroll target (`data-card-id`).
 *  • `animations` / `styles` / `tags` are the fuzzy-search + facet surface.
 *  • `size: 'featured'` promotes wide/tall demos into two-column cards with
 *    a taller sandbox (they contain their own scroll/drag regions).
 */
export const ALL_COMPONENTS: LibraryComponent[] = [
  ...BUTTONS,
  ...LOADERS,
  ...TOGGLES,
  ...NAVIGATION,
  ...FORMS,
  ...FEEDBACK,
  ...LAYOUT,
  ...DATA,
  ...OVERLAY,
  ...TYPOGRAPHY,
]
