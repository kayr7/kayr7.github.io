// DOM layer: HUD, action dock, region sheet, ticker, flash banners, end screen.
import { REGIONS, REGION_IDS, ACTIONS, actionCost, canBuy, degconLevel, DEGCON_COLORS,
  scoreOf, worldOutcome, fmtPop, fmtDeaths, END_YEAR, mostVulnerable } from './sim.js';
import { personalityLabel } from './ai.js';
import { sfx } from './audio.js';

const $ = id => document.getElementById(id);

export class UI {
  constructor() {
    this.tab = 'mit';
    this.tickerItems = [];
    this.onBuy = null; this.onEndTurn = null;
    $('dockTabs').addEventListener('click', e => {
      const b = e.target.closest('.tab'); if (!b) return;
      this.tab = b.dataset.tab;
      document.querySelectorAll('#dockTabs .tab').forEach(t => t.classList.toggle('selected', t === b));
      sfx.tap();
      this.renderActions();
    });
    $('dockToggle').addEventListener('click', () => {
      $('dock').classList.toggle('collapsed'); sfx.tap();
    });
    $('endTurn').addEventListener('click', () => { if (this.onEndTurn) this.onEndTurn(); });
    $('sheetClose').addEventListener('click', () => this.closeSheet());
    $('actions').addEventListener('click', e => {
      const card = e.target.closest('.action-card'); if (!card) return;
      if (this.onBuy) this.onBuy(card.dataset.key, card);
    });
  }

  setGame(g) { this.g = g; }

  // ---- HUD ----
  updateHUD() {
    const g = this.g;
    $('hudYear').textContent = g.year;
    $('hudTurn').textContent = g.over ? 'FINAL' : `TURN ${g.turn}/15`;
    $('hudTemp').textContent = `+${g.temp.toFixed(1)}°C`;
    $('hudCo2').textContent = `${g.co2} PPM CO₂`;
    const dc = degconLevel(g.temp);
    const col = DEGCON_COLORS[dc];
    $('hudTemp').style.color = col;
    document.querySelectorAll('.degcon-segs span').forEach(s => {
      const active = +s.dataset.l === dc;
      s.classList.toggle('active', active);
      if (active) s.style.setProperty('--dc', col);
    });
    $('endTurn').querySelector('.et-year').textContent = `→ ${Math.min(g.year + 5, END_YEAR)}`;
  }

  // ---- action dock ----
  renderActions() {
    const g = this.g, r = g.regions[g.playerId];
    const wrap = $('actions');
    wrap.innerHTML = '';
    $('budgetVal').textContent = r.budget;
    for (const [key, a] of Object.entries(ACTIONS)) {
      if (a.tab !== this.tab) continue;
      const lvl = r.lvl[key] !== undefined ? r.lvl[key] : r.adapt[key];
      const cost = actionCost(g, r, key);
      const btn = document.createElement('button');
      btn.className = 'action-card';
      btn.dataset.key = key;
      btn.disabled = g.phase !== 'plan' || !canBuy(g, g.playerId, key);
      let lvlHtml = '';
      if (lvl !== undefined && a.max <= 12) {
        const filled = Math.round(lvl);
        lvlHtml = `<div class="a-lvl">LVL <b>${'▰'.repeat(Math.min(filled, a.max))}${'▱'.repeat(Math.max(0, a.max - filled))}</b></div>`;
      } else if (key === 'aid') {
        const t = mostVulnerable(g, g.playerId);
        if (t) lvlHtml = `<div class="a-lvl">TARGET: ${REGIONS[t].short}</div>`;
      }
      btn.innerHTML = `
        <div class="ico">${a.ico}</div>
        <div class="a-body">
          <div class="a-name">${a.name}</div>
          <div class="a-desc">${a.desc}</div>
          ${lvlHtml}
        </div>
        <div class="a-cost">${cost}◆</div>`;
      wrap.appendChild(btn);
    }
  }

  flashBought(card) {
    card.classList.remove('bought'); void card.offsetWidth; card.classList.add('bought');
  }

  setPlanning(on) {
    this.g.phase = on ? 'plan' : 'resolve';
    $('endTurn').disabled = !on;
    this.renderActions();
  }

  // ---- ticker ----
  pushTicker(text) {
    this.tickerItems.push(text);
    if (this.tickerItems.length > 8) this.tickerItems.shift();
    $('tickerText').textContent = this.tickerItems.join('  +++  ') + '  +++';
  }

  // ---- region sheet ----
  openSheet(rid) {
    const g = this.g, r = g.regions[rid], m = REGIONS[rid];
    const isYou = rid === g.playerId;
    $('sheet').style.setProperty('--rc', m.color);
    $('sheetTitle').textContent = (isYou ? '★ ' : '') + m.name + (r.failed ? ' — FAILED STATE' : '');
    const bar = (v, max, color) =>
      `<div class="bar" style="--bc:${color}"><i style="width:${Math.min(100, v / max * 100)}%"></i></div>`;
    const row = (k, v) => `<div class="stat-row"><span class="dim">${k}</span><span class="sv">${v}</span></div>`;
    $('sheetBody').innerHTML =
      row('GOVERNMENT', isYou ? 'YOU' : personalityLabel(g, rid).toUpperCase()) +
      row('POPULATION', fmtPop(r.pop)) +
      row('ECONOMY', r.gdp.toFixed(1) + ' T$') +
      row('EMISSIONS', Math.max(0, r.em - r.capture).toFixed(1) + ' Gt/yr') +
      row('CLEAN ENERGY', Math.round(r.clean * 100) + '%') +
      row('CLIMATE DEATHS', fmtDeaths(r.deaths || 0.0001)) +
      row('REFUGEES TAKEN IN', fmtPop(r.absorbed)) +
      `<div style="margin-top:10px" class="dim">STABILITY</div>` + bar(r.stability, 100, r.stability > 40 ? m.color : '#ff4a5e') +
      `<div class="dim">DEFENSES — COAST / HEAT / FOOD / MIGRATION</div>` +
      bar(r.adapt.coast, 10, '#4fc3f7') + bar(r.adapt.heat, 10, '#ff9a3c') +
      bar(r.adapt.food, 10, '#ffd24f') + bar(r.adapt.migrate, 10, '#b48cff') +
      `<div class="sheet-note">${m.desc}. Vulnerability — heat ${pct(m.vuln.heat)}, food ${pct(m.vuln.food)}, coast ${pct(m.vuln.coast)}.</div>`;
    $('sheet').classList.add('open');
  }
  closeSheet() { $('sheet').classList.remove('open'); }

  // ---- flash ----
  flash(text, sub, color) {
    const f = $('flash');
    f.innerHTML = `<div class="fl-inner" style="--fc:${color}">${text}${sub ? `<small>${sub}</small>` : ''}</div>`;
    f.classList.remove('hidden');
    clearTimeout(this._flashT);
    this._flashT = setTimeout(() => f.classList.add('hidden'), 2700);
  }

  // ---- end screen ----
  showEnd() {
    const g = this.g;
    const out = worldOutcome(g);
    $('endTitle').textContent = g.doom ? g.year : '2100';
    const ew = $('endWorld');
    ew.textContent = out.title;
    ew.className = 'end-world' + (out.cls === 'doom' ? ' doom' : '');
    ew.style.setProperty('--wc', { good: '#38d879', ok: '#b8e04a', bad: '#ff9a3c', doom: '#ff4a5e' }[out.cls]);
    const totalDeaths = REGION_IDS.reduce((s, id) => s + g.regions[id].deaths, 0);
    const totalRefugees = REGION_IDS.reduce((s, id) => s + g.regions[id].refugees, 0);
    const worldPop = REGION_IDS.reduce((s, id) => s + g.regions[id].pop, 0);
    $('endStats').innerHTML =
      `${out.text}<br>` +
      `World population <b>${fmtPop(worldPop)}</b> · climate deaths <b>${fmtDeaths(Math.max(0.001, totalDeaths))}</b> · ` +
      `displaced <b>${fmtPop(totalRefugees)}</b> · CO₂ <b>${g.co2} ppm</b>`;
    const board = REGION_IDS.map(id => ({ id, s: scoreOf(g, id) })).sort((a, b) => b.s - a.s);
    $('endBoard').innerHTML = board.map((e, i) => {
      const m = REGIONS[e.id]; const r = g.regions[e.id];
      return `<div class="board-row${e.id === g.playerId ? ' you' : ''}${r.failed || g.doom ? ' dead' : ''}">
        <span class="b-rank">${g.doom ? '✕' : i + 1}</span>
        <span class="b-name" style="color:${m.color}">${m.name}</span>
        <span class="dim" style="font-size:10px">${e.id === g.playerId ? 'you' : personalityLabel(g, e.id)}</span>
        <span class="b-score" style="color:${m.color}">${e.s}</span></div>`;
    }).join('');
    $('end').classList.add('visible');
  }
}

function pct(v) { return Math.round(v * 100) + '%'; }
