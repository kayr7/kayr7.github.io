// DOM layer: HUD, action dock, region sheet, ticker, flash banners, toasts,
// end screen.
import { REGIONS, REGION_IDS, NEIGHBORS, ACTIONS, STANCES, actionCost, canBuy,
  degconLevel, DEGCON_COLORS, scoreOf, worldOutcome, fmtPop, fmtDeaths, END_YEAR,
  mostVulnerable, hottestRivalry, worldEmissions, projectTemp2100, pairKey,
  credibility, soloEffect } from './sim.js';
import { personalityLabel } from './ai.js';
import { sfx } from './audio.js';

const $ = id => document.getElementById(id);

export class UI {
  constructor() {
    this.tab = 'mit';
    this.tickerItems = [];
    this.shownDeaths = 0;
    this.onBuy = null; this.onEndTurn = null; this.onStance = null;
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
      const st = e.target.closest('.stance-btns button');
      if (st) { if (this.onStance) this.onStance(st.dataset.stance); return; }
      const card = e.target.closest('.action-card'); if (!card || !card.dataset.key) return;
      if (this.onBuy) this.onBuy(card.dataset.key, card);
    });
  }

  setGame(g) { this.g = g; this.shownDeaths = g.worldDeaths; }

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
    this.updateProjection();
    this.setDeaths(g.worldDeaths, false);
  }

  // the visible payoff of mitigation: world emissions + where we're headed
  updateProjection() {
    const g = this.g;
    const proj = projectTemp2100(g);
    const em = Math.round(worldEmissions(g) * 10) / 10;
    $('hudProj').textContent = g.over ? '' : `${em}GT → +${proj.toFixed(1)}° IN 2100`;
    $('hudProj').style.color = proj < 2 ? '#38d879' : proj < 2.6 ? '#ffd24f' : proj < 3.2 ? '#ff9a3c' : '#ff4a5e';
  }

  setDeaths(v, bump = true) {
    const el = $('hudDeaths');
    const prev = this.shownDeaths;
    this.shownDeaths = v;
    el.textContent = fmtDeaths(Math.max(0.0001, v));
    if (bump && v > prev + 0.05) {
      const wrap = el.parentElement;
      wrap.classList.remove('bump'); void wrap.offsetWidth; wrap.classList.add('bump');
    }
  }

  // ---- action dock ----
  renderActions() {
    const g = this.g, r = g.regions[g.playerId];
    const wrap = $('actions');
    wrap.innerHTML = '';
    $('budgetVal').textContent = r.budget;
    if (this.tab === 'mit') this.renderDilemmaCard(wrap, r);
    if (this.tab === 'dip') this.renderStanceCard(wrap, r);
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
      } else if (key === 'peace') {
        const { other, tension } = hottestRivalry(g, g.playerId);
        if (other) lvlHtml = `<div class="a-lvl">HOTTEST: ${REGIONS[other].short} (${Math.round(tension)})</div>`;
      } else if (key === 'summit') {
        const cred = credibility(g, g.playerId);
        lvlHtml = `<div class="a-lvl">POWER: ×${cred.toFixed(1)} ${cred < 0.5 ? '— CUT AT HOME FIRST' : cred > 1 ? '— THEY LISTEN TO YOU' : ''}</div>`;
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
    if (this.tab === 'dip') this.renderTensions(wrap);
  }

  // The tragedy of the commons, spelled out: your cuts alone barely move the
  // thermometer — but the world copies what its leaders do.
  renderDilemmaCard(wrap, r) {
    const g = this.g;
    const world = worldEmissions(g);
    const yours = Math.max(0, r.em - r.capture);
    const share = Math.round((yours / Math.max(0.1, world)) * 100);
    const solo = soloEffect(g, g.playerId);
    const cred = credibility(g, g.playerId);
    const credPct = Math.round(Math.min(1, cred / 1.2) * 100);
    const coopPct = Math.round(g.coop * 100);
    const coopLabel = g.coop < 0.25 ? 'EVERYONE DEFECTS' : g.coop < 0.5 ? 'HESITANT' : g.coop < 0.75 ? 'MOVING' : 'ALL IN';
    const bar = (v, color) =>
      `<div class="bar" style="--bc:${color}"><i style="width:${Math.min(100, v)}%"></i></div>`;
    const div = document.createElement('div');
    div.className = 'action-card stance-card';
    div.innerHTML = `
      <div class="a-body">
        <div class="a-name">THE COMMONS PROBLEM</div>
        <div class="a-desc">Your emissions: <b style="color:var(--eco)">${yours.toFixed(1)} Gt</b> — ${share}% of the world.
          Going fully clean <i>alone</i> buys ≈ <b>${solo < 0.05 ? '<0.1' : solo.toFixed(1)}°C</b> by 2100.
          The other ${100 - share}% follow example, pressure and panic — not your sacrifice.</div>
        <div class="a-lvl" style="margin-top:6px">WORLD RESOLVE — ${coopLabel}</div>
        ${bar(coopPct, coopPct < 40 ? '#ff9a3c' : '#38d879')}
        <div class="a-lvl">YOUR CREDIBILITY — ${credPct < 35 ? 'HYPOCRITE DISCOUNT' : credPct < 65 ? 'HEARD' : 'LEADING BY EXAMPLE'}</div>
        ${bar(credPct, credPct < 35 ? '#ff4a5e' : '#b48cff')}
        <div class="a-desc" style="margin-top:4px">Resolve is contagious: cut and others cut; free-ride and they free-ride too. Credibility decides whether your SUMMITS move anyone.</div>
      </div>`;
    wrap.appendChild(div);
  }

  renderStanceCard(wrap, r) {
    const div = document.createElement('div');
    div.className = 'action-card stance-card';
    div.innerHTML = `
      <div class="a-body">
        <div class="a-name">BORDERS: <span style="color:var(--dip)">${r.stance.toUpperCase()}</span></div>
        <div class="a-desc">Free choice, heavy consequences. Closed borders turn refugees back — people die, and your neighbors remember.</div>
        <div class="stance-btns">
          ${STANCES.map(s => `<button data-stance="${s}" class="${r.stance === s ? 'sel' : ''}">${s.toUpperCase()}</button>`).join('')}
        </div>
      </div>`;
    wrap.appendChild(div);
  }

  renderTensions(wrap) {
    const g = this.g;
    const div = document.createElement('div');
    div.className = 'action-card stance-card';
    const rows = NEIGHBORS[g.playerId].map(n => {
      const t = g.tension[pairKey(g.playerId, n)] || 0;
      const atWar = g.wars.some(w => !w.over && ((w.a === g.playerId && w.b === n) || (w.b === g.playerId && w.a === n)));
      const col = atWar ? '#ff4a5e' : t > 55 ? '#ff9a3c' : t > 30 ? '#ffd24f' : '#38d879';
      return `<div class="tension-row${atWar ? ' war' : ''}">
        <span class="tn">${REGIONS[n].short}</span>
        <div class="bar" style="--bc:${col}"><i style="width:${Math.min(100, t)}%"></i></div>
        <span class="tv" style="color:${col}">${atWar ? 'WAR' : Math.round(t)}</span></div>`;
    }).join('');
    div.innerHTML = `<div class="a-body"><div class="a-name">FRONTIER TENSIONS</div>${rows}
      <div class="a-desc" style="margin-top:4px">Past 68 a rivalry can ignite. Peace talks cool the hottest one.</div></div>`;
    wrap.appendChild(div);
  }

  flashBought(card) {
    card.classList.remove('bought'); void card.offsetWidth; card.classList.add('bought');
  }

  toast(text, color) {
    const t = $('toast');
    t.textContent = text;
    t.style.color = color || '';
    t.classList.remove('show'); void t.offsetWidth; t.classList.add('show');
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
    $('sheetTitle').textContent = (isYou ? '★ ' : '') + m.name + (r.failed ? ' — FAILED STATE' : r.atWar ? ' — AT WAR' : '');
    const bar = (v, max, color) =>
      `<div class="bar" style="--bc:${color}"><i style="width:${Math.min(100, v / max * 100)}%"></i></div>`;
    const row = (k, v) => `<div class="stat-row"><span class="dim">${k}</span><span class="sv">${v}</span></div>`;
    const cities = r.cities.map(c => {
      const mark = c.state === 'lost' ? '✕' : c.state === 'crisis' ? '⚠' : '●';
      const col = c.state === 'lost' ? '#ff4a5e' : c.state === 'crisis' ? '#ff9a3c' : m.color;
      return `<span style="color:${col};white-space:nowrap">${mark} ${c.name}</span>`;
    }).join(' &nbsp;');
    $('sheetBody').innerHTML =
      row('GOVERNMENT', isYou ? 'YOU' : personalityLabel(g, rid).toUpperCase()) +
      row('BORDERS', r.stance.toUpperCase()) +
      row('POPULATION', fmtPop(r.pop)) +
      row('ECONOMY', r.gdp.toFixed(1) + ' T$') +
      row('EMISSIONS', Math.max(0, r.em - r.capture).toFixed(1) + ' Gt/yr') +
      row('CLEAN ENERGY', Math.round(r.clean * 100) + '%') +
      row('MILITARY', '▰'.repeat(r.lvl.military) + '▱'.repeat(10 - r.lvl.military)) +
      row('CLIMATE DEATHS', fmtDeaths(r.deaths || 0.0001)) +
      row('REFUGEES TAKEN IN', fmtPop(r.absorbed)) +
      `<div style="margin-top:10px" class="dim">STABILITY</div>` + bar(r.stability, 100, r.stability > 40 ? m.color : '#ff4a5e') +
      `<div class="dim">DEFENSES — COAST / HEAT / FOOD / MIGRATION</div>` +
      bar(r.adapt.coast, 10, '#4fc3f7') + bar(r.adapt.heat, 10, '#ff9a3c') +
      bar(r.adapt.food, 10, '#ffd24f') + bar(r.adapt.migrate, 10, '#b48cff') +
      `<div class="dim" style="margin-top:6px">CITIES</div>
       <div style="line-height:2;font-size:11px">${cities}</div>` +
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
    const totalRefugees = REGION_IDS.reduce((s, id) => s + g.regions[id].refugees, 0);
    const worldPop = REGION_IDS.reduce((s, id) => s + g.regions[id].pop, 0);
    const lostCities = REGION_IDS.reduce((s, id) => s + g.regions[id].cities.filter(c => c.state === 'lost').length, 0);
    const wars = g.wars.length;
    const by = g.deathBy || {};
    const bySrc = ['disaster', 'border', 'war', 'city']
      .filter(k => by[k] > 0.05)
      .map(k => `${{ disaster: 'climate', border: 'borders', war: 'wars', city: 'lost cities' }[k]} ${fmtDeaths(by[k])}`)
      .join(' · ');
    $('endStats').innerHTML =
      `${out.text}<br>` +
      `World population <b>${fmtPop(worldPop)}</b> · dead <b>${fmtDeaths(Math.max(0.001, g.worldDeaths))}</b>` +
      (bySrc ? ` <span class="dim">(${bySrc})</span>` : '') + `<br>` +
      `displaced <b>${fmtPop(totalRefugees)}</b> · cities lost <b>${lostCities}</b> · wars <b>${wars}</b> · CO₂ <b>${g.co2} ppm</b>`;
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
