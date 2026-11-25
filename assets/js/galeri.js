/* galeri.js — tr/gallery.html (referans/galeri.html'deki script; değerler aynen)
   Karo duvar: assets/js/karo-duvar.js (ortak) · fotoğraf listesi: assets/js/galeri-veri.js (ortak) */
(function () {
  /* Galeri fotoğrafları (ICERIK.md'den) → assets/js/galeri-veri.js. İlk fotoğraf alt-ortaya gelir, sonrakiler dışa doğru dizilir; duvar kendiliğinden büyür. */
  var GALERI = window.GALERI;
  var $ = function (id) { return document.getElementById(id); };
  var az = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var N = GALERI.length, acik = false, su = 0, kaynak = null;
  var perde = $('bg-perde'), bg = $('bg'), resim = $('bg-resim');

  var duvar = KaroDuvar($('galeri-duvar'), {
    fotolar: GALERI, adim: 20, kosegen: 16.8, xMax: 2,
    yildiz: { boyutYatay: 2.6, boyutCapraz: 1.7, renk: '#FFF3C4', parilti: 'rgba(255,220,140,.9)' },
    tikla: function (i, dugme) { ac(i, dugme); }
  });
  if (window.GALERI_METIN) window.GALERI_METIN.etiketle($('galeri-duvar')); // en/: karo etiketleri İngilizce

  function goster(i) {
    su = (i + N) % N; var f = GALERI[su];
    resim.style.background = f.renk || '#3A1260';
    resim.innerHTML = f.src ? '<img src="' + f.src + '" alt="' + (f.alt || '').replace(/"/g, '&quot;') + '">' : '<span>[FOTO ' + (su + 1) + ']</span>';
    $('bg-sayac').textContent = String(su + 1).padStart(2, '0') + ' / ' + String(N).padStart(2, '0');
    $('bg-aciklama').textContent = f.aciklama || '';
    bg.setAttribute('aria-label', f.alt || (((window.GALERI_METIN && window.GALERI_METIN.foto) || 'Fotoğraf') + ' ' + (su + 1)));
  }
  // Karo havaya kalkar: büyük görünüm tıklanan karonun yerinden 45° dönük ve küçük başlar, düzleşerek ortaya büyür
  function ac(i, dugme) {
    kaynak = dugme; goster(i); acik = true;
    perde.hidden = false; bg.hidden = false; document.body.classList.add('bg-acik');
    var r = dugme.getBoundingClientRect(), w = bg.offsetWidth || 760;
    var tx = r.left + r.width / 2 - innerWidth / 2, ty = r.top + r.height / 2 - innerHeight / 2, s = Math.max(0.12, r.width / w);
    bg.style.transition = 'none';
    bg.style.transform = 'translate(-50%,-50%) translate(' + tx + 'px,' + ty + 'px) rotate(45deg) scale(' + s + ')';
    bg.style.opacity = '0'; perde.style.opacity = '0';
    bg.offsetWidth;
    bg.style.transition = az ? 'none' : 'transform .8s cubic-bezier(.22,1,.36,1),opacity .45s ease';
    perde.style.transition = az ? 'none' : 'opacity .5s ease';
    bg.style.transform = 'translate(-50%,-50%)'; bg.style.opacity = '1'; perde.style.opacity = '1';
    setTimeout(function () { $('bg-kapat').focus(); }, 50);
  }
  function kapat() {
    if (!acik) return; acik = false;
    var dugme = duvar.karolar[su] || kaynak, r = dugme.getBoundingClientRect(), w = bg.offsetWidth || 760;
    var tx = r.left + r.width / 2 - innerWidth / 2, ty = r.top + r.height / 2 - innerHeight / 2, s = Math.max(0.12, r.width / w);
    bg.style.transform = 'translate(-50%,-50%) translate(' + tx + 'px,' + ty + 'px) rotate(45deg) scale(' + s + ')';
    bg.style.opacity = '0'; perde.style.opacity = '0';
    document.body.classList.remove('bg-acik');
    setTimeout(function () { if (!acik) { bg.hidden = true; perde.hidden = true; } }, az ? 0 : 750);
    dugme.focus();
  }
  $('bg-onceki').addEventListener('click', function () { goster(su - 1); });
  $('bg-sonraki').addEventListener('click', function () { goster(su + 1); });
  $('bg-kapat').addEventListener('click', kapat);
  perde.addEventListener('click', kapat);
  addEventListener('keydown', function (e) {
    if (!acik) return;
    if (e.key === 'Escape') kapat();
    else if (e.key === 'ArrowRight') goster(su + 1);
    else if (e.key === 'ArrowLeft') goster(su - 1);
    else if (e.key === 'Tab') { // odak pencerede kalsın
      var od = bg.querySelectorAll('button'), ilk = od[0], son = od[od.length - 1];
      if (e.shiftKey && document.activeElement === ilk) { e.preventDefault(); son.focus(); }
      else if (!e.shiftKey && document.activeElement === son) { e.preventDefault(); ilk.focus(); }
    }
  });
  var tx0 = null;
  bg.addEventListener('touchstart', function (e) { tx0 = e.touches[0].clientX; }, { passive: true });
  bg.addEventListener('touchend', function (e) {
    if (tx0 === null) return; var dx = e.changedTouches[0].clientX - tx0; tx0 = null;
    if (Math.abs(dx) > 40) goster(su + (dx < 0 ? 1 : -1));
  });
  // galeri.html#foto-3 → o fotoğraf açık gelsin (anasayfadaki karodan gelince)
  var m = location.hash.match(/^#foto-(\d+)$/);
  if (m) { var k = +m[1] - 1; if (duvar.karolar[k]) setTimeout(function () { duvar.karolar[k].scrollIntoView({ block: 'center' }); setTimeout(function () { ac(k, duvar.karolar[k]); }, 350); }, 100); }
})();
