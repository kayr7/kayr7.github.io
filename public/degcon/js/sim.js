// DEGCON simulation core: regions, cities, climate, disasters, migration,
// wars, tipping points, scoring.
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

// who borders whom (for migration routes and wars)
export const NEIGHBORS = {
  NA: ['LA', 'EU', 'EA'],
  LA: ['NA', 'EU'],
  EU: ['NA', 'LA', 'AF', 'RU', 'ME'],
  AF: ['EU', 'ME', 'LA'],
  RU: ['EU', 'ME', 'EA'],
  ME: ['EU', 'AF', 'RU', 'EA'],
  EA: ['NA', 'RU', 'ME'],
};

// Cities: [name, lon, lat, popShare(of region), exposure]
// exposure: 'coast' (sea level + storms), 'heat' (extreme heat), 'inland'
// exposureLevel: how early it is at risk (higher = more exposed)
export const CITY_DEFS = {
  NA: [
    ['NEW YORK', -74, 40.7, 0.09, 'coast', 0.7],
    ['LOS ANGELES', -118.2, 34, 0.06, 'heat', 0.5],
    ['CHICAGO', -87.6, 41.9, 0.05, 'inland', 0.3],
    ['MIAMI', -80.2, 25.8, 0.04, 'coast', 1.0],
    ['TORONTO', -79.4, 43.7, 0.04, 'inland', 0.3],
    ['HOUSTON', -95.4, 29.8, 0.05, 'coast', 0.8],
  ],
  LA: [
    ['MEXICO CITY', -99.1, 19.4, 0.07, 'heat', 0.5],
    ['SÃO PAULO', -46.6, -23.5, 0.07, 'inland', 0.4],
    ['BUENOS AIRES', -58.4, -34.6, 0.05, 'coast', 0.6],
    ['LIMA', -77, -12, 0.04, 'coast', 0.6],
    ['BOGOTÁ', -74.1, 4.7, 0.03, 'inland', 0.3],
    ['CARACAS', -66.9, 10.5, 0.02, 'coast', 0.6],
  ],
  EU: [
    ['LONDON', -0.1, 51.5, 0.05, 'coast', 0.7],
    ['PARIS', 2.3, 48.9, 0.04, 'heat', 0.5],
    ['BERLIN', 13.4, 52.5, 0.03, 'inland', 0.3],
    ['MADRID', -3.7, 40.4, 0.03, 'heat', 0.8],
    ['ROME', 12.5, 41.9, 0.03, 'heat', 0.7],
    ['ATHENS', 23.7, 38, 0.02, 'heat', 0.9],
  ],
  AF: [
    ['LAGOS', 3.4, 6.5, 0.05, 'coast', 0.9],
    ['CAIRO', 31.2, 30, 0.05, 'heat', 0.8],
    ['NAIROBI', 36.8, -1.3, 0.02, 'inland', 0.4],
    ['KINSHASA', 15.3, -4.3, 0.03, 'heat', 0.6],
    ['JOHANNESBURG', 28, -26.2, 0.02, 'inland', 0.4],
    ['DAKAR', -17.4, 14.7, 0.02, 'coast', 0.8],
    ['KHARTOUM', 32.5, 15.6, 0.02, 'heat', 1.0],
  ],
  RU: [
    ['MOSCOW', 37.6, 55.8, 0.06, 'inland', 0.3],
    ['ST PETERSBURG', 30.3, 59.9, 0.03, 'coast', 0.6],
    ['NOVOSIBIRSK', 82.9, 55, 0.02, 'inland', 0.3],
    ['ALMATY', 76.9, 43.2, 0.02, 'heat', 0.6],
    ['TASHKENT', 69.2, 41.3, 0.03, 'heat', 0.8],
  ],
  ME: [
    ['DELHI', 77.2, 28.6, 0.05, 'heat', 0.9],
    ['MUMBAI', 72.9, 19.1, 0.04, 'coast', 0.9],
    ['KARACHI', 67, 24.9, 0.03, 'heat', 1.0],
    ['DHAKA', 90.4, 23.8, 0.03, 'coast', 1.0],
    ['TEHRAN', 51.4, 35.7, 0.02, 'heat', 0.7],
    ['RIYADH', 46.7, 24.7, 0.01, 'heat', 1.0],
    ['BAGHDAD', 44.4, 33.3, 0.02, 'heat', 1.0],
  ],
  EA: [
    ['SHANGHAI', 121.5, 31.2, 0.04, 'coast', 0.9],
    ['BEIJING', 116.4, 39.9, 0.04, 'heat', 0.6],
    ['TOKYO', 139.7, 35.7, 0.04, 'coast', 0.6],
    ['JAKARTA', 106.8, -6.2, 0.03, 'coast', 1.0],
    ['MANILA', 121, 14.6, 0.02, 'coast', 0.9],
    ['SYDNEY', 151.2, -33.9, 0.01, 'heat', 0.6],
    ['BANGKOK', 100.5, 13.8, 0.02, 'coast', 0.9],
  ],
};

// ---- actions -----------------------------------------------------------
export const ACTIONS = {
  renew:   { tab: 'mit', ico: '☀', name: 'CLEAN ENERGY', cost: 3, max: 12, ramp: 3,
    desc: 'Shift power to renewables. −9% of your remaining fossil emissions.' },
  capture: { tab: 'mit', ico: '🌲', name: 'FORESTS & CAPTURE', cost: 4, max: 8, ramp: 4,
    desc: 'Reforest and capture carbon: −0.25 Gt CO₂/yr, permanently.' },
  industry:{ tab: 'mit', ico: '⚙', name: 'CLEAN INDUSTRY', cost: 3, max: 8, ramp: 3,
    desc: 'Regulate heavy industry: −7% emissions, small growth cost.' },
  coast:   { tab: 'ada', ico: '⛯', name: 'COASTAL DEFENSE', cost: 2, max: 10, ramp: 3,
    desc: 'Sea walls, managed retreat. Protects coastal cities from the rising sea.' },
  heat:    { tab: 'ada', ico: '☂', name: 'HEAT PROTECTION', cost: 2, max: 10, ramp: 3,
    desc: 'Cooling centers, shade cities, care networks vs heat death.' },
  food:    { tab: 'ada', ico: '🌾', name: 'FOOD & WATER', cost: 2, max: 10, ramp: 3,
    desc: 'Drought crops, irrigation, reserves vs famine.' },
  migrate: { tab: 'ada', ico: '⇆', name: 'MIGRATION CAPACITY', cost: 2, max: 10, ramp: 3,
    desc: 'Housing, integration, permits: how many arrivals you can absorb well.' },
  invest:  { tab: 'eco', ico: '▲', name: 'GROW ECONOMY', cost: 3, max: 99, perTurn: 2,
    desc: '+5% GDP → bigger future budgets. Raises emissions if dirty.' },
  research:{ tab: 'eco', ico: '⚗', name: 'GREEN RESEARCH', cost: 3, max: 10, perTurn: 2,
    desc: 'Global public good: makes CLEAN ENERGY cheaper for everyone.' },
  military:{ tab: 'dip', ico: '✠', name: 'ARMED FORCES', cost: 3, max: 10, ramp: 4,
    desc: 'Deters attack — but arms races feed the very tensions they guard against.' },
  peace:   { tab: 'dip', ico: '☮', name: 'PEACE TALKS', cost: 2, max: 99, perTurn: 2,
    desc: 'Defuse your most dangerous rivalry before it becomes a war.' },
  summit:  { tab: 'dip', ico: '◉', name: 'CLIMATE SUMMIT', cost: 3, max: 99, perTurn: 1,
    desc: 'Convene the world: every region leans harder into mitigation.' },
  aid:     { tab: 'dip', ico: '✚', name: 'CLIMATE AID', cost: 2, max: 99, perTurn: 3,
    desc: 'Fund the most vulnerable region — and earn their lasting goodwill.' },
};

export const STANCES = ['open', 'selective', 'closed'];

const rnd = () => Math.random();
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const pairKey = (a, b) => (a < b ? a + '-' + b : b + '-' + a);

export function newGame(playerId, difficulty) {
  const g = {
    playerId, difficulty,
    turn: 1, year: START_YEAR,
    temp: 1.3, co2: 425, tech: 0, seaLevel: 0,   // seaLevel in cm above 2025
    worldDeaths: 0, doom: false, over: false,
    tension: {}, wars: [], tipped: {},
    vmod: {}, log: [], regions: {},
  };
  for (const id of REGION_IDS) g.vmod[id] = { heat: 1, food: 1, coast: 1, storm: 1 };
  for (const id of REGION_IDS) {
    const m = REGIONS[id];
    g.regions[id] = {
      id, pop: m.pop, pop0: m.pop, gdp: m.gdp, em: m.em, clean: m.clean,
      adapt: { coast: 0, heat: 0, food: 0, migrate: 0 },
      lvl: { renew: 0, capture: 0, industry: 0, research: 0, military: 0 },
      capture: 0, stability: 78, deaths: 0, absorbed: 0, refugees: 0,
      stance: 'selective', diplo: 0, aidGiven: 0, summits: 0, warsFought: 0,
      score: 0, failed: false, atWar: false,
      budget: 0, spent: {},
      cities: CITY_DEFS[id].map(c => ({
        name: c[0], lon: c[1], lat: c[2], popShare: c[3],
        exposure: c[4], level: c[5], state: 'ok',   // ok | crisis | lost
      })),
    };
  }
  for (const a of REGION_IDS) for (const b of NEIGHBORS[a]) {
    const k = pairKey(a, b);
    if (!(k in g.tension)) g.tension[k] = 8 + rnd() * 8;
  }
  for (const id of REGION_IDS) g.regions[id].budget = budgetFor(g, id);
  return g;
}

export function budgetFor(g, id) {
  const r = g.regions[id];
  const lostCities = r.cities.filter(c => c.state === 'lost').length;
  let b = 4 + Math.sqrt(r.gdp) * 1.3 - lostCities * 0.8;
  if (r.failed) b *= 0.4;
  if (r.atWar) b *= 0.75;
  b *= clamp(r.stability / 78, 0.45, 1.15);
  return Math.max(2, Math.round(b));
}

// escalating costs: every `ramp` levels the price rises by 1
export function actionCost(g, r, key) {
  const a = ACTIONS[key];
  let c = a.cost;
  const lvl = r.lvl[key] !== undefined ? r.lvl[key] : r.adapt[key];
  if (a.ramp && lvl !== undefined) c += Math.floor(lvl / a.ramp);
  if (key === 'renew') c = Math.max(1, c - Math.floor(g.tech / 3)); // research pays off
  if (key === 'capture') c = Math.max(2, c - Math.floor(g.tech / 5));
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

// The hottest rivalry this region is part of (for peace talks & UI).
export function hottestRivalry(g, id) {
  let best = null, bestT = -1;
  for (const n of NEIGHBORS[id]) {
    const k = pairKey(id, n);
    if (g.tension[k] > bestT) { bestT = g.tension[k]; best = n; }
  }
  return { other: best, tension: bestT };
}

// Apply one purchase. Returns a short impact description (or null if refused).
export function buy(g, id, key) {
  if (!canBuy(g, id, key)) return null;
  const r = g.regions[id];
  const cost = actionCost(g, r, key);
  r.budget -= cost;
  r.spent[key] = (r.spent[key] || 0) + 1;
  switch (key) {
    case 'renew': {
      r.lvl.renew++;
      const before = r.em;
      r.clean = clamp(r.clean + (1 - r.clean) * 0.09 + 0.02, 0, 0.97);
      r.em *= 0.91;
      return `−${(before - r.em).toFixed(2)} Gt CO₂/yr GLOBAL`;
    }
    case 'capture':
      r.lvl.capture++; r.capture += 0.25;
      return '−0.25 Gt CO₂/yr GLOBAL, PERMANENT';
    case 'industry': {
      r.lvl.industry++;
      const before = r.em;
      r.em *= 0.93; r.gdp *= 0.995;
      return `−${(before - r.em).toFixed(2)} Gt CO₂/yr GLOBAL`;
    }
    case 'coast': case 'heat': case 'food': case 'migrate':
      r.adapt[key] = clamp(r.adapt[key] + 1, 0, 10);
      return { coast: 'COASTAL CITIES BETTER SHIELDED', heat: 'FEWER WILL DIE IN THE HEAT',
        food: 'FAMINE RESISTANCE UP', migrate: 'ARRIVAL CAPACITY UP' }[key];
    case 'invest':
      r.gdp *= 1.05; r.em *= 1 + 0.04 * (1 - r.clean);
      return `+5% GDP${r.clean < 0.6 ? ', EMISSIONS UP' : ''}`;
    case 'research':
      r.lvl.research++; g.tech++;
      return 'CLEAN ENERGY CHEAPER WORLDWIDE';
    case 'military':
      r.lvl.military++;
      for (const n of NEIGHBORS[id]) g.tension[pairKey(id, n)] += 2.5;
      return 'DETERRENCE UP — NEIGHBORS ON EDGE';
    case 'peace': {
      const { other } = hottestRivalry(g, id);
      if (other) {
        const k = pairKey(id, other);
        g.tension[k] = Math.max(5, g.tension[k] - 26);
        g.lastPeaceTarget = other;
        return `TENSION WITH ${REGIONS[other].short} DEFUSED`;
      }
      return 'NO RIVALRY TO DEFUSE';
    }
    case 'summit':
      r.summits++;
      return 'THE WORLD LEANS GREENER THIS TURN';
    case 'aid': {
      const target = mostVulnerable(g, id);
      if (target) {
        const t = g.regions[target];
        t.clean = clamp(t.clean + 0.05, 0, 0.97); t.em *= 0.96;
        t.adapt.food = clamp(t.adapt.food + 0.5, 0, 10);
        t.adapt.heat = clamp(t.adapt.heat + 0.5, 0, 10);
        t.stability = clamp(t.stability + 2, 0, 100);
        r.aidGiven++; r.diplo += 1;
        g.lastAidTarget = target;
        const k = NEIGHBORS[id].includes(target) ? pairKey(id, target) : null;
        if (k) g.tension[k] = Math.max(5, g.tension[k] - 8);
        return `${REGIONS[target].short} STRENGTHENED — GOODWILL EARNED`;
      }
      return null;
    }
  }
  return '';
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

// ---- projections (visible feedback for mitigation) ---------------------
export function worldEmissions(g) {
  return REGION_IDS.reduce((s, id) => s + Math.max(0, g.regions[id].em - g.regions[id].capture), 0);
}

// Quick forward run assuming current emission rates persist (with drift).
export function projectTemp2100(g) {
  let t = g.temp;
  let em = worldEmissions(g);
  const diffEm = { easy: 0.78, normal: 1.05, hard: 1.5 }[g.difficulty] || 1;
  const drift = REGION_IDS.reduce((s, id) =>
    s + REGIONS[id].growth * 0.55 * diffEm * (1 - g.regions[id].clean) * (g.regions[id].em / Math.max(1, worldEmissions(g))), 0);
  for (let y = g.year; y < END_YEAR; y += YEARS_PER_TURN) {
    t += em * YEARS_PER_TURN * 0.00053 + (t > 2.1 ? (t - 2.1) * 0.02 : 0) + (g.tipped.methane ? 0.02 : 0);
    em *= 1 + drift * 0.6;
  }
  return Math.round(t * 10) / 10;
}

// ---- turn resolution ---------------------------------------------------
export function resolveTurn(g) {
  const ev = [];
  const stress = Math.max(0, g.temp - 0.8);
  // every round is worse than the last: hazard escalation with time AND heat
  const escal = (1 + (g.turn - 1) * 0.05) * (1 + Math.max(0, g.temp - 1.3) * 0.55);

  // 1. economy & emissions drift
  const diffEm = { easy: 0.78, normal: 1.05, hard: 1.5 }[g.difficulty] || 1;
  const worldDrag = g.temp > 1.5 ? (g.temp - 1.5) * 0.022 : 0;
  for (const id of REGION_IDS) {
    const r = g.regions[id]; const m = REGIONS[id];
    if (r.failed) continue;
    r.gdp *= (1 + m.growth * 0.5 * clamp(r.stability / 78, 0.3, 1.1)) * (1 - worldDrag);
    r.em *= 1 + m.growth * 0.55 * diffEm * (1 - r.clean);
  }

  // 2. world climate
  const world = worldEmissions(g);
  const feedback = (g.temp > 2.1 ? (g.temp - 2.1) * 0.02 : 0) + (g.tipped.methane ? 0.025 : 0);
  const dT = world * YEARS_PER_TURN * 0.00053 + feedback;
  g.temp = Math.round((g.temp + dT) * 100) / 100;
  g.co2 = Math.round(g.co2 + world * YEARS_PER_TURN * 0.058);
  g.worldEm = Math.round(world * 10) / 10;
  g.seaLevel += Math.max(0, g.temp - 1.0) * 3.2; // cm per 5y — accelerates with heat

  // 2b. tipping points: one-way doors, each makes the world permanently harsher
  const TIPS = [
    ['coral', 1.8, 'CORAL REEFS DIE OFF — OCEAN FOOD CHAINS BUCKLE', () => {
      for (const id of REGION_IDS) g.vmod[id].food *= 1.12;
    }],
    ['amazon', 2.3, 'AMAZON DIEBACK — THE FOREST BECOMES A CARBON SOURCE', () => {
      g.regions.LA.capture = 0; g.regions.LA.em += 1.2;
    }],
    ['methane', 2.7, 'PERMAFROST METHANE RELEASE — WARMING FEEDS ITSELF NOW', () => {}],
    ['amoc', 3.1, 'ATLANTIC CURRENT COLLAPSE — HARVESTS FAIL ACROSS CONTINENTS', () => {
      g.vmod.EU.food *= 1.7; g.vmod.NA.food *= 1.5;
    }],
  ];
  for (const [key, at, text, fx] of TIPS) {
    if (!g.tipped[key] && g.temp >= at) {
      g.tipped[key] = true; fx();
      ev.push({ kind: 'tipping', text: `TIPPING POINT: ${text}` });
    }
  }

  // 3. disasters per region
  const kinds = [
    ['heat',  c => `HEATWAVE GRIPS ${c}`],
    ['food',  c => `CROPS FAIL NEAR ${c}`],
    ['coast', c => `FLOODING SWALLOWS ${c}`],
    ['storm', c => `SUPERSTORM STRIKES ${c}`],
  ];
  for (const id of REGION_IDS) {
    const r = g.regions[id]; const m = REGIONS[id];
    let turnDeaths = 0;
    const hits = [];
    for (const [type, msg] of kinds) {
      const vul = clamp(m.vuln[type] * g.vmod[id][type], 0, 1);
      const p = clamp(stress * vul * 0.5 * escal, 0, 0.97);
      if (rnd() < p) {
        const sev = stress * vul * (0.6 + rnd() * 0.9) * Math.sqrt(escal);
        const prot = type === 'storm'
          ? (r.adapt.coast * 0.5 + r.adapt.heat * 0.5)
          : r.adapt[type === 'heat' ? 'heat' : type === 'food' ? 'food' : 'coast'];
        const shield = 1 - clamp(prot / 12, 0, 0.9);
        const base = { heat: 0.008, food: 0.009, coast: 0.003, storm: 0.0035 }[type];
        const deaths = r.pop * base * sev * sev * shield;
        const damage = { heat: 0.5, food: 1.1, coast: 1.6, storm: 1.4 }[type] * sev * shield;
        r.pop = Math.max(1, r.pop - deaths);
        addDeaths(g, r, deaths);
        r.gdp *= 1 - damage / 100;
        r.stability -= sev * shield * 4;
        turnDeaths += deaths;
        const livingCities = r.cities.filter(c => c.state !== 'lost');
        const city = livingCities[Math.floor(rnd() * livingCities.length)] || r.cities[0];
        hits.push({ kind: 'disaster', type, region: id, city: city.name, lon: city.lon, lat: city.lat,
          deaths, sev, text: `${msg(city.name)} — ${fmtDeaths(deaths)} DEAD` });
      }
    }
    // the deadliest strike gets its own headline; the rest become one digest
    hits.sort((a, b) => b.deaths - a.deaths);
    if (hits[0]) ev.push(hits[0]);
    if (hits.length > 1) {
      const restDeaths = hits.slice(1).reduce((s, h) => s + h.deaths, 0);
      const h2 = hits[1];
      ev.push({ kind: 'disaster', type: h2.type, region: id, city: h2.city, lon: h2.lon, lat: h2.lat,
        deaths: restDeaths, sev: h2.sev,
        text: `${hits.length - 1} MORE DISASTERS ACROSS ${REGIONS[id].short} — ${fmtDeaths(restDeaths)} DEAD` });
    }
    r.stability = clamp(r.stability + 2.5 - stress * 1.2, 5, 100);
    r.turnDeaths = turnDeaths;
  }

  // 3b. cities: the sea and the heat come for them, one by one
  for (const id of REGION_IDS) {
    const r = g.regions[id];
    for (const c of r.cities) {
      if (c.state === 'lost') continue;
      let threat = 0;
      if (c.exposure === 'coast') {
        const defended = g.seaLevel * c.level - r.adapt.coast * 6;
        threat = defended > 26 ? 1 : defended > 15 ? 0.5 : 0;
      } else if (c.exposure === 'heat') {
        const th = 3.4 - c.level * 0.9;               // most exposed break near +2.5°C
        const over = g.temp - th - r.adapt.heat * 0.09;
        threat = over > 0.25 ? 1 : over > 0 ? 0.5 : 0;
      }
      if (threat >= 1 && (c.state === 'crisis' || rnd() < 0.5)) {
        c.state = 'lost';
        const cityPop = r.pop0 * c.popShare;
        const dead = cityPop * 0.06;
        const flee = cityPop * 0.55;
        r.pop = Math.max(1, r.pop - dead);
        addDeaths(g, r, dead, 'city');
        r.gdp *= 0.93;
        r.stability -= 7;
        r.displaced = (r.displaced || 0) + flee;      // joins emigration below
        ev.push({ kind: 'cityLost', region: id, city: c.name, lon: c.lon, lat: c.lat,
          text: c.exposure === 'coast'
            ? `${c.name} IS LOST TO THE SEA — ${fmtDeaths(dead)} DEAD, ${fmtPop(flee)} FLEE`
            : `${c.name} ABANDONED TO THE HEAT — ${fmtDeaths(dead)} DEAD, ${fmtPop(flee)} FLEE` });
      } else if (threat >= 0.5 && c.state === 'ok') {
        c.state = 'crisis';
        ev.push({ kind: 'cityCrisis', region: id, city: c.name, lon: c.lon, lat: c.lat,
          text: c.exposure === 'coast'
            ? `${c.name}: SEAWATER IN THE STREETS — DEFEND OR ABANDON`
            : `${c.name}: DEADLY SUMMERS — COOL IT OR LOSE IT` });
      } else if (threat === 0 && c.state === 'crisis') {
        c.state = 'ok';
        ev.push({ kind: 'citySaved', region: id, city: c.name, lon: c.lon, lat: c.lat,
          text: `${c.name} STABILIZED — DEFENSES HOLD` });
      }
    }
  }

  // 4. migration: emigration pressure → routes → absorbed / blocked
  const liv = {};
  for (const id of REGION_IDS) {
    const r = g.regions[id]; const m = REGIONS[id];
    const avgV = (m.vuln.heat + m.vuln.food + m.vuln.coast) / 3;
    const avgA = (r.adapt.heat + r.adapt.food + r.adapt.coast) / 3;
    liv[id] = r.stability / 100 - stress * avgV * (1 - avgA / 14) + r.gdp / 120 - (r.atWar ? 0.25 : 0);
  }
  for (const id of REGION_IDS) {
    const r = g.regions[id];
    const pressure = 0.42 - liv[id];
    let flow = (r.displaced || 0);
    r.displaced = 0;
    if (pressure > 0 && r.pop > 20) flow += Math.min(r.pop * 0.22, r.pop * pressure * 0.34);
    if (flow < 6) continue;   // below crisis scale people move within their region
    r.pop = Math.max(1, r.pop - flow);
    r.refugees += flow;
    // destinations: neighbors, ranked by livability & openness
    const dests = NEIGHBORS[id].filter(d => !g.regions[d].failed)
      .sort((a, b) => (liv[b] + stanceBonus(g, b)) - (liv[a] + stanceBonus(g, a)));
    let remaining = flow;
    let bestTaken = null, bestBlocked = null;   // one aggregated event each
    for (const dId of dests) {
      if (remaining < 1) break;
      const d = g.regions[dId];
      const want = remaining * (dId === dests[0] ? 0.7 : 0.5);
      const capacity = d.pop * (0.006 + d.adapt.migrate * 0.004);
      let taken = 0, blocked = 0;
      if (d.stance === 'open') taken = want;
      else if (d.stance === 'selective') { taken = Math.min(want, capacity); blocked = want - taken; }
      else blocked = want;
      if (taken > 0.5) {
        d.pop += taken; d.absorbed += taken;
        const ready = d.adapt.migrate / 10;
        const managed = taken <= capacity || ready > 0.6;
        if (managed) { d.gdp *= 1 + (taken / d.pop) * 0.5; d.stability += 0.4; }
        else d.stability -= (taken / d.pop) * 240 * (1 - ready);
        if (!bestTaken || taken > bestTaken.flow) bestTaken = { to: dId, flow: taken, ok: managed };
      }
      if (blocked > 0) {
        g.tension[pairKey(id, dId)] += blocked > 5 ? (d.stance === 'closed' ? 14 : 6) : 2;
        if (blocked > 5) {
          const borderDead = blocked * (0.012 + stress * 0.005);
          addDeaths(g, r, borderDead, 'border');
          r.stability -= 2.5;
          if (!bestBlocked || blocked > bestBlocked.flow) bestBlocked = { to: dId, flow: blocked, dead: borderDead };
        }
        remaining -= blocked * 0.4;  // some try elsewhere, some give up
      }
      remaining -= taken;
      d.stability = clamp(d.stability, 5, 100);
    }
    if (bestTaken) ev.push({ kind: 'migration', from: id, to: bestTaken.to, flow: bestTaken.flow, ok: bestTaken.ok,
      text: bestTaken.ok
        ? `${fmtPop(bestTaken.flow)} RESETTLED: ${REGIONS[id].short} → ${REGIONS[bestTaken.to].short}`
        : `${fmtPop(bestTaken.flow)} FLEE ${REGIONS[id].short} → ${REGIONS[bestTaken.to].short} — CAMPS OVERWHELMED` });
    if (bestBlocked) ev.push({ kind: 'border', from: id, to: bestBlocked.to, dead: bestBlocked.dead,
      text: `${REGIONS[bestBlocked.to].short} TURNS BACK ${fmtPop(bestBlocked.flow)} AT THE BORDER — ${fmtDeaths(bestBlocked.dead)} DIE` });
  }

  // 5. tensions decay a little; wars ignite, rage on, and end
  for (const k of Object.keys(g.tension)) {
    g.tension[k] = clamp(g.tension[k] - 2.5, 0, 130);
  }
  // famine + collapse pressure feeds tension
  for (const id of REGION_IDS) {
    const r = g.regions[id];
    if (r.turnDeaths > r.pop * 0.005 || r.stability < 40) {
      for (const n of NEIGHBORS[id]) g.tension[pairKey(id, n)] += 4;
    }
  }
  // ongoing wars
  for (const w of g.wars) {
    if (w.over) continue;
    w.turns++;
    const [a, b] = [g.regions[w.a], g.regions[w.b]];
    for (const [self, foe] of [[a, b], [b, a]]) {
      const inten = 0.004 + 0.0025 * Math.max(0, foe.lvl.military - self.lvl.military * 0.5);
      const dead = self.pop * inten * (0.7 + rnd() * 0.6);
      self.pop = Math.max(1, self.pop - dead);
      addDeaths(g, self, dead, 'war');
      self.gdp *= 0.94; self.stability -= 6; self.em *= 1.03;
      w.dead += dead;
    }
    // cities can burn
    if (rnd() < 0.3) {
      const victim = rnd() < 0.5 ? a : b;
      const alive = victim.cities.filter(c => c.state !== 'lost');
      if (alive.length > 1) {
        const c = alive[Math.floor(rnd() * alive.length)];
        c.state = 'lost';
        const cityPop = victim.pop0 * c.popShare;
        const dead = cityPop * 0.12;
        victim.pop = Math.max(1, victim.pop - dead);
        addDeaths(g, victim, dead, 'war');
        victim.gdp *= 0.93;
        victim.displaced = (victim.displaced || 0) + cityPop * 0.5;
        ev.push({ kind: 'cityLost', region: victim.id, city: c.name, lon: c.lon, lat: c.lat, war: true,
          text: `${c.name} DESTROYED IN THE FIGHTING — ${fmtDeaths(dead)} DEAD` });
      }
    }
    const exhausted = w.turns >= 2 || a.stability < 20 || b.stability < 20;
    if (exhausted) {
      w.over = true;
      a.atWar = b.atWar = false;
      g.tension[pairKey(w.a, w.b)] = 30;
      ev.push({ kind: 'warEnd', a: w.a, b: w.b,
        text: `CEASEFIRE: ${REGIONS[w.a].short} / ${REGIONS[w.b].short} — ${fmtDeaths(w.dead)} DEAD IN ${w.turns * 5} YEARS OF WAR` });
    } else {
      ev.push({ kind: 'warRage', a: w.a, b: w.b,
        text: `WAR GRINDS ON: ${REGIONS[w.a].short} vs ${REGIONS[w.b].short}` });
    }
  }
  // new wars
  for (const k of Object.keys(g.tension)) {
    const [a, b] = k.split('-');
    const ra = g.regions[a], rb = g.regions[b];
    if (ra.atWar || rb.atWar || ra.failed || rb.failed) continue;
    const t = g.tension[k];
    if (t > 68 && rnd() < (t - 68) / 55) {
      ra.atWar = rb.atWar = true;
      ra.warsFought++; rb.warsFought++;
      g.wars.push({ a, b, turns: 0, dead: 0, over: false });
      ev.push({ kind: 'warStart', a, b,
        text: `WAR: ${REGIONS[a].short} AND ${REGIONS[b].short} OPEN FIRE — BORDERS BURN` });
    }
  }

  // 6. failed states
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

  // 7. doom check
  if (g.temp >= DOOM_TEMP) { g.doom = true; g.over = true; }

  // 8. advance
  g.turn++; g.year += YEARS_PER_TURN;
  if (g.year >= END_YEAR) g.over = true;
  if (!g.over) for (const id of REGION_IDS) {
    const r = g.regions[id];
    r.budget = budgetFor(g, id); r.spent = {};
  }
  ev.forEach(e => g.log.push(`[${g.year}] ${e.text}`));
  return ev;
}

function addDeaths(g, r, d, src = 'disaster') {
  r.deaths += d;
  g.worldDeaths += d;
  g.deathBy = g.deathBy || {};
  g.deathBy[src] = (g.deathBy[src] || 0) + d;
}

function stanceBonus(g, id) {
  return { open: 0.15, selective: 0.05, closed: -0.5 }[g.regions[id].stance] || 0;
}

// ---- scoring -----------------------------------------------------------
export function scoreOf(g, id) {
  const r = g.regions[id];
  const survival = r.pop / (r.pop0 + r.absorbed * 0.5);
  const lostCities = r.cities.filter(c => c.state === 'lost').length;
  let s = survival * 55 + Math.sqrt(r.gdp) * 3.5 + r.absorbed * 0.06 + r.aidGiven * 4 + r.summits * 3
    - (r.deaths / r.pop0) * 90 + (r.stability - 50) * 0.12
    - lostCities * 6 - r.warsFought * 8
    + Math.max(0, r.clean - 0.25) * 40;             // clean transition is legacy
  const worldBonus = Math.max(0, (3.2 - g.temp)) * 22;
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
  if (m >= 1000) return (m / 1000).toFixed(2) + 'B';
  if (m >= 1) return m.toFixed(1) + 'M';
  return Math.max(1, Math.round(m * 1000)) + 'K';
}
export function fmtPop(m) {
  if (m >= 1000) return (m / 1000).toFixed(2) + 'B';
  if (m >= 1) return Math.round(m) + 'M';
  return Math.round(m * 1000) + 'K';
}
