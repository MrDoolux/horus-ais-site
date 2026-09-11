(function () {
  const wrap = document.body;
  const canvas = document.getElementById("dust-canvas");
  if (!wrap || !canvas) return;
  const ctx = canvas.getContext("2d");
  const chars = "HORUSAIS01*+".split("");
  let particles = [], animId = null, hover = false, last = 0;
  function resize() {
    if (window.innerWidth < 10) return;
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }
  function spawn(x, y, n, burst) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = burst ? 2.5 + Math.random() * 4 : 1 + Math.random() * 2;
      particles.push({
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
      const r = wrap.getBoundingClientRect();
      spawn(Math.random() * window.innerWidth, Math.random() * window.innerHeight, 2, false);
      last = now;
    }
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy; p.vy -= 0.015; p.life -= p.decay; p.rot += p.rotS;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      ctx.save();
      ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = "#d4af37";
      ctx.font = p.size + "px Segoe UI, serif";
      ctx.textAlign = "center";
      ctx.fillText(p.char, 0, 0);
      ctx.restore();
    }
    animId = (particles.length || hover) ? requestAnimationFrame(tick) : null;
  }
  function loop() { if (!animId) animId = requestAnimationFrame(tick); }
  wrap.addEventListener("mouseenter", function (e) {
    hover = true;
    const r = wrap.getBoundingClientRect();
    spawn(e.clientX - r.left, e.clientY - r.top, 14, false);
    loop();
  });
  wrap.addEventListener("mousemove", function (e) {
    if (!hover) return;
    const now = performance.now();
    if (now - last < 45) return;
    const r = wrap.getBoundingClientRect();
    spawn(e.clientX - r.left, e.clientY - r.top, 3, false);
    last = now; loop();
  });
  wrap.addEventListener("mouseleave", function () { hover = false; });
  wrap.addEventListener("click", function (e) {
    const r = wrap.getBoundingClientRect();
    spawn(e.clientX - r.left, e.clientY - r.top, 36, true);
    loop();
  });
  window.addEventListener("resize", resize);
  const img = document.getElementById("logo-img");
  if (img && img.complete) resize();
  else if (img) img.addEventListener("load", resize);
  setTimeout(resize, 80);
})();
