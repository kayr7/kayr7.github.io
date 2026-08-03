// DEGCON bootstrap: intro screen, render loop, turn resolution choreography.
import { REGIONS, REGION_IDS, newGame, buy, resolveTurn, degconLevel, DEGCON_COLORS,
  fmtPop } from './sim.js';
import { assignPersonalities, aiTakeTurns } from './ai.js';
import { WorldMap } from './map.js';
import { UI } from './ui.js';
import { sfx, setMuted, isMuted, startDrone } from './audio.js';

const $ = id => document.getElementById(id);
let g = null, map = null, ui = null;
let pickedRegion = null, pickedDiff = 'normal';

// ---------- intro ----------
function buildIntro() {
  const wrap = $('regionPick');
  wrap.innerHTML = '';
  for (const id of REGION_IDS) {
    const m = REGIONS[id];
    const b = document.createElement('button');
    b.className = 'region-btn';
    b.style.setProperty('--rc', m.color);
    b.innerHTML = `${m.name}<small>${fmtPop(m.pop)} PEOPLE · ${m.desc}</small>`;
    b.addEventListener('click', () => {
      pickedRegion = id; sfx.tap();
      wrap.querySelectorAll('.region-btn').forEach(x => x.classList.toggle('selected', x === b));
      const s = $('startBtn');
      s.disabled = false;
      s.textContent = `TAKE COMMAND OF ${m.name}`;
    });
    wrap.appendChild(b);
  }
  $('difficultyPick').addEventListener('click', e => {
    const b = e.target.closest('.diff-btn'); if (!b) return;
    pickedDiff = b.dataset.diff; sfx.tap();
    document.querySelectorAll('.diff-btn').forEach(x => x.classList.toggle('selected', x === b));
  });
  $('startBtn').addEventListener('click', () => { if (pickedRegion) startGame(); });
  $('introHelpBtn').addEventListener('click', () => { sfx.tap(); $('help').classList.add('visible'); });
  $('helpClose').addEventListener('click', () => { sfx.tap(); $('help').classList.remove('visible'); });
  $('btnHelp').addEventListener('click', () => { sfx.tap(); $('help').classList.add('visible'); });
  $('btnMute').addEventListener('click', () => {
    setMuted(!isMuted());
    $('btnMute').classList.toggle('on', !isMuted());
    if (!isMuted()) sfx.tap();
  });
  $('btnMute').classList.add('on');
  $('againBtn').addEventListener('click', () => location.reload());
}

// ---------- game ----------
function startGame() {
  g = newGame(pickedRegion, pickedDiff);
  g.phase = 'plan';
  assignPersonalities(g);
  $('intro').classList.remove('visible');
  $('game').classList.remove('hidden');
  startDrone();
  sfx.turn();

  map = new WorldMap($('map'));
  map.playerId = g.playerId;
  map.fitWorld();
  map.onTapRegion = rid => {
    if (rid) { sfx.tap(); map.selected = rid; ui.openSheet(rid); }
    else { map.selected = null; ui.closeSheet(); }
  };

  ui = new UI();
  ui.setGame(g);
  ui.onBuy = (key, card) => {
    if (g.phase !== 'plan') return;
    if (buy(g, g.playerId, key)) {
      sfx.buy(); ui.flashBought(card); ui.renderActions();
      if (key === 'aid' && g.lastAidTarget) map.addArc(g.playerId, g.lastAidTarget, '#b48cff');
      if (key === 'summit') map.addPulse(g.playerId, '#b48cff');
    } else { sfx.deny(); }
  };
  ui.onEndTurn = runTurn;
  ui.updateHUD();
  ui.renderActions();
  ui.pushTicker(`${g.year}: YOU COMMAND ${REGIONS[g.playerId].name} UNTIL 2100 — KEEP THEM ALIVE`);
  requestAnimationFrame(loop);
}

let lastT = 0;
function loop(t) {
  const dt = Math.min(0.05, (t - lastT) / 1000 || 0.016);
  lastT = t;
  if (map) {
    // stress tint follows warming + vulnerability, eases the map into crisis
    const stress = Math.max(0, g.temp - 1.2);
    for (const id of REGION_IDS) {
      const m = REGIONS[id], r = g.regions[id];
      const avgV = (m.vuln.heat + m.vuln.food) / 2;
      map.stress[id] = Math.min(1, stress * avgV * 0.55 * (1 - (r.adapt.heat + r.adapt.food) / 26));
      map.failed[id] = r.failed;
    }
    map.draw(dt);
  }
  requestAnimationFrame(loop);
}

const sleep = ms => new Promise(res => setTimeout(res, ms));

const EFFECT_COLORS = { heat: '#ff7a2a', food: '#ffd24f', coast: '#4fc3f7', storm: '#e879ff' };

async function runTurn() {
  if (g.phase !== 'plan') return;
  ui.setPlanning(false);
  ui.closeSheet(); map.selected = null;
  sfx.turn();
  const prevDegcon = degconLevel(g.temp);

  aiTakeTurns(g);
  const events = resolveTurn(g);
  ui.updateHUD();

  // choreograph the 5 years passing
  const perEvent = Math.min(700, Math.max(320, 4200 / Math.max(1, events.length)));
  for (const e of events) {
    if (e.kind === 'disaster') {
      map.addBlast(e.lon, e.lat, EFFECT_COLORS[e.type] || '#ff4a5e');
      sfx.disaster();
    } else if (e.kind === 'migration') {
      map.addArc(e.from, e.to, '#ffd24f');
      sfx.migration();
    } else if (e.kind === 'collapse') {
      map.addPulse(e.region, '#ff4a5e');
      sfx.alarm();
    } else if (e.kind === 'recover') {
      map.addPulse(e.region, '#38d879');
    }
    ui.pushTicker(e.text);
    await sleep(perEvent);
  }
  if (!events.length) {
    ui.pushTicker(`${g.year}: A QUIET FIVE YEARS. THE OCEAN KEEPS COUNTING.`);
    await sleep(600);
  }

  const dc = degconLevel(g.temp);
  if (dc !== prevDegcon && !g.doom) {
    const col = DEGCON_COLORS[dc];
    ui.flash(`DEGCON ${dc}`, dc < prevDegcon ? `GLOBAL WARMING +${g.temp.toFixed(1)}°C — ESCALATION` : `RECOVERY — +${g.temp.toFixed(1)}°C`, col);
    if (dc < prevDegcon) sfx.alarm(); else sfx.win();
    await sleep(1600);
  }

  if (g.doom) {
    ui.flash('EVERYBODY DIES', `+${g.temp.toFixed(1)}°C — RUNAWAY FEEDBACK`, '#ff4a5e');
    sfx.doom();
    await sleep(2800);
    ui.showEnd();
    return;
  }
  if (g.over) {
    (degconLevel(g.temp) >= 4 ? sfx.win : sfx.alarm)();
    ui.showEnd();
    return;
  }

  // player region failed? you can keep playing (rump government) but warn once
  const you = g.regions[g.playerId];
  if (you.failed && !g.warnedFailed) {
    g.warnedFailed = true;
    ui.flash('YOUR GOVERNMENT FALLS', 'A RUMP ADMINISTRATION CARRIES ON — RESTORE STABILITY', '#ff9a3c');
    sfx.alarm();
    await sleep(1800);
  }

  ui.setPlanning(true);
  ui.updateHUD();
}

buildIntro();
