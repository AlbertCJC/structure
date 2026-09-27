/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  Lightweight fuzzy matcher (no dependencies).
 *
 * Scoring model:
 *  1. Case-insensitive substring hit  → strong score (100 + position bonus).
 *  2. Otherwise a subsequence match is attempted character-by-character.
 *     - Each matched character earns points; CONSECUTIVE matches earn a
 *       growing streak bonus (so "glb" beats scattered g…l…b).
 *     - Matches that land on a word boundary earn a bonus (camelCase,
 *       snake_case, spaces, parentheses).
 *     - Any gap resets the streak.
 *  3. No complete subsequence → -1 (definite miss).
 *
 * `fuzzyMatchAll` splits the query into words and requires EVERY word to
 *  score somewhere across the provided targets (AND semantics across words,
 *  OR across targets) — which is what makes "gsap scroll" find
 *  "Horizontal Scroll Hijack" while still ranking exact title hits higher.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export function fuzzyScore(query: string, target: string): number {
  const q = query.toLowerCase().trim()
  const t = target.toLowerCase()
  if (!q) return 0
  if (!t) return -1

  // Fast path: exact substring.
  const idx = t.indexOf(q)
  if (idx !== -1) return 100 + (t.length - idx)

  // Subsequence pass with streak + word-boundary bonuses.
  let score = 0
  let streak = 0
  let qi = 0
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    const ch = t[ti]
    if (ch === q[qi]) {
      qi += 1
      streak += 1
      score += 1 + streak * 2
      if (ti === 0 || /[\s\-_/(.:]/.test(t[ti - 1])) score += 6
    } else {
      streak = 0
    }
  }
  return qi === q.length ? score : -1
}

export function fuzzyMatchAll(query: string, targets: string[]): number {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (words.length === 0) return 0

  let total = 0
  for (const word of words) {
    let best = -1
    for (const target of targets) {
      best = Math.max(best, fuzzyScore(word, target))
    }
    if (best < 0) return -1 // every word must find a home
    total += best
  }
  return total
}
