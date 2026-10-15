(function () {
  var layer = document.getElementById("attack-layer");
  var wrap = document.getElementById("logo-wrap");
  if (!layer || !wrap) return;

  var attacks = ["SQL injection", "Phishing", "Ransomware", "Brute force", "DDoS", "Zero-day", "MITM"];
  var idx = 0;

  function spawn() {
    var r = wrap.getBoundingClientRect();
    if (r.width < 10) return;

    var side = Math.floor(Math.random() * 4);
    var x, y;
    if (side === 0) { x = Math.random() * r.width; y = -50; }
    else if (side === 1) { x = r.width + 50; y = Math.random() * r.height; }
    else if (side === 2) { x = Math.random() * r.width; y = r.height + 50; }
    else { x = -50; y = Math.random() * r.height; }

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
      pkt.style.left = (r.width / 2) + "px";
      pkt.style.top = (r.height / 2) + "px";
    });

    setTimeout(function () {
      pkt.classList.remove("flying");
      pkt.classList.add("hit");
      setTimeout(function () {
        if (pkt.parentNode) pkt.parentNode.removeChild(pkt);
      }, 900);
    }, 3200);
  }

  setInterval(spawn, 4200);
  setTimeout(spawn, 1200);
})();
