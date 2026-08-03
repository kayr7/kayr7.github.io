// AI region governments. Each has a personality; all react to a warming world,
// their own casualties, rising tensions and diplomatic pressure.
import { REGION_IDS, REGIONS, NEIGHBORS, ACTIONS, buy, canBuy, degconLevel,
  hottestRivalry, pairKey } from './sim.js';

const PERSONALITIES = {
  industrialist: { mit: 0.08, ada: 0.2, eco: 0.56, dip: 0.16, stance: 'selective', aggression: 1.15, label: 'growth first' },
  green:         { mit: 0.5,  ada: 0.22, eco: 0.14, dip: 0.14, stance: 'open', aggression: 0.7, label: 'green pioneer' },
  fortress:      { mit: 0.1,  ada: 0.48, eco: 0.18, dip: 0.24, stance: 'closed', aggression: 1.25, label: 'fortress builder' },
  balanced:      { mit: 0.28, ada: 0.28, eco: 0.28, dip: 0.16, stance: 'selective', aggression: 0.9, label: 'pragmatist' },
  opportunist:   { mit: 0.08, ada: 0.28, eco: 0.44, dip: 0.2,  stance: 'closed', aggression: 1.3, label: 'opportunist' },
};

const BIAS = {
  NA: ['industrialist', 'balanced', 'opportunist'],
  LA: ['balanced', 'green', 'opportunist'],
  EU: ['green', 'balanced', 'fortress'],
  AF: ['balanced', 'opportunist', 'green'],
  RU: ['industrialist', 'opportunist', 'fortress'],
  ME: ['opportunist', 'industrialist', 'balanced'],
  EA: ['industrialist', 'balanced', 'green'],
};

export function assignPersonalities(g) {
  g.ai = {};
  for (const id of REGION_IDS) {
    if (id === g.playerId) continue;
    const pool = BIAS[id];
    let pick = pool[Math.floor(Math.random() * pool.length)];
    if (g.difficulty === 'easy' && pick === 'industrialist') pick = 'balanced';
    if (g.difficulty === 'hard' && pick === 'green') pick = Math.random() < 0.5 ? 'balanced' : 'opportunist';
    g.ai[id] = { personality: pick, pressure: 0 };
    g.regions[id].stance = PERSONALITIES[pick].stance;
  }
}

export function personalityLabel(g, id) {
  return g.ai && g.ai[id] ? PERSONALITIES[g.ai[id].personality].label : 'you';
}
export function aggressionOf(g, id) {
  return g.ai && g.ai[id] ? PERSONALITIES[g.ai[id].personality].aggression : 1;
}

export function applyDiplomacy(g) {
  const summits = g.regions[g.playerId].spent.summit || 0;
  for (const id of REGION_IDS) {
    if (id === g.playerId) continue;
    g.ai[id].pressure = Math.min(1.2, g.ai[id].pressure * 0.5 + summits * 0.3);
  }
}

const pickWeighted = (entries) => {
  const total = entries.reduce((s, [, w]) => s + w, 0);
  let x = Math.random() * total;
  for (const [k, w] of entries) { x -= w; if (x <= 0) return k; }
  return entries[entries.length - 1][0];
};

export function aiTakeTurns(g) {
  applyDiplomacy(g);
  const dc = degconLevel(g.temp);
  for (const id of REGION_IDS) {
    if (id === g.playerId) continue;
    const r = g.regions[id]; if (r.failed) continue;
    const ai = g.ai[id];
    const p = { ...PERSONALITIES[ai.personality] };

    // panic: a hot world radicalizes even industrialists
    const panic = { 5: 0, 4: 0.05, 3: 0.16, 2: 0.38, 1: 0.6 }[dc];
    p.mit += panic * (g.difficulty === 'hard' ? 0.55 : g.difficulty === 'easy' ? 1.25 : 1);
    if (r.turnDeaths > r.pop * 0.004) p.ada += 0.3;
    if (r.stability < 45) p.ada += 0.2;
    p.mit += ai.pressure * 0.5;

    // stance shifts under strain: even open doors close when camps overflow,
    // and fortresses crack open when they need workers
    const base = PERSONALITIES[ai.personality].stance;
    if (base === 'open' && r.stability < 45) r.stance = 'selective';
    else if (base === 'closed' && r.stability > 70 && r.pop < r.pop0 * 0.95) r.stance = 'selective';
    else r.stance = base;

    // security appetite from hottest rivalry
    const riv = hottestRivalry(g, id);
    const scared = riv.tension > 45;
    const m = REGIONS[id];
    const wantsAdapt = () => {
      const gaps = [['heat', m.vuln.heat], ['food', m.vuln.food], ['coast', m.vuln.coast], ['migrate', 0.3]]
        .map(([k, v]) => [k, v * (11 - r.adapt[k])]);
      return pickWeighted(gaps);
    };
    let guard = 24;
    while (r.budget > 0 && guard-- > 0) {
      const cat = pickWeighted([['mit', p.mit], ['ada', p.ada], ['eco', p.eco], ['dip', p.dip]]);
      let key = null;
      if (cat === 'mit') key = pickWeighted([['renew', 3], ['industry', 1.4], ['capture', 1]]);
      else if (cat === 'ada') key = wantsAdapt();
      else if (cat === 'eco') key = pickWeighted([['invest', 2.2], ['research', 1]]);
      else {
        // diplomacy/security: hawks arm, doves talk, everyone helps sometimes
        const hawk = p.aggression * (scared ? 2.2 : 0.8);
        const dove = (2 - p.aggression) * (riv.tension > 55 ? 2.4 : 1);
        key = pickWeighted([['military', hawk], ['peace', dove], ['aid', 1]]);
      }
      if (!canBuy(g, id, key) || buy(g, id, key) === null) {
        const opts = Object.keys(ACTIONS).filter(k => canBuy(g, id, k));
        if (!opts.length) break;
        buy(g, id, opts.sort((a, b) => ACTIONS[a].cost - ACTIONS[b].cost)[0]);
      }
    }
  }
  // aggressive AIs stoke their rivalries a little every turn
  for (const id of REGION_IDS) {
    if (id === g.playerId || g.regions[id].failed) continue;
    const agg = aggressionOf(g, id);
    if (agg > 1) for (const n of NEIGHBORS[id]) {
      g.tension[pairKey(id, n)] += (agg - 1) * 3;
    }
  }
}
