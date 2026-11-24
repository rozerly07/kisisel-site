// anasayfa.js — tr/index.html (referans/anasayfa.html'deki script; değerler aynen)
(function () {
  var azHareket = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lerp = function (a, b, t) { t = Math.min(1, Math.max(0, t)); return a + (b - a) * t; };
  var ease = function (t) { t = Math.min(1, Math.max(0, t)); return t * t * (3 - 2 * t); };

  /* ---------- 1. Giriş sahnesi ölçeği: assets/js/giris.js ---------- */

  /* ---------- 2. Kaydırma: çadır ortalanır → kapıya yaklaşılır → içeri girilir ---------- */
  var iz = document.getElementById('giris-iz');
  var dunya = document.querySelectorAll('.dunya');
  var baslik = document.getElementById('baslik');
  var isik = document.getElementById('isik'), perde = document.getElementById('ic-perde');
  function kaydir() {
    var toplam = iz.offsetHeight - 2 * innerHeight; // son 100vh: sirkin içi bu karenin üstüne kayar
    var p = toplam > 0 ? Math.min(1, Math.max(0, (scrollY - iz.offsetTop) / toplam)) : 0;
    // 0–0.35: çadır yukarı gelip ortalanır · 0.35–0.80: kapıya yaklaşma · 0.80–1: içeri giriş
    var a = ease(p / 0.35), b = p > 0.35 ? Math.pow((p - 0.35) / 0.45, 2.2) : 0;
    var s = lerp(1, 1.12, a) * lerp(1, 13, Math.min(1, b));
    var ty = lerp(0, -121, a) + lerp(0, -173, ease((p - 0.35) / 0.45));
    var tf = 'translateY(' + ty.toFixed(1) + 'px) scale(' + s.toFixed(3) + ')';
    for (var i = 0; i < dunya.length; i++) dunya[i].style.transform = tf;
    baslik.style.transform = 'translateY(' + lerp(0, -140, a).toFixed(1) + 'px)';
    baslik.style.opacity = lerp(1, 0, p / 0.3).toFixed(2);
    isik.style.opacity = (p < 0.62 ? 0 : p < 0.82 ? (p - 0.62) / 0.2 : lerp(1, 0, (p - 0.82) / 0.12)).toFixed(2);
    perde.style.opacity = lerp(0, 1, (p - 0.84) / 0.12).toFixed(2);
  }
  if (!azHareket) { addEventListener('scroll', kaydir, { passive: true }); addEventListener('resize', kaydir); kaydir(); }

  /* ---------- 3. Maskot: ekrana sabit, kendi dolaşır, imleç dokununca kaçar ---------- */
  var mk = document.getElementById('maskot'), yon = mk.querySelector('.maskot-yon');
  var mkImg = mk.querySelector('.maskot-gorsel'), MK_ON = '../assets/img/maskot/on.webp', MK_YAN = '../assets/img/maskot/yan-sag.webp', mkt;
  new Image().src = MK_YAN; // yan görünümü önceden yükle
  var m = { x: 12, y: 85 }, kaciyor = false, kt;
  function git(x, y, sure) {
    yon.style.transform = 'scaleX(' + (x < m.x ? -1 : 1) + ')';
    mk.style.transition = 'left ' + sure + ' cubic-bezier(.3,.8,.3,1),top ' + sure + ' cubic-bezier(.3,.8,.3,1)';
    mk.style.left = x + 'vw'; mk.style.top = y + 'vh'; m = { x: x, y: y };
    mkImg.src = MK_YAN; clearTimeout(mkt); mkt = setTimeout(function () { mkImg.src = MK_ON; }, parseFloat(sure) * 1000);
  }
  if (!azHareket) {
    setInterval(function () { if (!kaciyor) git(8 + Math.random() * 84, 72 + Math.random() * 18, '2.8s'); }, 4200);
    mk.addEventListener('mouseenter', function () {
      var x = m.x < 50 ? 55 + Math.random() * 35 : 8 + Math.random() * 35;
      kaciyor = true; git(x, 20 + Math.random() * 65, '.45s');
      clearTimeout(kt); kt = setTimeout(function () { kaciyor = false; }, 1500);
    });
  }

  /* ---------- 4. Proje kartları: imleç gelince büyür, diğerleri kayıp küçülür ---------- */
  var kartlar = [].slice.call(document.querySelectorAll('#projeler .proje-kart'));
  var SH0 = 'drop-shadow(0 0 14px rgba(255,170,90,.18)) drop-shadow(0 18px 24px rgba(5,0,20,.6))';
  var SH1 = 'drop-shadow(0 0 22px rgba(255,200,90,.45)) drop-shadow(0 26px 30px rgba(5,0,20,.7))';
  var pt;
  function projeSec(ps) {
    kartlar.forEach(function (k, i) {
      var ic = k.querySelector('.proje-ic'), on = ps === i, diger = ps !== null && !on;
      ic.style.transform = on ? 'translateY(-12px) scale(1.05)' : diger ? 'translateX(' + (i < ps ? -10 : 10) + 'px) scale(.96)' : 'none';
      ic.style.filter = on ? SH1 : SH0;
    });
  }
  kartlar.forEach(function (k, i) {
    var sec = function () { clearTimeout(pt); pt = setTimeout(function () { projeSec(i); }, 80); };
    k.addEventListener('mouseenter', sec); k.addEventListener('focus', sec);
  });
  document.getElementById('projeler').addEventListener('mouseleave', function () { clearTimeout(pt); projeSec(null); });

  /* ---------- 5. Karo duvar: baklava kafes, camgöz, imleçle büyüyen karo ---------- */
  // Fotoğraf eklemek için bu listeye bir satır ekle. İlk fotoğraf alt-ortaya gelir, sonrakiler dışa doğru dizilir.
  var GALERI = [
    { src: '../assets/img/gallery/kalp.webp', alt: "Kediler ve sevgi birbiriyle en çok özdeşleşebilecek kavramdır. Bu görseldeki gibi zıt renklerde bile sevgiyi görebiliyoruz.", renk: 'linear-gradient(150deg,#3A1260,#C6306E)' },
    { src: '../assets/img/gallery/love.webp', alt: "Kalabalık ve ruhsuz bir şehirde bile içinizi ısıtabilecek soğuk olan ama sıcak hissettiren şeyler görebilirsiniz. Bakmayı bilirseniz.", renk: 'linear-gradient(150deg,#FFC66B,#FF5A6E)' },
    { src: '../assets/img/gallery/milliphoto.webp', alt: "LA ya da hawai vibe'larına bayılırım. Bu yerlerde takılmak harika hissettiriyor.", renk: 'linear-gradient(150deg,#2A0D57,#7FA8FF)' },
    { src: '../assets/img/gallery/gunesdio.webp', alt: "Adımın anlamı olan güneş ışığı ve en sevdiğim animenin bir karakteri. Harika bir kare ヾ(≧▽≦*)o", renk: 'linear-gradient(150deg,#FF8A3D,#6A1B7A)' },
    { src: '../assets/img/gallery/photohyun.webp', alt: "En sevdeğim şeylerden biri de anı yakalamıktır. Gülümseyin!", renk: 'linear-gradient(150deg,#5B1E6E,#FFB0C8)' },
    { src: '../assets/img/gallery/roses.webp', alt: "İsmimin fransızca karşılığını sanırım herkes biliyordur. Benim en sevdiğim çiçeklerden biridir kendisi", renk: 'linear-gradient(150deg,#1E0838,#FF8A3D)' }
  ];
  var duvar = document.getElementById('karo-duvar');
  // Baklava kafes: satır r=0 en altta. Çift satırlarda x = 0, ±1, ±2… ; tek satırlarda x = ±0.5, ±1.5…
  var yuvalar = [];
  for (var r = 0; r < 30; r++) for (var x = -1.5; x <= 1.5; x += 0.5) if ((Math.abs(x * 2) % 2 === 0) === (r % 2 === 0)) yuvalar.push({ r: r, x: x, d: Math.hypot(x, r / 2) });
  yuvalar.sort(function (a, b) { return a.d - b.d || a.r - b.r || a.x - b.x; });
  var N = GALERI.length, D = 26, KOSEGEN = 21.8; // genişliğe göre %: kafes adımı, karo köşegeni
  var enUstSira = Math.max.apply(null, yuvalar.slice(0, N).map(function (q) { return q.r; }));
  var H = Math.max(60, KOSEGEN + 10 + enUstSira * D / 2 * 1.05 + 8); // kutu yüksekliği: fotoğraf arttıkça duvar yukarı doğru uzar
  duvar.style.aspectRatio = '1 / ' + (H / 100).toFixed(3);
  var taban = yuvalar.slice(0, N).map(function (q) { return { cx: 50 + q.x * D, cy: H - KOSEGEN / 2 - 4 - q.r * D / 2 * 1.05 }; });
  // Camgöz: ortadakiler büyür ve öne çıkar, kenarlara doğru küçülür; aralar açılarak boşluk korunur
  var ox = taban.reduce(function (a, q) { return a + q.cx; }, 0) / N, oy = taban.reduce(function (a, q) { return a + q.cy; }, 0) / N;
  var dmax = Math.max.apply(null, taban.map(function (q) { return Math.hypot(q.cx - ox, q.cy - oy); })) || 1;
  var yer = taban.map(function (q) {
    var vx = q.cx - ox, vy = q.cy - oy, u = Math.hypot(vx, vy) / dmax, b = 1 + 0.16 * (1 - u);
    return { cx: ox + vx * b, cy: oy + vy * b, mercek: 1.22 - 0.34 * u };
  });
  var CAM = 'linear-gradient(135deg,rgba(255,255,255,.55) 0%,rgba(255,255,255,.12) 28%,rgba(255,255,255,0) 45%),radial-gradient(circle at 28% 28%,rgba(255,255,255,.75) 0 4%,transparent 9%),radial-gradient(circle at 50% 50%,transparent 55%,rgba(20,0,40,.45) 100%)';
  var karolar = GALERI.map(function (g, i) {
    var q = yer[i], b = document.createElement('button');
    b.type = 'button'; b.setAttribute('aria-label', g.alt);
    b.style.cssText = 'position:absolute;left:' + (q.cx - 7.7).toFixed(2) + '%;top:' + ((q.cy - 7.7) / H * 100).toFixed(2) + '%;width:15.4%;aspect-ratio:1;padding:0;border:0;cursor:pointer;background:none;transition:transform 1.1s cubic-bezier(.22,1,.36,1)';
    var icerik = g.src
      ? '<img src="' + g.src + '" alt="' + g.alt + '" loading="lazy" style="position:absolute;left:50%;top:50%;width:142%;height:142%;object-fit:cover;transform:translate(-50%,-50%) rotate(-45deg)">'
      : '<span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;transform:rotate(-45deg);font-size:13px;font-weight:700;color:#FFF3DD">[FOTO ' + (i + 1) + ']</span>';
    b.innerHTML = '<span class="karo-yuz" style="position:absolute;inset:0;border-radius:16px;overflow:hidden;background:' + g.renk + ';transition:box-shadow 1.1s ease">' + icerik +
      '<span style="position:absolute;inset:0;border-radius:16px;background:' + CAM + ';box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.55),inset 0 -10px 22px rgba(20,0,40,.35)"></span></span>';
    duvar.appendChild(b);
    return b;
  });
  var secili = null, ht;
  function duvarCiz() {
    karolar.forEach(function (b, i) {
      var q = yer[i], dx = 0, dy = 0, sc = q.mercek, z = q.mercek > 1.1 ? 2 : 1;
      if (secili !== null) {
        var o = yer[secili];
        if (i === secili) { sc = 1.5; z = 5; }
        else {
          var vx = q.cx - o.cx, vy = q.cy - o.cy, len = Math.hypot(vx, vy) || 1, it = 6 / Math.max(1, len / D);
          dx = vx / len * it; dy = vy / len * it; sc = q.mercek * (len < D * 1.1 ? 0.82 : 0.9);
        }
      }
      b.style.zIndex = z;
      b.style.transform = 'translate(' + dx.toFixed(2) + 'cqw,' + dy.toFixed(2) + 'cqw) rotate(45deg) scale(' + sc + ')';
      b.firstChild.style.boxShadow = i === secili ? '0 40px 50px rgba(5,0,20,.7),0 0 40px rgba(255,190,110,.55)' : '0 12px 24px rgba(5,0,20,.45)';
    });
  }
  karolar.forEach(function (b, i) {
    var sec = function () { clearTimeout(ht); ht = setTimeout(function () { if (secili !== i) { secili = i; duvarCiz(); } }, 120); };
    b.addEventListener('mouseenter', sec); b.addEventListener('focus', sec);
  });
  duvar.addEventListener('mouseleave', function () { clearTimeout(ht); secili = null; duvarCiz(); });
  duvarCiz();
})();
