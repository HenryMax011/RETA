// Pre-computed gradient table (16 evenly-spaced unit vectors)
const GX = new Float64Array(16);
const GY = new Float64Array(16);
for (let i = 0; i < 16; i++) {
  const a = i * 0.392699082; // 2π / 16
  GX[i] = Math.cos(a);
  GY[i] = Math.sin(a);
}

/* Reta palette: deep navy → #00eaff → #0055ff on near-black */
const CA_R = 0 / 255;
const CA_G = 40 / 255;
const CA_B = 90 / 255;
const CB_R = 0 / 255;
const CB_G = 234 / 255;
const CB_B = 255 / 255;
const CC_R = 0 / 255;
const CC_G = 85 / 255;
const CC_B = 255 / 255;
const BASE_R = 0.008;
const BASE_G = 0.016;
const BASE_B = 0.035;

const F2 = 0.366025404; // (sqrt(3) - 1) / 2
const G2 = 0.211324865; // (3 - sqrt(3)) / 6
const G2x2 = G2 * 2;
const STRIDE = 2;

let cachedBuf32: Uint32Array | null = null;
let cachedData: Uint8ClampedArray | null = null;

function getBuf32(data: Uint8ClampedArray): Uint32Array {
  if (cachedData !== data) {
    cachedData = data;
    cachedBuf32 = new Uint32Array(data.buffer);
  }
  return cachedBuf32!;
}

// Bob Jenkins integer hash — replaces Math.sin-based hashing.
// ~5× faster, zero object allocation, zero GC pressure.
function ihash(n: number): number {
  n = (n + 0x7ed55d16 + (n << 12)) | 0;
  n = (n ^ 0xc761c23c ^ (n >> 19)) | 0;
  n = (n + 0x165667b1 + (n << 5)) | 0;
  n = (n + 0xd3a2646c ^ (n << 9)) | 0;
  n = (n + 0xfd7046c5 + (n << 3)) | 0;
  n = (n ^ 0xb55a4f09 ^ (n >> 16)) | 0;
  return n;
}

function noise(px: number, py: number): number {
  const s = (px + py) * F2;
  const ix = Math.floor(px + s);
  const iy = Math.floor(py + s);
  const t = (ix + iy) * G2;

  const x0 = px - ix + t;
  const y0 = py - iy + t;

  const i1 = x0 > y0 ? 1 : 0;
  const j1 = 1 - i1;

  const x1 = x0 - i1 + G2;
  const y1 = y0 - j1 + G2;
  const x2 = x0 - 1 + G2x2;
  const y2 = y0 - 1 + G2x2;

  let val = 0;

  let d = 0.5 - x0 * x0 - y0 * y0;
  if (d > 0) {
    const gi = ihash(ix + ihash(iy)) & 15;
    d *= d;
    val += d * d * (GX[gi] * x0 + GY[gi] * y0);
  }

  d = 0.5 - x1 * x1 - y1 * y1;
  if (d > 0) {
    const gi = ihash(ix + i1 + ihash(iy + j1)) & 15;
    d *= d;
    val += d * d * (GX[gi] * x1 + GY[gi] * y1);
  }

  d = 0.5 - x2 * x2 - y2 * y2;
  if (d > 0) {
    const gi = ihash(ix + 1 + ihash(iy + 1)) & 15;
    d *= d;
    val += d * d * (GX[gi] * x2 + GY[gi] * y2);
  }

  return 70 * val;
}

function fbm(x: number, y: number): number {
  return (
    0.5 * noise(x, y) +
    0.25 * noise(x * 2, y * 2) +
    0.125 * noise(x * 4, y * 4)
  );
}

function clamp01(v: number): number {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function smoothstep(e0: number, e1: number, x: number): number {
  const t = clamp01((x - e0) / (e1 - e0));
  return t * t * (3 - 2 * t);
}

function mix(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function renderAuroraFrame(
  data: Uint8ClampedArray,
  renderW: number,
  renderH: number,
  aspect: number,
  time: number,
  mouseX: number,
  mouseY: number,
  intensity: number,
): void {
  const t = time * 0.05;
  const invW = 1 / renderW;
  const invH = 1 / renderH;
  const pulse = 0.94 + 0.06 * Math.sin(t * 6);
  const buf32 = getBuf32(data);

  for (let y = 0; y < renderH; y += STRIDE) {
    const uvY = y * invH;
    const vGrad = smoothstep(1.2, -0.1, uvY);
    const vigY = smoothstep(0, 0.55, 0.5 - Math.abs(uvY - 0.42));

    for (let x = 0; x < renderW; x += STRIDE) {
      const uvX = x * invW;
      const stX = uvX * aspect;
      const stY = uvY;

      // Faixas horizontais cinematográficas
      const q0 = fbm(stX * 1.2 + t * 0.7, stY * 1.8 + t * 0.45);
      const q1 = fbm(stX * 1.4 + 4.2 - t * 0.4, stY * 1.6 + 4.2 + t * 0.55);

      let f = fbm(stX * 1.8 + q0 * 2.4, stY * 2.6 + q1 * 2.0);
      f += Math.sin((stY * 3.2 + q0) * Math.PI) * 0.12;

      const mdx = uvX - mouseX;
      const mdy = uvY - mouseY;
      const md2 = mdx * mdx + mdy * mdy;
      if (md2 < 0.36) f += (1 - md2 / 0.36) * 0.1;

      const band = smoothstep(0.02, 0.88, f + q0 * 0.45);
      const shift = clamp01(q1 * 0.7 + 0.22);

      let cr = mix(CA_R, CB_R, band);
      let cg = mix(CA_G, CB_G, band);
      let cb = mix(CA_B, CB_B, band);
      cr = mix(cr, CC_R, shift);
      cg = mix(cg, CC_G, shift);
      cb = mix(cb, CC_B, shift);

      const raw = clamp01(f * 0.52 + 0.48);
      const lum = raw * raw * 1.28 * intensity * (0.4 + vGrad * 0.9) * pulse;

      const fr = cr * lum + BASE_R;
      const fg = cg * lum + BASE_G;
      const fb = cb * lum + BASE_B;

      const vigX = smoothstep(0, 0.55, 0.5 - Math.abs(uvX - 0.5));
      const vig = mix(0.55, 1, vigX * vigY);

      const ri = (clamp01(fr * vig) * 255 + 0.5) | 0;
      const gi = (clamp01(fg * vig) * 255 + 0.5) | 0;
      const bi = (clamp01(fb * vig) * 255 + 0.5) | 0;
      const rgba = 0xff000000 | (bi << 16) | (gi << 8) | ri;

      for (let dy = 0; dy < STRIDE && y + dy < renderH; dy++) {
        const row = (y + dy) * renderW + x;
        for (let dx = 0; dx < STRIDE && x + dx < renderW; dx++) {
          buf32[row + dx] = rgba;
        }
      }
    }
  }
}

export function sampleAurora(
  uvX: number,
  uvY: number,
  aspect: number,
  time: number,
  mouseX: number,
  mouseY: number,
  intensity: number,
): [number, number, number] {
  const buf = new Uint8ClampedArray(4);
  renderAuroraFrame(buf, 1, 1, aspect, time, mouseX, mouseY, intensity);
  return [buf[0], buf[1], buf[2]];
}
