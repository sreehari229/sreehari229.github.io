/* ==========================================================================
   Workstation.glb — a 3D homelab rendered with three.js
   A desk with a monitor that types the resume, an RGB tower and keyboard,
   and a server rack where every server is one file of the resume.
   three.js is loaded lazily the first time the tab is opened.
   ========================================================================== */
(() => {
'use strict';

const THREE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
let loading = null;
function loadThree() {
  if (window.THREE) return Promise.resolve(window.THREE);
  if (loading) return loading;
  loading = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = THREE_URL;
    s.async = true;
    s.crossOrigin = 'anonymous';
    s.onload = () => (window.THREE ? resolve(window.THREE) : reject(new Error('three.js did not initialise')));
    s.onerror = () => { loading = null; s.remove(); reject(new Error('Could not download three.js')); };
    document.head.appendChild(s);
  });
  return loading;
}

const cssVar = (name, fallback) => getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const MONO = '"Fira Code", Consolas, Menlo, monospace';
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const small = () => window.matchMedia('(max-width: 768px)').matches;

let W = null; // the single live instance

function mount(host, opts) {
  if (W) { W.host = host; show(); return Promise.resolve(); }
  host.innerHTML = `
    <div class="ws-progress"><div></div></div>
    <div class="ws-loading"><i class="codicon codicon-loading codicon-modifier-spin"></i><span>Loading Workstation.glb…</span></div>`;
  return loadThree().then((THREE) => {
    if (W) return;
    W = build(THREE, host, opts);
    show();
  }).catch((err) => {
    host.innerHTML = `<div class="ws-error"><i class="codicon codicon-warning"></i>
      <div><b>The 3D preview could not be opened.</b><br>${String(err.message || err)}.
      <br>Check your connection and reopen <code>Workstation.glb</code>.</div></div>`;
    throw err;
  });
}

/* ───────────────────────────── Canvas helpers ───────────────────────────── */
function canvasTex(THREE, w, h, draw) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const ctx = c.getContext('2d');
  draw(ctx, w, h);
  const t = new THREE.CanvasTexture(c);
  t.encoding = THREE.sRGBEncoding;
  t.anisotropy = 4;
  return t;
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function metal(ctx, w, h, a = '#2c2f36', b = '#191b20') {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, a); g.addColorStop(1, b);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = 'rgba(255,255,255,.035)';
  for (let x = 0; x < w; x += 3) ctx.fillRect(x, 0, 1, h);
}
function ears(ctx, w, h) {
  ctx.fillStyle = '#121317';
  ctx.fillRect(0, 0, 34, h); ctx.fillRect(w - 34, 0, 34, h);
  ctx.fillStyle = '#55595f';
  [h * 0.28, h * 0.72].forEach((y) => {
    ctx.beginPath(); ctx.arc(17, y, 6, 0, 7); ctx.fill();
    ctx.beginPath(); ctx.arc(w - 17, y, 6, 0, 7); ctx.fill();
  });
}

/* ───────────────────────────── Scene ───────────────────────────── */
function build(THREE, host, opts) {
  const mobile = small();
  const S = {
    THREE, host, opts,
    running: false, raf: 0, last: 0, time: 0,
    auto: !reduceMotion(), night: false,
    interact: 0, // seconds since the last drag
    cam: { theta: 0.38, phi: 1.22, r: mobile ? 6 : 4.7, tTheta: 0.38, tPhi: 1.22, tR: mobile ? 6 : 4.7, target: new THREE.Vector3(0.5, 1.08, 0) },
    pick: [], hovered: null, leds: [], fans: [], steam: [], units: [], tick: [],
    fps: { n: 0, t: 0, v: 60 },
  };

  host.innerHTML = `
    <canvas class="ws-canvas" tabindex="0" aria-label="3D workstation. Drag to orbit, scroll to zoom, click a server to open that file."></canvas>
    <div class="ws-hud ws-top">
      <div class="ws-title"><i class="codicon codicon-server-environment"></i><span><b>sreehari@homelab</b> — 3D preview</span></div>
      <div class="ws-tools">
        <button class="action" data-ws="auto" title="Toggle Auto-Rotate"><i class="codicon codicon-debug-pause"></i></button>
        <button class="action" data-ws="night" title="Toggle Lights"><i class="codicon codicon-lightbulb"></i></button>
        <button class="action" data-ws="reset" title="Reset Camera"><i class="codicon codicon-discard"></i></button>
        <button class="action" data-ws="shot" title="Save Screenshot"><i class="codicon codicon-device-camera"></i></button>
      </div>
    </div>
    <div class="ws-hud ws-legend">
      <div class="ws-legend-h"><span>RACK-01</span><span class="ws-ok"><i></i>${opts.units.length}/${opts.units.length} online</span></div>
      ${opts.units.map((u, i) => `<button class="ws-unit" data-unit="${u.id}" style="--i:${i}"><span class="ws-led"></span><span class="ws-host">${u.host}</span><span class="ws-file">${u.file}</span></button>`).join('')}
    </div>
    <div class="ws-hud ws-stats"></div>
    <div class="ws-hint"><i class="codicon codicon-move"></i> Drag to orbit · Scroll to zoom · Click a server</div>
    <div class="ws-tip" role="tooltip"></div>`;
  const canvas = host.querySelector('.ws-canvas');
  S.tip = host.querySelector('.ws-tip');
  S.stats = host.querySelector('.ws-stats');

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = !mobile;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  S.renderer = renderer;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x101010, 6, 16);
  S.scene = scene;
  const camera = new THREE.PerspectiveCamera(38, 1, 0.05, 60);
  S.camera = camera;

  /* lights */
  S.hemi = new THREE.HemisphereLight(0xbfd4ff, 0x16121f, 0.55);
  scene.add(S.hemi);
  const key = new THREE.DirectionalLight(0xffffff, 0.75);
  key.position.set(-2.5, 4.5, 3.5);
  key.castShadow = !mobile;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { left: -3, right: 3, top: 3, bottom: -2, near: 0.5, far: 12 });
  key.shadow.bias = -0.0015;
  scene.add(key);
  S.key = key;
  S.neonA = new THREE.PointLight(0xff3ea5, 1.4, 5, 2); S.neonA.position.set(2.4, 1.6, 0.9); scene.add(S.neonA);
  S.neonB = new THREE.PointLight(0x2de2e6, 1.6, 4, 2); S.neonB.position.set(-0.6, 1.25, -0.6); scene.add(S.neonB);
  S.rackGlow = new THREE.PointLight(0x4f8cff, 0.9, 2, 2); S.rackGlow.position.set(1.55, 1.2, 0.2); scene.add(S.rackGlow);

  /* floor */
  const floorMat = new THREE.MeshStandardMaterial({ color: 0x15151a, roughness: 0.85, metalness: 0.1 });
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  scene.add(floor);
  S.floorMat = floorMat;
  S.grid = new THREE.GridHelper(40, 80, 0x0078d4, 0x0078d4);
  S.grid.material.transparent = true;
  S.grid.material.opacity = 0.14;
  S.grid.position.y = 0.002;
  scene.add(S.grid);
  // glowing ring under the rack
  S.ring = new THREE.Mesh(new THREE.RingGeometry(0.62, 0.66, 64), new THREE.MeshBasicMaterial({ color: 0x2de2e6, transparent: true, opacity: 0.7, side: THREE.DoubleSide }));
  S.ring.rotation.x = -Math.PI / 2;
  S.ring.position.set(1.55, 0.004, 0);
  scene.add(S.ring);

  buildDesk(S);
  buildRack(S);
  buildDust(S);

  /* events */
  const ro = new ResizeObserver(() => resize(S));
  ro.observe(host);
  S.ro = ro;
  bindControls(S, canvas);
  host.querySelector('.ws-tools').addEventListener('click', (e) => {
    const b = e.target.closest('[data-ws]');
    if (b) tool(S, b.dataset.ws, b);
  });
  host.querySelector('.ws-legend').addEventListener('click', (e) => {
    const b = e.target.closest('[data-unit]');
    if (b) openUnit(S, S.units.find((u) => u.id === b.dataset.unit));
  });
  host.querySelector('.ws-legend').addEventListener('pointerover', (e) => {
    const b = e.target.closest('[data-unit]');
    S.legendHover = b ? S.units.find((u) => u.id === b.dataset.unit) : null;
  });
  host.querySelector('.ws-legend').addEventListener('pointerleave', () => { S.legendHover = null; });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(S); else if (S.visible) start(S); });

  retheme(S);
  resize(S);
  if (!S.auto) host.querySelector('[data-ws="auto"] i').className = 'codicon codicon-play';
  if (opts.log) opts.log(`Workstation.glb: ${renderer.info.memory.geometries} geometries, three.js r128`);
  return S;
}

/* ───────────────────────────── Desk, monitor, tower ───────────────────────────── */
function buildDesk(S) {
  const { THREE, scene } = S;
  const g = new THREE.Group();
  g.position.set(-0.55, 0, 0);
  scene.add(g);

  const wood = new THREE.MeshStandardMaterial({ color: 0x15161b, roughness: 0.5, metalness: 0.35 });
  const steel = new THREE.MeshStandardMaterial({ color: 0x0f1013, roughness: 0.4, metalness: 0.8 });
  const top = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.05, 0.85), wood);
  top.position.y = 0.75;
  top.castShadow = top.receiveShadow = true;
  g.add(top);
  // glowing edge strip on the desk
  S.deskStrip = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.006, 0.006), new THREE.MeshBasicMaterial({ color: 0x2de2e6 }));
  S.deskStrip.position.set(0, 0.728, 0.426);
  g.add(S.deskStrip);
  [[-0.95, -0.38], [0.95, -0.38], [-0.95, 0.38], [0.95, 0.38]].forEach(([x, z]) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.73, 0.05), steel);
    leg.position.set(x, 0.365, z);
    leg.castShadow = true;
    g.add(leg);
  });
  // desk mat
  const mat = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.004, 0.36), new THREE.MeshStandardMaterial({ color: 0x0b0b0e, roughness: 0.95 }));
  mat.position.set(-0.35, 0.777, 0.18);
  mat.receiveShadow = true;
  g.add(mat);

  /* monitor */
  const mon = new THREE.Group();
  mon.position.set(-0.35, 0.775, -0.2);
  g.add(mon);
  const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.28, 16), steel);
  stand.position.y = 0.14;
  mon.add(stand);
  const foot = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.012, 0.16), steel);
  foot.position.y = 0.006;
  foot.castShadow = true;
  mon.add(foot);
  const bezel = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.56, 0.035), new THREE.MeshStandardMaterial({ color: 0x0b0c0f, roughness: 0.35, metalness: 0.5 }));
  bezel.position.set(0, 0.52, 0);
  bezel.rotation.x = -0.05;
  bezel.castShadow = true;
  mon.add(bezel);
  // bias light behind the monitor
  const glow = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.0), new THREE.MeshBasicMaterial({
    map: canvasTex(THREE, 256, 128, (ctx, w, h) => {
      const r = ctx.createRadialGradient(w / 2, h / 2, 4, w / 2, h / 2, w / 2);
      r.addColorStop(0, 'rgba(255,255,255,.9)'); r.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = r; ctx.fillRect(0, 0, w, h);
    }),
    color: 0x2de2e6, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.55,
  }));
  glow.position.set(0, 0.52, -0.05);
  mon.add(glow);
  S.monGlow = glow;

  const sc = document.createElement('canvas');
  sc.width = 1024; sc.height = 512;
  S.screen = { canvas: sc, ctx: sc.getContext('2d'), line: 0, col: 0, wait: 0, acc: 0, lines: [] };
  const screenTex = new THREE.CanvasTexture(sc);
  screenTex.encoding = THREE.sRGBEncoding;
  screenTex.anisotropy = 8;
  S.screen.tex = screenTex;
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.08, 0.52), new THREE.MeshBasicMaterial({ map: screenTex, toneMapped: false }));
  screen.position.set(0, 0, 0.0185);
  bezel.add(screen);
  screen.userData.pick = { id: 'experience', title: 'Monitor · Experience.js', sub: 'Typing out the work history', kind: 'object' };
  S.pick.push(screen);

  /* keyboard with per-key RGB */
  const kb = new THREE.Group();
  kb.position.set(-0.42, 0.78, 0.2);
  kb.rotation.x = 0.06;
  g.add(kb);
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.018, 0.15), new THREE.MeshStandardMaterial({ color: 0x111215, roughness: 0.5, metalness: 0.6 }));
  base.castShadow = true;
  kb.add(base);
  const cols = 16, rows = 5;
  const keys = new THREE.InstancedMesh(new THREE.BoxGeometry(0.023, 0.012, 0.023), new THREE.MeshBasicMaterial({ toneMapped: false }), cols * rows);
  const m4 = new THREE.Matrix4();
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    m4.makeTranslation(-0.2 + c * 0.0268, 0.014, -0.054 + r * 0.027);
    keys.setMatrixAt(r * cols + c, m4);
    keys.setColorAt(r * cols + c, new THREE.Color(0x222222));
  }
  kb.add(keys);
  S.keys = { mesh: keys, cols, rows, color: new THREE.Color() };
  base.userData.pick = { id: 'contact', title: 'Keyboard · Contact.yml', sub: 'Say hello: email, GitHub, LinkedIn', kind: 'object' };
  S.pick.push(base);

  // mouse
  const mouse = new THREE.Mesh(new THREE.SphereGeometry(0.03, 20, 12), new THREE.MeshStandardMaterial({ color: 0x15161a, roughness: 0.4, metalness: 0.5 }));
  mouse.scale.set(0.75, 0.38, 1.1);
  mouse.position.set(0.0, 0.79, 0.2);
  mouse.castShadow = true;
  g.add(mouse);

  /* mug with steam */
  const mug = new THREE.Group();
  mug.position.set(0.22, 0.775, 0.22);
  g.add(mug);
  const mugMat = new THREE.MeshStandardMaterial({ color: 0xe8e8e8, roughness: 0.35 });
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.034, 0.1, 24, 1, true), mugMat);
  body.position.y = 0.05;
  body.castShadow = true;
  mug.add(body);
  const coffee = new THREE.Mesh(new THREE.CircleGeometry(0.035, 24), new THREE.MeshStandardMaterial({ color: 0x3b2314, roughness: 0.2 }));
  coffee.rotation.x = -Math.PI / 2;
  coffee.position.y = 0.088;
  mug.add(coffee);
  const bottom = new THREE.Mesh(new THREE.CircleGeometry(0.034, 24), mugMat);
  bottom.rotation.x = -Math.PI / 2;
  bottom.position.y = 0.002;
  mug.add(bottom);
  const handle = new THREE.Mesh(new THREE.TorusGeometry(0.024, 0.006, 8, 20, Math.PI), mugMat);
  handle.position.set(0.04, 0.05, 0);
  handle.rotation.z = -Math.PI / 2;
  mug.add(handle);
  const puff = canvasTex(THREE, 64, 64, (ctx) => {
    const r = ctx.createRadialGradient(32, 32, 2, 32, 32, 30);
    r.addColorStop(0, 'rgba(255,255,255,.55)'); r.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = r; ctx.fillRect(0, 0, 64, 64);
  });
  for (let i = 0; i < 7; i++) {
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: puff, transparent: true, depthWrite: false, opacity: 0 }));
    sp.userData.phase = i / 7;
    mug.add(sp);
    S.steam.push(sp);
  }

  /* tower PC with a glass side panel */
  const tower = new THREE.Group();
  tower.position.set(0.68, 0.775, -0.08);
  g.add(tower);
  const tw = 0.24, th = 0.5, td = 0.46;
  const caseMat = new THREE.MeshStandardMaterial({ color: 0x0d0e11, roughness: 0.35, metalness: 0.75 });
  const shell = [
    [tw, 0.012, td, 0, th, 0], [tw, 0.012, td, 0, 0.006, 0],
    [0.012, th, td, tw / 2, th / 2, 0], [tw, th, 0.012, 0, th / 2, -td / 2],
  ];
  shell.forEach(([x, y, z, px, py, pz]) => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(x, y, z), caseMat);
    m.position.set(px, py, pz);
    m.castShadow = true;
    tower.add(m);
  });
  // front mesh panel (facing -x, i.e. towards the monitor) and the glass (facing +z, the camera)
  const front = new THREE.Mesh(new THREE.BoxGeometry(0.012, th, td), new THREE.MeshStandardMaterial({ color: 0x15161b, roughness: 0.8, metalness: 0.3, transparent: true, opacity: 0.55 }));
  front.position.set(-tw / 2, th / 2, 0);
  tower.add(front);
  const glass = new THREE.Mesh(new THREE.BoxGeometry(tw, th, 0.006), new THREE.MeshStandardMaterial({ color: 0x9fb4ff, roughness: 0.05, metalness: 0.9, transparent: true, opacity: 0.12 }));
  glass.position.set(0, th / 2, td / 2);
  tower.add(glass);
  glass.userData.pick = { id: 'skills', title: 'Tower · Skills.py', sub: 'Python · C++ · Bash · Linux', kind: 'object' };
  S.pick.push(glass);
  // motherboard, GPU, RAM, cooler
  const mb = new THREE.Mesh(new THREE.BoxGeometry(0.006, th - 0.06, td - 0.08), new THREE.MeshStandardMaterial({ color: 0x14231d, roughness: 0.6 }));
  mb.position.set(tw / 2 - 0.016, th / 2, 0);
  tower.add(mb);
  const gpu = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.05, 0.3), new THREE.MeshStandardMaterial({ color: 0x1b1c22, roughness: 0.3, metalness: 0.8 }));
  gpu.position.set(0.04, 0.17, 0.0);
  tower.add(gpu);
  S.gpuStrip = new THREE.Mesh(new THREE.BoxGeometry(0.004, 0.006, 0.28), new THREE.MeshBasicMaterial({ color: 0xff3ea5, toneMapped: false }));
  S.gpuStrip.position.set(0.04, 0.142, 0.0);
  tower.add(S.gpuStrip);
  S.ram = [];
  for (let i = 0; i < 4; i++) {
    const ram = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.006, 0.006), new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }));
    ram.position.set(0.085, 0.36, -0.03 + i * 0.016);
    tower.add(ram);
    S.ram.push(ram);
  }
  const cooler = makeFan(S, 0.07);
  cooler.position.set(0.06, 0.34, -0.1);
  cooler.rotation.y = Math.PI / 2;
  tower.add(cooler);
  for (let i = 0; i < 3; i++) {
    const f = makeFan(S, 0.075);
    f.position.set(-tw / 2 + 0.02, 0.09 + i * 0.155, 0.05);
    f.rotation.y = Math.PI / 2;
    tower.add(f);
  }
  S.towerLight = new THREE.PointLight(0xff3ea5, 0.6, 0.9, 2);
  S.towerLight.position.set(0.68 - 0.55, 1.0, 0.0);
  scene.add(S.towerLight);

  /* little desk plant, because every desk needs one */
  const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.04, 0.08, 20), new THREE.MeshStandardMaterial({ color: 0x2b2f3a, roughness: 0.7 }));
  pot.position.set(-0.88, 0.815, -0.2);
  pot.castShadow = true;
  g.add(pot);
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x2f9e5b, roughness: 0.6 });
  for (let i = 0; i < 9; i++) {
    const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.03, 10, 8), leafMat);
    leaf.scale.set(0.5, 1.8, 0.25);
    const a = (i / 9) * Math.PI * 2;
    leaf.position.set(-0.88 + Math.cos(a) * 0.025, 0.9 + (i % 3) * 0.012, -0.2 + Math.sin(a) * 0.025);
    leaf.rotation.set(Math.sin(a) * 0.5, a, Math.cos(a) * 0.5);
    leaf.castShadow = true;
    g.add(leaf);
  }
}

function makeFan(S, size) {
  const { THREE } = S;
  const fan = new THREE.Group();
  const ring = new THREE.Mesh(new THREE.TorusGeometry(size * 0.92, size * 0.06, 8, 40), new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false }));
  fan.add(ring);
  const rotor = new THREE.Group();
  const bladeMat = new THREE.MeshStandardMaterial({ color: 0x1a1b20, roughness: 0.4, metalness: 0.3, transparent: true, opacity: 0.9 });
  for (let i = 0; i < 7; i++) {
    const b = new THREE.Mesh(new THREE.BoxGeometry(size * 0.75, size * 0.22, 0.003), bladeMat);
    b.position.x = size * 0.42;
    const pivot = new THREE.Group();
    pivot.rotation.z = (i / 7) * Math.PI * 2;
    b.rotation.x = 0.4;
    pivot.add(b);
    rotor.add(pivot);
  }
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(size * 0.22, size * 0.22, 0.01, 20), new THREE.MeshStandardMaterial({ color: 0x0c0c0e, metalness: 0.6, roughness: 0.3 }));
  hub.rotation.x = Math.PI / 2;
  rotor.add(hub);
  fan.add(rotor);
  S.fans.push({ rotor, ring, speed: 9 + Math.random() * 4, hue: Math.random() });
  return fan;
}

/* ───────────────────────────── Server rack ───────────────────────────── */
function buildRack(S) {
  const { THREE, scene, opts } = S;
  const rack = new THREE.Group();
  rack.position.set(1.55, 0, 0);
  rack.rotation.y = -0.18;
  scene.add(rack);
  S.rack = rack;
  const RW = 0.6, RH = 1.95, RD = 0.9, IW = 0.5;

  const frameMat = new THREE.MeshStandardMaterial({ color: 0x101114, roughness: 0.35, metalness: 0.85 });
  const panelMat = new THREE.MeshStandardMaterial({ color: 0x17181d, roughness: 0.55, metalness: 0.6 });
  const box = (w, h, d, x, y, z, m = frameMat) => {
    const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
    o.position.set(x, y, z);
    o.castShadow = o.receiveShadow = true;
    rack.add(o);
    return o;
  };
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz]) => box(0.04, RH, 0.04, sx * (RW / 2 - 0.02), RH / 2, sz * (RD / 2 - 0.02)));
  box(RW, 0.04, RD, 0, RH - 0.02, 0);
  box(RW, 0.06, RD, 0, 0.03, 0);
  box(0.01, RH - 0.1, RD - 0.04, -RW / 2 + 0.005, RH / 2, 0, panelMat);
  box(0.01, RH - 0.1, RD - 0.04, RW / 2 - 0.005, RH / 2, 0, panelMat);
  box(RW - 0.04, RH - 0.1, 0.01, 0, RH / 2, -RD / 2 + 0.005, panelMat);
  // casters
  [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz]) => {
    const w = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.02, 12), frameMat);
    w.rotation.z = Math.PI / 2;
    w.position.set(sx * (RW / 2 - 0.05), 0.0, sz * (RD / 2 - 0.05));
    rack.add(w);
  });
  // mounting rails with U markings
  const railTex = canvasTex(THREE, 32, 1024, (ctx, w, h) => {
    ctx.fillStyle = '#0d0e11'; ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#3a3d44';
    for (let y = 6; y < h; y += 12) ctx.fillRect(10, y, 12, 6);
  });
  const railMat = new THREE.MeshStandardMaterial({ map: railTex, roughness: 0.5, metalness: 0.7 });
  [-1, 1].forEach((sx) => box(0.03, RH - 0.12, 0.012, sx * (IW / 2 + 0.018), RH / 2, RD / 2 - 0.06, railMat));
  // LED strip under the roof
  S.rackStrip = box(RW - 0.08, 0.01, 0.01, 0, RH - 0.05, RD / 2 - 0.08, new THREE.MeshBasicMaterial({ color: 0x4f8cff, toneMapped: false }));

  /* units, top to bottom */
  const front = RD / 2 - 0.07;
  let y = RH - 0.14;

  // core switch (1U)
  const swH = 0.044;
  const swFace = canvasTex(THREE, 1024, 90, (ctx, w, h) => {
    metal(ctx, w, h, '#24262c', '#15161a');
    ears(ctx, w, h);
    ctx.fillStyle = '#d0d4da'; ctx.font = `600 26px ${MONO}`; ctx.fillText('CORE-SW-24', 52, 56);
    for (let i = 0; i < 24; i++) {
      const x = 300 + i * 27 + Math.floor(i / 6) * 10;
      ctx.fillStyle = '#060607'; ctx.fillRect(x, 32, 20, 36);
      ctx.fillStyle = '#2b2d33'; ctx.fillRect(x + 3, 58, 14, 6);
    }
    ctx.fillStyle = '#060607';
    [940, 975].forEach((x) => ctx.fillRect(x, 30, 26, 30));
  });
  const sw = new THREE.Mesh(new THREE.BoxGeometry(IW, swH, 0.5), [panelMat, panelMat, panelMat, panelMat, new THREE.MeshStandardMaterial({ map: swFace, roughness: 0.5, metalness: 0.5 }), panelMat]);
  sw.position.set(0, y, front - 0.25);
  sw.castShadow = true;
  rack.add(sw);
  const swPorts = [];
  for (let i = 0; i < 24; i++) {
    const px = 300 + i * 27 + Math.floor(i / 6) * 10 + 10;
    const lx = (px / 1024 - 0.5) * IW;
    const led = ledMesh(S, i % 5 === 0 ? 0xffb020 : 0x29ff7a, 0.006, 0.003);
    led.position.set(lx, y + swH / 2 - 0.009, front + 0.002);
    rack.add(led);
    S.leds.push({ mesh: led, rate: 4 + Math.random() * 10, phase: Math.random() * 10, duty: 0.55, base: 0.15 });
    swPorts.push(new THREE.Vector3(lx, y - 0.004, front + 0.004));
  }
  y -= swH / 2 + 0.035;

  // servers (2U each), one per resume file
  const SH = 0.14;
  opts.units.forEach((u, i) => {
    const cy = y - SH / 2;
    const face = canvasTex(THREE, 1024, 300, (ctx, w, h) => serverFace(ctx, w, h, u, i));
    const faceMat = new THREE.MeshStandardMaterial({ map: face, roughness: 0.45, metalness: 0.55, emissive: new THREE.Color(0x0078d4), emissiveIntensity: 0 });
    const g = new THREE.Group();
    g.position.set(0, cy, 0);
    rack.add(g);
    const body = new THREE.Mesh(new THREE.BoxGeometry(IW, SH - 0.008, 0.7), [panelMat, panelMat, panelMat, panelMat, faceMat, panelMat]);
    body.position.z = front - 0.35;
    body.castShadow = body.receiveShadow = true;
    g.add(body);
    // status LEDs: power, health, and one per drive bay
    const ledAt = (px, py, color, blink) => {
      const led = ledMesh(S, color, 0.009, 0.004);
      led.position.set((px / 1024 - 0.5) * IW, (0.5 - py / 300) * SH, front + 0.002);
      g.add(led);
      S.leds.push({ mesh: led, rate: blink ? 1.5 + Math.random() * 7 : 0, phase: Math.random() * 10, duty: blink ? 0.45 : 1, base: blink ? 0.12 : 1 });
    };
    ledAt(66, 70, 0x29ff7a, false);
    ledAt(66, 110, 0x4f8cff, true);
    for (let k = 0; k < 4; k++) ledAt(752 + k * 62, 46, k % 2 ? 0x29ff7a : 0x4fd2ff, true);
    const unit = { ...u, group: g, body, faceMat, out: 0, tOut: 0, hover: 0, index: i, port: new THREE.Vector3((990 / 1024 - 0.5) * IW, cy, front + 0.004) };
    body.userData.pick = { unit, title: `${u.host} · ${u.file}`, sub: u.title, kind: 'server' };
    S.pick.push(body);
    S.units.push(unit);
    y -= SH + 0.012;
  });

  // UPS at the bottom
  const upsH = 0.2;
  const upsFace = canvasTex(THREE, 1024, 400, (ctx, w, h) => {
    metal(ctx, w, h, '#202227', '#111216');
    ears(ctx, w, h);
    ctx.fillStyle = '#0b0c0e'; roundRect(ctx, 70, 60, 300, 140, 10); ctx.fill();
    ctx.fillStyle = '#d0d4da'; ctx.font = `600 34px ${MONO}`; ctx.fillText('UPS 3000VA', 70, 280);
    ctx.fillStyle = '#7a8088'; ctx.font = `24px ${MONO}`; ctx.fillText('ONLINE · DOUBLE CONVERSION', 70, 325);
    ctx.fillStyle = 'rgba(255,255,255,.06)';
    for (let r = 0; r < 9; r++) for (let c = 0; c < 22; c++) {
      ctx.beginPath(); ctx.arc(470 + c * 22 + (r % 2) * 11, 70 + r * 30, 7, 0, 7); ctx.fill();
    }
  });
  const ups = new THREE.Mesh(new THREE.BoxGeometry(IW, upsH, 0.6), [panelMat, panelMat, panelMat, panelMat, new THREE.MeshStandardMaterial({ map: upsFace, roughness: 0.5, metalness: 0.5 }), panelMat]);
  ups.position.set(0, 0.09 + upsH / 2, front - 0.3);
  ups.castShadow = true;
  rack.add(ups);
  const lc = document.createElement('canvas');
  lc.width = 300; lc.height = 140;
  S.lcd = { canvas: lc, ctx: lc.getContext('2d'), t: 0 };
  S.lcd.tex = new THREE.CanvasTexture(lc);
  S.lcd.tex.encoding = THREE.sRGBEncoding;
  const lcd = new THREE.Mesh(new THREE.PlaneGeometry(IW * 300 / 1024, upsH * 140 / 400), new THREE.MeshBasicMaterial({ map: S.lcd.tex, toneMapped: false }));
  lcd.position.set(((70 + 150) / 1024 - 0.5) * IW, 0.09 + upsH / 2 + (0.5 - 130 / 400) * upsH, front + 0.002);
  rack.add(lcd);

  /* patch cables from the switch to each server */
  const colors = [0x2de2e6, 0xff3ea5, 0xffd23f, 0x7cff6b, 0x9b7bff, 0xff8a3d];
  S.units.forEach((u, i) => {
    const a = swPorts[i * 3 + 1];
    const b = u.port;
    const sag = 0.08 + i * 0.012;
    const curve = new THREE.CatmullRomCurve3([
      a,
      new THREE.Vector3(a.x + 0.01, a.y - 0.04, a.z + 0.03),
      new THREE.Vector3(IW / 2 + 0.035, lerp(a.y, b.y, 0.35), b.z + sag),
      new THREE.Vector3(IW / 2 + 0.035, lerp(a.y, b.y, 0.8), b.z + sag * 0.7),
      new THREE.Vector3(b.x + 0.01, b.y + 0.01, b.z + 0.03),
      b,
    ]);
    const cable = new THREE.Mesh(new THREE.TubeGeometry(curve, 60, 0.0045, 6, false), new THREE.MeshStandardMaterial({ color: colors[i % colors.length], roughness: 0.45, emissive: colors[i % colors.length], emissiveIntensity: 0.25 }));
    cable.castShadow = true;
    rack.add(cable);
    u.cable = cable;
  });

  /* glass front door, swung open */
  const hinge = new THREE.Group();
  hinge.position.set(RW / 2, RH / 2, RD / 2);
  hinge.rotation.y = 1.85;
  rack.add(hinge);
  const doorFrame = new THREE.MeshStandardMaterial({ color: 0x0e0f12, roughness: 0.4, metalness: 0.8 });
  const door = new THREE.Group();
  door.position.x = -RW / 2;
  hinge.add(door);
  const pane = new THREE.Mesh(new THREE.BoxGeometry(RW - 0.04, RH - 0.06, 0.006), new THREE.MeshStandardMaterial({ color: 0x8fb0ff, roughness: 0.05, metalness: 0.9, transparent: true, opacity: 0.1 }));
  door.add(pane);
  [[RW, 0.03, 0, (RH - 0.03) / 2], [RW, 0.03, 0, -(RH - 0.03) / 2], [0.03, RH, -(RW - 0.03) / 2, 0], [0.03, RH, (RW - 0.03) / 2, 0]].forEach(([w, h, x, yy]) => {
    const f = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.02), doorFrame);
    f.position.set(x, yy, 0);
    f.castShadow = true;
    door.add(f);
  });
  const handle = new THREE.Mesh(new THREE.BoxGeometry(0.012, 0.18, 0.025), new THREE.MeshStandardMaterial({ color: 0x8a8f98, metalness: 1, roughness: 0.25 }));
  handle.position.set(-(RW / 2) + 0.05, 0, 0.02);
  door.add(handle);

  /* hologram above the rack */
  const holo = new THREE.Group();
  holo.position.set(0, RH + 0.24, 0.1);
  rack.add(holo);
  S.holo = holo;
  S.holoRings = [0.2, 0.26].map((r, i) => {
    const m = new THREE.Mesh(new THREE.TorusGeometry(r, 0.004, 6, 80), new THREE.MeshBasicMaterial({ color: i ? 0xff3ea5 : 0x2de2e6, transparent: true, opacity: 0.8, toneMapped: false }));
    m.rotation.x = Math.PI / 2 + (i ? 0.3 : -0.2);
    holo.add(m);
    return m;
  });
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.075, 1), new THREE.MeshBasicMaterial({ color: 0x2de2e6, wireframe: true, transparent: true, opacity: 0.85, toneMapped: false }));
  holo.add(core);
  S.holoCore = core;
  const label = new THREE.Sprite(new THREE.SpriteMaterial({
    map: canvasTex(THREE, 512, 128, (ctx, w, h) => {
      ctx.font = `600 44px ${MONO}`; ctx.textAlign = 'center';
      ctx.shadowColor = '#2de2e6'; ctx.shadowBlur = 18;
      ctx.fillStyle = '#e8feff'; ctx.fillText('{S} homelab', w / 2, 58);
      ctx.font = `28px ${MONO}`; ctx.shadowBlur = 10; ctx.fillStyle = '#7cff9e';
      ctx.fillText(`● ${opts.units.length}/${opts.units.length} ONLINE`, w / 2, 104);
    }),
    transparent: true, depthWrite: false, toneMapped: false,
  }));
  label.scale.set(0.64, 0.16, 1);
  label.position.y = 0.2;
  holo.add(label);
  // projector beam
  const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.02, 0.22, 32, 1, true), new THREE.MeshBasicMaterial({ color: 0x2de2e6, transparent: true, opacity: 0.07, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending }));
  beam.position.y = -0.13;
  holo.add(beam);
}

function ledMesh(S, color, size, depth) {
  const { THREE } = S;
  const m = new THREE.Mesh(new THREE.BoxGeometry(size, size, depth), new THREE.MeshBasicMaterial({ color, toneMapped: false }));
  m.userData.color = new THREE.Color(color);
  return m;
}

function serverFace(ctx, w, h, u, i) {
  metal(ctx, w, h);
  ears(ctx, w, h);
  // label plate
  ctx.fillStyle = 'rgba(0,0,0,.35)';
  roundRect(ctx, 96, 34, 300, 232, 10); ctx.fill();
  ctx.fillStyle = '#e9edf2';
  ctx.font = `600 44px ${MONO}`;
  ctx.fillText(u.host.toUpperCase(), 116, 98);
  ctx.fillStyle = u.color || '#4fd2ff';
  ctx.font = `500 30px ${MONO}`;
  ctx.fillText(u.file, 116, 150);
  ctx.fillStyle = '#8b919a';
  ctx.font = `22px ${MONO}`;
  const words = String(u.title).split(' ');
  let line = '', yy = 196;
  words.forEach((wd) => {
    if (ctx.measureText(line + wd).width > 262) { ctx.fillText(line, 116, yy); line = ''; yy += 30; }
    line += wd + ' ';
  });
  if (yy < 260) ctx.fillText(line, 116, yy);
  // honeycomb vent
  ctx.fillStyle = 'rgba(0,0,0,.55)';
  for (let r = 0; r < 8; r++) for (let c = 0; c < 15; c++) {
    ctx.beginPath(); ctx.arc(440 + c * 19 + (r % 2) * 9.5, 52 + r * 28, 7, 0, 7); ctx.fill();
  }
  // drive bays
  for (let k = 0; k < 4; k++) {
    const x = 728 + k * 62;
    ctx.fillStyle = '#121317'; roundRect(ctx, x, 30, 54, 240, 6); ctx.fill();
    ctx.fillStyle = '#2a2d33'; roundRect(ctx, x + 6, 70, 42, 180, 4); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.08)';
    for (let s = 0; s < 8; s++) ctx.fillRect(x + 12, 90 + s * 18, 30, 6);
  }
  // network port with the cable
  ctx.fillStyle = '#060607'; ctx.fillRect(975, 135, 30, 30);
  ctx.fillStyle = 'rgba(255,255,255,.25)'; ctx.font = `18px ${MONO}`;
  ctx.fillText(`U${String(32 - i * 2).padStart(2, '0')}`, 974, 285);
}

function buildDust(S) {
  const { THREE, scene } = S;
  const n = small() ? 120 : 260;
  const pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 6;
    pos[i * 3 + 1] = Math.random() * 3;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  S.dust = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0x2de2e6, size: 0.012, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending }));
  scene.add(S.dust);
}

/* ───────────────────────────── Theme ───────────────────────────── */
function retheme(S = W) {
  if (!S) return;
  const { THREE } = S;
  const light = (document.documentElement.dataset.theme || '').startsWith('light');
  const bg = new THREE.Color(cssVar('--editor-bg', '#1f1f1f'));
  const accent = new THREE.Color(cssVar('--accent', '#0078d4'));
  const neon1 = new THREE.Color(cssVar('--neon-1', '#2de2e6'));
  const neon2 = new THREE.Color(cssVar('--neon-2', '#ff3ea5'));
  S.light = light;
  S.scene.background = bg;
  S.scene.fog.color.copy(bg);
  S.floorMat.color.copy(light ? bg.clone().multiplyScalar(0.92) : bg.clone().multiplyScalar(0.75));
  S.grid.material.color.copy(accent);
  S.grid.material.opacity = light ? 0.22 : 0.14;
  S.ring.material.color.copy(neon1);
  S.neonA.color.copy(neon2);
  S.neonB.color.copy(neon1);
  S.monGlow.material.color.copy(neon1);
  S.deskStrip.material.color.copy(neon1);
  S.rackStrip.material.color.copy(accent);
  S.rackGlow.color.copy(accent);
  S.gpuStrip.material.color.copy(neon2);
  S.dust.material.color.copy(neon1);
  S.dust.material.blending = light ? THREE.NormalBlending : THREE.AdditiveBlending;
  S.dust.material.opacity = light ? 0.35 : 0.5;
  S.units.forEach((u) => u.faceMat.emissive.copy(accent));
  applyLights(S);
  S.screenColors = {
    bg: cssVar('--editor-bg', '#1f1f1f'), side: cssVar('--activity-bg', '#181818'), tabs: cssVar('--tabs-bg', '#181818'),
    tab: cssVar('--tab-active-bg', '#1f1f1f'), fg: cssVar('--editor-fg', '#cccccc'), ln: cssVar('--ln', '#6e7681'),
    status: cssVar('--status-remote-bg', '#0078d4'), accent: cssVar('--accent', '#0078d4'), muted: cssVar('--fg-muted', '#9d9d9d'),
    caret: cssVar('--caret', '#aeafad'), lineHl: cssVar('--line-hl-border', '#282828'),
  };
  S.screen.lines = (S.opts.screen && S.opts.screen()) || [];
  drawScreen(S, true);
}
function applyLights(S) {
  const night = S.night;
  const light = S.light;
  S.hemi.intensity = night ? 0.12 : (light ? 0.95 : 0.55);
  S.key.intensity = night ? 0.08 : (light ? 0.9 : 0.75);
  S.neonA.intensity = night ? 2.4 : (light ? 0.7 : 1.4);
  S.neonB.intensity = night ? 2.6 : (light ? 0.8 : 1.6);
  S.rackGlow.intensity = night ? 1.6 : 0.9;
  S.renderer.toneMappingExposure = light && !night ? 1.0 : 1.08;
}

/* ───────────────────────────── Monitor screen ───────────────────────────── */
function drawScreen(S, full) {
  const sc = S.screen;
  const ctx = sc.ctx;
  const C = S.screenColors;
  const w = sc.canvas.width, h = sc.canvas.height;
  const top = 64, lh = 21, left = 96;
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, w, h);
  // title bar, activity bar, tabs, status bar
  ctx.fillStyle = C.side; ctx.fillRect(0, 0, w, 26); ctx.fillRect(0, 26, 40, h);
  ctx.fillStyle = C.muted; ctx.font = `13px ${MONO}`; ctx.textAlign = 'center';
  ctx.fillText('Experience.js — sreehari-resume', w / 2, 18);
  ctx.textAlign = 'left';
  ['#ff5f57', '#febc2e', '#28c840'].forEach((c, i) => { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(w - 60 + i * 18, 13, 5, 0, 7); ctx.fill(); });
  ctx.fillStyle = C.muted;
  for (let i = 0; i < 5; i++) ctx.fillRect(12, 42 + i * 40, 16, 16);
  ctx.fillStyle = C.accent; ctx.fillRect(0, 40, 3, 22);
  ctx.fillStyle = C.tabs; ctx.fillRect(40, 26, w - 40, 30);
  ctx.fillStyle = C.tab; ctx.fillRect(40, 26, 160, 30);
  ctx.fillStyle = C.accent; ctx.fillRect(40, 26, 160, 2);
  ctx.fillStyle = '#cbcb41'; ctx.font = `bold 12px ${MONO}`; ctx.fillText('JS', 52, 46);
  ctx.fillStyle = C.fg; ctx.font = `14px ${MONO}`; ctx.fillText('Experience.js', 76, 46);
  ctx.fillStyle = C.status; ctx.fillRect(0, h - 22, w, 22);
  ctx.fillStyle = '#ffffff'; ctx.font = `13px ${MONO}`;
  ctx.fillText(`  main   Ln ${sc.line + 1}, Col ${sc.col + 1}`, 6, h - 7);
  ctx.textAlign = 'right'; ctx.fillText('JavaScript   UTF-8   ⚡ online ', w - 6, h - 7); ctx.textAlign = 'left';

  // code
  const lines = sc.lines;
  if (!lines.length) return;
  const rows = Math.floor((h - top - 26) / lh);
  const first = Math.max(0, sc.line - rows + 3);
  ctx.font = `15px ${MONO}`;
  const cw = ctx.measureText('M').width;
  let caretX = left, caretY = top;
  for (let r = 0; r < rows; r++) {
    const li = first + r;
    if (li > sc.line || li >= lines.length) break;
    const y = top + r * lh;
    if (li === sc.line) { ctx.strokeStyle = C.lineHl; ctx.strokeRect(41, y - 15, w - 50, lh); }
    ctx.fillStyle = li === sc.line ? C.fg : C.ln;
    ctx.textAlign = 'right'; ctx.fillText(String(li + 1), left - 22, y); ctx.textAlign = 'left';
    let x = left, budget = li === sc.line ? sc.col : Infinity;
    for (const tk of lines[li]) {
      if (budget <= 0) break;
      const t = tk.t.length > budget ? tk.t.slice(0, budget) : tk.t;
      budget -= t.length;
      ctx.fillStyle = tk.color || C.fg;
      ctx.fillText(t, x, y);
      x += t.length * cw;
      if (x > w) break;
    }
    if (li === sc.line) { caretX = x; caretY = y; }
  }
  if (Math.floor(S.time * 2) % 2 === 0 || !full) { ctx.fillStyle = C.caret; ctx.fillRect(caretX, caretY - 15, 2, lh - 2); }
  // minimap
  ctx.globalAlpha = 0.5;
  for (let r = 0; r < Math.min(lines.length, 120); r++) {
    let x = w - 90;
    for (const tk of lines[r]) {
      if (tk.t.trim()) { ctx.fillStyle = tk.color || C.fg; ctx.fillRect(x, top - 10 + r * 3, Math.min(tk.t.length, 40) * 1.2, 2); }
      x += tk.t.length * 1.2;
    }
  }
  ctx.globalAlpha = 1;
  ctx.fillStyle = 'rgba(128,128,128,.15)';
  ctx.fillRect(w - 92, top - 12 + first * 3, 86, rows * 3);
  sc.tex.needsUpdate = true;
}
function stepScreen(S, dt) {
  const sc = S.screen;
  if (!sc.lines.length) return;
  sc.acc += dt;
  if (sc.acc < 1 / 15) return;
  const step = sc.acc;
  sc.acc = 0;
  if (sc.wait > 0) { sc.wait -= step; drawScreen(S, true); return; }
  let chars = Math.max(1, Math.round(step * 55));
  while (chars-- > 0) {
    const len = sc.lines[sc.line].reduce((n, t) => n + t.t.length, 0);
    if (sc.col < len) {
      // skip leading indentation instantly, like an editor auto-indent
      if (sc.col === 0) sc.col = len - sc.lines[sc.line].map((t) => t.t).join('').trimStart().length;
      sc.col++;
    } else if (sc.line < sc.lines.length - 1) {
      sc.line++; sc.col = 0;
      if (Math.random() < 0.12) { sc.wait = 0.4; break; }
    } else {
      sc.wait = 3; sc.line = 0; sc.col = 0;
      break;
    }
  }
  drawScreen(S, true);
}

function drawLcd(S) {
  const l = S.lcd;
  const ctx = l.ctx;
  const load = 38 + Math.round(Math.sin(S.time * 0.7) * 6 + Math.sin(S.time * 2.3) * 3);
  ctx.fillStyle = '#0b2a1f'; ctx.fillRect(0, 0, 300, 140);
  ctx.fillStyle = '#5dffb0'; ctx.font = `600 26px ${MONO}`;
  ctx.fillText(`LOAD ${load}%`, 18, 44);
  ctx.fillText('BATT 100%', 18, 80);
  ctx.font = `18px ${MONO}`; ctx.fillStyle = '#3fcf8c';
  ctx.fillText(`UPTIME ${Math.floor(S.time / 60)}m ${String(Math.floor(S.time % 60)).padStart(2, '0')}s`, 18, 118);
  ctx.fillStyle = '#5dffb0';
  for (let i = 0; i < 10; i++) if (i < load / 10) ctx.fillRect(200 + i * 9, 26, 6, 20);
  l.tex.needsUpdate = true;
}

/* ───────────────────────────── Controls ───────────────────────────── */
function bindControls(S, canvas) {
  const ray = new S.THREE.Raycaster();
  const ndc = new S.THREE.Vector2();
  const pointers = new Map();
  let down = null, pinch = 0;
  S.mouse = null;

  const pickAt = (cx, cy) => {
    const r = canvas.getBoundingClientRect();
    ndc.set(((cx - r.left) / r.width) * 2 - 1, -((cy - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, S.camera);
    const hit = ray.intersectObjects(S.pick, false)[0];
    return hit ? hit.object.userData.pick : null;
  };

  canvas.addEventListener('pointerdown', (e) => {
    canvas.setPointerCapture(e.pointerId);
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    down = { x: e.clientX, y: e.clientY, moved: 0 };
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinch = Math.hypot(a.x - b.x, a.y - b.y);
    }
  });
  canvas.addEventListener('pointermove', (e) => {
    S.mouse = { x: e.clientX, y: e.clientY, type: e.pointerType };
    const p = pointers.get(e.pointerId);
    if (!p) return;
    const dx = e.clientX - p.x, dy = e.clientY - p.y;
    p.x = e.clientX; p.y = e.clientY;
    if (down) down.moved += Math.abs(dx) + Math.abs(dy);
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinch) { S.cam.tR = clamp(S.cam.tR * (pinch / d), 2.2, 10); S.zoomed = true; }
      pinch = d;
    } else {
      S.cam.tTheta -= dx * 0.006;
      S.cam.tPhi = clamp(S.cam.tPhi - dy * 0.005, 0.45, 1.5);
    }
    S.interact = 0;
    canvas.classList.add('dragging');
  });
  const end = (e) => {
    pointers.delete(e.pointerId);
    canvas.classList.remove('dragging');
    if (pointers.size < 2) pinch = 0;
    if (down && down.moved < 6 && e.type === 'pointerup') {
      const hit = pickAt(e.clientX, e.clientY);
      if (hit) {
        if (hit.unit) openUnit(S, hit.unit);
        else if (hit.id) S.opts.onOpen(hit.id);
      }
    }
    down = null;
  };
  canvas.addEventListener('pointerup', end);
  canvas.addEventListener('pointercancel', end);
  canvas.addEventListener('pointerleave', () => { S.mouse = null; });
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    S.cam.tR = clamp(S.cam.tR * Math.exp(e.deltaY * 0.0012), 2.2, 10);
    S.zoomed = true;
    S.interact = 0;
  }, { passive: false });
  canvas.addEventListener('keydown', (e) => {
    const k = e.key;
    if (k === 'ArrowLeft') S.cam.tTheta += 0.15;
    else if (k === 'ArrowRight') S.cam.tTheta -= 0.15;
    else if (k === 'ArrowUp') S.cam.tPhi = clamp(S.cam.tPhi - 0.1, 0.45, 1.5);
    else if (k === 'ArrowDown') S.cam.tPhi = clamp(S.cam.tPhi + 0.1, 0.45, 1.5);
    else if (k === '+' || k === '=') S.cam.tR = clamp(S.cam.tR * 0.9, 2.2, 10);
    else if (k === '-') S.cam.tR = clamp(S.cam.tR * 1.1, 2.2, 10);
    else if (/^[1-9]$/.test(k) && S.units[+k - 1]) openUnit(S, S.units[+k - 1]);
    else return;
    e.preventDefault();
    e.stopPropagation();
    S.interact = 0;
  });
  S.pickAt = pickAt;
}

function openUnit(S, unit) {
  if (!unit) return;
  S.units.forEach((u) => { u.tOut = u === unit ? 0.32 : 0; });
  clearTimeout(S.openTimer);
  S.openTimer = setTimeout(() => S.opts.onOpen(unit.id), reduceMotion() ? 0 : 650);
}

function tool(S, name, btn) {
  if (name === 'auto') {
    S.auto = !S.auto;
    btn.querySelector('i').className = `codicon codicon-${S.auto ? 'debug-pause' : 'play'}`;
    btn.title = S.auto ? 'Pause Auto-Rotate' : 'Resume Auto-Rotate';
  } else if (name === 'night') {
    S.night = !S.night;
    btn.classList.toggle('on', S.night);
    applyLights(S);
  } else if (name === 'reset') {
    Object.assign(S.cam, { tTheta: 0.38, tPhi: 1.22, tR: S.defaultR || 4.7 });
    S.zoomed = false;
    S.sway = 0;
  } else if (name === 'shot') {
    S.renderer.render(S.scene, S.camera);
    const a = document.createElement('a');
    a.href = S.renderer.domElement.toDataURL('image/png');
    a.download = 'sreehari-homelab.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
  }
}

/* ───────────────────────────── Loop ───────────────────────────── */
function resize(S) {
  const r = S.host.getBoundingClientRect();
  if (!r.width || !r.height) return;
  S.renderer.setSize(r.width, r.height, false);
  S.camera.aspect = r.width / r.height;
  // keep the whole scene in frame on tall, narrow screens
  const aspect = r.width / r.height;
  S.camera.fov = aspect < 1 ? 50 : 38;
  S.camera.updateProjectionMatrix();
  // pull back far enough that the desk and the rack (about 3.4m wide) both fit
  const halfW = Math.tan((S.camera.fov * Math.PI) / 360) * aspect;
  const fit = clamp(1.85 / halfW + 0.6, 4.7, 9.5);
  if (S.defaultR !== fit) {
    if (!S.zoomed) S.cam.tR = S.cam.r = fit;
    S.defaultR = fit;
  }
  if (!S.running && S.visible) frame(S, performance.now());
}

function start(S) {
  if (S.running) return;
  S.running = true;
  S.last = performance.now();
  const loop = (t) => {
    if (!S.running) return;
    frame(S, t);
    S.raf = requestAnimationFrame(loop);
  };
  S.raf = requestAnimationFrame(loop);
}
function stop(S) {
  S.running = false;
  cancelAnimationFrame(S.raf);
}

function frame(S, now) {
  const { THREE } = S;
  const dt = Math.min(0.05, Math.max(0, (now - S.last) / 1000));
  S.last = now;
  S.time += dt;
  S.interact += dt;
  const t = S.time;
  const calm = reduceMotion();

  /* camera */
  const c = S.cam;
  // idle: sway gently in front of the desk instead of circling to the back of the rack
  if (S.auto && S.interact > 2.5 && !calm) {
    S.sway = (S.sway || 0) + dt * 0.18;
    c.tTheta += (0.38 + Math.sin(S.sway) * 0.55 - c.tTheta) * Math.min(1, dt * 0.6);
  }
  const k = 1 - Math.pow(0.0015, dt);
  c.theta = lerp(c.theta, c.tTheta, k);
  c.phi = lerp(c.phi, c.tPhi, k);
  c.r = lerp(c.r, c.tR, k);
  S.camera.position.set(
    c.target.x + c.r * Math.sin(c.phi) * Math.sin(c.theta),
    c.target.y + c.r * Math.cos(c.phi),
    c.target.z + c.r * Math.sin(c.phi) * Math.cos(c.theta),
  );
  S.camera.lookAt(c.target);

  /* hover */
  let hit = null;
  if (S.mouse && !S.host.querySelector('.ws-canvas.dragging') && S.mouse.type !== 'touch') hit = S.pickAt(S.mouse.x, S.mouse.y);
  if (S.legendHover) hit = { unit: S.legendHover, title: `${S.legendHover.host} · ${S.legendHover.file}`, sub: S.legendHover.title, legend: true };
  S.host.querySelector('.ws-canvas').style.cursor = hit && !hit.legend ? 'pointer' : '';
  if (hit && S.mouse && !hit.legend) {
    const r = S.host.getBoundingClientRect();
    S.tip.innerHTML = `<b>${hit.title}</b><span>${hit.sub}</span><em><i class="codicon codicon-go-to-file"></i> Click to open</em>`;
    const x = clamp(S.mouse.x - r.left + 14, 8, r.width - 250);
    const y = clamp(S.mouse.y - r.top + 16, 8, r.height - 90);
    S.tip.style.transform = `translate(${x}px, ${y}px)`;
    S.tip.classList.add('show');
  } else S.tip.classList.remove('show');
  S.hovered = hit;
  S.host.querySelectorAll('.ws-unit').forEach((b) => b.classList.toggle('hot', !!(hit && hit.unit && hit.unit.id === b.dataset.unit)));

  /* servers slide and glow */
  S.units.forEach((u) => {
    const isHot = hit && hit.unit === u;
    u.hover = lerp(u.hover, isHot ? 1 : 0, 1 - Math.pow(0.001, dt));
    const target = Math.max(u.tOut, isHot ? 0.06 : 0);
    u.out = lerp(u.out, target, 1 - Math.pow(0.002, dt));
    u.group.position.z = u.out;
    u.faceMat.emissiveIntensity = u.hover * 0.35 + (0.5 + 0.5 * Math.sin(t * 3)) * u.hover * 0.15;
  });

  /* LEDs */
  for (const l of S.leds) {
    const on = !l.rate || calm ? 1 : ((Math.sin(t * l.rate + l.phase) * 0.5 + 0.5) > l.duty ? 1 : l.base);
    l.mesh.material.color.copy(l.mesh.userData.color).multiplyScalar(on);
  }

  /* fans and RGB */
  for (const f of S.fans) {
    if (!calm) f.rotor.rotation.z += dt * f.speed;
    f.ring.material.color.setHSL((f.hue + t * 0.08) % 1, 0.9, 0.55);
  }
  S.ram.forEach((r, i) => r.material.color.setHSL((t * 0.15 + i * 0.12) % 1, 1, 0.55));
  const kc = S.keys;
  for (let r = 0; r < kc.rows; r++) for (let col = 0; col < kc.cols; col++) {
    kc.color.setHSL(((col / kc.cols) * 0.6 - t * 0.12 + r * 0.03 + 10) % 1, 0.85, 0.42);
    kc.mesh.setColorAt(r * kc.cols + col, kc.color);
  }
  kc.mesh.instanceColor.needsUpdate = true;
  S.towerLight.color.setHSL((t * 0.08) % 1, 0.9, 0.55);

  /* steam */
  S.steam.forEach((sp) => {
    const p = (sp.userData.phase + t * 0.22) % 1;
    sp.position.set(Math.sin(p * 9 + sp.userData.phase * 20) * 0.015, 0.1 + p * 0.22, 0);
    const s = 0.03 + p * 0.07;
    sp.scale.set(s, s, 1);
    sp.material.opacity = Math.sin(p * Math.PI) * (S.light ? 0.25 : 0.4);
  });

  /* hologram */
  if (!calm) {
    S.holo.position.y = 1.95 + 0.24 + Math.sin(t * 1.3) * 0.025;
    S.holoRings[0].rotation.z += dt * 0.8;
    S.holoRings[1].rotation.z -= dt * 0.5;
    S.holoCore.rotation.y += dt * 0.6;
    S.holoCore.rotation.x += dt * 0.25;
    S.ring.material.opacity = 0.45 + Math.sin(t * 2) * 0.25;
    S.dust.rotation.y += dt * 0.01;
    S.dust.position.y = Math.sin(t * 0.2) * 0.05;
  }

  /* screens */
  stepScreen(S, dt);
  if ((S.lcdAcc = (S.lcdAcc || 0) + dt) > 0.5) { S.lcdAcc = 0; drawLcd(S); }

  S.renderer.render(S.scene, S.camera);

  /* stats */
  const fp = S.fps;
  fp.n++; fp.t += dt;
  if (fp.t > 0.5) {
    fp.v = Math.round(fp.n / fp.t);
    fp.n = 0; fp.t = 0;
    const info = S.renderer.info.render;
    S.stats.textContent = `${fp.v} FPS · ${(info.triangles / 1000).toFixed(1)}k tris · ${info.calls} draws`;
  }
}

/* ───────────────────────────── Public API ───────────────────────────── */
function show() {
  if (!W) return;
  W.visible = true;
  W.units.forEach((u) => { u.tOut = 0; });
  resize(W);
  if (!document.hidden) start(W);
}
function hide() {
  if (!W) return;
  W.visible = false;
  stop(W);
  W.tip.classList.remove('show');
}

window.Workstation = { mount, show, hide, retheme: () => retheme(W), get ready() { return !!W; } };
})();
