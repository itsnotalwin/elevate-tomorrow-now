import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tannie — 22" },
      { name: "description", content: "Twenty-two secrets for my favourite human." },
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

/* =========================================================================
   PHOTOS — drop your images into /public/secrets/ on GitHub.
   Filenames must match the values below (see public/secrets/README.md).
   ONLY YOU upload — Tannie just interacts.
   ========================================================================= */
const PHOTO_MAP: Record<string, string> = {
  cafe:      "/secrets/polaroid-cafe.jpg",
  loyalty:   "/secrets/polaroid-loyalty.jpg",
  road:      "/secrets/polaroid-road.jpg",
  sky:       "/secrets/polaroid-sky.jpg",
  swissroll: "/secrets/polaroid-swissroll.jpg",
  letter:    "/secrets/polaroid-letter.jpg",
  candle:    "/secrets/polaroid-candle.jpg",
};

/* =========================================================================
   MEMORY JUKEBOX — pulled "from our chat". 60+ to choose from.
   ========================================================================= */
const JUKEBOX_MEMORIES = [
  "The time you ordered for both of us in a voice that legally qualified as a threat.",
  "The bug. The bribe. The cop. A trilogy nobody is allowed to film.",
  "When you face-timed me crying about a TikTok cat. Iconic emotional range.",
  "Tertjie runs. Always tertjie runs. A religion, basically.",
  "You blocking someone mid-sentence on speakerphone — peak performance art.",
  "The Swiss roll incident. Justice for that pastry remains unserved.",
  "Every 'I'm not even mad' that was clearly, visibly, biblically mad.",
  "The four learner's tests. A trilogy. With a sequel. With a director's cut.",
  "Dancing barefoot in a parking lot at 2am because the song was that song.",
  "You explaining a conspiracy theory at gym, then quitting gym forever.",
  "The voice notes that are 14 minutes long for no reason.",
  "That one outfit you swore was 'casual'. Tannie. It was not casual.",
  "Me typing a whole paragraph and you sending back 'k'.",
  "The grocery store run that turned into a 3-hour life debrief.",
  "You laughing at your own joke before finishing it. Every time.",
  "The night we decided we were 'starting over Monday'. We did not start over Monday.",
  "When I sent you something cursed and you said 'no notes, perfection'.",
  "The road trip playlist that was just one song on loop.",
  "You crying laughing in a Woolies and a manager came to check.",
  "Telling me 'don't react' and then immediately reacting harder than me.",
  "The selfies in dressing rooms of clothes we never bought.",
  "That guy. You know which one. We don't say his name.",
  "When you texted me at 3am: 'are you up' — no follow up. Ever.",
  "The way you say 'oom' like it's a full sentence.",
  "Holding my drink, my bag, my dignity, all at once.",
  "Sharing a single AirPod and arguing over the song.",
  "Your specific brand of pep talk that's 80% insult, 20% love.",
  "The screenshots folder we are both legally responsible for.",
  "The Spotify playlist named after our trauma.",
  "Calling me from a parking lot to talk for 90 minutes while still sitting in it.",
  "The matching tattoos we are absolutely never getting (probably).",
  "Your dad's face the first time he met me. We laugh about it now.",
  "The fight we had over a chicken wrap. A CHICKEN WRAP.",
  "Voice-noting me your dreams in full HD detail at 6am.",
  "That coffee shop that wasn't even that good but it was ours.",
  "The drive home where we didn't speak and it was perfect.",
  "Me asking 'are you okay' and you replying with three video memes.",
  "Your laugh through a wall. Every wall. Engineering failed against it.",
  "The trip we keep planning that we will eventually take. Probably. Maybe.",
  "How you defend me to people I don't even know we're talking about.",
  "Stealing fries off my plate while maintaining you 'didn't want any'.",
  "The five-year voice note streak. Unhinged. Beautiful.",
  "You typing 'OMW' and arriving 47 minutes later. Every. Single. Time.",
  "The Sunday we ate breakfast for three meals straight. No regrets.",
  "Reading me the entire Uber driver's life story in real-time.",
  "Your gym selfie phase. Brief. Glorious. Documented forever.",
  "Falling asleep on FaceTime and waking up still connected.",
  "That period you only communicated in TikTok links for two weeks.",
  "The specific noise you make when food is good. Patented.",
  "Trying to teach me Afrikaans slang and giving up by Tuesday.",
  "The petrol station pies after every bad night. Sacred ritual.",
  "You crying at the dog adoption ad. Still mad they aired it.",
  "The eye contact you do across a room that means 'we leave NOW'.",
  "Reorganising my kitchen uninvited because 'it was triggering you'.",
  "Sending me horoscopes you don't even believe, just to bait me.",
  "Our shared opinion on coriander. United front. Will die on hill.",
  "You picking outfits for me over video call. Stylist energy.",
  "The 'I'm five minutes away' text from across the province.",
  "Watching you argue with a self-checkout machine and losing.",
  "Your road-rage voice. Different person. Mythic. Terrifying.",
  "The voice memo you sent me JUST to scream at a driver. No context.",
  "Sleeping on the floor of my room because the couch 'wasn't right'.",
  "The bottle of wine we never opened. It's still there. Symbolic.",
  "Trying to do a juice cleanse for three hours. Eating a burger on hour four.",
  "Texting me a photo of the moon at 1am with no caption.",
  "Showing up at my door with snacks I didn't know I needed.",
  "The way you greet my mother louder than my mother.",
  "Sitting in silence in the car after a funeral. Best company alive.",
  "The drunk McDonald's order that became a love language.",
  "Convincing me to dye my hair. Twice. I still blame you. Lovingly.",
];

/* =========================================================================
   SECRETS — exactly 22. List below auto-mirrors this.
   Unlock-the-list trigger at 5 found.
   ========================================================================= */
type Secret = { key: string; title: string; hint: string };
const SECRETS: Secret[] = [
  { key: "all-six",            title: "Open every fragment",         hint: "tap all six tiles" },
  { key: "photo-cafe",         title: "The laugh, in a photo",       hint: "fragment I → view photo" },
  { key: "photo-loyalty",      title: "The ride-or-die clause",      hint: "fragment II → view photo" },
  { key: "photo-road",         title: "The highway",                 hint: "fragment III → view photo" },
  { key: "photo-sky",          title: "9,272 km of sky",             hint: "fragment IV → view photo" },
  { key: "photo-swissroll",    title: "Exhibit A — the pastry",      hint: "fragment V → view photo" },
  { key: "photo-letter",       title: "Kept the voice notes too",    hint: "fragment VI → view photo" },
  { key: "candle",             title: "Blow out the candle",         hint: "open the final room → tap" },
  { key: "wish",               title: "Make a wish",                 hint: "type a wish + hit enter" },
  { key: "jukebox",            title: "Jukebox · three pulls",       hint: "spin the memory jukebox 3×" },
  { key: "jukebox-deep",       title: "Jukebox · deep cut",          hint: "pull a memory 10×" },
  { key: "jukebox-binge",      title: "Jukebox · the whole tape",    hint: "pull 25× — committed" },
  { key: "distance",           title: "No distance, really",         hint: "tap the big 9,272 three times" },
  { key: "word-swap",          title: "What I actually call you",    hint: "tap the word 'person' until it loops" },
  { key: "shake",              title: "Shake the page",              hint: "physically shake your phone" },
  { key: "longpress-headline", title: "Truth under the headline",    hint: "press & hold the opening line" },
  { key: "longpress-tile",     title: "Whisper from a memory",       hint: "press & hold any fragment" },
  { key: "dot-sequence",       title: "The constellation",           hint: "tap the bottom dots 1→6 in order" },
  { key: "dot-reverse",        title: "Backwards through time",      hint: "tap the bottom dots 6→1" },
  { key: "music",              title: "Press play",                  hint: "the ♩ button, top right" },
  { key: "double-distance",    title: "The closer reading",          hint: "double-tap the number 9,272" },
  { key: "days-count",         title: "Years on the books",          hint: "tap the days counter at the bottom" },
];

const STYLES = `
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
:root {
  /* PALETTE — refreshed: deep ink-blue night, gold + coral accents, warm bone paper */
  --bg: #0c0e1a;
  --surface: #161a2b;
  --surface-2: #1f243a;
  --paper: #f4ecd8;
  --paper-warm: #ebe0c4;
  --ink: #1a1426;
  --ink-mid: #4f4866;
  --ink-soft: #8a849f;
  --ink-ghost: #c4bdd4;
  --coral: #ff8b6b;
  --coral-deep: #d65a4a;
  --gold: #f4c87a;
  --gold-deep: #b8893a;
  --plum: #b48ad6;
  --teal: #66c7c2;
  --serif: 'Fraunces', Georgia, serif;
  --sans: 'DM Sans', system-ui, sans-serif;
  --hand: 'Caveat', cursive;
  --t: cubic-bezier(0.4, 0, 0.2, 1);
}
html { scroll-behavior: smooth; }
body { background: var(--bg); color: var(--paper); font-family: var(--serif); min-height: 100vh; overflow-x: hidden; -webkit-font-smoothing: antialiased; cursor: none; }
@media (hover: none) { body { cursor: auto; } #cursor, #cursor-dot { display: none; } }
body::after { content: ''; position: fixed; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.045'/%3E%3C/svg%3E"); pointer-events: none; z-index: 9999; mix-blend-mode: overlay; }

/* Aurora background */
body::before { content: ''; position: fixed; inset: -20%; background: radial-gradient(50% 40% at 20% 30%, rgba(255,139,107,0.10), transparent 70%), radial-gradient(40% 35% at 80% 70%, rgba(180,138,214,0.10), transparent 70%), radial-gradient(45% 35% at 50% 100%, rgba(244,200,122,0.08), transparent 70%); pointer-events: none; z-index: 0; animation: aurora 22s ease-in-out infinite alternate; }
@keyframes aurora { from { transform: translate(0,0); } to { transform: translate(3%, -2%); } }

#cursor { position: fixed; top: 0; left: 0; width: 28px; height: 28px; border: 1px solid var(--coral-deep); border-radius: 50%; pointer-events: none; z-index: 10000; transform: translate(-50%, -50%); transition: width 0.25s, height 0.25s, border-color 0.25s, background 0.25s; mix-blend-mode: difference; }
#cursor-dot { position: fixed; top: 0; left: 0; width: 4px; height: 4px; background: var(--coral); border-radius: 50%; pointer-events: none; z-index: 10001; transform: translate(-50%, -50%); }
#cursor.hover { width: 56px; height: 56px; border-color: var(--gold); background: rgba(244,200,122,0.10); }
.spark { position: fixed; width: 4px; height: 4px; background: var(--gold); border-radius: 50%; pointer-events: none; z-index: 9998; opacity: 0.8; animation: sparkfade 0.9s ease-out forwards; }
@keyframes sparkfade { to { transform: translate(var(--dx), var(--dy)) scale(0); opacity: 0; } }

#loader { position: fixed; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--bg); z-index: 1000; transition: opacity 1.2s var(--t), visibility 1.2s; }
#loader.out { opacity: 0; visibility: hidden; }
.loader-year { font-family: var(--sans); font-size: 11px; letter-spacing: 0.4em; color: var(--gold); text-transform: uppercase; margin-bottom: 2.8rem; opacity: 0; animation: rise 1.2s var(--t) 0.4s forwards; }
.loader-title { font-family: var(--serif); font-size: clamp(64px, 12vw, 140px); font-weight: 400; font-style: italic; color: var(--paper); line-height: 0.95; opacity: 0; animation: rise 1.4s var(--t) 0.7s forwards; letter-spacing: -0.03em; }
.loader-title em { color: var(--coral); font-style: italic; }
.loader-sub { font-family: var(--sans); font-size: 11px; letter-spacing: 0.35em; color: var(--ink-ghost); text-transform: uppercase; margin-top: 2.5rem; opacity: 0; animation: rise 1.2s var(--t) 1.4s forwards; text-align: center; max-width: 360px; line-height: 1.9; }
.loader-enter { margin-top: 4rem; font-family: var(--sans); font-size: 11px; letter-spacing: 0.3em; color: var(--paper); text-transform: uppercase; cursor: none; border: 1px solid var(--coral); background: none; padding: 0.9rem 1.8rem; opacity: 0; animation: rise 1s var(--t) 2.4s forwards; transition: color 0.3s, border-color 0.3s, background 0.3s; }
.loader-enter:hover { color: var(--gold); border-color: var(--gold); background: rgba(244,200,122,0.10); }

#main { opacity: 0; transition: opacity 1.4s var(--t); min-height: 100vh; position: relative; z-index: 1; }
#main.visible { opacity: 1; }

.chapter { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 8vh 6vw; position: relative; }

/* CH1 */
#ch1 { flex-direction: column; text-align: center; }
.ch1-eyebrow { font-family: var(--sans); font-size: 10px; letter-spacing: 0.45em; color: var(--gold); text-transform: uppercase; margin-bottom: 3rem; opacity: 0; transform: translateY(8px); transition: all 1.2s var(--t); }
.ch1-eyebrow.in { opacity: 1; transform: translateY(0); }
.ch1-headline { font-size: clamp(38px, 6.5vw, 80px); font-weight: 400; font-style: italic; line-height: 1.1; color: var(--paper); max-width: 820px; opacity: 0; transform: translateY(14px); transition: all 1.4s var(--t) 0.2s; letter-spacing: -0.02em; }
.ch1-headline.in { opacity: 1; transform: translateY(0); }
.ch1-headline em { color: var(--coral); font-style: italic; }
.ch1-rule { width: 1px; height: 0; background: var(--gold); margin: 3rem auto; transition: height 1.6s var(--t) 0.4s; }
.ch1-rule.in { height: 70px; }
.ch1-body { font-family: var(--sans); font-size: clamp(15px, 1.6vw, 17px); font-weight: 300; color: var(--ink-ghost); line-height: 1.95; max-width: 560px; opacity: 0; transform: translateY(10px); transition: all 1.2s var(--t) 0.6s; }
.ch1-body.in { opacity: 1; transform: translateY(0); }
.scroll-nudge { position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%); font-family: var(--sans); font-size: 10px; letter-spacing: 0.35em; color: var(--ink-soft); text-transform: uppercase; opacity: 0; animation: breath 3s ease-in-out 3s infinite; }
@keyframes breath { 0%,100% { opacity: 0.25; } 50% { opacity: 0.75; } }

/* CH2 */
#ch2 { flex-direction: column; min-height: auto; padding: 12vh 6vw; gap: 4rem; }
.ch2-label { font-family: var(--sans); font-size: 10px; letter-spacing: 0.45em; color: var(--gold); text-transform: uppercase; text-align: center; opacity: 0; transition: opacity 1.2s var(--t); }
.ch2-label.in { opacity: 1; }
.ch2-title { font-family: var(--serif); font-size: clamp(28px, 4vw, 44px); font-style: italic; color: var(--paper); text-align: center; max-width: 720px; margin: 0 auto; line-height: 1.2; opacity: 0; transition: opacity 1.2s var(--t) 0.2s; letter-spacing: -0.01em; }
.ch2-title.in { opacity: 1; }
.ch2-title em { color: var(--coral); }
.ch2-instruction { font-family: var(--sans); font-size: 12px; letter-spacing: 0.2em; color: var(--ink-soft); text-align: center; opacity: 0; transition: opacity 1.2s var(--t) 0.3s; }
.ch2-instruction.in { opacity: 1; }
.fragment-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5px; width: 100%; max-width: 980px; margin: 0 auto; opacity: 0; transition: opacity 1.4s var(--t) 0.5s; }
.fragment-grid.in { opacity: 1; }
.fragment { background: var(--surface); padding: 2.5rem 2rem; cursor: none; position: relative; overflow: hidden; border: 1px solid #232844; transition: background 0.4s, border-color 0.4s, transform 0.4s; min-height: 200px; display: flex; flex-direction: column; justify-content: space-between; }
.fragment:hover { background: var(--surface-2); border-color: #2f3656; transform: translateY(-2px); }
.fragment.opened { border-color: var(--coral); background: #1b2038; }
.fragment-number { font-family: var(--sans); font-size: 10px; letter-spacing: 0.35em; color: var(--gold); text-transform: uppercase; margin-bottom: 1.5rem; opacity: 0.9; }
.fragment-locked { font-family: var(--serif); font-size: 22px; font-style: italic; color: var(--ink-soft); line-height: 1.35; transition: all 0.6s var(--t); user-select: none; letter-spacing: -0.01em; }
.fragment.opened .fragment-locked { color: var(--paper); }
.fragment-reveal { font-family: var(--sans); font-size: 12.5px; color: var(--ink-ghost); letter-spacing: 0.05em; margin-top: 1.5rem; max-height: 0; overflow: hidden; opacity: 0; transition: max-height 0.8s var(--t), opacity 0.6s var(--t) 0.2s; line-height: 1.75; }
.fragment.opened .fragment-reveal { max-height: 320px; opacity: 1; }
.fragment-photo-cue { display: inline-block; margin-top: 0.8rem; font-family: var(--sans); font-size: 9px; letter-spacing: 0.35em; color: var(--coral); text-transform: uppercase; border-bottom: 1px solid var(--coral-deep); padding-bottom: 2px; cursor: none; opacity: 0; transition: opacity 0.6s 0.4s, color 0.3s; }
.fragment.opened .fragment-photo-cue { opacity: 1; }
.fragment-photo-cue:hover { color: var(--gold); border-color: var(--gold); }
.fragment-hint { position: absolute; bottom: 1.2rem; right: 1.5rem; font-family: var(--sans); font-size: 9px; letter-spacing: 0.3em; color: var(--ink-soft); text-transform: uppercase; transition: opacity 0.3s; }
.fragment.opened .fragment-hint { opacity: 0; }
.fragment::before { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent 0%, rgba(244,200,122,0.06) 50%, transparent 100%); transform: translateX(-100%); transition: transform 0s; }
.fragment:hover::before { transform: translateX(100%); transition: transform 0.9s ease; }

.tip-toast { position: fixed; left: 50%; bottom: 4.2rem; transform: translateX(-50%) translateY(20px); background: rgba(22,26,43,0.96); border: 1px solid var(--coral); padding: 0.8rem 1.4rem; font-family: var(--sans); font-size: 11px; letter-spacing: 0.15em; color: var(--paper); text-transform: uppercase; z-index: 800; opacity: 0; transition: all 0.5s var(--t); pointer-events: none; max-width: 92vw; text-align: center; }
.tip-toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
.tip-toast .tk { color: var(--gold); }

.jukebox-wrap { max-width: 720px; margin: 6rem auto 0; text-align: center; opacity: 0; transition: opacity 1.2s var(--t); }
.jukebox-wrap.in { opacity: 1; }
.jukebox-label { font-family: var(--sans); font-size: 10px; letter-spacing: 0.4em; color: var(--gold); text-transform: uppercase; margin-bottom: 1.5rem; }
.jukebox-screen { background: var(--surface); border: 1px solid #232844; padding: 3rem 2rem; min-height: 160px; display: flex; align-items: center; justify-content: center; font-family: var(--serif); font-style: italic; font-size: clamp(18px, 2.4vw, 26px); color: var(--paper); line-height: 1.5; transition: opacity 0.4s; letter-spacing: -0.01em; }
.jukebox-screen.swap { opacity: 0; }
.jukebox-btn { margin-top: 1.5rem; font-family: var(--sans); font-size: 10px; letter-spacing: 0.35em; color: var(--coral); text-transform: uppercase; background: none; border: 1px solid var(--coral-deep); padding: 0.8rem 1.6rem; cursor: none; transition: all 0.3s; }
.jukebox-btn:hover { color: var(--paper); background: rgba(214,90,74,0.18); border-color: var(--coral); }
.jukebox-meta { font-family: var(--sans); font-size: 10px; letter-spacing: 0.25em; color: var(--ink-soft); text-transform: uppercase; margin-top: 1rem; }
.jukebox-meta .num { color: var(--gold); }

/* CH3 — FINAL ROOM (no letter; just the moment) */
#ch3 { min-height: 90vh; flex-direction: column; align-items: center; justify-content: center; padding: 8vh 6vw; }
.final-trigger { font-family: var(--sans); font-size: 10px; letter-spacing: 0.4em; color: var(--ink-soft); text-transform: uppercase; text-align: center; margin-bottom: 3rem; opacity: 0; transition: opacity 1.2s var(--t); }
.final-trigger.in { opacity: 1; }
.final-gate { text-align: center; max-width: 640px; }
.final-locked { font-family: var(--serif); font-size: 17px; font-style: italic; color: var(--ink-soft); opacity: 0; transition: opacity 1s var(--t); }
.final-locked.show { opacity: 1; }
.final-message { opacity: 0; transform: translateY(16px); transition: opacity 1.6s var(--t), transform 1.6s var(--t); pointer-events: none; }
.final-message.unlocked { opacity: 1; transform: translateY(0); pointer-events: all; }
.final-big { font-family: var(--serif); font-size: clamp(34px, 6vw, 60px); font-weight: 400; font-style: italic; color: var(--paper); line-height: 1.2; margin-bottom: 2.5rem; letter-spacing: -0.02em; }
.final-big em { color: var(--coral); }
.final-small { font-family: var(--sans); font-size: 14px; font-weight: 300; color: var(--ink-ghost); line-height: 1.95; max-width: 480px; margin: 0 auto 3rem; }
.final-secret-cue { display: inline-block; margin-top: 1.5rem; font-family: var(--sans); font-size: 11px; letter-spacing: 0.35em; color: var(--gold); text-transform: uppercase; border-bottom: 1px solid var(--gold-deep); padding-bottom: 4px; cursor: none; transition: color 0.3s; }
.final-secret-cue:hover { color: var(--coral); border-color: var(--coral); }
.gold-rule { width: 50px; height: 1px; background: var(--gold); margin: 2.5rem auto; }

.wish-box { margin-top: 4rem; padding: 2.5rem 2rem; border: 1px dashed var(--ink-mid); max-width: 480px; margin-left: auto; margin-right: auto; opacity: 0; transition: opacity 1s var(--t); }
.wish-box.show { opacity: 1; }
.wish-label { font-family: var(--sans); font-size: 10px; letter-spacing: 0.4em; color: var(--gold); text-transform: uppercase; margin-bottom: 1.2rem; }
.wish-input { width: 100%; background: transparent; border: none; border-bottom: 1px solid var(--ink-mid); color: var(--paper); font-family: var(--serif); font-size: 18px; font-style: italic; padding: 0.5rem 0; outline: none; text-align: center; cursor: none; }
.wish-input::placeholder { color: var(--ink-soft); font-style: italic; }
.wish-input:focus { border-color: var(--coral); }
.wish-saved { font-family: var(--hand); font-size: 22px; color: var(--coral); margin-top: 1rem; opacity: 0; transition: opacity 0.6s; }
.wish-saved.show { opacity: 1; }

.word-swap { cursor: none; border-bottom: 1px dashed rgba(255,139,107,0.55); transition: color 0.4s; color: var(--coral); }
.word-swap:hover { color: var(--gold); }

.progress-bar { position: fixed; bottom: 1.5rem; left: 50%; transform: translateX(-50%); display: flex; gap: 6px; z-index: 100; opacity: 0; transition: opacity 0.6s; }
.progress-bar.show { opacity: 1; }
.progress-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--ink-mid); transition: background 0.4s, transform 0.4s; cursor: none; }
.progress-dot.done { background: var(--coral); transform: scale(1.4); }
.progress-dot.lit { background: var(--gold); transform: scale(1.6); }

.music-btn { position: fixed; top: 1.5rem; right: 1.5rem; font-family: var(--sans); font-size: 9px; letter-spacing: 0.3em; color: var(--ink-soft); text-transform: uppercase; background: none; border: 1px solid #2f3656; padding: 0.6rem 1rem; cursor: none; z-index: 200; opacity: 0; transition: opacity 0.6s, color 0.3s, border-color 0.3s; }
.music-btn.show { opacity: 1; }
.music-btn:hover { color: var(--paper); border-color: var(--gold); }
.music-btn.playing { color: var(--gold); border-color: var(--gold); }

.secret-hint { position: fixed; top: 1.5rem; left: 1.5rem; font-family: var(--sans); font-size: 9px; letter-spacing: 0.35em; color: var(--ink-soft); text-transform: uppercase; z-index: 200; opacity: 0; transition: opacity 0.6s; cursor: none; }
.secret-hint.show { opacity: 1; }
.secret-hint:hover { color: var(--gold); }
.secret-hint .count { color: var(--coral); }
.secret-hint .pulse { display: inline-block; animation: pulse 2s ease-in-out infinite; }
@keyframes pulse { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }

/* SECRETS LIST PANEL */
.secrets-panel { position: fixed; inset: 0; background: rgba(8,10,20,0.94); z-index: 750; opacity: 0; pointer-events: none; transition: opacity 0.5s var(--t); backdrop-filter: blur(10px); overflow-y: auto; padding: 6vh 4vw; }
.secrets-panel.show { opacity: 1; pointer-events: all; }
.secrets-card { max-width: 640px; margin: 0 auto; background: var(--surface); border: 1px solid var(--coral); padding: 3rem 2.5rem; position: relative; }
.secrets-eyebrow { font-family: var(--sans); font-size: 10px; letter-spacing: 0.4em; color: var(--gold); text-transform: uppercase; margin-bottom: 0.8rem; text-align: center; }
.secrets-title { font-family: var(--serif); font-style: italic; font-size: clamp(26px, 4vw, 36px); color: var(--paper); text-align: center; margin-bottom: 2rem; line-height: 1.2; letter-spacing: -0.01em; }
.secrets-progress { text-align: center; font-family: var(--sans); font-size: 11px; letter-spacing: 0.3em; color: var(--ink-soft); text-transform: uppercase; margin-bottom: 2rem; }
.secrets-progress strong { color: var(--coral); font-weight: 500; }
.secrets-list { list-style: none; display: flex; flex-direction: column; gap: 0.4rem; }
.secrets-item { display: flex; gap: 1rem; padding: 0.85rem 1rem; border: 1px solid #232844; transition: border-color 0.3s, background 0.3s; }
.secrets-item.found { border-color: var(--gold); background: rgba(244,200,122,0.08); }
.secrets-check { width: 18px; height: 18px; border: 1px solid var(--ink-mid); border-radius: 50%; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-family: var(--serif); font-size: 12px; color: var(--coral); margin-top: 2px; }
.secrets-item.found .secrets-check { border-color: var(--gold); background: var(--gold); color: var(--ink); }
.secrets-body { flex: 1; min-width: 0; }
.secrets-name { font-family: var(--serif); font-style: italic; font-size: 17px; color: var(--paper); line-height: 1.3; letter-spacing: -0.01em; }
.secrets-item:not(.found) .secrets-name { color: var(--ink-soft); }
.secrets-hint { font-family: var(--sans); font-size: 11px; letter-spacing: 0.05em; color: var(--ink-soft); margin-top: 4px; line-height: 1.5; }
.secrets-close { position: absolute; top: 1rem; right: 1rem; font-family: var(--sans); font-size: 9px; letter-spacing: 0.3em; color: var(--ink-soft); text-transform: uppercase; background: none; border: 1px solid var(--ink-mid); padding: 0.5rem 0.9rem; cursor: none; }
.secrets-close:hover { color: var(--gold); border-color: var(--gold); }

/* POLAROID */
.polaroid-overlay { position: fixed; inset: 0; background: rgba(8,5,10,0.92); z-index: 500; display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity 0.5s var(--t); backdrop-filter: blur(8px); padding: 4vh 6vw; }
.polaroid-overlay.show { opacity: 1; pointer-events: all; }
.polaroid { background: #f6f0e2; padding: 14px 14px 64px; box-shadow: 0 30px 80px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.04); transform: rotate(-2.5deg) scale(0.9); transition: transform 0.7s var(--t); max-width: min(440px, 86vw); position: relative; }
.polaroid-overlay.show .polaroid { transform: rotate(-2.5deg) scale(1); }
.polaroid img { display: block; width: 100%; height: auto; filter: sepia(0.18) contrast(0.98); background: var(--surface); min-height: 220px; }
.polaroid-caption { position: absolute; left: 0; right: 0; bottom: 16px; text-align: center; font-family: var(--hand); font-size: 24px; color: #4a4540; padding: 0 16px; line-height: 1.2; }
.polaroid-close { position: absolute; top: -42px; right: -4px; font-family: var(--sans); font-size: 9px; letter-spacing: 0.3em; color: var(--paper); text-transform: uppercase; background: none; border: 1px solid rgba(255,255,255,0.25); padding: 0.5rem 0.9rem; cursor: none; }
.polaroid-close:hover { border-color: var(--gold); color: var(--gold); }

.heart { position: fixed; top: -40px; font-size: 22px; color: var(--coral); pointer-events: none; z-index: 400; animation: fall linear forwards; user-select: none; }
@keyframes fall { to { transform: translateY(110vh) rotate(360deg); opacity: 0; } }

.confetti { position: fixed; width: 8px; height: 14px; pointer-events: none; z-index: 600; top: -20px; animation: confettifall linear forwards; }
@keyframes confettifall { to { transform: translateY(110vh) rotate(720deg); opacity: 0; } }

.distance-footer { text-align: center; padding: 5rem 2rem 7rem; position: relative; z-index: 1; }
.distance-num { font-family: var(--serif); font-size: clamp(56px, 9vw, 100px); font-style: italic; color: #2a2d44; line-height: 1; display: inline-block; cursor: none; transition: color 0.6s; letter-spacing: -0.03em; user-select: none; }
.distance-num.tapped { color: var(--coral); }
.distance-num.gold { color: var(--gold); }
.distance-label { font-family: var(--sans); font-size: 10px; letter-spacing: 0.4em; color: var(--ink-soft); text-transform: uppercase; margin-top: 1rem; display: block; }
.distance-coda { font-family: var(--serif); font-size: 17px; font-style: italic; color: var(--ink-ghost); margin-top: 1.5rem; display: block; }
.friendship-counter { margin-top: 4rem; font-family: var(--sans); font-size: 11px; letter-spacing: 0.3em; color: var(--ink-soft); text-transform: uppercase; cursor: none; }
.friendship-counter strong { font-family: var(--serif); font-style: italic; font-size: 28px; color: var(--coral); display: block; margin-top: 0.6rem; letter-spacing: 0; text-transform: none; font-weight: 400; transition: color 0.4s; }
.friendship-counter:hover strong { color: var(--gold); }

.banner { position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%) scale(0.9); background: var(--surface); border: 1px solid var(--gold); padding: 3rem 4rem; z-index: 700; opacity: 0; pointer-events: none; transition: all 0.6s var(--t); text-align: center; max-width: 90vw; }
.banner.show { opacity: 1; transform: translate(-50%,-50%) scale(1); pointer-events: all; }
.banner-eyebrow { font-family: var(--sans); font-size: 10px; letter-spacing: 0.4em; color: var(--gold); text-transform: uppercase; margin-bottom: 1.5rem; }
.banner-title { font-family: var(--serif); font-size: clamp(28px, 4vw, 44px); font-style: italic; color: var(--paper); line-height: 1.2; margin-bottom: 1.5rem; }
.banner-body { font-family: var(--sans); font-size: 13px; color: var(--ink-ghost); line-height: 1.8; margin-bottom: 2rem; }
.banner-close { font-family: var(--sans); font-size: 10px; letter-spacing: 0.3em; color: var(--ink-soft); text-transform: uppercase; background: none; border: 1px solid var(--ink-mid); padding: 0.6rem 1.2rem; cursor: none; transition: all 0.3s; }
.banner-close:hover { color: var(--gold); border-color: var(--gold); }

@keyframes rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.reveal-on-scroll { opacity: 0; transform: translateY(14px); transition: opacity 1.2s var(--t), transform 1.2s var(--t); }
.reveal-on-scroll.in { opacity: 1; transform: translateY(0); }

@media (max-width: 640px) {
  .secret-hint { font-size: 8px; }
  .banner { padding: 2rem 1.5rem; }
  .secrets-card { padding: 2rem 1.4rem; }
}
`;

function TanniePage() {
  useEffect(() => {
    const $ = (id: string) => document.getElementById(id);

    const secretsListHTML = SECRETS.map(
      (s, i) => `
      <li class="secrets-item" data-skey="${s.key}">
        <div class="secrets-check">✦</div>
        <div class="secrets-body">
          <div class="secrets-name">${String(i + 1).padStart(2, "0")} · ${s.title}</div>
          <div class="secrets-hint">${s.hint}</div>
        </div>
      </li>`,
    ).join("");

    const fragmentsHTML = `
      <div class="fragment" data-idx="0" data-photo="cafe" data-caption="the laugh in evidence." data-key="cafe">
        <div class="fragment-number">I.</div>
        <div class="fragment-locked">The laugh. Still the loudest weapon you own.</div>
        <div class="fragment-reveal">Hyena energy. Zero filter. Heads turn, dogs bark, waiters reconsider their career. It's the sound of home for me — even from 9,272 km away.<br><span class="fragment-photo-cue">view photo →</span></div>
        <div class="fragment-hint">tap</div>
      </div>
      <div class="fragment" data-idx="1" data-photo="loyalty" data-caption="the ride-or-die clause." data-key="loyalty">
        <div class="fragment-number">II.</div>
        <div class="fragment-locked">You've never once aimed your sharpness at me.</div>
        <div class="fragment-reveal">You could have. I've earned it once or twice. You never did. That's not nothing — that's a whole code of honour, and I clocked it every single time.<br><span class="fragment-photo-cue">view photo →</span></div>
        <div class="fragment-hint">tap</div>
      </div>
      <div class="fragment" data-idx="2" data-photo="road" data-caption="the highway. before the bug." data-key="road">
        <div class="fragment-number">III.</div>
        <div class="fragment-locked">The bug. The bribe. The four learner's tests.</div>
        <div class="fragment-reveal">I'm telling that story until I'm eighty and toothless. Not because it was funny — though it was criminal — but because it was so impossibly, perfectly us.<br><span class="fragment-photo-cue">view photo →</span></div>
        <div class="fragment-hint">tap</div>
      </div>
      <div class="fragment" data-idx="3" data-photo="sky" data-caption="9,272 km of sky." data-key="sky">
        <div class="fragment-number">IV.</div>
        <div class="fragment-locked">You, in a different country, becoming somebody bigger.</div>
        <div class="fragment-reveal">Watched it from far away. Didn't say it loud enough. So here, in writing: I am proud of you in the quiet, embarrassing, sit-in-your-chest way that doesn't go anywhere.<br><span class="fragment-photo-cue">view photo →</span></div>
        <div class="fragment-hint">tap</div>
      </div>
      <div class="fragment" data-idx="4" data-photo="swissroll" data-caption="exhibit A: the pastry." data-key="swissroll">
        <div class="fragment-number">V.</div>
        <div class="fragment-locked">The Swiss roll incident.</div>
        <div class="fragment-reveal">One bite. ONE BITE. Then full personal vendetta. I think about it more often than I'd like to admit. Iconic restraint. Iconic disrespect. Both can be true.<br><span class="fragment-photo-cue">view photo →</span></div>
        <div class="fragment-hint">tap</div>
      </div>
      <div class="fragment" data-idx="5" data-photo="letter" data-caption="kept the voice notes too." data-key="letter">
        <div class="fragment-number">VI.</div>
        <div class="fragment-locked">I still thought of you. Random Tuesdays. No reason.</div>
        <div class="fragment-reveal">A song. A weird billboard. Someone saying something dumb in a queue. Distance doesn't really do what people say it does. Not for us, anyway.<br><span class="fragment-photo-cue">view photo →</span></div>
        <div class="fragment-hint">tap</div>
      </div>
    `;

    const HTML = `
<div id="cursor"></div>
<div id="cursor-dot"></div>

<div id="loader">
  <div class="loader-year">A birthday note · twenty-two · 2026</div>
  <div class="loader-title">For <em>Tannie</em></div>
  <div class="loader-sub">From your person.<br>22 secrets — one for every year of you.<br>Tap, hold, shake, find them.</div>
  <button class="loader-enter" id="loader-enter">Open it →</button>
</div>

<button class="music-btn" id="music-btn">♩ music</button>
<audio id="ambient" loop><source src="https://cdn.pixabay.com/download/audio/2022/10/25/audio_5e74f32e2a.mp3" type="audio/mp3"></audio>

<div class="secret-hint" id="secret-hint" title="tap to see the list">
  secrets · <span class="count" id="secret-count">0</span> / 22 <span class="pulse"> · tap me</span>
</div>

<div class="tip-toast" id="tip-toast"></div>

<div class="progress-bar" id="progress-bar">
  <div class="progress-dot" id="pd0"></div><div class="progress-dot" id="pd1"></div><div class="progress-dot" id="pd2"></div>
  <div class="progress-dot" id="pd3"></div><div class="progress-dot" id="pd4"></div><div class="progress-dot" id="pd5"></div>
</div>

<div id="main">
  <section class="chapter" id="ch1">
    <div class="ch1-eyebrow">Happy birthday · to my favourite human</div>
    <div class="ch1-headline" id="ch1-headline" title="press &amp; hold me">Twenty-two looks <em>ridiculous</em> on you.<br>I mean that lovingly. Mostly.</div>
    <div class="ch1-rule"></div>
    <div class="ch1-body">
      No long letter this year. Just a room full of small things — six memories, a jukebox built from us, twenty-two secrets stitched into the page.<br><br>
      Tap things. Hold things. Shake things. The list unlocks at five.
    </div>
    <div class="scroll-nudge">scroll ↓</div>
  </section>

  <section class="chapter" id="ch2">
    <div class="ch2-label reveal-on-scroll">Six things from this year</div>
    <div class="ch2-title reveal-on-scroll">Receipts. Memories. <em>Minor crimes.</em><br>The friendship in evidence.</div>
    <div class="ch2-instruction reveal-on-scroll">— tap each tile. each one hides a polaroid. —</div>
    <div class="fragment-grid reveal-on-scroll" id="fragment-grid">${fragmentsHTML}</div>

    <div class="jukebox-wrap reveal-on-scroll" id="jukebox">
      <div class="jukebox-label">— the memory jukebox · ${JUKEBOX_MEMORIES.length} pulled from us —</div>
      <div class="jukebox-screen" id="jukebox-screen">press the button. roll the dice.</div>
      <button class="jukebox-btn" id="jukebox-btn">↻ pull a memory</button>
      <div class="jukebox-meta"><span class="num" id="jb-count">0</span> / ${JUKEBOX_MEMORIES.length} pulled</div>
    </div>
  </section>

  <section class="chapter" id="ch3">
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
    <div class="friendship-counter" id="friendship-counter">days on the books<strong id="years-count">—</strong></div>
  </div>
</div>

<div class="polaroid-overlay" id="polaroid-overlay">
  <div class="polaroid">
    <button class="polaroid-close" id="polaroid-close">close</button>
    <img id="polaroid-img" src="" alt="" loading="lazy" />
    <div class="polaroid-caption" id="polaroid-caption"></div>
  </div>
</div>

<div class="secrets-panel" id="secrets-panel">
  <div class="secrets-card">
    <button class="secrets-close" id="secrets-close">close</button>
    <div class="secrets-eyebrow">the index · 22 secrets</div>
    <div class="secrets-title">Everything hiding<br>in this page.</div>
    <div class="secrets-progress"><strong id="sp-count">0</strong> / 22 found · keep poking</div>
    <ul class="secrets-list" id="secrets-list">${secretsListHTML}</ul>
  </div>
</div>

<div class="banner" id="banner">
  <div class="banner-eyebrow">all twenty-two · found</div>
  <div class="banner-title">You found everything.<br>Of course you did.</div>
  <div class="banner-body">That's the thing about you — you don't stop until you've seen the whole picture.<br>Same energy you bring to friendship. Same energy you bring to life.<br><br>22 secrets for 22 years of you. I love you, menace. Happy birthday.</div>
  <button class="banner-close" id="banner-close">close</button>
</div>
`;

    const host = document.getElementById("tannie-host");
    if (host) host.innerHTML = HTML;

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
    const secretsPanel = $("secrets-panel")!;
    const spCount = $("sp-count")!;

    const yc = $("years-count");
    if (yc) {
      const start = new Date("2017-01-01");
      const days = Math.floor((Date.now() - start.getTime()) / 86400000);
      yc.textContent = `${days.toLocaleString()} days · and counting`;
    }

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
        s.style.left = e.clientX + "px"; s.style.top = e.clientY + "px";
        s.style.setProperty("--dx", (Math.random() * 40 - 20) + "px");
        s.style.setProperty("--dy", (Math.random() * 40 - 20) + "px");
        document.body.appendChild(s);
        setTimeout(() => s.remove(), 900);
      }
      lastX = e.clientX; lastY = e.clientY;
    });
    document.addEventListener("mouseover", (e) => {
      const t = e.target as HTMLElement;
      if (t && (t.closest("button, a, .fragment, .word-swap, .final-secret-cue, .fragment-photo-cue, .distance-num, .friendship-counter, .jukebox-btn, input, .secret-hint, .secrets-item, .progress-dot"))) cursor.classList.add("hover");
      else cursor.classList.remove("hover");
    });

    /* SECRETS state */
    const TOTAL_SECRETS = 22;
    const STORAGE_KEY = "tannie-22-progress-v3";
    let found = new Set<string>();
    try { const raw = localStorage.getItem(STORAGE_KEY); if (raw) found = new Set(JSON.parse(raw)); } catch {}
    const save = () => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...found])); } catch {} };
    const haptic = (p: number | number[] = 18) => { try { if ("vibrate" in navigator) (navigator as any).vibrate(p); } catch {} };
    const tipEl = $("tip-toast")!;
    let tipTimer: ReturnType<typeof setTimeout> | null = null;
    const showTip = (html: string, ms = 2600) => {
      tipEl.innerHTML = html; tipEl.classList.add("show");
      if (tipTimer) clearTimeout(tipTimer);
      tipTimer = setTimeout(() => tipEl.classList.remove("show"), ms);
    };

    const renderSecretsList = () => {
      spCount.textContent = String(found.size);
      document.querySelectorAll<HTMLElement>(".secrets-item").forEach((el) => {
        const k = el.dataset.skey || "";
        if (found.has(k)) el.classList.add("found"); else el.classList.remove("found");
      });
    };
    renderSecretsList();

    let listAutoShown = false;
    const foundSecret = (key: string) => {
      if (found.has(key)) return;
      found.add(key); save();
      haptic([12, 40, 22]);
      secretCount.textContent = String(found.size);
      secretHint.classList.add("show");
      burstHearts(6, lastX || window.innerWidth/2, lastY || 80);
      showTip(`<span class="tk">secret ${found.size}/22</span> · found`, 1800);
      renderSecretsList();
      if (found.size >= 5 && !listAutoShown) {
        listAutoShown = true;
        setTimeout(() => {
          secretsPanel.classList.add("show");
          showTip(`<span class="tk">unlocked</span> · the secrets index`, 2400);
        }, 600);
      }
      if (found.size === TOTAL_SECRETS) {
        setTimeout(() => { confettiBurst(120); haptic([40,60,40,60,80]); banner.classList.add("show"); }, 500);
      }
    };
    secretCount.textContent = String(found.size);
    if (found.size > 0) secretHint.classList.add("show");
    if (found.size >= 5) listAutoShown = true;

    secretHint.addEventListener("click", () => { secretsPanel.classList.add("show"); haptic(10); });
    $("secrets-close")!.addEventListener("click", () => secretsPanel.classList.remove("show"));
    secretsPanel.addEventListener("click", (e) => { if (e.target === secretsPanel) secretsPanel.classList.remove("show"); });

    /* Motion */
    let lastShake = 0;
    function onMotion(e: DeviceMotionEvent) {
      const a = e.accelerationIncludingGravity;
      if (!a) return;
      const mag = Math.abs(a.x || 0) + Math.abs(a.y || 0) + Math.abs(a.z || 0);
      if (mag > 35 && Date.now() - lastShake > 1500) {
        lastShake = Date.now(); haptic([30,60,30]); rainHearts(25); foundSecret("shake");
      }
    }
    function enableMotion() {
      const DM = (window as any).DeviceMotionEvent;
      if (DM && typeof DM.requestPermission === "function") {
        DM.requestPermission().then((p: string) => { if (p === "granted") window.addEventListener("devicemotion", onMotion); }).catch(() => {});
      } else { window.addEventListener("devicemotion", onMotion); }
    }
    function showOnboarding() {
      setTimeout(() => showTip(`gestures live here · <span class="tk">tap</span>, <span class="tk">hold</span>, <span class="tk">shake</span>`, 3600), 1200);
      setTimeout(() => showTip(`secrets list opens at <span class="tk">5 found</span> · or tap the counter`, 3200), 5400);
      if (found.size > 0) setTimeout(() => showTip(`welcome back · <span class="tk">${found.size}/22</span> already found`, 2800), 9200);
    }

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
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") { hidePolaroid(); banner.classList.remove("show"); secretsPanel.classList.remove("show"); } });
    $("banner-close")!.addEventListener("click", () => banner.classList.remove("show"));

    $("loader-enter")!.addEventListener("click", () => {
      loader.classList.add("out");
      enableMotion();
      haptic(20);
      setTimeout(() => {
        main.classList.add("visible");
        progressBar.classList.add("show");
        musicBtn.classList.add("show");
        secretHint.classList.add("show");
        confettiBurst(30);
        initObservers();
        showOnboarding();
      }, 800);
    });

    /* Music */
    let playing = false;
    ambient.volume = 0.18;
    musicBtn.addEventListener("click", () => {
      playing = !playing;
      if (playing) { ambient.play().catch(() => {}); musicBtn.textContent = "♩ pause"; musicBtn.classList.add("playing"); foundSecret("music"); }
      else { ambient.pause(); musicBtn.textContent = "♩ music"; musicBtn.classList.remove("playing"); }
    });

    /* Fragments */
    let openedCount = 0;
    const totalFragments = 6;
    let lpTimer: ReturnType<typeof setTimeout> | null = null;
    document.querySelectorAll<HTMLDivElement>(".fragment").forEach((frag) => {
      const startLP = () => {
        if (lpTimer) clearTimeout(lpTimer);
        lpTimer = setTimeout(() => {
          haptic(20);
          showTip(`tip · <span class="tk">view photo →</span> opens the polaroid`, 2400);
          foundSecret("longpress-tile");
        }, 700);
      };
      const endLP = () => { if (lpTimer) { clearTimeout(lpTimer); lpTimer = null; } };
      frag.addEventListener("mousedown", startLP);
      frag.addEventListener("mouseup", endLP);
      frag.addEventListener("mouseleave", endLP);
      frag.addEventListener("touchstart", startLP, { passive: true });
      frag.addEventListener("touchend", endLP);
      frag.addEventListener("touchmove", endLP);

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

    /* Jukebox */
    const jbScreen = $("jukebox-screen")!;
    const jbCountEl = $("jb-count")!;
    let jbIdx = -1;
    let jbCount = 0;
    const seen = new Set<number>();
    $("jukebox-btn")!.addEventListener("click", () => {
      jbScreen.classList.add("swap");
      setTimeout(() => {
        let n = Math.floor(Math.random() * JUKEBOX_MEMORIES.length);
        let tries = 0;
        while ((n === jbIdx || seen.has(n)) && tries++ < 30 && seen.size < JUKEBOX_MEMORIES.length) {
          n = Math.floor(Math.random() * JUKEBOX_MEMORIES.length);
        }
        jbIdx = n; seen.add(n);
        jbScreen.textContent = JUKEBOX_MEMORIES[n];
        jbScreen.classList.remove("swap");
        jbCount++;
        jbCountEl.textContent = String(jbCount);
        haptic(8);
        if (jbCount >= 3) foundSecret("jukebox");
        if (jbCount >= 10) foundSecret("jukebox-deep");
        if (jbCount >= 25) foundSecret("jukebox-binge");
      }, 350);
    });

    /* Final candle */
    $("final-secret-cue")!.addEventListener("click", () => {
      showPolaroid("candle", "make a wish, tannie.", "candle");
      confettiBurst(60);
      setTimeout(() => $("wish-box")!.classList.add("show"), 800);
    });

    /* Wish */
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
      try { const saved = localStorage.getItem("tannie-wish"); if (saved) { wishInput.value = saved; wishSaved.classList.add("show"); } } catch {}
    }

    /* Distance — taps + double tap */
    let distClicks = 0;
    let lastDistTap = 0;
    const distNum = $("distance-num")!;
    const distCoda = $("distance-coda")!;
    distNum.addEventListener("click", () => {
      const now = Date.now();
      if (now - lastDistTap < 350) {
        distNum.classList.add("gold");
        distCoda.textContent = "even closer.";
        foundSecret("double-distance");
        rainHearts(12);
      }
      lastDistTap = now;
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

    /* Word swap */
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

    /* Long-press headline */
    const headline = $("ch1-headline");
    if (headline) {
      let hT: ReturnType<typeof setTimeout> | null = null;
      const s = () => { if (hT) clearTimeout(hT); hT = setTimeout(() => {
        haptic(40);
        headline.innerHTML = "Twenty-two looks <em>right</em> on you.<br>You grew this year. I saw.";
        showTip(`<span class="tk">truth unlocked</span>`, 2200);
        foundSecret("longpress-headline");
      }, 1500); };
      const e2 = () => { if (hT) { clearTimeout(hT); hT = null; } };
      headline.addEventListener("mousedown", s);
      headline.addEventListener("mouseup", e2);
      headline.addEventListener("mouseleave", e2);
      headline.addEventListener("touchstart", s, { passive: true });
      headline.addEventListener("touchend", e2);
    }

    /* Friendship counter tap */
    const fc = $("friendship-counter");
    if (fc) {
      let fcTaps = 0;
      fc.addEventListener("click", () => {
        fcTaps++;
        haptic(10);
        if (fcTaps >= 1) foundSecret("days-count");
        if (fcTaps >= 3) {
          rainHearts(15);
          showTip(`<span class="tk">every one of them</span> · counted`, 2200);
        }
      });
    }

    /* Dot sequence — forward and reverse */
    const dotSeq: number[] = [];
    [0,1,2,3,4,5].forEach((i) => {
      const d = $("pd" + i); if (!d) return;
      d.addEventListener("click", () => {
        dotSeq.push(i);
        d.classList.add("lit"); setTimeout(() => d.classList.remove("lit"), 400);
        haptic(8);
        if (dotSeq.length > 6) dotSeq.shift();
        const okFwd = dotSeq.length === 6 && dotSeq.every((v, idx) => v === idx);
        const okRev = dotSeq.length === 6 && dotSeq.every((v, idx) => v === 5 - idx);
        if (okFwd) { foundSecret("dot-sequence"); confettiBurst(40); }
        if (okRev) { foundSecret("dot-reverse"); confettiBurst(40); }
      });
    });

    /* Helpers */
    function rainHearts(n: number) {
      for (let i = 0; i < n; i++) {
        const h = document.createElement("div");
        h.className = "heart";
        h.textContent = ["♥","✦","♡","★"][Math.floor(Math.random()*4)];
        h.style.left = Math.random()*100 + "vw";
        h.style.fontSize = 14 + Math.random()*24 + "px";
        h.style.color = Math.random() > 0.5 ? "#ff8b6b" : "#f4c87a";
        const dur = 4 + Math.random()*5;
        h.style.animationDuration = dur + "s";
        h.style.animationDelay = Math.random()*2 + "s";
        document.body.appendChild(h);
        setTimeout(() => h.remove(), (dur+2)*1000);
      }
    }
    function burstHearts(n: number, x: number, y: number) {
      for (let i = 0; i < n; i++) {
        const h = document.createElement("div");
        h.className = "spark";
        h.style.left = x + "px"; h.style.top = y + "px";
        const ang = Math.random()*Math.PI*2;
        const dist = 30 + Math.random()*70;
        h.style.setProperty("--dx", Math.cos(ang)*dist + "px");
        h.style.setProperty("--dy", Math.sin(ang)*dist + "px");
        document.body.appendChild(h);
        setTimeout(() => h.remove(), 900);
      }
    }
    function confettiBurst(n: number) {
      const colors = ["#ff8b6b","#d65a4a","#f4c87a","#b48ad6","#66c7c2"];
      for (let i = 0; i < n; i++) {
        const c = document.createElement("div");
        c.className = "confetti";
        c.style.left = Math.random()*100 + "vw";
        c.style.background = colors[Math.floor(Math.random()*colors.length)];
        c.style.transform = `rotate(${Math.random()*360}deg)`;
        const dur = 3 + Math.random()*3;
        c.style.animationDuration = dur + "s";
        c.style.animationDelay = Math.random()*0.6 + "s";
        document.body.appendChild(c);
        setTimeout(() => c.remove(), (dur+1)*1000);
      }
    }

    function initObservers() {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); });
      }, { threshold: 0.15 });
      document.querySelectorAll(".ch1-eyebrow, .ch1-headline, .ch1-rule, .ch1-body").forEach((el) => obs.observe(el));
      document.querySelectorAll(".reveal-on-scroll").forEach((el) => obs.observe(el));
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
      const ch3 = $("ch3");
      if (ch3) {
        const ch3obs = new IntersectionObserver((entries) => {
          entries.forEach((e) => { if (e.isIntersecting && openedCount < totalFragments) { const l = $("final-locked"); if (l) l.classList.add("show"); } });
        }, { threshold: 0.3 });
        ch3obs.observe(ch3);
      }
    }
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <div id="tannie-host" />
    </>
  );
}
