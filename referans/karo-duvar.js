/* ===== KARO DUVAR (ortak) — anasayfa ve galeri aynı kodu kullanır =====
   KaroDuvar(kutu, {
     fotolar: [{ src, alt, aciklama, renk }],   // ilk foto alt-ortaya, sonrakiler dışa doğru
     adim: 26, kosegen: 21.8, xMax: 1.5,          // kutu genişliğine göre %: kafes adımı, karo köşegeni, en dış sütun (adım cinsinden)
     yildiz: { boyutYatay: 2.6, boyutCapraz: 1.7, renk: '#FFF3C4', parilti: 'rgba(255,220,140,.9)' },
     tikla: function (i, dugme) {}               // karoya tıklanınca
   })
   Değerleri değiştirme; sayfaya özel ayarlar sayfanın kendi dosyasında verilir. */
(function () {
  var CSS = '' +
    '.kd-karo{position:absolute;aspect-ratio:1;padding:0;border:0;background:none;transition:transform 1.1s cubic-bezier(.22,1,.36,1)}' +
    '.kd-yuz{position:absolute;inset:0;border-radius:5px;overflow:hidden;transition:box-shadow 1.1s ease}' +
    '.kd-yuz img{position:absolute;left:50%;top:50%;width:142%;height:142%;object-fit:cover;transform:translate(-50%,-50%) rotate(-45deg)}' +
    '.kd-yuz .kd-yer{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;transform:rotate(-45deg);font-size:13px;font-weight:700;color:#FFF3DD}' +
    '.kd-yildiz{position:absolute;aspect-ratio:1;z-index:0;pointer-events:none;translate:-50% -50%;transition:left 1.1s cubic-bezier(.22,1,.36,1),top 1.1s cubic-bezier(.22,1,.36,1)}' +
    '.kd-yildiz>span,.kd-yildiz>span>span{display:block;width:100%;height:100%}' +
    '.kd-yildiz svg{display:block;width:100%;height:100%}' +
    '@keyframes kdSuzul1{0%,100%{transform:translate(0,0)}25%{transform:translate(7px,-9px)}50%{transform:translate(-5px,-4px)}75%{transform:translate(4px,8px)}}' +
    '@keyframes kdSuzul2{0%,100%{transform:translate(0,0)}30%{transform:translate(-8px,6px)}60%{transform:translate(6px,9px)}85%{transform:translate(-3px,-7px)}}' +
    '@keyframes kdSuzul3{0%,100%{transform:translate(0,0)}20%{transform:translate(5px,7px)}55%{transform:translate(-9px,-3px)}80%{transform:translate(3px,-8px)}}' +
    '@keyframes kdPirilti{0%,100%{transform:scale(.35) rotate(0deg);opacity:.25}45%{transform:scale(1) rotate(45deg);opacity:1}60%{transform:scale(.8) rotate(60deg);opacity:.85}}' +
    '@media (prefers-reduced-motion:reduce){.kd-karo,.kd-yildiz{transition:none}.kd-yildiz *{animation:none!important}}';
  if (!document.getElementById('kd-stil')) { var st = document.createElement('style'); st.id = 'kd-stil'; st.textContent = CSS; document.head.appendChild(st); }
  var R = [0.37, 0.91, 0.12, 0.66, 0.48, 0.83, 0.05, 0.72, 0.29, 0.58, 0.94, 0.21, 0.77, 0.43];
  var YILDIZ = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 0 C10.8 6.2 13.8 9.2 20 10 C13.8 10.8 10.8 13.8 10 20 C9.2 13.8 6.2 10.8 0 10 C6.2 9.2 9.2 6.2 10 0 Z" fill="RENK"/></svg>';
  var esc = function (t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  window.KaroDuvar = function (kutu, o) {
    var F = o.fotolar, N = F.length, D = o.adim, KOS = o.kosegen, KENAR = KOS / Math.SQRT2, XM = o.xMax;
    var y = o.yildiz || {};
    kutu.style.position = 'relative'; kutu.style.containerType = 'inline-size';
    // baklava kafes: satır r=0 en altta; çift satırlarda x tam sayı, tek satırlarda yarım
    var yuva = [];
    for (var r = 0; r < 40; r++) for (var x = -XM; x <= XM + 1e-9; x += 0.5) if ((Math.abs(Math.round(x * 2)) % 2 === 0) === (r % 2 === 0)) yuva.push({ r: r, x: x, d: Math.hypot(x, r / 2) });
    yuva.sort(function (a, b) { return a.d - b.d || a.r - b.r || a.x - b.x; });
    var ust = Math.max.apply(null, yuva.slice(0, N).map(function (q) { return q.r; }));
    var H = KOS + 12 + ust * D / 2 * 1.05 + 10;
    kutu.style.aspectRatio = '1 / ' + (H / 100).toFixed(3);
    var taban = yuva.slice(0, N).map(function (q) { return { cx: 50 + q.x * D, cy: H - KOS / 2 - 6 - q.r * D / 2 * 1.05 }; });
    // camgöz: ortadakiler büyük ve öne çıkık, aralar açılır
    var ox = 0, oy = 0; taban.forEach(function (q) { ox += q.cx / N; oy += q.cy / N; });
    var dmax = Math.max.apply(null, taban.map(function (q) { return Math.hypot(q.cx - ox, q.cy - oy); })) || 1;
    var yer = taban.map(function (q) {
      var vx = q.cx - ox, vy = q.cy - oy, u = Math.hypot(vx, vy) / dmax, b = 1 + 0.16 * (1 - u);
      return { cx: ox + vx * b, cy: oy + vy * b, mercek: 1.22 - 0.34 * u };
    });
    // karolar
    var karolar = F.map(function (f, i) {
      var q = yer[i], b = document.createElement('button');
      b.type = 'button'; b.className = 'kd-karo'; b.setAttribute('aria-label', (f.alt || ('Fotoğraf ' + (i + 1))) + ' — büyüt');
      b.style.left = (q.cx - KENAR / 2).toFixed(2) + '%'; b.style.top = ((q.cy - KENAR / 2) / H * 100).toFixed(2) + '%'; b.style.width = KENAR.toFixed(2) + '%';
      b.innerHTML = '<span class="kd-yuz" style="background:' + (f.renk || '#3A1260') + '">' +
        (f.src ? '<img src="' + esc(f.src) + '" alt="" loading="lazy">' : '<span class="kd-yer">[FOTO ' + (i + 1) + ']</span>') + '</span>';
      kutu.appendChild(b); return b;
    });
    // parıltılar: yan yana karoların köşe buluşması (büyük) ve çapraz komşuların arası (küçük)
    var yildizlar = [];
    for (var i = 0; i < N; i++) for (var j = i + 1; j < N; j++) {
      var a = taban[i], c = taban[j], dx = Math.abs(a.cx - c.cx), dy = Math.abs(a.cy - c.cy);
      var yatay = Math.abs(dx - D) < 0.5 && dy < 0.5, capraz = Math.abs(dx - D / 2) < 0.5 && Math.abs(dy - D / 2 * 1.05) < 0.5;
      if (!yatay && !capraz) continue;
      var k = yildizlar.length, v = R[k % 14], s = document.createElement('span');
      s.className = 'kd-yildiz'; s.setAttribute('aria-hidden', 'true');
      s.style.width = (yatay ? (y.boyutYatay || 2.6) : (y.boyutCapraz || 1.7)) + '%';
      s.innerHTML = '<span style="animation:kdSuzul' + (1 + k % 3) + ' ' + (5 + v * 5).toFixed(2) + 's ease-in-out infinite;animation-delay:' + (-R[(k * 5) % 14] * 4).toFixed(2) + 's">' +
        '<span style="animation:kdPirilti ' + (2.2 + v * 2.4).toFixed(2) + 's ease-in-out infinite;animation-delay:' + (-R[(k * 5) % 14] * 4).toFixed(2) + 's;filter:drop-shadow(0 0 6px ' + (y.parilti || 'rgba(255,220,140,.9)') + ')">' +
        YILDIZ.replace('RENK', y.renk || '#FFF3C4') + '</span></span>';
      kutu.insertBefore(s, kutu.firstChild);
      yildizlar.push({ el: s, i: i, j: j });
    }
    // imleçle büyüyen karo, diğerleri boşluğu koruyarak itilip küçülür; parıltılar karolarla birlikte kayar
    var secili = null, zt;
    function ciz() {
      var kay = yer.map(function (q, i) {
        var dx = 0, dy = 0, sc = q.mercek, z = q.mercek > 1.1 ? 2 : 1;
        if (secili !== null) {
          var o = yer[secili];
          if (i === secili) { sc = 1.5; z = 5; }
          else {
            var vx = q.cx - o.cx, vy = q.cy - o.cy, len = Math.hypot(vx, vy) || 1, it = 6 / Math.max(1, len / D);
            dx = vx / len * it; dy = vy / len * it; sc = q.mercek * (len < D * 1.1 ? 0.82 : 0.9);
          }
        }
        var b = karolar[i];
        b.style.zIndex = z;
        b.style.transform = 'translate(' + dx.toFixed(2) + 'cqw,' + dy.toFixed(2) + 'cqw) rotate(45deg) scale(' + sc + ')';
        b.firstChild.style.boxShadow = i === secili ? '0 40px 50px rgba(5,0,20,.7),0 0 40px rgba(255,190,110,.55)' : '0 12px 24px rgba(5,0,20,.45)';
        return { dx: dx, dy: dy };
      });
      yildizlar.forEach(function (s) {
        var mx = (yer[s.i].cx + kay[s.i].dx + yer[s.j].cx + kay[s.j].dx) / 2, my = (yer[s.i].cy + kay[s.i].dy + yer[s.j].cy + kay[s.j].dy) / 2;
        s.el.style.left = mx.toFixed(2) + '%'; s.el.style.top = (my / H * 100).toFixed(2) + '%';
      });
    }
    karolar.forEach(function (b, i) {
      var sec = function () { clearTimeout(zt); zt = setTimeout(function () { if (secili !== i) { secili = i; ciz(); } }, 120); };
      b.addEventListener('mouseenter', sec); b.addEventListener('focus', sec);
      b.addEventListener('click', function () { if (o.tikla) o.tikla(i, b); });
    });
    kutu.addEventListener('mouseleave', function () { clearTimeout(zt); secili = null; ciz(); });
    ciz();
    return { karolar: karolar };
  };
})();
