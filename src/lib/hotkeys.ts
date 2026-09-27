/**
 * Shared hotkey helpers.
 *
 * `isTypingTarget` — global key handlers must never swallow keystrokes
 * aimed at a field the user is typing into (palette input, OTP demo…).
 * Returns true when the event target is editable: any input, textarea,
 * select, contentEditable node, or anything inside one.
 *
 * Used by the Command palette (⌘K / /), the source modal (←/→) and any
 * future global shortcuts.
 */
export function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  const el = target.closest('input, textarea, select, [contenteditable="true"], [contenteditable=""]')
  return el !== null
}
