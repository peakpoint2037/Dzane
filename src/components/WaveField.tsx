"use client";

import { useEffect, useRef } from "react";

const N = 3600;

// Below this viewport width, skip the effect entirely — it competes with the
// hero's scroll-linked pin animation for the main thread/GPU, which is the
// main source of scroll jank on phones. Matches Hero.tsx's own breakpoint.
const MOBILE_BREAKPOINT_PX = 868;

// Reference-sim constants (Golden Aura @ the brand site's tuned sliders).
const SPEED = 0.2;
const TURB = 12;
const FREQ = 0.005;

// PerspectiveCamera(fov 42, z 20) => the visible half-height at the z=0 plane.
const HALF_H = Math.tan((42 * Math.PI) / 180 / 2) * 20;
// gl_PointSize's perspective term (150 / -mv.z) is constant at z=0.
const SIZE_SCALE = 150 / 20;

// Warm gold, tuned to sit on DZANE's blush-pink hero rather than the
// reference site's dark backdrop.
const COLOR_BASE: [number, number, number] = [0xc9 / 255, 0x9a / 255, 0x6a / 255];
const COLOR_HOT: [number, number, number] = [0xf5 / 255, 0xe0 / 255, 0xae / 255];

const VERT = `
attribute vec2 aPos;
attribute float aB;
uniform vec2 uHalf;
uniform float uPR;
varying float vB;
varying float vX;
void main() {
  vB = aB;
  vec2 ndc = aPos / uHalf;
  vX = ndc.x;
  gl_Position = vec4(ndc, 0.0, 1.0);
  gl_PointSize = (0.19 + 0.2 * aB) * uPR * ${SIZE_SCALE.toFixed(1)};
}`;

const FRAG = `
precision mediump float;
uniform vec3 uG;
uniform vec3 uH;
varying float vB;
varying float vX;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = dot(c, c);
  if (d > 0.25) discard;
  float soft = smoothstep(0.25, 0.0, d);
  vec3 col = mix(uG, uH, vB);
  float vis = clamp(vB * 6.0, 0.0, 1.0);
  float a = soft * (0.10 + 0.5 * vB) * vis;
  a *= (0.3 + 0.7 * smoothstep(-0.85, 0.05, vX));
  if (a < 0.003) discard;
  gl_FragColor = vec4(col, a);
}`;

/** Deterministic hash-noise, matching the reference's `rnd`. */
function rnd(i: number) {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/** The reference sim's 2-octave FBM, verbatim. */
function fbm(x: number, y: number) {
  let v = 0;
  let a = 0.5;
  let f = 1;
  for (let i = 0; i < 2; i++) {
    v += a * Math.sin(x * f + Math.cos(y * f));
    f *= 2;
    a *= 0.5;
  }
  return v;
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function WaveField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect the same reduced-motion preference as the rest of the hero:
    // leave the plain photo in place with no drifting overlay.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Skip on phones — see MOBILE_BREAKPOINT_PX above.
    if (window.innerWidth < MOBILE_BREAKPOINT_PX) return;

    const gl = (canvas.getContext("webgl", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    }) ||
      canvas.getContext("experimental-webgl", {
        alpha: true,
      })) as WebGLRenderingContext | null;
    // No WebGL (or it's blocked): leave the plain background in place.
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const aPos = gl.getAttribLocation(prog, "aPos");
    const aB = gl.getAttribLocation(prog, "aB");
    const uHalf = gl.getUniformLocation(prog, "uHalf");
    const uPR = gl.getUniformLocation(prog, "uPR");
    gl.uniform3fv(gl.getUniformLocation(prog, "uG"), COLOR_BASE);
    gl.uniform3fv(gl.getUniformLocation(prog, "uH"), COLOR_HOT);

    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const pos = new Float32Array(N * 2);
    const bright = new Float32Array(N);
    const base = new Float32Array(N);
    for (let i = 0; i < N; i++) base[i] = rnd(i + 4.4);

    const posBuf = gl.createBuffer();
    const brBuf = gl.createBuffer();

    let halfW = 1;
    let pxPerUnit = 58;
    let pr = 1;

    function seed() {
      for (let i = 0; i < N; i++) {
        pos[i * 2] = (rnd(i) * 2 - 1) * (halfW + 0.5);
        pos[i * 2 + 1] = (rnd(i + 3.1) * 2 - 1) * (HALF_H + 0.3);
        bright[i] = base[i];
      }
    }

    function resize() {
      if (!canvas || !gl) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (!w || !h) return;
      pr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * pr);
      canvas.height = Math.round(h * pr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      halfW = HALF_H * (w / h);
      pxPerUnit = w / (2 * halfW);
      gl.uniform2f(uHalf, halfW, HALF_H);
      gl.uniform1f(uPR, pr);
      seed();
    }
    resize();

    // ---- pointer ripple (the reference sim's warp mechanics) ----
    let mouse: [number, number] | null = null;
    const track = (cx: number, cy: number) => {
      if (!canvas) return;
      const r = canvas.getBoundingClientRect();
      if (cy < r.top || cy > r.bottom || cx < r.left || cx > r.right) {
        mouse = null;
        return;
      }
      const fx = (cx - r.left) / r.width;
      const fy = (cy - r.top) / r.height;
      mouse = [(fx * 2 - 1) * halfW, -(fy * 2 - 1) * HALF_H];
    };
    const onMouseMove = (e: MouseEvent) => track(e.clientX, e.clientY);
    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) mouse = null;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length) track(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onTouchEnd = () => {
      mouse = null;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseout", onMouseOut, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    let T = 0;
    function step(dt: number) {
      dt = Math.min(dt, 0.05);
      T += dt;
      const f60 = dt * 60; // the reference sim steps per-frame @60fps

      for (let i = 0; i < N; i++) {
        const ix = i * 2;
        const iy = ix + 1;
        // world → px for the noise coords
        const pxx = (pos[ix] + halfW) * pxPerUnit;
        const pxy = (HALF_H - pos[iy]) * pxPerUnit;
        const n = fbm(pxx * FREQ, pxy * FREQ + T * 0.2);
        const vx = (1.5 + n * 0.8) * SPEED;
        const vy = n * TURB * 0.15 * SPEED;
        pos[ix] += (vx * f60) / pxPerUnit;
        pos[iy] -= (vy * f60) / pxPerUnit; // canvas y-down → world y-up

        if (mouse) {
          const mdx = pos[ix] - mouse[0];
          const mdy = pos[iy] - mouse[1];
          const md = Math.sqrt(mdx * mdx + mdy * mdy);
          const mR = 120 / pxPerUnit;
          if (md < mR && md > 0.0001) {
            const mf = ((1 - md / mR) * 3 * f60) / pxPerUnit;
            pos[ix] += (mdx / md) * mf;
            pos[iy] += (mdy / md) * mf;
          }
        }

        if (pos[ix] > halfW + 0.6) {
          // recycle at the right edge
          pos[ix] = -halfW - 0.5;
          pos[iy] = (rnd(i + T) * 2 - 1) * (HALF_H + 0.3);
          base[i] = rnd(i + T + 2.2) * 0.6 + 0.1;
        }
        bright[i] = base[i];
      }
    }

    function draw() {
      if (!gl) return;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
      gl.bufferData(gl.ARRAY_BUFFER, pos, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, brBuf);
      gl.bufferData(gl.ARRAY_BUFFER, bright, gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(aB);
      gl.vertexAttribPointer(aB, 1, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.POINTS, 0, N);
    }

    // ---- run loop: paused when off-screen or the tab is hidden ----
    let running = false;
    let inView = true;
    let last = 0;
    let raf = 0;
    function frame(ts: number) {
      if (!running) return;
      raf = requestAnimationFrame(frame);
      const dt = last ? (ts - last) / 1000 : 0.016;
      last = ts;
      step(dt);
      draw();
    }
    function setRunning(on: boolean) {
      on = on && inView && !document.hidden;
      if (on === running) return;
      running = on;
      if (on) {
        last = 0;
        raf = requestAnimationFrame(frame);
      } else {
        cancelAnimationFrame(raf);
      }
    }

    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              inView = entries[0].isIntersecting;
              setRunning(true);
            },
            { threshold: 0.02 },
          )
        : null;
    io?.observe(canvas);

    const onVisibility = () => setRunning(true);
    document.addEventListener("visibilitychange", onVisibility);

    let rto: number | undefined;
    const onResize = () => {
      window.clearTimeout(rto);
      rto = window.setTimeout(resize, 120);
    };
    window.addEventListener("resize", onResize);

    step(0.016);
    draw();
    setRunning(true);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(rto);
      io?.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      gl.deleteBuffer(posBuf);
      gl.deleteBuffer(brBuf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      // h-full/w-full are load-bearing: <canvas> is a replaced element, so an
      // ancestor-supplied `absolute inset-0` alone won't stretch it — it just
      // keeps its intrinsic 300x150 default size pinned in a corner.
      className={`h-full w-full ${className ?? ""}`}
    />
  );
}
