import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tannie — 22" },
      { name: "description", content: "A letter from your person. Tap everything." },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400;1,9..144,500&family=DM+Sans:wght@300;400;500&family=Caveat:wght@400;500;700&display=swap",
      },
    ],
  }),
  component: TanniePage,
});

const STYLES = `
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
:root {
  --bg: #0c0b09; --surface: #15130f;
  --paper: #f1ead8; --paper-warm: #ece4cf;
  --ink: #1a1814; --ink-mid: #4a4540; --ink-soft: #7a746c; --ink-ghost: #aea696;
  --gold: #d4b87a; --gold-dim: #8a7148; --gold-deep: #6b5436;
  --rose: #c47d7d;
  --serif: 'Fraunces', Georgia, serif;
  --sans: 'DM Sans', system-ui, sans-serif;
  --hand: 'Caveat', cursive;
  --t: cubic-bezier(0.4, 0, 0.2, 1);
}
html { scroll-behavior: smooth; }
body { background: var(--bg); color: var(--paper); font-family: var(--serif); min-height: 100vh; overflow-x: hidden; -webkit-font-smoothing: antialiased; cursor: none; }
@media (hover: none) { body { cursor: auto; } #cursor, #cursor-dot { display: none; } }
body::after { content: ''; position: fixed; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.04'/%3E%3C/svg%3E"); pointer-events: none; z-index: 9999; mix-blend-mode: overlay; }

/* CUSTOM CURSOR */
#cursor { position: fixed; top: 0; left: 0; width: 28px; height: 28px; border: 1px solid var(--gold-dim); border-radius: 50%; pointer-events: none; z-index: 10000; transform: translate(-50%, -50%); transition: width 0.25s, height 0.25s, border-color 0.25s, background 0.25s; mix-blend-mode: difference; }
#cursor-dot { position: fixed; top: 0; left: 0; width: 4px; height: 4px; background: var(--gold); border-radius: 50%; pointer-events: none; z-index: 10001; transform: translate(-50%, -50%); }
#cursor.hover { width: 56px; height: 56px; border-color: var(--gold); background: rgba(212,184,122,0.08); }
.spark { position: fixed; width: 4px; height: 4px; background: var(--gold); border-radius: 50%; pointer-events: none; z-index: 9998; opacity: 0.8; animation: sparkfade 0.9s ease-out forwards; }
@keyframes sparkfade { to { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; } }

/* LOADER */
#loader { position: fixed; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--bg); z-index: 1000; transition: opacity 1.2s var(--t), visibility 1.2s; }
#loader.out { opacity: 0; visibility: hidden; }
.loader-year { font-family: var(--sans); font-size: 11px; letter-spacing: 0.4em; color: var(--ink-soft); text-transform: uppercase; margin-bottom: 2.8rem; opacity: 0; animation: rise 1.2s var(--t) 0.4s forwards; }
.loader-title { font-family: var(--serif); font-size: clamp(64px, 12vw, 140px); font-weight: 400; font-style: italic; color: var(--paper); line-height: 0.95; opacity: 0; animation: rise 1.4s var(--t) 0.7s forwards; letter-spacing: -0.03em; }
.loader-sub { font-family: var(--sans); font-size: 11px; letter-spacing: 0.35em; color: var(--gold-dim); text-transform: uppercase; margin-top: 2.5rem; opacity: 0; animation: rise 1.2s var(--t) 1.4s forwards; text-align: center; max-width: 320px; line-height: 1.8; }
.loader-enter { margin-top: 4rem; font-family: var(--sans); font-size: 11px; letter-spacing: 0.3em; color: var(--ink-soft); text-transform: uppercase; opacity: 0; animation: rise 1s var(--t) 2.4s forwards; cursor: none; border: 1px solid var(--ink-mid); background: none; padding: 0.9rem 1.8rem; transition: color 0.3s, border-color 0.3s, background 0.3s; }
.loader-enter:hover { color: var(--paper); border-color: var(--gold-dim); background: rgba(138,113,72,0.08); }

#main { opacity: 0; transition: opacity 1.4s var(--t); min-height: 100vh; }
#main.visible { opacity: 1; }

.chapter { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 8vh 6vw; position: relative; }

/* CH1 */
#ch1 { flex-direction: column; text-align: center; }
.ch1-eyebrow { font-family: var(--sans); font-size: 10px; letter-spacing: 0.45em; color: var(--gold-dim); text-transform: uppercase; margin-bottom: 3rem; opacity: 0; transform: translateY(8px); transition: all 1.2s var(--t); }
.ch1-eyebrow.in { opacity: 1; transform: translateY(0); }
.ch1-headline { font-size: clamp(38px, 6.5vw, 80px); font-weight: 400; font-style: italic; line-height: 1.1; color: var(--paper); max-width: 780px; opacity: 0; transform: translateY(14px); transition: all 1.4s var(--t) 0.2s; letter-spacing: -0.02em; }
.ch1-headline.in { opacity: 1; transform: translateY(0); }
.ch1-headline em { color: var(--gold); font-style: italic; }
.ch1-rule { width: 1px; height: 0; background: var(--gold-dim); margin: 3rem auto; transition: height 1.6s var(--t) 0.4s; }
.ch1-rule.in { height: 70px; }
.ch1-body { font-family: var(--sans); font-size: clamp(15px, 1.6vw, 17px); font-weight: 300; color: var(--ink-ghost); line-height: 1.95; max-width: 480px; opacity: 0; transform: translateY(10px); transition: all 1.2s var(--t) 0.6s; }
.ch1-body.in { opacity: 1; transform: translateY(0); }
.scroll-nudge { position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%); font-family: var(--sans); font-size: 10px; letter-spacing: 0.35em; color: var(--ink-soft); text-transform: uppercase; opacity: 0; animation: breath 3s ease-in-out 3s infinite; }
@keyframes breath { 0%,100% { opacity: 0.25; } 50% { opacity: 0.75; } }

/* CH2 */
#ch2 { flex-direction: column; min-height: auto; padding: 12vh 6vw; gap: 4rem; }
.ch2-label { font-family: var(--sans); font-size: 10px; letter-spacing: 0.45em; color: var(--gold-dim); text-transform: uppercase; text-align: center; opacity: 0; transition: opacity 1.2s var(--t); }
.ch2-label.in { opacity: 1; }
.ch2-title { font-family: var(--serif); font-size: clamp(28px, 4vw, 44px); font-style: italic; color: var(--paper); text-align: center; max-width: 700px; margin: 0 auto; line-height: 1.2; opacity: 0; transition: opacity 1.2s var(--t) 0.2s; letter-spacing: -0.01em; }
.ch2-title.in { opacity: 1; }
.ch2-instruction { font-family: var(--sans); font-size: 12px; letter-spacing: 0.2em; color: var(--ink-soft); text-align: center; opacity: 0; transition: opacity 1.2s var(--t) 0.3s; }
.ch2-instruction.in { opacity: 1; }
.fragment-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5px; width: 100%; max-width: 980px; margin: 0 auto; opacity: 0; transition: opacity 1.4s var(--t) 0.5s; }
.fragment-grid.in { opacity: 1; }
.fragment { background: var(--surface); padding: 2.5rem 2rem; cursor: none; position: relative; overflow: hidden; border: 1px solid #1f1c17; transition: background 0.4s, border-color 0.4s, transform 0.4s; min-height: 200px; display: flex; flex-direction: column; justify-content: space-between; }
.fragment:hover { background: #1c1914; border-color: #2c281f; transform: translateY(-2px); }
.fragment.opened { border-color: var(--gold-dim); background: #1a1812; }
.fragment-number { font-family: var(--sans); font-size: 10px; letter-spacing: 0.35em; color: var(--gold-dim); text-transform: uppercase; margin-bottom: 1.5rem; opacity: 0.7; }
.fragment-locked { font-family: var(--serif); font-size: 22px; font-style: italic; color: var(--ink-mid); line-height: 1.35; transition: all 0.6s var(--t); user-select: none; letter-spacing: -0.01em; }
.fragment.opened .fragment-locked { color: var(--paper); }
.fragment-reveal { font-family: var(--sans); font-size: 12.5px; color: var(--ink-soft); letter-spacing: 0.05em; margin-top: 1.5rem; max-height: 0; overflow: hidden; opacity: 0; transition: max-height 0.8s var(--t), opacity 0.6s var(--t) 0.2s; line-height: 1.75; }
.fragment.opened .fragment-reveal { max-height: 280px; opacity: 1; }
.fragment-photo-cue { display: inline-block; margin-top: 0.8rem; font-family: var(--sans); font-size: 9px; letter-spacing: 0.35em; color: var(--gold); text-transform: uppercase; border-bottom: 1px solid var(--gold-dim); padding-bottom: 2px; cursor: none; opacity: 0; transition: opacity 0.6s 0.4s, color 0.3s; }
.fragment.opened .fragment-photo-cue { opacity: 1; }
.fragment-photo-cue:hover { color: var(--paper); }
.fragment-hint { position: absolute; bottom: 1.2rem; right: 1.5rem; font-family: var(--sans); font-size: 9px; letter-spacing: 0.3em; color: var(--ink-soft); text-transform: uppercase; transition: opacity 0.3s; }
.fragment.opened .fragment-hint { opacity: 0; }
.fragment::before { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent 0%, rgba(212,184,122,0.04) 50%, transparent 100%); transform: translateX(-100%); transition: transform 0s; }
.fragment:hover::before { transform: translateX(100%); transition: transform 0.9s ease; }
.fragment.pinned { box-shadow: inset 0 0 0 1px var(--gold); }
.fragment-pin { position: absolute; top: 0.9rem; right: 1rem; font-size: 13px; color: var(--gold); opacity: 0; transition: opacity 0.3s; }
.fragment.pinned .fragment-pin { opacity: 1; }

/* PHOTO UPLOAD */
.photo-slot { margin-top: 1rem; display: flex; align-items: center; gap: 0.7rem; }
.photo-thumb { width: 46px; height: 46px; background: #0e0c09 center/cover no-repeat; border: 1px solid #2a261e; flex-shrink: 0; }
.photo-thumb.empty { display: flex; align-items: center; justify-content: center; color: var(--ink-soft); font-family: var(--sans); font-size: 18px; }
.photo-upload-label { font-family: var(--sans); font-size: 9px; letter-spacing: 0.3em; color: var(--gold-dim); text-transform: uppercase; cursor: none; border-bottom: 1px dashed var(--gold-dim); padding-bottom: 2px; transition: color 0.3s; }
.photo-upload-label:hover { color: var(--gold); }
.photo-upload-label input { display: none; }

/* TIP TOAST */
.tip-toast { position: fixed; left: 50%; bottom: 4.2rem; transform: translateX(-50%) translateY(20px); background: rgba(20,18,14,0.95); border: 1px solid var(--gold-dim); padding: 0.8rem 1.4rem; font-family: var(--sans); font-size: 11px; letter-spacing: 0.15em; color: var(--paper); text-transform: uppercase; z-index: 800; opacity: 0; transition: all 0.5s var(--t); pointer-events: none; max-width: 92vw; text-align: center; }
.tip-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
.tip-toast .tk { color: var(--gold); }

/* JUKEBOX */
.jukebox-wrap { max-width: 720px; margin: 6rem auto 0; text-align: center; opacity: 0; transition: opacity 1.2s var(--t); }
.jukebox-wrap.in { opacity: 1; }
.jukebox-label { font-family: var(--sans); font-size: 10px; letter-spacing: 0.4em; color: var(--gold-dim); text-transform: uppercase; margin-bottom: 1.5rem; }
.jukebox-screen { background: var(--surface); border: 1px solid #1f1c17; padding: 3rem 2rem; min-height: 160px; display: flex; align-items: center; justify-content: center; font-family: var(--serif); font-style: italic; font-size: clamp(18px, 2.4vw, 26px); color: var(--paper); line-height: 1.5; transition: opacity 0.4s; letter-spacing: -0.01em; }
.jukebox-screen.swap { opacity: 0; }
.jukebox-btn { margin-top: 1.5rem; font-family: var(--sans); font-size: 10px; letter-spacing: 0.35em; color: var(--gold-dim); text-transform: uppercase; background: none; border: 1px solid var(--gold-dim); padding: 0.8rem 1.6rem; cursor: none; transition: all 0.3s; }
.jukebox-btn:hover { color: var(--paper); background: rgba(212,184,122,0.1); border-color: var(--gold); }

/* CH3 — LETTER */
#ch3 { align-items: flex-start; justify-content: center; padding: 6vh 0; }
.letter-wrap { width: min(720px, 94vw); margin: 0 auto; padding: 7rem 5rem 8rem; background: var(--paper-warm); position: relative; box-shadow: 0 0 200px rgba(0,0,0,0.85), 0 30px 60px rgba(0,0,0,0.5); opacity: 0; transform: translateY(20px); transition: all 1.4s var(--t); overflow: hidden; }
.letter-wrap.in { opacity: 1; transform: translateY(0); }
.letter-wrap::before { content: ''; position: absolute; inset: 0; background-image: repeating-linear-gradient(180deg, transparent, transparent 27px, rgba(80,65,45,0.05) 27px, rgba(80,65,45,0.05) 28px); pointer-events: none; }
.letter-wrap::after { content: ''; position: absolute; left: 3.5rem; top: 0; bottom: 0; width: 1px; background: rgba(200,150,100,0.15); pointer-events: none; }
/* spotlight */
.letter-wrap .spotlight { position: absolute; inset: 0; background: radial-gradient(180px circle at var(--mx, -200px) var(--my, -200px), rgba(212,184,122,0.18), transparent 70%); pointer-events: none; opacity: 0; transition: opacity 0.4s; mix-blend-mode: multiply; }
.letter-wrap:hover .spotlight { opacity: 1; }
.letter-meta { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4.5rem; position: relative; z-index: 2; }
.letter-from { font-family: var(--sans); font-size: 10px; letter-spacing: 0.3em; color: var(--ink-soft); text-transform: uppercase; line-height: 1.9; }
.letter-stamp { width: 60px; height: 60px; border: 1.5px solid rgba(100,80,60,0.3); border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1px; cursor: none; transition: all 0.3s; user-select: none; }
.letter-stamp:hover { border-color: rgba(100,80,60,0.6); transform: rotate(-5deg) scale(1.05); }
.letter-stamp.broken { border-color: var(--rose); transform: rotate(-12deg); }
.letter-stamp span { font-family: var(--sans); font-size: 8px; letter-spacing: 0.1em; color: var(--ink-soft); text-transform: uppercase; text-align: center; line-height: 1.4; }
.letter-stamp .stamp-num { font-family: var(--serif); font-size: 17px; color: var(--ink-mid); font-style: italic; }
.letter-salutation { font-family: var(--serif); font-size: 16px; font-style: italic; letter-spacing: 0.04em; color: var(--ink-mid); margin-bottom: 2.5rem; position: relative; z-index: 2; }
.letter-body-text { position: relative; z-index: 2; }
.letter-body-text p { font-family: var(--serif); font-size: clamp(18px, 2.2vw, 22px); font-weight: 400; color: var(--ink); line-height: 1.85; margin-bottom: 1.8rem; opacity: 0; transform: translateY(10px); transition: all 1s var(--t); letter-spacing: -0.005em; }
.letter-body-text p.in { opacity: 1; transform: translateY(0); }
.redact { background: var(--ink); color: var(--ink); border-radius: 2px; cursor: none; padding: 0 4px; transition: background 0.6s ease, color 0.6s ease; display: inline; user-select: none; }
.redact:hover { background: #2a2520; }
.redact.revealed { background: rgba(212,184,122,0.18); color: var(--ink); padding: 1px 4px; }
.fn-mark { font-family: var(--sans); font-size: 10px; vertical-align: super; color: var(--gold-deep); cursor: none; margin-left: 1px; transition: color 0.3s; font-weight: 500; }
.fn-mark:hover { color: var(--rose); }
.footnotes { margin-top: 3.5rem; padding-top: 2rem; border-top: 1px solid rgba(100,80,60,0.18); position: relative; z-index: 2; }
.footnote-item { display: flex; gap: 1.2rem; margin-bottom: 1.2rem; opacity: 0; transform: translateX(-8px); transition: all 0.6s var(--t); }
.footnote-item.revealed { opacity: 1; transform: translateX(0); }
.fn-num { font-family: var(--sans); font-size: 11px; color: var(--gold-deep); min-width: 18px; padding-top: 3px; font-weight: 500; }
.fn-text { font-family: var(--sans); font-size: 13px; font-style: italic; color: var(--ink-mid); line-height: 1.7; }
.letter-closing { margin-top: 4rem; position: relative; z-index: 2; opacity: 0; transform: translateY(10px); transition: all 1.2s var(--t) 0.3s; }
.letter-closing.in { opacity: 1; transform: translateY(0); }
.closing-line { font-family: var(--sans); font-size: 11px; letter-spacing: 0.25em; color: var(--ink-soft); text-transform: uppercase; margin-bottom: 1rem; }
.sig { font-family: var(--serif); font-size: clamp(40px, 6vw, 60px); font-style: italic; font-weight: 400; color: var(--ink-mid); line-height: 1; cursor: none; transition: color 0.4s; user-select: none; letter-spacing: -0.02em; }
.sig:hover { color: var(--ink); }
.sig.unlocked { color: var(--gold-deep); }
.sig-secret { font-family: var(--hand); font-size: 22px; color: var(--ink-mid); margin-top: 0.8rem; opacity: 0; max-height: 0; overflow: hidden; transition: opacity 0.8s, max-height 0.8s; line-height: 1.3; }
.sig-secret.show { opacity: 1; max-height: 120px; }

/* CH4 — FINAL ROOM */
#ch4 { min-height: 90vh; flex-direction: column; align-items: center; justify-content: center; padding: 8vh 6vw; background: var(--bg); position: relative; }
.final-trigger { font-family: var(--sans); font-size: 10px; letter-spacing: 0.4em; color: var(--ink-soft); text-transform: uppercase; text-align: center; margin-bottom: 3rem; opacity: 0; transition: opacity 1.2s var(--t); }
.final-trigger.in { opacity: 1; }
.final-gate { text-align: center; max-width: 620px; }
.final-locked { font-family: var(--serif); font-size: 17px; font-style: italic; color: var(--ink-mid); opacity: 0; transition: opacity 1s var(--t); }
.final-locked.show { opacity: 1; }
.final-message { opacity: 0; transform: translateY(16px); transition: opacity 1.6s var(--t), transform 1.6s var(--t); pointer-events: none; }
.final-message.unlocked { opacity: 1; transform: translateY(0); pointer-events: all; }
.final-big { font-family: var(--serif); font-size: clamp(34px, 6vw, 60px); font-weight: 400; font-style: italic; color: var(--paper); line-height: 1.2; margin-bottom: 2.5rem; letter-spacing: -0.02em; }
.final-small { font-family: var(--sans); font-size: 14px; font-weight: 300; color: var(--ink-ghost); line-height: 1.95; max-width: 460px; margin: 0 auto 3rem; }
.final-secret-cue { display: inline-block; margin-top: 1.5rem; font-family: var(--sans); font-size: 11px; letter-spacing: 0.35em; color: var(--gold); text-transform: uppercase; border-bottom: 1px solid var(--gold-dim); padding-bottom: 4px; cursor: none; transition: color 0.3s; }
.final-secret-cue:hover { color: var(--paper); }
.gold-rule { width: 50px; height: 1px; background: var(--gold-dim); margin: 2.5rem auto; }

/* WISH BOX */
.wish-box { margin-top: 4rem; padding: 2.5rem 2rem; border: 1px dashed var(--ink-mid); max-width: 480px; margin-left: auto; margin-right: auto; opacity: 0; transition: opacity 1s var(--t); }
.wish-box.show { opacity: 1; }
.wish-label { font-family: var(--sans); font-size: 10px; letter-spacing: 0.4em; color: var(--gold-dim); text-transform: uppercase; margin-bottom: 1.2rem; }
.wish-input { width: 100%; background: transparent; border: none; border-bottom: 1px solid var(--ink-mid); color: var(--paper); font-family: var(--serif); font-size: 18px; font-style: italic; padding: 0.5rem 0; outline: none; text-align: center; cursor: none; }
.wish-input::placeholder { color: var(--ink-soft); font-style: italic; }
.wish-input:focus { border-color: var(--gold); }
.wish-saved { font-family: var(--hand); font-size: 22px; color: var(--gold); margin-top: 1rem; opacity: 0; transition: opacity 0.6s; }
.wish-saved.show { opacity: 1; }

/* WORD SWAP */
.word-swap { cursor: none; border-bottom: 1px dashed rgba(212,184,122,0.5); transition: color 0.4s; color: var(--gold); }
.word-swap:hover { color: var(--paper); }

/* STICKY NOTE */
.sticky-note { position: absolute; left: -2.5rem; top: 28%; width: 150px; padding: 16px 14px; background: #f7e9a6; color: #4a4540; font-family: var(--hand); font-size: 19px; line-height: 1.25; transform: rotate(-7deg); box-shadow: 4px 8px 18px rgba(0,0,0,0.4); opacity: 0; pointer-events: none; transition: opacity 0.6s, transform 0.6s; z-index: 5; }
.sticky-note.show { opacity: 1; transform: rotate(-7deg) translateY(-6px); pointer-events: all; }
@media (max-width: 720px) { .sticky-note { left: 0.5rem; top: -3rem; } }

/* PROGRESS */
.progress-bar { position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%); display: flex; gap: 6px; z-index: 100; opacity: 0; transition: opacity 0.6s; }
.progress-bar.show { opacity: 1; }
.progress-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--ink-mid); transition: background 0.4s, transform 0.4s; cursor: none; }
.progress-dot.done { background: var(--gold); transform: scale(1.4); }
.progress-dot.lit { background: var(--rose); transform: scale(1.6); }

/* MUSIC */
.music-btn { position: fixed; top: 1.5rem; right: 1.5rem; font-family: var(--sans); font-size: 9px; letter-spacing: 0.3em; color: var(--ink-soft); text-transform: uppercase; background: none; border: 1px solid #2a261e; padding: 0.6rem 1rem; cursor: none; z-index: 200; opacity: 0; transition: opacity 0.6s, color 0.3s, border-color 0.3s; }
.music-btn.show { opacity: 1; }
.music-btn:hover { color: var(--paper); border-color: var(--ink-mid); }
.music-btn.playing { color: var(--gold); border-color: var(--gold-dim); }

/* HINT TOP-LEFT */
.secret-hint { position: fixed; top: 1.5rem; left: 1.5rem; font-family: var(--sans); font-size: 9px; letter-spacing: 0.35em; color: var(--ink-soft); text-transform: uppercase; z-index: 200; opacity: 0; transition: opacity 0.6s; }
.secret-hint.show { opacity: 1; }
.secret-hint .count { color: var(--gold); }
.secret-hint .pulse { display: inline-block; animation: pulse 2s ease-in-out infinite; }
@keyframes pulse { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }

/* POLAROID MODAL */
.polaroid-overlay { position: fixed; inset: 0; background: rgba(8,7,6,0.92); z-index: 500; display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity 0.5s var(--t); backdrop-filter: blur(8px); padding: 4vh 6vw; }
.polaroid-overlay.show { opacity: 1; pointer-events: all; }
.polaroid { background: #f6f0e2; padding: 14px 14px 64px; box-shadow: 0 30px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.04); transform: rotate(-2.5deg) scale(0.9); transition: transform 0.7s var(--t); max-width: min(440px, 86vw); position: relative; }
.polaroid-overlay.show .polaroid { transform: rotate(-2.5deg) scale(1); }
.polaroid img { display: block; width: 100%; height: auto; filter: sepia(0.18) contrast(0.98); }
.polaroid-caption { position: absolute; left: 0; right: 0; bottom: 16px; text-align: center; font-family: var(--hand); font-size: 24px; color: #4a4540; padding: 0 16px; line-height: 1.2; }
.polaroid-close { position: absolute; top: -42px; right: -4px; font-family: var(--sans); font-size: 9px; letter-spacing: 0.3em; color: var(--paper); text-transform: uppercase; background: none; border: 1px solid rgba(255,255,255,0.25); padding: 0.5rem 0.9rem; cursor: none; }
.polaroid-close:hover { border-color: var(--gold); color: var(--gold); }

/* HEART RAIN */
.heart { position: fixed; top: -40px; font-size: 22px; color: var(--gold); pointer-events: none; z-index: 400; animation: fall linear forwards; user-select: none; }
@keyframes fall { to { transform: translateY(110vh) rotate(360deg); opacity: 0; } }

/* CONFETTI */
.confetti { position: fixed; width: 8px; height: 14px; pointer-events: none; z-index: 600; top: -20px; animation: confettifall linear forwards; }
@keyframes confettifall { to { transform: translateY(110vh) rotate(720deg); opacity: 0; } }

/* DISTANCE FOOTER */
.distance-footer { text-align: center; padding: 5rem 2rem 7rem; }
.distance-num { font-family: var(--serif); font-size: clamp(56px, 9vw, 100px); font-style: italic; color: #1f1c18; line-height: 1; display: block; cursor: none; transition: color 0.6s; letter-spacing: -0.03em; }
.distance-num.tapped { color: var(--gold); }
.distance-label { font-family: var(--sans); font-size: 10px; letter-spacing: 0.4em; color: var(--ink-soft); text-transform: uppercase; margin-top: 1rem; display: block; }
.distance-coda { font-family: var(--serif); font-size: 17px; font-style: italic; color: var(--ink-mid); margin-top: 1.5rem; display: block; }
.friendship-counter { margin-top: 4rem; font-family: var(--sans); font-size: 11px; letter-spacing: 0.3em; color: var(--ink-soft); text-transform: uppercase; }
.friendship-counter strong { font-family: var(--serif); font-style: italic; font-size: 28px; color: var(--gold); display: block; margin-top: 0.6rem; letter-spacing: 0; text-transform: none; font-weight: 400; }

/* KONAMI ALL-FOUND BANNER */
.banner { position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%) scale(0.9); background: var(--bg); border: 1px solid var(--gold); padding: 3rem 4rem; z-index: 700; opacity: 0; pointer-events: none; transition: all 0.6s var(--t); text-align: center; max-width: 90vw; }
.banner.show { opacity: 1; transform: translate(-50%,-50%) scale(1); pointer-events: all; }
.banner-eyebrow { font-family: var(--sans); font-size: 10px; letter-spacing: 0.4em; color: var(--gold); text-transform: uppercase; margin-bottom: 1.5rem; }
.banner-title { font-family: var(--serif); font-size: clamp(28px, 4vw, 44px); font-style: italic; color: var(--paper); line-height: 1.2; margin-bottom: 1.5rem; }
.banner-body { font-family: var(--sans); font-size: 13px; color: var(--ink-ghost); line-height: 1.8; margin-bottom: 2rem; }
.banner-close { font-family: var(--sans); font-size: 10px; letter-spacing: 0.3em; color: var(--ink-soft); text-transform: uppercase; background: none; border: 1px solid var(--ink-mid); padding: 0.6rem 1.2rem; cursor: none; transition: all 0.3s; }
.banner-close:hover { color: var(--paper); border-color: var(--gold-dim); }

@keyframes rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.reveal-on-scroll { opacity: 0; transform: translateY(14px); transition: opacity 1.2s var(--t), transform 1.2s var(--t); }
.reveal-on-scroll.in { opacity: 1; transform: translateY(0); }

@media (max-width: 640px) {
  .letter-wrap { padding: 4rem 2rem 5rem; }
  .letter-wrap::after { left: 1.4rem; }
  .secret-hint { font-size: 8px; }
  .banner { padding: 2rem 1.5rem; }
}
`;

const HTML = `
<div id="cursor"></div>
<div id="cursor-dot"></div>

<div id="loader">
  <div class="loader-year">A letter · Year Two · 2025</div>
  <div class="loader-title">Tannie</div>
  <div class="loader-sub">From your person.<br>Tap, hold, type, blow, shake — everything is alive.</div>
  <button class="loader-enter" id="loader-enter">Open it →</button>
</div>

<button class="music-btn" id="music-btn">♩ music</button>
<audio id="ambient" loop><source src="https://cdn.pixabay.com/download/audio/2022/10/25/audio_5e74f32e2a.mp3" type="audio/mp3"></audio>

<div class="secret-hint" id="secret-hint">
  secrets · <span class="count" id="secret-count">0</span> / 22 <span class="pulse"> · keep poking</span>
</div>

<div class="tip-toast" id="tip-toast"></div>

<div class="progress-bar" id="progress-bar">
  <div class="progress-dot" id="pd0"></div><div class="progress-dot" id="pd1"></div><div class="progress-dot" id="pd2"></div>
  <div class="progress-dot" id="pd3"></div><div class="progress-dot" id="pd4"></div><div class="progress-dot" id="pd5"></div>
</div>

<div id="main">
  <section class="chapter" id="ch1">
    <div class="ch1-eyebrow">Twenty — two · A letter to my person</div>
    <div class="ch1-headline" id="ch1-headline" title="press &amp; hold me">Some people you outgrow.<br><em>You</em> I just keep choosing.</div>
    <div class="ch1-rule"></div>
    <div class="ch1-body">
      Last year I wrote you a novel. This year I'm writing you the truth.<br><br>
      Tap things. Hold things. Shake things. Upload your own.<br>Twenty-two secrets are hiding in here — one for every year of you.
    </div>
    <div class="scroll-nudge">scroll ↓</div>
  </section>

  <section class="chapter" id="ch2">
    <div class="ch2-label reveal-on-scroll">Six things from this year</div>
    <div class="ch2-title reveal-on-scroll">Receipts. Memories. Crimes.<br>The friendship in evidence.</div>
    <div class="ch2-instruction reveal-on-scroll">— tap each tile. some hide a photo. —</div>
    <div class="fragment-grid reveal-on-scroll" id="fragment-grid">
      <div class="fragment" data-idx="0" data-photo="cafe" data-caption="our table. always." data-key="cafe">
        <div class="fragment-number">I.</div><div class="fragment-pin">★</div>
        <div class="fragment-locked">The laugh. Still the loudest weapon you own.</div>
        <div class="fragment-reveal">Hyena energy. Zero filter. Heads turn, dogs bark, waiters reconsider their career. It's the sound of home for me — even from 9,272 km away.<br><span class="fragment-photo-cue">view photo →</span></div>
        <div class="photo-slot"><div class="photo-thumb empty" data-thumb="cafe">+</div><label class="photo-upload-label">upload yours<input type="file" accept="image/*" data-upload="cafe" /></label></div>
        <div class="fragment-hint">tap</div>
      </div>
      <div class="fragment" data-idx="1" data-key="loyalty">
        <div class="fragment-number">II.</div><div class="fragment-pin">★</div>
        <div class="fragment-locked">The fact that you've never once aimed your sharpness at me.</div>
        <div class="fragment-reveal">You could have. I've earned it once or twice. You never did. That's not nothing — that's a whole code of honour, and I clocked it every single time.</div>
        <div class="photo-slot"><div class="photo-thumb empty" data-thumb="loyalty">+</div><label class="photo-upload-label">upload yours<input type="file" accept="image/*" data-upload="loyalty" /></label></div>
        <div class="fragment-hint">tap</div>
      </div>
      <div class="fragment" data-idx="2" data-photo="road" data-caption="the highway. before the bug." data-key="road">
        <div class="fragment-number">III.</div><div class="fragment-pin">★</div>
        <div class="fragment-locked">The bug. The bribe. The four learner's tests.</div>
        <div class="fragment-reveal">I'm telling that story until I'm eighty and toothless. Not because it was funny — though it was criminal — but because it was so impossibly, perfectly us.<br><span class="fragment-photo-cue">view photo →</span></div>
        <div class="photo-slot"><div class="photo-thumb empty" data-thumb="road">+</div><label class="photo-upload-label">upload yours<input type="file" accept="image/*" data-upload="road" /></label></div>
        <div class="fragment-hint">tap</div>
      </div>
      <div class="fragment" data-idx="3" data-photo="sky" data-caption="9,272 km of sky." data-key="sky">
        <div class="fragment-number">IV.</div><div class="fragment-pin">★</div>
        <div class="fragment-locked">You, in a different country, becoming somebody bigger.</div>
        <div class="fragment-reveal">Watched it from far away. Didn't say it loud enough. So here, in writing: I am proud of you in the quiet, embarrassing, sit-in-your-chest way that doesn't go anywhere.<br><span class="fragment-photo-cue">view photo →</span></div>
        <div class="photo-slot"><div class="photo-thumb empty" data-thumb="sky">+</div><label class="photo-upload-label">upload yours<input type="file" accept="image/*" data-upload="sky" /></label></div>
        <div class="fragment-hint">tap</div>
      </div>
      <div class="fragment" data-idx="4" data-key="swissroll">
        <div class="fragment-number">V.</div><div class="fragment-pin">★</div>
        <div class="fragment-locked">The Swiss roll incident.</div>
        <div class="fragment-reveal">One bite. ONE BITE. Then full personal vendetta. I think about it more often than I'd like to admit. Iconic restraint. Iconic disrespect. Both can be true.</div>
        <div class="photo-slot"><div class="photo-thumb empty" data-thumb="swissroll">+</div><label class="photo-upload-label">upload yours<input type="file" accept="image/*" data-upload="swissroll" /></label></div>
        <div class="fragment-hint">tap</div>
      </div>
      <div class="fragment" data-idx="5" data-photo="letter" data-caption="kept the voice notes too." data-key="letter">
        <div class="fragment-number">VI.</div><div class="fragment-pin">★</div>
        <div class="fragment-locked">The fact that I still thought of you. Random Tuesdays. No reason.</div>
        <div class="fragment-reveal">A song. A weird billboard. Someone saying something dumb in a queue. Distance doesn't really do what people say it does. Not for us, anyway.<br><span class="fragment-photo-cue">view photo →</span></div>
        <div class="photo-slot"><div class="photo-thumb empty" data-thumb="letter">+</div><label class="photo-upload-label">upload yours<input type="file" accept="image/*" data-upload="letter" /></label></div>
        <div class="fragment-hint">tap</div>
      </div>
    </div>

    <div class="jukebox-wrap reveal-on-scroll" id="jukebox">
      <div class="jukebox-label">— the memory jukebox · press for a random one —</div>
      <div class="jukebox-screen" id="jukebox-screen">press the button. roll the dice.</div>
      <button class="jukebox-btn" id="jukebox-btn">↻ pull a memory</button>
    </div>
  </section>

  <section class="chapter" id="ch3">
    <div class="letter-wrap reveal-on-scroll" id="letter-wrap">
      <div class="spotlight" id="spotlight"></div>
      <div class="letter-meta">
        <div class="sticky-note" id="sticky-note">remember the<br>tertjie runs?<br>iconic. ★</div>
        <div class="letter-from">
          Vereeniging, South Africa<br>
          To: Somewhere in Australia<br>
          <span style="color:var(--ink-ghost); font-size:9px;" id="letter-date"></span>
        </div>
        <div class="letter-stamp" id="letter-stamp" title="hold me">
          <span>Year</span><span class="stamp-num">II</span><span>ZA → AU</span>
        </div>
      </div>
      <div class="letter-salutation">Dear Tannie —</div>
      <div class="letter-body-text">
        <p>Last year I wrote you a love letter to a friendship.<br>This year is the same letter — volume down, truth up.</p>
        <p>We're twenty-two now.<span class="fn-mark" data-fn="1">¹</span> Not lovers, never were — something better. The kind of person you don't have to perform for. The kind you can vanish from for three months, text "are you alive," and somehow it picks up <span class="redact" data-reveal="exactly where it was.">█████████████████</span></p>
        <p>I won't pretend the distance was just geography. Some of it was us. The slow drift that happens when life gets loud and the small effort stops happening. I know my part in that.<span class="fn-mark" data-fn="2">²</span> Naming it because it deserves to be named — not because I'm asking for absolution.</p>
        <p>You're my person. That's the whole sentence. Not romantic, not dramatic, not the kind of friendship people write songs about. The kind that lasts because nobody's trying to make it anything other than what it is. <span class="redact" data-reveal="ride or die. plain and simple.">██████████████████████████████</span></p>
        <p>You grew this year in ways you can't fully see yet — that's how real growth works, only visible in the rearview. You went somewhere unfamiliar and you made it yours. Loud, like everything else you do. Unbothered, like the best parts of you.<span class="fn-mark" data-fn="4">⁴</span></p>
        <p>I still think about the laugh.<span class="fn-mark" data-fn="3">³</span> Not in a sappy way — in the way you remember a sound that means safety. The bug. The cop. The Swiss roll. The tertjie runs. The four learner's tests. That's the inventory. That's the friendship. That's the receipt.</p>
        <p>So here it is, no dressing:<br><br>Happy birthday, Tannie.<br>You're twenty-two and you're still the loudest, sharpest, most ridiculous person I keep in my corner — and I'd pick you again. Every round. Every life.</p>
      </div>
      <div class="footnotes" id="footnotes">
        <div class="footnote-item" id="fn-1"><div class="fn-num">¹</div><div class="fn-text">Twenty-two. Strange to say out loud. We're basically aunties now.</div></div>
        <div class="footnote-item" id="fn-2"><div class="fn-num">²</div><div class="fn-text">Owning it, not over-owning it. There's a difference.</div></div>
        <div class="footnote-item" id="fn-3"><div class="fn-num">³</div><div class="fn-text">The hyena one. The real one. The one nobody can fake. That one.</div></div>
        <div class="footnote-item" id="fn-4"><div class="fn-num">⁴</div><div class="fn-text">Also: still genuinely shocked you stopped gymming. Who is she. Where did she go.</div></div>
      </div>
      <div class="letter-closing reveal-on-scroll">
        <div class="gold-rule"></div>
        <div class="closing-line">Your Oom, your menace, your person —</div>
        <div class="sig" id="sig" title="press three times">Oom</div>
        <div class="sig-secret" id="sig-secret">— still your Oom. always was. always will be. that's the deal.</div>
      </div>
    </div>
  </section>

  <section class="chapter" id="ch4">
    <div class="final-trigger reveal-on-scroll" id="final-trigger">— the room at the end —</div>
    <div class="final-gate">
      <div class="final-locked" id="final-locked">open all six tiles to continue</div>
      <div class="final-message" id="final-message">
        <div class="final-big">You're<br>my <span class="word-swap" id="word-swap" title="tap me">person</span>.</div>
        <div class="gold-rule"></div>
        <div class="final-small">
          Not in a poetic way. In the way that means: when something stupid or huge or chaotic happens, you're the first person I want to tell.<br><br>
          That hasn't changed. It's not going to.<br><br>
          Happy birthday, you absolute menace. Twenty-two looks right on you.
        </div>
        <span class="final-secret-cue" id="final-secret-cue">— blow out the candle —</span>
      </div>
      <div class="wish-box" id="wish-box">
        <div class="wish-label">make a wish · type it · keep it</div>
        <input class="wish-input" id="wish-input" placeholder="type your wish, tannie..." maxlength="80" />
        <div class="wish-saved" id="wish-saved">saved. it's yours. ✦</div>
      </div>
    </div>
  </section>

  <div class="distance-footer">
    <span class="distance-num" id="distance-num">9,272</span>
    <span class="distance-label">kilometres from Vereeniging to you</span>
    <span class="distance-coda" id="distance-coda">close enough.</span>
    <div class="friendship-counter">years on the books<strong id="years-count">—</strong></div>
  </div>
</div>

<div class="polaroid-overlay" id="polaroid-overlay">
  <div class="polaroid">
    <button class="polaroid-close" id="polaroid-close">close</button>
    <img id="polaroid-img" src="" alt="" loading="lazy" />
    <div class="polaroid-caption" id="polaroid-caption"></div>
  </div>
</div>

<div class="banner" id="banner">
  <div class="banner-eyebrow">all sixteen · found</div>
  <div class="banner-title">You found everything.<br>Of course you did.</div>
  <div class="banner-body">That's the thing about you — you don't stop until you've seen the whole picture.<br>Same energy you bring to friendship. Same energy you bring to life.<br><br>I love you, menace. Happy 22.</div>
  <button class="banner-close" id="banner-close">close</button>
</div>
`;

const PHOTO_MAP: Record<string, string> = {
  cafe: "/secrets/polaroid-cafe.jpg",
  road: "/secrets/polaroid-road.jpg",
  letter: "/secrets/polaroid-letter.jpg",
  sky: "/secrets/polaroid-sky.jpg",
  candle: "/secrets/polaroid-candle.jpg",
};

const JUKEBOX_MEMORIES = [
  "The time you ordered for both of us in a voice that legally qualified as a threat.",
  "That one road trip. The bug. The bribe. We are never speaking of it on a recorded line.",
  "When you face-timed me crying about a TikTok cat. Iconic emotional range.",
  "Tertjie runs. Always tertjie runs. Religion, basically.",
  "You blocking someone mid-sentence on speakerphone — peak art form.",
  "The Swiss roll incident. Justice for that pastry remains unserved.",
  "Every time you said 'I'm not even mad' while clearly, visibly, biblically mad.",
  "The four learner's tests. A trilogy. With a sequel. With a director's cut.",
  "Dancing barefoot in a parking lot at 2am because the song was that song.",
  "You explaining a whole conspiracy theory at gym, then quitting gym forever.",
];

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
    const cursor = $("cursor")!;
    const cursorDot = $("cursor-dot")!;
    const banner = $("banner")!;

    const dateStr = new Date().toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" });
    const dateEl = $("letter-date"); if (dateEl) dateEl.textContent = dateStr;

    // Friendship counter (estimate — adjust freely)
    const yc = $("years-count");
    if (yc) {
      const start = new Date("2017-01-01");
      const days = Math.floor((Date.now() - start.getTime()) / 86400000);
      yc.textContent = `${days.toLocaleString()} days · and counting`;
    }

    // ── Custom cursor + sparkle trail
    let lastX = 0, lastY = 0, sparkAcc = 0;
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px";
      cursor.style.top = e.clientY + "px";
      cursorDot.style.left = e.clientX + "px";
      cursorDot.style.top = e.clientY + "px";
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      sparkAcc += Math.hypot(dx, dy);
      if (sparkAcc > 80) {
        sparkAcc = 0;
        const s = document.createElement("div");
        s.className = "spark";
        s.style.left = e.clientX + "px";
        s.style.top = e.clientY + "px";
        s.style.setProperty("--dx", (Math.random() * 40 - 20) + "px");
        s.style.setProperty("--dy", (Math.random() * 40 - 20) + "px");
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 900);
      }
      lastX = e.clientX; lastY = e.clientY;
    });
    document.addEventListener("mouseover", (e) => {
      const t = e.target as HTMLElement;
      if (t && (t.closest("button, a, .fragment, .redact, .fn-mark, .letter-stamp, .sig, .word-swap, .final-secret-cue, .fragment-photo-cue, .distance-num, .jukebox-btn, input"))) {
        cursor.classList.add("hover");
      } else cursor.classList.remove("hover");
    });

    // ── Secret tracking
    const found = new Set<string>();
    const TOTAL_SECRETS = 16;
    function foundSecret(key: string) {
      if (found.has(key)) return;
      found.add(key);
      secretCount.textContent = String(found.size);
      secretHint.classList.add("show");
      // tiny burst
      burstHearts(6, lastX || window.innerWidth/2, lastY || 80);
      if (found.size === TOTAL_SECRETS) {
        setTimeout(() => { confettiBurst(80); banner.classList.add("show"); }, 500);
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
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") { hidePolaroid(); banner.classList.remove("show"); } });
    $("banner-close")!.addEventListener("click", () => banner.classList.remove("show"));

    // ── Loader enter
    $("loader-enter")!.addEventListener("click", () => {
      loader.classList.add("out");
      setTimeout(() => {
        main.classList.add("visible");
        progressBar.classList.add("show");
        musicBtn.classList.add("show");
        secretHint.classList.add("show");
        confettiBurst(30);
        initObservers();
      }, 800);
    });

    // ── Music
    let playing = false;
    ambient.volume = 0.18;
    musicBtn.addEventListener("click", () => {
      playing = !playing;
      if (playing) { ambient.play().catch(() => {}); musicBtn.textContent = "♩ pause"; musicBtn.classList.add("playing"); foundSecret("music"); }
      else { ambient.pause(); musicBtn.textContent = "♩ music"; musicBtn.classList.remove("playing"); }
    });

    // ── Fragments
    let openedCount = 0;
    const totalFragments = 6;
    document.querySelectorAll<HTMLDivElement>(".fragment").forEach((frag) => {
      frag.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
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
        if (openedCount === totalFragments) { unlockFinal(); foundSecret("all-six"); }
      });
    });

    function unlockFinal() {
      const locked = $("final-locked")!;
      const msg = $("final-message")!;
      locked.style.opacity = "0";
      setTimeout(() => { locked.style.display = "none"; msg.classList.add("unlocked"); }, 600);
    }

    // ── Jukebox
    const jbScreen = $("jukebox-screen")!;
    let jbIdx = -1;
    let jbCount = 0;
    $("jukebox-btn")!.addEventListener("click", () => {
      jbScreen.classList.add("swap");
      setTimeout(() => {
        let n = Math.floor(Math.random() * JUKEBOX_MEMORIES.length);
        if (n === jbIdx) n = (n + 1) % JUKEBOX_MEMORIES.length;
        jbIdx = n;
        jbScreen.textContent = JUKEBOX_MEMORIES[n];
        jbScreen.classList.remove("swap");
        jbCount++;
        if (jbCount >= 3) foundSecret("jukebox");
      }, 350);
    });

    // ── Redactions
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
    // all 4 footnotes opened = secret
    let fnOpened = 0;
    document.querySelectorAll<HTMLElement>(".fn-mark").forEach((el) => {
      el.addEventListener("click", () => {
        fnOpened++;
        if (fnOpened >= 4) foundSecret("footnotes");
      });
    });

    // ── Stamp: HOLD to break the seal (1.2s)
    const stampEl = $("letter-stamp")!;
    let stampTimer: ReturnType<typeof setTimeout> | null = null;
    let stampHeld = false;
    function startHold() {
      if (stampHeld) return;
      stampTimer = setTimeout(() => {
        stampHeld = true;
        stampEl.classList.add("broken");
        showPolaroid("letter", "kept all your voice notes too.", "stamp-hold");
      }, 1200);
    }
    function endHold() { if (stampTimer) { clearTimeout(stampTimer); stampTimer = null; } }
    stampEl.addEventListener("mousedown", startHold);
    stampEl.addEventListener("mouseup", endHold);
    stampEl.addEventListener("mouseleave", endHold);
    stampEl.addEventListener("touchstart", startHold);
    stampEl.addEventListener("touchend", endHold);

    // ── Spotlight on letter
    const lw = $("letter-wrap");
    const sp = $("spotlight");
    if (lw && sp) {
      lw.addEventListener("mousemove", (e) => {
        const r = lw.getBoundingClientRect();
        sp.style.setProperty("--mx", (e.clientX - r.left) + "px");
        sp.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    }

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

    // ── Final candle
    $("final-secret-cue")!.addEventListener("click", () => {
      showPolaroid("candle", "make a wish, tannie.", "candle");
      confettiBurst(60);
      setTimeout(() => $("wish-box")!.classList.add("show"), 800);
    });

    // ── Wish input
    const wishInput = $("wish-input") as HTMLInputElement;
    const wishSaved = $("wish-saved")!;
    if (wishInput) {
      wishInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && wishInput.value.trim().length > 0) {
          try { localStorage.setItem("tannie-wish", wishInput.value); } catch {}
          wishSaved.classList.add("show");
          confettiBurst(40);
          foundSecret("wish");
        }
      });
      try {
        const saved = localStorage.getItem("tannie-wish");
        if (saved) { wishInput.value = saved; wishSaved.classList.add("show"); }
      } catch {}
    }

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

    // (typing-based secrets removed for iOS — all secrets are tap/hold/shake)

    // ── Word swap
    const wordSwap = $("word-swap");
    if (wordSwap) {
      const words = ["person", "menace", "chaos", "ride-or-die", "favourite", "tannie"];
      let widx = 0;
      wordSwap.addEventListener("click", () => {
        widx = (widx + 1) % words.length;
        wordSwap.textContent = words[widx];
        if (widx === words.length - 1) foundSecret("word-swap");
      });
    }

    // ── Sticky note: click margin reveals
    const letterWrap = document.querySelector<HTMLElement>(".letter-wrap");
    const stickyNote = $("sticky-note");
    if (letterWrap && stickyNote) {
      letterWrap.addEventListener("click", (e) => {
        const rect = letterWrap.getBoundingClientRect();
        const x = (e as MouseEvent).clientX - rect.left;
        if (x < 70 && !stickyNote.classList.contains("show")) {
          stickyNote.classList.add("show");
          foundSecret("sticky");
        }
      });
      stickyNote.addEventListener("click", (e) => e.stopPropagation());
    }

    // ── Shake-for-hearts (mobile)
    let lastShake = 0;
    window.addEventListener("devicemotion", (e) => {
      const a = e.accelerationIncludingGravity;
      if (!a) return;
      const mag = Math.abs(a.x || 0) + Math.abs(a.y || 0) + Math.abs(a.z || 0);
      if (mag > 35 && Date.now() - lastShake > 1500) {
        lastShake = Date.now();
        rainHearts(25);
        foundSecret("shake");
      }
    });

    // ── Helpers
    function rainHearts(n: number) {
      for (let i = 0; i < n; i++) {
        const h = document.createElement("div");
        h.className = "heart";
        h.textContent = ["♥", "✦", "♡", "★"][Math.floor(Math.random() * 4)];
        h.style.left = Math.random() * 100 + "vw";
        h.style.fontSize = 14 + Math.random() * 24 + "px";
        h.style.color = Math.random() > 0.5 ? "#d4b87a" : "#ede6d5";
        const dur = 4 + Math.random() * 5;
        h.style.animationDuration = dur + "s";
        h.style.animationDelay = Math.random() * 2 + "s";
        document.body.appendChild(h);
        setTimeout(() => h.remove(), (dur + 2) * 1000);
      }
    }
    function burstHearts(n: number, x: number, y: number) {
      for (let i = 0; i < n; i++) {
        const h = document.createElement("div");
        h.className = "spark";
        h.style.left = x + "px";
        h.style.top = y + "px";
        const ang = Math.random() * Math.PI * 2;
        const dist = 30 + Math.random() * 70;
        h.style.setProperty("--dx", Math.cos(ang) * dist + "px");
        h.style.setProperty("--dy", Math.sin(ang) * dist + "px");
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 900);
      }
    }
    function confettiBurst(n: number) {
      const colors = ["#d4b87a", "#c47d7d", "#ede6d5", "#8a7148"];
      for (let i = 0; i < n; i++) {
        const c = document.createElement("div");
        c.className = "confetti";
        c.style.left = Math.random() * 100 + "vw";
        c.style.background = colors[Math.floor(Math.random() * colors.length)];
        c.style.transform = `rotate(${Math.random() * 360}deg)`;
        const dur = 3 + Math.random() * 3;
        c.style.animationDuration = dur + "s";
        c.style.animationDelay = Math.random() * 0.6 + "s";
        document.body.appendChild(c);
        setTimeout(() => c.remove(), (dur + 1) * 1000);
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
