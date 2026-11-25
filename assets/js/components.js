/* ==========================================================================
   components.js — Dijital Sirk ortak bileşenleri
   Cam navbar + maskot (süzülür · kaçar · saklanır · yer/kusar) ·
   mobil perde menü · perde geçişi · TR/EN değiştirici · footer ·
   paylaşılan sahne parçaları: marki ampulleri, konfeti, karo zemin

   <head> içinde defer OLMADAN yüklenir: html'e .perde-kapali ekleyip
   ilk boyamadan önce sayfayı perdenin arkasına alır. Geri kalan her şey
   DOMContentLoaded'da kurulur. fetch() yok → file:// altında çalışır.
   ========================================================================== */
(function () {
  'use strict';

  var html = document.documentElement;
  var azHareketSorgu = window.matchMedia('(prefers-reduced-motion: reduce)');
  function azHareket() { return azHareketSorgu.matches; }
  var WAAPI = typeof Element.prototype.animate === 'function';

  html.classList.add('js');
  if (!azHareket()) html.classList.add('perde-kapali');

  // assets/ kökü: bu dosyanın kendi adresinden (sayfa derinliğinden bağımsız)
  var betik = document.currentScript;
  var ASSET = betik ? betik.src.replace(/js\/components\.js(\?.*)?$/, '') : '../assets/';

  /* ---------- Metinler ---------- */
  var METIN = {
    tr: {
      atla: 'İçeriğe geç',
      anaMenu: 'Ana menü',
      digerDilAd: 'English',
      menuAc: 'Menüyü aç',
      menuKapat: 'Menüyü kapat',
      marka: 'Roze, anasayfa',
      gise: 'Gişeye dön',
      sosyal: 'Sosyal medya',
      marki: 'İNANILMAZ DİJİTAL SİRKE HOŞGELDİNİZ',
      telif: 'Tüm hakları saklıdır.',
      nav: ['Anasayfa', 'Hakkımda', 'Projeler', 'Galeri', 'Blog', 'İletişim']
    },
    en: {
      atla: 'Skip to content',
      anaMenu: 'Main menu',
      digerDilAd: 'Türkçe',
      menuAc: 'Open menu',
      menuKapat: 'Close menu',
      marka: 'Roze, home',
      gise: 'Back to the box office',
      sosyal: 'Social media',
      marki: 'WELCOME TO THE INCREDIBLE DIGITAL CIRCUS',
      telif: 'All rights reserved.',
      nav: ['Home', 'About', 'Projects', 'Gallery', 'Blog', 'Contact']
    }
  };

  var SAYFALAR = ['index', 'about', 'projects', 'gallery', 'blog', 'contact'];

  // Sosyal linkler şimdilik gizli; geri açmak için true yap.
  var SOSYAL_GOSTER = false;
  var SOSYAL = [
    {
      ad: 'Instagram',
      url: 'https://www.instagram.com/rozerly_/',
      ikon: '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor"/>'
    },
    {
      ad: 'Letterboxd',
      url: 'https://boxd.it/e8shR',
      ikon: '<circle cx="6.5" cy="12" r="3.6"/><circle cx="12" cy="12" r="3.6"/><circle cx="17.5" cy="12" r="3.6"/>'
    }
  ];

  var KONFETI_RENK = ['#FFC24B', '#FF5A6E', '#FF6FA3', '#FFE7A3', '#FF8A3D', '#F4E2FF', '#7FE7FF'];

  /* ---------- Yardımcılar ---------- */
  function dil() { return (html.lang || 'tr').slice(0, 2).toLowerCase() === 'en' ? 'en' : 'tr'; }

  function dosyaAdi() {
    var parca = decodeURIComponent(location.pathname).split('/').pop();
    return parca || 'index.html';
  }

  function aktifSayfa() {
    var ad = dosyaAdi().replace(/\.html?$/, '');
    if (/^blog-\d+$/.test(ad)) return 'blog';
    return SAYFALAR.indexOf(ad) > -1 ? ad : '';
  }

  function kacis(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function elemanYap(htmlMetni) {
    var t = document.createElement('template');
    t.innerHTML = htmlMetni.trim();
    return t.content.firstElementChild;
  }

  function rastgele(a, b) { return a + Math.random() * (b - a); }
  function bekle(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }

  /* ---------- Şablonlar ---------- */
  function harfleriBol(metin) {
    var s = '';
    Array.from(metin).forEach(function (c) {
      s += c === ' '
        ? '<span class="harf harf--bosluk"></span>'
        : '<span class="harf">' + kacis(c) + '</span>';
    });
    return s;
  }

  function dilAnahtariHTML(m, d) {
    var diger = d === 'tr' ? 'en' : 'tr';
    var hedef = '../' + diger + '/' + dosyaAdi();
    var tr = d === 'tr' ? ' is-secili' : '';
    var en = d === 'en' ? ' is-secili' : '';
    return '<a class="dil-anahtar" href="' + kacis(hedef) + '" hreflang="' + diger + '">' +
      '<span class="dil-anahtar__dil' + tr + '">TR</span>' +
      '<span class="dil-anahtar__nokta" aria-hidden="true"></span>' +
      '<span class="dil-anahtar__dil' + en + '">EN</span>' +
      '<span class="gizli" lang="' + diger + '"> – ' + m.digerDilAd + '</span>' +
      '</a>';
  }

  function maskotHTML() {
    var yol = ASSET + 'img/maskot/';
    function img(ad) {
      return '<img class="maskot__gorsel maskot__gorsel--' + ad + '" src="' + yol + ad + '.webp" alt="" width="160" height="158" decoding="async" draggable="false">';
    }
    return '<div class="maskot" data-gorunum="on" aria-hidden="true">' +
      '<div class="maskot__suzul"><div class="maskot__yon">' + img('on') + img('yan') + img('arka') + '</div></div>' +
      '</div>';
  }

  function menuDugmeHTML(m) {
    return '<button class="menu-dugme" type="button" aria-expanded="false" aria-controls="mobil-menu" aria-label="' + m.menuAc + '">' +
      '<span class="menu-dugme__cubuk" aria-hidden="true"></span>' +
      '<span class="menu-dugme__cubuk" aria-hidden="true"></span>' +
      '<span class="menu-dugme__cubuk" aria-hidden="true"></span>' +
    '</button>';
  }

  /* Mobil menü perdesi.
     s.kok: linklerin önüne eklenecek klasör (kök gişede "tr/")
     s.gise: false → "Gişeye dön" linki yok (zaten gişedeyken)
     s.kapat: true → menünün içinde kendi kapatma butonu (navbar menünün
              altında kalan sayfalar: giriş sahnesi + anasayfa) */
  function mobilMenuHTML(m, aktif, s) {
    s = s || {};
    var kok = s.kok || '';
    var mobilLinkler = '';
    SAYFALAR.forEach(function (id, i) {
      var akim = id === aktif ? ' aria-current="page"' : '';
      mobilLinkler += '<li style="--i:' + i + '"><a class="mobil-menu__link" href="' + kok + id + '.html"' + akim + '>' + kacis(m.nav[i]) + '</a></li>';
    });
    return '<div class="mobil-menu kadife" id="mobil-menu" hidden>' +
        (s.kapat
          ? '<button class="menu-dugme menu-kapat" type="button" aria-label="' + m.menuKapat + '">' +
              '<span class="menu-dugme__cubuk" aria-hidden="true"></span>' +
              '<span class="menu-dugme__cubuk" aria-hidden="true"></span>' +
            '</button>'
          : '') +
        '<nav aria-label="' + m.anaMenu + '"><ul class="mobil-menu__liste">' + mobilLinkler + '</ul></nav>' +
        (s.gise === false ? '' : '<p class="mobil-menu__alt"><a href="../index.html">' + m.gise + '</a></p>') +
        '<div class="sacak" aria-hidden="true"></div>' +
      '</div>';
  }

  function ustBarHTML(m, d, aktif) {
    var linkler = '';
    SAYFALAR.forEach(function (id, i) {
      var etiket = m.nav[i];
      var akim = id === aktif ? ' aria-current="page"' : '';
      linkler += '<li><a class="ana-nav__link" href="' + id + '.html"' + akim + '>' +
        '<span class="gizli">' + kacis(etiket) + '</span>' +
        '<span class="harfler" aria-hidden="true">' + harfleriBol(etiket) + '</span></a></li>';
    });

    return '<a class="atla-link" href="#icerik">' + m.atla + '</a>' +
      '<header class="ust-bar">' +
        '<div class="ust-bar__ic kap">' +
          '<a class="marka" href="index.html" aria-label="' + m.marka + '">' +
            '<span class="marka__ad" aria-hidden="true">Roze</span>' +
          '</a>' +
          '<nav class="ana-nav" aria-label="' + m.anaMenu + '"><ul class="ana-nav__liste">' + linkler + '</ul></nav>' +
          dilAnahtariHTML(m, d) +
          menuDugmeHTML(m) +
        '</div>' +
        maskotHTML() +
      '</header>' +
      mobilMenuHTML(m, aktif);
  }

  /* ---------- Footer (tek kaynak: bütün sayfalar buradan) ----------
     Stil: assets/css/footer.css. Karo zeminli sayfada yer tutucu
     <div data-footer="karo"></div> değiştirilir; diğerlerinde body sonuna eklenir.
     Link yok. İmza: yazı soldan sağa açılır (1.6s), ardından altın kuyruk çizilir (0.9s). */
  function footerHTML(m, karo) {
    return '<footer class="imza-footer' + (karo ? ' imza-footer--karo' : '') + '">' +
      '<div class="imza">' +
        '<p class="imza-yazi" lang="en">roze&#39;s world</p>' +
        '<svg class="imza-kuyruk" viewBox="0 0 600 56" aria-hidden="true" focusable="false">' +
          '<defs><linearGradient id="imza-altin" x1="0" y1="0" x2="1" y2="0">' +
            '<stop offset="0" stop-color="#FFE7A3" stop-opacity=".55"/><stop offset=".35" stop-color="#FFC24B"/>' +
            '<stop offset=".8" stop-color="#FFC24B"/><stop offset="1" stop-color="#FFE7A3" stop-opacity=".7"/>' +
          '</linearGradient></defs>' +
          '<path pathLength="1" d="M10 30 C 52 40, 92 20, 140 26 S 214 42, 268 32 S 352 14, 404 26 S 470 42, 506 30 ' +
            'C 528 22, 548 10, 540 6 C 532 2, 518 16, 530 26 C 546 38, 572 34, 592 22"/>' +
        '</svg>' +
      '</div>' +
      '<p class="imza-telif">© 2026 roze&#39;s world · ' + m.telif + '</p>' +
      '</footer>';
  }

  function footerKur(m, zorunlu) {
    var yer = document.querySelector('[data-footer]');
    if (!yer && !zorunlu) return;
    var karo = !!yer && yer.getAttribute('data-footer') === 'karo';
    if (yer) yer.outerHTML = footerHTML(m, karo);
    else document.body.insertAdjacentHTML('beforeend', footerHTML(m, false));
    var f = document.querySelector('.imza-footer');
    if (!f || azHareket()) return;          // az hareket: imza direkt görünür
    f.classList.add('imza-hazir');
    function oyna() {
      f.classList.add('imza-oyna');
      setTimeout(function () { f.classList.add('imza-bitti'); }, 1700);
    }
    if (!('IntersectionObserver' in window)) { oyna(); return; }
    var io = new IntersectionObserver(function (girdiler) {
      if (!girdiler[0].isIntersecting) return;
      io.disconnect();                      // yalnızca bir kez
      oyna();
    }, { threshold: 0.35 });
    io.observe(f);
  }

  function perdeHTML() {
    return '<div class="perde" aria-hidden="true">' +
      '<div class="perde__kanat perde__kanat--sol kadife"></div>' +
      '<div class="perde__kanat perde__kanat--sag kadife"></div>' +
      '<div class="perde__ust kadife"><div class="sacak"></div></div>' +
      '</div>';
  }

  /* ==========================================================================
     Sahne parçaları (her sayfa kullanabilir)
     ========================================================================== */

  /* Marki ampulleri: [data-ampul] (sayı verilirse o kadar; boşsa genişliğe göre).
     Her ampul kendi süre ve gecikmesiyle → düzensiz yanıp sönme. */
  function ampulleriDoldur(el) {
    var sabit = parseInt(el.getAttribute('data-ampul'), 10);
    var adet = sabit > 0 ? sabit : Math.max(6, Math.round(el.clientWidth / 30));
    if (el.childElementCount === adet) return;
    var s = '';
    for (var i = 0; i < adet; i++) {
      var d = rastgele(1.8, 5.2).toFixed(2);
      var g = (-rastgele(0, 6)).toFixed(2);
      s += '<span class="ampul" style="--d:' + d + 's;--g:' + g + 's"></span>';
    }
    el.innerHTML = s;
  }

  function ampulleriKur() {
    var liste = Array.from(document.querySelectorAll('[data-ampul]'));
    if (!liste.length) return;
    liste.forEach(ampulleriDoldur);
    var zaman = null;
    window.addEventListener('resize', function () {
      clearTimeout(zaman);
      zaman = setTimeout(function () { liste.forEach(ampulleriDoldur); }, 200);
    });
  }

  /* Konfeti yağmuru: [data-konfeti="12"] → az sayıda yavaş düşen parça */
  function konfetiKur() {
    if (azHareket()) return;
    document.querySelectorAll('[data-konfeti]').forEach(function (alan) {
      var n = parseInt(alan.getAttribute('data-konfeti'), 10) || 12;
      var s = '';
      for (var i = 0; i < n; i++) {
        var dur = rastgele(11, 19);
        s += '<i style="' +
          '--x:' + rastgele(2, 98).toFixed(1) + '%;' +
          '--d:' + dur.toFixed(1) + 's;' +
          '--g:' + (-rastgele(0, dur)).toFixed(1) + 's;' +
          '--s:' + rastgele(-50, 50).toFixed(0) + 'px;' +
          '--w:' + rastgele(5, 8).toFixed(1) + 'px;' +
          '--h:' + rastgele(8, 12).toFixed(1) + 'px;' +
          '--r:' + KONFETI_RENK[i % KONFETI_RENK.length] + '"></i>';
      }
      alan.classList.add('konfeti-alan');
      alan.innerHTML = s;
    });
  }

  /* Karo zemin: hareketsiz SVG perspektif. Öne doğru ölçülü büyür (en ön
     karo ≈ en arka karonun 2 katı); arka kenar hafif kavisli dünya ufku.
     <svg data-karo viewBox="0 0 1600 520" preserveAspectRatio="xMidYMin slice"> */
  var karoSayac = 0;
  function karoZemin(svg) {
    var k = 'kz' + (++karoSayac);
    var W = 1600, H = 520, SATIR = 9, cx = W / 2, KG = 104, KAVIS = 46;
    function P(u, v) {
      var s = 1 + v;                                  // arka 1× → ön 2×
      var x = cx + u * KG * s;
      var y = H * (v + v * v / 2) / 1.5;              // satır yüksekliği de ölçekle büyür
      var t = (x - cx) / (W / 2);
      y += KAVIS * (1 - v) * t * t;                   // ufuk kavsi, öne doğru düzleşir
      return x.toFixed(1) + ' ' + y.toFixed(1);
    }
    var U = Math.ceil(cx / KG) + 1;
    var koyu = '';
    for (var r = 0; r < SATIR; r++) {
      var v0 = r / SATIR, v1 = (r + 1) / SATIR;
      for (var c = -U; c < U; c++) {
        if ((r + c) & 1) continue;
        koyu += 'M' + P(c, v0) + 'L' + P(c + 1, v0) + 'L' + P(c + 1, v1) + 'L' + P(c, v1) + 'Z';
      }
    }
    var ufuk = '';
    for (var u = -U; u <= U; u += 0.5) ufuk += (ufuk ? 'L' : 'M') + P(u, 0);
    var alan = ufuk + 'L' + P(U, 1) + 'L' + P(-U, 1) + 'Z';

    svg.innerHTML =
      '<defs>' +
        '<clipPath id="' + k + '-a"><path d="' + alan + '"/></clipPath>' +
        '<linearGradient id="' + k + '-sis" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="#6A1B7A" stop-opacity=".62"/>' +
          '<stop offset=".35" stop-color="#6A1B7A" stop-opacity=".18"/>' +
          '<stop offset="1" stop-color="#1A0B33" stop-opacity=".28"/>' +
        '</linearGradient>' +
        '<radialGradient id="' + k + '-isik" cx="50%" cy="0%" r="60%">' +
          '<stop offset="0" stop-color="#FFC24B" stop-opacity=".42"/>' +
          '<stop offset=".5" stop-color="#FF6FA3" stop-opacity=".14"/>' +
          '<stop offset="1" stop-color="#FF6FA3" stop-opacity="0"/>' +
        '</radialGradient>' +
        '<linearGradient id="' + k + '-yan" x1="0" y1="0" x2="1" y2="0">' +
          '<stop offset="0" stop-color="#0E0726" stop-opacity=".55"/>' +
          '<stop offset=".28" stop-color="#0E0726" stop-opacity="0"/>' +
          '<stop offset=".72" stop-color="#0E0726" stop-opacity="0"/>' +
          '<stop offset="1" stop-color="#0E0726" stop-opacity=".55"/>' +
        '</linearGradient>' +
        '<filter id="' + k + '-parla" x="-5%" y="-50%" width="110%" height="200%"><feGaussianBlur stdDeviation="5"/></filter>' +
      '</defs>' +
      '<g clip-path="url(#' + k + '-a)">' +
        '<rect width="' + W + '" height="' + H + '" fill="#F4E2FF"/>' +
        '<path d="' + koyu + '" fill="#1A0B33"/>' +
        '<rect width="' + W + '" height="' + H + '" fill="url(#' + k + '-sis)"/>' +
        '<rect width="' + W + '" height="' + H + '" fill="url(#' + k + '-isik)"/>' +
        '<rect width="' + W + '" height="' + H + '" fill="url(#' + k + '-yan)"/>' +
      '</g>' +
      '<path d="' + ufuk + '" fill="none" stroke="#FFE7A3" stroke-width="6" stroke-opacity=".45" filter="url(#' + k + '-parla)"/>' +
      '<path d="' + ufuk + '" fill="none" stroke="#FFF7E8" stroke-width="1.6" stroke-opacity=".8"/>';
  }

  function karolariKur() {
    document.querySelectorAll('svg[data-karo]').forEach(karoZemin);
  }

  /* ==========================================================================
     Perde geçişi
     ========================================================================== */
  var perde = null;
  var gidiliyor = false;
  var perdeAnimler = [];

  /* Kanat pozları: translateX · scaleX (kumaş toplanması) · skewX (etek gecikmesi). */
  function kanatKareleri(yon, kapan) {
    var s = yon; // sol: -1, sag: +1
    function poz(tx, sx, sk) {
      return { transform: 'translateX(' + (s * tx) + '%) scaleX(' + sx + ') skewX(' + (-s * sk) + 'deg)' };
    }
    var acik = poz(100, 0.2, 0);
    var kapali = poz(0, 1, 0);
    if (kapan) {
      return [acik,
        Object.assign(poz(38, 0.5, -2), { offset: 0.3 }),
        Object.assign(poz(8, 0.82, -2.5), { offset: 0.6 }),
        Object.assign(poz(0, 1.008, 0.8), { offset: 0.85 }),
        kapali];
    }
    return [kapali,
      Object.assign(poz(0, 0.98, -0.6), { offset: 0.12 }),
      Object.assign(poz(26, 0.5, 3), { offset: 0.55 }),
      acik];
  }

  function perdeOynat(kapan, bitti) {
    perdeAnimler.forEach(function (a) { a.cancel(); });
    var sure = kapan ? 720 : 900;
    var egri = 'cubic-bezier(.65,0,.35,1)';
    var sol = perde.querySelector('.perde__kanat--sol');
    var sag = perde.querySelector('.perde__kanat--sag');
    var ust = perde.querySelector('.perde__ust');
    var gizli = 'translateY(calc(-100% - 2.5rem))';
    perdeAnimler = [
      sol.animate(kanatKareleri(-1, kapan), { duration: sure, easing: egri, fill: 'forwards' }),
      sag.animate(kanatKareleri(1, kapan), { duration: sure, easing: egri, fill: 'forwards', delay: 40 }),
      ust.animate(kapan
        ? [{ transform: gizli }, { transform: 'translateY(0)' }]
        : [{ transform: 'translateY(0)' }, { transform: gizli }],
        kapan
          ? { duration: sure * 0.8, easing: 'cubic-bezier(.33,1,.68,1)', fill: 'forwards' }
          : { duration: sure * 0.7, delay: sure * 0.3, easing: 'cubic-bezier(.32,0,.67,0)', fill: 'forwards' })
    ];
    Promise.all(perdeAnimler.map(function (a) { return a.finished; })).then(function () {
      perde.classList.toggle('is-kapali', kapan);
      perde.classList.remove('is-engel');
      perdeAnimler.forEach(function (a) { a.cancel(); });
      perdeAnimler = [];
      if (bitti) bitti();
    }, function () { /* iptal edildi */ });
  }

  function perdeKur() {
    perde = elemanYap(perdeHTML());
    document.body.appendChild(perde);
    if (azHareket() || !WAAPI) {
      html.classList.remove('perde-kapali');
      return;
    }
    perde.classList.add('is-kapali');
    html.classList.remove('perde-kapali');
    requestAnimationFrame(function () {
      perde.classList.remove('is-kapali');
      perdeOynat(false);
    });
  }

  function git(href) {
    if (gidiliyor) return;
    gidiliyor = true;
    if (azHareket() || !perde || !WAAPI) {
      location.href = href;
      return;
    }
    perde.classList.add('is-engel');
    var gitti = false;
    function yonlen() { if (!gitti) { gitti = true; location.href = href; } }
    perdeOynat(true, yonlen);
    setTimeout(yonlen, 1000); // güvenlik ağı
  }

  function icLinkMi(a, e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false;
    if (a.target && a.target !== '_self') return false;
    if (a.hasAttribute('download')) return false;
    var mod = a.getAttribute('data-perde');
    if (mod === 'yok' || mod === 'manuel') return false;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#') return false;
    if (a.protocol !== location.protocol || a.host !== location.host) return false;
    if (a.pathname === location.pathname && a.hash) return false;
    return true;
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a || !icLinkMi(a, e)) return;
    e.preventDefault();
    if (a.pathname === location.pathname) { // aynı sayfa: yeniden yükleme yok
      menuKapat(false);
      return;
    }
    git(a.href);
  });

  // Geri/ileri önbelleğinden dönüşte perde kapalı kalmasın
  window.addEventListener('pageshow', function (e) {
    if (!e.persisted) return;
    gidiliyor = false;
    html.classList.remove('perde-kapali');
    if (perde) {
      perde.classList.remove('is-engel');
      perde.classList.remove('is-kapali');
      if (!azHareket()) perdeOynat(false);
    }
    menuKapat(false);
  });

  /* ==========================================================================
     Mobil menü
     ========================================================================== */
  var menu = null;
  var menuDugme = null;
  var menuGizleZamani = null;

  function menuOdaklanabilir() {
    var ic = Array.from(menu.querySelectorAll('button, a[href]'));
    // menünün kendi kapatma butonu varsa navbar butonu perdenin altında kalır: döngüye alma
    return menu.querySelector('.menu-kapat') ? ic : [menuDugme].concat(ic);
  }

  function menuTus(e) {
    if (e.key === 'Escape') { menuKapat(true); return; }
    if (e.key !== 'Tab') return;
    var liste = menuOdaklanabilir();
    var ilk = liste[0];
    var son = liste[liste.length - 1];
    if (e.shiftKey && document.activeElement === ilk) { e.preventDefault(); son.focus(); }
    else if (!e.shiftKey && document.activeElement === son) { e.preventDefault(); ilk.focus(); }
  }

  function menuAc() {
    var m = METIN[dil()];
    clearTimeout(menuGizleZamani);
    menu.hidden = false;
    void menu.offsetWidth;
    menu.classList.add('is-acik');
    menuDugme.setAttribute('aria-expanded', 'true');
    menuDugme.setAttribute('aria-label', m.menuKapat);
    html.classList.add('menu-acik');
    document.addEventListener('keydown', menuTus);
    var ilkLink = menu.querySelector('a[href]');
    if (ilkLink) ilkLink.focus({ preventScroll: true });
  }

  function menuKapat(odakGeri) {
    if (!menu || menuDugme.getAttribute('aria-expanded') !== 'true') return;
    var m = METIN[dil()];
    menu.classList.remove('is-acik');
    menuDugme.setAttribute('aria-expanded', 'false');
    menuDugme.setAttribute('aria-label', m.menuAc);
    html.classList.remove('menu-acik');
    document.removeEventListener('keydown', menuTus);
    menuGizleZamani = setTimeout(function () { menu.hidden = true; }, azHareket() ? 0 : 720);
    if (odakGeri) menuDugme.focus();
  }

  function menuKur(genisSorgu) {
    menu = document.getElementById('mobil-menu');
    menuDugme = document.querySelector('.menu-dugme:not(.menu-kapat)');
    if (!menu || !menuDugme) return;
    menuDugme.addEventListener('click', function () {
      if (menuDugme.getAttribute('aria-expanded') === 'true') menuKapat(true);
      else menuAc();
    });
    var kapat = menu.querySelector('.menu-kapat');
    if (kapat) kapat.addEventListener('click', function () { menuKapat(true); });
    window.matchMedia(genisSorgu || '(min-width: 960px)').addEventListener('change', function (q) {
      if (q.matches) menuKapat(false);
    });
  }

  /* ==========================================================================
     Maskot — navbarda yaşar
     · boşta: önden süzülür (CSS)
     · imleç yaklaşınca / dokununca: yana döner, gideceği yöne bakar, kaçar,
       durunca önden döner
     · ara sıra logonun arkasına saklanır (arka görünüm, cam hapın arkası)
     · linke tıklanınca: linke uçar, harfleri yer, konfetiyle geri kusar (≤700ms)
     yan.webp sola bakar → sağa giderken --yon:-1 ile aynalanır.
     ========================================================================== */
  var CEK = 'cubic-bezier(.7,0,.84,0)';
  var CIKIS = 'cubic-bezier(.22,1,.36,1)';
  var YUMUSAK = 'cubic-bezier(.45,0,.55,1)';

  var mk = {
    el: null, bar: null, hap: null, marka: null,
    x: 0, y: 0, boy: 0,
    durum: 'bos',      // bos | kaciyor | sakli | yiyor
    tur: 0,            // her yeni eylem öncekini geçersiz kılar
    sonKacis: 0,
    sakZaman: null, eveZaman: null
  };
  var sonYeme = new WeakMap();

  function mkGorunum(g, yon) {
    mk.el.setAttribute('data-gorunum', g);
    if (yon) mk.el.style.setProperty('--yon', yon);
  }

  function mkSinirlar() {
    var b = mk.bar.getBoundingClientRect();
    var h = mk.hap.getBoundingClientRect();
    mk.boy = mk.el.offsetWidth;
    return {
      sol: h.left - b.left + 10,
      sag: h.right - b.left - mk.boy - 10,
      ev: h.left - b.left + h.width / 2 - mk.boy / 2,
      bar: b
    };
  }

  // Hedefe taşı; süre dolunca çözülür. Tur değiştiyse false döner.
  function mkTasi(x, y, sure, egri) {
    var tur = mk.tur;
    mk.x = x;
    mk.y = y;
    mk.el.style.setProperty('--maskot-sure', sure + 'ms');
    mk.el.style.setProperty('--maskot-egri', egri || YUMUSAK);
    mk.el.style.setProperty('--x', x.toFixed(1) + 'px');
    mk.el.style.setProperty('--y', y.toFixed(1) + 'px');
    return bekle(sure).then(function () { return tur === mk.tur; });
  }

  function mkYerles() { // anında eve (yeniden boyutlanma / ilk kurulum)
    var s = mkSinirlar();
    mk.tur++;
    mk.durum = 'bos';
    mk.el.classList.remove('is-sakli', 'is-yiyor');
    mkGorunum('on');
    mkTasi(s.ev, 0, 0);
  }

  function mkEveDonPlanla(ms) {
    clearTimeout(mk.eveZaman);
    mk.eveZaman = setTimeout(function () {
      if (mk.durum !== 'bos') return;
      var s = mkSinirlar();
      if (Math.abs(mk.x - s.ev) < 4) return;
      mk.tur++;
      mk.durum = 'kaciyor';
      mkGorunum('yan', s.ev > mk.x ? -1 : 1);
      mkTasi(s.ev, 0, 1100).then(function (gecerli) {
        if (!gecerli) return;
        mkGorunum('on');
        mk.durum = 'bos';
      });
    }, ms);
  }

  function mkKac(tehditX) {
    if (mk.durum !== 'bos') return;
    var simdi = performance.now();
    if (simdi - mk.sonKacis < 350) return;
    mk.sonKacis = simdi;
    var s = mkSinirlar();
    var merkez = mk.x + mk.boy / 2;
    var yon = merkez >= tehditX ? 1 : -1;
    var mesafe = rastgele(150, 260);
    var hedef = mk.x + yon * mesafe;
    if (hedef < s.sol || hedef > s.sag) { // duvar: öbür tarafa kaç
      yon = -yon;
      hedef = mk.x + yon * rastgele(200, 320);
    }
    hedef = Math.min(s.sag, Math.max(s.sol, hedef));
    mk.tur++;
    mk.durum = 'kaciyor';
    clearTimeout(mk.eveZaman);
    mkGorunum('yan', yon > 0 ? -1 : 1);
    var sure = Math.min(820, 380 + Math.abs(hedef - mk.x) * 1.4);
    mkTasi(hedef, 0, sure).then(function (gecerli) {
      if (!gecerli) return;
      return bekle(160).then(function () {
        if (mk.durum !== 'kaciyor') return;
        mkGorunum('on');
        mk.durum = 'bos';
        mkEveDonPlanla(rastgele(6000, 9000));
      });
    });
  }

  function mkSaklan() {
    if (mk.durum !== 'bos' || document.hidden || html.classList.contains('menu-acik')) {
      mkSaklanPlanla();
      return;
    }
    var s = mkSinirlar();
    var m = mk.marka.getBoundingClientRect();
    var hedef = Math.max(s.sol, m.left - s.bar.left + m.width / 2 - mk.boy / 2);
    var tur = ++mk.tur;
    mk.durum = 'sakli';
    clearTimeout(mk.eveZaman);
    mkGorunum('yan', hedef > mk.x ? -1 : 1);
    var yukari = -mk.boy * 0.62; // cam hapın arkasına
    mkTasi(hedef, 0, Math.min(1100, 420 + Math.abs(hedef - mk.x) * 1.2))
      .then(function (g) { if (!g) throw 0; mkGorunum('arka'); return bekle(260); })
      .then(function () { if (tur !== mk.tur) throw 0; mk.el.classList.add('is-sakli'); return mkTasi(hedef, yukari, 620); })
      .then(function (g) { if (!g) throw 0; return bekle(rastgele(1800, 3000)); })
      .then(function () { if (tur !== mk.tur) throw 0; return mkTasi(hedef, 0, 620); })
      .then(function (g) {
        if (!g) throw 0;
        mk.el.classList.remove('is-sakli');
        mkGorunum('on');
        mk.durum = 'bos';
        mkEveDonPlanla(rastgele(2500, 4500));
      })
      .catch(function () { /* başka bir eylem araya girdi */ });
    mkSaklanPlanla();
  }

  function mkSaklanPlanla() {
    clearTimeout(mk.sakZaman);
    mk.sakZaman = setTimeout(mkSaklan, rastgele(14000, 24000));
  }

  function konfetiSac(x, y) {
    for (var i = 0; i < 14; i++) {
      var p = document.createElement('i');
      p.className = 'konfeti';
      p.setAttribute('aria-hidden', 'true');
      p.style.background = KONFETI_RENK[i % KONFETI_RENK.length];
      document.body.appendChild(p);
      var aci = (-170 + Math.random() * 160) * Math.PI / 180; // çoğunlukla yukarı-yanlara
      if (i % 4 === 0) aci = (20 + Math.random() * 140) * Math.PI / 180;
      var mesafe = 26 + Math.random() * 42;
      var dx = Math.cos(aci) * mesafe;
      var dy = Math.sin(aci) * mesafe;
      var don = (Math.random() * 540 - 270) | 0;
      var a = p.animate([
        { transform: 'translate(' + x + 'px,' + y + 'px) scale(.4) rotate(0deg)', opacity: 1 },
        { transform: 'translate(' + (x + dx) + 'px,' + (y + dy) + 'px) scale(1) rotate(' + don / 2 + 'deg)', opacity: 1, offset: 0.55 },
        { transform: 'translate(' + (x + dx * 1.15) + 'px,' + (y + dy + 18) + 'px) scale(.8) rotate(' + don + 'deg)', opacity: 0 }
      ], { duration: 320 + Math.random() * 60, easing: CIKIS });
      a.onfinish = (function (el) { return function () { el.remove(); }; })(p);
    }
  }

  // Link tıklaması: uç → yut → kus. Navigasyonu engellemez (perde paralel kapanır).
  function mkYe(link) {
    if (!link.offsetParent) return;
    var simdi = performance.now();
    if (simdi - (sonYeme.get(link) || -1e9) < 1500) return;
    var harfler = Array.from(link.querySelectorAll('.harf:not(.harf--bosluk)'));
    if (!harfler.length) return;
    sonYeme.set(link, simdi);
    clearTimeout(mk.eveZaman);

    var s = mkSinirlar();
    var r = link.getBoundingClientRect();
    var hx = Math.min(s.sag, Math.max(s.sol, r.left - s.bar.left + r.width / 2 - mk.boy / 2));
    var hy = -mk.boy * 0.34;
    mk.tur++;
    mk.durum = 'yiyor';
    mk.el.classList.remove('is-sakli');
    mkGorunum('yan', hx > mk.x ? -1 : 1);

    // Zamanlama (ms): uçuş 150 · yutma ~130→~380 · kusma 390→≤650
    var UCUS = 150, YUT = 150, KUS = 210;
    var n = harfler.length;
    var araYut = Math.min(12, 90 / n);
    var araKus = Math.min(7, 45 / n);
    var kusBasla = 390;
    var toplam = kusBasla + araKus * (n - 1) + KUS;

    // Ağız: ön görünümde dişli ağız, maskotun ~%64 yüksekliğinde
    var ustY = mk.el.offsetTop;
    var agizX = s.bar.left + hx + mk.boy / 2;
    var agizY = s.bar.top + ustY + hy + mk.boy * 0.64;

    mkTasi(hx, hy, UCUS, CIKIS).then(function (gecerli) {
      if (!gecerli) return;
      mkGorunum('on');
      mk.el.classList.add('is-yiyor');
    });

    harfler.forEach(function (h, i) {
      var hr = h.getBoundingClientRect();
      var dx = agizX - (hr.left + hr.width / 2);
      var dy = agizY - (hr.top + hr.height / 2);
      var icerde = 'translate(' + dx + 'px,' + dy + 'px) scale(.1) rotate(' + (i % 2 ? 40 : -40) + 'deg)';
      var t1 = UCUS - 20 + i * araYut;
      var t2 = t1 + YUT;
      var t3 = kusBasla + (n - 1 - i) * araKus;
      var t4 = t3 + KUS;
      h.animate([
        { transform: 'none', opacity: 1, offset: 0 },
        { transform: 'none', opacity: 1, offset: t1 / t4, easing: CEK },
        { transform: icerde, opacity: 0, offset: t2 / t4 },
        { transform: icerde, opacity: 0, offset: t3 / t4, easing: CIKIS },
        { transform: 'translate(0,-8px) scale(1.12)', opacity: 1, offset: (t3 + KUS * 0.6) / t4, easing: YUMUSAK },
        { transform: 'none', opacity: 1, offset: 1 }
      ], { duration: t4 });
    });

    var tur = mk.tur;
    setTimeout(function () {
      if (tur !== mk.tur) return;
      mk.el.classList.remove('is-yiyor');
      konfetiSac(agizX, agizY);
    }, kusBasla);
    setTimeout(function () {
      if (tur !== mk.tur) return;
      mk.durum = 'bos';
      mkEveDonPlanla(900);
    }, toplam);
  }

  function maskotKur() {
    mk.el = document.querySelector('.maskot');
    mk.bar = document.querySelector('.ust-bar');
    mk.hap = document.querySelector('.ust-bar__ic');
    mk.marka = document.querySelector('.marka');
    if (!mk.el || !mk.bar || !mk.hap) return;

    mkYerles();
    requestAnimationFrame(function () { mk.el.classList.add('is-hazir'); });

    var boyutZaman = null;
    window.addEventListener('resize', function () {
      clearTimeout(boyutZaman);
      boyutZaman = setTimeout(mkYerles, 150);
    });

    if (azHareket() || !WAAPI) return; // az hareket: önden, sabit

    // İmleç yaklaşınca kaç (fare / kalem)
    var sonOlay = null;
    var kareBekliyor = false;
    document.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch' || mk.durum !== 'bos') return;
      sonOlay = e;
      if (kareBekliyor) return;
      kareBekliyor = true;
      requestAnimationFrame(function () {
        kareBekliyor = false;
        var ev = sonOlay;
        if (!ev || mk.durum !== 'bos') return;
        var r = mk.el.getBoundingClientRect();
        var dx = ev.clientX - (r.left + r.width / 2);
        var dy = ev.clientY - (r.top + r.height / 2);
        if (dx * dx + dy * dy < 85 * 85) mkKac(ev.clientX);
      });
    }, { passive: true });

    // Mobil: dokununca kaç
    mk.el.addEventListener('pointerdown', function (e) {
      if (mk.durum !== 'bos') return;
      var r = mk.el.getBoundingClientRect();
      // rastgele yöne: tehdidi merkezin sağına ya da soluna koy
      mkKac(r.left + r.width / 2 + (Math.random() < 0.5 ? -30 : 30));
    });

    // Link tıklanınca ye/kus
    document.querySelectorAll('.ana-nav__link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        mkYe(link);
      });
    });

    mkSaklanPlanla();
  }

  /* ==========================================================================
     Kurulum
     ========================================================================== */
  // "İçeriğe geç" linki: klavyeyle navbarı atlayıp <main>'e odaklanır
  function atlaLinkKur() {
    var ana = document.querySelector('main');
    if (!ana || document.querySelector('.atla-link')) return;
    if (!ana.id) ana.id = 'icerik';
    if (!ana.hasAttribute('tabindex')) ana.setAttribute('tabindex', '-1');
    document.body.insertAdjacentHTML('afterbegin', '<a class="atla-link" href="#' + ana.id + '">' +
      METIN[dil()].atla + '</a>');
  }

  function kur() {
    var body = document.body;
    var sayfa = body.getAttribute('data-sayfa') || '';
    atlaLinkKur();

    /* Yalnızca mobil menü + perde (giriş sahnesi ve anasayfa: kendi navbar,
       maskot ve footer'ları referans koddan gelir).
       <body data-bilesen="menu-perde" data-menu-kok="tr/" data-menu-gise="yok">
       Menü butonu [data-menu-dugme-yeri] öğesinin sonuna eklenir. */
    if (body.getAttribute('data-bilesen') === 'menu-perde') {
      var mm = METIN[dil()];
      var yer = document.querySelector('[data-menu-dugme-yeri]');
      if (yer) yer.insertAdjacentHTML('beforeend', menuDugmeHTML(mm));
      var kok = body.getAttribute('data-menu-kok') || '';
      body.insertAdjacentHTML('beforeend', mobilMenuHTML(mm, kok ? '' : aktifSayfa(), {
        kok: kok,
        gise: body.getAttribute('data-menu-gise') !== 'yok',
        kapat: true
      }));
      footerKur(mm, false);
      menuKur('(min-width: 761px)');
      perdeKur();
      return;
    }

    if (sayfa !== 'gise') {
      var d = dil();
      var m = METIN[d];
      body.insertAdjacentHTML('afterbegin', ustBarHTML(m, d, aktifSayfa()));
      footerKur(m, true);
      menuKur();
      maskotKur();
    }
    karolariKur();
    ampulleriKur();
    konfetiKur();
    perdeKur();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', kur);
  else kur();

  // Sayfa scriptleri için küçük ortak API
  window.Sirk = {
    git: git,
    azHareket: azHareket,
    karoZemin: karoZemin,
    ampulleriDoldur: ampulleriDoldur,
    perdeOynat: function (kapan, bitti) { if (perde) perdeOynat(kapan, bitti); }
  };
})();
