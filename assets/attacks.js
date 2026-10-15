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

    setTimeout(function () {
      pkt.classList.remove("flying");
      pkt.classList.add("hit");

      // Flash d'impact sur le bouclier
      var flash = document.createElement("div");
      flash.className = "attack-flash";
      flash.style.left = cx + "px";
      flash.style.top = cy + "px";
      layer.appendChild(flash);
      setTimeout(function () { if (flash.parentNode) flash.parentNode.removeChild(flash); }, 700);

      // Explosion en morceaux : le badge se déchire en 8 fragments qui partent dans toutes les directions
      var text = pkt.textContent;
      var chars = text.split("");
      var fragCount = Math.min(chars.length, 8);
      for (var f = 0; f < fragCount; f++) {
        var frag = document.createElement("div");
        frag.className = "attack-fragment";
        frag.textContent = chars[f];
        frag.style.left = cx + "px";
        frag.style.top = cy + "px";
        var angle = (Math.PI * 2 * f) / fragCount + (Math.random() - 0.5) * 0.6;
        var dist = 80 + Math.random() * 140;
        frag.style.setProperty("--dx", Math.cos(angle) * dist + "px");
        frag.style.setProperty("--dy", Math.sin(angle) * dist + "px");
        frag.style.setProperty("--rot", (Math.random() - 0.5) * 720 + "deg");
        layer.appendChild(frag);
        setTimeout(function (el) { if (el.parentNode) el.parentNode.removeChild(el); }, 1200, frag);
      }

      // Étincelles dorées autour de l'impact
      for (var i = 0; i < 40; i++) {
        var p = document.createElement("div");
        p.className = "attack-spark";
        var angle = Math.random() * Math.PI * 2;
        var dist = 40 + Math.random() * 150;
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
      var bx = cx + nx * 420 + px * sideSign * 180;
      var by = cy + ny * 420 + py * sideSign * 180;
      pkt.style.transition = "left 1.1s cubic-bezier(0.15, 0.85, 0.35, 1), top 1.1s cubic-bezier(0.15, 0.85, 0.35, 1), opacity 1.1s ease";
      pkt.style.left = bx + "px";
      pkt.style.top = by + "px";
      pkt.style.opacity = "0";

      setTimeout(function () {
        if (pkt.parentNode) pkt.parentNode.removeChild(pkt);
      }, 1300);
    }, 3200);
  }

  setInterval(spawn, 4200);
  setTimeout(spawn, 1200);
})();