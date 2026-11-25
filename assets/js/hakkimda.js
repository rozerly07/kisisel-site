/* ==========================================================================
   hakkimda.js — tr/about.html (referans/hakkimda.html'den BİREBİR)
   Cambaz ipi (eğitim) · güç ölçer (yetenekler) · hokkabaz topları (ilgi alanları)
   Değerlere DOKUNMA; yalnızca VERİ bölümü ICERIK.md'den doldurulur.
   ========================================================================== */
(function () {
  /* ================= VERİ (ICERIK.md'den) ================= */
  var EGITIM = [
    { yil: '2012 – 2016', okul: 'İrenoğulları İlkokulu', bolum: '' },
    { yil: '2016 – 2020', okul: 'Şahinevler Ortaokulu', bolum: '' },
    { yil: '2020 – 2024', okul: 'Karatay Anadolu Lisesi', bolum: 'Sayısal' },
    { yil: '2025 – 2027', okul: 'Akdeniz Üniversitesi', bolum: 'Bilgisayar Programcılığı' }
  ];
  var YETENEK = [['Resim çizebiliyor', 9], ['Hızlı öğreniyor', 8], ['Rol yapabiliyor', 7]]; // ad, 1–10
  var ILGI = ['Dünya sineması', 'Animeler', 'Moda', 'Tarih', 'Felsefe', 'Edebiyat', 'Seyahat', 'Dövüş sporları', 'Havacılık'];
  var TOP_RENK = [['#FF5A6E', '#FFF3DD'], ['#FFC24B', '#2A0D45'], ['#7FE7FF', '#1A0B33'], ['#B98CFF', '#1A0B33'], ['#FF8A3D', '#2A0D45'], ['#FFB0C8', '#2A0D45']];

  var $ = function (id) { return document.getElementById(id); };
  var az = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var esc = function (t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* ---------- 1. Cambaz ipi ---------- */
  var ipKutu = $('ip'), cambaz = $('cambaz'), M = EGITIM.length, iz = $('egitim-iz'), sec = $('egitim');
  var pt = function (t) { return { x: (1 - t) * (1 - t) * 29 + 2 * t * (1 - t) * 540 + t * t * 1051, y: (1 - t) * (1 - t) * 60 + 2 * t * (1 - t) * 170 + t * t * 60 }; };
  var T0 = 0.18, T1 = 0.82;
  var ts = EGITIM.map(function (e, i) { return M === 1 ? 0.5 : T0 + (T1 - T0) * i / (M - 1); });
  var duraklar = EGITIM.map(function (e, i) {
    var p = pt(ts[i]), d = document.createElement('div');
    d.className = 'durak'; d.style.left = (p.x / 1080 * 100).toFixed(2) + '%'; d.style.top = p.y + 'px';
    // ip: tek SVG path (durak noktası 0,6 → kartın üst-ortası), dikey gradyan .7 → .25
    d.innerHTML = '<span class="durak-nokta"></span>' +
      '<svg class="durak-ip" aria-hidden="true"><defs><linearGradient id="hk-ipg' + i + '" gradientUnits="userSpaceOnUse" x1="0" y1="6" x2="0" y2="' + (216 - p.y) + '">' +
      '<stop offset="0" stop-color="#FFE7C2" stop-opacity=".7"/><stop offset="1" stop-color="#FFE7C2" stop-opacity=".25"/></linearGradient></defs>' +
      '<path fill="none" stroke="url(#hk-ipg' + i + ')" stroke-width="2" stroke-linecap="round"/></svg>' +
      '<div class="durak-asili" style="top:' + (216 - p.y) + 'px"><div class="cam durak-kart"><span class="durak-yil">' + esc(e.yil) + '</span>' +
      '<span class="durak-okul">' + esc(e.okul) + '</span><span class="durak-bolum">' + esc(e.bolum) + '</span></div></div>';
    ipKutu.appendChild(d); return d;
  });
  // telefon: dikey ip
  var dikey = $('ip-dikey');
  var dKartlar = EGITIM.map(function (e) {
    var d = document.createElement('div'); d.className = 'cam dikey-kart';
    d.innerHTML = '<span class="durak-yil">' + esc(e.yil) + '</span><span class="durak-okul">' + esc(e.okul) + '</span><span class="durak-bolum">' + esc(e.bolum) + '</span>';
    dikey.appendChild(d); return d;
  });
  var cambazD = $('cambaz-dikey'), aktifD = -1;
  var tel = matchMedia('(max-width:760px)');

  /* --- ipler: sönümlü yay (s = alt ucun yatay kayması, px) --- */
  var C = 0.06, TH = 0.35 * Math.PI / 180, sMax = 18, kademe = false;
  var ipler = duraklar.map(function (d, i) {
    var y0 = pt(ts[i]).y;
    return {
      el: d.querySelector('.durak-asili'), kart: d.querySelector('.durak-kart'),
      yol: d.querySelector('.durak-ip path'), grad: d.querySelector('linearGradient'),
      y0: y0, L: 216 - y0, k: 0.02, A: 0, s: 0, v: 0,
      sarkma: (i % 2 ? -1 : 1) * 4 / 0.75,          // ortada ±4px sabit kavis (kübik bezier ortası = 0.75 × kontrol kayması)
      T: 3 + ((i * 0.618) % 1) * 2, faz: i * 2.399  // boşta itme: 3–5 sn periyot, kendi fazı
    };
  });
  function ipCiz(o) {
    var s = o.s, L = o.L, a = o.sarkma, b = L - 6;
    o.yol.setAttribute('d', 'M0 6C' + (s * 0.15 + a).toFixed(2) + ' ' + (6 + b / 3).toFixed(1) + ' ' +
      (s * 0.7 + a).toFixed(2) + ' ' + (6 + b * 2 / 3).toFixed(1) + ' ' + s.toFixed(2) + ' ' + L.toFixed(1));
    o.el.style.transform = 'translateX(' + s.toFixed(2) + 'px) rotate(' + (s * 0.35).toFixed(3) + 'deg)';
  }
  // yerleşim: komşu durak mesafesi < 296px → kartlar kademeli (tek sıradakiler 150px aşağıda)
  function yerlesim() {
    var W = ipKutu.clientWidth; if (!W) return;
    var xs = ts.map(function (t) { return pt(t).x / 1080 * W; }), d = Infinity;
    for (var i = 1; i < M; i++) d = Math.min(d, xs[i] - xs[i - 1]);
    kademe = d < 296;
    ipKutu.style.height = kademe ? '580px' : '';
    var w = Math.min(280, d * 2 - 16), h = 0;
    ipler.forEach(function (o, i) {
      var uzun = kademe && i % 2 === 1, om = 2 * Math.PI / (o.T * 60);
      o.L = 216 - o.y0 + (uzun ? 150 : 0);
      o.k = uzun ? 0.014 : 0.02;
      o.A = 2.5 * Math.sqrt(Math.pow(o.k - om * om, 2) + Math.pow(C * om, 2)); // kararlı hâlde ≈ ±2.5px
      o.el.style.top = o.L + 'px';
      o.kart.style.width = w + 'px'; o.kart.style.left = (-w / 2) + 'px';
      o.grad.setAttribute('y2', o.L);
      h = Math.max(h, o.kart.offsetHeight);
    });
    // çakışma sınırı: aynı sıradaki komşular birbirine doğru sallansa da (aktif kart %4 büyür) değmesin
    var m = ((kademe ? 2 * d : d) - w * 1.04 - 6) / (2 * (1 + h * 1.04 * TH));
    // kademede alt-üst komşular yatayda örtüşüyorsa: dönme köşeyi kaldırır/indirir
    if (kademe && w * 1.04 > d) m = Math.min(m, (140 - h * 1.04 - 4) / (w * 1.04 * TH));
    sMax = Math.max(0, Math.min(18, m));
    ipler.forEach(function (o) { if (Math.abs(o.s) > sMax) o.s = o.s < 0 ? -sMax : sMax; ipCiz(o); });
  }
  // fizik: tek rAF döngüsü, yalnızca bölüm ekrandayken
  var raf = 0, sonY = scrollY;
  function adim(now) {
    raf = requestAnimationFrame(adim);
    var dy = scrollY - sonY; sonY = scrollY;
    var it = Math.max(-1.5, Math.min(1.5, dy * 0.004)), sn = now / 1000;
    ipler.forEach(function (o, i) {
      o.v += -o.k * o.s - C * o.v + o.A * Math.sin(sn * 2 * Math.PI / o.T + o.faz) + (i % 2 ? -it : it);
      o.s += o.v;
      if (o.s > sMax) { o.s = sMax; if (o.v > 0) o.v *= -0.3; }
      else if (o.s < -sMax) { o.s = -sMax; if (o.v < 0) o.v *= -0.3; }
      ipCiz(o);
    });
  }
  function itme(i, yon) {
    if (!raf) return;
    ipler[i].v += 5 * yon;
    if (ipler[i - 1]) ipler[i - 1].v += 1.5 * yon;
    if (ipler[i + 1]) ipler[i + 1].v += 1.5 * yon;
  }
  if (!az && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting && !raf) { sonY = scrollY; raf = requestAnimationFrame(adim); }
        else if (!e.isIntersecting && raf) { cancelAnimationFrame(raf); raf = 0; }
      });
    }).observe(ipKutu);
  }

  /* --- sabitleme (masaüstü): iz = 100vh + (okul − 1) × 60vh, içerik sticky --- */
  var sabit = false;
  function sabitKur() {
    sabit = !az && !tel.matches && innerHeight >= (kademe ? 870 : 720);
    iz.classList.toggle('sabit', sabit);
    iz.style.height = sabit ? Math.round(innerHeight * (1 + (M - 1) * 0.6)) + 'px' : '';
  }
  var tOnce = null;
  function ipGuncelle() {
    var t, p;
    if (az) t = ts[M - 1];
    else {
      if (sabit) { var r = iz.getBoundingClientRect(), yol = r.height - innerHeight; p = yol > 0 ? -r.top / yol : 0; }
      else { var rs = sec.getBoundingClientRect(); p = (innerHeight / 2 - rs.top) / rs.height; }
      p = Math.min(1, Math.max(0, p));
      t = ts[0] + (ts[M - 1] - ts[0]) * p;
    }
    var c = pt(t);
    cambaz.style.left = (c.x / 1080 * 100).toFixed(2) + '%'; cambaz.style.top = c.y + 'px';
    var en = 0, ed = 9; ts.forEach(function (x, i) { var dd = Math.abs(x - t); if (dd < ed) { ed = dd; en = i; } });
    duraklar.forEach(function (d, i) { d.classList.toggle('aktif', az || i === en); d.classList.toggle('gecti', !az && i < en); });
    // cambaz bir duraktan geçtiği an o ipe (ve %30'u komşulara) hareket yönünde itme
    if (tOnce !== null && t !== tOnce) {
      var yon = t > tOnce ? 1 : -1;
      ts.forEach(function (x, i) { if ((tOnce < x && t >= x) || (tOnce > x && t <= x)) itme(i, yon); });
    }
    tOnce = t;
    // telefon: liste üstü ekran ortasına gelince yürür, altı ortaya gelince son kartta durur
    if (!tel.matches) return;
    var dr = dikey.getBoundingClientRect(), pd = az ? 1 : Math.min(1, Math.max(0, (innerHeight / 2 - dr.top) / dr.height));
    var orta = function (k) { return k.offsetTop + k.offsetHeight / 2; };
    var y = orta(dKartlar[0]) + (orta(dKartlar[M - 1]) - orta(dKartlar[0])) * pd;
    cambazD.style.top = y.toFixed(1) + 'px';
    var a = 0, ad = Infinity; dKartlar.forEach(function (k, i) { var dd = Math.abs(orta(k) - y); if (dd < ad) { ad = dd; a = i; } });
    if (az) a = -2;
    if (a !== aktifD) { aktifD = a; dKartlar.forEach(function (k, i) { k.classList.toggle('aktif', a === -2 || i === a); }); }
  }
  function ipHepsi() { yerlesim(); sabitKur(); ipGuncelle(); }
  addEventListener('scroll', ipGuncelle, { passive: true }); addEventListener('resize', ipHepsi); ipHepsi();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(ipHepsi);

  /* ---------- 2. Güç ölçer ---------- */
  var kuleler = $('kuleler');
  kuleler.innerHTML = YETENEK.map(function (y, i) {
    var v = Math.max(0, Math.min(10, y[1])), zil = v >= 9;
    return '<div class="kule' + (zil ? ' zilli' : '') + '" style="--sv:' + v + ';--gecikme:' + (i * 0.18).toFixed(2) + 's">' +
      '<div class="zil"><svg width="46" height="40" viewBox="0 0 46 40" aria-hidden="true"><path d="M23 4 C8 4 6 22 4 32 L42 32 C40 22 38 4 23 4Z" fill="url(#zg)"/><rect x="2" y="31" width="42" height="5" rx="2" fill="#C98A2B"/><circle cx="23" cy="38" r="3" fill="#8A5A14"/></svg><span class="zil-isik" aria-hidden="true"></span></div>' +
      '<div class="tup" role="meter" aria-valuemin="0" aria-valuemax="10" aria-valuenow="' + v + '" aria-label="' + esc(y[0]) + '"><div class="cizgiler" aria-hidden="true">' + '<span></span>'.repeat(11) + '</div><div class="sivi"><span class="pul"></span></div></div>' +
      '<div class="kaide"></div><span class="kule-deger">' + v + '/10</span><span class="kule-ad">' + esc(y[0]) + '</span></div>';
  }).join('');
  if ('IntersectionObserver' in window && !az) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { kuleler.classList.add('gorundu'); io.disconnect(); } }); }, { threshold: 0.35 });
    io.observe(kuleler);
  } else kuleler.classList.add('gorundu');

  /* ---------- 3. Hokkabaz topları ---------- */
  var sahne = $('toplar'), N = ILGI.length;
  sahne.innerHTML = ILGI.map(function (ad, i) {
    var c = TOP_RENK[i % TOP_RENK.length];
    return '<button type="button" class="top" style="--renk:' + c[0] + ';color:' + c[1] + ';animation-delay:' + (-i * 9 / N).toFixed(2) + 's">' + esc(ad) + '</button>';
  }).join('');
  var toplar = [].slice.call(sahne.children);
  toplar.forEach(function (b) {
    var sec = function () { sahne.classList.add('durdu'); toplar.forEach(function (x) { x.classList.toggle('secili', x === b); }); };
    b.addEventListener('mouseenter', sec); b.addEventListener('focus', sec);
  });
  var birak = function () { sahne.classList.remove('durdu'); toplar.forEach(function (x) { x.classList.remove('secili'); }); };
  sahne.addEventListener('mouseleave', birak);
  sahne.addEventListener('focusout', function (e) { if (!sahne.contains(e.relatedTarget)) birak(); });
  function topOlc() { var k = Math.min(1, sahne.parentNode.clientWidth / 640); sahne.style.transform = 'scale(' + k + ')'; sahne.parentNode.style.height = (380 * k) + 'px'; }
  addEventListener('resize', topOlc); topOlc();
})();
