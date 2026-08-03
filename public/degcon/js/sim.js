// DEGCON simulation core: regions, climate, disasters, migration, scoring.
// Units: pop in millions, emissions in GtCO2/yr, temp in °C above pre-industrial.

export const START_YEAR = 2025;
export const END_YEAR = 2100;
export const YEARS_PER_TURN = 5;
export const TURNS = (END_YEAR - START_YEAR) / YEARS_PER_TURN; // 15
export const DOOM_TEMP = 4.0;

export const REGIONS = {
  NA: { name: 'NORTH AMERICA', short: 'N.AMERICA', color: '#4fa3e3',
    pop: 380, gdp: 28, em: 6.2, clean: 0.22, growth: 0.02,
    vuln: { heat: 0.28, food: 0.22, coast: 0.45, storm: 0.55 },
    label: [-100, 46], desc: 'Rich, high emissions per head' },
  LA: { name: 'LATIN AMERICA', short: 'LATIN AM.', color: '#46d68c',
    pop: 660, gdp: 7, em: 2.6, clean: 0.32, growth: 0.08,
    vuln: { heat: 0.5, food: 0.55, coast: 0.5, storm: 0.55 },
    label: [-61, -11], desc: 'Forest carbon, exposed farms' },
  EU: { name: 'EUROPE', short: 'EUROPE', color: '#b48cff',
    pop: 750, gdp: 24, em: 3.6, clean: 0.32, growth: 0.015,
    vuln: { heat: 0.38, food: 0.25, coast: 0.5, storm: 0.35 },
    label: [14, 50], desc: 'Wealthy, ageing, coastal' },
  AF: { name: 'AFRICA', short: 'AFRICA', color: '#ffb347',
    pop: 1500, gdp: 3.5, em: 1.5, clean: 0.12, growth: 0.25,
    vuln: { heat: 0.85, food: 0.9, coast: 0.4, storm: 0.45 },
    label: [17, 6], desc: 'Youngest, most exposed, least to blame' },
  RU: { name: 'RUSSIA & C. ASIA', short: 'RUSSIA+CA', color: '#ff7a90',
    pop: 300, gdp: 4, em: 2.9, clean: 0.1, growth: 0.03,
    vuln: { heat: 0.3, food: 0.4, coast: 0.25, storm: 0.3 },
    label: [72, 58], desc: 'Fossil exporter, thawing north' },
  ME: { name: 'MIDEAST & S. ASIA', short: 'ME+S.ASIA', color: '#ffd24f',
    pop: 2300, gdp: 10, em: 6.1, clean: 0.13, growth: 0.12,
    vuln: { heat: 0.92, food: 0.75, coast: 0.6, storm: 0.6 },
    label: [63, 26], desc: 'Billions on the heat frontier' },
  EA: { name: 'EAST ASIA & OCEANIA', short: 'E.ASIA+OC', color: '#4fd8d8',
    pop: 2400, gdp: 27, em: 16.6, clean: 0.26, growth: 0.04,
    vuln: { heat: 0.55, food: 0.5, coast: 0.7, storm: 0.65 },
    label: [107, 33], desc: 'Factory of the world, coastal giants' },
};
export const REGION_IDS = Object.keys(REGIONS);

export const CITIES = {
  NA: [['NEW YORK', -74, 40.7], ['LOS ANGELES', -118.2, 34], ['CHICAGO', -87.6, 41.9], ['MIAMI', -80.2, 25.8], ['TORONTO', -79.4, 43.7], ['HOUSTON', -95.4, 29.8]],
  LA: [['MEXICO CITY', -99.1, 19.4], ['SÃO PAULO', -46.6, -23.5], ['BUENOS AIRES', -58.4, -34.6], ['LIMA', -77, -12], ['BOGOTÁ', -74.1, 4.7], ['CARACAS', -66.9, 10.5]],
  EU: [['LONDON', -0.1, 51.5], ['PARIS', 2.3, 48.9], ['BERLIN', 13.4, 52.5], ['MADRID', -3.7, 40.4], ['WARSAW', 21, 52.2], ['ROME', 12.5, 41.9], ['ATHENS', 23.7, 38]],
  AF: [['LAGOS', 3.4, 6.5], ['CAIRO', 31.2, 30], ['NAIROBI', 36.8, -1.3], ['KINSHASA', 15.3, -4.3], ['JOHANNESBURG', 28, -26.2], ['DAKAR', -17.4, 14.7], ['KHARTOUM', 32.5, 15.6]],
  RU: [['MOSCOW', 37.6, 55.8], ['ST PETERSBURG', 30.3, 59.9], ['NOVOSIBIRSK', 82.9, 55], ['ALMATY', 76.9, 43.2], ['TASHKENT', 69.2, 41.3]],
  ME: [['DELHI', 77.2, 28.6], ['MUMBAI', 72.9, 19.1], ['KARACHI', 67, 24.9], ['DHAKA', 90.4, 23.8], ['TEHRAN', 51.4, 35.7], ['RIYADH', 46.7, 24.7], ['BAGHDAD', 44.4, 33.3]],
  EA: [['SHANGHAI', 121.5, 31.2], ['BEIJING', 116.4, 39.9], ['TOKYO', 139.7, 35.7], ['JAKARTA', 106.8, -6.2], ['MANILA', 121, 14.6], ['SYDNEY', 151.2, -33.9], ['BANGKOK', 100.5, 13.8]],
};

// ---- actions -----------------------------------------------------------
// cost may be reduced by global tech level (renewables) as tech advances.
export const ACTIONS = {
  renew:   { tab: 'mit', ico: '☀', name: 'CLEAN ENERGY', cost: 3, max: 12,
    desc: 'Shift power to renewables. −9% of your remaining fossil emissions.' },
  capture: { tab: 'mit', ico: '🌲', name: 'FORESTS & CAPTURE', cost: 4, max: 8,
    desc: 'Reforest and capture carbon: −0.25 Gt CO₂/yr, permanently.' },
  industry:{ tab: 'mit', ico: '⚙', name: 'CLEAN INDUSTRY', cost: 3, max: 8,
    desc: 'Regulate heavy industry: −7% emissions, small growth cost.' },
  coast:   { tab: 'ada', ico: '⛯', name: 'COASTAL DEFENSE', cost: 2, max: 10,
    desc: 'Sea walls, managed retreat. Blunts floods & storm surge.' },
  heat:    { tab: 'ada', ico: '☂', name: 'HEAT PROTECTION', cost: 2, max: 10,
    desc: 'Cooling centers, shade cities, care networks vs heat death.' },
  food:    { tab: 'ada', ico: '🌾', name: 'FOOD & WATER', cost: 2, max: 10,
    desc: 'Drought crops, irrigation, reserves vs famine.' },
  migrate: { tab: 'ada', ico: '⇆', name: 'MIGRATION READINESS', cost: 2, max: 10,
    desc: 'Plan for arrivals: housing, integration, work permits.' },
  invest:  { tab: 'eco', ico: '▲', name: 'GROW ECONOMY', cost: 3, max: 99, perTurn: 2,
    desc: '+5% GDP → bigger future budgets. Raises emissions if dirty.' },
  research:{ tab: 'eco', ico: '⚗', name: 'GREEN RESEARCH', cost: 3, max: 10, perTurn: 2,
    desc: 'Global public good: makes CLEAN ENERGY cheaper for everyone.' },
  summit:  { tab: 'dip', ico: '◉', name: 'CLIMATE SUMMIT', cost: 3, max: 99, perTurn: 1,
    desc: 'Convene the world: every region leans harder into mitigation.' },
  aid:     { tab: 'dip', ico: '✚', name: 'CLIMATE AID', cost: 2, max: 99, perTurn: 3,
    desc: 'Fund the most vulnerable region’s transition & defenses.' },
};

const rnd = () => Math.random();
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export function newGame(playerId, difficulty) {
  const g = {
    playerId, difficulty,
    turn: 1, year: START_YEAR,
    temp: 1.3, co2: 425, tech: 0,
    doom: false, over: false,
    log: [],
    regions: {},
  };
  for (const id of REGION_IDS) {
    const m = REGIONS[id];
    g.regions[id] = {
      id, pop: m.pop, pop0: m.pop, gdp: m.gdp, em: m.em, clean: m.clean,
      adapt: { coast: 0, heat: 0, food: 0, migrate: 0 },
      lvl: { renew: 0, capture: 0, industry: 0, research: 0 },
      capture: 0, stability: 78, deaths: 0, absorbed: 0, refugees: 0,
      diplo: 0, aidGiven: 0, summits: 0,
      score: 0, failed: false,
      budget: 0, spent: {},
    };
  }
  for (const id of REGION_IDS) g.regions[id].budget = budgetFor(g, id);
  return g;
}

export function budgetFor(g, id) {
  const r = g.regions[id];
  let b = 5 + Math.sqrt(r.gdp) * 1.35;
  if (r.failed) b *= 0.4;
  b *= clamp(r.stability / 78, 0.45, 1.15);
  return Math.max(2, Math.round(b));
}

export function actionCost(g, r, key) {
  const a = ACTIONS[key];
  let c = a.cost;
  if (key === 'renew') c = Math.max(1, a.cost - Math.floor(g.tech / 3)); // research pays off
  if (key === 'capture') c = Math.max(2, a.cost - Math.floor(g.tech / 5));
  return c;
}

export function canBuy(g, id, key) {
  const r = g.regions[id];
  const a = ACTIONS[key];
  const lvl = r.lvl[key] !== undefined ? r.lvl[key] : r.adapt[key];
  if (lvl !== undefined && lvl >= a.max) return false;
  if (a.perTurn && (r.spent[key] || 0) >= a.perTurn) return false;
  return r.budget >= actionCost(g, r, key);
}

// Apply one purchase for region id. Returns false if not affordable.
export function buy(g, id, key) {
  if (!canBuy(g, id, key)) return false;
  const r = g.regions[id];
  const cost = actionCost(g, r, key);
  r.budget -= cost;
  r.spent[key] = (r.spent[key] || 0) + 1;
  switch (key) {
    case 'renew':
      r.lvl.renew++; r.clean = clamp(r.clean + (1 - r.clean) * 0.09 + 0.02, 0, 0.97);
      r.em *= 0.91; break;
    case 'capture':
      r.lvl.capture++; r.capture += 0.25; break;
    case 'industry':
      r.lvl.industry++; r.em *= 0.93; r.gdp *= 0.995; break;
    case 'coast': case 'heat': case 'food': case 'migrate':
      r.adapt[key] = clamp(r.adapt[key] + 1, 0, 10); break;
    case 'invest':
      r.gdp *= 1.05; r.em *= 1 + 0.04 * (1 - r.clean); break;
    case 'research':
      r.lvl.research++; g.tech++; break;
    case 'summit':
      r.summits++; break; // effect applied in AI phase
    case 'aid': {
      // fund the most heat/food-vulnerable, poorest region
      const target = mostVulnerable(g, id);
      if (target) {
        const t = g.regions[target];
        t.clean = clamp(t.clean + 0.05, 0, 0.97); t.em *= 0.96;
        t.adapt.food = clamp(t.adapt.food + 0.5, 0, 10);
        t.adapt.heat = clamp(t.adapt.heat + 0.5, 0, 10);
        t.stability = clamp(t.stability + 2, 0, 100);
        r.aidGiven++; r.diplo += 1;
        g.lastAidTarget = target;
      }
      break;
    }
  }
  return true;
}

export function mostVulnerable(g, excludeId) {
  let best = null, bestV = -1;
  for (const id of REGION_IDS) {
    if (id === excludeId) continue;
    const r = g.regions[id]; if (r.failed) continue;
    const m = REGIONS[id];
    const v = (m.vuln.heat + m.vuln.food) * (1 - (r.adapt.heat + r.adapt.food) / 24) / Math.sqrt(r.gdp);
    if (v > bestV) { bestV = v; best = id; }
  }
  return best;
}

// ---- turn resolution ---------------------------------------------------
// Returns an event list for the UI to animate.
export function resolveTurn(g) {
  const ev = [];
  const stress = Math.max(0, g.temp - 0.8);

  // 1. economy & emissions drift
  const diffEm = { easy: 0.78, normal: 1.05, hard: 1.5 }[g.difficulty] || 1;
  const worldDrag = g.temp > 1.5 ? (g.temp - 1.5) * 0.022 : 0; // a hot planet is poor for everyone
  for (const id of REGION_IDS) {
    const r = g.regions[id]; const m = REGIONS[id];
    if (r.failed) continue;
    r.gdp *= (1 + m.growth * 0.5 * clamp(r.stability / 78, 0.3, 1.1)) * (1 - worldDrag);
    r.em *= 1 + m.growth * 0.55 * diffEm * (1 - r.clean); // development raises emissions unless clean
  }

  // 2. world climate
  const world = REGION_IDS.reduce((s, id) => s + Math.max(0, g.regions[id].em - g.regions[id].capture), 0);
  const dT = world * YEARS_PER_TURN * 0.00053 + (g.temp > 2.1 ? (g.temp - 2.1) * 0.02 : 0);
  g.temp = Math.round((g.temp + dT) * 100) / 100;
  g.co2 = Math.round(g.co2 + world * YEARS_PER_TURN * 0.058);
  g.worldEm = Math.round(world * 10) / 10;

  // 3. disasters per region
  const kinds = [
    ['heat',  'HEATWAVE',      c => `HEATWAVE GRIPS ${c}`],
    ['food',  'FAMINE',        c => `CROPS FAIL NEAR ${c}`],
    ['coast', 'FLOOD',         c => `FLOODING SWALLOWS ${c}`],
    ['storm', 'SUPERSTORM',    c => `SUPERSTORM STRIKES ${c}`],
  ];
  for (const id of REGION_IDS) {
    const r = g.regions[id]; const m = REGIONS[id];
    let turnDeaths = 0, turnDamage = 0;
    for (const [type, tag, msg] of kinds) {
      const p = clamp(stress * m.vuln[type] * 0.62, 0, 0.97);
      if (rnd() < p) {
        const sev = stress * m.vuln[type] * (0.6 + rnd() * 0.9);
        const prot = type === 'storm'
          ? (r.adapt.coast * 0.5 + r.adapt.heat * 0.5)
          : r.adapt[type === 'heat' ? 'heat' : type === 'food' ? 'food' : 'coast'];
        const shield = 1 - clamp(prot / 12, 0, 0.9);
        const base = { heat: 0.011, food: 0.013, coast: 0.004, storm: 0.005 }[type];
        const deaths = r.pop * base * sev * sev * shield;      // millions
        const damage = { heat: 0.5, food: 1.1, coast: 1.6, storm: 1.4 }[type] * sev * shield; // % gdp
        r.pop = Math.max(1, r.pop - deaths);
        r.deaths += deaths;
        r.gdp *= 1 - damage / 100;
        r.stability -= sev * shield * 4;
        turnDeaths += deaths; turnDamage += damage;
        const city = CITIES[id][Math.floor(rnd() * CITIES[id].length)];
        ev.push({ kind: 'disaster', type, tag, region: id, city: city[0], lon: city[1], lat: city[2],
          deaths, sev, text: `${msg(city[0])} — ${fmtDeaths(deaths)} DEAD` });
      }
    }
    // slow recovery
    r.stability = clamp(r.stability + 2.5 - stress * 1.2, 5, 100);
    r.turnDeaths = turnDeaths;
  }

  // 4. migration
  const liv = {};
  for (const id of REGION_IDS) {
    const r = g.regions[id]; const m = REGIONS[id];
    const avgV = (m.vuln.heat + m.vuln.food + m.vuln.coast) / 3;
    const avgA = (r.adapt.heat + r.adapt.food + r.adapt.coast) / 3;
    liv[id] = r.stability / 100 - stress * avgV * (1 - avgA / 14) + r.gdp / 120;
  }
  for (const id of REGION_IDS) {
    const r = g.regions[id];
    const pressure = 0.42 - liv[id];
    if (pressure > 0 && r.pop > 20) {
      const flow = Math.min(r.pop * 0.25, r.pop * pressure * 0.34); // millions over 5 yrs
      if (flow < 2) continue;
      const dests = REGION_IDS.filter(d => d !== id && !g.regions[d].failed)
        .sort((a, b) => (liv[b] + g.regions[b].adapt.migrate / 22) - (liv[a] + g.regions[a].adapt.migrate / 22))
        .slice(0, 2);
      r.pop -= flow; r.refugees += flow;
      for (let i = 0; i < dests.length; i++) {
        const d = g.regions[dests[i]];
        const share = flow * (i === 0 ? 0.65 : 0.35);
        const ready = d.adapt.migrate / 10;
        d.pop += share;
        d.absorbed += share;
        if (ready > 0.45) { d.gdp *= 1 + share / d.pop * 0.5; d.stability += 0.5; }
        else { d.stability -= share / d.pop * 260 * (1 - ready); }
        d.stability = clamp(d.stability, 5, 100);
        ev.push({ kind: 'migration', from: id, to: dests[i], flow: share,
          text: `${fmtPop(share)} FLEE ${REGIONS[id].short} → ${REGIONS[dests[i]].short}` +
            (ready > 0.45 ? ' — RESETTLED' : ' — CAMPS OVERWHELMED') });
      }
    }
  }

  // 5. failed states
  for (const id of REGION_IDS) {
    const r = g.regions[id];
    if (!r.failed && r.stability <= 12) {
      r.failed = true;
      ev.push({ kind: 'collapse', region: id, text: `GOVERNMENT COLLAPSE: ${REGIONS[id].name} IS A FAILED STATE` });
    } else if (r.failed && r.stability > 40) {
      r.failed = false;
      ev.push({ kind: 'recover', region: id, text: `${REGIONS[id].name} RESTORES ORDER` });
    }
  }

  // 6. doom check
  if (g.temp >= DOOM_TEMP) { g.doom = true; g.over = true; }

  // 7. advance
  g.turn++; g.year += YEARS_PER_TURN;
  if (g.year >= END_YEAR) g.over = true;
  if (!g.over) for (const id of REGION_IDS) {
    const r = g.regions[id];
    r.budget = budgetFor(g, id); r.spent = {};
  }
  ev.forEach(e => g.log.push(`[${g.year}] ${e.text}`));
  return ev;
}

// ---- scoring -----------------------------------------------------------
export function scoreOf(g, id) {
  const r = g.regions[id];
  const survival = r.pop / (r.pop0 + r.absorbed * 0.5);
  let s = survival * 55 + Math.sqrt(r.gdp) * 3.5 + r.absorbed * 0.06 + r.aidGiven * 2 + r.summits * 1.5
    - (r.deaths / r.pop0) * 95 + (r.stability - 50) * 0.12;
  const worldBonus = Math.max(0, (3.2 - g.temp)) * 17; // shared stake in the planet
  s += worldBonus;
  if (r.failed) s -= 25;
  if (g.doom) s = 0;
  return Math.max(0, Math.round(s));
}

export function worldOutcome(g) {
  if (g.doom) return { cls: 'doom', title: 'EVERYBODY DIES', text: `+${g.temp.toFixed(1)}°C — feedback loops beyond control. The old game was right after all.` };
  if (g.temp < 2.0) return { cls: 'good', title: 'THE WORLD HELD', text: `+${g.temp.toFixed(1)}°C — hard decades, but civilization bent the curve. Everybody lives.` };
  if (g.temp < 2.6) return { cls: 'ok', title: 'SCARRED BUT STANDING', text: `+${g.temp.toFixed(1)}°C — coastlines redrawn, summers feared, but humanity adapted.` };
  if (g.temp < 3.2) return { cls: 'bad', title: 'CENTURY OF CRISIS', text: `+${g.temp.toFixed(1)}°C — hundreds of millions displaced. History will not forgive.` };
  return { cls: 'doom', title: 'COLLAPSE OF NATIONS', text: `+${g.temp.toFixed(1)}°C — the maps of 2025 no longer describe the Earth.` };
}

export function degconLevel(temp) {
  if (temp < 1.5) return 5;
  if (temp < 2.0) return 4;
  if (temp < 2.5) return 3;
  if (temp < 3.2) return 2;
  return 1;
}
export const DEGCON_COLORS = { 5: '#38d879', 4: '#b8e04a', 3: '#ffd24f', 2: '#ff9a3c', 1: '#ff4a5e' };

export function fmtDeaths(m) {
  if (m >= 1) return m.toFixed(1) + 'M';
  return Math.max(1, Math.round(m * 1000)) + 'K';
}
export function fmtPop(m) {
  if (m >= 1000) return (m / 1000).toFixed(2) + 'B';
  if (m >= 1) return Math.round(m) + 'M';
  return Math.round(m * 1000) + 'K';
}
