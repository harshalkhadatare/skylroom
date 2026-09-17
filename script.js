/* =========================================================
   Drift — a live soundscape studio
   ---------------------------------------------------------
   Every sound you hear is generated from raw waveforms with
   the Web Audio API. There are no audio files anywhere in
   this project. Rain is filtered noise; fire and thunder are
   scheduled bursts; the drone and singing bowl are detuned
   oscillators; and so on.

   Optional cloud features (accounts + saved mixes) use
   Supabase and only switch on when you add keys in config.js.
   ========================================================= */

"use strict";

/* ---------------------------------------------------------
   1. CONFIG — channels, presets, themes
   --------------------------------------------------------- */

const ICONS = {
  rain: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7 16a4.5 4.5 0 0 1-.5-8.98A6 6 0 0 1 18 7.5 3.5 3.5 0 0 1 17.5 16"/><path d="M8 19l-1 2"/><path d="M12 19l-1 2"/><path d="M16 19l-1 2"/></svg>',
  waves: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8c2 0 2-1.5 4-1.5S8 8 10 8s2-1.5 4-1.5S16 8 18 8s2-1.5 4-1.5"/><path d="M2 13c2 0 2-1.5 4-1.5S8 13 10 13s2-1.5 4-1.5S16 13 18 13s2-1.5 4-1.5"/><path d="M2 18c2 0 2-1.5 4-1.5S8 18 10 18s2-1.5 4-1.5S16 18 18 18s2-1.5 4-1.5"/></svg>',
  wind: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10a3 3 0 1 0-3-3"/><path d="M3 12h15a3 3 0 1 1-3 3"/><path d="M3 16h8a2.5 2.5 0 1 1-2.5 2.5"/></svg>',
  fire: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3s4 3.5 4 8a4 4 0 0 1-8 0c0-1.2.4-2.2 1-3-.2 2 1 3 1 3s.5-3 2-8Z"/><path d="M12 21a5 5 0 0 0 5-5c0-1-.2-1.8-.5-2.5"/></svg>',
  forest: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 7 11h3l-4 6h12l-4-6h3Z"/><path d="M12 17v4"/></svg>',
  night: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 0 1 9.5 4 7 7 0 1 0 20 14.5Z"/><path d="M17 4.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4L14.5 6.5l1.4-.6Z"/></svg>',
  drone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3.2"/><path d="M6.5 6.5a8 8 0 0 0 0 11"/><path d="M17.5 6.5a8 8 0 0 1 0 11"/><path d="M3.5 3.5a12.5 12.5 0 0 0 0 17"/><path d="M20.5 3.5a12.5 12.5 0 0 1 0 17"/></svg>',
  thunder: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7 14a4.5 4.5 0 0 1-.5-8.98A6 6 0 0 1 18 5.5 3.5 3.5 0 0 1 17.8 14"/><path d="M13 12l-3 4h3l-1 4 4-5h-3l1-3Z"/></svg>',
  stream: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7c2 0 2 1.5 4 1.5S9 7 11 7s2 1.5 4 1.5S17 7 19 7"/><path d="M3 12c2 0 2 1.5 4 1.5S9 12 11 12s2 1.5 4 1.5S17 12 19 12"/><path d="M6 17.5c1.2 0 1.2 1 2.5 1s1.3-1 2.5-1 1.2 1 2.5 1 1.3-1 2.5-1"/></svg>',
  bowl: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10h18"/><path d="M4 10a8 8 0 0 0 16 0"/><path d="M12 4v3"/><path d="M10 5.5h4"/></svg>',
  chimes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16"/><path d="M8 4v10a2 2 0 1 0 4 0"/><path d="M12 4v12"/><path d="M16 4v8"/><circle cx="12" cy="18.5" r="1.4"/></svg>',
  static: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h2l1.5-5 3 12 3-16 3 12 1.5-3H21"/></svg>',
  volume: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9H4Z"/><path d="M17 8a5 5 0 0 1 0 8"/><path d="M19.5 5.5a9 9 0 0 1 0 13"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 10.5 15.4 6.5M8.6 13.5 15.4 17.5"/></svg>',
  save: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h11l3 3v13H5Z"/><path d="M8 4v5h7V4"/><rect x="8" y="13" width="8" height="4" rx="1"/></svg>',
  trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/></svg>',
  theme: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18Z" fill="currentColor" stroke="none"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8.5" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/></svg>',
  signout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M15 4h3a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3"/><path d="M10 8l-4 4 4 4"/><path d="M6 12h9"/></svg>',
  play: '<svg class="icon-play" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a1 1 0 0 0 1.54.84l10-6.5a1 1 0 0 0 0-1.68l-10-6.5A1 1 0 0 0 8 5.5Z"/></svg><svg class="icon-pause" viewBox="0 0 24 24" fill="currentColor" style="display:none"><rect x="6" y="5" width="4" height="14" rx="1.2"/><rect x="14" y="5" width="4" height="14" rx="1.2"/></svg>'
};

const CHANNELS = [
  { id: "rain",   name: "Rain",         desc: "Steady rainfall on a still afternoon.", max: 0.95, warm: false },
  { id: "waves",  name: "Waves",        desc: "Slow ocean swell rolling in and out.",  max: 0.9,  warm: false },
  { id: "wind",   name: "Wind",         desc: "Gusts moving through an open space.",    max: 0.6,  warm: false },
  { id: "fire",   name: "Fire",         desc: "A crackling hearth, embers popping.",    max: 0.85, warm: true  },
  { id: "forest", name: "Forest",       desc: "Leaves and the odd distant birdsong.",   max: 0.9,  warm: false },
  { id: "night",  name: "Crickets",     desc: "A summer night humming with insects.",   max: 0.55, warm: false },
  { id: "drone",  name: "Drone",        desc: "A warm, low harmonic pad underneath.",   max: 0.95, warm: true  },
  { id: "thunder",name: "Thunder",      desc: "Distant rolls of a passing storm.",      max: 0.95, warm: false },
  { id: "stream", name: "Stream",       desc: "A brook bubbling over smooth stones.",   max: 0.8,  warm: false },
  { id: "bowl",   name: "Singing bowl", desc: "A struck bowl ringing slowly out.",      max: 0.8,  warm: true  },
  { id: "chimes", name: "Wind chimes",  desc: "Soft pentatonic chimes on the breeze.",  max: 0.7,  warm: false },
  { id: "static", name: "Brown noise",  desc: "Deep, even noise that masks the world.", max: 0.55, warm: false }
];

const PRESETS = [
  { name: "Rainy window",   glyph: "🌧", mix: { rain: 70, drone: 24, wind: 12 } },
  { name: "Ocean calm",     glyph: "🌊", mix: { waves: 74, wind: 20, drone: 18 } },
  { name: "Campfire night", glyph: "🔥", mix: { fire: 64, night: 40, wind: 10, drone: 16 } },
  { name: "Deep focus",     glyph: "🎧", mix: { static: 52, drone: 30, rain: 22 } },
  { name: "Forest morning", glyph: "🌲", mix: { forest: 62, wind: 18, stream: 30 } },
  { name: "Distant storm",  glyph: "⛈", mix: { rain: 56, thunder: 48, wind: 40, drone: 22 } },
  { name: "Meditation",     glyph: "🧘", mix: { bowl: 60, drone: 34, wind: 12 } },
  { name: "Zen garden",     glyph: "🎐", mix: { stream: 58, chimes: 40, forest: 26 } },
  { name: "Starlit",        glyph: "✨", mix: { night: 56, drone: 32, chimes: 18 } }
];

const THEMES = [
  { id: "midnight", name: "Midnight", sw: "linear-gradient(120deg,#66e0c8,#9d8cff)" },
  { id: "ember",    name: "Ember",    sw: "linear-gradient(120deg,#ffb26b,#ff6f91)" },
  { id: "verdant",  name: "Verdant",  sw: "linear-gradient(120deg,#8ee6a8,#5fbf9f)" },
  { id: "ice",      name: "Ice",      sw: "linear-gradient(120deg,#a9c7ff,#c4d2e8)" },
  { id: "rose",     name: "Rosé",     sw: "linear-gradient(120deg,#ff9ecf,#b98cff)" },
  { id: "daybreak", name: "Daybreak", sw: "linear-gradient(120deg,#0fb39a,#6b57ff)" }
];

const DEFAULT_PRESET = "Rainy window";
const STORE_MIXES = "drift.mixes.v1";
const STORE_LAST  = "drift.last.v1";
const STORE_THEME = "drift.theme.v1";
const NUM_KEYS = 9; // channels 1..9 get keyboard shortcuts

/* Runtime state that isn't audio */
const state = { user: null, sb: null };

/* ---------------------------------------------------------
   2. AUDIO ENGINE
   --------------------------------------------------------- */

const engine = {
  ctx: null, master: null, comp: null, analyser: null, freqData: null,
  built: false, playing: false,
  masterLevel: 0.78,
  levels: {}, chan: {}, buffers: {}, schedTimer: null
};
CHANNELS.forEach(c => (engine.levels[c.id] = 0));

function makeNoiseBuffer(ctx, seconds, type) {
  const len = Math.floor(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  if (type === "white") {
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  } else if (type === "brown") {
    let last = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      last = (last + 0.02 * w) / 1.02;
      d[i] = last * 3.5;
    }
  } else { // pink (Paul Kellet)
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179;
      b1 = 0.99332 * b1 + w * 0.0750759;
      b2 = 0.96900 * b2 + w * 0.1538520;
      b3 = 0.86650 * b3 + w * 0.3104856;
      b4 = 0.55000 * b4 + w * 0.5329522;
      b5 = -0.7616 * b5 - w * 0.0168980;
      d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
      b6 = w * 0.115926;
    }
  }
  return buf;
}

function initAudio() {
  if (engine.ctx) return;
  const AC = window.AudioContext || window.webkitAudioContext;
  const ctx = new AC();
  engine.ctx = ctx;

  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -14; comp.knee.value = 24; comp.ratio.value = 3;
  comp.attack.value = 0.006; comp.release.value = 0.25;

  const master = ctx.createGain();
  master.gain.value = engine.masterLevel;

  const analyser = ctx.createAnalyser();
  analyser.fftSize = 512;
  analyser.smoothingTimeConstant = 0.82;

  master.connect(comp);
  comp.connect(analyser);
  analyser.connect(ctx.destination);

  engine.master = master; engine.comp = comp; engine.analyser = analyser;
  engine.freqData = new Uint8Array(analyser.frequencyBinCount);

  engine.buffers.white = makeNoiseBuffer(ctx, 2.2, "white");
  engine.buffers.brown = makeNoiseBuffer(ctx, 4.0, "brown");
  engine.buffers.pink  = makeNoiseBuffer(ctx, 4.0, "pink");

  buildChannels();
  engine.built = true;
}

/* node helpers */
function G(v)              { const g = engine.ctx.createGain(); g.gain.value = v; return g; }
function F(type, freq, q)  { const f = engine.ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; if (q != null) f.Q.value = q; return f; }
function O(type, freq)     { const o = engine.ctx.createOscillator(); o.type = type; o.frequency.value = freq; return o; }
function loop(buffer)      { const s = engine.ctx.createBufferSource(); s.buffer = buffer; s.loop = true; s.start(); return s; }
function LFO(freq, depth, param) { const o = O("sine", freq); const g = G(depth); o.connect(g); g.connect(param); o.start(); return o; }

function buildChannels() {
  const { white, brown, pink } = engine.buffers;
  const master = engine.master;

  // RAIN
  {
    const vol = G(0), body = G(0.72);
    const n = loop(white);
    n.connect(F("highpass", 520)).connect(F("bandpass", 1900, 0.5)).connect(body).connect(vol);
    LFO(0.5, 0.18, body.gain);
    loop(brown).connect(F("lowpass", 420)).connect(G(0.32)).connect(vol);
    vol.connect(master); engine.chan.rain = { vol };
  }
  // WAVES
  {
    const vol = G(0), lp = F("lowpass", 600), body = G(0.6);
    loop(brown).connect(lp).connect(body).connect(vol);
    LFO(0.07, 320, lp.frequency); LFO(0.07, 0.42, body.gain);
    vol.connect(master); engine.chan.waves = { vol };
  }
  // WIND
  {
    const vol = G(0), bp = F("bandpass", 600, 1.1), body = G(0.5);
    loop(pink).connect(bp).connect(body).connect(vol);
    LFO(0.12, 340, bp.frequency); LFO(0.09, 0.42, body.gain);
    vol.connect(master); engine.chan.wind = { vol };
  }
  // FIRE
  {
    const vol = G(0);
    loop(brown).connect(F("lowpass", 470)).connect(G(0.5)).connect(vol);
    const crackle = G(1); crackle.connect(vol);
    vol.connect(master); engine.chan.fire = { vol, crackle };
  }
  // FOREST
  {
    const vol = G(0);
    loop(white).connect(F("highpass", 3200)).connect(G(0.05)).connect(vol);
    loop(pink).connect(F("lowpass", 480)).connect(G(0.12)).connect(vol);
    const birds = G(1); birds.connect(vol);
    vol.connect(master); engine.chan.forest = { vol, birds };
  }
  // CRICKETS
  {
    const vol = G(0), sum = G(0.5);
    const o1 = O("sine", 4200); o1.connect(sum); o1.start();
    const o2 = O("sine", 4260); o2.connect(sum); o2.start();
    const trem = G(0.02);
    sum.connect(F("lowpass", 6200)).connect(trem).connect(vol);
    LFO(20, 0.09, trem.gain); LFO(0.2, 0.03, trem.gain);
    vol.connect(master); engine.chan.night = { vol };
  }
  // DRONE
  {
    const vol = G(0), mix = G(0.16), lp = F("lowpass", 640);
    [55, 82.41, 110, 164.81].forEach((f, i) => {
      const o = O("sine", f); o.detune.value = (i % 2 ? 6 : -6);
      o.connect(G(0.5)).connect(mix); o.start();
      const t = O("triangle", f * 2); t.detune.value = 4;
      t.connect(G(0.05)).connect(mix); t.start();
    });
    mix.connect(lp).connect(vol);
    LFO(0.05, 220, lp.frequency);
    vol.connect(master); engine.chan.drone = { vol };
  }
  // THUNDER — faint bed + scheduled booms
  {
    const vol = G(0);
    loop(brown).connect(F("lowpass", 180)).connect(G(0.12)).connect(vol);
    const hits = G(1); hits.connect(vol);
    vol.connect(master); engine.chan.thunder = { vol, hits };
  }
  // STREAM — bright water + low burble + warbling bandpass "bubbles"
  {
    const vol = G(0);
    loop(white).connect(F("highpass", 900)).connect(F("lowpass", 6500)).connect(G(0.09)).connect(vol);
    loop(brown).connect(F("lowpass", 900)).connect(G(0.18)).connect(vol);
    [820, 1400, 2200].forEach((fr, i) => {
      const bp = F("bandpass", fr, 3.4);
      const bg = G(0.05);
      loop(white).connect(bp).connect(bg).connect(vol);
      LFO(0.25 + i * 0.15, fr * 0.28, bp.frequency);
      LFO(3 + i, 0.03, bg.gain);
    });
    vol.connect(master); engine.chan.stream = { vol };
  }
  // SINGING BOWL — scheduled strikes only
  {
    const vol = G(0);
    const hits = G(1); hits.connect(vol);
    vol.connect(master); engine.chan.bowl = { vol, hits };
  }
  // WIND CHIMES — scheduled clusters only
  {
    const vol = G(0);
    const hits = G(1); hits.connect(vol);
    vol.connect(master); engine.chan.chimes = { vol, hits };
  }
  // BROWN NOISE
  {
    const vol = G(0);
    loop(brown).connect(F("lowpass", 1600)).connect(vol);
    vol.connect(master); engine.chan.static = { vol };
  }
}

function setLevel(id, frac) {
  engine.levels[id] = frac;
  const ch = engine.chan[id];
  const meta = CHANNELS.find(c => c.id === id);
  if (ch && engine.ctx) {
    ch.vol.gain.setTargetAtTime(frac * meta.max, engine.ctx.currentTime, 0.08);
  }
}
function setMaster(frac) {
  engine.masterLevel = frac;
  if (engine.master && engine.ctx) engine.master.gain.setTargetAtTime(frac, engine.ctx.currentTime, 0.05);
}

/* Scheduled voices ------------------------------------------------ */
function crackle(when) {
  const ctx = engine.ctx;
  const s = ctx.createBufferSource(); s.buffer = engine.buffers.white;
  const bp = F("bandpass", 1200 + Math.random() * 2800, 7);
  const g = G(0);
  s.connect(bp).connect(g).connect(engine.chan.fire.crackle);
  const amp = 0.25 + Math.random() * 0.5, dur = 0.03 + Math.random() * 0.06;
  g.gain.setValueAtTime(0, when);
  g.gain.linearRampToValueAtTime(amp, when + 0.002);
  g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
  s.start(when, Math.random() * 1.8, dur + 0.05);
  s.stop(when + dur + 0.08);
}
function chirp(when) {
  const o = O("sine", 0), g = G(0);
  o.connect(g).connect(engine.chan.forest.birds);
  const base = 1800 + Math.random() * 1500, dur = 0.10 + Math.random() * 0.12;
  o.frequency.setValueAtTime(base, when);
  o.frequency.linearRampToValueAtTime(base * 1.28, when + dur * 0.4);
  o.frequency.linearRampToValueAtTime(base * 0.92, when + dur);
  g.gain.setValueAtTime(0, when);
  g.gain.linearRampToValueAtTime(0.15, when + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
  o.start(when); o.stop(when + dur + 0.05);
}
function thunderBoom(when) {
  const target = engine.chan.thunder.hits;
  const s = engine.ctx.createBufferSource(); s.buffer = engine.buffers.brown;
  const lp = F("lowpass", 260 + Math.random() * 220);
  const g = G(0);
  s.connect(lp).connect(g).connect(target);
  const dur = 1.8 + Math.random() * 2.6;
  g.gain.setValueAtTime(0, when);
  g.gain.linearRampToValueAtTime(0.3 + Math.random() * 0.3, when + 0.25 + Math.random() * 0.5);
  g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
  s.start(when, Math.random() * 2, dur + 0.15); s.stop(when + dur + 0.15);
  const o = O("sine", 70), og = G(0);
  o.connect(og).connect(target);
  o.frequency.setValueAtTime(72, when);
  o.frequency.exponentialRampToValueAtTime(32, when + dur * 0.85);
  og.gain.setValueAtTime(0, when);
  og.gain.linearRampToValueAtTime(0.28, when + 0.18);
  og.gain.exponentialRampToValueAtTime(0.0001, when + dur);
  o.start(when); o.stop(when + dur + 0.15);
}
function bowlStrike(when) {
  const target = engine.chan.bowl.hits;
  const base = (Math.random() < 0.5 ? 320 : 288) * (Math.random() < 0.3 ? 1.5 : 1);
  const partials = [1, 2.76, 5.40, 8.93], amps = [0.5, 0.26, 0.14, 0.07];
  const dur = 4 + Math.random() * 3;
  partials.forEach((p, i) => {
    const o = O("sine", base * p), g = G(0);
    o.detune.value = Math.random() * 8 - 4;
    o.connect(g).connect(target);
    g.gain.setValueAtTime(0, when);
    g.gain.linearRampToValueAtTime(amps[i] * 0.5, when + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, when + dur * (1 - i * 0.12));
    o.start(when); o.stop(when + dur + 0.1);
  });
}
const CHIME_SCALE = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];
function chimeCluster(when) {
  const target = engine.chan.chimes.hits;
  const n = 2 + Math.floor(Math.random() * 4);
  for (let i = 0; i < n; i++) {
    const f = CHIME_SCALE[Math.floor(Math.random() * CHIME_SCALE.length)];
    const t = when + i * (0.06 + Math.random() * 0.13);
    const o = O("triangle", f), o2 = O("sine", f * 2.01), g = G(0);
    o.connect(g); o2.connect(G(0.3)).connect(g); g.connect(target);
    const dur = 1.4 + Math.random() * 1.6;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.12, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.start(t); o.stop(t + dur + 0.05);
    o2.start(t); o2.stop(t + dur + 0.05);
  }
}

function scheduler() {
  if (engine.playing && engine.ctx) {
    const now = engine.ctx.currentTime;
    const fl = engine.levels.fire;
    if (fl > 0) {
      let expected = (4 + fl * 55) * 0.1;
      while (expected > 0) {
        if (expected >= 1 || Math.random() < expected) crackle(now + Math.random() * 0.1);
        expected -= 1;
      }
    }
    const bl = engine.levels.forest;
    if (bl > 0 && Math.random() < 0.03 + bl * 0.14) {
      chirp(now + Math.random() * 0.1);
      if (Math.random() < 0.4) chirp(now + 0.16 + Math.random() * 0.1);
    }
    const tl = engine.levels.thunder;
    if (tl > 0 && Math.random() < tl * 0.010) thunderBoom(now + Math.random() * 0.1);
    const swl = engine.levels.bowl;
    if (swl > 0 && Math.random() < swl * 0.016) bowlStrike(now + Math.random() * 0.1);
    const cl = engine.levels.chimes;
    if (cl > 0 && Math.random() < 0.015 + cl * 0.055) chimeCluster(now + Math.random() * 0.1);
  }
  engine.schedTimer = setTimeout(scheduler, 100);
}

async function play() {
  const firstBuild = !engine.built;
  initAudio();
  try { await engine.ctx.resume(); } catch (e) { /* ignore */ }

  if (firstBuild) {
    setMaster(engine.masterLevel);
    CHANNELS.forEach(c => setLevel(c.id, engine.levels[c.id]));
  }

  const anyOn = CHANNELS.some(c => engine.levels[c.id] > 0.001);
  if (!anyOn) applyPreset(PRESETS.find(p => p.name === DEFAULT_PRESET), true);

  engine.playing = true;
  document.body.classList.add("playing");
  ui.playState.textContent = "Playing";
  if (!engine.schedTimer) scheduler();
  startSessionClock();
}
function pause() {
  engine.playing = false;
  document.body.classList.remove("playing");
  ui.playState.textContent = "Paused";
  if (engine.ctx) engine.ctx.suspend();
  stopSessionClock();
}
function togglePlay() { engine.playing ? pause() : play(); }

/* ---------------------------------------------------------
   3. UI — presets, channels, master
   --------------------------------------------------------- */
const ui = {};
function qs(sel) { return document.querySelector(sel); }

function renderPresets() {
  PRESETS.forEach(p => {
    const b = document.createElement("button");
    b.className = "chip"; b.type = "button";
    b.innerHTML = `<span class="chip-glyph">${p.glyph}</span>${escapeHtml(p.name)}`;
    b.dataset.preset = p.name;
    b.addEventListener("click", () => { applyPreset(p, false); if (!engine.playing) play(); });
    ui.presetRow.appendChild(b);
  });
}

function renderChannels() {
  CHANNELS.forEach((c, i) => {
    const card = document.createElement("article");
    card.className = "ch";
    card.dataset.id = c.id;
    card.dataset.warm = c.warm ? "1" : "0";
    card.innerHTML = `
      <div class="ch-top">
        <span class="ch-icon">${ICONS[c.id]}</span>
        <span class="ch-val" aria-hidden="true">0</span>
      </div>
      <h3 class="ch-name">${escapeHtml(c.name)}</h3>
      <p class="ch-desc">${escapeHtml(c.desc)}</p>
      <input type="range" class="ch-slider" min="0" max="100" value="0"
             aria-label="${escapeHtml(c.name)} volume" style="--fill:0%">
    `;
    const slider = card.querySelector(".ch-slider");
    const val = card.querySelector(".ch-val");
    slider.addEventListener("input", () => {
      const v = +slider.value;
      applyChannel(c.id, v, { fromUser: true });
      clearActivePreset();
      if (v > 0 && !engine.playing) play();
    });
    ui.mixer.appendChild(card);
    ui.cards = ui.cards || {};
    ui.cards[c.id] = { card, slider, val };
  });
}

function applyChannel(id, v, opts = {}) {
  const frac = v / 100;
  setLevel(id, frac);
  const ref = ui.cards[id];
  ref.slider.value = v;
  ref.slider.style.setProperty("--fill", v + "%");
  ref.val.textContent = v;
  ref.card.classList.toggle("on", v > 0);
  if (!opts.silent) saveLast();
}

function applyPreset(preset, silent) {
  if (!preset) return;
  CHANNELS.forEach(c => applyChannel(c.id, preset.mix[c.id] || 0, { silent: true }));
  setActivePreset(preset.name);
  if (!silent) { saveLast(); toast(`${preset.name} loaded`); }
}
function setActivePreset(name) {
  ui.presetRow.querySelectorAll(".chip").forEach(chip => chip.classList.toggle("active", chip.dataset.preset === name));
}
function clearActivePreset() {
  ui.presetRow.querySelectorAll(".chip.active").forEach(c => c.classList.remove("active"));
}

function bindMaster() {
  const s = ui.masterSlider;
  const update = () => {
    const v = +s.value;
    setMaster(v / 100);
    s.style.setProperty("--fill", v + "%");
    ui.masterPct.textContent = v + "%";
    saveLast();
  };
  s.addEventListener("input", update);
  s.value = Math.round(engine.masterLevel * 100);
  update();
}

/* ---- Session clock ---- */
let sessionSecs = 0, sessionTimer = null;
function fmt(total) {
  const h = Math.floor(total / 3600), m = Math.floor((total % 3600) / 60), s = total % 60;
  const mm = String(m).padStart(2, "0"), ss = String(s).padStart(2, "0");
  return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
}
function startSessionClock() {
  if (sessionTimer) return;
  sessionTimer = setInterval(() => { sessionSecs++; ui.sessionTime.textContent = fmt(sessionSecs); }, 1000);
}
function stopSessionClock() { clearInterval(sessionTimer); sessionTimer = null; }

/* ---- Focus timer ---- */
const focus = { total: 0, remaining: 0, timer: null, running: false };
function bindFocusTimer() {
  ui.focusPresets.forEach(btn => {
    btn.addEventListener("click", () => {
      const mins = +btn.dataset.min;
      focus.total = focus.remaining = mins * 60;
      renderFocus();
      ui.focusPresets.forEach(b => b.classList.toggle("active", b === btn));
      ui.focusStart.disabled = false;
    });
  });
  ui.focusStart.addEventListener("click", toggleFocus);
  renderFocus();
}
function renderFocus() {
  ui.focusDisplay.textContent = (focus.remaining > 0 || focus.total > 0) ? fmt(focus.remaining) : "00:00";
  ui.focusDisplay.classList.toggle("idle", !focus.running);
  ui.focusStart.textContent = focus.running ? "Stop" : "Start";
  ui.focusStart.classList.toggle("primary", !focus.running && focus.remaining > 0);
}
function toggleFocus() {
  if (focus.running) { stopFocus(); return; }
  if (focus.remaining <= 0) return;
  if (!engine.playing) play();
  focus.running = true; renderFocus();
  focus.timer = setInterval(() => {
    focus.remaining--;
    if (focus.remaining <= 0) completeFocus();
    renderFocus();
  }, 1000);
}
function stopFocus() {
  focus.running = false; clearInterval(focus.timer); focus.timer = null;
  focus.remaining = focus.total; renderFocus();
}
function completeFocus() {
  clearInterval(focus.timer); focus.timer = null; focus.running = false; focus.remaining = 0;
  playChime(); toast("Focus session complete");
}
function playChime() {
  if (!engine.ctx) return;
  const now = engine.ctx.currentTime;
  [528, 792, 1056].forEach((f, i) => {
    const o = O("sine", f), g = G(0);
    o.connect(g).connect(engine.master);
    const t = now + i * 0.18;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.22, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
    o.start(t); o.stop(t + 1.5);
  });
}

/* ---------------------------------------------------------
   4. THEMES
   --------------------------------------------------------- */
function renderThemeMenu() {
  const menu = ui.themeMenu;
  menu.innerHTML = "";
  THEMES.forEach(t => {
    const b = document.createElement("button");
    b.className = "theme-opt"; b.type = "button"; b.role = "menuitem";
    b.dataset.theme = t.id;
    b.innerHTML = `<span class="sw" style="background:${t.sw}"></span>${t.name}`;
    b.addEventListener("click", () => { applyTheme(t.id); closeMenus(); });
    menu.appendChild(b);
  });
}
function applyTheme(id) {
  document.documentElement.setAttribute("data-theme", id);
  writeStore(STORE_THEME, id);
  ui.themeMenu.querySelectorAll(".theme-opt").forEach(o => o.classList.toggle("active", o.dataset.theme === id));
  const meta = qs('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", getComputedStyle(document.documentElement).getPropertyValue("--ink").trim() || "#070b16");
  refreshVizColors();
}
function toggleThemeMenu() {
  const open = !ui.themeMenu.hasAttribute("hidden") ? true : false;
  closeMenus();
  if (!open) {
    ui.themeMenu.removeAttribute("hidden");
    ui.themeBtn.setAttribute("aria-expanded", "true");
  }
}

/* ---------------------------------------------------------
   5. SAVED MIXES — local (device) or cloud (Supabase)
   --------------------------------------------------------- */
function loadStore(key, fallback) {
  try { const v = JSON.parse(localStorage.getItem(key)); return v == null ? fallback : v; }
  catch (e) { return fallback; }
}
function writeStore(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* private mode */ }
}
function currentMix() {
  const c = {};
  CHANNELS.forEach(ch => (c[ch.id] = Math.round(engine.levels[ch.id] * 100)));
  return { master: Math.round(engine.masterLevel * 100), c };
}
function saveLast() { writeStore(STORE_LAST, currentMix()); }
function getLocalMixes() { return loadStore(STORE_MIXES, []); }

function updateScopeTag() {
  ui.savedScope.textContent = state.user ? "in your account" : "on this device";
}

async function renderSaved() {
  const list = ui.savedList;
  updateScopeTag();
  list.innerHTML = `<p class="empty">Loading…</p>`;

  let mixes = [];
  if (state.user && state.sb) {
    try {
      const { data, error } = await state.sb
        .from("mixes").select("id,name,master,channels")
        .order("created_at", { ascending: false });
      if (error) throw error;
      mixes = (data || []).map(r => ({ id: r.id, name: r.name, master: r.master, c: r.channels || {}, cloud: true }));
    } catch (e) {
      list.innerHTML = `<p class="empty">Couldn't reach your saved mixes. ${escapeHtml(e.message || "")}</p>`;
      return;
    }
  } else {
    mixes = getLocalMixes().map((m, idx) => ({ idx, name: m.name, master: m.master, c: m.c, cloud: false }));
  }

  list.innerHTML = "";
  if (!mixes.length) {
    list.innerHTML = `<p class="empty">No saved mixes yet. Build a blend you like, then press <b>Save mix</b> to keep it ${state.user ? "in your account" : "here"}.</p>`;
    return;
  }
  mixes.forEach(m => {
    const item = document.createElement("div");
    item.className = "saved-item";
    item.innerHTML = `
      <button class="load" type="button"><span class="swatch"></span>${escapeHtml(m.name)}</button>
      <button class="del" type="button" aria-label="Delete ${escapeHtml(m.name)}">${ICONS.trash}</button>
    `;
    item.querySelector(".load").addEventListener("click", () => { loadMix(m); if (!engine.playing) play(); });
    item.querySelector(".del").addEventListener("click", () => deleteMix(m));
    list.appendChild(item);
  });
}

function loadMix(m, silent) {
  clearActivePreset();
  const mv = m.master ?? 78;
  setMaster(mv / 100);
  ui.masterSlider.value = mv;
  ui.masterSlider.style.setProperty("--fill", mv + "%");
  ui.masterPct.textContent = mv + "%";
  CHANNELS.forEach(c => applyChannel(c.id, (m.c && m.c[c.id]) || 0, { silent: true }));
  saveLast();
  if (!silent && m.name) toast(`${m.name} loaded`);
}

async function saveCurrentMix() {
  const anyOn = CHANNELS.some(c => engine.levels[c.id] > 0.001);
  if (!anyOn) { toast("Add a sound before saving"); return; }
  const name = (prompt("Name this mix", suggestName()) || "").trim();
  if (!name) return;
  const mix = currentMix();

  if (state.user && state.sb) {
    try {
      const { error } = await state.sb.from("mixes").insert({
        user_id: state.user.id, name: name.slice(0, 60), master: mix.master, channels: mix.c
      });
      if (error) throw error;
      toast("Mix saved to your account");
      renderSaved();
    } catch (e) { toast("Save failed: " + (e.message || "error")); }
  } else {
    const arr = getLocalMixes();
    arr.unshift(Object.assign({ name: name.slice(0, 60) }, mix));
    writeStore(STORE_MIXES, arr.slice(0, 24));
    toast("Mix saved on this device");
    renderSaved();
  }
}

async function deleteMix(m) {
  if (m.cloud && state.sb) {
    try {
      const { error } = await state.sb.from("mixes").delete().eq("id", m.id);
      if (error) throw error;
      toast("Mix deleted"); renderSaved();
    } catch (e) { toast("Delete failed: " + (e.message || "error")); }
  } else {
    const arr = getLocalMixes(); arr.splice(m.idx, 1);
    writeStore(STORE_MIXES, arr); toast("Mix deleted"); renderSaved();
  }
}

function suggestName() {
  const on = CHANNELS.filter(c => engine.levels[c.id] > 0.1).sort((a, b) => engine.levels[b.id] - engine.levels[a.id]);
  if (!on.length) return "My mix";
  return on.slice(0, 2).map(c => c.name).join(" + ");
}

/* ---------------------------------------------------------
   6. SHARE VIA URL HASH
   --------------------------------------------------------- */
function encodeState() {
  const o = currentMix();
  const arr = [o.master].concat(CHANNELS.map(c => o.c[c.id]));
  return btoa(arr.join(".")).replace(/=+$/, "");
}
function decodeState(str) {
  try {
    const arr = atob(str).split(".").map(Number);
    if (arr.length !== CHANNELS.length + 1) return null;
    const out = { master: arr[0], c: {} };
    CHANNELS.forEach((c, i) => (out.c[c.id] = arr[i + 1]));
    return out;
  } catch (e) { return null; }
}
async function share() {
  const url = location.origin + location.pathname + "#m=" + encodeState();
  try { await navigator.clipboard.writeText(url); toast("Link copied to clipboard"); }
  catch (e) {
    const ta = document.createElement("textarea");
    ta.value = url; document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); toast("Link copied to clipboard"); }
    catch (_) { toast("Copy this link: " + url); }
    ta.remove();
  }
}
function readHash() {
  const match = location.hash.match(/m=([A-Za-z0-9+/]+)/);
  if (!match) return false;
  const stt = decodeState(match[1]);
  if (!stt) return false;
  loadMix({ master: stt.master, c: stt.c }, true);
  return true;
}

/* ---------------------------------------------------------
   7. TOAST + escaping
   --------------------------------------------------------- */
let toastTimer = null;
function toast(msg) {
  ui.toast.innerHTML = `<span class="dot"></span>${escapeHtml(msg)}`;
  ui.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => ui.toast.classList.remove("show"), 2800);
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, ch =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}

/* ---------------------------------------------------------
   8. VISUALIZER — reactive night sky (theme-aware)
   --------------------------------------------------------- */
const viz = { canvas: null, ctx: null, w: 0, h: 0, dpr: 1, energy: 0.06, t: 0, stars: [], raf: null, colors: null };

function parseTriplet(str) {
  const p = str.split(",").map(n => parseFloat(n.trim()));
  return (p.length === 3 && p.every(n => !isNaN(n))) ? p : null;
}
function refreshVizColors() {
  const cs = getComputedStyle(document.documentElement);
  viz.colors = {
    a: parseTriplet(cs.getPropertyValue("--viz-a")) || [102, 224, 200],
    b: parseTriplet(cs.getPropertyValue("--viz-b")) || [157, 140, 255],
    c: parseTriplet(cs.getPropertyValue("--viz-c")) || [120, 200, 255],
    star: parseTriplet(cs.getPropertyValue("--star")) || [233, 237, 247],
    light: parseFloat(cs.getPropertyValue("--viz-light")) === 1
  };
}
function initViz() {
  viz.canvas = ui.viz; viz.ctx = viz.canvas.getContext("2d");
  refreshVizColors();
  resizeViz();
  window.addEventListener("resize", resizeViz);
  seedStars();
  loopViz();
}
function resizeViz() {
  viz.dpr = Math.min(window.devicePixelRatio || 1, 2);
  viz.w = window.innerWidth; viz.h = window.innerHeight;
  viz.canvas.width = viz.w * viz.dpr; viz.canvas.height = viz.h * viz.dpr;
  viz.canvas.style.width = viz.w + "px"; viz.canvas.style.height = viz.h + "px";
  viz.ctx.setTransform(viz.dpr, 0, 0, viz.dpr, 0, 0);
  seedStars();
}
function seedStars() {
  viz.stars = [];
  const count = Math.round((viz.w * viz.h) / 14000);
  for (let i = 0; i < count; i++) {
    viz.stars.push({
      x: Math.random() * viz.w, y: Math.random() * viz.h,
      r: Math.random() * 1.3 + 0.3, tw: Math.random() * Math.PI * 2,
      sp: 0.4 + Math.random() * 0.9, drift: 0.1 + Math.random() * 0.25
    });
  }
}
function currentEnergy() {
  if (!engine.analyser || !engine.playing) return 0;
  engine.analyser.getByteFrequencyData(engine.freqData);
  let sum = 0; const n = engine.freqData.length;
  for (let i = 0; i < n; i++) sum += engine.freqData[i];
  return (sum / n) / 255;
}
function loopViz() {
  const c = viz.ctx, col = viz.colors;
  viz.t += 0.006;
  const target = Math.max(0.05, currentEnergy());
  viz.energy += (target - viz.energy) * 0.06;
  const e = viz.energy;
  const light = col.light;

  c.clearRect(0, 0, viz.w, viz.h);

  // Stars (or soft motes on light themes)
  for (const s of viz.stars) {
    s.tw += 0.02 * s.sp;
    s.y -= s.drift * (0.4 + e);
    if (s.y < -2) { s.y = viz.h + 2; s.x = Math.random() * viz.w; }
    const baseA = light ? 0.10 : 0.30;
    const a = baseA + Math.abs(Math.sin(s.tw)) * (0.35 + e * 0.5) * (light ? 0.5 : 1);
    c.beginPath();
    c.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    c.fillStyle = `rgba(${col.star[0]},${col.star[1]},${col.star[2]},${a.toFixed(3)})`;
    c.fill();
  }

  // Aurora ribbons
  c.globalCompositeOperation = light ? "source-over" : "lighter";
  const ribbons = [
    { base: 0.42, amp: 60, hue: col.a, phase: 0,   speed: 1.0 },
    { base: 0.55, amp: 82, hue: col.b, phase: 2.1, speed: 0.7 },
    { base: 0.68, amp: 54, hue: col.c, phase: 4.2, speed: 1.3 }
  ];
  for (const r of ribbons) {
    const yBase = viz.h * r.base;
    const amp = r.amp * (0.35 + e * 1.5);
    c.beginPath();
    c.moveTo(0, viz.h);
    for (let x = 0; x <= viz.w; x += 26) {
      const y = yBase
        + Math.sin(x * 0.0032 + viz.t * r.speed + r.phase) * amp
        + Math.sin(x * 0.0071 - viz.t * r.speed * 0.6 + r.phase) * amp * 0.4;
      c.lineTo(x, y);
    }
    c.lineTo(viz.w, viz.h); c.closePath();
    const grad = c.createLinearGradient(0, yBase - amp, 0, viz.h);
    const alpha = (light ? 0.04 : 0.05) + e * (light ? 0.10 : 0.14);
    grad.addColorStop(0, `rgba(${r.hue[0]},${r.hue[1]},${r.hue[2]},${alpha.toFixed(3)})`);
    grad.addColorStop(1, `rgba(${r.hue[0]},${r.hue[1]},${r.hue[2]},0)`);
    c.fillStyle = grad; c.fill();
  }
  c.globalCompositeOperation = "source-over";
  viz.raf = requestAnimationFrame(loopViz);
}

/* ---------------------------------------------------------
   9. AUTH (Supabase) — optional
   --------------------------------------------------------- */
let authMode = "signin"; // or "signup"

function authAvailable() {
  return !!(window.DRIFT_CONFIG && window.DRIFT_CONFIG.supabaseReady && window.supabase);
}

function initAuth() {
  if (!authAvailable()) {
    // Feature off — button becomes a friendly hint.
    ui.accountBtn.addEventListener("click", () =>
      toast("Add your Supabase keys in config.js to turn on accounts (see README)."));
    return;
  }
  const cfg = window.DRIFT_CONFIG;
  state.sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);

  ui.accountBtn.addEventListener("click", () => {
    if (state.user) openAccountMenu();
    else openAuth();
  });
  ui.authClose.addEventListener("click", closeAuth);
  ui.authOverlay.addEventListener("click", ev => { if (ev.target === ui.authOverlay) closeAuth(); });
  ui.googleBtn.addEventListener("click", signInWithGoogle);
  ui.authForm.addEventListener("submit", onAuthSubmit);
  ui.authToggleBtn.addEventListener("click", toggleAuthMode);

  state.sb.auth.getSession().then(({ data }) => setUser(data.session ? data.session.user : null));
  state.sb.auth.onAuthStateChange((_evt, session) => setUser(session ? session.user : null));
}

function setUser(user) {
  const was = state.user ? state.user.id : null;
  state.user = user;
  const label = user ? (displayNameOf(user)) : "Sign in";
  ui.accountLabel.textContent = label;
  ui.accountBtn.classList.toggle("signed-in", !!user);
  if (user) closeAuth();
  if ((user ? user.id : null) !== was) renderSaved();
}
function displayNameOf(user) {
  const dn = user.user_metadata && (user.user_metadata.display_name || user.user_metadata.name);
  if (dn) return String(dn).split(" ")[0];
  return (user.email || "Account").split("@")[0];
}

function openAuth() {
  ui.authError.textContent = "";
  ui.authOverlay.removeAttribute("hidden");
  setTimeout(() => ui.authEmail.focus(), 40);
}
function closeAuth() { ui.authOverlay.setAttribute("hidden", ""); }
function toggleAuthMode() {
  authMode = authMode === "signin" ? "signup" : "signin";
  const signup = authMode === "signup";
  ui.authTitle.textContent = signup ? "Create your account" : "Welcome to Drift";
  ui.authSubmit.textContent = signup ? "Create account" : "Sign in";
  ui.authToggleText.textContent = signup ? "Already have an account?" : "New here?";
  ui.authToggleBtn.textContent = signup ? "Sign in instead" : "Create an account";
  ui.nameField.hidden = !signup;
  ui.authError.textContent = "";
}
async function onAuthSubmit(ev) {
  ev.preventDefault();
  const email = ui.authEmail.value.trim();
  const password = ui.authPass.value;
  if (!email || password.length < 6) { ui.authError.textContent = "Enter an email and a password of at least 6 characters."; return; }
  ui.authSubmit.disabled = true; ui.authError.textContent = "";
  try {
    if (authMode === "signup") {
      const display_name = ui.authName.value.trim();
      const { data, error } = await state.sb.auth.signUp({
        email, password, options: { data: { display_name } }
      });
      if (error) throw error;
      if (!data.session) toast("Check your email to confirm your account.");
      else toast("Account created — welcome!");
    } else {
      const { error } = await state.sb.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast("Signed in");
    }
  } catch (e) {
    ui.authError.textContent = e.message || "Something went wrong.";
  } finally {
    ui.authSubmit.disabled = false;
  }
}
async function signInWithGoogle() {
  try {
    const { error } = await state.sb.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: location.origin + location.pathname }
    });
    if (error) throw error;
  } catch (e) { ui.authError.textContent = e.message || "Google sign-in failed."; }
}
async function signOut() {
  closeMenus();
  try { await state.sb.auth.signOut(); toast("Signed out"); }
  catch (e) { toast("Sign-out failed"); }
}

/* Account dropdown (built on demand) */
function openAccountMenu() {
  closeMenus();
  const menu = document.createElement("div");
  menu.className = "acct-menu"; menu.id = "acctMenu";
  menu.innerHTML = `
    <div class="acct-email">${escapeHtml(state.user.email || displayNameOf(state.user))}</div>
    <button class="acct-signout" type="button">${ICONS.signout}<span>Sign out</span></button>
  `;
  document.body.appendChild(menu);
  const r = ui.accountBtn.getBoundingClientRect();
  menu.style.top = (r.bottom + 8) + "px";
  menu.style.right = Math.max(8, window.innerWidth - r.right) + "px";
  menu.querySelector(".acct-signout").addEventListener("click", signOut);
}
function closeMenus() {
  ui.themeMenu.setAttribute("hidden", "");
  ui.themeBtn.setAttribute("aria-expanded", "false");
  const am = qs("#acctMenu"); if (am) am.remove();
}

/* ---------------------------------------------------------
   10. ADS (Google AdSense) — optional
   --------------------------------------------------------- */
function initAds() {
  const cfg = window.DRIFT_CONFIG;
  if (!cfg || !cfg.adsReady) return;
  // Load the AdSense library once, only when a real publisher id is set.
  const s = document.createElement("script");
  s.async = true;
  s.crossOrigin = "anonymous";
  s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + encodeURIComponent(cfg.ADSENSE_CLIENT);
  document.head.appendChild(s);

  const ins = document.createElement("ins");
  ins.className = "adsbygoogle";
  ins.style.display = "block";
  ins.setAttribute("data-ad-client", cfg.ADSENSE_CLIENT);
  ins.setAttribute("data-ad-slot", cfg.ADSENSE_SLOT);
  ins.setAttribute("data-ad-format", "auto");
  ins.setAttribute("data-full-width-responsive", "true");
  ui.adSlot.appendChild(ins);
  ui.adSlot.removeAttribute("hidden");
  try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) { /* ignore */ }
}

/* ---------------------------------------------------------
   11. KEYBOARD
   --------------------------------------------------------- */
function bindKeyboard() {
  document.addEventListener("keydown", (ev) => {
    const tag = (ev.target.tagName || "").toLowerCase();
    const typing = (tag === "input" && ev.target.type !== "range") || tag === "textarea";
    if (typing) return;
    if (!ui.authOverlay.hasAttribute("hidden") && ev.key !== "Escape") return;

    if (ev.key === "Escape") { closeMenus(); closeAuth(); return; }
    if (ev.code === "Space") { ev.preventDefault(); togglePlay(); }
    else if (/^Digit[1-9]$/.test(ev.code)) {
      const idx = +ev.code.slice(5) - 1;
      const c = CHANNELS[idx];
      if (!c || idx >= NUM_KEYS) return;
      const cur = Math.round(engine.levels[c.id] * 100);
      applyChannel(c.id, cur > 0 ? 0 : 60, { fromUser: true });
      clearActivePreset();
      if (cur === 0 && !engine.playing) play();
    } else if (ev.key.toLowerCase() === "s") {
      saveCurrentMix();
    }
  });
}

/* ---------------------------------------------------------
   12. INIT
   --------------------------------------------------------- */
function cacheDom() {
  ui.viz = qs("#viz");
  ui.playBtn = qs("#playBtn");
  ui.playState = qs("#playState");
  ui.sessionTime = qs("#sessionTime");
  ui.presetRow = qs("#presetRow");
  ui.mixer = qs("#mixer");
  ui.masterSlider = qs("#masterSlider");
  ui.masterPct = qs("#masterPct");
  ui.savedList = qs("#savedList");
  ui.savedScope = qs("#savedScope");
  ui.saveBtn = qs("#saveBtn");
  ui.shareBtn = qs("#shareBtn");
  ui.toast = qs("#toast");
  ui.focusDisplay = qs("#focusDisplay");
  ui.focusStart = qs("#focusStart");
  ui.focusPresets = Array.from(document.querySelectorAll(".focus-min"));
  ui.themeBtn = qs("#themeBtn");
  ui.themeMenu = qs("#themeMenu");
  ui.accountBtn = qs("#accountBtn");
  ui.accountLabel = qs("#accountLabel");
  ui.adSlot = qs("#adSlot");
  // Auth modal
  ui.authOverlay = qs("#authOverlay");
  ui.authClose = qs("#authClose");
  ui.authTitle = qs("#authTitle");
  ui.authForm = qs("#authForm");
  ui.authEmail = qs("#authEmail");
  ui.authPass = qs("#authPass");
  ui.authName = qs("#authName");
  ui.nameField = qs("#nameField");
  ui.authSubmit = qs("#authSubmit");
  ui.authError = qs("#authError");
  ui.authToggleText = qs("#authToggleText");
  ui.authToggleBtn = qs("#authToggleBtn");
  ui.googleBtn = qs("#googleBtn");
}

function boot() {
  cacheDom();
  ui.playBtn.innerHTML = ICONS.play;
  qs("#shareIcon").innerHTML = ICONS.share;
  qs("#saveIcon").innerHTML = ICONS.save;
  qs("#masterIcon").innerHTML = ICONS.volume;
  qs("#themeIcon").innerHTML = ICONS.theme;
  qs("#accountIcon").innerHTML = ICONS.user;

  // Theme: restore saved choice first so first paint matches
  const savedTheme = loadStore(STORE_THEME, "midnight");
  renderThemeMenu();
  applyTheme(THEMES.some(t => t.id === savedTheme) ? savedTheme : "midnight");

  renderPresets();
  renderChannels();
  bindMaster();
  bindFocusTimer();
  bindKeyboard();
  initViz();
  initAuth();
  initAds();
  renderSaved();

  ui.playBtn.addEventListener("click", togglePlay);
  ui.shareBtn.addEventListener("click", share);
  ui.saveBtn.addEventListener("click", saveCurrentMix);
  ui.themeBtn.addEventListener("click", (e) => { e.stopPropagation(); toggleThemeMenu(); });
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#themeMenu") && !e.target.closest("#themeBtn") &&
        !e.target.closest("#acctMenu") && !e.target.closest("#accountBtn")) {
      closeMenus();
    }
  });
  window.addEventListener("resize", closeMenus);

  // Restore state: a shared URL wins, otherwise the last local session.
  let restored = false;
  if (location.hash.includes("m=")) restored = readHash();
  if (!restored) {
    const last = loadStore(STORE_LAST, null);
    if (last) loadMix({ master: last.master, c: last.c }, true);
  }
  // Never autoplay — audio needs a user gesture, and a calm entrance is nicer.
}

document.addEventListener("DOMContentLoaded", boot);
