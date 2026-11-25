// maskot.js — tr/index.html maskotu
// · Navbar modu (scrollY < 80): logonun sağında, 44px (mobil 36px), yerinde süzülür;
//   dokununca navbar boşluklarında başka bir yere kaçar; ara sıra link yazısı yer.
// · Aşağı kaydırınca: yan görünümle yay çizerek (0.9s) navbardan atlar, 90px'e büyür,
//   dolaşma moduna geçer (referans/anasayfa.html "3. Maskot" — değerler aynen).
// · En üste dönünce: yürüyüp küçülerek navbardaki yerine oturur.
// · prefers-reduced-motion: yalnızca navbarda hareketsiz durur, yeme yok.
(function () {
  'use strict';
  var azHareket = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mk = document.getElementById('maskot');
  if (!mk) return;
  var html = document.documentElement;
  var yon = mk.querySelector('.maskot-yon');
  var cig = mk.querySelector('.maskot-cigne') || yon;
  // görsel yolları sayfa derinliğinden bağımsız: ön görselin kendi adresinden
  var mkImg = mk.querySelector('.maskot-gorsel'), MK_ON = mkImg.src, MK_YAN = MK_ON.replace(/on\.webp$/, 'yan-sag.webp');
  new Image().src = MK_YAN; // yan görünümü önceden yükle

  var bar = document.querySelector('.giris-bar');
  var logo = bar && bar.querySelector('a');
  var nav = bar && bar.querySelector('nav');
  var mobilSorgu = window.matchMedia('(max-width:760px)');

  var BOY = 90, ESIK = 80;
  var EGRI = 'cubic-bezier(.3,.8,.3,1)';      // referans yürüyüş eğrisi
  var Z_GEZI = '20', Z_NAV = '31';             // navbar (z 30) üstü

  var durum = 'gezi';   // nav | kacis | gecis | yiyor | gezi
  var modNav = false;   // hedef mod
  var tur = 0;          // her yeni eylem öncekinin zamanlayıcılarını geçersiz kılar
  var gecisAnim = null, mkt, kt, kaciyor = false;
  var m = { x: 12, y: 85 }; // dolaşma konumu (vw/vh) — referans başlangıç

  function navBoy() { return mobilSorgu.matches ? 36 : 44; }
  function olcek() { return navBoy() / BOY; }

  /* yan: yan görünüm mü · sag: yüz sağa mı (yan-sag.webp sağa bakar) */
  function gorunum(yan, sag) {
    clearTimeout(mkt);
    mkImg.src = yan ? MK_YAN : MK_ON;
    if (sag !== undefined) yon.style.transform = 'scaleX(' + (sag ? 1 : -1) + ')';
  }

  /* Süren geçişi o anki yerinde dondur (sıçrama olmadan yeni harekete başlamak için) */
  function dondur() {
    var cs = getComputedStyle(mk), l = cs.left, t = cs.top, tf = cs.transform;
    if (gecisAnim) { gecisAnim.cancel(); gecisAnim = null; }
    mk.style.transition = 'none';
    mk.style.left = l; mk.style.top = t;
    mk.style.transform = tf === 'none' ? '' : tf;
    void mk.offsetWidth;
  }

  function konumla(x, y, olc, sure, egri) {
    if (sure) {
      egri = egri || EGRI;
      mk.style.transition = 'left ' + sure + ' ' + egri + ',top ' + sure + ' ' + egri + ',transform ' + sure + ' ' + egri;
    } else {
      mk.style.transition = 'none';
    }
    mk.style.left = x + 'px'; mk.style.top = y + 'px';
    mk.style.transform = 'scale(' + olc + ')';
  }

  /* Navbardaki yeri: logonun sağı, dikey orta */
  function evNoktasi() {
    var l = logo.getBoundingClientRect(), b = bar.getBoundingClientRect();
    return { x: l.right + 10 + navBoy() / 2, y: b.top + b.height / 2 };
  }

  /* Navbar içinde öğelerin (logo, menü, TR·EN, menü butonu) arasındaki boşluklar */
  function bosluklar() {
    var ogeler = [].filter.call(bar.children, function (e) { return e.getClientRects().length; })
      .map(function (e) { return e.getBoundingClientRect(); })
      .sort(function (a, b) { return a.left - b.left; });
    var g = [], pay = navBoy() / 2 + 4;
    for (var i = 0; i < ogeler.length - 1; i++) {
      var a = ogeler[i].right + pay, z = ogeler[i + 1].left - pay;
      if (z > a) g.push([a, z]);
    }
    return g;
  }

  /* ---------- Navbar modu ---------- */
  function navaYerles() {
    tur++; modNav = true; durum = 'nav';
    if (gecisAnim) { gecisAnim.cancel(); gecisAnim = null; }
    mk.classList.add('mk-nav'); mk.style.zIndex = Z_NAV;
    var e = evNoktasi();
    konumla(e.x, e.y, olcek(), 0);
    gorunum(false, true);
    yemePlanla();
  }

  function navEveDon(t) {
    var e = evNoktasi(), x0 = parseFloat(getComputedStyle(mk).left);
    durum = 'kacis';
    dondur(); gorunum(true, e.x > x0);
    konumla(e.x, e.y, olcek(), '.45s');
    setTimeout(function () { if (t !== tur) return; gorunum(false); durum = 'nav'; yemePlanla(); }, 450);
  }

  function navKac() {
    var g = bosluklar(); if (!g.length) return;
    var cx = parseFloat(getComputedStyle(mk).left), en = null;
    for (var i = 0; i < 6; i++) { // birkaç aday: mevcut yerden en uzak olanı
      var b = g[Math.floor(Math.random() * g.length)], x = b[0] + Math.random() * (b[1] - b[0]);
      if (en === null || Math.abs(x - cx) > Math.abs(en - cx)) en = x;
    }
    var t = ++tur; durum = 'kacis';
    dondur(); gorunum(true, en > cx);
    konumla(en, evNoktasi().y, olcek(), '.45s');
    setTimeout(function () { if (t !== tur) return; gorunum(false); durum = 'nav'; yemePlanla(); }, 450);
  }

  /* ---------- Navbardan aşağı atlama (yay: önce biraz yukarı, sonra aşağı) ---------- */
  function atla() {
    modNav = false; var t = ++tur;
    yemeIptal(); clearTimeout(yemeZaman); clearTimeout(ustZaman);
    var cs = getComputedStyle(mk), x0 = parseFloat(cs.left), y0 = parseFloat(cs.top), tf = cs.transform;
    var s0 = tf && tf !== 'none' ? parseFloat(tf.slice(tf.indexOf('(') + 1)) : 1;
    if (gecisAnim) { gecisAnim.cancel(); gecisAnim = null; }
    var hx = 8 + Math.random() * 84, hy = 72 + Math.random() * 18; // dolaşma alanı (referans)
    var x1 = hx * innerWidth / 100, y1 = hy * innerHeight / 100;
    var UST = 30, ORT = 0.35, sm = s0 + (1 - s0) * ORT;
    durum = 'gecis'; mk.classList.remove('mk-nav'); mk.style.zIndex = Z_NAV;
    gorunum(true, x1 > x0);
    mk.style.transition = 'none';
    mk.style.left = hx + 'vw'; mk.style.top = hy + 'vh'; mk.style.transform = 'scale(1)';
    m = { x: hx, y: hy };
    gecisAnim = mk.animate([
      { left: x0 + 'px', top: y0 + 'px', transform: 'scale(' + s0 + ')', easing: 'cubic-bezier(.2,.6,.4,1)' },
      { left: (x0 + (x1 - x0) * ORT) + 'px', top: (y0 - UST) + 'px', transform: 'scale(' + sm + ')', offset: ORT, easing: 'cubic-bezier(.6,0,.85,.45)' },
      { left: x1 + 'px', top: y1 + 'px', transform: 'scale(1)' }
    ], { duration: 900 });
    gecisAnim.onfinish = function () {
      if (t !== tur) return;
      gecisAnim = null; mk.style.zIndex = Z_GEZI; gorunum(false); durum = 'gezi';
    };
  }

  /* ---------- En üste dönüş: yürüyüp küçülerek yerine oturur ---------- */
  function don() {
    modNav = true; var t = ++tur; kaciyor = false;
    dondur();
    var e = evNoktasi(), x0 = parseFloat(mk.style.left);
    durum = 'gecis'; mk.style.zIndex = Z_NAV;   // yürüme animasyonu (step) sürer
    gorunum(true, e.x > x0);
    konumla(e.x, e.y, olcek(), '.9s');
    setTimeout(function () {
      if (t !== tur) return;
      mk.classList.add('mk-nav'); gorunum(false, true); durum = 'nav'; yemePlanla();
    }, 900);
  }

  /* ---------- Dolaşma modu (referans) ---------- */
  function git(x, y, sure) {
    yon.style.transform = 'scaleX(' + (x < m.x ? -1 : 1) + ')';
    mk.style.transition = 'left ' + sure + ' ' + EGRI + ',top ' + sure + ' ' + EGRI;
    mk.style.left = x + 'vw'; mk.style.top = y + 'vh'; m = { x: x, y: y };
    mkImg.src = MK_YAN; clearTimeout(mkt); mkt = setTimeout(function () { mkImg.src = MK_ON; }, parseFloat(sure) * 1000);
  }

  /* ==========================================================================
     Yazı yeme — yalnızca navbar modunda, yalnızca Anasayfa / Hakkımda / Projeler
     ========================================================================== */
  var HEDEF = ['Anasayfa', 'Hakkımda', 'Projeler'];
  var linkler = [], yeme = null, yemeZaman, ustZaman;

  function harfle() {
    if (!nav) return;
    [].forEach.call(nav.querySelectorAll('a'), function (a) {
      var metin = a.textContent.trim();
      if (HEDEF.indexOf(metin) < 0) return;
      // Link kutusu bir piksel bile değişmesin: özgün metin görünmez kalıp kutuyu
      // (kerning dahil, fonttan bağımsız) aynen tutar; harfler üstte ayrı katmanda.
      a.setAttribute('aria-label', metin);
      a.style.position = 'relative';
      a.innerHTML = '<span class="mk-kutu" aria-hidden="true">' + metin + '</span>' +
        '<span class="mk-harfler" aria-hidden="true">' + Array.from(metin).map(function (c) {
          return '<span class="mk-harf">' + c + '</span>';
        }).join('') + '</span>';
      linkler.push(a);
      a.addEventListener('mouseenter', function () {
        clearTimeout(ustZaman);
        ustZaman = setTimeout(function () { if (yiyebilir()) ye(a); }, 400);
      });
      a.addEventListener('mouseleave', function () { clearTimeout(ustZaman); });
    });
  }

  function yiyebilir() {
    return !azHareket && durum === 'nav' && !yeme && linkler.length > 0 &&
      nav.getClientRects().length > 0 &&               // mobilde menü linkleri gizli
      !html.classList.contains('menu-acik') && !document.body.classList.contains('detay-acik') && !document.hidden;
  }

  function yemePlanla() {
    clearTimeout(yemeZaman);
    if (azHareket) return;
    yemeZaman = setTimeout(function () {
      if (yiyebilir()) ye(linkler[Math.floor(Math.random() * linkler.length)]);
      else yemePlanla();
    }, 7000 + Math.random() * 3000);
  }

  function yemeIptal() {
    if (!yeme) return;
    yeme.zaman.forEach(clearTimeout);
    yeme.anims.forEach(function (x) { x.cancel(); });
    yeme.damlalar.forEach(function (d) { d.remove(); });
    yeme.harfler.forEach(function (h) { clearTimeout(h._renkZ); h.style.transition = 'none'; h.style.color = ''; });
    mk.style.pointerEvents = '';
    yeme = null;
  }

  function ye(a) {
    var t = ++tur;
    clearTimeout(yemeZaman); clearTimeout(ustZaman);
    durum = 'yiyor';
    var k = yeme = { anims: [], zaman: [], damlalar: [], harfler: [].slice.call(a.querySelectorAll('.mk-harf')) };
    k.harfler.forEach(function (h) { clearTimeout(h._renkZ); });
    mk.style.pointerEvents = 'none';               // yeme sırasında linkleri kapatmasın

    function sonra(ms, f) { k.zaman.push(setTimeout(function () { if (t === tur) f(); }, ms)); }

    // 1) linkin hemen yanına uç, ağzı linke dönük
    var boy = navBoy(), lr = a.getBoundingClientRect();
    var solda = parseFloat(getComputedStyle(mk).left) < lr.left + lr.width / 2;
    var x = solda ? lr.left - boy / 2 - 2 : lr.right + boy / 2 + 2;
    var y = lr.top + lr.height / 2;
    dondur(); gorunum(true, solda);
    konumla(x, y, olcek(), '.3s');
    var agizX = x + (solda ? 1 : -1) * boy * 0.32, agizY = y + boy * 0.06;

    // 2) yeme (~700ms): en yakın harften başlayarak 40ms arayla ağza doğru (en fazla %60 yol)
    sonra(300, function () {
      k.sira = k.harfler.map(function (h) {
        var r = h.getBoundingClientRect();
        return { h: h, cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
      }).sort(function (p, q) { return Math.abs(p.cx - agizX) - Math.abs(q.cx - agizX); });
      k.sira.forEach(function (p, i) {
        p.dx = (agizX - p.cx) * 0.6; p.dy = (agizY - p.cy) * 0.6;
        k.anims.push(p.h.animate([
          { transform: 'none' },
          { transform: 'translate(' + p.dx.toFixed(1) + 'px,' + p.dy.toFixed(1) + 'px) scale(.6)' }
        ], { duration: 320, delay: i * 40, easing: 'cubic-bezier(.55,0,.75,.3)', fill: 'both' }));
        sonra(i * 40, function () {
          p.h.style.transition = 'color 320ms ease-in';
          p.h.style.color = 'var(--maskot-renk)';
        });
      });
      // 3 kez çiğne (squash & stretch)
      k.anims.push(cig.animate([
        { transform: 'scale(1,1)' }, { transform: 'scale(1.14,.84)' },
        { transform: 'scale(.92,1.1)' }, { transform: 'scale(1,1)' }
      ], { duration: 200, iterations: 3, delay: 100, easing: 'ease-in-out' }));
      sonra(800, kus);
    });

    // 3) kusma (~600ms): aynı sırayla, hafif geri sekmeyle yerlerine; maskot renginde damlalar
    function kus() {
      k.anims.push(cig.animate([
        { transform: 'scale(.9,1.1)' }, { transform: 'scale(1.1,.92)' }, { transform: 'scale(1,1)' }
      ], { duration: 220, easing: 'ease-out' }));
      k.sira.forEach(function (p, i) {
        k.anims.push(p.h.animate([
          { transform: 'translate(' + p.dx.toFixed(1) + 'px,' + p.dy.toFixed(1) + 'px) scale(.6)' },
          { transform: 'none' }
        ], { duration: 380, delay: i * 30, easing: 'cubic-bezier(.34,1.8,.64,1)', fill: 'both' }));
      });
      for (var j = 0; j < 6; j++) {
        var d = document.createElement('span');
        d.className = 'mk-damla'; d.setAttribute('aria-hidden', 'true');
        document.body.appendChild(d); k.damlalar.push(d);
        var aci = (solda ? 0 : Math.PI) + (Math.random() - 0.5) * 2.4; // linke doğru yelpaze
        var r = 16 + Math.random() * 24;
        k.anims.push(d.animate([
          { transform: 'translate(' + agizX + 'px,' + agizY + 'px) scale(1)', opacity: 1 },
          { transform: 'translate(' + (agizX + Math.cos(aci) * r) + 'px,' + (agizY + Math.sin(aci) * r - 6) + 'px) scale(.4)', opacity: 0 }
        ], { duration: 450 + Math.random() * 150, easing: 'cubic-bezier(.2,.7,.4,1)', fill: 'forwards' }));
      }
      sonra(600, bitir);
    }

    // 4) harfler 2.5 sn maskot renginde, sonra 1 sn'de eski renklerine; maskot yerine döner
    function bitir() {
      k.anims.forEach(function (x) { x.cancel(); });
      k.damlalar.forEach(function (d) { d.remove(); });
      k.harfler.forEach(function (h) {
        h._renkZ = setTimeout(function () { h.style.transition = 'color 1s ease-in-out'; h.style.color = ''; }, 2500);
      });
      mk.style.pointerEvents = '';
      yeme = null;
      navEveDon(t);
    }
  }

  /* ---------- Kurulum ---------- */
  if (!bar || !logo) { // navbar yoksa: yalnızca dolaşma (referans)
    modNav = false; durum = 'gezi';
  } else if (azHareket) {
    navaYerles();                          // hareketsiz: yalnızca navbarda
    return;
  } else if (scrollY < ESIK) {
    navaYerles();
  } else {
    mk.style.zIndex = Z_GEZI; durum = 'gezi';
  }
  if (azHareket) return;

  if (bar && logo) {
    harfle();
    addEventListener('scroll', function () {
      var ust = scrollY < ESIK;
      if (ust && !modNav) don();
      else if (!ust && modNav) atla();
    }, { passive: true });
    var yerles = function () { if (durum === 'nav') { var e = evNoktasi(); konumla(e.x, e.y, olcek(), 0); } };
    addEventListener('resize', yerles);
    mobilSorgu.addEventListener('change', yerles);
  }

  setInterval(function () { if (durum === 'gezi' && !kaciyor) git(8 + Math.random() * 84, 72 + Math.random() * 18, '2.8s'); }, 4200);
  mk.addEventListener('mouseenter', function () {
    if (durum === 'nav') { navKac(); return; }
    if (durum !== 'gezi') return;
    var x = m.x < 50 ? 55 + Math.random() * 35 : 8 + Math.random() * 35;
    kaciyor = true; git(x, 20 + Math.random() * 65, '.45s');
    clearTimeout(kt); kt = setTimeout(function () { kaciyor = false; }, 1500);
  });
})();
