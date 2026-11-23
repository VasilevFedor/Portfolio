"use client";
/* eslint-disable -- Vendored reference renderer; preserve its coupled sampling and fluid simulation. */
/**
 * Adapted from the public AsciiSkyCanvas renderer at https://unvalley.me/
 * Reference asset revision: 69705852e5 (2026-11-16).
 * Integration changes: local assets, theme palettes through project tokens,
 * and the portfolio canvas class. Keep the original glyph selection, two cloud
 * layers, noise advection, and pointer fluid field together for visual fidelity.
 */
import * as e from "react/jsx-runtime";
import * as r from "react";

const cssToken = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
const rgbToken = (name) => {
  const value = cssToken(name);
  if (value.startsWith("#")) {
    const hex = value.length === 4 ? [...value.slice(1)].map(c => c + c).join("") : value.slice(1);
    return [0, 2, 4].map(offset => Number.parseInt(hex.slice(offset, offset + 2), 16));
  }
  return value.match(/[\d.]+/g).slice(0, 3).map(Number);
};
let cachedPalette;
function cloudPalette() {
  return cachedPalette ??= {
    skyBlue: rgbToken("--sky-blue"),
    inside: " .:;o8%@",
    tile: [0, 1, 2, 3].map(i => rgbToken(`--sky-cloud-tile-${i}`)),
    glyph: [0, 1, 2, 3].map(i => rgbToken(`--sky-cloud-glyph-${i}`)),
    edge: [0, 1, 2, 3].map(i => rgbToken(`--sky-cloud-glyph-${i}`)),
    wash: [0.2, 0.5],
  };
}

// A stable, cell-aligned torn edge: the reading area must never shimmer.
function readingMask(cols, rows, top, left, right, cw, ch) {
  const mask = new Uint8Array(cols * rows);
  for (let row = 0; row < rows; row++) {
    const leftOffset = Math.floor(a(Math.floor(row / 4), 0, 81) * 3) - 1;
    const rightOffset = Math.floor(a(Math.floor(row / 4), 0, 93) * 3) - 1;
    for (let col = 0; col < cols; col++) {
      const topOffset = Math.floor(a(Math.floor(col / 5), 0, 57) * 3) - 1;
      mask[row * cols + col] = Number(
        row >= top + topOffset && col >= left + leftOffset && col < right + rightOffset
      );
    }
  }
  // Blur only the white cutout, never the ASCII sky or the page content.
  // The extra coverage hides the binary cell boundary under the feather.
  const shape = document.createElement("canvas");
  shape.width = Math.ceil(cols * cw);
  shape.height = Math.ceil(rows * ch);
  const ink = shape.getContext("2d");
  ink.fillStyle = cssToken("--background");
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (mask[row * cols + col]) ink.fillRect(col * cw - 16, row * ch - 16, cw + 32, ch + 32);
    }
  }
  const feather = document.createElement("canvas");
  feather.width = shape.width;
  feather.height = shape.height;
  const featherContext = feather.getContext("2d");
  featherContext.filter = "blur(8px)";
  featherContext.drawImage(shape, 0, 0);
  mask.feather = feather;
  return mask;
}



        function l(t) { let e = t; return e ^= e >>> 16, e = Math.imul(e, 0x7feb352d), e ^= e >>> 15, e = Math.imul(e, 0x846ca68b), e ^= e >>> 16; }
        function a(t, e, r) { return (l(l(l(0 | r) ^ e) ^ t) >>> 0) / 0x100000000; }
        function n(t, e) { let r = t - Math.floor(t / e) * e; return r < 0 ? r + e : r >= e ? r - e : r; }
        let o = ".:+*ox%#@", i = [...new Set([...o, ..."-_'`,;~()8|/\\"])], s = [...".,'`-_~():;"].map(t => i.indexOf(t)), f = [..."~()"].map(t => i.indexOf(t)), c = s.map(t => .06 * !!f.includes(t)), h = [[.27, .2], [.73, .2], [.27, .5], [.73, .5], [.27, .8], [.73, .8]], u = (t, e, r) => { let l = Math.min(1, Math.max(0, (r - t) / (e - t))); return l * l * (3 - 2 * l); }, d = t => [Number.parseInt(t.slice(1, 3), 16), Number.parseInt(t.slice(3, 5), 16), Number.parseInt(t.slice(5, 7), 16)], m = { get light() { return cloudPalette(); }, get dark() { return cloudPalette(); } }, p = [[.45, 23, 0], [.25, 8.7, 1.1]];
        function g(t, e, r = 0) { let l = t; for (let [e, a, n] of p) {
            let o = 2 * Math.PI / a;
            l += e / o * (Math.sin(o * (t - r) + n) - Math.sin(n));
        } return l * e; }
        let x = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", M = [1.6, 2.2, 2.8, 3.4], w = i.length;
        function y(t, e) { var r; let l, a, n, o, s, f = 1.5 * t, c = Math.ceil(t * e), h = Math.ceil(f * e), u = document.createElement("canvas"); u.width = c * (i.length + M.length), u.height = h; let d = u.getContext("2d", { willReadFrequently: !0 }); if (!d)
            return { canvas: u, gw: c, gh: h, ctx: null }; d.fillStyle = cssToken("--background"), d.textBaseline = "alphabetic"; let m = (r = function (t) { t.font = `bold 100px ${x}`; let e = 0, r = 0, l = 0, a = 0; for (let n of i) {
            let o = t.measureText(n);
            e = Math.max(e, o.actualBoundingBoxAscent), r = Math.max(r, o.actualBoundingBoxDescent), l = Math.max(l, o.actualBoundingBoxLeft), a = Math.max(a, o.actualBoundingBoxRight);
        } return { up: e, down: r, left: l, right: a }; }(d), l = t - 1 - 1, a = f - 1 - 1, n = r.left + r.right, { size: 100 * (s = Math.min(l / n, a / (o = r.up + r.down))), x: 1.5 + (l - n * s) / 2 + r.left * s, y: 1.5 + (a - o * s) / 2 + r.up * s }); d.font = `bold ${m.size * e}px ${x}`; let p = +e; return i.forEach((t, r) => { d.save(), d.beginPath(), d.rect(r * c + p, p, c - p, h - p), d.clip(), d.fillText(t, r * c + m.x * e, m.y * e), d.restore(); }), M.forEach((r, l) => { let a = Math.max(1, Math.round(r * t / 8 * e)), n = (w + l) * c + Math.round(.62 * c - a / 2), o = Math.round(.66 * h - a / 2); d.fillRect(n, o, a, a); }), { canvas: u, gw: c, gh: h, ctx: d }; }
        let b = 12;
        function v(t, e, r, l) { let a = t * e; return { cols: t, rows: e, cw: r, ch: l, vx: new Float32Array(a), vy: new Float32Array(a), dx: new Float32Array(a), dy: new Float32Array(a), glow: new Float32Array(a), spare: new Float32Array(a), pointer: { x: 0, y: 0, t: 0, on: !1 }, gusts: new Float64Array(4 * b).fill(-1), puffs: 0, stirred: !1 }; }
        function A(t) { t.pointer.on = !1; }
        let j = (t, e, r) => { let l = Math.min(1, Math.max(0, (r - t) / (e - t))); return l * l * (3 - 2 * l); };
        function C(t, e, r, l) { let { cols: a, rows: n, spare: o } = t, i = 1 - r, s = r / 4, f = a - 1; for (let t = 0; t < n; t++) {
            let r = t * a, c = r + f, h = t > 0 ? -a : 0, u = t < n - 1 ? a : 0, d = e[r];
            o[r] = (d * i + (d + e[r + 1] + e[r + h] + e[r + u]) * s) * l;
            for (let t = r + 1; t < c; t++)
                d = e[t], o[t] = (d * i + (e[t - 1] + e[t + 1] + e[t + h] + e[t + u]) * s) * l;
            d = e[c], o[c] = (d * i + (e[c - 1] + d + e[c + h] + e[c + u]) * s) * l;
        } e.set(o); }
        let E = 1 / 60, k = t => { let e = t.getContext("2d"); if (!e)
            throw Error("no 2d context"); return e; }, I = new Float64Array(4097);
        for (let t = 0; t <= 4096; t++)
            I[t] = Math.sin(t / 4096 * Math.PI * 2);
        let O = 4096 / (2 * Math.PI), F = { get light() { return rgbToken("--sky-wind"); }, get dark() { return rgbToken("--sky-wind"); } }, $ = i.indexOf("-"), S = i.indexOf("~"), B = i.indexOf("|"), P = i.indexOf("/"), L = i.indexOf("\\"), R = () => document.documentElement.dataset.theme === "dark" ? "dark" : "light";
        async function q(t) { let e = await (await fetch(t)).blob(), r = await createImageBitmap(e, { colorSpaceConversion: "none", premultiplyAlpha: "none" }), l = document.createElement("canvas"); l.width = r.width, l.height = r.height; let a = l.getContext("2d", { willReadFrequently: !0 }); if (!a)
            throw Error("no 2d context"); return a.drawImage(r, 0, 0), { pixels: a.getImageData(0, 0, r.width, r.height).data, width: r.width, height: r.height }; }
        async function loadSkyAssets(assets) {
            const [light, near, far] = await Promise.all([q(assets.light), q(assets.near), q(assets.far)]);
            return [assets.text, light, light, near, far];
        }
        export default function ReferenceSky({ assets }) { let t = (0, r.useRef)(null); return (0, r.useEffect)(() => { let e = t.current; if (!e)
                return; let r = null, l = !0; return (async () => { var t; let f, d, p, x, D, T, U, z, G, K, X, Y, _, V, W, Z, H, J, Q, tt, te, tr, tl, ta, tn, to, ti, ts, tf, tc, th, tu, td, [tm, tp, tg, tx, tM] = await loadSkyAssets(assets), tw = function () { let t = y(8, 8); if (!t.ctx)
                return null; let e = t.ctx.getImageData(0, 0, t.canvas.width, t.gh).data; var r = i.map((r, l) => { let a = new Uint8ClampedArray(t.gw * t.gh); for (let r = 0; r < t.gh; r++)
                for (let n = 0; n < t.gw; n++)
                    a[r * t.gw + n] = e[(r * t.canvas.width + l * t.gw + n) * 4 + 3]; return function (t, e, r) { let l = new Float32Array(6), a = .24 * e; for (let n = 0; n < 6; n++) {
                let o = h[n][0] * e, i = h[n][1] * r, s = 0, f = 0;
                for (let l = Math.floor(i - a); l <= Math.ceil(i + a); l++)
                    for (let n = Math.floor(o - a); n <= Math.ceil(o + a); n++)
                        !((n + .5 - o) ** 2 + (l + .5 - i) ** 2 > a * a) && (f++, n >= 0 && l >= 0 && n < e && l < r && (s += t[(l * e + n) * 1 + 0] / 255));
                l[n] = f ? s / f : 0;
            } return l; }(a, t.gw, t.gh); }); let l = new Float32Array(6 * i.length), a = new Float32Array(6); for (let t of r)
                for (let e = 0; e < 6; e++)
                    a[e] = Math.max(a[e], t[e]); return r.forEach((t, e) => { for (let r = 0; r < 6; r++)
                l[6 * e + r] = a[r] ? t[r] / a[r] : 0; }), l; }(); if (!l || !tw)
                return; cachedPalette = undefined; let ty = function (t) { let { still: e, shapes: r, near: l, far: f } = t, { columns: d, rows: p } = e, x = new Float32Array(d * p); e.text.split("\n").forEach((t, e) => { if (!(e >= p))
                for (let r = 0; r < Math.min(d, t.length); r++)
                    x[e * d + r] = Math.max(0, o.indexOf(t[r])) / (o.length - 1); }); let M = (t, e, r, l) => { let { pixels: a, width: o, height: i } = t, s = n(e / 2, o) - .5, f = Math.min(i - 1.001, Math.max(0, r / 2 - .5)), c = Math.floor(s), h = Math.floor(f), u = s - c, d = f - h, m = c < 0 ? c + o : c, p = m + 1 === o ? 0 : m + 1, g = (h * o + m) * 4, x = (h * o + p) * 4, M = g + 4 * o, w = x + 4 * o, y = (1 - u) * (1 - d), b = u * (1 - d), v = (1 - u) * d, A = u * d; l[0] = a[g] * y + a[x] * b + a[M] * v + a[w] * A, l[1] = a[g + 1] * y + a[x + 1] * b + a[M + 1] * v + a[w + 1] * A; }, w = (t, e, r) => { let { pixels: l, width: a, height: n } = t, o = new Uint8Array(a * n), i = new Uint8Array(a * n), s = Math.max(a, n), f = new Uint8Array(s), c = new Uint8Array(s), h = new Uint8Array(s + 2 * Math.max(e, r)), u = new Uint8Array(h.length), d = new Uint8Array(h.length), m = (t, e, r) => { let l = 2 * e + 1, a = t + 2 * e; for (let n = 0; n < a; n++) {
                let a = n - e;
                h[n] = a >= 0 && a < t ? f[a] : r ? f[(a + t * l) % t] : 0;
            } for (let t = 0; t < a; t++)
                u[t] = t % l == 0 ? h[t] : Math.max(u[t - 1], h[t]); for (let t = a - 1; t >= 0; t--)
                d[t] = t === a - 1 || (t + 1) % l == 0 ? h[t] : Math.max(d[t + 1], h[t]); for (let e = 0; e < t; e++)
                c[e] = Math.max(d[e], u[e + l - 1]); }; for (let t = 0; t < n; t++) {
                for (let e = 0; e < a; e++)
                    f[e] = l[(t * a + e) * 4 + 1];
                m(a, e, !0), o.set(c.subarray(0, a), t * a);
            } for (let t = 0; t < a; t++) {
                for (let e = 0; e < n; e++)
                    f[e] = o[e * a + t];
                m(n, r, !1);
                for (let e = 0; e < n; e++)
                    i[e * a + t] = c[e];
            } return i; }, y = (t, e) => w(t, 6 + Math.ceil(36 * e / 2), 6 + Math.ceil(17 * e / 2)), b = w(l, 6, 6), v = w(f, 6, 6), A = y(l, 1), j = y(f, .6), C = (t, e, r, l) => { let { width: a, height: o } = t, i = n(Math.floor(r / 2), a); return e[Math.min(o - 1, Math.max(0, Math.floor(l / 2))) * a + i]; }, E = (t => { let e = new Float32Array(256); for (let r = 0; r < 256; r++)
                e[r] = t(r); return e; })(t => u(.2, .7, t / 255)), k = { light: [...m.light.inside].map(t => i.indexOf(t)), dark: [...m.dark.inside].map(t => i.indexOf(t)) }, I = new Float32Array(6), O = [0, 0, 0], F = new Float32Array(2), $ = new Float32Array(2), S = (t, e, r, l) => { let a = Math.min(t.length - 1.0001, Math.max(0, e) * (t.length - 1)), n = Math.floor(a), o = a - n; for (let e = 0; e < 3; e++)
                r[l + e] = t[n][e] + (t[n + 1][e] - t[n][e]) * o; }, B = function () { let t = 7, e = () => { let e = t = t + 0x6d2b79f5 >>> 0; return e = Math.imul(e ^ e >>> 15, 1 | e), (((e ^= e + Math.imul(e ^ e >>> 7, 61 | e)) ^ e >>> 14) >>> 0) / 0x100000000; }, r = new Float32Array(65536), l = t => t * t * t * (t * (6 * t - 15) + 10); for (let [t, a] of [[8, 1], [16, .5]]) {
                let n = Array.from({ length: t * t * 4 }, () => 2 * e() - 1), o = 128 / t;
                for (let e = 0; e < 128; e++)
                    for (let i = 0; i < 128; i++) {
                        let s = i / o, f = e / o, c = Math.floor(s), h = Math.floor(f), u = l(s - c), d = l(f - h), m = (c + 1) % t, p = (h + 1) % t;
                        for (let l = 0; l < 4; l++) {
                            let o = n[(h * t + c) * 4 + l], s = n[(h * t + m) * 4 + l], f = n[(p * t + c) * 4 + l], g = n[(p * t + m) * 4 + l];
                            r[(128 * e + i) * 4 + l] += a * (o + (s - o) * u + (f - o + (g - f - s + o) * u) * d);
                        }
                    }
            } let a = 0; for (let t of r)
                a = Math.max(a, Math.abs(t)); for (let t = 0; t < r.length; t++)
                r[t] /= a; return r; }(), P = new Float32Array(4), L = (t, e, r) => { let l = n(t, 128), a = n(e, 128), o = 0 | l, i = 0 | a, s = l - o, f = a - i, c = o + 1 === 128 ? 0 : o + 1, h = i + 1 === 128 ? 0 : i + 1, u = (128 * i + o) * 4, d = (128 * i + c) * 4, m = (128 * h + o) * 4, p = (128 * h + c) * 4; for (let t = 0; t < 4; t++) {
                let e = B[u + t] + (B[d + t] - B[u + t]) * s, l = B[m + t] + (B[p + t] - B[m + t]) * s;
                r[t] = e + (l - e) * f;
            } }, R = 0, N = 0, q = 0, D = (t, e, r, l, a) => { let n = 16 / r; L((t + 14 * R) * n / 240 + l, (e + -3 * R) * n / 120 + .7 * l, P); let o = 28 * P[0], i = 12 * P[1], s = P[2], f = P[3]; L((t + -16 * R) * n / 90 + 61.3 + l, (e + 4 * R) * n / 30 + 17.9 + l, P), a[0] = (o + 8 * P[0]) * r, a[1] = (i + 5 * P[1]) * r, a[2] = .55 * Math.max(-1, Math.min(1, .6 * f + .7 * P[2])), a[3] = .14 * s * 255; }, T = new Float32Array(4), U = new Float32Array(4), z = (t, e) => { let r = t / 255, l = (r + 4 * e * r * (1 - r)) * 255; return E[l < 0 ? 0 : l > 255 ? 255 : 0 | l]; }, G = (t, e) => { let r = t + e; return r < 0 ? 0 : r > 255 ? 255 : 0 | r; }; return { at: t => { R = t, N = g(t, 18), q = g(t, 8, 3); }, cell: (t, o, i, g, w, y, E = -1, B = 0, P = 0) => { let L, R = t + i / 2, K = o + g / 2, X = (L = n(Math.floor(R / e.cw), d), Math.min(p - 1, Math.max(0, Math.floor(K / e.ch))) * d + L), Y = e.rgb[w]; t -= B, o -= P; let _ = R - B, V = K - P, W = C(l, A, _ - N, V) >= 3, Z = C(f, j, _ - q, V) >= 3; W && (D(_ - N, V, 1, 0, T), W = C(l, b, _ - N + T[0], V + T[1]) >= 3), Z && (D(_ - q, V, .6, 37.1, U), Z = C(f, v, _ - q + U[0], V + U[1]) >= 3); let H = m[w];
                // Preserve the source map's tonal variation in the night palette.
                const nightTone = 0.55 + Y[4 * X] / 255;
                for (let channel = 0; channel < 3; channel++) {
                    y[channel] = y[4 + channel] = w === "dark" ? H.skyBlue[channel] * nightTone : Y[4 * X + channel];
                }
                y[3] = x[X]; let J = H.wash[0] + (H.wash[1] - H.wash[0]) * x[X]; if (y[7] = J, !W && !Z)
                    return -3; let Q = 0, tt = 1, te = 0, tr = 0, tl = 0, ta = 0, tn = 0, to = 0, ti = 0; for (let e = 0; e < 6; e++) {
                    let r = t + h[e][0] * i, a = o + h[e][1] * g;
                    W && (M(l, r - N + T[0], a + T[1], F), ta = z(F[1], T[2]), to = G(F[0], T[3])), Z && (M(f, r - q + U[0], a + U[1], $), tn = z($[1], U[2]), ti = G($[0], U[3]));
                    let n = ta + tn * (1 - ta);
                    I[e] = .7 * n, tt = Math.min(tt, n), te = Math.max(te, n), Q += n, tl += ta, tr += (ta * to + tn * (1 - ta) * ti) / 255;
                } if (te < .14)
                    return -3; let ts = Q > 0 ? tr / Q : 0, tf = Q / 6, tc = tl >= .5 * Q, th = Math.floor((_ - (tc ? N : q)) / i), tu = Math.floor(V / g), td = tf >= .6 && tt >= .3; S(H.tile, ts, O, 0); let tm = (td ? u(.55, .9, tf) : .8 * u(.15, .9, tf)) * (tc ? 1 : .85), tp = tm + (1 - tm) * J; for (let t = 0; t < 3; t++)
                    y[4 + t] = (tm * O[t] + (1 - tm) * J * y[4 + t]) / tp; if (y[7] = tp, td) {
                    let t, e, r;
                    S(H.glyph, ts, y, 0);
                    let l = (a(th, tu, tc ? 3 : 5) - .5) * 1.5;
                    return e = ts ** 1.35 * ((t = k[w]).length - .5) + l, (r = E < 0 ? -1 : t.indexOf(E)) >= 0 && .8 > Math.abs(r + .5 - e) ? E : t[Math.min(t.length - 1, Math.max(0, Math.floor(e)))];
                } let tg = (t => { let e = -1, l = 0; for (let t = 0; t < 6; t++)
                    l += I[t] * I[t]; let a = -1 === t ? l : 1 / 0; for (let n = 0; n < s.length; n++) {
                    let o = s[n], i = c[n], f = 6 * o;
                    for (let t = 0; t < 6; t++) {
                        let e = r[f + t] - I[t];
                        i += e * e;
                    }
                    o === t && (a = i), i < l && (l = i, e = o);
                } return a <= l + .1 ? t : e; })(E); return tg < 0 ? I[5] < .35 * .7 ? -3 : -1 : (S(H.edge, ts, y, 0), tg); } }; }({ still: { columns: 400, rows: 70, cw: 6, ch: 10, text: tm, rgb: { light: tp.pixels, dark: tg.pixels } }, near: tx, far: tM, shapes: tw }); t = 2400, f = function (t) { let [e, r, l, a, n] = [document.createElement("canvas"), document.createElement("canvas"), document.createElement("canvas"), document.createElement("canvas"), document.createElement("canvas")]; return { canvas: t, ctx: k(t), mask: e, maskCtx: k(e), ink: r, inkCtx: k(r), gaps: l, gapsCtx: k(l), tint: a, tintCtx: k(a), tiles: n, tilesCtx: k(n) }; }(e), d = window.matchMedia("(prefers-reduced-motion: reduce)"), p = null, x = null, D = null, T = null, U = v(0, 0, 1, 1), z = R(), G = 0, K = 0, X = 0, Y = 60, _ = 0, V = -1 / 0, W = new Float64Array(30), Z = new Float64Array(30), H = 0, J = 0, Q = !0, tt = !1, te = !1, tr = 0, tl = t => { if (!p || !x || !D || !T)
                return; let r = function (t, e, r, l, a, n, o = -1) { let { cols: i, rows: s, cw: f, ch: c, originX: h, skyX: u, readingMask: cutout, faintRow: g } = t, { colours: x, tiles: y, shown: b, changed: v, breath: A, bandAcross: j, bandDown: C, out: E } = l, k = F[n], R = r.stirred, { vx: N, vy: q, dx: D, dy: T } = r, U = r.glow, z = M.length - 1; for (let t = 0; t < i; t++)
                j[t] = Math.sin(.09 * t + .3 * a); for (let t = 0; t < s; t++)
                C[t] = Math.sin(.15 * t - .23 * a); e.at(a); let G = 0; for (let t = 0; t < s; t++) {
                if (t >= g && -1 !== o && (1 & t) !== o)
                    continue;
                let r = t * c, l = C[t];
                for (let o = 0; o < i; o++) {
                    let d = t * i + o, g = 4 * d, C = -1;
                    if (cutout[d])
                        x[g] = x[g + 1] = x[g + 2] = x[g + 3] = 0, y[g] = y[g + 1] = y[g + 2] = y[g + 3] = 0;
                    else {
                        let t = b[d];
                        C = e.cell(h + o * f + u, r, f, c, n, E, t >= 0 && t < w ? t : -1, R ? D[d] : 0, R ? T[d] : 0);
                        let i = 1;
                        if (-3 === C) {
                            let t = .5 + .5 * function (t) { let e = t * O, r = e - 4096 * Math.floor(e / 4096), l = 0 | r, a = I[l]; return a + (I[l + 1] - a) * (r - l); }(a * A[2 * d + 1] + A[2 * d]), e = .93 + .07 * j[o] * l, r = E[3] * (M.length - .01);
                            i = (.9 + .1 * t) * e, E[7] *= e;
                            let n = R ? Math.min(1, U[d]) : 0;
                            if (C = w + Math.min(z, Math.max(0, Math.floor(r))), n > .02) {
                                i += (1 - i) * n;
                                for (let t = 0; t < 3; t++)
                                    E[t] += (k[t] - E[t]) * n;
                                let t = N[d], e = q[d];
                                C = n > .28 && Math.abs(t) + Math.abs(e) > 50 ? function (t, e, r) { let l = Math.abs(t), a = Math.abs(e); return l > 2.4 * a ? r > .7 ? S : $ : a > 2.4 * l ? B : t * e < 0 ? P : L; }(t, e, n) : w + Math.min(z, Math.floor(r + 2 * n));
                            }
                        }
                        x[g] = E[0], x[g + 1] = E[1], x[g + 2] = E[2], x[g + 3] = C < 0 ? 0 : 255 * i + .5 | 0, y[g] = E[4], y[g + 1] = E[5], y[g + 2] = E[6], y[g + 3] = 255 * E[7] + .5 | 0;
                    }
                    C !== b[d] && (b[d] = C, v[G++] = d);
                }
            } return G; }(p, ty, U, D, G, z, t); !function (t, e, r, l, a, n) { let { maskCtx: o } = t, { canvas: i, gw: s, gh: f } = e, { cols: c, left: h, across: u, top: d, down: m } = r; for (let t = 0; t < n; t++) {
                let e = a[t], r = e / c | 0, n = e - r * c, p = h[n], g = d[r], x = u[n], M = m[r];
                o.clearRect(p, g, x, M);
                let w = l[e];
                w >= 0 && o.drawImage(i, w * s, 0, s, f, p, g, x, M);
            } }(f, x, p, D.shown, D.changed, r), function (t, e, r, l) { let { ctx: a, mask: n, ink: o, inkCtx: i, gaps: s, tint: f, tintCtx: c, tiles: h, tilesCtx: u } = t, { cols: d, rows: m, cw: p, ch: g, dpr: x, originX: M } = e, w = M * x, y = d * p * x, b = m * g * x; u.putImageData(l, 0, 0), a.globalCompositeOperation = "copy", a.drawImage(h, 0, 0, d, m, w, 0, y, b), a.globalCompositeOperation = "destination-out", a.drawImage(s, 0, 0), c.putImageData(r, 0, 0), i.globalCompositeOperation = "copy", i.drawImage(n, 0, 0), i.globalCompositeOperation = "source-in", i.drawImage(f, 0, 0, d, m, w, 0, y, b), a.globalCompositeOperation = "source-over", a.drawImage(o, 0, 0), a.globalCompositeOperation = "destination-out", a.drawImage(e.readingMask.feather, w, 0, y, b), a.globalCompositeOperation = "source-over"; }(f, p, T.colours, T.tiles), te || (e.dataset.ready = "", te = !0); }, ta = () => { var r, l, n, o, i; let s = e.getBoundingClientRect(); if (s.width < 1 || s.height < 1)
                return; let c = Math.min(window.devicePixelRatio || 1, 2), h = getComputedStyle(e), u = t => Number.parseFloat(h.getPropertyValue(t)) || 0, d = function (t, e, r, l, { hero: a, column: n, faint: o }) { let i = Math.min(9, Math.max(7, Math.round(t / 170))), s = 1.5 * i, f = Math.ceil(t / 2 / i), c = t / 2 - f * i, h = 2 * f, u = Math.ceil(e / s), d = new Int32Array(h), m = new Int32Array(h); for (let t = 0; t < h; t++) {
                let e = c + t * i;
                d[t] = Math.round(e * r), m[t] = Math.round((e + i) * r) - d[t];
            } let p = new Int32Array(u), g = new Int32Array(u); for (let t = 0; t < u; t++) {
                let e = t * s;
                p[t] = Math.round(e * r), g[t] = Math.round((e + s) * r) - p[t];
            } let x = u; for (let t = 0; t < u; t++)
                if (t * s > a) {
                    x = t;
                    break;
                } let M = t / 2 - n, w = t / 2 + n, y = h, b = h; for (let t = 0; t < h; t++) {
                let e = c + t * i;
                e > M && e + i < w && (y === h && (y = t), b = t + 1);
            } y === h && (b = h); let v = o > 0 ? Math.min(u, Math.ceil(o / s)) : u; return { width: t, height: e, dpr: r, pw: Math.round(t * r), ph: Math.round(e * r), cw: i, ch: s, cols: h, rows: u, originX: c, skyX: l / 2 - t / 2, left: d, across: m, top: p, down: g, readingMask: readingMask(h, u, x, y, b, i, s), faintRow: v }; }(s.width, s.height, c, t, { hero: u("--sky-hero"), column: u("--sky-column"), faint: u("--sky-faint") }); x && d.cw === p?.cw && c === p?.dpr || (x = y(d.cw, c)), T = function (t, e) { let { canvas: r, ctx: l, mask: a, ink: n, inkCtx: o, gaps: i, gapsCtx: s, tint: f, tintCtx: c, tiles: h, tilesCtx: u } = t, { pw: d, ph: m, cols: p, rows: g, dpr: x, originX: M, cw: w, ch: y } = e; for (let t of [r, a, n, i])
                t.width = d, t.height = m; f.width = h.width = p, f.height = h.height = g, l.imageSmoothingEnabled = !1, o.imageSmoothingEnabled = !1; let b = Math.max(1, Math.round(x)); s.fillStyle = cssToken("--foreground"); for (let t = 0; t <= p; t++)
                s.fillRect(Math.round((M + t * w) * x), 0, b, m); for (let t = 0; t <= g; t++)
                s.fillRect(0, Math.round(t * y * x), d, b); return { colours: c.createImageData(p, g), tiles: u.createImageData(p, g) }; }(f, p = d), D = function (t, e, r) { let { cols: l, rows: n } = t; return { colours: e, tiles: r, shown: new Int16Array(l * n).fill(-2), changed: new Int32Array(l * n), breath: function (t, e) { let r = new Float32Array(t * e * 2); for (let l = 0; l < e; l++)
                    for (let e = 0; e < t; e++) {
                        let n = (l * t + e) * 2;
                        r[n] = a(e, l, 23) * Math.PI * 2, r[n + 1] = .25 + .9 * a(e, l, 37);
                    } return r; }(l, n), bandAcross: new Float64Array(l), bandDown: new Float64Array(n), out: [0, 0, 0, 0, 0, 0, 0, 0] }; }(p, T.colours.data, T.tiles.data), r = U, l = p.cols, n = p.rows, o = p.cw, i = p.ch, U = l === r.cols && n === r.rows ? o === r.cw && i === r.ch ? r : { ...r, cw: o, ch: i } : { ...v(l, n, o, i), pointer: r.pointer }, tr = 0, tl(-1); }, tn = (t, e) => { t !== Y && (Y = t, _ = e, H = 0); }, to = t => { var e, r, l, a; let n, o; tn((e = Y, r = _, 30 === e && t - r >= 5e3 ? 60 : e), t); let i = t < (o = V + (n = 1e3 / Y)) - 1.5 ? 0 / 0 : t - o < n ? o : t; if (Number.isNaN(i)) {
                J = requestAnimationFrame(to);
                return;
            } V = i; let s = performance.now(), f = Math.min(.1, (t - K) / 1e3); K = t, G += f; let c = function (t) { let e = 0; for (let r = t; r >= E && e < 4; r -= E)
                e++; return e; }(X += f); for (let t = 0; t < c; t++)
                !function (t, e) { if (!t.stirred)
                    return; let r = function (t, e) { let { gusts: r } = t, l = !1; for (let a = 0; a < 4; a++) {
                    let n = a * b + 2;
                    r[n] < 0 || (!function (t, e) { let { cols: r, rows: l, cw: a, ch: n, vx: o, vy: i, glow: s, gusts: f } = t, c = e * b, h = f[c + 0], u = f[c + 1], d = 1 - f[c + 2] / .8, m = 16 * a * (1 - d * d), p = 1.4 * a, g = 320 * d, x = .45 * d, M = m + p, w = Math.min(l - 1, Math.floor((u + M) / n)), y = Math.min(r - 1, Math.floor((h + M) / a)); for (let t = Math.max(0, Math.floor((u - M) / n)); t <= w; t++)
                        for (let e = Math.max(0, Math.floor((h - M) / a)); e <= y; e++) {
                            let l = (e + .5) * a - h, d = (t + .5) * n - u, M = Math.sqrt(l * l + d * d), w = t * r + e;
                            if (M < m - p) {
                                o[w] *= .7, i[w] *= .7, s[w] *= .82;
                                continue;
                            }
                            let y = Math.abs(M - m);
                            if (y >= p || 0 === M)
                                continue;
                            let b = (1 - y / p) * function (t, e, r) { let l = (r / (2 * Math.PI) + 1) * 9, a = Math.floor(l), n = l - a, o = t[e + a % 9]; return o + (t[e + (a + 1) % 9] - o) * n * n * (3 - 2 * n); }(f, c + 3, Math.atan2(d, l));
                            o[w] += (l / M * g - o[w]) * b, i[w] += (d / M * g - i[w]) * b, s[w] = Math.min(1.2, s[w] + x * b);
                        } }(t, a), r[n] += e, r[n] >= .8 ? r[n] = -1 : l = !0);
                } return l; }(t, e), { vx: l, vy: a, dx: n, dy: o, glow: i } = t, s = Math.exp(-e / .45), f = Math.exp(-e / .7), c = Math.exp(-e / 2.6), h = 0; for (let t = 0; t < n.length; t++) {
                    let r = (n[t] + l[t] * e) * c, s = (o[t] + a[t] * e) * c, f = Math.sqrt(r * r + s * s);
                    f > 70 && (r *= 70 / f, s *= 70 / f), n[t] = r, o[t] = s;
                    let u = Math.abs(r) + Math.abs(s), d = 40 * i[t];
                    u > h && (h = u), d > h && (h = d);
                } C(t, l, .5, s), C(t, a, .5, s), C(t, n, .25, 1), C(t, o, .25, 1), C(t, i, .5, f), h < .05 && !r && (l.fill(0), a.fill(0), n.fill(0), o.fill(0), i.fill(0), t.stirred = !1); }(U, E); X = function (t, e) { if (4 === e)
                return 0; let r = t; for (let t = 0; t < e; t++)
                r -= E; return r; }(X, c), tl(1 & tr++), W[H++] = performance.now() - s, 30 === H && (H = 0, tn((l = Y, (Z.set(W), Z.sort(), (a = Z[W.length >> 1]) > 8) ? 30 : a < 5 ? 60 : l), t)), J = requestAnimationFrame(to); }, ti = () => { if (cancelAnimationFrame(J), !tt) {
                if (d.matches) {
                    G = 0, tl(-1);
                    return;
                }
                Q && !document.hidden && (K = performance.now(), V = -1 / 0, J = requestAnimationFrame(to));
            } }, ts = t => { if (d.matches || "touch" === t.pointerType)
                return; if (!Q)
                return A(U); let r = e.getBoundingClientRect(), l = t.clientX - r.left, a = t.clientY - r.top; l >= 0 && a >= 0 && l <= r.width && a <= r.height ? function (t, e, r, l) { let a = t.pointer; if (a.on && l > a.t) {
                let n = Math.max(8, l - a.t) / 1e3, o = (e - a.x) / n, i = (r - a.y) / n, s = Math.hypot(o, i);
                s > 900 && (o *= 900 / s, i *= 900 / s);
                let f = Math.min(1, s / 1400), { vx: c, vy: h, glow: u } = t;
                !function (t, e, r, l) { let { cols: a, rows: n, cw: o, ch: i } = t, s = Math.floor(e / o), f = Math.floor(r / i), c = Math.ceil(3 * o / i), h = Math.min(n - 1, f + c), u = Math.min(a - 1, s + 3); for (let t = Math.max(0, f - c); t <= h; t++)
                    for (let n = Math.max(0, s - 3); n <= u; n++) {
                        let s = Math.hypot(((n + .5) * o - e) / o, ((t + .5) * i - r) / o);
                        s > 3.5 || l((1 - s / 4) ** 2, t * a + n, n, t);
                    } t.stirred = !0; }(t, e, r, (t, e) => { c[e] += (.55 * o - c[e]) * t, h[e] += (.55 * i - h[e]) * t, u[e] = Math.min(1.2, u[e] + t * f); });
            } a.x = e, a.y = r, a.t = l, a.on = !0; }(U, l, a, t.timeStamp) : A(U); }, tf = t => { if (d.matches)
                return; let r = t.target; if (r?.closest?.("a, button, input, textarea, select, label, [role]"))
                return; let l = e.getBoundingClientRect(), n = t.clientX - l.left, o = t.clientY - l.top; n >= 0 && o >= 0 && n <= l.width && o <= l.height && function (t, e, r) { let { gusts: l } = t, n = 0; for (let t = 0; t < 4; t++) {
                let e = l[t * b + 2];
                if (e < 0) {
                    n = t;
                    break;
                }
                e > l[n * b + 2] && (n = t);
            } let o = n * b; l[o + 0] = e, l[o + 1] = r, l[o + 2] = 0, function (t, e, r) { let l = 1, n = 0; for (let o = 0; o < 9; o++) {
                let i = a(o, t, 71);
                e[r + o] = i, l = Math.min(l, i), n = Math.max(n, i);
            } for (let t = 0; t < 9; t++)
                e[r + t] = j(.25, .75, (e[r + t] - l) / (n - l || 1)); }(++t.puffs, l, o + 3), t.stirred = !0; }(U, n, o); }, tc = () => A(U), th = new ResizeObserver(ta), tu = new IntersectionObserver(([t]) => { Q = t?.isIntersecting ?? !0, ti(); }), td = new MutationObserver(() => { cachedPalette = undefined; z = R(); tl(-1); }), th.observe(e), tu.observe(e), td.observe(document.documentElement, { attributes: !0, attributeFilter: ["data-theme"] }), d.addEventListener("change", ti), document.addEventListener("visibilitychange", ti), window.addEventListener("pointermove", ts, { passive: !0 }), window.addEventListener("pointerdown", tf, { passive: !0 }), document.documentElement.addEventListener("pointerleave", tc), window.addEventListener("blur", tc), ta(), ti(), r = () => { tt = !0, cancelAnimationFrame(J), th.disconnect(), tu.disconnect(), td.disconnect(), d.removeEventListener("change", ti), document.removeEventListener("visibilitychange", ti), window.removeEventListener("pointermove", ts), window.removeEventListener("pointerdown", tf), document.documentElement.removeEventListener("pointerleave", tc), window.removeEventListener("blur", tc); }; })().catch((error) => { console.error("Hero sky failed to initialize", error); }), () => { l = !1, r?.(); }; }, [assets]), (0, e.jsx)("canvas", { ref: t, className: "hero-sky__canvas" }); };
