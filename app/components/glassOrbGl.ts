// Shared "glass orb" look — single source of truth for the WebGL2 appearance
// used by both the hero (one orb) and the About scene (many falling orbs).
// Change the shader here and every orb changes everywhere.

// The visible sphere fills only 1/ORB_VIEW of its viewport square (the shader's
// `view` constant leaves transparent padding around the rim). Callers that want
// the visible sphere to line up with a physics circle scale by this. MUST match
// the `float view` literal in FRAG below.
export const ORB_VIEW = 1.18;

export const VERT = `#version 300 es
precision highp float;
const vec2 verts[3] = vec2[3](vec2(-1.0,-1.0), vec2(3.0,-1.0), vec2(-1.0,3.0));
void main(){ gl_Position = vec4(verts[gl_VertexID], 0.0, 1.0); }`;

// SDF-raymarched glass sphere. Refraction + chromatic aberration sample the
// photo on the sphere's centre plane; Fresnel, a top-left specular and a light
// vertical reflection sell the glass. Output is premultiplied so the orb sits
// transparently on the light page. uCover cover-crops non-square photos.
export const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform vec2 uOrigin;
uniform float uTime;
uniform sampler2D uTex;
uniform float uTexReady;
uniform vec2 uCover;
out vec4 frag;

float sdSphere(vec3 p, float r){ return length(p) - r; }

void main(){
  // gl_FragCoord is absolute (framebuffer) space; subtract the viewport origin
  // so each orb's viewport reads 0..uRes regardless of where it sits.
  vec2 local = gl_FragCoord.xy - uOrigin;
  vec2 uv = (local - 0.5 * uRes) / (0.5 * uRes); // -1..1, y up
  float view = 1.18;
  vec2 sp = uv * view;

  float R = 1.0 + 0.02 * sin(uTime * 0.9); // idle breathing

  // Analytic silhouette drives anti-aliased coverage.
  float sil = length(sp) - R;
  float aa = fwidth(sil) * 1.5 + 1e-4;
  float coverage = 1.0 - smoothstep(0.0, aa, sil);
  if(coverage <= 0.0){ frag = vec4(0.0); return; }

  // Orthographic ray, sphere-traced.
  vec3 ro = vec3(sp, 2.0);
  vec3 rd = vec3(0.0, 0.0, -1.0);
  float t = 0.0; vec3 p = ro; bool hit = false;
  for(int i = 0; i < 72; i++){
    p = ro + rd * t;
    float d = sdSphere(p, R);
    if(d < 0.0008){ hit = true; break; }
    t += d;
    if(t > 4.0) break;
  }
  if(!hit){ // AA fringe pixel — place it on the analytic front hemisphere
    float z = sqrt(max(R * R - dot(sp, sp), 0.0));
    p = vec3(sp, z);
  }

  vec3 N = normalize(p);   // centred sphere: normal == position
  vec3 V = -rd;

  float F = pow(1.0 - max(dot(N, V), 0.0), 5.0);
  F = mix(0.04, 1.0, F);

  // Flat photo mapping — no refraction bending, so the photo reads naturally.
  // The glass lives in the reflections and highlights below, not a fisheye lens.
  // uCover shrinks the sampled square on one axis to centre-crop non-square art.
  vec3 avatar = vec3(0.74, 0.80, 0.88);
  if(uTexReady > 0.5){
    vec2 uvA = sp * 0.5 * uCover + 0.5;
    avatar = texture(uTex, uvA).rgb;
  }

  // Light-theme vertical reflection.
  vec3 refl = reflect(rd, N);
  vec3 env = mix(vec3(0.80, 0.86, 0.95), vec3(0.99, 1.0, 1.0),
                 clamp(refl.y * 0.5 + 0.5, 0.0, 1.0));

  vec3 col = mix(avatar, env, clamp(F * 0.65 + 0.06, 0.0, 1.0));
  col *= 1.0 - 0.08 * clamp(-N.y, 0.0, 1.0); // gentle bottom form shadow

  // Two elongated edge highlights hugging the top and bottom rims. Each is a
  // band of constant angle around a tilted, slightly forward axis A: because A
  // has a Z component, the iso-angle rings project to ellipses, so the light
  // line curves as an arc across the sphere instead of a straight stripe.
  const float lean = -0.38;                    // ~-22deg tilt (mirrored)
  vec3 A = normalize(vec3(sin(lean), cos(lean), 0.5));
  float dd = dot(N, A);
  float topHi = exp(-pow((dd - 0.80) / 0.16, 2.0));
  float botHi = exp(-pow((dd + 0.80) / 0.16, 2.0));
  col += topHi * 0.26;                          // top edge streak (calmer)
  col += botHi * vec3(0.90, 0.94, 1.0) * 0.20;  // bottom edge streak (cooler)
  col += F * 0.12;                              // fresnel edge brighten

  col = clamp(col, 0.0, 1.0);
  frag = vec4(col * coverage, coverage);   // premultiplied
}`;

export function compile(
  gl: WebGL2RenderingContext,
  type: number,
  src: string,
) {
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

export type OrbProgram = {
  program: WebGLProgram;
  vs: WebGLShader;
  fs: WebGLShader;
  vao: WebGLVertexArrayObject;
  uRes: WebGLUniformLocation | null;
  uOrigin: WebGLUniformLocation | null;
  uTime: WebGLUniformLocation | null;
  uTexReady: WebGLUniformLocation | null;
  uCover: WebGLUniformLocation | null;
};

// Compile + link the orb program, bind its VAO and configure premultiplied
// alpha blending. Leaves the program and VAO bound, ready for drawOrb.
export function createOrbProgram(gl: WebGL2RenderingContext): OrbProgram | null {
  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;

  gl.useProgram(program);
  const vao = gl.createVertexArray(); // WebGL2 needs a bound VAO to draw
  gl.bindVertexArray(vao);

  const uTex = gl.getUniformLocation(program, "uTex");
  gl.uniform1i(uTex, 0); // sampler always reads texture unit 0

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA); // premultiplied "over"
  gl.clearColor(0, 0, 0, 0);

  return {
    program,
    vs,
    fs,
    vao,
    uRes: gl.getUniformLocation(program, "uRes"),
    uOrigin: gl.getUniformLocation(program, "uOrigin"),
    uTime: gl.getUniformLocation(program, "uTime"),
    uTexReady: gl.getUniformLocation(program, "uTexReady"),
    uCover: gl.getUniformLocation(program, "uCover"),
  };
}

export type DrawOrbOpts = {
  /** Viewport rectangle in device pixels, origin bottom-left (WebGL space). */
  x: number;
  y: number;
  /** Square side in device pixels. */
  size: number;
  /** Seconds since start — drives idle breathing. */
  time: number;
  /** Photo texture, or null for an empty glass orb. */
  texture: WebGLTexture | null;
  /** Cover-crop scale (see coverFor); defaults to no crop. */
  cover?: readonly [number, number];
};

// Draw one orb into its own square viewport. Call repeatedly (one context,
// many orbs). Sort callers back-to-front by screen-y for correct overlap.
export function drawOrb(
  gl: WebGL2RenderingContext,
  p: OrbProgram,
  o: DrawOrbOpts,
) {
  gl.viewport(o.x, o.y, o.size, o.size);
  gl.uniform2f(p.uRes, o.size, o.size);
  gl.uniform2f(p.uOrigin, o.x, o.y);
  gl.uniform1f(p.uTime, o.time);
  const cover = o.cover ?? [1, 1];
  gl.uniform2f(p.uCover, cover[0], cover[1]);
  if (o.texture) {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, o.texture);
    gl.uniform1f(p.uTexReady, 1);
  } else {
    gl.uniform1f(p.uTexReady, 0);
  }
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

export function disposeOrbProgram(gl: WebGL2RenderingContext, p: OrbProgram) {
  gl.deleteProgram(p.program);
  gl.deleteShader(p.vs);
  gl.deleteShader(p.fs);
  gl.deleteVertexArray(p.vao);
}

// A clamped, linearly-filtered texture ready for uploadImage.
export function createTexture(gl: WebGL2RenderingContext): WebGLTexture | null {
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  return tex;
}

export function uploadImage(
  gl: WebGL2RenderingContext,
  tex: WebGLTexture,
  img: TexImageSource,
) {
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
}

// Cover-crop factors for an image so a square viewport shows its centre
// without distortion (landscape crops the sides, portrait the top/bottom).
export function coverFor(w: number, h: number): [number, number] {
  if (!w || !h) return [1, 1];
  const a = w / h;
  return a >= 1 ? [1 / a, 1] : [1, a];
}
