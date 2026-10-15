(function () {
  var layer = document.getElementById("attack-layer");
  var wrap = document.getElementById("logo-wrap");
  if (!layer || !wrap) return;

  var attacks = ["SQL injection", "Phishing", "Ransomware", "Brute force", "DDoS", "Zero-day", "MITM"];
  var idx = 0;

  function spawn() {
    var wr = wrap.getBoundingClientRect();
    if (wr.width < 10) return;

    var vw = window.innerWidth;
    var vh = window.innerHeight;
    var cx = wr.left + wr.width / 2;
    var cy = wr.top + wr.height / 2;

    var side = Math.floor(Math.random() * 4);
    var x, y;
    if (side === 0) { x = Math.random() * vw; y = -60; }
    else if (side === 1) { x = vw + 60; y = Math.random() * vh; }
    else if (side === 2) { x = Math.random() * vw; y = vh + 60; }
    else { x = -60; y = Math.random() * vh; }

    var pkt = document.createElement("div");
    pkt.className = "attack-packet";
    pkt.textContent = attacks[idx % attacks.length];
    idx++;
    pkt.style.left = x + "px";
    pkt.style.top = y + "px";
    layer.appendChild(pkt);

    // Force le reflow pour que la transition s'applique
    pkt.offsetWidth;

    requestAnimationFrame(function () {
      pkt.classList.add("flying");
      pkt.style.left = cx + "px";
      pkt.style.top = cy + "px";
    });

    setTimeout(function () {
      pkt.classList.remove("flying");
      pkt.classList.add("hit");
      // Explosion de rejet : particules dorées qui jaillissent du point d'impact
      for (var i = 0; i < 14; i++) {
        var p = document.createElement("div");
        p.className = "attack-spark";
        var angle = Math.random() * Math.PI * 2;
        var dist = 30 + Math.random() * 70;
        p.style.left = cx + "px";
        p.style.top = cy + "px";
        p.style.setProperty("--dx", Math.cos(angle) * dist + "px");
        p.style.setProperty("--dy", Math.sin(angle) * dist + "px");
        layer.appendChild(p);
        setTimeout(function (el) { if (el.parentNode) el.parentNode.removeChild(el); }, 900, p);
      }
      setTimeout(function () {
        if (pkt.parentNode) pkt.parentNode.removeChild(pkt);
      }, 900);
    }, 3200);
  }

  setInterval(spawn, 4200);
  setTimeout(spawn, 1200);
})();
