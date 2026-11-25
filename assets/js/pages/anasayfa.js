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

  /* ---------- 3. Maskot: assets/js/maskot.js (kök index ile ortak) ---------- */

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

  /* ---------- 4b. Projeler: aşağı kaydırdıkça tek satır yana kayar, satır bitince sayfa devam eder ---------- */
  var pIz = document.getElementById('proje-iz'), pSahne = pIz && pIz.querySelector('.proje-sahne'), pSira = document.getElementById('projeler');
  if (pIz && pSahne && !azHareket) {
    var pMesafe = 0;
    var pKay = function () {
      var p = pMesafe > 0 ? Math.min(1, Math.max(0, -pIz.getBoundingClientRect().top / pMesafe)) : 0;
      pSira.style.transform = 'translateX(' + (-p * pMesafe).toFixed(1) + 'px)';
    };
    var pOlc = function () {
      pMesafe = Math.max(0, pSira.offsetWidth - pSahne.clientWidth);   // yana kayacak yol = dikey kaydırma payı
      pIz.style.height = (pSahne.offsetHeight + pMesafe) + 'px';
      pKay();
    };
    addEventListener('scroll', pKay, { passive: true });
    addEventListener('resize', pOlc);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(pOlc);
    pOlc();
    // klavye: ekran dışındaki karta odaklanınca kart ortaya gelene kadar sayfayı kaydır
    pSira.addEventListener('focusin', function (e) {
      var k = e.target.closest('.proje-kart'); if (!k || !pMesafe) return;
      var hedef = Math.min(pMesafe, Math.max(0, k.offsetLeft + k.offsetWidth / 2 - pSahne.clientWidth / 2));
      scrollTo(0, scrollY + pIz.getBoundingClientRect().top + hedef);
    });
  }

  /* ---------- 5. Karo duvar: ortak assets/js/karo-duvar.js · fotoğraflar assets/js/galeri-veri.js (galeri ile aynı liste) ---------- */
  // Anasayfa ayarları: keskin köşe, cam yok, küçük lila-camgöbeği parıltılar; karoya tıklayınca galeri o fotoğraf açık gelir
  KaroDuvar(document.getElementById('karo-duvar'), { fotolar: GALERI, adim: 26, kosegen: 21.8, xMax: 1.5,
    yildiz: { boyutYatay: 1.6, boyutCapraz: 1.1, renk: '#D9C2FF', parilti: 'rgba(127,231,255,.85)' },
    tikla: function (i) { location.href = 'gallery.html#foto-' + (i + 1); } });
})();
