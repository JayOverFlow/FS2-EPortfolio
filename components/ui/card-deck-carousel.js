/*
 * Card Deck Carousel — vanilla JS port of the React `card-deck-carousel`
 * component (components/ui/card-deck-carousel.tsx). Photos stacked like a
 * loose deck of prints: drag the top card and let go and it flies off, then
 * slides back in at the bottom of the pile; the next one is already waiting.
 * The buttons, arrow keys and autoplay do the same throw; "previous" pulls
 * the last card back on top.
 *
 * Usage:
 *   import { createCardDeck } from "../components/ui/card-deck-carousel.js";
 *   createCardDeck(mountEl, { slides: [{ image, title, caption }, ...] });
 *
 * Styles are injected once here, so the component is fully self-contained.
 */

const CD_CSS = [
  ".cd-root{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:clamp(28px,5vh,52px);overflow:hidden;background:var(--cd-bg);color:var(--cd-ink);outline:none;padding:24px 16px;box-sizing:border-box}",
  ".cd-root:focus-visible{box-shadow:inset 0 0 0 2px var(--cd-ink)}",
  ".cd-deck{position:relative;width:var(--cd-w);aspect-ratio:var(--cd-aspect);max-height:calc(var(--cd-h) * .62);max-width:calc(var(--cd-h) * .62 * var(--cd-ar));touch-action:pan-y}",
  ".cd-card{position:absolute;inset:0;border-radius:18px;overflow:hidden;background:#d9d5cc;box-shadow:0 1px 2px rgba(0,0,0,.08),0 30px 60px -30px rgba(0,0,0,.45);transition:transform .6s cubic-bezier(.2,.8,.2,1),opacity .4s ease,filter .4s ease;will-change:transform}",
  ".cd-card[data-top='1']{cursor:grab}",
  ".cd-card[data-drag='1']{cursor:grabbing;transition:none}",
  ".cd-card[data-fly='1']{transition:transform .45s cubic-bezier(.3,.5,.3,1),opacity .45s ease}",
  ".cd-card[data-snap='1']{transition:none}",
  ".cd-card img{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover;display:block;pointer-events:none;user-select:none;-webkit-user-drag:none}",
  ".cd-meta{display:flex;align-items:center;gap:clamp(16px,3vw,32px);width:min(var(--cd-w),100%);max-width:560px}",
  ".cd-cap{flex:1;min-width:0;overflow:hidden;padding-bottom:.2em}",
  ".cd-cap>*{display:block;animation:cd-in .6s cubic-bezier(.2,.8,.2,1) both}",
  ".cd-title{font:500 clamp(18px,2.2vw,24px)/1.15 'Source Serif 4',Georgia,'Times New Roman',serif;letter-spacing:-.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",
  ".cd-sub{margin-top:4px;font:400 13px/1.4 'Cousine',ui-monospace,monospace;color:var(--cd-muted);animation-delay:.05s}",
  ".cd-count{font:500 12px/1 'Cousine',ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.14em;color:var(--cd-muted);white-space:nowrap}",
  ".cd-count b{color:var(--cd-ink);font-weight:400}",
  ".cd-btn{appearance:none;border:1px solid var(--cd-line);background:transparent;color:inherit;width:40px;height:40px;border-radius:50%;display:grid;place-items:center;cursor:pointer;flex:none;transition:background .2s ease,color .2s ease;padding:0}",
  ".cd-btn:hover{background:var(--cd-ink);color:var(--cd-bg)}",
  ".cd-btn:focus-visible{outline:2px solid var(--cd-ink);outline-offset:2px}",
  ".cd-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}",
  "@keyframes cd-in{from{transform:translateY(100%);opacity:0}to{transform:none;opacity:1}}",
  "@media (prefers-reduced-motion:reduce){.cd-card,.cd-card[data-fly='1']{transition:opacity .3s ease}.cd-cap>*{animation:none}}",
].join("\n")

/* ------------------------------------------------------------ pure logic */

function wrap(i, n) {
  return n ? ((i % n) + n) % n : 0
}

/* Resting pose of a card `depth` places down the pile. Only the top four show. */
function deckPose(depth, tilt, reduce) {
  const d = Math.min(depth, 3)
  return {
    y: d ? -d * 16 : 0,
    scale: 1 - d * 0.055,
    rot: depth === 0 || reduce ? 0 : tilt,
    opacity: depth > 3 ? 0 : 1,
    shade: 1 - d * 0.07
  }
}

/* A stable, slightly random tilt per card, in [-max, max] degrees. */
function tiltFor(i, max) {
  const u = (((i + 1) * 2654435761) >>> 0) / 4294967296
  return (u * 2 - 1) * max
}

/* Did the drag end as a throw? dx in px, vx in px/ms, w = card width. */
function isThrow(dx, vx, w) {
  return Math.abs(dx) > w * 0.28 || (Math.abs(vx) > 0.55 && Math.abs(dx) > 24)
}

function pad2(n) {
  return n < 10 ? "0" + n : String(n)
}

/* ------------------------------------------------------------ component */

export function createCardDeck(mount, options) {
  const opts = options || {}
  const slides = opts.slides && opts.slides.length ? opts.slides : [
    { title: "First Light", caption: "Haze lifting off the eastern ridges." },
    { title: "High Pass", caption: "Cold air, clear to the far range." },
    { title: "Ember Hour", caption: "The last of the sun on the valley floor." }
  ]

  const height = opts.height || "auto"
  const cardWidth = opts.cardWidth || "min(78vw, 520px)"
  const aspect = opts.aspect || "4 / 3"
  const scatter = typeof opts.scatter === "number" ? opts.scatter : 6
  const autoplay = typeof opts.autoplay === "number" ? opts.autoplay : 4200
  const background = opts.background || "transparent"
  const ink = opts.ink || "var(--color-foreground, #161513)"

  const n = slides.length
  const reduce = window.matchMedia
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false

  /* One injected stylesheet per page. */
  if (!document.getElementById("cd-css")) {
    const style = document.createElement("style")
    style.id = "cd-css"
    style.textContent = CD_CSS
    document.head.appendChild(style)
  }

  const root = document.createElement("div")
  root.className = "cd-root"
  if (opts.ariaLabel) root.setAttribute("aria-label", opts.ariaLabel)
  root.setAttribute("role", "region")
  root.setAttribute("aria-roledescription", "carousel")
  root.tabIndex = 0

  const cssVars = {
    "--cd-h": typeof height === "number" ? height + "px" : height,
    "--cd-w": cardWidth,
    "--cd-aspect": aspect,
    "--cd-ar": aspect.replace(/\s/g, ""),
    "--cd-bg": background,
    "--cd-ink": ink,
    "--cd-muted": "color-mix(in srgb, var(--cd-ink) 55%, transparent)",
    "--cd-line": "color-mix(in srgb, var(--cd-ink) 18%, transparent)"
  }
  Object.keys(cssVars).forEach(function (k) { root.style.setProperty(k, cssVars[k]) })
  if (height !== "auto") root.style.height = typeof height === "number" ? height + "px" : height

  const deck = document.createElement("div")
  deck.className = "cd-deck"
  root.append(deck)

  const cards = slides.map(function (sl, i) {
    const card = document.createElement("div")
    card.className = "cd-card"
    if (sl.image) {
      const img = document.createElement("img")
      img.src = sl.image
      img.alt = sl.alt || sl.title || ""
      img.draggable = false
      img.loading = i < 2 ? "eager" : "lazy"
      card.append(img)
    }
    deck.append(card)
    return card
  })

  const meta = document.createElement("div")
  meta.className = "cd-meta"

  const prevBtn = document.createElement("button")
  prevBtn.type = "button"
  prevBtn.className = "cd-btn"
  prevBtn.setAttribute("aria-label", "Previous")
  prevBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M10 3 5 8l5 5" stroke="currentColor" stroke-width="1.4"/></svg>'

  const cap = document.createElement("div")
  cap.className = "cd-cap"
  cap.setAttribute("aria-hidden", "true")

  const count = document.createElement("span")
  count.className = "cd-count"
  count.setAttribute("aria-hidden", "true")

  const nextBtn = document.createElement("button")
  nextBtn.type = "button"
  nextBtn.className = "cd-btn"
  nextBtn.setAttribute("aria-label", "Next")
  nextBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="m6 3 5 5-5 5" stroke="currentColor" stroke-width="1.4"/></svg>'

  meta.append(prevBtn, cap, count, nextBtn)
  root.append(meta)

  const sr = document.createElement("div")
  sr.className = "cd-sr"
  sr.setAttribute("aria-live", "polite")
  root.append(sr)

  mount.append(root)

  /* ------------------------------------------------------------ state */

  let top = 0
  let busy = false
  let lastTouch = 0
  let over = null // { i, x, y, r, mode }

  function later(fn, ms) { return window.setTimeout(fn, ms) }

  function setCard(card, key, value) {
    if (value) card.setAttribute(key, value)
    else card.removeAttribute(key)
  }

  function render() {
    const s = slides[top] || {}
    cards.forEach(function (card, i) {
      const depth = wrap(i - top, n)
      const p = deckPose(depth, tiltFor(i, scatter), reduce)
      const o = over && over.i === i ? over : null
      const isTop = depth === 0
      const transform = o
        ? "translate(" + o.x + "px," + o.y + "px) rotate(" + o.r + "deg)"
        : "translateY(" + p.y + "px) scale(" + p.scale + ") rotate(" + p.rot.toFixed(2) + "deg)"
      card.style.transform = transform
      card.style.zIndex = String(o ? n + 1 : n - depth)
      card.style.opacity = String(o ? 1 : p.opacity)
      card.style.filter = o || isTop ? "none" : "brightness(" + p.shade + ")"
      setCard(card, "data-top", isTop ? "1" : "0")
      setCard(card, "data-drag", o && o.mode === "drag" ? "1" : "0")
      setCard(card, "data-fly", o && o.mode === "fly" ? "1" : "0")
      setCard(card, "data-snap", o && o.mode === "snap" ? "1" : "0")
      card.setAttribute("aria-hidden", isTop ? "false" : "true")
    })

    cap.innerHTML = ""
    if (s.title) cap.append(el("span", "cd-title", s.title))
    if (s.caption) cap.append(el("span", "cd-sub", s.caption))
    count.innerHTML = "<b>" + pad2(top + 1) + "</b> / " + pad2(n)
    sr.textContent = "Card " + (top + 1) + " of " + n + (s.title ? ": " + s.title : "")
  }

  function el(tag, cls, text) {
    const node = document.createElement(tag)
    if (cls) node.className = cls
    if (text) node.textContent = text
    return node
  }

  /* Fly the top card off toward (dirX, dirY), then tuck it under the pile. */
  function throwTop(dirX, fromX, fromY, dirY) {
    const w = deck.offsetWidth || 400
    if (busy || n < 2) return
    busy = true
    const i = top
    const sx = dirX >= 0 ? 1 : -1
    over = { i: i, x: (fromX || 0) + sx * w * 1.25, y: (fromY || 0) + (dirY || 0) * 0.4 - 40, r: sx * 16, mode: "fly" }
    render()
    later(function () {
      over = null
      top = wrap(top + 1, n)
      busy = false
      render()
    }, reduce ? 200 : 430)
  }

  /* Pull the bottom card back on top from the left. */
  function pullBack() {
    const w = deck.offsetWidth || 400
    if (busy || n < 2) return
    busy = true
    const i = wrap(top - 1, n)
    over = { i: i, x: -w * 1.25, y: -40, r: -16, mode: "snap" }
    render()
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        over = { i: i, x: 0, y: 0, r: 0, mode: "fly" }
        render()
        later(function () {
          over = null
          top = i
          busy = false
          render()
        }, reduce ? 200 : 450)
      })
    })
  }

  /* ------------------------------------------------------------ input */

  const drag = { active: false, x: 0, y: 0, lx: 0, lt: 0, vx: 0 }
  let dragCard = null

  function onDown(e) {
    lastTouch = performance.now()
    if (busy || (e.pointerType === "mouse" && e.button !== 0)) return
    dragCard = e.currentTarget
    try { dragCard.setPointerCapture(e.pointerId) } catch (err) { /* ignore */ }
    drag.active = true
    drag.x = e.clientX
    drag.y = e.clientY
    drag.lx = e.clientX
    drag.lt = e.timeStamp
    drag.vx = 0
  }

  function onMove(e) {
    if (!drag.active) return
    const dt = Math.max(1, e.timeStamp - drag.lt)
    drag.vx = 0.8 * ((e.clientX - drag.lx) / dt) + 0.2 * drag.vx
    drag.lx = e.clientX
    drag.lt = e.timeStamp
    const dx = e.clientX - drag.x
    const dy = e.clientY - drag.y
    over = { i: top, x: dx, y: dy, r: reduce ? 0 : dx * 0.05, mode: "drag" }
    render()
  }

  function onUp(e) {
    if (!drag.active) return
    drag.active = false
    dragCard = null
    lastTouch = performance.now()
    const dx = e.clientX - drag.x
    const dy = e.clientY - drag.y
    const w = deck.offsetWidth || 400
    if (isThrow(dx, drag.vx, w)) throwTop(dx, dx, dy, dy)
    else { over = null; render() }
  }

  cards.forEach(function (card) {
    card.addEventListener("pointerdown", onDown)
    card.addEventListener("pointermove", onMove)
    card.addEventListener("pointerup", onUp)
    card.addEventListener("pointercancel", onUp)
  })

  prevBtn.addEventListener("click", function () { lastTouch = performance.now(); pullBack() })
  nextBtn.addEventListener("click", function () { lastTouch = performance.now(); throwTop(1) })

  root.addEventListener("keydown", function (e) {
    lastTouch = performance.now()
    if (e.key === "ArrowRight") throwTop(1)
    else if (e.key === "ArrowLeft") pullBack()
    else return
    e.preventDefault()
  })

  /* ------------------------------------------------------------ autoplay */

  if (autoplay && n > 1) {
    let seen = true
    const io = new IntersectionObserver(function (entries) { seen = entries[0].isIntersecting })
    io.observe(root)
    window.setInterval(function () {
      if (!seen || document.hidden || performance.now() - lastTouch < autoplay) return
      throwTop(1)
    }, autoplay)
  }

  render()

  return { root: root, destroy: function () { root.remove() } }
}
