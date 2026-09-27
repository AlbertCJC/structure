/**
 * Browser audit — drives a real chromium against the dev server and asks
 * the DOM, for every catalog card, what its sandbox actually contains.
 *
 * Cull-aware: cards use content-visibility, so offscreen sandboxes render
 * nothing. The audit therefore scrolls EACH card into view before reading
 * it (per-card scrollIntoView on the main scroller).
 *
 *   node scripts/spy.mjs
 */
import { chromium } from 'playwright'

const browser = await chromium.launch({ args: ['--no-sandbox'] })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

const consoleLines = []
page.on('console', (m) => consoleLines.push(`[console.${m.type()}] ${m.text()}`))
page.on('pageerror', (e) => consoleLines.push(`[pageerror] ${e.message}`))
page.on('requestfailed', (r) => consoleLines.push(`[requestfailed] ${r.url()} — ${r.failure()?.errorText}`))

await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 90000 })
await page.waitForTimeout(2500)

const ids = await page.$$eval('[data-card-id]', (els) => els.map((e) => e.getAttribute('data-card-id')))
console.log(`TOTAL CARDS IN DOM: ${ids.length}`)

// demo children in a sandbox = everything except the category chip
// (pointer-events-none) and the hover-only Expand button (aria-label)
const AUDIT_FN = (cid) => {
  const el = document.querySelector(`[data-card-id="${cid}"]`)
  if (!el) return { id: cid, suspect: true, demoKids: -1, w: -1, h: -1, text: 'missing card' }
  const sandbox = el.querySelector('.sandbox-grid')
  const demoKids = sandbox
    ? [...sandbox.children].filter(
        (c) => !c.classList.contains('pointer-events-none') && !(c.tagName === 'BUTTON' && (c.getAttribute('aria-label') || '').startsWith('Expand')),
      )
    : []
  const first = demoKids[0]
  const rect = first?.getBoundingClientRect()
  const text = (sandbox?.textContent || '').trim()
  const suspect =
    /module graph|No renderer registered|errored/.test(text) ||
    demoKids.length === 0 ||
    !rect ||
    rect.width < 4 ||
    rect.height < 4
  return { id: cid, suspect, demoKids: demoKids.length, w: Math.round(rect?.width ?? -1), h: Math.round(rect?.height ?? -1), text: text.slice(0, 60) }
}

const bad = []
for (const id of ids) {
  await page.evaluate((cid) => {
    document.querySelector(`[data-card-id="${cid}"]`)?.scrollIntoView({ block: 'center' })
  }, id)
  await page.waitForTimeout(30)
  const m = await page.evaluate(AUDIT_FN, id)
  if (m.suspect) bad.push(m)
}
console.log(`SUSPECT CARDS: ${bad.length}`)
for (const b of bad.slice(0, 25)) console.log('  SUSPECT ' + JSON.stringify(b))
if (bad.length > 25) console.log(`  …and ${bad.length - 25} more`)

await page.evaluate(() => document.querySelector('main')?.scrollTo(0, 0))
await page.waitForTimeout(800)

// ── click-to-expand flow: metadata bar opens the source modal ──
let modalOk = false
try {
  await page.click('[data-card-id] [role="button"]', { timeout: 5000 })
  // source streams in with the (cached) domain chunk — wait for real content
  await page.waitForFunction(
    () => (document.querySelector('pre code')?.textContent?.length ?? 0) > 100,
    { timeout: 6000 },
  )
  await page.waitForTimeout(300)
  const codeLen = await page.evaluate(() => document.querySelector('pre code')?.textContent?.length ?? 0)
  const liveLabel = await page.evaluate(
    () => document.querySelector('pre code')?.closest('.grid')?.textContent?.toLowerCase().includes('live') ?? false,
  )
  modalOk = codeLen > 100 && liveLabel
  console.log(`MODAL: ${modalOk ? 'OK' : 'FAIL'} (source chars: ${codeLen}, live stage: ${liveLabel})`)

  // ── deep link: open modal mirrors #id in the URL ──
  const hash1 = await page.evaluate(() => window.location.hash)
  const deepOk = hash1.startsWith('#') && hash1.length > 3
  console.log(`MODAL DEEP LINK: ${deepOk ? 'OK' : 'FAIL'} (hash: ${hash1 || '∅'})`)
  if (!deepOk) modalOk = false

  // ── arrow-key browsing: → steps to the next component in grid order ──
  const title1 = await page.evaluate(() => document.querySelector('.fixed h2')?.textContent ?? '')
  const pos1 = await page.evaluate(
    () => document.querySelector('[aria-label="Next component"]')?.parentElement?.textContent ?? '',
  )
  await page.keyboard.press('ArrowRight')
  await page.waitForTimeout(700)
  const title2 = await page.evaluate(() => document.querySelector('.fixed h2')?.textContent ?? '')
  const hash2 = await page.evaluate(() => window.location.hash)
  const arrowOk = title1 !== title2 && hash2 !== hash1 && hash2.length > 3
  console.log(`MODAL ARROW BROWSE: ${arrowOk ? 'OK' : 'FAIL'} ("${title1}"→"${title2}", ${pos1.trim()})`)
  if (!arrowOk) modalOk = false

  await page.screenshot({ path: '/home/user/structura/grid-audit-modal.png' })
  await page.keyboard.press('Escape')
  await page.waitForTimeout(600)
  const modalGone = await page.evaluate(() => !document.querySelector('pre code'))
  const hashCleared = await page.evaluate(() => window.location.hash === '')
  console.log(`MODAL CLOSE VIA ESC: ${modalGone ? 'OK' : 'FAIL'} (hash cleared: ${hashCleared})`)
  if (!modalGone || !hashCleared) modalOk = false
} catch (e) {
  console.log('MODAL: FAIL —', /** @type {Error} */ (e).message)
}

// ── mono toggle ──
try {
  await page.click('button[aria-pressed]', { timeout: 5000 })
  await page.waitForTimeout(400)
  const gray = await page.evaluate(() => {
    const el = document.querySelector('#root > div')
    return el ? getComputedStyle(el).filter : 'none'
  })
  console.log(`MONO TOGGLE: ${gray.includes('grayscale') ? 'OK' : 'FAIL'} (filter: ${gray})`)
  await page.click('button[aria-pressed]')
} catch (e) {
  console.log('MONO TOGGLE: FAIL —', /** @type {Error} */ (e).message)
}

console.log('--- app console output ---')
for (const l of consoleLines) console.log(l)

await page.screenshot({ path: '/home/user/structura/grid-audit-top.png' })
console.log('screenshots saved')
await browser.close()
process.exit(bad.length === 0 && modalOk ? 0 : 1)
