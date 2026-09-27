/**
 * Family-file source tagger.
 *
 * The 300+ expansion ships demos in FAMILY files (several sibling components
 * per file — the way real libraries ship variants). The `?raw` payload is
 * therefore shared by several ids; this prepends an accurate header so the
 * real file name and its roster travel with every copy/modal view.
 */
export const tag = (file: string, demos: string, raw: string): string =>
  `// ${file} — demos: ${demos}\n\n${raw}`
