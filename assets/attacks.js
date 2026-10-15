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
    if (side === 0) { x = r.left + Math.random() * r.width; y = r.top - 40; }
    else if (side === 1) { x = r.right + 40; y = r.top + Math.random() * r.height; }
    else if (side === 2) { x = r.left + Math.random() * r.width; y = r.bottom + 40; }
    else { x = r.left - 40; y = r.top + Math.random() * r.height; }

    var pkt = document.createElement("div");
    pkt.className = "attack-packet";
    pkt.textContent = attacks[idx % attacks.length];
    idx++;
    pkt.style.left = x + "px";
    pkt.style.top = y + "px";
    layer.appendChild(pkt);

    requestAnimationFrame(function () {
      pkt.classList.add("flying");
      pkt.style.left = (r.left + r.width / 2) + "px";
      pkt.style.top = (r.top + r.height / 2) + "px";
    });

    setTimeout(function () {
      pkt.classList.remove("flying");
      pkt.classList.add("hit");
      setTimeout(function () {
        if (pkt.parentNode) pkt.parentNode.removeChild(pkt);
      }, 800);
    }, 3200);
  }

  setInterval(spawn, 4200);
  setTimeout(spawn, 1200);
})();
