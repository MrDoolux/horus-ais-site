(function () {
  const canvas = document.getElementById("dust-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  // Characters pool — enrichi
  const hieroglyphs = [
    "𓂀", "𓋹", "𓆣", "𓁹", "𓃀", "𓏏", "𓊃", "𓈖", "𓇋", "𓎛",
    "𓄿", "𓍯", "𓃭", "𓆑", "𓅓", "𓏲", "𓊪", "𓂋", "𓏤", "𓇳",
    "𓊨", "𓁶", "𓃂", "𓆓", "𓋴", "𓈎", "𓍿", "𓄡", "𓏥", "𓊖"
  ];
  const matrix = [
    "ア", "カ", "サ", "タ", "ナ", "ハ", "マ", "ヤ", "ラ", "ワ",
    "イ", "キ", "シ", "チ", "ニ", "ヒ", "ミ", "リ", "ウ", "ク",
    "ス", "ツ", "ヌ", "フ", "ム", "ユ", "ル", "エ", "ケ", "セ",
    "0", "1", "7", "ゼ", "ゾ", "ダ", "バ", "パ", "ン",
    "Σ", "Ω", "Δ", "Ψ", "λ", "μ", "π", "τ"
  ];
  const allChars = [...hieroglyphs, ...matrix];
  const chars = allChars;
  let particles = [], animId = null, hover = false, last = 0;
  const activeZones = [];

  function resize() {
    if (window.innerWidth < 10) return;
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }

  function spawn(x, y, n, burst) { spawnInto(particles, x, y, n, burst); }

  // Même génération que le logo, vers une liste donnée (globale ou locale).
  function spawnInto(list, x, y, n, burst) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = burst ? 2.5 + Math.random() * 4 : 1 + Math.random() * 2;
      list.push({
        x: x + (Math.random() - 0.5) * 40,
        y: y + (Math.random() - 0.5) * 24,
        vx: burst ? Math.cos(a) * s : (Math.random() - 0.5) * 2,
        vy: burst ? Math.sin(a) * s - 1.5 : -1.4 - Math.random() * 2.5,
        life: 1, decay: burst ? 0.016 : 0.012,
        size: 12 + Math.random() * 12,
        char: chars[(Math.random() * chars.length) | 0],
        rot: 0, rotS: (Math.random() - 0.5) * 0.1
      });
    }
  }

  function tick(now) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (hover && now - last > 70) {
      const zone = activeZones.find(z => z.matches(":hover")) || activeZones[0];
      if (zone) {
        const r = zone.getBoundingClientRect();
        spawn(r.left + r.width * 0.5, r.top + r.height * 0.5, 2, false);
      }
      last = now;
    }
    stepAndDraw(ctx, particles);
    animId = (particles.length || hover) ? requestAnimationFrame(tick) : null;
  }

  // Même physique et même rendu que le logo, pour n'importe quel contexte.
  function stepAndDraw(c, list) {
    for (let i = list.length - 1; i >= 0; i--) {
      const p = list[i];
      p.x += p.vx; p.y += p.vy; p.vy -= 0.015; p.life -= p.decay; p.rot += p.rotS;
      if (p.life <= 0) { list.splice(i, 1); continue; }
      c.save();
      c.translate(p.x, p.y); c.rotate(p.rot);
      c.globalAlpha = Math.max(0, p.life);
      c.fillStyle = "#d4af37";
      c.font = p.size + "px Segoe UI, serif";
      c.textAlign = "center";
      c.fillText(p.char, 0, 0);
      c.restore();
    }
  }

  function loop() { if (!animId) animId = requestAnimationFrame(tick); }

  function bindZone(el) {
    if (!el) return;
    activeZones.push(el);
    el.addEventListener("mouseenter", function (e) {
      hover = true;
      const r = el.getBoundingClientRect();
      spawn(e.clientX, e.clientY, 14, false);
      loop();
    });
    el.addEventListener("mousemove", function (e) {
      if (!hover) return;
      const now = performance.now();
      if (now - last < 45) return;
      spawn(e.clientX, e.clientY, 3, false);
      last = now; loop();
    });
    el.addEventListener("mouseleave", function () { hover = false; });
    el.addEventListener("click", function (e) {
      spawn(e.clientX, e.clientY, 36, true);
      loop();
    });
  }

  bindZone(document.getElementById("logo-wrap"));
  document.querySelectorAll(".actions .btn").forEach(bindZone);
  bindZone(document.querySelector(".btn.primary"))

  // Zones locales (figures des graphiques, lien « Notre observation ») :
  // un canvas dédié par conteneur, au-dessus du contenu, clic laissé au lien.
  function bindLocalZone(zone) {
    const c = document.createElement("canvas");
    c.className = "particules-locales";
    c.setAttribute("aria-hidden", "true");
    zone.appendChild(c);
    const cx = c.getContext("2d");
    const list = [];
    let zHover = false, zLast = 0, zAnim = null, w = 0, h = 0;

    function size() {
      const dpr = window.devicePixelRatio || 1;
      w = zone.clientWidth; h = zone.clientHeight;
      if (!w || !h) return;
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function local(e) {
      const r = zone.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    }

    function zTick(now) {
      cx.clearRect(0, 0, w, h);
      if (zHover && now - zLast > 70) {
        spawnInto(list, w * 0.5, h * 0.5, 2, false);
        zLast = now;
      }
      stepAndDraw(cx, list);
      zAnim = (list.length || zHover) ? requestAnimationFrame(zTick) : null;
    }

    function zLoop() { if (!zAnim) zAnim = requestAnimationFrame(zTick); }

    zone.addEventListener("mouseenter", function (e) {
      zHover = true;
      const [x, y] = local(e);
      spawnInto(list, x, y, 14, false);
      zLoop();
    });
    zone.addEventListener("mousemove", function (e) {
      if (!zHover) return;
      const now = performance.now();
      if (now - zLast < 45) return;
      const [x, y] = local(e);
      spawnInto(list, x, y, 3, false);
      zLast = now; zLoop();
    });
    zone.addEventListener("mouseleave", function () { zHover = false; });
    // Pas de preventDefault : le clic suit toujours le lien.
    zone.addEventListener("click", function (e) {
      const [x, y] = local(e);
      spawnInto(list, x, y, 36, true);
      zLoop();
    });

    size();
    if ("ResizeObserver" in window) new ResizeObserver(size).observe(zone);
    else window.addEventListener("resize", size);
    zone.querySelectorAll("img").forEach(function (im) {
      if (!im.complete) im.addEventListener("load", size);
    });
  }

  document.querySelectorAll(".zone-particules").forEach(bindLocalZone);

  window.addEventListener("resize", resize);
  const img = document.getElementById("logo-img");
  if (img && img.complete) resize();
  else if (img) img.addEventListener("load", resize);
  setTimeout(resize, 80);
})();
