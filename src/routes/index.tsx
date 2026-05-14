import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tannie — Year Two" },
      { name: "description", content: "A letter, with secrets folded in." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:wght@300;400&family=Caveat:wght@400;500&display=swap",
      },
    ],
  }),
  component: TanniePage,
});

const STYLES = `
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
:root {
  --bg: #0e0d0b; --surface: #161412;
  --paper: #f2ece0; --paper-warm: #ede6d5;
  --ink: #1c1a16; --ink-mid: #4a4540; --ink-soft: #7a746c; --ink-ghost: #b0a898;
  --gold: #c9a96e; --gold-dim: #8a7148;
  --serif: 'Playfair Display', Georgia, serif;
  --sans: 'DM Sans', system-ui, sans-serif;
  --hand: 'Caveat', cursive;
  --transition: cubic-bezier(0.4, 0, 0.2, 1);
}
html { scroll-behavior: smooth; }
body { background: var(--bg); color: var(--paper); font-family: var(--serif); min-height: 100vh; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
body::after { content: ''; position: fixed; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.035'/%3E%3C/svg%3E"); pointer-events: none; z-index: 9999; mix-blend-mode: overlay; }

/* LOADER */
#loader { position: fixed; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--bg); z-index: 1000; transition: opacity 1.2s var(--transition), visibility 1.2s; }
#loader.out { opacity: 0; visibility: hidden; }
.loader-year { font-family: var(--sans); font-size: 11px; letter-spacing: 0.35em; color: var(--ink-soft); text-transform: uppercase; margin-bottom: 2.8rem; opacity: 0; animation: rise 1.2s var(--transition) 0.4s forwards; }
.loader-title { font-family: var(--serif); font-size: clamp(56px, 10vw, 110px); font-weight: 400; font-style: italic; color: var(--paper); line-height: 1; opacity: 0; animation: rise 1.4s var(--transition) 0.7s forwards; letter-spacing: -0.02em; }
.loader-sub { font-family: var(--sans); font-size: 11px; letter-spacing: 0.3em; color: var(--gold-dim); text-transform: uppercase; margin-top: 2.5rem; opacity: 0; animation: rise 1.2s var(--transition) 1.4s forwards; }
.loader-enter { margin-top: 4rem; font-family: var(--sans); font-size: 11px; letter-spacing: 0.25em; color: var(--ink-soft); text-transform: uppercase; opacity: 0; animation: rise 1s var(--transition) 2.4s forwards; cursor: pointer; border: none; background: none; transition: color 0.3s; padding: 0.5rem 1rem; }
.loader-enter:hover { color: var(--paper); }

#main { opacity: 0; transition: opacity 1.4s var(--transition); min-height: 100vh; }
#main.visible { opacity: 1; }

.chapter { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 8vh 6vw; position: relative; }

#ch1 { flex-direction: column; text-align: center; }
.ch1-eyebrow { font-family: var(--sans); font-size: 10px; letter-spacing: 0.4em; color: var(--gold-dim); text-transform: uppercase; margin-bottom: 3rem; opacity: 0; transform: translateY(8px); transition: all 1.2s var(--transition); }
.ch1-eyebrow.in { opacity: 1; transform: translateY(0); }
.ch1-headline { font-size: clamp(38px, 6vw, 72px); font-weight: 400; font-style: italic; line-height: 1.15; color: var(--paper); max-width: 700px; opacity: 0; transform: translateY(14px); transition: all 1.4s var(--transition) 0.2s; }
.ch1-headline.in { opacity: 1; transform: translateY(0); }
.ch1-rule { width: 1px; height: 0; background: var(--gold-dim); margin: 3.5rem auto; transition: height 1.6s var(--transition) 0.4s; }
.ch1-rule.in { height: 60px; }
.ch1-body { font-family: var(--sans); font-size: clamp(15px, 1.8vw, 18px); font-weight: 300; color: var(--ink-ghost); line-height: 1.9; max-width: 480px; opacity: 0; transform: translateY(10px); transition: all 1.2s var(--transition) 0.6s; }
.ch1-body.in { opacity: 1; transform: translateY(0); }
.scroll-nudge { position: absolute; bottom: 3rem; left: 50%; transform: translateX(-50%); font-family: var(--sans); font-size: 10px; letter-spacing: 0.3em; color: var(--ink-soft); text-transform: uppercase; opacity: 0; animation: breath 3s ease-in-out 3s infinite; }
@keyframes breath { 0%,100% { opacity: 0.3; } 50% { opacity: 0.7; } }

/* CH2 */
#ch2 { flex-direction: column; min-height: auto; padding: 10vh 6vw; gap: 5rem; }
.ch2-label { font-family: var(--sans); font-size: 10px; letter-spacing: 0.4em; color: var(--gold-dim); text-transform: uppercase; text-align: center; opacity: 0; transition: opacity 1.2s var(--transition); }
.ch2-label.in { opacity: 1; }
.ch2-instruction { font-family: var(--sans); font-size: 12px; letter-spacing: 0.15em; color: var(--ink-soft); text-align: center; margin-top: 1rem; opacity: 0; transition: opacity 1.2s var(--transition) 0.3s; }
.ch2-instruction.in { opacity: 1; }
.fragment-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5px; width: 100%; max-width: 900px; margin: 0 auto; opacity: 0; transition: opacity 1.4s var(--transition) 0.5s; }
.fragment-grid.in { opacity: 1; }
.fragment { background: var(--surface); padding: 2.5rem 2rem; cursor: pointer; position: relative; overflow: hidden; border: 1px solid #1e1c18; transition: background 0.4s, border-color 0.4s; min-height: 180px; display: flex; flex-direction: column; justify-content: space-between; }
.fragment:hover { background: #1c1a15; border-color: #2a271f; }
.fragment.opened { border-color: var(--gold-dim); background: #1a1812; }
.fragment-number { font-family: var(--sans); font-size: 10px; letter-spacing: 0.3em; color: var(--gold-dim); text-transform: uppercase; margin-bottom: 1.5rem; opacity: 0.6; }
.fragment-locked { font-family: var(--serif); font-size: 22px; font-style: italic; color: var(--ink-mid); line-height: 1.4; transition: all 0.6s var(--transition); user-select: none; }
.fragment.opened .fragment-locked { color: var(--paper); }
.fragment-reveal { font-family: var(--sans); font-size: 12px; color: var(--ink-soft); letter-spacing: 0.15em; margin-top: 1.5rem; max-height: 0; overflow: hidden; opacity: 0; transition: max-height 0.8s var(--transition), opacity 0.6s var(--transition) 0.2s; line-height: 1.7; }
.fragment.opened .fragment-reveal { max-height: 240px; opacity: 1; }
.fragment-photo-cue { display: inline-block; margin-top: 0.8rem; font-family: var(--sans); font-size: 9px; letter-spacing: 0.3em; color: var(--gold-dim); text-transform: uppercase; border-bottom: 1px solid var(--gold-dim); padding-bottom: 2px; cursor: pointer; opacity: 0; transition: opacity 0.6s 0.4s, color 0.3s; }
.fragment.opened .fragment-photo-cue { opacity: 1; }
.fragment-photo-cue:hover { color: var(--gold); }
.fragment-hint { position: absolute; bottom: 1.2rem; right: 1.5rem; font-family: var(--sans); font-size: 9px; letter-spacing: 0.25em; color: var(--ink-soft); text-transform: uppercase; transition: opacity 0.3s; }
.fragment.opened .fragment-hint { opacity: 0; }
.fragment::before { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.03) 50%, transparent 100%); transform: translateX(-100%); transition: transform 0s; }
.fragment:hover::before { transform: translateX(100%); transition: transform 0.8s ease; }

/* CH3 */
#ch3 { align-items: flex-start; justify-content: center; padding: 0; }
.letter-wrap { width: min(680px, 94vw); margin: 0 auto; padding: 7rem 5rem 8rem; background: var(--paper-warm); position: relative; box-shadow: 0 0 200px rgba(0,0,0,0.8); opacity: 0; transform: translateY(20px); transition: all 1.4s var(--transition); }
.letter-wrap.in { opacity: 1; transform: translateY(0); }
.letter-wrap::before { content: ''; position: absolute; inset: 0; background-image: repeating-linear-gradient(180deg, transparent, transparent 27px, rgba(80,65,45,0.05) 27px, rgba(80,65,45,0.05) 28px); pointer-events: none; }
.letter-wrap::after { content: ''; position: absolute; left: 3.5rem; top: 0; bottom: 0; width: 1px; background: rgba(200,150,100,0.12); pointer-events: none; }
.letter-meta { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4.5rem; }
.letter-from { font-family: var(--sans); font-size: 10px; letter-spacing: 0.3em; color: var(--ink-soft); text-transform: uppercase; line-height: 1.9; }
.letter-stamp { width: 54px; height: 54px; border: 1.5px solid rgba(100,80,60,0.25); border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1px; cursor: pointer; transition: border-color 0.3s, transform 0.3s; }
.letter-stamp:hover { border-color: rgba(100,80,60,0.5); transform: rotate(-4deg); }
.letter-stamp span { font-family: var(--sans); font-size: 8px; letter-spacing: 0.1em; color: var(--ink-soft); text-transform: uppercase; text-align: center; line-height: 1.4; }
.letter-stamp .stamp-num { font-family: var(--serif); font-size: 15px; color: var(--ink-mid); font-style: italic; }
.letter-salutation { font-family: var(--serif); font-size: 14px; font-style: italic; letter-spacing: 0.08em; color: var(--ink-soft); margin-bottom: 2.8rem; }
.letter-body-text p { font-family: var(--serif); font-size: clamp(18px, 2.3vw, 23px); font-weight: 400; color: var(--ink); line-height: 1.9; margin-bottom: 2rem; opacity: 0; transform: translateY(10px); transition: all 1s var(--transition); }
.letter-body-text p.in { opacity: 1; transform: translateY(0); }
.redact { background: var(--ink); color: var(--ink); border-radius: 2px; cursor: pointer; padding: 0 3px; transition: background 0.6s ease, color 0.6s ease; display: inline; user-select: none; }
.redact:hover { background: #2a2520; }
.redact.revealed { background: transparent; color: var(--ink); text-decoration: underline; text-decoration-color: rgba(100,80,60,0.3); text-underline-offset: 3px; }
.fn-mark { font-family: var(--sans); font-size: 9px; vertical-align: super; color: var(--gold-dim); cursor: pointer; margin-left: 1px; transition: color 0.3s; }
.fn-mark:hover { color: var(--gold); }
.footnotes { margin-top: 3.5rem; padding-top: 2rem; border-top: 1px solid rgba(100,80,60,0.15); }
.footnote-item { display: flex; gap: 1.2rem; margin-bottom: 1.2rem; opacity: 0; transform: translateX(-8px); transition: all 0.6s var(--transition); }
.footnote-item.revealed { opacity: 1; transform: translateX(0); }
.fn-num { font-family: var(--sans); font-size: 10px; color: var(--gold-dim); min-width: 16px; padding-top: 3px; }
.fn-text { font-family: var(--sans); font-size: 13px; font-style: italic; color: var(--ink-soft); line-height: 1.7; }
.letter-closing { margin-top: 4rem; opacity: 0; transform: translateY(10px); transition: all 1.2s var(--transition) 0.3s; }
.letter-closing.in { opacity: 1; transform: translateY(0); }
.closing-line { font-family: var(--sans); font-size: 11px; letter-spacing: 0.2em; color: var(--ink-soft); text-transform: uppercase; margin-bottom: 1rem; }
.sig { font-family: var(--serif); font-size: clamp(36px, 6vw, 56px); font-style: italic; font-weight: 400; color: var(--ink-mid); line-height: 1; cursor: pointer; transition: color 0.4s; user-select: none; }
.sig:hover { color: var(--ink); }
.sig.unlocked { color: var(--gold-dim); }
.sig-secret { font-family: var(--hand); font-size: 18px; color: var(--ink-mid); margin-top: 0.8rem; opacity: 0; max-height: 0; overflow: hidden; transition: opacity 0.8s, max-height 0.8s; }
.sig-secret.show { opacity: 1; max-height: 80px; }

/* CH4 */
#ch4 { min-height: 80vh; flex-direction: column; align-items: center; justify-content: center; padding: 8vh 6vw; background: var(--bg); position: relative; }
.final-trigger { font-family: var(--sans); font-size: 10px; letter-spacing: 0.35em; color: var(--ink-soft); text-transform: uppercase; text-align: center; margin-bottom: 3rem; opacity: 0; transition: opacity 1.2s var(--transition); }
.final-trigger.in { opacity: 1; }
.final-gate { text-align: center; max-width: 560px; }
.final-locked { font-family: var(--serif); font-size: 16px; font-style: italic; color: var(--ink-mid); opacity: 0; transition: opacity 1s var(--transition); }
.final-locked.show { opacity: 1; }
.final-message { opacity: 0; transform: translateY(16px); transition: opacity 1.6s var(--transition), transform 1.6s var(--transition); pointer-events: none; }
.final-message.unlocked { opacity: 1; transform: translateY(0); pointer-events: all; }
.final-big { font-family: var(--serif); font-size: clamp(28px, 5vw, 52px); font-weight: 400; font-style: italic; color: var(--paper); line-height: 1.3; margin-bottom: 2.5rem; }
.final-small { font-family: var(--sans); font-size: 14px; font-weight: 300; color: var(--ink-ghost); line-height: 1.85; max-width: 420px; margin: 0 auto 3rem; }
.final-secret-cue { display: inline-block; margin-top: 1.5rem; font-family: var(--sans); font-size: 10px; letter-spacing: 0.3em; color: var(--gold-dim); text-transform: uppercase; border-bottom: 1px solid var(--gold-dim); padding-bottom: 3px; cursor: pointer; transition: color 0.3s; }
.final-secret-cue:hover { color: var(--gold); }
.gold-rule { width: 40px; height: 1px; background: var(--gold-dim); margin: 2.5rem auto; }

/* WORD SWAP */
.word-swap { cursor: pointer; border-bottom: 1px dashed rgba(201,169,110,0.4); transition: color 0.4s; }
.word-swap:hover { color: var(--gold); }

/* STICKY NOTE */
.sticky-note { position: absolute; left: -2.5rem; top: 30%; width: 140px; padding: 14px 12px; background: #f7e9a6; color: #4a4540; font-family: var(--hand); font-size: 18px; line-height: 1.2; transform: rotate(-7deg); box-shadow: 4px 6px 14px rgba(0,0,0,0.35); opacity: 0; pointer-events: none; transition: opacity 0.6s, transform 0.6s; z-index: 5; }
.sticky-note.show { opacity: 1; transform: rotate(-7deg) translateY(-6px); pointer-events: all; }
@media (max-width: 720px) { .sticky-note { left: 0.5rem; top: -3rem; } }

/* PROGRESS */
.progress-bar { position: fixed; bottom: 2rem; left: 50%; transform: translateX(-50%); display: flex; gap: 6px; z-index: 100; opacity: 0; transition: opacity 0.6s; }
.progress-bar.show { opacity: 1; }
.progress-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--ink-mid); transition: background 0.4s, transform 0.4s; }
.progress-dot.done { background: var(--gold-dim); transform: scale(1.3); }

/* MUSIC */
.music-btn { position: fixed; top: 2rem; right: 2rem; font-family: var(--sans); font-size: 9px; letter-spacing: 0.25em; color: var(--ink-soft); text-transform: uppercase; background: none; border: 1px solid #2a261e; padding: 0.5rem 0.9rem; cursor: pointer; z-index: 200; border-radius: 2px; opacity: 0; transition: opacity 0.6s, color 0.3s, border-color 0.3s; }
.music-btn.show { opacity: 1; }
.music-btn:hover { color: var(--paper); border-color: var(--ink-mid); }
.music-btn.playing { color: var(--gold-dim); border-color: var(--gold-dim); }

/* HINT TOP-LEFT */
.secret-hint { position: fixed; top: 2rem; left: 2rem; font-family: var(--sans); font-size: 9px; letter-spacing: 0.3em; color: var(--ink-soft); text-transform: uppercase; z-index: 200; opacity: 0; transition: opacity 0.6s; }
.secret-hint.show { opacity: 1; }
.secret-hint .count { color: var(--gold-dim); }

/* POLAROID MODAL */
.polaroid-overlay { position: fixed; inset: 0; background: rgba(8,7,6,0.88); z-index: 500; display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity 0.5s var(--transition); backdrop-filter: blur(6px); padding: 4vh 6vw; }
.polaroid-overlay.show { opacity: 1; pointer-events: all; }
.polaroid { background: #f6f0e2; padding: 14px 14px 60px; box-shadow: 0 30px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04); transform: rotate(-2deg) scale(0.92); transition: transform 0.7s var(--transition); max-width: min(440px, 86vw); position: relative; }
.polaroid-overlay.show .polaroid { transform: rotate(-2deg) scale(1); }
.polaroid img { display: block; width: 100%; height: auto; filter: sepia(0.18) contrast(0.98); }
.polaroid-caption { position: absolute; left: 0; right: 0; bottom: 14px; text-align: center; font-family: var(--hand); font-size: 22px; color: #4a4540; padding: 0 16px; line-height: 1.2; }
.polaroid-close { position: absolute; top: -36px; right: -4px; font-family: var(--sans); font-size: 9px; letter-spacing: 0.3em; color: var(--paper); text-transform: uppercase; background: none; border: 1px solid rgba(255,255,255,0.2); padding: 0.4rem 0.8rem; cursor: pointer; border-radius: 2px; }
.polaroid-close:hover { border-color: var(--gold-dim); color: var(--gold); }

/* HEART RAIN */
.heart { position: fixed; top: -40px; font-size: 22px; color: var(--gold); pointer-events: none; z-index: 400; animation: fall linear forwards; user-select: none; }
@keyframes fall { to { transform: translateY(110vh) rotate(360deg); opacity: 0; } }

/* DISTANCE FOOTER */
.distance-footer { text-align: center; padding: 4rem 2rem 6rem; }
.distance-num { font-family: var(--serif); font-size: clamp(48px, 8vw, 88px); font-style: italic; color: #1e1c18; line-height: 1; display: block; cursor: pointer; transition: color 0.6s; }
.distance-num.tapped { color: var(--gold-dim); }
.distance-label { font-family: var(--sans); font-size: 10px; letter-spacing: 0.35em; color: var(--ink-soft); text-transform: uppercase; margin-top: 1rem; display: block; }
.distance-coda { font-family: var(--serif); font-size: 16px; font-style: italic; color: var(--ink-mid); margin-top: 1.5rem; display: block; }

@keyframes rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.reveal-on-scroll { opacity: 0; transform: translateY(14px); transition: opacity 1.2s var(--transition), transform 1.2s var(--transition); }
.reveal-on-scroll.in { opacity: 1; transform: translateY(0); }

@media (max-width: 640px) {
  .letter-wrap { padding: 4rem 2rem 5rem; }
  .letter-wrap::after { left: 1.4rem; }
  .secret-hint { font-size: 8px; }
}
`;

const HTML = `
<div id="loader">
  <div class="loader-year">Year Two · 2025</div>
  <div class="loader-title">Tannie</div>
  <div class="loader-sub">Something quieter this time</div>
  <button class="loader-enter" id="loader-enter">Enter ↓</button>
</div>

<button class="music-btn" id="music-btn">♩ music</button>
<audio id="ambient" loop><source src="https://cdn.pixabay.com/download/audio/2022/10/25/audio_5e74f32e2a.mp3" type="audio/mp3"></audio>

<div class="secret-hint" id="secret-hint">
  secrets found · <span class="count" id="secret-count">0</span> / 13
</div>

<div class="progress-bar" id="progress-bar">
  <div class="progress-dot" id="pd0"></div><div class="progress-dot" id="pd1"></div><div class="progress-dot" id="pd2"></div>
  <div class="progress-dot" id="pd3"></div><div class="progress-dot" id="pd4"></div><div class="progress-dot" id="pd5"></div>
</div>

<div id="main">
  <section class="chapter" id="ch1">
    <div class="ch1-eyebrow">Twenty — two</div>
    <div class="ch1-headline">Some things went quiet between us.<br>This is me, not pretending otherwise.</div>
    <div class="ch1-rule"></div>
    <div class="ch1-body">
      Last year I gave you everything — every memory, every metaphor, every version of you I'd ever loved.<br><br>
      This year I have fewer words. But they're more true.<br><br>
      <span style="color:var(--gold-dim); font-size: 11px; letter-spacing: 0.2em;">— thirteen secrets are hiding in here. tap things. type things. press things.</span>
    </div>
    <div class="scroll-nudge">scroll to begin</div>
  </section>

  <section class="chapter" id="ch2">
    <div class="ch2-label reveal-on-scroll">Six things I kept, even when we weren't talking</div>
    <div class="ch2-instruction reveal-on-scroll">— open each one. some hold a photo.</div>
    <div class="fragment-grid reveal-on-scroll" id="fragment-grid">
      <div class="fragment" data-idx="0" data-photo="cafe" data-caption="our table, always.">
        <div class="fragment-number">I.</div>
        <div class="fragment-locked">The way you laugh.</div>
        <div class="fragment-reveal">Still the loudest, realest thing I know. The kind that has zero filters. The kind that makes a room turn. It never left me — not even when we did.<br><span class="fragment-photo-cue">view photo →</span></div>
        <div class="fragment-hint">tap</div>
      </div>
      <div class="fragment" data-idx="1">
        <div class="fragment-number">II.</div>
        <div class="fragment-locked">The fact that you never turned your sharpness on me.</div>
        <div class="fragment-reveal">Even when you could have. Even when I probably deserved it. That's not a small thing. Most people don't hold that line. You always did.</div>
        <div class="fragment-hint">tap</div>
      </div>
      <div class="fragment" data-idx="2" data-photo="road" data-caption="the highway. before the bug.">
        <div class="fragment-number">III.</div>
        <div class="fragment-locked">The highway. The bug. The absolute chaos.</div>
        <div class="fragment-reveal">I will tell that story until I'm old. Not because it was funny — though it was — but because it was so perfectly, absurdly us.<br><span class="fragment-photo-cue">view photo →</span></div>
        <div class="fragment-hint">tap</div>
      </div>
      <div class="fragment" data-idx="3" data-photo="sky" data-caption="9,272 km of sky.">
        <div class="fragment-number">IV.</div>
        <div class="fragment-locked">You, in a different country, becoming something bigger.</div>
        <div class="fragment-reveal">I watched from far away. I didn't say it enough, but I was proud. Genuinely. Not the polite kind — the quiet kind that sits in your chest and just stays there.<br><span class="fragment-photo-cue">view photo →</span></div>
        <div class="fragment-hint">tap</div>
      </div>
      <div class="fragment" data-idx="4">
        <div class="fragment-number">V.</div>
        <div class="fragment-locked">The guilt of the gap.</div>
        <div class="fragment-reveal">I'm not going to dress it up. We let time pass in a way neither of us probably planned. That's mine to own too. I should've called more. That's just true.</div>
        <div class="fragment-hint">tap</div>
      </div>
      <div class="fragment" data-idx="5" data-photo="letter" data-caption="kept, all of it.">
        <div class="fragment-number">VI.</div>
        <div class="fragment-locked">The fact that I still thought of you.</div>
        <div class="fragment-reveal">On ordinary days. Random days. Days when nothing reminded me of you and yet somehow you were there. Distance doesn't always mean what people think it means.<br><span class="fragment-photo-cue">view photo →</span></div>
        <div class="fragment-hint">tap</div>
      </div>
    </div>
  </section>

  <section class="chapter" id="ch3">
    <div class="letter-wrap reveal-on-scroll">
      <div class="letter-meta">
        <div class="letter-from">
          Vereeniging, South Africa<br>
          To: Somewhere in Australia<br>
          <span style="color:var(--ink-ghost); font-size:9px;" id="letter-date"></span>
        </div>
        <div class="letter-stamp" id="letter-stamp" title="press the seal">
          <span>Year</span><span class="stamp-num">II</span><span>ZA → AU</span>
        </div>
      </div>
      <div class="letter-salutation">Dear Tannie —</div>
      <div class="letter-body-text">
        <p>Last year I wrote you a love letter to a friendship.<br>This year is the same letter, just with the volume turned down<br>and the truth turned up.</p>
        <p>We're twenty-two now.<span class="fn-mark" data-fn="1">¹</span> Not lovers, never were — something better. The kind of person you don't have to explain yourself to. The kind you can go quiet with for months and then text "are you alive" and somehow it picks up exactly <span class="redact" data-reveal="where it was.">████████████</span></p>
        <p>I won't pretend the distance was only geography. It wasn't. Some of it was us — the slow kind of drift that happens when life gets loud and you stop making the small effort that keeps people close. I know my part in that.<span class="fn-mark" data-fn="2">²</span></p>
        <p>You're my person. That's the whole thing. Not the romantic kind, not the dramatic kind — the kind that lasts because nobody's trying to make it anything other than what it is. <span class="redact" data-reveal="ride or die. plain and simple.">████████████████████████████████</span></p>
        <p>You've grown this year in ways you probably can't fully see yet. That's how real growth works — it's only visible in the rearview. You went somewhere unfamiliar and you made it yours. That takes more courage than most people admit — and you did it loud, like everything else you do.<span class="fn-mark" data-fn="4">⁴</span></p>
        <p>I still think about the laugh.<span class="fn-mark" data-fn="3">³</span> Not in a sappy way. In the way you remember a sound that means home. The bug. The highway. The bribe to that poor cop. The four learner's tests. The Swiss roll you abandoned after one bite like it personally offended you. That's the inventory. That's the friendship.</p>
        <p>So here's what I'll say, without dressing it up:<br><br>Happy birthday, Tannie.<br>You're twenty-two and you're still the loudest, sharpest, most ridiculous person I've put in my corner —<br>and I'd pick you again. Every round.</p>
      </div>
      <div class="footnotes" id="footnotes">
        <div class="footnote-item" id="fn-1"><div class="fn-num">¹</div><div class="fn-text">Twenty-two. Strange to say out loud. We're basically aunties now.</div></div>
        <div class="footnote-item" id="fn-2"><div class="fn-num">²</div><div class="fn-text">Not fishing for absolution. Just naming it because it deserves to be named.</div></div>
        <div class="footnote-item" id="fn-3"><div class="fn-num">³</div><div class="fn-text">The hyena one. The real one. The one you can't fake. That one.</div></div>
        <div class="footnote-item" id="fn-4"><div class="fn-num">⁴</div><div class="fn-text">Also: still genuinely shocked you stopped gymming. Who are you. Where is she.</div></div>
      </div>
      <div class="letter-closing reveal-on-scroll">
        <div class="gold-rule"></div>
        <div class="closing-line">Your Oom, your menace, your person —</div>
        <div class="sig" id="sig" title="press three times">Oom</div>
        <div class="sig-secret" id="sig-secret">— still your Oom. always was. always will be. that's the whole deal.</div>
      </div>
    </div>
  </section>

  <section class="chapter" id="ch4">
    <div class="final-trigger reveal-on-scroll" id="final-trigger">— the room at the end —</div>
    <div class="final-gate">
      <div class="final-locked" id="final-locked">open all six to continue</div>
      <div class="final-message" id="final-message">
        <div class="final-big">You're<br>my <span class="word-swap" id="word-swap" title="tap me">person</span>.</div>
        <div class="gold-rule"></div>
        <div class="final-small">
          Not in a poetic way. Not in a movie way. In the way that means: when something stupid or huge or chaotic happens, you're the first person I want to tell.<br><br>
          That hasn't changed. It's not going to.<br><br>
          Happy birthday, you absolute menace. Twenty-two looks right on you.
        </div>
        <span class="final-secret-cue" id="final-secret-cue">— blow out the candle —</span>
      </div>
    </div>
  </section>

  <div class="distance-footer">
    <span class="distance-num" id="distance-num">9,272</span>
    <span class="distance-label">kilometres from Vereeniging to you</span>
    <span class="distance-coda" id="distance-coda">close enough.</span>
  </div>
</div>

<div class="polaroid-overlay" id="polaroid-overlay">
  <div class="polaroid">
    <button class="polaroid-close" id="polaroid-close">close</button>
    <img id="polaroid-img" src="" alt="" loading="lazy" />
    <div class="polaroid-caption" id="polaroid-caption"></div>
  </div>
</div>
`;

const PHOTO_MAP: Record<string, string> = {
  cafe: "/secrets/polaroid-cafe.jpg",
  road: "/secrets/polaroid-road.jpg",
  letter: "/secrets/polaroid-letter.jpg",
  sky: "/secrets/polaroid-sky.jpg",
  candle: "/secrets/polaroid-candle.jpg",
};

function TanniePage() {
  useEffect(() => {
    const $ = (id: string) => document.getElementById(id);
    const loader = $("loader")!;
    const main = $("main")!;
    const musicBtn = $("music-btn") as HTMLButtonElement;
    const ambient = $("ambient") as HTMLAudioElement;
    const progressBar = $("progress-bar")!;
    const secretHint = $("secret-hint")!;
    const secretCount = $("secret-count")!;
    const overlay = $("polaroid-overlay")!;
    const polaroidImg = $("polaroid-img") as HTMLImageElement;
    const polaroidCaption = $("polaroid-caption")!;

    const dateStr = new Date().toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
    const dateEl = $("letter-date"); if (dateEl) dateEl.textContent = dateStr;

    // ── Secret tracking
    const found = new Set<string>();
    const TOTAL_SECRETS = 9;
    function foundSecret(key: string) {
      if (found.has(key)) return;
      found.add(key);
      secretCount.textContent = String(found.size);
      secretHint.classList.add("show");
      if (found.size === TOTAL_SECRETS) {
        setTimeout(() => rainHearts(40), 400);
      }
    }

    // ── Polaroid
    function showPolaroid(photoKey: string, caption: string, secretKey?: string) {
      polaroidImg.src = PHOTO_MAP[photoKey] || "";
      polaroidImg.alt = caption;
      polaroidCaption.textContent = caption;
      overlay.classList.add("show");
      if (secretKey) foundSecret(secretKey);
    }
    function hidePolaroid() { overlay.classList.remove("show"); }
    overlay.addEventListener("click", (e) => { if (e.target === overlay) hidePolaroid(); });
    $("polaroid-close")!.addEventListener("click", hidePolaroid);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") hidePolaroid(); });

    // ── Loader enter
    $("loader-enter")!.addEventListener("click", () => {
      loader.classList.add("out");
      setTimeout(() => {
        main.classList.add("visible");
        progressBar.classList.add("show");
        musicBtn.classList.add("show");
        secretHint.classList.add("show");
        initObservers();
      }, 800);
    });

    // ── Music
    let playing = false;
    ambient.volume = 0.15;
    musicBtn.addEventListener("click", () => {
      playing = !playing;
      if (playing) { ambient.play().catch(() => {}); musicBtn.textContent = "♩ pause"; musicBtn.classList.add("playing"); }
      else { ambient.pause(); musicBtn.textContent = "♩ music"; musicBtn.classList.remove("playing"); }
    });

    // ── Fragments
    let openedCount = 0;
    const totalFragments = 6;
    document.querySelectorAll<HTMLDivElement>(".fragment").forEach((frag) => {
      frag.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        // photo cue click
        if (target.classList.contains("fragment-photo-cue")) {
          e.stopPropagation();
          const photo = frag.dataset.photo;
          const cap = frag.dataset.caption || "";
          if (photo) showPolaroid(photo, cap, "photo-" + photo);
          return;
        }
        if (frag.classList.contains("opened")) return;
        frag.classList.add("opened");
        openedCount++;
        for (let i = 0; i < openedCount && i < 6; i++) $("pd" + i)!.classList.add("done");
        if (openedCount === totalFragments) unlockFinal();
      });
    });

    function unlockFinal() {
      const locked = $("final-locked")!;
      const msg = $("final-message")!;
      locked.style.opacity = "0";
      setTimeout(() => { locked.style.display = "none"; msg.classList.add("unlocked"); }, 600);
    }

    // ── Redactions (counts as 1 secret group when both opened)
    const redacts = document.querySelectorAll<HTMLElement>(".redact");
    let redactsOpened = 0;
    redacts.forEach((el) => {
      el.addEventListener("click", () => {
        if (el.classList.contains("revealed")) return;
        el.classList.add("revealed");
        el.textContent = el.dataset.reveal || "";
        redactsOpened++;
        if (redactsOpened === redacts.length) foundSecret("redactions");
      });
    });

    // ── Footnotes
    document.querySelectorAll<HTMLElement>(".fn-mark").forEach((el) => {
      el.addEventListener("click", () => {
        const fn = $("fn-" + el.dataset.fn);
        if (fn) { fn.classList.add("revealed"); fn.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
      });
    });

    // ── Stamp secret (click 3x)
    let stampClicks = 0;
    $("letter-stamp")!.addEventListener("click", () => {
      stampClicks++;
      if (stampClicks >= 3) showPolaroid("letter", "kept all your voice notes too.", "stamp");
    });

    // ── Signature triple-click
    let sigClicks = 0;
    let sigTimer: ReturnType<typeof setTimeout> | null = null;
    const sigEl = $("sig")!;
    const sigSecret = $("sig-secret")!;
    sigEl.addEventListener("click", () => {
      sigClicks++;
      if (sigTimer) clearTimeout(sigTimer);
      sigTimer = setTimeout(() => { sigClicks = 0; }, 1200);
      if (sigClicks >= 3) {
        sigEl.classList.add("unlocked");
        sigSecret.classList.add("show");
        foundSecret("signature");
        sigClicks = 0;
      }
    });

    // ── Final candle (blow → reveal)
    $("final-secret-cue")!.addEventListener("click", () => {
      showPolaroid("candle", "make a wish, tannie.", "candle");
    });

    // ── Distance number
    let distClicks = 0;
    const distNum = $("distance-num")!;
    const distCoda = $("distance-coda")!;
    distNum.addEventListener("click", () => {
      distClicks++;
      distNum.classList.add("tapped");
      if (distClicks === 1) distCoda.textContent = "still close enough.";
      else if (distClicks === 2) distCoda.textContent = "always close enough.";
      else if (distClicks >= 3) {
        distCoda.textContent = "no distance, really.";
        foundSecret("distance");
        rainHearts(20);
      }
    });

    // ── Type "tannie" anywhere → hearts
    let buf = "";
    document.addEventListener("keydown", (e) => {
      if (e.key.length !== 1) return;
      buf = (buf + e.key.toLowerCase()).slice(-6);
      if (buf === "tannie") {
        rainHearts(30);
        foundSecret("name");
        buf = "";
      }
    });

    function rainHearts(n: number) {
      for (let i = 0; i < n; i++) {
        const h = document.createElement("div");
        h.className = "heart";
        h.textContent = ["♥", "✦", "♡"][Math.floor(Math.random() * 3)];
        h.style.left = Math.random() * 100 + "vw";
        h.style.fontSize = 14 + Math.random() * 22 + "px";
        h.style.color = Math.random() > 0.5 ? "#c9a96e" : "#ede6d5";
        const dur = 4 + Math.random() * 5;
        h.style.animationDuration = dur + "s";
        h.style.animationDelay = Math.random() * 2 + "s";
        document.body.appendChild(h);
        setTimeout(() => h.remove(), (dur + 2) * 1000);
      }
    }

    // ── Observers
    function initObservers() {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
      }, { threshold: 0.15 });
      document.querySelectorAll(".ch1-eyebrow, .ch1-headline, .ch1-rule, .ch1-body").forEach((el) => obs.observe(el));
      document.querySelectorAll(".reveal-on-scroll").forEach((el) => obs.observe(el));
      const paras = document.querySelectorAll<HTMLParagraphElement>(".letter-body-text p");
      const paraObs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            const idx = Array.from(paras).indexOf(e.target as HTMLParagraphElement);
            paras.forEach((p, i) => { if (i > idx && i <= idx + 2) setTimeout(() => p.classList.add("in"), (i - idx) * 200); });
          }
        });
      }, { threshold: 0.3 });
      paras.forEach((p) => paraObs.observe(p));
      const fg = $("fragment-grid");
      if (fg) {
        const fgObs = new IntersectionObserver((entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              const frags = e.target.querySelectorAll<HTMLDivElement>(".fragment");
              frags.forEach((f, i) => {
                f.style.opacity = "0"; f.style.transform = "translateY(10px)";
                f.style.transition = `opacity 0.8s ease ${i * 0.1}s, transform 0.8s ease ${i * 0.1}s`;
                setTimeout(() => { f.style.opacity = ""; f.style.transform = ""; }, i * 100 + 100);
              });
            }
          });
        }, { threshold: 0.1 });
        fgObs.observe(fg);
      }
      const finalT = $("final-trigger"); if (finalT) obs.observe(finalT);
      const ch4 = $("ch4");
      if (ch4) {
        const ch4obs = new IntersectionObserver((entries) => {
          entries.forEach((e) => { if (e.isIntersecting && openedCount < totalFragments) { const l = $("final-locked"); if (l) l.classList.add("show"); } });
        }, { threshold: 0.3 });
        ch4obs.observe(ch4);
      }
    }
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div dangerouslySetInnerHTML={{ __html: HTML }} />
    </>
  );
}
