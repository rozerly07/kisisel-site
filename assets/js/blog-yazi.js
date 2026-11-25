/* blog-yazi.js — tr/blog-1/2/3.html (referans/blog-yazi.html'den BİREBİR). Veri: assets/js/blog-veri.js */
(function () {
  var Y = window.YAZILAR || [], $ = function (id) { return document.getElementById(id); };
  var esc = function (t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  /* bu sayfanın yazısı: <article data-yazi="blog-1.html"> */
  var dosya = document.querySelector('[data-yazi]').getAttribute('data-yazi');
  var i = Y.map(function (y) { return y.dosya; }).indexOf(dosya), y = Y[i];
  if (y) {
    $('y-kategori').textContent = y.kategori;
    $('y-kategori').href = 'blog.html?kategori=' + encodeURIComponent(y.kategori);
    $('y-meta').textContent = y.tarih + ' · ' + y.sure + ' dk okuma';
    $('y-etiketler').innerHTML = y.etiketler.map(function (e) { return '<span class="etk">#' + esc(e) + '</span>'; }).join('');
    var k = $('y-kapak'); k.style.background = y.yedek; if (y.kapak) k.innerHTML = '<img src="' + esc(y.kapak) + '" alt="">';
    // önceki / sonraki (döngüsel)
    var o = Y[(i - 1 + Y.length) % Y.length], s = Y[(i + 1) % Y.length];
    $('y-onceki').href = o.dosya; $('y-onceki').querySelector('.b').textContent = o.baslik;
    $('y-sonraki').href = s.dosya; $('y-sonraki').querySelector('.b').textContent = s.baslik;
  }
  /* okuma ilerlemesi: yanan fitil */
  var fitil = $('fitil'), mak = document.querySelector('.kagit-yazi');
  function ilerle() {
    var r = mak.getBoundingClientRect(), top = r.height - innerHeight * 0.6;
    var p = top > 0 ? Math.min(1, Math.max(0, -r.top / top)) : 1;
    fitil.style.width = (p * 100).toFixed(1) + '%';
    fitil.parentNode.setAttribute('aria-valuenow', Math.round(p * 100));
  }
  addEventListener('scroll', ilerle, { passive: true }); addEventListener('resize', ilerle); ilerle();
})();
