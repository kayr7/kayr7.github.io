// Minimal WebAudio synth: UI blips, alarms, ambient drone. No assets needed.
let ctx = null, muted = false, droneNodes = null;

function ac() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

export function setMuted(m) {
  muted = m;
  if (m) stopDrone(); else startDrone();
}
export function isMuted() { return muted; }

function tone(freq, dur, type = 'sine', gain = 0.08, slideTo = null) {
  if (muted) return;
  try {
    const a = ac();
    const o = a.createOscillator(), g = a.createGain();
    o.type = type; o.frequency.value = freq;
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, a.currentTime + dur);
    g.gain.setValueAtTime(gain, a.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + dur);
    o.connect(g); g.connect(a.destination);
    o.start(); o.stop(a.currentTime + dur);
  } catch (_) { /* audio unavailable */ }
}

export const sfx = {
  tap: () => tone(660, 0.07, 'square', 0.03),
  buy: () => { tone(520, 0.08, 'square', 0.045); setTimeout(() => tone(780, 0.1, 'square', 0.045), 70); },
  deny: () => tone(160, 0.18, 'sawtooth', 0.05),
  turn: () => { tone(300, 0.25, 'sine', 0.07, 180); },
  disaster: () => { tone(90, 0.5, 'sawtooth', 0.06, 55); },
  migration: () => tone(440, 0.3, 'sine', 0.035, 620),
  alarm: () => {
    [0, 300, 600].forEach(d => setTimeout(() => tone(880, 0.22, 'square', 0.06, 660), d));
  },
  doom: () => { tone(220, 2.2, 'sawtooth', 0.09, 40); },
  war: () => { tone(60, 0.8, 'sawtooth', 0.1, 35); setTimeout(() => tone(50, 1.0, 'sawtooth', 0.08, 30), 350); },
  knell: () => { [0, 700, 1400].forEach(d => setTimeout(() => tone(196, 1.1, 'sine', 0.09, 190), d)); },
  win: () => { [523, 659, 784, 1046].forEach((f, i) => setTimeout(() => tone(f, 0.35, 'sine', 0.06), i * 160)); },
};

export function startDrone() {
  if (muted || droneNodes) return;
  try {
    const a = ac();
    const o1 = a.createOscillator(), o2 = a.createOscillator(), g = a.createGain();
    o1.type = 'sine'; o1.frequency.value = 55;
    o2.type = 'sine'; o2.frequency.value = 55.7;   // slow beating
    g.gain.value = 0.016;
    o1.connect(g); o2.connect(g); g.connect(a.destination);
    o1.start(); o2.start();
    droneNodes = { o1, o2, g };
  } catch (_) { /* ignore */ }
}
export function stopDrone() {
  if (!droneNodes) return;
  try { droneNodes.o1.stop(); droneNodes.o2.stop(); } catch (_) {}
  droneNodes = null;
}
