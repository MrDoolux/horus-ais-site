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

    // Naissance aux bords de l'écran, loin du wrap
    var side = Math.floor(Math.random() * 4);
    var x, y;
    if (side === 0) { x = Math.random() * vw; y = -80; }
    else if (side === 1) { x = vw + 80; y = Math.random() * vh; }
    else if (side === 2) { x = Math.random() * vw; y = vh + 80; }
    else { x = -80; y = Math.random() * vh; }

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

    // Vitesse de vol entre 1.5 et 2.5 secondes
    var flightMs = 1500 + Math.random() * 1000;

    setTimeout(function () {
      // Le badge disparaît d'un coup — plus d'animation d'implosion
      pkt.style.transition = "none";
      pkt.style.opacity = "0";
      pkt.style.transform = "translate(-50%, -50%) scale(0)";

      // Flash d'impact sur le bouclier
      var flash = document.createElement("div");
      flash.className = "attack-flash";
      flash.style.left = cx + "px";
      flash.style.top = cy + "px";
      layer.appendChild(flash);
      setTimeout(function () { if (flash.parentNode) flash.parentNode.removeChild(flash); }, 700);

      // Explosion en lettres individuelles : chaque caractère devient un fragment
      var text = pkt.textContent;
      var chars = text.split("");
      for (var f = 0; f < chars.length; f++) {
        var frag = document.createElement("div");
        frag.className = "attack-fragment";
        frag.textContent = chars[f];
        frag.style.left = cx + "px";
        frag.style.top = cy + "px";
        var angle = (Math.PI * 2 * f) / chars.length + (Math.random() - 0.5) * 0.8;
        var dist = 120 + Math.random() * 220;
        frag.style.setProperty("--dx", Math.cos(angle) * dist + "px");
        frag.style.setProperty("--dy", Math.sin(angle) * dist + "px");
        frag.style.setProperty("--rot", (Math.random() - 0.5) * 900 + "deg");
        layer.appendChild(frag);
        setTimeout(function (el) { if (el.parentNode) el.parentNode.removeChild(el); }, 1400, frag);
      }

      // Étincelles dorées autour de l'impact
      for (var i = 0; i < 50; i++) {
        var p = document.createElement("div");
        p.className = "attack-spark";
        var angle = Math.random() * Math.PI * 2;
        var dist = 50 + Math.random() * 180;
        p.style.left = cx + "px";
        p.style.top = cy + "px";
        p.style.setProperty("--dx", Math.cos(angle) * dist + "px");
        p.style.setProperty("--dy", Math.sin(angle) * dist + "px");
        layer.appendChild(p);
        setTimeout(function (el) { if (el.parentNode) el.parentNode.removeChild(el); }, 1100, p);
      }

      // Renvoi explicite : le paquet rebondit loin, dans une direction nettement écartée de l'axe d'arrivée
      var dx = cx - x;
      var dy = cy - y;
      var len = Math.sqrt(dx * dx + dy * dy) || 1;
      var nx = dx / len;
      var ny = dy / len;
      // Perpendiculaire pour écarter la trajectoire de rebond
      var px = -ny;
      var py = nx;
      var sideSign = Math.random() < 0.5 ? 1 : -1;
      var bx = cx + nx * 480 + px * sideSign * 220;
      var by = cy + ny * 480 + py * sideSign * 220;
      pkt.style.transition = "left 1.2s cubic-bezier(0.15, 0.85, 0.35, 1), top 1.2s cubic-bezier(0.15, 0.85, 0.35, 1), opacity 1.2s ease";
      pkt.style.left = bx + "px";
      pkt.style.top = by + "px";
      pkt.style.opacity = "0";

      setTimeout(function () {
        if (pkt.parentNode) pkt.parentNode.removeChild(pkt);
      }, 1400);
    }, flightMs);
  }

  setInterval(spawn, 4200);
  setTimeout(spawn, 1200);
})();