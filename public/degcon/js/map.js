// Canvas world map: DEFCON-style glowing vector rendering, pan/zoom (touch +
// mouse), disaster rings, migration arcs.
import { COUNTRIES } from './worldmap-data.js';
import { REGIONS, REGION_IDS } from './sim.js';

const LON_MIN = -180, LON_MAX = 180, LAT_MIN = -58, LAT_MAX = 84;

export class WorldMap {
  constructor(canvas) {
    this.cv = canvas;
    this.cx = canvas.getContext('2d');
    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    this.view = { x: 0, y: 0, k: 1 };   // pan offset (css px) + zoom
    this.effects = [];                   // transient rings / arcs
    this.selected = null;
    this.playerId = null;
    this.stress = {};                    // region id -> 0..1 heat tint
    this.failed = {};
    this.onTapRegion = null;
    this.time = 0;
    this._buildGeometry();
    this._bindInput();
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  _buildGeometry() {
    // pre-flatten into typed arrays of unprojected map units (x: 0..360, y: 0..142)
    this.polys = [];
    for (const c of COUNTRIES) {
      for (const ring of c.p) {
        const pts = new Float32Array(ring.length * 2);
        for (let i = 0; i < ring.length; i++) {
          pts[i * 2] = ring[i][0] - LON_MIN;
          pts[i * 2 + 1] = LAT_MAX - ring[i][1];
        }
        this.polys.push({ region: c.r, pts, name: c.n });
      }
    }
    this.mapW = LON_MAX - LON_MIN;      // 360
    this.mapH = LAT_MAX - LAT_MIN;      // 142
  }

  resize() {
    const { cv, dpr } = this;
    const w = cv.clientWidth || window.innerWidth;
    const h = cv.clientHeight || window.innerHeight;
    cv.width = Math.round(w * dpr);
    cv.height = Math.round(h * dpr);
    this.w = w; this.h = h;
    this.fitWorld();
  }

  fitWorld() {
    // fit with margin; map area avoids HUD (top ~90px) and dock (bottom ~200px on tall screens)
    const padTop = 84, padBottom = Math.min(230, this.h * 0.32), pad = 10;
    const availW = this.w - pad * 2, availH = Math.max(120, this.h - padTop - padBottom);
    this.baseScale = Math.min(availW / this.mapW, availH / this.mapH);
    this.view.k = 1;
    this.view.x = (this.w - this.mapW * this.baseScale) / 2;
    this.view.y = padTop + (availH - this.mapH * this.baseScale) / 2;
    this.minK = 0.8; this.maxK = 8;
    // portrait: the width-fit map is a thin band — zoom to use the height,
    // centered on the player's region (still pannable to see the world)
    if (this.h > this.w * 1.1) {
      const k = Math.min(2.4, Math.max(1, (availH / (this.mapH * this.baseScale)) * 0.96));
      this.view.k = k;
      const s = this.baseScale * k;
      const focusLon = this.playerId ? REGIONS[this.playerId].label[0] : 10;
      const focusLat = this.playerId ? REGIONS[this.playerId].label[1] : 20;
      this.view.x = this.w / 2 - (focusLon - LON_MIN) * s;
      this.view.x = Math.min(0, Math.max(this.w - this.mapW * s, this.view.x));
      this.view.y = padTop + availH / 2 - (LAT_MAX - Math.min(focusLat + 8, 60)) * s;
      this.view.y = Math.min(padTop, Math.max(padTop + availH - this.mapH * s, this.view.y));
    }
  }

  // map units -> screen css px
  toScreen(mx, my) {
    const s = this.baseScale * this.view.k;
    return [this.view.x + mx * s, this.view.y + my * s];
  }
  lonLatToScreen(lon, lat) {
    return this.toScreen(lon - LON_MIN, LAT_MAX - lat);
  }
  toMap(sx, sy) {
    const s = this.baseScale * this.view.k;
    return [(sx - this.view.x) / s, (sy - this.view.y) / s];
  }

  _bindInput() {
    const cv = this.cv;
    const ptrs = new Map();
    let pinch0 = null, moved = false, downAt = null;
    cv.addEventListener('pointerdown', e => {
      cv.setPointerCapture(e.pointerId);
      ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
      moved = false; downAt = { x: e.clientX, y: e.clientY };
      if (ptrs.size === 2) {
        const [a, b] = [...ptrs.values()];
        pinch0 = { d: Math.hypot(a.x - b.x, a.y - b.y), k: this.view.k,
          cx: (a.x + b.x) / 2, cy: (a.y + b.y) / 2 };
      }
    });
    cv.addEventListener('pointermove', e => {
      if (!ptrs.has(e.pointerId)) return;
      const prev = ptrs.get(e.pointerId);
      const dx = e.clientX - prev.x, dy = e.clientY - prev.y;
      ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (ptrs.size === 1) {
        if (Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y) > 6) moved = true;
        if (moved) { this.view.x += dx; this.view.y += dy; }
      } else if (ptrs.size === 2 && pinch0) {
        moved = true;
        const [a, b] = [...ptrs.values()];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        const cx = (a.x + b.x) / 2, cy = (a.y + b.y) / 2;
        this._zoomAt(cx, cy, pinch0.k * (d / pinch0.d) / this.view.k);
        this.view.x += cx - pinch0.cx; this.view.y += cy - pinch0.cy;
        pinch0.cx = cx; pinch0.cy = cy;
      }
    });
    const up = e => {
      ptrs.delete(e.pointerId);
      if (ptrs.size < 2) pinch0 = null;
      if (ptrs.size === 0 && !moved && downAt) {
        this._tap(e.clientX, e.clientY);
      }
      downAt = null;
    };
    cv.addEventListener('pointerup', up);
    cv.addEventListener('pointercancel', e => { ptrs.delete(e.pointerId); if (ptrs.size < 2) pinch0 = null; });
    cv.addEventListener('wheel', e => {
      e.preventDefault();
      this._zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.0012));
    }, { passive: false });
  }

  _zoomAt(sx, sy, factor) {
    const k2 = Math.min(this.maxK, Math.max(this.minK, this.view.k * factor));
    const real = k2 / this.view.k;
    this.view.x = sx - (sx - this.view.x) * real;
    this.view.y = sy - (sy - this.view.y) * real;
    this.view.k = k2;
  }

  _tap(sx, sy) {
    const [mx, my] = this.toMap(sx, sy);
    let hit = null;
    for (const poly of this.polys) {
      if (pointInPoly(mx, my, poly.pts)) { hit = poly.region; break; }
    }
    if (this.onTapRegion) this.onTapRegion(hit);
  }

  // ---- effects ----------------------------------------------------------
  addBlast(lon, lat, color) {
    this.effects.push({ t: 0, dur: 2.6, kind: 'blast', lon, lat, color });
  }
  addArc(fromId, toId, color) {
    const a = REGIONS[fromId].label, b = REGIONS[toId].label;
    this.effects.push({ t: 0, dur: 3.6, kind: 'arc',
      x1: a[0], y1: a[1], x2: b[0], y2: b[1], color: color || '#ffd24f' });
  }
  addPulse(regionId, color) {
    const l = REGIONS[regionId].label;
    this.effects.push({ t: 0, dur: 2.2, kind: 'blast', lon: l[0], lat: l[1], color });
  }

  // ---- rendering --------------------------------------------------------
  draw(dt) {
    this.time += dt;
    const { cx, dpr } = this;
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx.clearRect(0, 0, this.w, this.h);

    // deep background gradient
    const bg = cx.createRadialGradient(this.w / 2, this.h / 2, 0, this.w / 2, this.h / 2, Math.max(this.w, this.h) * 0.75);
    bg.addColorStop(0, '#071322'); bg.addColorStop(1, '#03060c');
    cx.fillStyle = bg; cx.fillRect(0, 0, this.w, this.h);

    this._grid(cx);
    this._countries(cx);
    this._labels(cx);
    this._drawEffects(cx, dt);
  }

  _grid(cx) {
    cx.strokeStyle = 'rgba(35,72,110,0.22)';
    cx.lineWidth = 1;
    cx.beginPath();
    for (let lon = -180; lon <= 180; lon += 20) {
      const [x, y0] = this.lonLatToScreen(lon, LAT_MAX);
      const [, y1] = this.lonLatToScreen(lon, LAT_MIN);
      cx.moveTo(x, y0); cx.lineTo(x, y1);
    }
    for (let lat = -40; lat <= 80; lat += 20) {
      const [x0, y] = this.lonLatToScreen(LON_MIN, lat);
      const [x1] = this.lonLatToScreen(LON_MAX, lat);
      cx.moveTo(x0, y); cx.lineTo(x1, y);
    }
    cx.stroke();
  }

  _countries(cx) {
    const s = this.baseScale * this.view.k;
    // pass 1: region fills (subtle tint, stronger for player + selection + stress)
    for (const poly of this.polys) {
      const rid = poly.region;
      const col = REGIONS[rid].color;
      const stress = this.stress[rid] || 0;
      let alpha = 0.055;
      if (rid === this.playerId) alpha = 0.13;
      if (rid === this.selected) alpha = 0.2;
      cx.beginPath();
      this._path(cx, poly.pts, s);
      cx.fillStyle = hexA(col, alpha);
      cx.fill();
      if (stress > 0.02) {
        const flicker = 0.5 + 0.5 * Math.sin(this.time * 2.4 + poly.pts[0]);
        cx.fillStyle = hexA('#ff4a2a', Math.min(0.34, stress * 0.34) * (0.7 + 0.3 * flicker));
        cx.fill();
      }
      if (this.failed[rid]) {
        cx.fillStyle = 'rgba(2,4,8,0.5)';
        cx.fill();
      }
    }
    // pass 2: glow stroke, then crisp stroke
    for (const pass of [
      { lw: 2.6, blur: 8, aMul: 0.5 },
      { lw: 1.05, blur: 0, aMul: 1 },
    ]) {
      for (const poly of this.polys) {
        const rid = poly.region;
        const col = REGIONS[rid].color;
        const boost = rid === this.selected ? 1 : rid === this.playerId ? 0.85 : 0.55;
        cx.beginPath();
        this._path(cx, poly.pts, s);
        cx.strokeStyle = hexA(col, Math.min(1, boost * pass.aMul));
        cx.lineWidth = pass.lw * (rid === this.selected || rid === this.playerId ? 1.15 : 1);
        cx.shadowBlur = pass.blur ? pass.blur * (this.dpr > 1 ? 1 : 0.8) : 0;
        cx.shadowColor = col;
        cx.stroke();
      }
    }
    cx.shadowBlur = 0;
  }

  _path(cx, pts, s) {
    cx.moveTo(this.view.x + pts[0] * s, this.view.y + pts[1] * s);
    for (let i = 2; i < pts.length; i += 2) {
      cx.lineTo(this.view.x + pts[i] * s, this.view.y + pts[i + 1] * s);
    }
    cx.closePath();
  }

  _labels(cx) {
    cx.textAlign = 'center';
    const fs = Math.max(9, Math.min(13, 10 * Math.sqrt(this.view.k)));
    cx.font = `700 ${fs}px ui-monospace, Menlo, Consolas, monospace`;
    for (const rid of REGION_IDS) {
      const m = REGIONS[rid];
      const [x, y] = this.lonLatToScreen(m.label[0], m.label[1]);
      if (x < -80 || x > this.w + 80 || y < 0 || y > this.h) continue;
      const col = m.color;
      cx.fillStyle = hexA(col, rid === this.playerId || rid === this.selected ? 0.95 : 0.6);
      cx.shadowBlur = 6; cx.shadowColor = col;
      const txt = this.failed[rid] ? '✕ ' + m.short : m.short;
      cx.fillText(txt, x, y);
      if (rid === this.playerId) {
        cx.font = `400 ${fs * 0.72}px ui-monospace, Menlo, Consolas, monospace`;
        cx.fillText('— YOUR COMMAND —', x, y + fs + 2);
        cx.font = `700 ${fs}px ui-monospace, Menlo, Consolas, monospace`;
      }
    }
    cx.shadowBlur = 0;
  }

  _drawEffects(cx, dt) {
    for (const e of this.effects) e.t += dt;
    this.effects = this.effects.filter(e => e.t < e.dur);
    for (const e of this.effects) {
      const p = e.t / e.dur;
      if (e.kind === 'blast') {
        const [x, y] = this.lonLatToScreen(e.lon, e.lat);
        const rMax = 26 * Math.sqrt(this.view.k);
        cx.strokeStyle = hexA(e.color, (1 - p) * 0.9);
        cx.lineWidth = 2;
        cx.shadowBlur = 10; cx.shadowColor = e.color;
        for (const ring of [p, Math.max(0, p - 0.18), Math.max(0, p - 0.36)]) {
          if (ring <= 0) continue;
          cx.beginPath();
          cx.arc(x, y, ring * rMax, 0, Math.PI * 2);
          cx.stroke();
        }
        cx.shadowBlur = 0;
        cx.fillStyle = hexA(e.color, (1 - p) * 0.8);
        cx.beginPath(); cx.arc(x, y, 2.5, 0, Math.PI * 2); cx.fill();
      } else if (e.kind === 'arc') {
        const [x1, y1] = this.lonLatToScreen(e.x1, e.y1);
        const [x2, y2] = this.lonLatToScreen(e.x2, e.y2);
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - Math.hypot(x2 - x1, y2 - y1) * 0.28;
        const head = Math.min(1, p * 1.5);         // arc grows in
        const fade = p > 0.75 ? (1 - p) / 0.25 : 1;
        cx.strokeStyle = hexA(e.color, 0.55 * fade);
        cx.lineWidth = 1.4;
        cx.setLineDash([5, 5]);
        cx.lineDashOffset = -this.time * 26;
        cx.beginPath();
        cx.moveTo(x1, y1);
        // draw partial quadratic by subdividing
        for (let i = 1; i <= Math.floor(24 * head); i++) {
          const t = i / 24;
          const qx = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * mx + t * t * x2;
          const qy = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * my + t * t * y2;
          cx.lineTo(qx, qy);
        }
        cx.stroke();
        cx.setLineDash([]);
        // moving particle
        const t = Math.min(1, p * 1.25) % 1;
        const qx = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * mx + t * t * x2;
        const qy = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * my + t * t * y2;
        cx.fillStyle = hexA(e.color, 0.95 * fade);
        cx.shadowBlur = 8; cx.shadowColor = e.color;
        cx.beginPath(); cx.arc(qx, qy, 2.4, 0, Math.PI * 2); cx.fill();
        cx.shadowBlur = 0;
      }
    }
  }
}

function pointInPoly(x, y, pts) {
  let inside = false;
  const n = pts.length / 2;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = pts[i * 2], yi = pts[i * 2 + 1];
    const xj = pts[j * 2], yj = pts[j * 2 + 1];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function hexA(hex, a) {
  const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}
