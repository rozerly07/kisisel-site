/* blog.js — tr/blog.html panosu (referans/blog.html'den BİREBİR). Veri: assets/js/blog-veri.js */
(function () {
  var Y = window.YAZILAR || [], $ = function (id) { return document.getElementById(id); };
  var esc = function (t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var R = ['-2.2deg', '1.6deg', '-1deg'], B = ['-4deg', '3deg', '-2deg'];

  /* afişler */
  var pano = $('afisler');
  pano.innerHTML = Y.map(function (y, i) {
    var kapak = y.kapak ? '<img src="' + esc(y.kapak) + '" alt="" loading="lazy">' : '';
    return '<a href="' + esc(y.dosya) + '" class="afis" data-kat="' + esc(y.kategori) + '" style="--r:' + R[i % 3] + ';--gecikme:' + (-(i * 2.3 + 0.7)).toFixed(1) + 's">' +
      '<div class="afis-egim"><div class="afis-salla"><div class="afis-suzul"><div class="afis-nefes"><span class="bant" style="transform:translateX(-50%) rotate(' + B[i % 3] + ')" aria-hidden="true"></span>' +
      '<div class="kagit"><div class="kapak" style="background:' + y.yedek + '">' + kapak + '</div>' +
      '<span class="damga" style="border-color:' + y.renk + ';color:' + y.renk + '">' + esc(y.kategori) + '</span>' +
      '<span class="meta">' + esc(y.tarih) + ' · ' + y.sure + ' dk</span>' +
      '<span class="afis-baslik">' + esc(y.baslik) + '</span>' +
      '<span class="ozet">' + esc(y.ozet) + '</span>' +
      '<span class="etiketler">' + y.etiketler.map(function (e) { return '<span class="etk">#' + esc(e) + '</span>'; }).join('') + '</span>' +
      '<span class="oku">OKU →</span><span class="kivrim" aria-hidden="true"></span></div></div></div></div></div></a>';
  }).join('');
  var afisler = [].slice.call(pano.children);

  /* kategori filtreleri (bilet) */
  var kats = ['TÜMÜ'];
  Y.forEach(function (y) { if (kats.indexOf(y.kategori) < 0) kats.push(y.kategori); });
  var fk = $('filtreler');
  fk.innerHTML = kats.map(function (k) {
    var n = k === 'TÜMÜ' ? Y.length : Y.filter(function (y) { return y.kategori === k; }).length;
    return '<button type="button" class="bilet" aria-pressed="false" data-kat="' + esc(k) + '">' + esc(k) + ' <span>· ' + n + '</span></button>';
  }).join('');
  var btn = [].slice.call(fk.children);
  function sec(k) {
    btn.forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.kat === k ? 'true' : 'false'); });
    afisler.forEach(function (a) {
      var gor = k === 'TÜMÜ' || a.dataset.kat === k;
      a.classList.toggle('sonuk', !gor);
      a.setAttribute('aria-hidden', gor ? 'false' : 'true');
      a.tabIndex = gor ? 0 : -1;
    });
    $('sonuc').textContent = k === 'TÜMÜ' ? Y.length + ' yazı gösteriliyor' : k + ': ' + afisler.filter(function (a) { return !a.classList.contains('sonuk'); }).length + ' yazı';
    try { history.replaceState(null, '', k === 'TÜMÜ' ? location.pathname : '?kategori=' + encodeURIComponent(k)); } catch (e) {}
  }
  btn.forEach(function (b) { b.addEventListener('click', function () { sec(b.dataset.kat); }); });
  var q = new URLSearchParams(location.search).get('kategori');
  sec(q && kats.indexOf(q) > -1 ? q : 'TÜMÜ');
})();
