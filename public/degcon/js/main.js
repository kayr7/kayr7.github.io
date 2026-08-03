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
  map.gameRef = g;
  map.fitWorld();
  map.onTapRegion = rid => {
    if (rid) { sfx.tap(); map.selected = rid; ui.openSheet(rid); }
    else { map.selected = null; ui.closeSheet(); }
  };

  ui = new UI();
  ui.setGame(g);
  ui.onBuy = (key, card) => {
    if (g.phase !== 'plan') return;
    const impact = buy(g, g.playerId, key);
    if (impact !== null) {
      sfx.buy(); ui.flashBought(card); ui.renderActions(); ui.updateProjection();
      if (impact) ui.toast(impact, key === 'military' ? '#ff9a3c' : undefined);
      if (key === 'aid' && g.lastAidTarget) map.addArc(g.playerId, g.lastAidTarget, '#b48cff');
      if (key === 'peace' && g.lastPeaceTarget) map.addArc(g.playerId, g.lastPeaceTarget, '#38d879');
      if (key === 'summit') map.addPulse(g.playerId, '#b48cff');
    } else { sfx.deny(); }
  };
  ui.onStance = stance => {
    if (g.phase !== 'plan') return;
    g.regions[g.playerId].stance = stance;
    sfx.tap();
    ui.renderActions();
    ui.toast(stance === 'closed' ? 'BORDERS SEALED — THE DESPERATE WILL STILL COME'
      : stance === 'open' ? 'BORDERS OPEN — PREPARE ARRIVAL CAPACITY'
      : 'SELECTIVE ENTRY — CAPACITY DECIDES', '#b48cff');
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
  const deathsBefore = g.worldDeaths;

  aiTakeTurns(g);
  const events = resolveTurn(g);
  ui.updateHUD();
  ui.setDeaths(deathsBefore, false);   // tick up as the events play out

  const perEvent = Math.min(650, Math.max(300, 4600 / Math.max(1, events.length)));
  let running = deathsBefore;
  for (const e of events) {
    if (e.kind === 'disaster') {
      map.addBlast(e.lon, e.lat, EFFECT_COLORS[e.type] || '#ff4a5e');
      sfx.disaster();
      running += e.deaths || 0;
    } else if (e.kind === 'migration') {
      map.addArc(e.from, e.to, e.ok ? '#46d68c' : '#ffd24f');
      sfx.migration();
    } else if (e.kind === 'border') {
      map.addArc(e.from, e.to, '#ff4a5e');
      map.addPulse(e.to, '#ff4a5e');
      sfx.deny();
      running += e.dead || 0;
    } else if (e.kind === 'cityCrisis') {
      map.addBlast(e.lon, e.lat, '#ff9a3c');
      sfx.alarm();
    } else if (e.kind === 'citySaved') {
      map.addBlast(e.lon, e.lat, '#38d879');
    } else if (e.kind === 'cityLost') {
      map.addBlast(e.lon, e.lat, '#ff4a5e');
      sfx.knell();
      running = null; // big hit — show full number immediately below
      if (e.region === g.playerId) {
        ui.flash(`${e.city} IS LOST`, e.war ? 'DESTROYED IN THE FIGHTING' : 'THE MAP JUST GOT SMALLER', '#ff4a5e');
        await sleep(1400);
      }
    } else if (e.kind === 'warStart') {
      sfx.war();
      ui.flash('WAR', `${REGIONS[e.a].short} ✕ ${REGIONS[e.b].short}`, '#ff4a5e');
      await sleep(1500);
    } else if (e.kind === 'warRage') {
      sfx.disaster();
    } else if (e.kind === 'warEnd') {
      ui.flash('CEASEFIRE', `${REGIONS[e.a].short} / ${REGIONS[e.b].short}`, '#38d879');
      await sleep(1200);
    } else if (e.kind === 'tipping') {
      sfx.doom();
      ui.flash('TIPPING POINT', e.text.replace('TIPPING POINT: ', ''), '#ff9a3c');
      await sleep(2000);
    } else if (e.kind === 'collapse') {
      map.addPulse(e.region, '#ff4a5e');
      sfx.alarm();
    } else if (e.kind === 'recover') {
      map.addPulse(e.region, '#38d879');
    }
    ui.pushTicker(e.text);
    if (running === null) { ui.setDeaths(g.worldDeaths); running = g.worldDeaths; }
    else ui.setDeaths(Math.min(running, g.worldDeaths));
    await sleep(perEvent);
  }
  ui.setDeaths(g.worldDeaths);
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
